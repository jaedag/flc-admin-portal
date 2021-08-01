export const matchMemberQuery = `
WITH apoc.cypher.runFirstColumn(
  "MATCH (member:Member {id:$id})
  RETURN member", {offset:0, first:5, id: $id}, True) AS x UNWIND x AS member
  RETURN member { .id,.auth_id, .firstName,.lastName,.email,.phoneNumber,.whatsappNumber,.pictureUrl,
  leadsBacenta: [ member_bacentas IN apoc.cypher.runFirstColumn("MATCH (this)-[:LEADS]-(bacenta:Bacenta)
  RETURN bacenta", {this: member}, true) | member_bacentas { .id,.name }],
  leadsCentre: [ member_centres IN apoc.cypher.runFirstColumn("MATCH (this)-[:LEADS]-(centre:Centre)
  RETURN centre", {this: member}, true) | member_centres { .id,.name }],
  leadsSonta: [ member_sontas IN apoc.cypher.runFirstColumn("MATCH (this)-[:LEADS]-(sonta:Sonta)
  RETURN sonta", {this: member}, true) | member_sontas { .id,.name }],
  isAdminForCampus: [ member_adminCampuses IN apoc.cypher.runFirstColumn("MATCH (this)-[:IS_ADMIN_FOR]-(adminCampus:Campus)
  RETURN adminCampus", {this: member}, true) | member_adminCampuses { .id,.name }],
  isAdminForTown: [ member_adminTowns IN apoc.cypher.runFirstColumn("MATCH (this)-[:IS_ADMIN_FOR]-(adminTown:Town)
  RETURN adminTown", {this: member}, true) | member_adminTowns { .id,.name }],
  isAdminForBishop: [ member_adminBishops IN apoc.cypher.runFirstColumn("MATCH (this)-[:IS_ADMIN_FOR]-(adminBishop:Member)
  RETURN adminBishop", {this: member}, true) | member_adminBishops { .id,.firstName,.lastName }],
  leadsCampus: [ member_campus IN apoc.cypher.runFirstColumn("MATCH (this)-[:LEADS]-(campus:Campus)
  RETURN campus", {this: member}, true) | member_campus { .id,.name }],
  leadsTown: [ member_town IN apoc.cypher.runFirstColumn("MATCH (this)-[:LEADS]-(town:Town)
  RETURN town", {this: member}, true) | member_town { .id,.name }] } AS member
  `

export const matchChurchQuery = `
  MATCH (church {id:$id}) 
  WHERE church:Bacenta OR church:Centre OR church:Campus OR church:Town OR church:Sonta OR church:Ministry OR church:Member
  RETURN church.id AS id, church.name AS name, church.firstName AS firstName, church.lastName AS lastName, labels(church) AS type
  `

export const setMemberAuthId = `
MATCH (member:Member {id:$id})
SET member.auth_id = $auth_id
RETURN member.auth_id`

export const removeMemberAuthId = `
MATCH (member:Member {auth_id:$auth_id})
REMOVE member.auth_id

CREATE (log:HistoryLog)
  SET
   log.id = apoc.create.uuid(),
   log.timeStamp = datetime(),
   log.historyRecord = $log

  WITH admin
  MATCH (currentUser:Member {auth_id:$auth.jwt.sub})
  MERGE (admin)-[:HAS_HISTORY]->(log)
  MERGE (log)-[:LOGGED_BY]->(currentUser)
  MERGE (date:TimeGraph {date: date()})
  MERGE (log)-[:RECORDED_ON]->(date)

RETURN member.id`

