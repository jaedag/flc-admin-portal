export const matchMemberQuery = `
WITH apoc.cypher.runFirstColumn(
  "MATCH (member:Member {id:$id})
  RETURN member", {offset:0, first:5, id: $id}, True) AS x UNWIND x AS member
  RETURN member { .id,.auth_id, .firstName,.lastName,.email,.phoneNumber,.whatsappNumber,.pictureUrl,
  leadsFellowship: [ member_fellowships IN apoc.cypher.runFirstColumn("MATCH (this)-[:LEADS]-(fellowship:Fellowship)
  RETURN fellowship", {this: member}, true) | member_fellowships { .id,.name }],
  leadsBacenta: [ member_bacentas IN apoc.cypher.runFirstColumn("MATCH (this)-[:LEADS]-(bacenta:Bacenta)
  RETURN bacenta", {this: member}, true) | member_bacentas { .id,.name }],
  leadsSonta: [ member_sontas IN apoc.cypher.runFirstColumn("MATCH (this)-[:LEADS]-(sonta:Sonta)
  RETURN sonta", {this: member}, true) | member_sontas { .id,.name }],
  isAdminForCampus: [ member_adminCampuses IN apoc.cypher.runFirstColumn("MATCH (this)-[:IS_ADMIN_FOR]-(adminCampus:Campus)
  RETURN adminCampus", {this: member}, true) | member_adminCampuses { .id,.name }],
  isAdminForTown: [ member_adminTowns IN apoc.cypher.runFirstColumn("MATCH (this)-[:IS_ADMIN_FOR]-(adminTown:Town)
  RETURN adminTown", {this: member}, true) | member_adminTowns { .id,.name }],
  isAdminForCouncil: [ member_adminCouncils IN apoc.cypher.runFirstColumn("MATCH (this)-[:IS_ADMIN_FOR]-(adminCouncil:Member)
  RETURN adminCouncil", {this: member}, true) | member_adminCouncils { .id,.name}],
  leadsCampus: [ member_campus IN apoc.cypher.runFirstColumn("MATCH (this)-[:LEADS]-(campus:Campus)
  RETURN campus", {this: member}, true) | member_campus { .id,.name }],
  leadsTown: [ member_town IN apoc.cypher.runFirstColumn("MATCH (this)-[:LEADS]-(town:Town)
  RETURN town", {this: member}, true) | member_town { .id,.name }] } AS member
  `

export const matchChurchQuery = `
  MATCH (church {id:$id}) 
  WHERE church:Fellowship OR church:Bacenta OR church:Campus OR church:Town OR church:Sonta OR church:Ministry OR church:Member
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

  WITH member
  MATCH (currentUser:Member {auth_id:$auth.jwt.sub})
  MERGE (member)-[:HAS_HISTORY]->(log)
  MERGE (log)-[:LOGGED_BY]->(currentUser)
  MERGE (date:TimeGraph {date: date()})
  MERGE (log)-[:RECORDED_ON]->(date)

RETURN member.id`

