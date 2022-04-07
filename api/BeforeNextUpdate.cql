


MATCH (b:BussingRecord)
DETACH DELETE b;

MATCH (member:Member)
MATCH (member)-[:HAS_HISTORY]->(history:HistoryLog)-[:RECORDED_ON]->(date:TimeGraph)
WHERE history.historyRecord CONTAINS "was registered"

SET history:RegistrationLog
RETURN COUNT(history);

MATCH (stream:Stream {name: "Town"})
SET stream.endMobilisationTime = datetime("2022-04-02T11:00"),
stream.endBussingTime = datetime("2022-04-02T14:30")

RETURN stream;

MATCH (stream:Stream {name: "Campus"})
SET stream.endMobilisationTime = datetime("2022-04-02T17:00"),
stream.endBussingTime = datetime("2022-04-02T19:30")

RETURN stream;

MATCH (stream:Stream {name: "Anagkazo"})
SET stream.endMobilisationTime = datetime("2022-04-02T09:00"),
stream.endBussingTime = datetime("2022-04-02T10:30")

RETURN stream;