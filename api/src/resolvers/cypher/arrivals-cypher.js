export const setBussingRecordTransactionId = `
MATCH (record:BussingRecord {id: $bussingRecordId})<-[:HAS_BUSSING]-(:ServiceLog)<-[:HAS_HISTORY]-(bacenta:Bacenta)
MATCH (record)-[:BUSSED_ON]->(date:TimeGraph)
MATCH (transaction: LastPaySwitchTransactionId)
SET record.transactionId = transaction.id + 1,
transaction.id = record.transactionId

RETURN record, bacenta.name AS bacentaName, date.date AS date
`

export const getBussingRecordWithDate = `
MATCH (record:BussingRecord {id: $bussingRecordId})
MATCH (record)-[:BUSSED_ON]->(date:TimeGraph)
RETURN record.id AS bussingRecordId,  labels(date) AS dateLabels
`

export const checkTransactionId = `
MATCH (record:BussingRecord {id: $bussingRecordId})

RETURN record.transactionId AS transactionId
`

export const setSwellDate = `
MERGE (date:TimeGraph {date: date($date)})
    SET date:SwellDate
RETURN date.date AS date
`

export const setSwellBussingTopUp = `
MATCH (record:BussingRecord {id: $bussingRecordId})<-[:HAS_BUSSING]-(:ServiceLog)<-[:HAS_HISTORY]-(bacenta:Bacenta)
SET record.bussingTopUp = bacenta.swellBussingTopUp
RETURN record
`

export const setNormalBussingTopUp = `
MATCH (record:BussingRecord {id: $bussingRecordId})<-[:HAS_BUSSING]-(:ServiceLog)<-[:HAS_HISTORY]-(bacenta:Bacenta)
SET record.bussingTopUp = bacenta.normalBussingTopUp
RETURN record
`