export const makeBishopAdmin = `
MATCH (admin:Member {id:$adminId})
MATCH (bishop:Member {id:$bishopId})
CREATE (log:HistoryLog)
  SET admin.auth_id = $auth_id,
   log.id = apoc.create.uuid(),
   log.timeStamp = datetime(),
   log.historyRecord = admin.firstName + ' ' +admin.lastName + ' became admin for Bishop ' + bishop.firstName  + ' ' + bishop.lastName
WITH admin,bishop, log
OPTIONAL MATCH (bishop)<-[oldAdmins:IS_ADMIN_FOR]-(oldAdmin:Member)
OPTIONAL MATCH (bishop)-[oldHistory:HAS_HISTORY]->()-[oldAdminHistory:HAS_HISTORY]-(oldAdmin)
SET oldHistory.current = false, oldAdminHistory.current = false //nullify old history relationship
   DELETE oldAdmins //Delete old relationship
WITH log,bishop,oldAdmin,admin
       CALL{
         WITH log,bishop,oldAdmin, admin
         WITH log,bishop,oldAdmin, admin 
         WHERE EXISTS (oldAdmin.firstName) AND oldAdmin.id <> $adminId
        
       MERGE (oldAdmin)-[hasHistory:HAS_HISTORY]->(log)
       SET hasHistory.neverAdmin = true,
       log.historyRecord = admin.firstName + ' ' +admin.lastName + ' became the admin of Bishop ' + bishop.firstName + ' ' + bishop.lastName + ' replacing ' + oldAdmin.firstName +' '+oldAdmin.lastName
       RETURN COUNT(log)
       }
  
   MATCH (currentUser:Member {auth_id:$auth.jwt.sub}) 
   WITH currentUser, admin, bishop, log
   MERGE (admin)-[:IS_ADMIN_FOR]->(bishop)
   MERGE (log)-[:LOGGED_BY]->(currentUser)
   MERGE (date:TimeGraph {date: date()})
   MERGE (log)-[:RECORDED_ON]->(date)
   MERGE (admin)-[r1:HAS_HISTORY]->(log)
   MERGE (bishop)-[r2:HAS_HISTORY]->(log)
   SET r1.current = true,
   r2.current = true
   RETURN admin.id AS id, admin.auth_id AS auth_id, admin.firstName AS firstName, admin.lastName AS lastName
`

export const makeTownAdmin = `
MATCH (admin:Member {id:$adminId})
MATCH (town:Town {id:$townId})
CREATE (log:HistoryLog)
  SET admin.auth_id = $auth_id,
   log.id = apoc.create.uuid(),
   log.timeStamp = datetime(),
   log.historyRecord = admin.firstName + ' ' +admin.lastName + ' became admin for ' + town.name
WITH admin,town, log
OPTIONAL MATCH (town)<-[oldAdmins:IS_ADMIN_FOR]-(oldAdmin:Member)
OPTIONAL MATCH (town)-[oldHistory:HAS_HISTORY]->()-[oldAdminHistory:HAS_HISTORY]-(oldAdmin)
SET oldHistory.current = false, oldAdminHistory.current = false //nullify old history relationship
   DELETE oldAdmins //Delete old relationship
WITH log,town,oldAdmin,admin
       CALL{
         WITH log,town,oldAdmin, admin
         WITH log,town,oldAdmin, admin 
         WHERE EXISTS (oldAdmin.firstName) AND oldAdmin.id <> $adminId
        
       MERGE (oldAdmin)-[hasHistory:HAS_HISTORY]->(log)
       SET hasHistory.neverAdmin = true,
       log.historyRecord = admin.firstName + ' ' +admin.lastName + ' became the admin of ' + town.name + " Town replacing " + oldAdmin.firstName +" "+oldAdmin.lastName
       RETURN COUNT(log)
       }
  
   MATCH (currentUser:Member {auth_id:$auth.jwt.sub}) 
   WITH currentUser, admin, town, log
   MERGE (admin)-[:IS_ADMIN_FOR]->(town)
   MERGE (log)-[:LOGGED_BY]->(currentUser)
   MERGE (date:TimeGraph {date: date()})
   MERGE (log)-[:RECORDED_ON]->(date)
   MERGE (admin)-[r1:HAS_HISTORY]->(log)
   MERGE (town)-[r2:HAS_HISTORY]->(log)
   SET r1.current = true,
   r2.current = true

   RETURN admin.id AS id, admin.auth_id AS auth_id, admin.firstName AS firstName, admin.lastName AS lastName
`

