const dotenv = require('dotenv')
const axios = require('axios').default

dotenv.config()

const matchMemberQuery = `MATCH (member:Member {id:$from.id}) MATCH (member)-[:IS_ADMIN_FOR|:LEADS]->() 
  RETURN 
  member.id AS id,
  member.auth_id AS auth_id,
  member.firstName AS firstName, 
  member.lastName AS lastName,
  member.emailAddress AS emailAddress,
  member.phoneNumber AS phoneNumber,
  member.pictureUrl AS pictureUrl`

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
  Mutation: {
    AddMemberIsBishopAdminFor: async (object, args, context) => {
      const session = context.driver.session()

      await session.run(matchMemberQuery, args).then((response) => {
        let member = {}
        response.records[0].keys.forEach(
          (key, i) => (member[key] = response.records[0]._fields[i])
        )

        //Check if Member has Auth0 ID
        //If not, create auth0 profile
        if (!member.auth_id) {
          const config = {
            method: 'post',
            url: `https://flcadmin.us.auth0.com/api/v2/users`,
            headers: {
              autho: '',
              Authorization: `Bearer ${process.env.AUTH_API_TOKEN}`,
            },
            body: {
              email: member.emailAddress,
              phoneNumber: member.phoneNumber,
              user_metadata: {
                admin: true,
              },
              given_name: member.firstName,
              family_name: member.lastName,
              name: `${member.firstName} ${member.lastName}`,
              picture: member.pictureUrl,
              user_id: member.id,
              password: 'rAndoMLetteRs',
            },
          }

          axios(config).then((res) => {
            console.log('Axios Response', res)
          })
        } else {
          //Check if Member is Already Admin/Leader
          console.log('check user metadata')
          //Check auth0 roles and add roles 'bishopAdmin'
        }
      })
    },
  },
}
