const dotenv = require('dotenv')
const axios = require('axios').default

dotenv.config()

export const resolvers = {
  // Resolver Parameters
  // Object: the parent result of a previous resolver
  // Args: Field Arguments
  // Context: Context object, database connection, API, etc
  // GraphQLResolveInfo

  Member: {
    auth_id: async (member) => {
      const config = {
        method: 'get',
        url: `https://flcadmin.us.auth0.com/api/v2/users-by-email?email=${member.emailAddress}`,
        headers: {
          autho: '',
          Authorization: `Bearer ${process.env.AUTH_API_TOKEN}`,
        },
      }

      const response = await axios(config)

      return response.data[0]?.identities[0]?.user_id
    },
  },
}