export const makeCampusAdmin = `
MATCH (admin:Member {id:$adminId})
MATCH (campus:Campus {id:$campusId})
CREATE (log:HistoryLog:ServiceLog)
  SET admin.auth_id = $auth_id,
   log.id = apoc.create.uuid(),
   log.timeStamp = datetime(),
   log.historyRecord = admin.firstName + ' ' +admin.lastName + ' became admin for ' + campus.name
WITH admin,campus, log
OPTIONAL MATCH (campus)<-[oldAdmins:IS_ADMIN_FOR]-(oldAdmin:Member)
OPTIONAL MATCH (campus)-[oldHistory:HAS_HISTORY]->()-[oldAdminHistory:HAS_HISTORY]-(oldAdmin)
SET oldHistory.current = false, oldAdminHistory.current = false //nullify old history relationship
   DELETE oldAdmins //Delete old relationship
WITH log,campus,oldAdmin,admin
       CALL{
         WITH log,campus,oldAdmin, admin
         WITH log,campus,oldAdmin, admin 
         WHERE EXISTS (oldAdmin.firstName) AND oldAdmin.id <> $adminId
        
       MERGE (oldAdmin)-[hasHistory:HAS_HISTORY]->(log)
       SET hasHistory.neverAdmin = true,
       log.historyRecord = admin.firstName + ' ' +admin.lastName + ' became the admin of ' + campus.name + " Campus replacing " + oldAdmin.firstName +" "+oldAdmin.lastName
       RETURN COUNT(log)
       }
  
   MATCH (currentUser:Member {auth_id:$auth.jwt.sub}) 
   WITH currentUser, admin, campus, log
   MERGE (admin)-[:IS_ADMIN_FOR]->(campus)
   MERGE (log)-[:LOGGED_BY]->(currentUser)
   MERGE (date:TimeGraph {date: date()})
   MERGE (log)-[:RECORDED_ON]->(date)
   MERGE (admin)-[r1:HAS_HISTORY]->(log)
   MERGE (campus)-[r2:HAS_HISTORY]->(log)
   SET r1.current = true,
   r2.current = true
   
   RETURN admin.id AS id, admin.auth_id AS auth_id, admin.firstName AS firstName, admin.lastName AS lastName
`

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
MATCH (bacenta)<-[:HAS]-(campusTown) 
UNWIND labels(campusTown) AS stream
CREATE (log:HistoryLog:ServiceLog)
  SET leader.auth_id = $auth_id,
   log.id = apoc.create.uuid(),
   log.timeStamp = datetime(),
   log.historyRecord = leader.firstName + ' ' +leader.lastName + ' started ' + bacenta.name +' Bacenta under '+ campusTown.name + ' ' + stream
WITH leader,bacenta, log, campusTown
OPTIONAL MATCH (bacenta)<-[oldLeads:LEADS]-(oldLeader:Member)
OPTIONAL MATCH (bacenta)-[oldHistory:HAS_HISTORY]->()-[oldLeaderHistory:HAS_HISTORY]-(oldLeader)
SET oldHistory.current = false, oldLeaderHistory.current = false //nullify old history relationship
   DELETE oldLeads //Delete old relationship
WITH log,bacenta,oldLeader,leader, campusTown
       CALL{
         WITH log,bacenta,oldLeader, leader
         WITH log,bacenta,oldLeader, leader 
         WHERE EXISTS (oldLeader.firstName) AND oldLeader.id <> $leaderId
        
       MERGE (oldLeader)-[hasHistory:HAS_HISTORY]->(log)
       SET hasHistory.neverLed = true,
       log.historyRecord = leader.firstName + ' ' +leader.lastName + ' became the leader of ' + bacenta.name + " Bacenta replacing " + oldLeader.firstName +" "+oldLeader.lastName
       RETURN COUNT(log)
       }
 
       MATCH (bacenta)<-[:HAS]-(campusTown)-[rel:HAS_HISTORY]->(campusTownHistory:ServiceLog) WHERE rel.current = true
       OPTIONAL MATCH (campusTownHistory)-[oldBacentaHistory:HAS]->(:ServiceLog)-[:HAS_HISTORY]-(bacenta)   

   MATCH (currentUser:Member {auth_id:$auth.jwt.sub})

   WITH currentUser, leader, bacenta, log, oldBacentaHistory, campusTownHistory
   MERGE (leader)-[:LEADS]->(bacenta)
   MERGE (log)-[:LOGGED_BY]->(currentUser)
   MERGE (date:TimeGraph {date: date()})
   MERGE (log)-[:RECORDED_ON]->(date)
   MERGE (leader)-[r1:HAS_HISTORY]->(log)
   MERGE (bacenta)-[r2:HAS_HISTORY]->(log)
   MERGE (campusTownHistory)-[r3:HAS]->(log)
   SET r1.current = true,
   r2.current = true,
   r3.currennt = true
   REMOVE oldBacentaHistory.current

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
         WHERE EXISTS (oldLeader.firstName) AND oldLeader.id <> $leaderId
        
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
MATCH (campus)<-[:HAS]-(council:Council)
CREATE (log:HistoryLog:ServiceLog)
  SET leader.auth_id = $auth_id,
   log.id = apoc.create.uuid(),
   log.timeStamp = datetime(),
   log.historyRecord = leader.firstName + ' ' +leader.lastName + ' started ' + campus.name+ ' Campus under Coucil '+ council.name
