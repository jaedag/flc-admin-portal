export const setBussingRecordTransactionId = `
MATCH (record:BussingRecord {id: $bussingRecordId})<-[:HAS_BUSSING]-(:ServiceLog)<-[:HAS_HISTORY]-(bacenta:Bacenta)
MATCH (record)-[:BUSSED_ON]->(date:TimeGraph)
MATCH (transaction: LastPaySwitchTransactionId)
SET record.transactionId = transaction.id + 1,
transaction.id = record.transactionId,
record.transactionTime = datetime(),
record.transactionStatus = "pending"

RETURN record, bacenta.name AS bacentaName, date.date AS date
`

export const removeBussingRecordTransactionId = `
MATCH (record:BussingRecord {id: $bussingRecordId})<-[:HAS_BUSSING]-(:ServiceLog)<-[:HAS_HISTORY]-(bacenta:Bacenta)
MATCH (record)-[:BUSSED_ON]->(date:TimeGraph)
REMOVE record.transactionId, record.transactionTime, record.transactionStatus

RETURN record, bacenta.name AS bacentaName, date.date AS date
`

export const getBussingRecordWithDate = `
MATCH (record:BussingRecord {id: $bussingRecordId})<-[:HAS_BUSSING]-(:ServiceLog)<-[:HAS_HISTORY]-(bacenta:Bacenta)
MATCH (record)-[:BUSSED_ON]->(date:TimeGraph)
SET record.target = bacenta.target

RETURN record.id AS bussingRecordId,
record.target,
record.attendance AS attendance, 
record.numberOfBusses AS numberOfBusses,
record.numberOfCars AS numberOfCars,
labels(date) AS dateLabels
`

export const checkTransactionId = `
MATCH (record:BussingRecord {id: $bussingRecordId})<-[:HAS_BUSSING]-(:ServiceLog)<-[:HAS_HISTORY]-(bacenta:Bacenta)
MATCH (bacenta)<-[:HAS*3]-(stream:Stream)
MATCH (record)-[:COUNTED_BY]->(admin:Member)

RETURN record, stream
`

export const setSwellDate = `
MERGE (date:TimeGraph {date: date($date)})
    SET date:SwellDate
RETURN toString(date.date) AS id, date.date AS date, true AS swell
`

export const setSwellBussingTopUp = `
MATCH (record:BussingRecord {id: $bussingRecordId})<-[:HAS_BUSSING]-(:ServiceLog)<-[:HAS_HISTORY]-(bacenta:Bacenta)
SET record.bussingTopUp = bacenta.swellBussingCost - bacenta.swellPersonalContribution,
record.momoNumber = bacenta.momoNumber, 
record.mobileNetwork = bacenta.mobileNetwork,
record.momoName = bacenta.momoName

RETURN record
`

export const noBussingTopUp = `
MATCH (record:BussingRecord {id: $bussingRecordId})
SET record.bussingTopUp = 0

RETURN record
`

export const setNormalBussingTopUp = `
MATCH (record:BussingRecord {id: $bussingRecordId})<-[:HAS_BUSSING]-(:ServiceLog)<-[:HAS_HISTORY]-(bacenta:Bacenta)
SET record.bussingTopUp = bacenta.normalBussingCost - bacenta.normalPersonalContribution,
record.momoNumber = bacenta.momoNumber, 
record.mobileNetwork = bacenta.mobileNetwork,
record.momoName = bacenta.momoName

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

export const checkBacentaMomoDetails = `
MATCH (bacenta:Bacenta {id: $bacentaId})


RETURN bacenta.normalBussingCost - bacenta.normalPersonalContribution AS normalTopUp, 
bacenta.swellBussingCost - bacenta.swellPersonalContribution AS swellTopUp, 
bacenta.momoNumber AS momoNumber
`

export const uploadMobilisationPicture = `
CREATE (bussingRecord:BussingRecord {created_at:datetime()})
    SET bussingRecord.id = apoc.create.uuid(),
    bussingRecord.mobilisationPicture = $mobilisationPicture

    WITH bussingRecord
    MATCH (bacenta:Bacenta {id:$bacentaId})
    MATCH (bacenta)-[has_history:HAS_HISTORY {current: true}]->(log:ServiceLog)

    MERGE (log)-[:HAS_BUSSING]->(bussingRecord)
    MERGE (serviceDate:TimeGraph {date: date($serviceDate)})
    MERGE (bussingRecord)-[:BUSSED_ON]->(serviceDate)

WITH bussingRecord, bacenta, serviceDate,  date($serviceDate).week AS week
    MATCH (leader:Member {auth_id: $auth.jwt.sub})
    MATCH (bacenta)<-[:HAS*3]-(stream:Stream)
    MERGE (bussingRecord)-[:LOGGED_BY]->(leader)

    RETURN bussingRecord AS bussingRecord, 
    bacenta AS bacenta, 
    serviceDate AS date, 
    week AS week,
    stream.name AS stream_name
`

export const recordArrivalTime = `
MATCH (bussingRecord:BussingRecord {id: $bussingRecordId})
SET bussingRecord.arrivalTime = datetime()

WITH bussingRecord
MATCH (admin:Member {auth_id: $auth.jwt.sub})
OPTIONAL MATCH (bussingRecord)-[:COUNTED_BY]->(counter)
MERGE (bussingRecord)-[:ARRIVAL_LOGGED_BY]->(admin)

RETURN bussingRecord {
    .id,
    .bussingTopUp,
    .arrivalTime,
    counted_by: counter {
        .id,
        .firstName,
        .lastName
    },
       arrival_confirmed_by:  admin {
           .id,
           .firstName,
           .lastName
       }
}
`