export const makeBishopAdmin = `
MATCH (admin:Member {id:$adminId})
SET admin.auth_id = $auth_id

WITH admin
MATCH (bishop:Member {id:$bishopId})
MATCH (currentUser:Member {auth_id:$auth.jwt.sub})
MERGE (admin)-[:IS_ADMIN_FOR]->(bishop)

CREATE (log:HistoryLog)
  SET
   log.id = apoc.create.uuid(),
   log.timeStamp = datetime(),
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
   log.timeStamp = datetime(),
   log.historyRecord = admin.firstName + ' ' +admin.lastName + ' was removed as the admin for ' + bishop.firstName + ' ' + bishop.lastName
         
  MERGE (log)-[:LOGGED_BY]->(currentUser)
  MERGE (date:TimeGraph {date: date()})
  MERGE (log)-[:RECORDED_ON]->(date)
  MERGE (admin)-[:HAS_HISTORY]->(log)
  MERGE (bishop)-[:HAS_HISTORY]->(log)

RETURN admin.auth_id
`

export const makeTownAdmin = `
MATCH (admin:Member {id:$adminId})
SET admin.auth_id = $auth_id

WITH admin
MATCH (town:Town {id:$townId})
MATCH (currentUser:Member {auth_id:$auth.jwt.sub})
MERGE (admin)-[:IS_ADMIN_FOR]->(town)

CREATE (log:HistoryLog)
  SET
   log.id = apoc.create.uuid(),
   log.timeStamp = datetime(),
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
   log.timeStamp = datetime(),
   log.name=admin.lastName,
   log.historyRecord = admin.firstName + ' ' + admin.lastName+ ' was removed as the admin for ' + town.name
         
  MERGE (log)-[:LOGGED_BY]->(currentUser)
  MERGE (date:TimeGraph {date: date()})
  MERGE (log)-[:RECORDED_ON]->(date)
  MERGE (admin)-[:HAS_HISTORY]->(log)
  MERGE (town)-[:HAS_HISTORY]->(log)

RETURN admin
`

export const makeCampusAdmin = `
MATCH (admin:Member {id:$adminId})
MATCH (campus:Campus {id:$campusId})
CREATE (log:HistoryLog)
  SET admin.auth_id = $auth_id,
   log.id = apoc.create.uuid(),
   log.timeStamp = datetime(),
   log.historyRecord = admin.firstName + " " +admin.lastName + "became the admin for " + campus.name+ " Campus"

WITH admin,campus, log
OPTIONAL MATCH (campus)<-[oldLeads:IS_ADMIN_FOR]-(oldAdmin:Member)
OPTIONAL MATCH (campus)-[oldHistory:HAS_HISTORY]->()-[oldAdminHistory:HAS_HISTORY]-(oldAdmin)
  DELETE oldLeads //Delete old relationship

WITH log,campus,oldAdmin,admin
       CALL{
         WITH log,campus,oldAdmin, admin
         WITH log,campus,oldAdmin, admin
         WHERE EXISTS (oldAdmin.firstName)
        
       MERGE (oldAdmin)-[hasHistory:HAS_HISTORY]->(log)
      SET log.historyRecord = admin.firstName + " " +admin.lastName + " became the admin of " + campus.name + " Campus replacing " + oldAdmin.firstName +" "+oldAdmin.lastName
       RETURN COUNT(log)
       }
  
   MATCH (currentUser:Member {auth_id:$auth.jwt.sub}) 
   WITH currentUser, admin, campus, log
   MERGE (admin)-[:IS_ADMIN_FOR]->(campus)
   MERGE (log)-[:LOGGED_BY]->(currentUser)
   MERGE (date:TimeGraph {date: date()})
   MERGE (log)-[:RECORDED_ON]->(date)
   MERGE (admin)-[:HAS_HISTORY]->(log)
   MERGE (campus)-[:HAS_HISTORY]->(log)

   RETURN admin.id AS id, admin.auth_id AS auth_id, admin.firstName AS firstName, admin.lastName AS lastName
`

