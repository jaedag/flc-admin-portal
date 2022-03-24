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
  return [
    ...permitLeaderAdmin(churchLevel),
    ...permitArrivals(churchLevel),
    ...permitArrivalsHelper(churchLevel),
  ]
}

export const permitArrivals = (churchLevel) => {
  let permittedFor = []
  switch (churchLevel) {
    case 'Fellowship':
    case 'Bacenta':
      permittedFor = [
        'arrivalsAdminGatheringService',
        'arrivalsAdminStream',
        'arrivalsAdminCouncil',
        'arrivalsAdminConstituency',
      ]
      break
    case 'Constituency':
      permittedFor = [
        'arrivalsAdminGatheringService',
        'arrivalsAdminStream',
        'arrivalsAdminCouncil',
        'arrivalsAdminConstituency',
      ]
      break
    case 'Council':
      permittedFor = [
        'arrivalsAdminGatheringService',
        'arrivalsAdminStream',
        'arrivalsAdminCouncil',
      ]
      break
    case 'Stream':
      permittedFor = ['arrivalsAdminGatheringService', 'arrivalsAdminStream']
      break
    case 'GatheringService':
      permittedFor = ['arrivalsAdminGatheringService']
      break
    default:
      permittedFor = []
      break
  }

  return [...permitAdmin(churchLevel), ...permittedFor]
}

export const permitArrivalsHelper = (churchLevel) => {
  let permittedFor = []
  switch (churchLevel) {
    case 'Fellowship':
    case 'Bacenta':
    case 'Constituency':
    case 'Council':
    case 'Stream':
      permittedFor = ['arrivalsHelperStream']
      break

    default:
      permittedFor = []
      break
  }

  return permittedFor
}
export const permitLeaderAdminArrivals = (churchLevel) => {
  return [...permitLeaderAdmin(churchLevel), ...permitArrivals(churchLevel)]
}

export const permitAdminArrivals = (churchLevel) => {
  return [...permitAdmin(churchLevel), ...permitArrivals(churchLevel)]
}
