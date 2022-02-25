// Permissions Things
export const permitLeader = (churchLevel) => {
  let permittedFor = []
  switch (churchLevel.toLowerCase()) {
    case 'fellowship':
      permittedFor = [
        'leaderGatheringService',
        'leaderStream',
        'leaderCouncil',
        'leaderConstituency',
        'leaderBacenta',
        'leaderFellowship',
      ]
      break
    case 'bacenta':
      permittedFor = [
        'leaderGatheringService',
        'leaderStream',
        'leaderCouncil',
        'leaderConstituency',
        'leaderBacenta',
      ]
      break
    case 'sonta':
      permittedFor = [
        'leaderGatheringService',
        'leaderStream',
        'leaderCouncil',
        'leaderConstituency',
        'leaderSonta',
      ]
      break
    case 'constituency':
      permittedFor = [
        'leaderGatheringService',
        'leaderStream',
        'leaderCouncil',
        'leaderConstituency',
      ]
      break
    case 'council':
      permittedFor = ['leaderGatheringService', 'leaderStream', 'leaderCouncil']
      break
    case 'stream':
      permittedFor = ['leaderGatheringService', 'leaderStream']
      break
    case 'gatheringservice':
      permittedFor = ['leaderGatheringService']
      break
    default:
      permittedFor = []
      break
  }

  return permittedFor
}

export const permitAdmin = (churchLevel) => {
  let permittedFor = []
  switch (churchLevel) {
    case 'Fellowship':
    case 'Bacenta':
    case 'Sonta':
    case 'Constituency':
      permittedFor = [
        'adminGatheringService',
        'adminStream',
        'adminCouncil',
        'adminConstituency',
      ]
      break

    case 'Council':
      permittedFor = ['adminGatheringService', 'adminStream', 'adminCouncil']
      break
    case 'Stream':
      permittedFor = ['adminGatheringService', 'adminStream']
      break
    case 'GatheringService':
      permittedFor = ['adminGatheringService']
      break
    default:
      permittedFor = []
      break
  }

  return permittedFor
}

export const permitLeaderAdmin = (churchLevel) => {
  return [...permitLeader(churchLevel), ...permitAdmin(churchLevel)]
}

export const permitMe = (churchLevel) => {
  return [...permitLeaderAdmin(churchLevel), ...permitArrivals(churchLevel)]
}

export const permitArrivals = (churchLevel) => {
  let permittedFor = []
  switch (churchLevel) {
    case 'Fellowship':
    case 'Bacenta':
      permittedFor = [
        'adminGatheringServiceArrivals',
        'adminStreamArrivals',
        'adminCouncilArrivals',
        'adminConstituencyArrivals',
      ]
      break
    case 'Constituency':
      permittedFor = [
        'adminGatheringServiceArrivals',
        'adminStreamArrivals',
        'adminCouncilArrivals',
        'adminConstituencyArrivals',
      ]
      break
    case 'Council':
      permittedFor = [
        'adminGatheringServiceArrivals',
        'adminStreamArrivals',
        'adminCouncilArrivals',
      ]
      break
    case 'Stream':
      permittedFor = ['adminGatheringServiceArrivals', 'adminStreamArrivals']
      break
    case 'GatheringService':
      permittedFor = ['adminGatheringServiceArrivals']
      break
    default:
      permittedFor = []
      break
  }

  return [...permitAdmin(churchLevel), ...permittedFor]
}