export const makeBacentaLeader = `
MATCH (leader:Member {id:$leaderId})
MATCH (bacenta:Bacenta {id:$bacentaId})
OPTIONAL MATCH (bacenta)<-[:HAS_BACENTA]-(centre:Centre)
CREATE (log:HistoryLog:ServiceLog)
  SET leader.auth_id = $auth_id,
   log.id = apoc.create.uuid(),
   log.timeStamp = datetime(),
   log.historyRecord = leader.firstName + ' ' +leader.lastName + ' started ' + bacenta.name+' Bacenta under '+ centre.name + ' Centre'

WITH leader,bacenta, log
OPTIONAL MATCH (bacenta)<-[oldLeads:LEADS]-(oldLeader:Member)
OPTIONAL MATCH (bacenta)-[oldHistory:HAS_HISTORY]->()-[oldLeaderHistory:HAS_HISTORY]-(oldLeader)

SET oldHistory.current = false, oldLeaderHistory.current = false //nullify old history relationship
   DELETE oldLeads //Delete old relationship

WITH log,bacenta,oldLeader,leader
       CALL{
         WITH log,bacenta,oldLeader, leader
         WITH log,bacenta,oldLeader, leader WHERE
         EXISTS (oldLeader.firstName)
        
       MERGE (oldLeader)-[hasHistory:HAS_HISTORY]->(log)
        SET hasHistory.neverLed = true,
        log.historyRecord = leader.firstName + ' ' +leader.lastName + ' became the leader of ' + bacenta.name + " Bacenta replacing " + oldLeader.firstName +" "+oldLeader.lastName
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

export const makeCentreLeader = `
MATCH (leader:Member {id:$leaderId})
MATCH (centre:Centre {id:$centreId})
OPTIONAL MATCH (centre)<-[:HAS_CENTRE]-(campusTown) 
UNWIND labels(campusTown) AS stream

CREATE (log:HistoryLog:ServiceLog)
  SET leader.auth_id = $auth_id,
   log.id = apoc.create.uuid(),
   log.timeStamp = datetime(),
   log.historyRecord = leader.firstName + ' ' +leader.lastName + ' started ' + centre.name +' Centre under '+ campusTown.name + ' ' + stream

WITH leader,centre, log
OPTIONAL MATCH (centre)<-[oldLeads:LEADS]-(oldLeader:Member)
OPTIONAL MATCH (centre)-[oldHistory:HAS_HISTORY]->()-[oldLeaderHistory:HAS_HISTORY]-(oldLeader)

SET oldHistory.current = false, oldLeaderHistory.current = false //nullify old history relationship
   DELETE oldLeads //Delete old relationship

WITH log,centre,oldLeader,leader
       CALL{
         WITH log,centre,oldLeader, leader
         WITH log,centre,oldLeader, leader 
         WHERE EXISTS (oldLeader.firstName)
        
       MERGE (oldLeader)-[hasHistory:HAS_HISTORY]->(log)
       SET hasHistory.neverLed = true,
       log.historyRecord = leader.firstName + ' ' +leader.lastName + ' became the leader of ' + centre.name + " Centre replacing " + oldLeader.firstName +" "+oldLeader.lastName
       RETURN COUNT(log)
       }
  
   MATCH (currentUser:Member {auth_id:$auth.jwt.sub})

   WITH currentUser, leader, centre, log
   MERGE (leader)-[:LEADS]->(centre)
   MERGE (log)-[:LOGGED_BY]->(currentUser)
   MERGE (date:TimeGraph {date: date()})
   MERGE (log)-[:RECORDED_ON]->(date)
   MERGE (leader)-[r1:HAS_HISTORY]->(log)
   MERGE (centre)-[r2:HAS_HISTORY]->(log)
   SET r1.current = true,
   r2.current = true

   RETURN leader.id AS id, leader.auth_id AS auth_id, leader.firstName AS firstName, leader.lastName AS lastName
`

export const makeSontaLeader = `
MATCH (leader:Member {id:$leaderId})
MATCH (sonta:Sonta {id:$sontaId})
OPTIONAL MATCH (sonta)<-[:HAS_SONTA]-(campusTown) 
UNWIND labels(campusTown) AS stream
CREATE (log:HistoryLog:ServiceLog)
  SET leader.auth_id = $auth_id,
   log.id = apoc.create.uuid(),
   log.timeStamp = datetime(),
   log.historyRecord = leader.firstName + ' ' +leader.lastName + ' started ' + sonta.name +' Sonta under '+ campusTown.name + ' ' + stream

