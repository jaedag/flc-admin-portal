


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


// THE PROBLEM DOMAIN
// 1. Bacentas are still retaining records of places where they have old relationships of 'replacing'
// 2. All ServiceLogs are still using a "HAS" relationship to define which is the same as the relationship that they have between church levels

//Replaces all log to log relationships with HAS_COMPONENT
MATCH (log:ServiceLog)-[has:HAS]->(otherLog:ServiceLog) 
WHERE has.current = true

MERGE (log)-[hasComponent:HAS_COMPONENT]->(otherLog)
SET hasComponent.current = true
RETURN log, otherLog;


MATCH (log:ServiceLog)-[has:HAS]->(otherLog:ServiceLog) 
MERGE (log)-[hasComponent:HAS_COMPONENT]->(otherLog)
RETURN log, otherLog;
