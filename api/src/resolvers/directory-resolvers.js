import { permitAdmin, permitLeaderAdmin } from './permissions'
import { isAuth, rearrangeCypherObject, throwErrorMsg } from './resolver-utils'
import { RemoveServant } from './resolvers'
const cypher = require('./cypher/resolver-cypher')
const closeChurchCypher = require('./cypher/close-church-cypher')

export const directoryMutation = {
  CreateMember: async (object, args, context) => {
    isAuth(permitLeaderAdmin('Fellowship'), context.auth.roles)

    const session = context.driver.session()
    const memberResponse = await session.run(
      cypher.checkMemberEmailExists,
      args
    )

    const memberCheck = rearrangeCypherObject(memberResponse)

    if (memberCheck.email || memberCheck.whatsappNumber) {
      throwErrorMsg(
        'A member with this email address/whatsapp number already exists in the database',
        ''
      )
    }

    const createMemberResponse = await session.run(cypher.createMember, {
      firstName: args?.firstName ?? '',
      middleName: args?.middleName ?? '',
      lastName: args?.lastName ?? '',
      email: args?.email ?? '',
      phoneNumber: args?.phoneNumber ?? '',
      whatsappNumber: args?.whatsappNumber ?? '',
      dob: args?.dob ?? '',
      maritalStatus: args?.maritalStatus ?? '',
      gender: args?.gender ?? '',
      occupation: args?.occupation ?? '',
      fellowship: args?.fellowship ?? '',
      ministry: args?.ministry ?? '',
      pictureUrl: args?.pictureUrl ?? '',
      auth_id: context.auth.jwt.sub ?? '',
    })

    const member = rearrangeCypherObject(createMemberResponse)

    return member
  },

  MakeMemberInactive: async (object, args, context) => {
    isAuth(permitLeaderAdmin('Stream'), context.auth.roles)
    const session = context.driver.session()

    const memberCheck = rearrangeCypherObject(
      await session.run(cypher.checkMemberHasNoActiveRelationships, args)
    )

    if (memberCheck?.properties) {
      throwErrorMsg(
        'This member has active roles in church. Please remove them and try again'
      )
    }

    const member = rearrangeCypherObject(
      await session.run(cypher.makeMemberInactive, args)
    )

    return member?.properties
  },
  CloseDownFellowship: async (object, args, context) => {
    isAuth(permitAdmin('Constituency'), context.auth.roles)

    const session = context.driver.session()

    try {
      const fellowshipCheckResponse = await session.run(
        closeChurchCypher.checkFellowshipHasNoMembers,
        args
      )
      const fellowshipCheck = rearrangeCypherObject(fellowshipCheckResponse)

      if (fellowshipCheck.memberCount) {
        throwErrorMsg(
          `${fellowshipCheck?.name} Fellowship has ${fellowshipCheck?.memberCount} members. Please transfer all members and try again.`
        )
      }

      //Fellowship Leader must be removed since the fellowship is being closed down
      await RemoveServant(
        context,
        args,
        [
          'adminGatheringService',
          'adminStream',
          'adminCouncil',
          'adminConstituency',
        ],
        'Fellowship',
        'Leader'
      )

      const closeFellowshipResponse = await session.run(
        closeChurchCypher.closeDownFellowship,
        {
          auth: context.auth,
          fellowshipId: args.fellowshipId,
        }
      )

      const fellowshipResponse = rearrangeCypherObject(closeFellowshipResponse) //Returns a Bacenta

      return fellowshipResponse.bacenta
    } catch (error) {
      throwErrorMsg(error)
    }
  },

  CloseDownBacenta: async (object, args, context) => {
    isAuth(permitAdmin('Constituency'), context.auth.roles)

    const session = context.driver.session()

    try {
      const bacentaCheckResponse = await session.run(
        closeChurchCypher.checkBacentaHasNoMembers,
        args
      )
      const bacentaCheck = rearrangeCypherObject(bacentaCheckResponse)

      if (bacentaCheck.memberCount) {
        throwErrorMsg(
          `${bacentaCheck?.name} Bacenta has ${bacentaCheck?.fellowshipCount} active fellowships. Please close down all fellowships and try again.`
        )
      }

      //Bacenta Leader must be removed since the Bacenta is being closed down
      await RemoveServant(
        context,
        args,
        permitAdmin('Constituency'),
        'Bacenta',
        'Leader'
      )

      const closeBacentaResponse = await session.run(
        closeChurchCypher.closeDownBacenta,
        {
          auth: context.auth,
          bacentaId: args.bacentaId,
        }
      )

      const bacentaResponse = rearrangeCypherObject(closeBacentaResponse)
      return bacentaResponse.constituency
    } catch (error) {
      throwErrorMsg(error)
    }
  },
  CloseDownConstituency: async (object, args, context) => {
    isAuth(permitAdmin('Council'), context.auth.roles)

    const session = context.driver.session()

    try {
      const constituencyCheckResponse = await session.run(
        closeChurchCypher.checkConstituencyHasNoMembers,
        args
      )
      const constituencyCheck = rearrangeCypherObject(constituencyCheckResponse)

      if (constituencyCheck.memberCount) {
        throwErrorMsg(
          `${constituencyCheck?.name} Constituency has ${constituencyCheck?.bacentaCount} active bacentas. Please close down all bacentas and try again.`
        )
      }

      //Bacenta Leader must be removed since the Bacenta is being closed down
      await RemoveServant(
        context,
        args,
        permitAdmin('Council'),
        'Constituency',
        'Leader'
      )

      const closeConstituencyResponse = await session.run(
        closeChurchCypher.closeDownConstituency,
        {
          auth: context.auth,
          constituencyId: args.constituencyId,
        }
      )

      const constituencyResponse = rearrangeCypherObject(
        closeConstituencyResponse
      )
      return constituencyResponse.council
    } catch (error) {
      throwErrorMsg(error)
    }
  },
}
