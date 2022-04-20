export const checkFellowshipHasNoMembers = `
MATCH (fellowship:Fellowship {id:$fellowshipId})
MATCH (fellowship)<-[:BELONGS_TO]-(member:Member)
RETURN fellowship.name AS name, COUNT(member) AS memberCount
`

export const checkBacentaHasNoMembers = `
MATCH (bacenta:Bacenta {id:$bacentaId})
MATCH (bacenta)-[:HAS]->(fellowships:Fellowship)<-[:LEADS]-(member:Member)
MATCH (fellowships)<-[:LEADS]-(leader:Member)
RETURN bacenta.name AS name, COUNT(member) AS memberCount, COUNT(fellowships) AS fellowshipCount
`

export const checkConstituencyHasNoMembers = `
MATCH (constituency:Constituency {id:$constituencyId})
MATCH (constituency)-[:HAS]->(bacentas:Bacenta)<-[:LEADS]-(member:Member)
RETURN constituency.name AS name, COUNT(member) AS memberCount, COUNT(bacentas) AS bacentaCount
`

export const closeDownFellowship = `
MATCH (fellowship:Fellowship {id:$fellowshipId})<-[:HAS]-(bacenta)
MATCH (bacenta)-[:HAS]->(fellowships)
MATCH (admin:Member {auth_id: $auth.jwt.sub})

CREATE (log:HistoryLog {id:apoc.create.uuid()})
  SET log.timeStamp = datetime(),
  log.historyRecord = fellowship.name + ' Fellowship was closed down under ' + bacenta.name +' Bacenta'


MERGE (date:TimeGraph {date:date()})
MERGE (log)-[:LOGGED_BY]->(admin)
MERGE (log)-[:RECORDED_ON]->(date)
MERGE (fellowship)-[:HAS_HISTORY]->(log)
MERGE (bacenta)-[:HAS_HISTORY]->(log)

SET fellowship:ClosedFellowship
REMOVE fellowship:Fellowship, fellowship:Active

RETURN bacenta {
  .id, .name, 
  fellowships:[fellowships {.id,.name}]
    }
`

export const closeDownBacenta = `
MATCH (bacenta:Bacenta {id:$bacentaId})<-[:HAS]-(constituency:Constituency)
MATCH (constituency)-[:HAS]->(bacentas:Bacenta)   
MATCH (admin:Member {auth_id: $auth.jwt.sub})
OPTIONAL MATCH (bacenta)-[:HAS]->(fellowships:Fellowship)
UNWIND labels(constituency) AS stream

CREATE (log:HistoryLog {id:apoc.create.uuid()})
  SET log.timeStamp = datetime(),
  log.historyRecord = bacenta.name + ' Bacenta was closed down under ' + constituency.name +' Constituency with all its fellowships'


MERGE (date:TimeGraph {date:date()})
MERGE (log)-[:LOGGED_BY]->(admin)
MERGE (log)-[:RECORDED_ON]->(date)
MERGE (bacenta)-[:HAS_HISTORY]->(log)
MERGE (constituency)-[:HAS_HISTORY]->(log)

SET bacenta:ClosedBacenta, fellowships:ClosedFellowship
REMOVE bacenta:Bacenta,  fellowships:Fellowship:Active

RETURN constituency {
  .id, .name, 
  bacentas:[bacentas {.id, .name}]
    }
`

export const closeDonwConstituency = `
MATCH (constituency:Constituency {id:$constituencyId})
MATCH (admin:Member {auth_id: $auth.jwt.sub})
MATCH (constituency)<-[:HAS]-(council:Council)
OPTIONAL MATCH (constituency)-[:HAS]->(bacentas)-[:HAS]->(fellowships)

CREATE (log:HistoryLog {id:apoc.create.uuid()})
  SET log.timeStamp = datetime(),
  log.historyRecord = constituency.name + ' Constituency was closed down under ' + council.name +' Council'


MERGE (date:TimeGraph {date:date()})
MERGE (log)-[:LOGGED_BY]->(admin)
MERGE (log)-[:RECORDED_ON]->(date)
MERGE (council)-[:HAS_HISTORY]->(log)

SET constituency:ClosedConstituency, bacentas:ClosedBacenta, fellowships:ClosedFellowship
REMOVE constituency:Constituency,bacentas:Bacenta,fellowships:Fellowship

RETURN council {
  .id, .name,
  constituencies: [constituencies {.id, .name}]
}
`