WITH leader,campus, log
OPTIONAL MATCH (campus)<-[oldLeads:LEADS]-(oldLeader:Member)
OPTIONAL MATCH (campus)-[oldHistory:HAS_HISTORY]->()-[oldLeaderHistory:HAS_HISTORY]-(oldLeader)
SET oldHistory.current = false, oldLeaderHistory.current = false //nullify old history relationship
   DELETE oldLeads //Delete old relationship
WITH log,campus,oldLeader,leader
       CALL{
         WITH log,campus,oldLeader, leader
         WITH log,campus,oldLeader, leader 
         WHERE EXISTS (oldLeader.firstName) AND oldLeader.id <> $leaderId
        
       MERGE (oldLeader)-[hasHistory:HAS_HISTORY]->(log)
       SET hasHistory.neverLed = true,
       log.historyRecord = leader.firstName + ' ' +leader.lastName + ' became the leader of ' + campus.name + " Campus replacing " + oldLeader.firstName +" "+oldLeader.lastName
       RETURN COUNT(log)
       }

   MATCH (campus)<-[:HAS]-(:Council)-[rel:HAS_HISTORY]->(councilHistory:ServiceLog) WHERE rel.current = true
   OPTIONAL MATCH (councilHistory)-[oldCampusHistory:HAS]->(:ServiceLog)-[:HAS_HISTORY]-(campus)

   MATCH (currentUser:Member {auth_id:$auth.jwt.sub}) 

   WITH currentUser, leader, campus, log, oldCampusHistory, councilHistory
   MERGE (leader)-[:LEADS]->(campus)
   MERGE (log)-[:LOGGED_BY]->(currentUser)
   MERGE (date:TimeGraph {date: date()})
   MERGE (log)-[:RECORDED_ON]->(date)
   MERGE (leader)-[r1:HAS_HISTORY]->(log)
   MERGE (campus)-[r2:HAS_HISTORY]->(log)
   MERGE (councilHistory)-[r3:HAS]->(log)
   SET r1.current = true,
   r2.current = true,
   r3.current = true
   REMOVE oldCampusHistory.current 
   
   RETURN leader.id AS id, leader.auth_id AS auth_id, leader.firstName AS firstName, leader.lastName AS lastName
`

export const makeTownLeader = `
MATCH (leader:Member {id:$leaderId})
MATCH (town:Town {id:$townId})
MATCH (town)<-[:HAS]-(council:Council)
CREATE (log:HistoryLog:ServiceLog)
  SET leader.auth_id = $auth_id,
   log.id = apoc.create.uuid(),
   log.timeStamp = datetime(),
   log.historyRecord = leader.firstName + ' ' +leader.lastName + ' started ' + town.name+ ' Town under Council '+ council.name
WITH leader,town, log
OPTIONAL MATCH (town)<-[oldLeads:LEADS]-(oldLeader:Member)
OPTIONAL MATCH (town)-[oldHistory:HAS_HISTORY]->()-[oldLeaderHistory:HAS_HISTORY]-(oldLeader)
SET oldHistory.current = false, oldLeaderHistory.current = false //nullify old history relationship
   DELETE oldLeads //Delete old relationship
