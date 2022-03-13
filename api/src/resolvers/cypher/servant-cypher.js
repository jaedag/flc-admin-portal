//Remove Fellowship Leader Connection
export const disconnectChurchLeader = `
MATCH (church {id: $churchId}) 
WHERE church:Fellowship OR church:Bacenta OR church:Constituency OR church:Council OR church:Stream OR church:GatheringService OR church:Sonta OR church:Ministry
OR church:ClosedFellowship OR church:ClosedBacenta
MATCH (church)<-[oldLeads:LEADS]-(leader:Member)
DELETE oldLeads

WITH church, leader

MATCH (church)-[oldHistory:HAS_HISTORY]->(:ServiceLog)<-[oldLeaderHistory:HAS_HISTORY]-(leader)
REMOVE oldHistory.current, oldLeaderHistory.current

RETURN leader.id AS id, leader.auth_id AS auth_id, leader.firstName AS firstName, leader.lastName AS lastName
`

export const disconnectChurchAdmin = `
MATCH (church {id: $churchId}) 
WHERE church:Fellowship OR church:Bacenta OR church:Constituency OR church:Council OR church:Stream OR church:GatheringService OR church:Sonta OR church:Ministry
OR church:ClosedFellowship OR church:ClosedBacenta
MATCH (church)<-[oldAdmin:IS_ADMIN_FOR]-(admin:Member)
DELETE oldAdmin

WITH church, admin
MATCH (church)-[oldHistory:HAS_HISTORY]->(:ServiceLog)<-[oldAdminHistory:HAS_HISTORY]-(admin)
REMOVE oldHistory.current, oldAdminHistory.current


RETURN admin.id AS id, admin.auth_id AS auth_id, admin.firstName AS firstName, admin.lastName AS lastName
`
export const disconnectChurchArrivalsAdmin = `
MATCH (church {id: $churchId}) 
WHERE church:Fellowship OR church:Bacenta OR church:Constituency OR church:Council OR church:Stream OR church:GatheringService OR church:Sonta OR church:Ministry
OR church:ClosedFellowship OR church:ClosedBacenta
MATCH (church)<-[oldAdmin:DOES_ARRIVALS_FOR]-(admin:Member)
DELETE oldAdmin

WITH church, admin

MATCH (church)-[oldHistory:HAS_HISTORY]->(:ServiceLog)<-[oldAdminHistory:HAS_HISTORY]-(admin)
REMOVE oldHistory.current, oldAdminHistory.current


RETURN admin.id AS id, admin.auth_id AS auth_id, admin.firstName AS firstName, admin.lastName AS lastName
`

export const disconnectChurchArrivalsHelper = `
MATCH (church {id: $churchId}) 
WHERE church:Fellowship OR church:Bacenta OR church:Constituency OR church:Council OR church:Stream OR church:GatheringService OR church:Sonta OR church:Ministry
OR church:ClosedFellowship OR church:ClosedBacenta
MATCH (church)<-[oldAdmin:HELPS_ARRIVALS_FOR]-(admin:Member)
DELETE oldAdmin

WITH church, admin

MATCH (church)-[oldHistory:HAS_HISTORY]->(:ServiceLog)<-[oldAdminHistory:HAS_HISTORY]-(admin)
REMOVE oldHistory.current, oldAdminHistory.current


RETURN admin.id AS id, admin.auth_id AS auth_id, admin.firstName AS firstName, admin.lastName AS lastName
`

//Create Church Leader Connection
export const connectChurchLeader = `
MATCH (church {id: $churchId})<-[:HAS]-(higherChurch)
WHERE church:Fellowship OR church:Bacenta OR church:Constituency OR church:Council OR church:Stream OR church:GatheringService OR church:Sonta OR church:Ministry
OR church:ClosedFellowship OR church:ClosedBacenta
MATCH (leader:Member {id:$leaderId})
   SET leader.auth_id =  $auth_id
MERGE (leader)-[:LEADS]->(church)

RETURN church.id AS id, church.name AS name, higherChurch.id AS higherChurchId, higherChurch.name AS higherChurchName
`
export const connectChurchAdmin = `
MATCH (church {id:$churchId})<-[:HAS]-(higherChurch)
WHERE church:Constituency OR church:Council OR church:Stream OR church:GatheringService OR church:Sonta OR church:Ministry
MATCH (admin:Member {id:$adminId})
   SET admin.auth_id =  $auth_id
MERGE (admin)-[:IS_ADMIN_FOR]->(church)

RETURN church.id AS id, church.name AS name, higherChurch.id AS higherChurchId, higherChurch.name AS higherChurchName
`

export const connectChurchArrivalsAdmin = `
MATCH (church {id:$churchId})<-[:HAS]-(higherChurch)
WHERE church:Constituency OR church:Council OR church:Stream OR church:GatheringService OR church:Sonta OR church:Ministry
MATCH (admin:Member {id: $arrivalsAdminId})
   SET admin.auth_id =  $auth_id
MERGE (admin)-[:DOES_ARRIVALS_FOR]->(church)

RETURN church.id AS id, church.name AS name, higherChurch.id AS higherChurchId, higherChurch.name AS higherChurchName
`

