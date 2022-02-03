export const makeFellowshipLeader = `
MATCH (leader:Member {id:$leaderId})
MATCH (fellowship:Fellowship {id:$fellowshipId})
MATCH (fellowship)<-[:HAS]-(bacenta:Bacenta)
CREATE (log:HistoryLog:ServiceLog)
  SET leader.auth_id = $auth_id,
   log.id = apoc.create.uuid(),
   log.timeStamp = datetime(),
   log.historyRecord = leader.firstName + ' ' +leader.lastName + ' started ' + fellowship.name+' Fellowship under '+ bacenta.name + ' Bacenta'
WITH leader,fellowship, log
OPTIONAL MATCH (fellowship)<-[oldLeads:LEADS]-(oldLeader:Member)
OPTIONAL MATCH (fellowship)-[oldHistory:HAS_HISTORY]->(:HistoryLog)-[oldLeaderHistory:HAS_HISTORY]-(oldLeader)
SET oldHistory.current = false, oldLeaderHistory.current = false //nullify old history relationship
   DELETE oldLeads //Delete old relationship
WITH log,fellowship,oldLeader,leader
       CALL{
         WITH log,fellowship,oldLeader, leader
         WITH log,fellowship,oldLeader, leader WHERE
         EXISTS (oldLeader.firstName) AND oldLeader.id <> $leaderId
        
       MERGE (oldLeader)-[hasHistory:HAS_HISTORY]->(log)
        SET hasHistory.neverLed = true,
        log.historyRecord = leader.firstName + ' ' +leader.lastName + ' became the leader of ' + fellowship.name + " Fellowship replacing " + oldLeader.firstName +" "+oldLeader.lastName
       RETURN COUNT(log)
       }
  
  MATCH (fellowship)<-[:HAS]-(:Bacenta)-[rel:HAS_HISTORY]->(bacentaHistory:ServiceLog) WHERE rel.current = true
  OPTIONAL MATCH (bacentaHistory)-[oldFellowshipHistory:HAS]->(:ServiceLog)-[:HAS_HISTORY]-(fellowship)
  
  MATCH (currentUser:Member {auth_id:$auth.jwt.sub}) 

   WITH currentUser, leader, fellowship, log, oldFellowshipHistory, bacentaHistory
   MERGE (leader)-[:LEADS]->(fellowship)
   MERGE (log)-[:LOGGED_BY]->(currentUser)
   MERGE (date:TimeGraph {date: date()})
   MERGE (log)-[:RECORDED_ON]->(date)
   MERGE (leader)-[r1:HAS_HISTORY]->(log)
   MERGE (fellowship)-[r2:HAS_HISTORY]->(log)
   MERGE (bacentaHistory)-[r3:HAS]->(log)
   SET r1.current = true,
   r2.current = true,
   r3.current=true
   REMOVE oldFellowshipHistory.current

   RETURN leader.id AS id, leader.auth_id AS auth_id, leader.firstName AS firstName, leader.lastName AS lastName
`

