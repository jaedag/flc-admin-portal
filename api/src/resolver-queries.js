export const matchMemberQuery = `
MATCH (member:Member {id:$id}) 
  RETURN 
  member.id AS id,
  member.firstName AS firstName, 
  member.lastName AS lastName,
  member.email AS email,
  member.auth_id AS auth_id,
  member.phoneNumber AS phoneNumber,
  member.pictureUrl AS pictureUrl`

export const setMemberAuthId = `
MATCH (member:Member {id:$id})
SET member.auth_id = $auth_id
RETURN member.auth_id`

export const removeMemberAuthId = `
MATCH (member:Member {id:$id})
REMOVE member.auth_id

CREATE (log:HistoryLog)
  SET
   log.id = apoc.create.uuid(),
   log.timeStamp = time(),
   log.historyRecord = $log

  WITH admin
  MATCH (currentUser:Member {auth_id:$auth.jwt.sub})
  MERGE (admin)-[:HAS_HISTORY]->(log)
  MERGE (log)-[:LOGGED_BY]->(currentUser)
  MERGE (date:TimeGraph {date: date()})
  MERGE (log)-[:RECORDED_ON]->(date)

RETURN member.id`

export const setBishopAdmin = `
MATCH (admin:Member {id:$adminId})
SET admin.auth_id = $auth_id

WITH admin
MATCH (bishop:Member {id:$bishopId})
MATCH (currentUser:Member {auth_id:$auth.jwt.sub})
MERGE (admin)-[:IS_ADMIN_FOR]->(bishop)

CREATE (log:HistoryLog)
  SET
   log.id = apoc.create.uuid(),
   log.timeStamp = time(),
   log.historyRecord = admin.firstName + ' ' +admin.lastName + ' became the admin for ' + bishop.firstName + ' ' + bishop.lastName
         
  MERGE (log)-[:LOGGED_BY]->(currentUser)
  MERGE (date:TimeGraph {date: date()})
  MERGE (log)-[:RECORDED_ON]->(date)
  MERGE (admin)-[:HAS_HISTORY]->(log)
  MERGE (bishop)-[:HAS_HISTORY]->(log)

RETURN admin.auth_id
`

export const removeBishopAdmin = `
MATCH (admin:Member {id:$adminId})

WITH admin
MATCH (bishop:Member {id:$bishopId})
MATCH (currentUser:Member {auth_id:$auth.jwt.sub})
MATCH (admin)-[r:IS_ADMIN_FOR]->(bishop)
DELETE r

CREATE (log:HistoryLog)
  SET
   log.id = apoc.create.uuid(),
   log.timeStamp = time(),
   log.historyRecord = admin.firstName + ' ' +admin.lastName + ' was removed as the admin for ' + bishop.firstName + ' ' + bishop.lastName
         
  MERGE (log)-[:LOGGED_BY]->(currentUser)
  MERGE (date:TimeGraph {date: date()})
  MERGE (log)-[:RECORDED_ON]->(date)
  MERGE (admin)-[:HAS_HISTORY]->(log)
  MERGE (bishop)-[:HAS_HISTORY]->(log)

RETURN admin.auth_id
`

export const setTownAdmin = `
MATCH (admin:Member {id:$adminId})
SET admin.auth_id = $auth_id

WITH admin
MATCH (town:Town {id:$townId})
MATCH (currentUser:Member {auth_id:$auth.jwt.sub})
MERGE (admin)-[:IS_ADMIN_FOR]->(town)

CREATE (log:HistoryLog)
  SET
   log.id = apoc.create.uuid(),
   log.timeStamp = time(),
   log.name=admin.lastName,
   log.historyRecord = admin.firstName + ' ' + admin.lastName+ ' became the admin for ' + town.name
         
  MERGE (log)-[:LOGGED_BY]->(currentUser)
  MERGE (date:TimeGraph {date: date()})
  MERGE (log)-[:RECORDED_ON]->(date)
  MERGE (admin)-[:HAS_HISTORY]->(log)
  MERGE (town)-[:HAS_HISTORY]->(log)

RETURN admin.auth_id
`

