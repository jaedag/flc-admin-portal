export const setBussingRecordTransactionId = `
MATCH (record:BussingRecord {id: $bussingRecordId})<-[:HAS_BUSSING]-(:ServiceLog)<-[:HAS_HISTORY]-(bacenta:Bacenta)
MATCH (record)-[:BUSSED_ON]->(date:TimeGraph)
MATCH (transaction: LastPaySwitchTransactionId)
SET record.transactionId = transaction.id + 1,
transaction.id = record.transactionId,
record.momoNumber = bacenta.momoNumber, 
record.mobileNetwork = bacenta.mobileNetwork,
record.momoName = bacenta.momoName

RETURN record, bacenta.name AS bacentaName, date.date AS date
`

export const removeBussingRecordTransactionId = `
MATCH (record:BussingRecord {id: $bussingRecordId})<-[:HAS_BUSSING]-(:ServiceLog)<-[:HAS_HISTORY]-(bacenta:Bacenta)
MATCH (record)-[:BUSSED_ON]->(date:TimeGraph)
REMOVE record.transactionId

RETURN record, bacenta.name AS bacentaName, date.date AS date
`

export const getBussingRecordWithDate = `
MATCH (record:BussingRecord {id: $bussingRecordId})
MATCH (record)-[:BUSSED_ON]->(date:TimeGraph)
RETURN record.id AS bussingRecordId, record.attendance AS attendance,  labels(date) AS dateLabels
`

export const checkTransactionId = `
MATCH (record:BussingRecord {id: $bussingRecordId})
MATCH (record)-[:CONFIRMED_BY]->(admin:Member)

RETURN record
`

export const setSwellDate = `
MERGE (date:TimeGraph {date: date($date)})
    SET date:SwellDate
RETURN toString(date.date) AS id, date.date AS date, true AS swell
`

export const setSwellBussingTopUp = `
MATCH (record:BussingRecord {id: $bussingRecordId})<-[:HAS_BUSSING]-(:ServiceLog)<-[:HAS_HISTORY]-(bacenta:Bacenta)
SET record.bussingTopUp = bacenta.swellBussingCost - bacenta.swellPersonalContribution
RETURN record
`

export const setNormalBussingTopUp = `
MATCH (record:BussingRecord {id: $bussingRecordId})<-[:HAS_BUSSING]-(:ServiceLog)<-[:HAS_HISTORY]-(bacenta:Bacenta)
SET record.bussingTopUp = bacenta.normalBussingCost - bacenta.normalPersonalContribution
RETURN record
`

export const RemoveAllStreamArrivalsHelpers = `
MATCH (church {id: $streamId})
WHERE church:Stream
OPTIONAL MATCH (church)<-[oldHelpers:COUNTS_ARRIVALS_FOR|CONFIRMS_ARRIVALS_FOR]-(admin:Member)
DELETE oldHelpers

WITH church, admin

MATCH (church)-[oldHistory:HAS_HISTORY]->(:ServiceLog)<-[oldAdminHistory:HAS_HISTORY]-(admin)
REMOVE oldHistory.current, oldAdminHistory.current


RETURN church
`