export const makeBacentaLeader = `
MATCH (leader:Member {id:$leaderId})
MATCH (bacenta:Bacenta {id:$bacentaId})
MATCH (bacenta)<-[:HAS]-(constituency) 

CREATE (log:HistoryLog:ServiceLog)
  SET leader.auth_id = $auth_id,
   log.id = apoc.create.uuid(),
   log.timeStamp = datetime(),
   log.historyRecord = leader.firstName + ' ' +leader.lastName + ' started ' + bacenta.name +' Bacenta under '+ constituency.name + ' Constituency'
WITH leader,bacenta, log, constituency
OPTIONAL MATCH (bacenta)<-[oldLeads:LEADS]-(oldLeader:Member)
OPTIONAL MATCH (bacenta)-[oldHistory:HAS_HISTORY]->()-[oldLeaderHistory:HAS_HISTORY]-(oldLeader)
SET oldHistory.current = false, oldLeaderHistory.current = false //nullify old history relationship
   DELETE oldLeads //Delete old relationship
WITH log,bacenta,oldLeader,leader, constituency
       CALL{
         WITH log,bacenta,oldLeader, leader
         WITH log,bacenta,oldLeader, leader 
         WHERE EXISTS (oldLeader.firstName) AND oldLeader.id <> $leaderId
        
       MERGE (oldLeader)-[hasHistory:HAS_HISTORY]->(log)
       SET hasHistory.neverLed = true,
       log.historyRecord = leader.firstName + ' ' +leader.lastName + ' became the leader of ' + bacenta.name + " Bacenta replacing " + oldLeader.firstName +" "+oldLeader.lastName
       RETURN COUNT(log)
       }
 
       MATCH (bacenta)<-[:HAS]-(constituency)-[rel:HAS_HISTORY]->(constituencyHistory:ServiceLog) WHERE rel.current = true
       OPTIONAL MATCH (constituencyHistory)-[oldBacentaHistory:HAS]->(:ServiceLog)-[:HAS_HISTORY]-(bacenta)   

   MATCH (currentUser:Member {auth_id:$auth.jwt.sub})

   WITH currentUser, leader, bacenta, log, oldBacentaHistory, constituencyHistory
   MERGE (leader)-[:LEADS]->(bacenta)
   MERGE (log)-[:LOGGED_BY]->(currentUser)
   MERGE (date:TimeGraph {date: date()})
   MERGE (log)-[:RECORDED_ON]->(date)
   MERGE (leader)-[r1:HAS_HISTORY]->(log)
   MERGE (bacenta)-[r2:HAS_HISTORY]->(log)
   MERGE (constituencyHistory)-[r3:HAS]->(log)
   SET r1.current = true,
   r2.current = true,
   r3.current = true
   REMOVE oldBacentaHistory.current

   RETURN leader.id AS id, leader.auth_id AS auth_id, leader.firstName AS firstName, leader.lastName AS lastName
`

export const makeConstituencyLeader = `
MATCH (leader:Member {id:$leaderId})
MATCH (constituency:Constituency {id:$constituencyId})
MATCH (constituency)<-[:HAS]-(council:Council)
CREATE (log:HistoryLog:ServiceLog)
  SET leader.auth_id = $auth_id,
   log.id = apoc.create.uuid(),
   log.timeStamp = datetime(),
   log.historyRecord = leader.firstName + ' ' +leader.lastName + ' started ' + constituency.name +' Constituency under '+ council.name+ ' Council'
WITH leader,constituency, log
OPTIONAL MATCH (constituency)<-[oldLeads:LEADS]-(oldLeader:Member)
OPTIONAL MATCH (constituency)-[oldHistory:HAS_HISTORY]->()-[oldLeaderHistory:HAS_HISTORY]-(oldLeader)
SET oldHistory.current = false, oldLeaderHistory.current = false //nullify old history relationship
   DELETE oldLeads //Delete old relationship
WITH log,constituency,oldLeader,leader
       CALL{
         WITH log,constituency,oldLeader, leader
         WITH log,constituency,oldLeader, leader 
         WHERE EXISTS (oldLeader.firstName) AND oldLeader.id <> $leaderId
        
       MERGE (oldLeader)-[hasHistory:HAS_HISTORY]->(log)
       SET hasHistory.neverLed = true,
       log.historyRecord = leader.firstName + ' ' +leader.lastName + ' became the leader of ' + constituency.name + " Constituency replacing " + oldLeader.firstName +" "+oldLeader.lastName
       RETURN COUNT(log)
       }

   MATCH (constituency)<-[:HAS]-(:Council)-[rel:HAS_HISTORY]->(councilHistory:ServiceLog) WHERE rel.current = true
   OPTIONAL MATCH (councilHistory)-[oldConstituencyHistory:HAS]->(:ServiceLog)-[:HAS_HISTORY]-(constituency)

   MATCH (currentUser:Member {auth_id:$auth.jwt.sub}) 

   WITH currentUser, leader, constituency, log, oldConstituencyHistory, councilHistory
   MERGE (leader)-[:LEADS]->(constituency)
   MERGE (log)-[:LOGGED_BY]->(currentUser)
   MERGE (date:TimeGraph {date: date()})
   MERGE (log)-[:RECORDED_ON]->(date)
   MERGE (leader)-[r1:HAS_HISTORY]->(log)
   MERGE (constituency)-[r2:HAS_HISTORY]->(log)
   MERGE (councilHistory)-[r3:HAS]->(log)
   SET r1.current = true,
   r2.current = true,
   r3.current = true
   REMOVE oldConstituencyHistory.current 
   
   RETURN leader.id AS id, leader.auth_id AS auth_id, leader.firstName AS firstName, leader.lastName AS lastName
`