export const removeTownAdmin = `
MATCH (admin:Member {id:$adminId})

WITH admin
MATCH (town:Town {id:$townId})
MATCH (currentUser:Member {auth_id:$auth.jwt.sub})
MATCH (admin)-[r:IS_ADMIN_FOR]->(town)
DELETE r

CREATE (log:HistoryLog)
  SET
   log.id = apoc.create.uuid(),
   log.timeStamp = time(),
   log.name=admin.lastName,
   log.historyRecord = admin.firstName + ' ' + admin.lastName+ ' was removed as the admin for ' + town.name
         
  MERGE (log)-[:LOGGED_BY]->(currentUser)
  MERGE (date:TimeGraph {date: date()})
  MERGE (log)-[:RECORDED_ON]->(date)
  MERGE (admin)-[:HAS_HISTORY]->(log)
  MERGE (town)-[:HAS_HISTORY]->(log)

RETURN admin
`

export const setCampusAdmin = `
MATCH (admin:Member {id:$adminId})
SET admin.auth_id = $auth_id

WITH admin
MATCH (campus:Campus {id:$campusId})
MATCH (currentUser:Member {auth_id:$auth.jwt.sub})
MERGE (admin)-[:IS_ADMIN_FOR]->(campus)

CREATE (log:HistoryLog)
  SET
   log.id = apoc.create.uuid(),
   log.timeStamp = time(),
   log.historyRecord = admin.firstName + ' ' +admin.lastName + ' became the admin for ' + campus.name
         
  MERGE (log)-[:LOGGED_BY]->(currentUser)
  MERGE (date:TimeGraph {date: date()})
  MERGE (log)-[:RECORDED_ON]->(date)
  MERGE (admin)-[:HAS_HISTORY]->(log)
  MERGE (campus)-[:HAS_HISTORY]->(log)

RETURN admin.auth_id
`

export const removeCampusAdmin = `
MATCH (admin:Member {id:$adminId})

WITH admin
MATCH (campus:Campus {id:$townId})
MATCH (currentUser:Member {auth_id:$auth.jwt.sub})
MATCH (admin)-[r:IS_ADMIN_FOR]->(campus)
DELETE r 

CREATE (log:HistoryLog)
  SET
   log.id = apoc.create.uuid(),
   log.timeStamp = time(),
   log.historyRecord = admin.firstName + ' ' +admin.lastName +  was removed as the admin for ' + campus.name
         
  MERGE (log)-[:LOGGED_BY]->(currentUser)
  MERGE (date:TimeGraph {date: date()})
  MERGE (log)-[:RECORDED_ON]->(date)
  MERGE (admin)-[:HAS_HISTORY]->(log)
  MERGE (campus)-[:HAS_HISTORY]->(log)

RETURN admin.auth_id
`

export const makeBacentaLeader = `
MATCH (leader:Member {id:$leaderId})
MATCH (bacenta:Bacenta {id:$bacentaId})
CREATE (log:HistoryLog:ServiceLog)
  SET leader.auth_id = $auth_id,
   log.id = apoc.create.uuid(),
   log.timeStamp = time(),
   log.historyRecord = leader.firstName + ' ' +leader.lastName + ' became the bacenta leader for ' + bacenta.name

WITH leader,bacenta, log
OPTIONAL MATCH (bacenta)<-[oldLeads:LEADS]-(oldLeader:Member)
OPTIONAL MATCH (bacenta)-[oldHistory:HAS_HISTORY]->()-[oldLeaderHistory:HAS_HISTORY]-(oldLeader)

SET oldHistory.current = false, oldLeaderHistory.current = false //nullify old history relationship
   DELETE oldLeads //Delete old relationship

WITH log,bacenta,oldLeader,leader
       CALL{
         WITH log,bacenta,oldLeader, leader
         WITH log,bacenta,oldLeader, leader
         WHERE EXISTS (oldLeader.firstName)
        
       MERGE (oldLeader)-[:HAS_HISTORY]->(log)
        SET log.historyRecord = leader.firstName + ' ' +leader.lastName + ' became the leader for ' + bacenta.name + " Bacenta replacing " + oldLeader.firstName +" "+oldLeader.lastName
       RETURN COUNT(log)
       }
  
   MATCH (currentUser:Member {auth_id:$auth.jwt.sub}) 
   WITH currentUser, leader, bacenta, log
   MERGE (leader)-[:LEADS]->(bacenta)
   MERGE (log)-[:LOGGED_BY]->(currentUser)
   MERGE (date:TimeGraph {date: date()})
   MERGE (log)-[:RECORDED_ON]->(date)
   MERGE (leader)-[r1:HAS_HISTORY]->(log)
   MERGE (bacenta)-[r2:HAS_HISTORY]->(log)
   SET r1.current = true,
   r2.current = true

   RETURN leader.id AS id, leader.auth_id AS auth_id, leader.firstName AS firstName, leader.lastName AS lastName
`
