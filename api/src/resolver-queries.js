export const matchMemberQuery = `
WITH apoc.cypher.runFirstColumn(
  "MATCH (member:Member {id:$id})
  RETURN member", {offset:0, first:5, id: $id}, True) AS x UNWIND x AS member
  RETURN member { .id,.auth_id, .firstName,.lastName,.email,.phoneNumber,.whatsappNumber,.pictureUrl,
  leadsFellowship: [ member_fellowships IN apoc.cypher.runFirstColumn("MATCH (this)-[:LEADS]-(fellowship:Fellowship)
  RETURN fellowship", {this: member}, true) | member_fellowships { .id,.name }],
  leadsBacenta: [ member_bacentas IN apoc.cypher.runFirstColumn("MATCH (this)-[:LEADS]-(bacenta:Bacenta)
  RETURN bacenta", {this: member}, true) | member_bacentas { .id,.name }],
   leadsConstituency: [ member_constituency IN apoc.cypher.runFirstColumn("MATCH (this)-[:LEADS]-(constituency:Constituency)
  RETURN constituency", {this: member}, true) | member_constituency { .id,.name }],
   leadsCouncil: [ member_council IN apoc.cypher.runFirstColumn("MATCH (this)-[:LEADS]-(council:Council)
  RETURN council", {this: member}, true) | member_council { .id,.name }],
  leadsStream: [ member_stream IN apoc.cypher.runFirstColumn("MATCH (this)-[:LEADS]-(stream:Stream)
  RETURN stream", {this: member}, true) | member_stream { .id,.name }],
  leadsGatheringService: [ member_gatheringService IN apoc.cypher.runFirstColumn("MATCH (this)-[:LEADS]-(gatheringService:GatheringService)
  RETURN gatheringService", {this: member}, true) | member_gatheringService { .id,.name }],
  leadsSonta: [ member_sontas IN apoc.cypher.runFirstColumn("MATCH (this)-[:LEADS]-(sonta:Sonta)
  RETURN sonta", {this: member}, true) | member_sontas { .id,.name }],
  isAdminForConstituency: [ member_adminConstituencies IN apoc.cypher.runFirstColumn("MATCH (this)-[:IS_ADMIN_FOR]-(adminConstituency:Constituency)
  RETURN adminConstituency", {this: member}, true) | member_adminConstituencies { .id,.name }],
  isAdminForCouncil: [ member_adminCouncils IN apoc.cypher.runFirstColumn("MATCH (this)-[:IS_ADMIN_FOR]-(adminCouncil:Member)
  RETURN adminCouncil", {this: member}, true) | member_adminCouncils { .id,.name}],
   isAdminForStream: [ member_adminStreams IN apoc.cypher.runFirstColumn("MATCH (this)-[:IS_ADMIN_FOR]-(adminStream:Member)
  RETURN adminStream", {this: member}, true) | member_adminStreams { .id,.name}] } AS member
  `

export const matchChurchQuery = `
  MATCH (church {id:$id}) 
  WHERE church:Fellowship OR church:Bacenta OR church:Constituency OR church:Council OR church:Stream OR church:GatheringService OR church:Sonta OR church:Ministry OR church:Member
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
   r3.currennt = true
   REMOVE oldBacentaHistory.current

   RETURN leader.id AS id, leader.auth_id AS auth_id, leader.firstName AS firstName, leader.lastName AS lastName
`

export const makeSontaLeader = `
MATCH (leader:Member {id:$leaderId})
MATCH (sonta:Sonta {id:$sontaId})
OPTIONAL MATCH (sonta)<-[:HAS_SONTA]-(constituency) 
UNWIND labels(constituency) AS stream
CREATE (log:HistoryLog:ServiceLog)
  SET leader.auth_id = $auth_id,
   log.id = apoc.create.uuid(),
   log.timeStamp = datetime(),
   log.historyRecord = leader.firstName + ' ' +leader.lastName + ' started ' + sonta.name +' Sonta under '+ constituency.name + ' ' + stream
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

// Adding the records of the services underneath so that we can have the total attendances and incomes
export const getComponentServiceAggregates = `
  MATCH (church {id:$id}) WHERE church:Bacenta OR church:Constituency OR church:Council OR church:Stream OR church:GatheringService
  
  MATCH (church)-[:HAS_HISTORY]->(log:ServiceLog)
  MATCH (log)-[:HAS*1..5]->(componentServices:ServiceLog)
  MATCH (componentServices)-[:HAS_SERVICE]->(componentRecords:ServiceRecord)
   
     
  MATCH (componentRecords)-[:SERVICE_HELD_ON]->(date:TimeGraph)
  WITH DISTINCT componentServices,componentRecords, date(date.date).week AS week

RETURN week AS week,SUM(componentRecords.attendance) AS attendance, SUM(componentRecords.income) AS income ORDER BY week DESC LIMIT 12
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
          MATCH (bacenta:Bacenta)<-[:HAS]-(constituency:Constituency)<-[:HAS]-(council:Council)
           RETURN member  {.id, .firstName,.middleName,.lastName,.email,.phoneNumber,.whatsappNumber,
            fellowship:fellowship {.id,bacenta:bacenta{.id,constituency:constituency{.id}}}}
      `

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
REMOVE fellowship:ActiveFellowship

RETURN bacenta {
  .id, .name, 
  fellowships:[fellowships {.id}]
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
REMOVE bacenta:Bacenta,  fellowships:Fellowship:ActiveFellowship

RETURN constituency {
  .id, .name, 
  bacentas:[bacentas {.id}]
    }
`