export const makeCouncilLeader = `
MATCH (leader:Member {id:$leaderId})
MATCH (council:Council {id:$councilId})
MATCH (council)<-[:HAS]-(stream:Stream)
CREATE (log:HistoryLog:ServiceLog)
  SET leader.auth_id = $auth_id,
   log.id = apoc.create.uuid(),
   log.timeStamp = datetime(),
   log.historyRecord = leader.firstName + ' ' +leader.lastName + ' started ' + council.name+ ' Council under '+ stream.name + ' Stream'
WITH leader,council, log
OPTIONAL MATCH (council)<-[oldLeads:LEADS]-(oldLeader:Member)
OPTIONAL MATCH (council)-[oldHistory:HAS_HISTORY]->()-[oldLeaderHistory:HAS_HISTORY]-(oldLeader)
SET oldHistory.current = false, oldLeaderHistory.current = false //nullify old history relationship
   DELETE oldLeads //Delete old relationship
WITH log,council,oldLeader,leader
       CALL{
         WITH log,council,oldLeader, leader
         WITH log,council,oldLeader, leader 
         WHERE EXISTS (oldLeader.firstName) AND oldLeader.id <> $leaderId
        
       MERGE (oldLeader)-[hasHistory:HAS_HISTORY]->(log)
       SET hasHistory.neverLed = true,
       log.historyRecord = leader.firstName + ' ' +leader.lastName + ' became the leader of ' + council.name+ ' Council replacing ' + oldLeader.firstName +' '+oldLeader.lastName
       RETURN COUNT(log)
       }

   MATCH (council)<-[:HAS]-(:Stream)-[rel:HAS_HISTORY]->(stream_history:ServiceLog) WHERE rel.current = true
   OPTIONAL MATCH (stream_history)-[oldCouncilHistory:HAS]->(:ServiceLog)-[:HAS_HISTORY]-(council)

   MATCH (currentUser:Member {auth_id:$auth.jwt.sub}) 

   WITH currentUser, leader, council, log, oldCouncilHistory, stream_history
   MERGE (leader)-[:LEADS]->(council)
   MERGE (log)-[:LOGGED_BY]->(currentUser)
   MERGE (date:TimeGraph {date: date()})
   MERGE (log)-[:RECORDED_ON]->(date)
   MERGE (leader)-[r1:HAS_HISTORY]->(log)
   MERGE (council)-[r2:HAS_HISTORY]->(log)
   MERGE (stream_history)-[r3:HAS]->(log)
   SET r1.current = true,
   r2.current = true,
   r3.current = true
   REMOVE oldCouncilHistory.current 
   
   RETURN leader.id AS id, leader.auth_id AS auth_id, leader.firstName AS firstName, leader.lastName AS lastName
`

