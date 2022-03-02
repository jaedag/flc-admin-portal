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
REMOVE fellowship:Fellowship
REMOVE fellowship:Active:Fellowship

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
REMOVE bacenta:Bacenta,  fellowships:Fellowship:Active:Fellowship

RETURN constituency {
  .id, .name, 
  bacentas:[bacentas {.id, .name}]
    }
`
