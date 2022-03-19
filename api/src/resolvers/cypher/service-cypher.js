export const checkFormFilledThisWeek = `
MATCH (church {id: $churchId}) 
WHERE church:Fellowship OR church:Bacenta OR church:Constituency OR church:Council OR church:Stream OR church:GatheringService OR church:Sonta OR church:Ministry
OR church:ClosedFellowship OR church:ClosedBacenta

MATCH (church)
      WHERE EXISTS {
        MATCH (church)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_SERVICE]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(date:TimeGraph) WHERE date(date.date).week = date().week
        }
RETURN church.id AS id, church.name AS name
`

export const recordService = `
CREATE (serviceRecord:ServiceRecord {created_at:datetime()})
        SET serviceRecord.id = apoc.create.uuid(),
        serviceRecord.attendance = $attendance,
        serviceRecord.income = $income,
        serviceRecord.foreignCurrency = $foreignCurrency,
        serviceRecord.numberOfTithers = $numberOfTithers,
        serviceRecord.treasurerSelfie = $treasurerSelfie,
        serviceRecord.servicePicture = $servicePicture
      WITH serviceRecord

      MATCH (church {id:$churchId}) WHERE church:Fellowship OR church:Bacenta OR church:Constituency OR church:Council OR church:Stream
      MATCH (church)-[has_history:HAS_HISTORY {current: true}]->(log:ServiceLog)

      MATCH (leader:Member {auth_id: $auth.jwt.sub})

      MERGE (serviceRecord)-[:LOGGED_BY]->(leader)
      MERGE (serviceDate:TimeGraph {date:date($serviceDate)})
      MERGE (serviceRecord)-[:SERVICE_HELD_ON]->(serviceDate)
      MERGE (log)-[:HAS_SERVICE]->(serviceRecord)

      WITH serviceRecord
      UNWIND $treasurers AS treasurerId WITH treasurerId, serviceRecord
      MATCH (treasurer:Member {id: treasurerId})
      MERGE (treasurer)-[:WAS_TREASURER_FOR]->(serviceRecord)

      RETURN serviceRecord
`

export const checkCurrentServiceLog = `
MATCH (church {id:$churchId}) WHERE church:Fellowship OR church:Bacenta OR church:Constituency OR church:Council OR church:Stream
MATCH (church)-[:HAS_HISTORY {current: true}]->(log:ServiceLog)
RETURN true AS exists
`
export const getServantAndChurch = `
MATCH (church {id:$churchId}) WHERE church:Fellowship OR church:Bacenta OR church:Constituency OR church:Council OR church:Stream
MATCH (church)<-[:LEADS]-(servant:Member)
UNWIND labels(church) AS churchType 
WITH churchType, church, servant WHERE churchType = 'Fellowship' OR churchType = 'Bacenta' OR churchType = 'Constituency' OR churchType = 'Council' OR churchType = 'Stream'
RETURN church.id AS churchId, church.name AS churchName, servant.id AS servantId, servant.auth_id AS auth_id, servant.firstName AS firstName, servant.lastName AS lastName, churchType AS churchType
`