export const makeStreamLeader = `
MATCH (leader:Member {id:$leaderId})
MATCH (stream:Stream {id:$streamId})
MATCH (stream)<-[:HAS]-(gatheringService:GatheringService)
CREATE (log:HistoryLog:ServiceLog)
  SET leader.auth_id = $auth_id,
   log.id = apoc.create.uuid(),
   log.timeStamp = datetime(),
   log.historyRecord = leader.firstName + ' ' +leader.lastName + ' started ' + stream.name+ ' Stream under '+ gatheringService.name + ' Gathering Service'
WITH leader,stream, log
OPTIONAL MATCH (stream)<-[oldLeads:LEADS]-(oldLeader:Member)
OPTIONAL MATCH (stream)-[oldHistory:HAS_HISTORY]->()-[oldLeaderHistory:HAS_HISTORY]-(oldLeader)
SET oldHistory.current = false, oldLeaderHistory.current = false //nullify old history relationship
   DELETE oldLeads //Delete old relationship
WITH log,stream,oldLeader,leader
       CALL{
         WITH log,stream,oldLeader, leader
         WITH log,stream,oldLeader, leader 
         WHERE EXISTS (oldLeader.firstName) AND oldLeader.id <> $leaderId
        
       MERGE (oldLeader)-[hasHistory:HAS_HISTORY]->(log)
       SET hasHistory.neverLed = true,
       log.historyRecord = leader.firstName + ' ' +leader.lastName + ' became the leader of ' + stream.name+ ' Stream replacing ' + oldLeader.firstName +' '+oldLeader.lastName
       RETURN COUNT(log)
       }

   MATCH (stream)<-[:HAS]-(:GatheringService)-[rel:HAS_HISTORY]->(gatheringService_history:ServiceLog) WHERE rel.current = true
   OPTIONAL MATCH (gatheringService_history)-[oldStreamHistory:HAS]->(:ServiceLog)-[:HAS_HISTORY]-(stream)

   MATCH (currentUser:Member {auth_id:$auth.jwt.sub}) 

   WITH currentUser, leader, stream, log, oldStreamHistory, gatheringService_history
   MERGE (leader)-[:LEADS]->(stream)
   MERGE (log)-[:LOGGED_BY]->(currentUser)
   MERGE (date:TimeGraph {date: date()})
   MERGE (log)-[:RECORDED_ON]->(date)
   MERGE (leader)-[r1:HAS_HISTORY]->(log)
   MERGE (stream)-[r2:HAS_HISTORY]->(log)
   MERGE (gatheringService_history)-[r3:HAS]->(log)
   SET r1.current = true,
   r2.current = true,
   r3.current = true
   REMOVE oldStreamHistory.current 
   
   RETURN leader.id AS id, leader.auth_id AS auth_id, leader.firstName AS firstName, leader.lastName AS lastName
`

// MAKE AN ADMIN

export const makeStreamAdmin = `
MATCH (admin:Member {id:$adminId})
MATCH (stream:Stream {id:$streamId})
CREATE (log:HistoryLog)
  SET admin.auth_id = $auth_id,
   log.id = apoc.create.uuid(),
   log.timeStamp = datetime(),
   log.historyRecord = admin.firstName + ' ' +admin.lastName + ' became admin for ' + stream.name + ' Stream'
WITH admin,stream, log
OPTIONAL MATCH (stream)<-[oldAdmins:IS_ADMIN_FOR]-(oldAdmin:Member)
OPTIONAL MATCH (stream)-[oldHistory:HAS_HISTORY]->()-[oldAdminHistory:HAS_HISTORY]-(oldAdmin)
SET oldHistory.current = false, oldAdminHistory.current = false //nullify old history relationship
   DELETE oldAdmins //Delete old relationship
WITH log,stream,oldAdmin,admin
       CALL{
         WITH log,stream,oldAdmin, admin
         WITH log,stream,oldAdmin, admin 
         WHERE EXISTS (oldAdmin.firstName) AND oldAdmin.id <> $adminId
        
       MERGE (oldAdmin)-[hasHistory:HAS_HISTORY]->(log)
       SET hasHistory.neverAdmin = true,
       log.historyRecord = admin.firstName + ' ' +admin.lastName + ' became the admin ' + stream.name + ' Stream replacing ' + oldAdmin.firstName +' '+oldAdmin.lastName
       RETURN COUNT(log)
       }
  
   MATCH (currentUser:Member {auth_id:$auth.jwt.sub}) 
   WITH currentUser, admin, stream, log
   MERGE (admin)-[:IS_ADMIN_FOR]->(stream)
   MERGE (log)-[:LOGGED_BY]->(currentUser)
   MERGE (date:TimeGraph {date: date()})
   MERGE (log)-[:RECORDED_ON]->(date)
   MERGE (admin)-[r1:HAS_HISTORY]->(log)
   MERGE (stream)-[r2:HAS_HISTORY]->(log)
   SET r1.current = true,
   r2.current = true
   RETURN admin.id AS id, admin.auth_id AS auth_id, admin.firstName AS firstName, admin.lastName AS lastName
`

