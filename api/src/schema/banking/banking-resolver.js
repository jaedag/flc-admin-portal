import { permitLeader } from '../../resolvers/permissions'
import { isAuth } from '../../resolvers/resolver-utils'

export const serviceMutation = {
  BankCampusOffering: async (object, args, context) => {
    isAuth(permitLeader('Fellowship'), context.auth.roles)
    // const session = context.driver.session()
  },
}