WITH leader,sonta, log
OPTIONAL MATCH (sonta)<-[oldLeads:LEADS]-(oldLeader:Member)
OPTIONAL MATCH (sonta)-[oldHistory:HAS_HISTORY]->()-[oldLeaderHistory:HAS_HISTORY]-(oldLeader)

SET oldHistory.current = false, oldLeaderHistory.current = false //nullify old history relationship
   DELETE oldLeads //Delete old relationship

WITH log,sonta,oldLeader,leader 
       CALL{
         WITH log,sonta,oldLeader, leader
         WITH log,sonta,oldLeader, leader 
         WHERE EXISTS (oldLeader.firstName)
        
       MERGE (oldLeader)-[hasHistory:HAS_HISTORY]->(log)
       SET hasHistory.neverLed = true,
       log.historyRecord = leader.firstName + ' ' +leader.lastName + ' became the leader of ' + sonta.name + " Sonta replacing " + oldLeader.firstName +" "+oldLeader.lastName
       RETURN COUNT(log)
       }
  
   MATCH (currentUser:Member {auth_id:$auth.jwt.sub}) 
   WITH currentUser, leader, sonta, log
   MERGE (leader)-[:LEADS]->(sonta)
   MERGE (log)-[:LOGGED_BY]->(currentUser)
   MERGE (date:TimeGraph {date: date()})
   MERGE (log)-[:RECORDED_ON]->(date)
   MERGE (leader)-[r1:HAS_HISTORY]->(log)
   MERGE (sonta)-[r2:HAS_HISTORY]->(log)
   SET r1.current = true,
   r2.current = true

   RETURN leader.id AS id, leader.auth_id AS auth_id, leader.firstName AS firstName, leader.lastName AS lastName
`

export const makeCampusLeader = `
MATCH (leader:Member {id:$leaderId})
MATCH (campus:Campus {id:$campusId})
OPTIONAL MATCH (campus)<-[:HAS_CAMPUS]-(bishop:Member)
CREATE (log:HistoryLog:ServiceLog)
  SET leader.auth_id = $auth_id,
   log.id = apoc.create.uuid(),
   log.timeStamp = datetime(),
   log.historyRecord = leader.firstName + ' ' +leader.lastName + 'started ' + campus.name+ ' Campus under Bishop'+ bishop.firstName+' '+bishop.lastName

WITH leader,campus, log
OPTIONAL MATCH (campus)<-[oldLeads:LEADS]-(oldLeader:Member)
OPTIONAL MATCH (campus)-[oldHistory:HAS_HISTORY]->()-[oldLeaderHistory:HAS_HISTORY]-(oldLeader)

SET oldHistory.current = false, oldLeaderHistory.current = false //nullify old history relationship
   DELETE oldLeads //Delete old relationship

WITH log,campus,oldLeader,leader
       CALL{
         WITH log,campus,oldLeader, leader
         WITH log,campus,oldLeader, leader 
         WHERE EXISTS (oldLeader.firstName)
        
       MERGE (oldLeader)-[hasHistory:HAS_HISTORY]->(log)
       SET hasHistory.neverLed = true,
       log.historyRecord = leader.firstName + ' ' +leader.lastName + ' became the leader of ' + campus.name + " Campus replacing " + oldLeader.firstName +" "+oldLeader.lastName
       RETURN COUNT(log)
       }
  
   MATCH (currentUser:Member {auth_id:$auth.jwt.sub}) 
   WITH currentUser, leader, campus, log
   MERGE (leader)-[:LEADS]->(campus)
   MERGE (log)-[:LOGGED_BY]->(currentUser)
   MERGE (date:TimeGraph {date: date()})
   MERGE (log)-[:RECORDED_ON]->(date)
   MERGE (leader)-[r1:HAS_HISTORY]->(log)
   MERGE (campus)-[r2:HAS_HISTORY]->(log)
   SET r1.current = true,
   r2.current = true

   RETURN leader.id AS id, leader.auth_id AS auth_id, leader.firstName AS firstName, leader.lastName AS lastName