export const makeCouncilAdmin = `
MATCH (admin:Member {id:$adminId})
MATCH (council:Council {id:$councilId})
CREATE (log:HistoryLog)
  SET admin.auth_id = $auth_id,
   log.id = apoc.create.uuid(),
   log.timeStamp = datetime(),
   log.historyRecord = admin.firstName + ' ' +admin.lastName + ' became admin for ' + council.name + ' Council'
WITH admin,council, log
OPTIONAL MATCH (council)<-[oldAdmins:IS_ADMIN_FOR]-(oldAdmin:Member)
OPTIONAL MATCH (council)-[oldHistory:HAS_HISTORY]->()-[oldAdminHistory:HAS_HISTORY]-(oldAdmin)
SET oldHistory.current = false, oldAdminHistory.current = false //nullify old history relationship
   DELETE oldAdmins //Delete old relationship
WITH log,council,oldAdmin,admin
       CALL{
         WITH log,council,oldAdmin, admin
         WITH log,council,oldAdmin, admin 
         WHERE EXISTS (oldAdmin.firstName) AND oldAdmin.id <> $adminId
        
       MERGE (oldAdmin)-[hasHistory:HAS_HISTORY]->(log)
       SET hasHistory.neverAdmin = true,
       log.historyRecord = admin.firstName + ' ' +admin.lastName + ' became the admin ' + council.name + ' Council replacing ' + oldAdmin.firstName +' '+oldAdmin.lastName
       RETURN COUNT(log)
       }
  
   MATCH (currentUser:Member {auth_id:$auth.jwt.sub}) 
   WITH currentUser, admin, council, log
   MERGE (admin)-[:IS_ADMIN_FOR]->(council)
   MERGE (log)-[:LOGGED_BY]->(currentUser)
   MERGE (date:TimeGraph {date: date()})
   MERGE (log)-[:RECORDED_ON]->(date)
   MERGE (admin)-[r1:HAS_HISTORY]->(log)
   MERGE (council)-[r2:HAS_HISTORY]->(log)
   SET r1.current = true,
   r2.current = true
   RETURN admin.id AS id, admin.auth_id AS auth_id, admin.firstName AS firstName, admin.lastName AS lastName
`

