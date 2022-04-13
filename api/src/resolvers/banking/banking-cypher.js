export const setServiceRecordTransactionId = `
MATCH (record:ServiceRecord {id: $serviceRecordId})<-[:HAS_SERVICE]-(:ServiceLog)<-[:HAS_HISTORY]-(church)
WHERE church:Fellowship OR church:Constituency OR church:Council OR church:Stream OR church:GatheringService

MATCH (author:Member {auth_id: $auth.jwt.sub})
MATCH (record)-[:SERVICE_HELD_ON]->(date:TimeGraph)
MATCH (transaction: LastPaySwitchTransactionId)
    SET record.transactionId = transaction.id + 1,
    record.sourceNumber = $mobileNumber,
    record.sourceNetwork = $mobileNetwork,
    record.desc = church.name + " " + date.date,
    record.transactionTime = datetime(),
    transaction.id = record.transactionId

MERGE (author)<-[:OFFERING_BANKED_BY]-(record)
RETURN record, church.name AS churchName, date.date AS date
`

export const checkTransactionId = `
MATCH (record:ServiceRecord {id: $serviceRecordId})
MATCH (record)-[r:OFFERING_BANKED_BY]->(banker)
RETURN record, banker 
`

export const removeBankingRecordTransactionId = `
MATCH (record:ServiceRecord {id: $serviceRecordId})<-[:HAS_SERVICE]-(:ServiceLog)<-[:HAS_HISTORY]-(church)
WHERE church:Fellowship OR church:Constituency OR church:Council OR church:Stream

MATCH (record)-[r:OFFERING_BANKED_BY]->(banker)
MATCH (record)-[:SERVICE_HELD_ON]->(date:TimeGraph)
REMOVE record.transactionId
DELETE r

RETURN record, church.name AS churchName, date.date AS date
`