`

export const makeTownLeader = `
MATCH (leader:Member {id:$leaderId})
MATCH (town:Town {id:$townId})
OPTIONAL MATCH (town)<-[:HAS_TOWN]-(bishop:Member)
CREATE (log:HistoryLog:ServiceLog)
  SET leader.auth_id = $auth_id,
   log.id = apoc.create.uuid(),
   log.timeStamp = datetime(),
   log.historyRecord = leader.firstName + ' ' +leader.lastName + 'started ' + town.name+ ' Town under Bishop'+ bishop.firstName+' '+bishop.lastName

WITH leader,town, log
OPTIONAL MATCH (town)<-[oldLeads:LEADS]-(oldLeader:Member)
OPTIONAL MATCH (town)-[oldHistory:HAS_HISTORY]->()-[oldLeaderHistory:HAS_HISTORY]-(oldLeader)

SET oldHistory.current = false, oldLeaderHistory.current = false //nullify old history relationship
   DELETE oldLeads //Delete old relationship

WITH log,town,oldLeader,leader
       CALL{
         WITH log,town,oldLeader, leader
         WITH log,town,oldLeader, leader 
         WHERE EXISTS (oldLeader.firstName)
        
       MERGE (oldLeader)-[hasHistory:HAS_HISTORY]->(log)
       SET hasHistory.neverLed = true,
       log.historyRecord = leader.firstName + ' ' +leader.lastName + ' became the leader of ' + town.name + " Town replacing " + oldLeader.firstName +" "+oldLeader.lastName
       RETURN COUNT(log)
       }
  
   MATCH (currentUser:Member {auth_id:$auth.jwt.sub}) 
   WITH currentUser, leader, town, log
   MERGE (leader)-[:LEADS]->(town)
   MERGE (log)-[:LOGGED_BY]->(currentUser)
   MERGE (date:TimeGraph {date: date()})
   MERGE (log)-[:RECORDED_ON]->(date)
   MERGE (leader)-[r1:HAS_HISTORY]->(log)
   MERGE (town)-[r2:HAS_HISTORY]->(log)
   SET r1.current = true,
   r2.current = true

   RETURN leader.id AS id, leader.auth_id AS auth_id, leader.firstName AS firstName, leader.lastName AS lastName
`
export const getCentreBacentaServiceAggregates = `
  MATCH (centre:Centre {id:$id})
  
 
  MATCH (centre)-[:HAS_HISTORY]->(log:ServiceLog)
  OPTIONAL MATCH (log)-[:HAS_BACENTA]->(bacentaServices:ServiceLog)-[:HAS_RECORD]->(records:ServiceRecord)
  OPTIONAL MATCH (records)-[:SERVICE_HELD_ON]->(date:TimeGraph) 

  WITH DISTINCT records, date(date.date).week AS week WHERE records IS NOT NULL
  RETURN week AS week,SUM(records.attendance) AS attendance, SUM(records.income) AS income ORDER BY week DESC LIMIT 12
`

// Adding both centre and bacenta services to get weekly constituency attendance
export const getCampusTownServiceAggregates = `
  MATCH (campusTown {id:$id})  WHERE campusTown:Town OR campusTown:Campus
  
  MATCH (campusTown)-[:HAS_HISTORY]->(log:ServiceLog)
  OPTIONAL MATCH (log)-[:HAS_CENTRE]->(centreServices:ServiceLog)
  MATCH (centreServices)-[:HAS_BACENTA]->(bacentaServices:ServiceLog)
  OPTIONAL MATCH (centreServices)-[:HAS_RECORD]->(centreRecords:ServiceRecord)
  OPTIONAL MATCH (bacentaServices)-[:HAS_RECORD]->(bacentaRecords:ServiceRecord) 

    UNWIND [centreRecords,bacentaRecords] AS records
   
    MATCH (records)-[:SERVICE_HELD_ON]->(date:TimeGraph)
    WITH DISTINCT records, date(date.date).week AS week

  RETURN week AS week,SUM(records.attendance) AS attendance, SUM(records.income) AS income ORDER BY week DESC LIMIT 12
`