WITH log,town,oldLeader,leader
       CALL{
         WITH log,town,oldLeader, leader
         WITH log,town,oldLeader, leader 
         WHERE EXISTS (oldLeader.firstName) AND oldLeader.id <> $leaderId
        
       MERGE (oldLeader)-[hasHistory:HAS_HISTORY]->(log)
       SET hasHistory.neverLed = true,
       log.historyRecord = leader.firstName + ' ' +leader.lastName + ' became the leader of ' + town.name + " Town replacing " + oldLeader.firstName +" "+oldLeader.lastName
       RETURN COUNT(log)
       }

   MATCH (town)<-[:HAS]-(:Council)-[rel:HAS_HISTORY]->(councilHistory:ServiceLog) WHERE rel.current = true
   OPTIONAL MATCH (councilHistory)-[oldTownHistory:HAS]->(:ServiceLog)-[:HAS_HISTORY]-(town)

   MATCH (currentUser:Member {auth_id:$auth.jwt.sub}) 

   WITH currentUser, leader, town, log, oldTownHistory, councilHistory
   MERGE (leader)-[:LEADS]->(town)
   MERGE (log)-[:LOGGED_BY]->(currentUser)
   MERGE (date:TimeGraph {date: date()})
   MERGE (log)-[:RECORDED_ON]->(date)
   MERGE (leader)-[r1:HAS_HISTORY]->(log)
   MERGE (town)-[r2:HAS_HISTORY]->(log)
   MERGE (councilHistory)-[r3:HAS]->(log)
   SET r1.current = true,
   r2.current = true,
   r3.current = true
   REMOVE oldTownHistory.current 
   
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

export const getBacentaFellowshipServiceAggregates = `
  MATCH (bacenta:Bacenta {id:$id})
  

  MATCH (bacenta)-[:HAS_HISTORY]->(log:ServiceLog)
  MATCH (log)-[:HAS]->(fellowshipServices:ServiceLog)-[:HAS_RECORD]->(records:ServiceRecord)
  MATCH (records)-[:SERVICE_HELD_ON]->(date:TimeGraph) 

  WITH DISTINCT records, date(date.date).week AS week WHERE records IS NOT NULL
  RETURN week AS week,SUM(records.attendance) AS attendance, SUM(records.income) AS income ORDER BY week DESC LIMIT 12
`

// Adding both bacenta and fellowship services to get weekly constituency attendance
export const getCampusTownServiceAggregates = `
  MATCH (campusTown {id:$id})  WHERE campusTown:Town OR campusTown:Campus
  
  MATCH (campusTown)-[:HAS_HISTORY]->(log:ServiceLog)
  MATCH (log)-[:HAS*1..2]->(bacentaServices:ServiceLog)
  MATCH (bacentaServices)-[:HAS_RECORD]->(bacentaRecords:ServiceRecord)
   
     
  MATCH (bacentaRecords)-[:SERVICE_HELD_ON]->(date:TimeGraph)
  WITH DISTINCT bacentaServices,bacentaRecords, date(date.date).week AS week

RETURN week AS week,SUM(bacentaRecords.attendance) AS attendance, SUM(bacentaRecords.income) AS income ORDER BY week DESC LIMIT 12
`

export const checkMemberEmailExists = `
MATCH (member:Member)
WHERE member.email = $email
OR member.whatsappNumber = $whatsappNumber
RETURN member.email AS email, member.whatsappNumber AS whatsappNumber
`

