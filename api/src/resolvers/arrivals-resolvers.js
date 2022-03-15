import { permitAdmin, permitArrivals } from './permissions'
import { MakeServant, RemoveServant } from './resolvers'

export const arrivalsMutation = {
  MakeConstituencyArrivalsAdmin: async (object, args, context) =>
    MakeServant(
      context,
      args,
      [...permitAdmin('Constituency'), ...permitArrivals('Council')],
      'Constituency',
      'ArrivalsAdmin'
    ),
  RemoveConstituencyArrivalsAdmin: async (object, args, context) =>
    RemoveServant(
      context,
      args,
      [...permitAdmin('Constituency'), ...permitArrivals('Council')],
      'Constituency',
      'ArrivalsAdmin'
    ),
  MakeCouncilArrivalsAdmin: async (object, args, context) =>
    MakeServant(
      context,
      args,
      [...permitAdmin('Council'), ...permitArrivals('Stream')],
      'Council',
      'ArrivalsAdmin'
    ),
  RemoveCouncilArrivalsAdmin: async (object, args, context) =>
    RemoveServant(
      context,
      args,
      [...permitAdmin('Council'), ...permitArrivals('Stream')],
      'Council',
      'ArrivalsAdmin'
    ),
  MakeStreamArrivalsAdmin: async (object, args, context) =>
    MakeServant(
      context,
      args,
      [...permitAdmin('Stream'), ...permitArrivals('GatheringService')],
      'Stream',
      'ArrivalsAdmin'
    ),
  RemoveStreamArrivalsAdmin: async (object, args, context) =>
    RemoveServant(
      context,
      args,
      [...permitAdmin('Stream'), ...permitArrivals('GatheringService')],
      'Stream',
      'ArrivalsAdmin'
    ),
  MakeGatheringServiceArrivalsAdmin: async (object, args, context) =>
    MakeServant(
      context,
      args,
      [...permitAdmin('GatheringService'), ...permitArrivals('Denomination')],
      'GatheringService',
      'ArrivalsAdmin'
    ),
  RemoveGatheringServiceArrivalsAdmin: async (object, args, context) =>
    RemoveServant(
      context,
      args,
      [...permitAdmin('GatheringService'), ...permitArrivals('Denomination')],
      'GatheringService',
      'ArrivalsAdmin'
    ),
}

export const arrivalsResolvers = {}