export const makeConstituencyAdmin = `
MATCH (admin:Member {id:$adminId})
MATCH (constituency:Constituency {id:$constituencyId})
CREATE (log:HistoryLog:ServiceLog)
  SET admin.auth_id = $auth_id,
   log.id = apoc.create.uuid(),
   log.timeStamp = datetime(),
   log.historyRecord = admin.firstName + ' ' +admin.lastName + ' became admin for ' + constituency.name
WITH admin,constituency, log
OPTIONAL MATCH (constituency)<-[oldAdmins:IS_ADMIN_FOR]-(oldAdmin:Member)
OPTIONAL MATCH (constituency)-[oldHistory:HAS_HISTORY]->()-[oldAdminHistory:HAS_HISTORY]-(oldAdmin)
SET oldHistory.current = false, oldAdminHistory.current = false //nullify old history relationship
   DELETE oldAdmins //Delete old relationship
WITH log,constituency,oldAdmin,admin
       CALL{
         WITH log,constituency,oldAdmin, admin
         WITH log,constituency,oldAdmin, admin 
         WHERE EXISTS (oldAdmin.firstName) AND oldAdmin.id <> $adminId
        
       MERGE (oldAdmin)-[hasHistory:HAS_HISTORY]->(log)
       SET hasHistory.neverAdmin = true,
       log.historyRecord = admin.firstName + ' ' +admin.lastName + ' became the admin of ' + constituency.name + " Constituency replacing " + oldAdmin.firstName +" "+oldAdmin.lastName
       RETURN COUNT(log)
       }
  
   MATCH (currentUser:Member {auth_id:$auth.jwt.sub}) 
   WITH currentUser, admin, constituency, log
   MERGE (admin)-[:IS_ADMIN_FOR]->(constituency)
   MERGE (log)-[:LOGGED_BY]->(currentUser)
   MERGE (date:TimeGraph {date: date()})
   MERGE (log)-[:RECORDED_ON]->(date)
   MERGE (admin)-[r1:HAS_HISTORY]->(log)
   MERGE (constituency)-[r2:HAS_HISTORY]->(log)
   SET r1.current = true,
   r2.current = true
   
   RETURN admin.id AS id, admin.auth_id AS auth_id, admin.firstName AS firstName, admin.lastName AS lastName
`

//MAKE AN ARRIVALS ADMINISTRATOR

//Arrivals Stuff
export const makeConstituencyArrivalsAdmin = `
MATCH (admin:Member {id:$adminId})
MATCH (constituency:Constituency {id:$constituencyId})
CREATE (log:HistoryLog:ServiceLog)
  SET admin.auth_id = $auth_id,
   log.id = apoc.create.uuid(),
   log.timeStamp = datetime(),
   log.historyRecord = admin.firstName + ' ' +admin.lastName + ' became arrivals rep for ' + constituency.name
WITH admin,constituency, log
OPTIONAL MATCH (constituency)<-[oldAdmins:IS_ARRIVALS_FOR]-(oldAdmin:Member)
OPTIONAL MATCH (constituency)-[oldHistory:HAS_HISTORY]->()-[oldAdminHistory:HAS_HISTORY]-(oldAdmin)
SET oldHistory.current = false, oldAdminHistory.current = false //nullify old history relationship
   DELETE oldAdmins //Delete old relationship
WITH log,constituency,oldAdmin,admin
       CALL{
         WITH log,constituency,oldAdmin, admin
         WITH log,constituency,oldAdmin, admin 
         WHERE EXISTS (oldAdmin.firstName) AND oldAdmin.id <> $adminId
        
       MERGE (oldAdmin)-[hasHistory:HAS_HISTORY]->(log)
       SET hasHistory.neverAdmin = true,
       log.historyRecord = admin.firstName + ' ' +admin.lastName + ' became the arrivals rep for ' + constituency.name + " Constituency replacing " + oldAdmin.firstName +" "+oldAdmin.lastName
       RETURN COUNT(log)
       }
  
   MATCH (currentUser:Member {auth_id:$auth.jwt.sub}) 
   WITH currentUser, admin, constituency, log
   MERGE (admin)-[:IS_ARRIVALS_FOR]->(constituency)
   MERGE (log)-[:LOGGED_BY]->(currentUser)
   MERGE (date:TimeGraph {date: date()})
   MERGE (log)-[:RECORDED_ON]->(date)
   MERGE (admin)-[r1:HAS_HISTORY]->(log)
   MERGE (constituency)-[r2:HAS_HISTORY]->(log)
   SET r1.current = true,
   r2.current = true
   
   RETURN admin.id AS id, admin.auth_id AS auth_id, admin.firstName AS firstName, admin.lastName AS lastName
`
