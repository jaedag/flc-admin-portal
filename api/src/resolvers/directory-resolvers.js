import { permitLeaderAdmin } from './permissions'
import { isAuth, rearrangeCypherObject, throwErrorMsg } from './resolver-utils'
const cypher = require('./cypher/resolver-cypher')

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
}