export const connectChurchArrivalsHelper = `
MATCH (church {id:$churchId})<-[:HAS]-(higherChurch)
WHERE church:Constituency OR church:Council OR church:Stream OR church:GatheringService OR church:Sonta OR church:Ministry
MATCH (admin:Member {id: $arrivalsAdminId})
   SET admin.auth_id =  $auth_id
MERGE (admin)-[:HELPS_ARRIVALS_FOR]->(church)

RETURN church.id AS id, church.name AS name, higherChurch.id AS higherChurchId, higherChurch.name AS higherChurchName
`

//Create the service log and returns its ID
export const createServiceLog = `
MATCH (church {id:$id}) WHERE church:Fellowship OR church:Bacenta OR church:Constituency OR church:Council OR church:Stream OR church:GatheringService OR church:Sonta OR church:Ministry OR church:Member 
OR church:ClosedFellowship OR church:ClosedBacenta

CREATE (log:HistoryLog:ServiceLog)
  SET log.id = apoc.create.uuid(),
   log.timeStamp = datetime(),
   log.historyRecord = $historyRecord

   RETURN log.id AS id
`

export const createHistoryLog = `
MATCH (church {id:$id}) WHERE church:Fellowship OR church:Bacenta OR church:Constituency OR church:Council OR church:Stream OR church:GatheringService OR church:Sonta OR church:Ministry OR church:Member 
OR church:ClosedFellowship OR church:ClosedBacenta

CREATE (log:HistoryLog)
  SET log.id = apoc.create.uuid(),
   log.timeStamp = datetime(),
   log.historyRecord = $historyRecord

   RETURN log.id AS id
`

//Connect log to leader, new church, and old leader
export const connectServiceLog = `
MATCH (church {id:$churchId}) WHERE church:Fellowship OR church:Bacenta OR church:Constituency OR church:Council OR church:Stream OR church:GatheringService OR church:Sonta OR church:Ministry OR church:Member 
OR church:ClosedFellowship OR church:ClosedBacenta

MATCH (leader:Member {id: $servantId})
OPTIONAL MATCH (oldLeader:Member {id: $oldServantId})
MATCH (currentUser:Member {auth_id: $auth.jwt.sub}) 
MATCH (log:ServiceLog {id: $logId})

MERGE (date:TimeGraph {date: date()})
MERGE (log)-[:LOGGED_BY]->(currentUser)
MERGE (log)-[:RECORDED_ON]->(date)
MERGE (leader)-[r1:HAS_HISTORY]->(log)
MERGE (church)-[r2:HAS_HISTORY]->(log)
   SET r1.current = true,
   r2.current = true

RETURN church.id AS id
`

//Connect log to leader, new church, and old leader
export const connectHistoryLog = `
MATCH (church {id:$churchId}) WHERE church:Fellowship OR church:Bacenta OR church:Constituency OR church:Council OR church:Stream OR church:GatheringService OR church:Sonta OR church:Ministry OR church:Member 
OR church:ClosedFellowship OR church:ClosedBacenta

MATCH (leader:Member {id: $servantId})
MATCH (currentUser:Member {auth_id: $auth.jwt.sub}) 
MATCH (log:HistoryLog {id: $logId})

MERGE (date:TimeGraph {date: date()})
MERGE (log)-[:LOGGED_BY]->(currentUser)
MERGE (log)-[:RECORDED_ON]->(date)
MERGE (leader)-[:HAS_HISTORY]->(log)
MERGE (church)-[:HAS_HISTORY]->(log)


RETURN church.id AS id
`

//Connect Log to Upwards Church and Downwards Church
export const connectChurchHistory = `
      MATCH (church {id: $churchId})
      WHERE church:Bacenta OR church:Constituency OR church:Council OR church:Stream OR church:Sonta
      MATCH (church)-[r:HAS_HISTORY]->(churchHistory:ServiceLog) WHERE r.current=true
      MATCH (church)-[:HAS]->(downRelatedChurch)
      MATCH (upRelatedChurch)-[:HAS]->(church)
      MATCH (downRelatedChurch)-[r1:HAS_HISTORY]->(downHistory:ServiceLog) WHERE r1.current=true
      MATCH (upRelatedChurch)-[r2:HAS_HISTORY]->(upHistory:ServiceLog) WHERE r2.current=true

      MERGE (upHistory)-[:HAS]->(churchHistory)
      MERGE (churchHistory)-[:HAS]->(downHistory)

      RETURN churchHistory
`

export const connectFellowshipHistory = `
      MATCH (church:Fellowship {id: $churchId})
      MATCH (church)-[r:HAS_HISTORY]->(churchHistory:ServiceLog) WHERE r.current=true
      MATCH (upRelatedChurch)-[:HAS]->(church)
      MATCH (upRelatedChurch)-[r2:HAS_HISTORY]->(upHistory:ServiceLog) WHERE r2.current=true

      MERGE (upHistory)-[:HAS]->(churchHistory)

      RETURN churchHistory 
`

export const connectGatheringServiceHistory = `
MATCH (church:GatheringService {id: $churchId})
MATCH (church)-[r:HAS_HISTORY]-(churchHistory:ServiceLog) WHERE r.current=true
MATCH (downRelatedChurch)-[:HAS]->(church)
MATCH (downRelatedChurch)-[r2:HAS_HISTORY]->(downHistory:ServiceLog) WHERE r2.current=true

MERGE (churchHistory)-[:HAS]->(downHistory)

RETURN churchHistory
`
