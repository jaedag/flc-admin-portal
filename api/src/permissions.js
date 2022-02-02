export const permitMeAndThoseAbove = (churchType) => {
  let permittedFor = []
  switch (churchType) {
    case 'Fellowship':
      permittedFor = [
        'adminGatheringService',
        'adminStream',
        'adminCouncil',
        'adminConstituency',
        'leaderGatheringService',
        'leaderStream',
        'leaderCouncil',
        'leaderConstituency',
        'leaderBacenta',
        'leaderFellowship',
      ]
      break
    case 'Bacenta':
      permittedFor = [
        'adminGatheringService',
        'adminStream',
        'adminCouncil',
        'adminConstituency',
        'leaderGatheringService',
        'leaderStream',
        'leaderCouncil',
        'leaderConstituency',
        'leaderBacenta',
      ]
      break
    case 'Sonta':
      permittedFor = [
        'adminGatheringService',
        'adminStream',
        'adminCouncil',
        'adminConstituency',
        'leaderGatheringService',
        'leaderStream',
        'leaderCouncil',
        'leaderConstituency',
        'leaderSonta',
      ]
      break
    case 'Constituency':
      permittedFor = [
        'adminGatheringService',
        'adminStream',
        'adminCouncil',
        'adminConstituency',
        'leaderGatheringService',
        'leaderStream',
        'leaderCouncil',
        'leaderConstituency',
      ]
      break
    case 'Council':
      permittedFor = [
        'adminGatheringService',
        'adminStream',
        'adminCouncil',
        'leaderGatheringService',
        'leaderStream',
        'leaderCouncil',
      ]
      break
    case 'Stream':
      permittedFor = [
        'adminGatheringService',
        'adminStream',
        'leaderGatheringService',
        'leaderStream',
      ]
      break
    case 'GatheringService':
      permittedFor = ['adminGatheringService', 'leaderGatheringService']
      break
    default:
      permittedFor = []
      break
  }

  return permittedFor
}
