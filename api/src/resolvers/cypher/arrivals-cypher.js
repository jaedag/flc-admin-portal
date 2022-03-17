export const getBussingRecord = `
MATCH (record:BussingRecord {id: $bussingRecordId})
MATCH (transaction: LastPaySwitchTransactionId)
SET record.transactionId = transaction.id + 1,
transaction.id = record.transactionId

RETURN record
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
