// Adding the records of the services underneath so that we can have the total attendances and incomes
export const componentServiceAggregates = `
 MATCH (church {id:$id}) WHERE church:Bacenta OR church:Constituency OR church:Council OR church:Stream OR church:GatheringService
  
  MATCH (church)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS*1..5]->(componentServices:ServiceLog)
  MATCH (componentServices)-[:HAS_SERVICE]->(componentRecords:ServiceRecord)

  MATCH (componentRecords)-[:SERVICE_HELD_ON]->(date:TimeGraph)
  WHERE date.date > date() - duration({months: 2})
  WITH DISTINCT componentServices,componentRecords, date(date.date).week AS week ORDER BY week

RETURN week AS week,SUM(componentRecords.attendance) AS attendance, SUM(componentRecords.income) AS income ORDER BY week DESC LIMIT toInteger($limit)
`

export const componentBacentaServiceAggregates = `
 MATCH (church:Bacenta {id:$id})
  
  MATCH (church)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS]->(componentServices:ServiceLog)
  MATCH (componentServices)-[:HAS_SERVICE]->(componentRecords:ServiceRecord)
  WHERE EXISTS {
    MATCH (church)-[:HAS]->(downChurch:Fellowship)-[:HAS_HISTORY]->(componentServices)
  }

  MATCH (componentRecords)-[:SERVICE_HELD_ON]->(date:TimeGraph)
  WHERE date.date > date() - duration({months: 2})
  WITH DISTINCT componentServices,componentRecords, date(date.date).week AS week ORDER BY week

RETURN week AS week,SUM(componentRecords.attendance) AS attendance, SUM(componentRecords.income) AS income ORDER BY week DESC LIMIT toInteger($limit)
`

export const componentConstituencyServiceAggregates = `
 MATCH (church:Constituency {id:$id})
  
  MATCH (church)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS*1..2]->(componentServices:ServiceLog)
  MATCH (componentServices)-[:HAS_SERVICE]->(componentRecords:ServiceRecord)

  MATCH (componentRecords)-[:SERVICE_HELD_ON]->(date:TimeGraph)
  WHERE date.date > date() - duration({months: 2})
  WITH DISTINCT componentServices,componentRecords, date(date.date).week AS week ORDER BY week

RETURN week AS week,SUM(componentRecords.attendance) AS attendance, SUM(componentRecords.income) AS income ORDER BY week DESC LIMIT toInteger($limit)
`

export const componentCouncilServiceAggregates = `
 MATCH (church:Council {id:$id})
  
  MATCH (church)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS*1..3]->(componentServices:ServiceLog)
  MATCH (componentServices)-[:HAS_SERVICE]->(componentRecords:ServiceRecord)

  MATCH (componentRecords)-[:SERVICE_HELD_ON]->(date:TimeGraph)
  WHERE date.date > date() - duration({months: 2})
  WITH DISTINCT componentServices,componentRecords, date(date.date).week AS week ORDER BY week

RETURN week AS week,SUM(componentRecords.attendance) AS attendance, SUM(componentRecords.income) AS income ORDER BY week DESC LIMIT toInteger($limit)
`

export const componentStreamServiceAggregates = `
 MATCH (church:Stream {id:$id})
  
  MATCH (church)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS*1..4]->(componentServices:ServiceLog)
  MATCH (componentServices)-[:HAS_SERVICE]->(componentRecords:ServiceRecord)

  MATCH (componentRecords)-[:SERVICE_HELD_ON]->(date:TimeGraph)
  WHERE date.date > date() - duration({months: 2})
  WITH DISTINCT componentServices,componentRecords, date(date.date).week AS week ORDER BY week

RETURN week AS week,SUM(componentRecords.attendance) AS attendance, SUM(componentRecords.income) AS income ORDER BY week DESC LIMIT toInteger($limit)
`

export const componentGatheringServiceServiceAggregates = `
 MATCH (church:GatheringService {id:$id})
  
  MATCH (church)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS*1..5]->(componentServices:ServiceLog)
  MATCH (componentServices)-[:HAS_SERVICE]->(componentRecords:ServiceRecord)

  MATCH (componentRecords)-[:SERVICE_HELD_ON]->(date:TimeGraph)
  WHERE date.date > date() - duration({months: 2})
  WITH DISTINCT componentServices,componentRecords, date(date.date).week AS week ORDER BY week

RETURN week AS week,SUM(componentRecords.attendance) AS attendance, SUM(componentRecords.income) AS income ORDER BY week DESC LIMIT toInteger($limit)
`