export const createMember = `
CREATE (member:Member {whatsappNumber:$whatsappNumber})
      SET
      	member.id = apoc.create.uuid(),
      	member.firstName = $firstName,
      	member.middleName = $middleName,
      	member.lastName = $lastName,
      	member.email = $email,
      	member.phoneNumber = $phoneNumber,
      	member.pictureUrl = $pictureUrl
      CREATE (log:HistoryLog)<-[:HAS_HISTORY]-(b)
        SET
        log.id =  apoc.create.uuid(),
        log.timeStamp = datetime(),
        log.historyRecord = $firstName +' ' +$lastName+' was registered on '+apoc.date.convertFormat(toString(date()), 'date', 'dd MMMM yyyy')



      WITH member, log
      MATCH (currentUser:Member {auth_id:$auth_id})
      MATCH (maritalStatus:MaritalStatus {status:$maritalStatus})
      MATCH (gender:Gender {gender: $gender})
      MATCH (fellowship:Fellowship {id: $fellowship})
      MERGE (today:TimeGraph {date: date()})
      MERGE (log)-[:RECORDED_ON]->(today)
      MERGE (log)-[:LOGGED_BY]->(currentUser)
      MERGE (member)-[:HAS_HISTORY]->(log)
      MERGE (member)-[:HAS_MARITAL_STATUS]-> (maritalStatus)
      MERGE (member)-[:HAS_GENDER]-> (gender)
      MERGE (date:TimeGraph {date: date($dob)})
      MERGE (member)-[:WAS_BORN_ON]->(date)
      MERGE (member)-[:BELONGS_TO]->(fellowship)


      WITH member
         CALL {
         	WITH member
         	WITH member  WHERE $occupation IS NOT NULL
         	MERGE (occupation:Occupation {occupation:$occupation})
      	MERGE (member)-[:HAS_OCCUPATION]-> (occupation)
         	RETURN count(member) AS member_occupation
         	}

      WITH member
      CALL {
         	WITH member
         	WITH member  WHERE $ministry IS NOT NULL
         	MATCH (ministry:Ministry {id:$ministry})
      	MERGE (member)-[:BELONGS_TO]-> (ministry)
         	RETURN count(member) AS member_ministry
         	}

           MATCH (fellowship:Fellowship {id: $fellowship})
           MATCH (fellowship)<-[:HAS]-(bacenta:Bacenta)
           OPTIONAL MATCH (bacenta:Bacenta)<-[:HAS]-(campus:Campus)<-[:HAS]-(bishop:Member)
           OPTIONAL MATCH (bacenta:Bacenta)<-[:HAS]-(town:Town)<-[:HAS]-(bishop:Member)
           RETURN member  {.id, .firstName,.middleName,.lastName,.email,.phoneNumber,.whatsappNumber,
            fellowship:fellowship {.id,bacenta:bacenta{.id,campus:campus{.id},town:town{.id}}}}
      `

export const checkFellowshipHasNoMembers = `
MATCH (fellowship:Fellowship {id:$fellowshipId})
MATCH (fellowship)<-[:BELONGS_TO]-(member)
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
MATCH (bacenta)-[:HAS_HISTORY]->(history:HistoryLog)-[:RECORDED_ON]->(createdAt:TimeGraph)
MATCH (history)-[:LOGGED_BY]->(loggedBy:Member)
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
REMOVE fellowship:ActiveFellowship

RETURN bacenta {
  .id, .name, 
  fellowships:[fellowships {.id}], 
  history:[history {.id,.timeStamp, .historyRecord,
      created_at:createdAt {.date},
      loggedBy:loggedBy {.id,.firstName,.lastName}
      }]
    }
`

export const closeDownBacenta = `
MATCH (bacenta:Bacenta {id:$bacentaId})<-[:HAS]-(constituency)
MATCH (constituency)-[:HAS]->(bacentas:Bacenta)
MATCH (constituency)-[:HAS_HISTORY]->(history:HistoryLog)-[:RECORDED_ON]->(createdAt:TimeGraph)
MATCH (history)-[:LOGGED_BY]->(loggedBy:Member)      
MATCH (admin:Member {auth_id: $auth.jwt.sub})
OPTIONAL MATCH (bacenta)-[:HAS]->(fellowships)
UNWIND labels(constituency) AS stream

CREATE (log:HistoryLog {id:apoc.create.uuid()})
  SET log.timeStamp = datetime(),
  log.historyRecord = bacenta.name + ' Bacenta was closed down under ' + campusTown.name +' Constituency with all its fellowships'


MERGE (date:TimeGraph {date:date()})
MERGE (log)-[:LOGGED_BY]->(admin)
MERGE (log)-[:RECORDED_ON]->(date)
MERGE (bacenta)-[:HAS_HISTORY]->(log)
MERGE (campusTown)-[:HAS_HISTORY]->(log)

SET bacenta:ClosedBacenta, fellowships:ClosedFellowship
REMOVE bacenta:Bacenta,  fellowships:Fellowship:ActiveFellowship

RETURN constituency {
  .id, .name, 
  bacentas:[bacentas {.id}], 
  history:[history {.id,.timeStamp, .historyRecord,
      created_at:createdAt {.date},
      loggedBy:loggedBy {.id,.firstName,.lastName}
      }]
    }
`
