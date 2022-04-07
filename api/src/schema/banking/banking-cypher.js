export const setServiceRecordTransactionId = `
MATCH (record:ServiceRecord {id: $serviceRecordId})<-[:HAS_SERVICE]-(:ServiceLog)<-[:HAS_HISTORY]-(church)
WHERE church:Fellowship OR church:Constituency OR church:Council OR church:Stream OR church:GatheringService

MATCH (record)-[:SERVICE_HELD_ON]->(date:TimeGraph)
MATCH (transaction: LastPaySwitchTransactionId)
    SET record.transactionId = transaction.id + 1,
    record.transactionTime = datetime(),
    transaction.id = record.transactionId

RETURN record, church.name AS churchName, date.date AS date
`

export const checkTransactionId = `
MATCH (record:ServiceRecord {id: $serviceRecordId})

RETURN record
`
