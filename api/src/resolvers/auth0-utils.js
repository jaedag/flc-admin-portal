export const createAuthUserConfig = (member, authToken) => ({
  method: 'post',
  baseURL: process.env.AUTH0_BASE_URL,
  url: `/api/v2/users`,
  headers: {
    autho: '',
    Authorization: `Bearer ${authToken}`,
  },
  data: {
    connection: `flcadmin${process.env.TEST_ENV ? '-test' : ''}`,
    email: member.email,
    given_name: member.firstName,
    family_name: member.lastName,
    name: `${member.firstName} ${member.lastName}`,
    picture:
      member.pictureUrl ||
      'https://res.cloudinary.com/firstlovecenter/image/upload/v1627893621/user_qvwhs7.png',
    user_id: member.id,
    password: 'rAndoMLetteRs',
  },
})

export const updateAuthUserConfig = (member, authToken) => ({
  method: 'patch',
  baseURL: process.env.AUTH0_BASE_URL,
  url: `/api/v2/users/${member.auth_id}`,
  headers: {
    autho: '',
    Authorization: `Bearer ${authToken}`,
  },
  data: {
    connection: `flcadmin${process.env.TEST_ENV ? '-test' : ''}`,
    email: member.email,
    given_name: member.firstName,
    family_name: member.lastName,
    name: `${member.firstName} ${member.lastName}`,
    picture:
      member.pictureUrl ||
      'https://res.cloudinary.com/firstlovecenter/image/upload/v1627893621/user_qvwhs7.png',
  },
})

export const changePasswordConfig = (member, authToken) => ({
  method: 'post',
  baseURL: process.env.AUTH0_BASE_URL,
  url: `/api/v2/tickets/password-change`,
  headers: {
    autho: '',
    Authorization: `Bearer ${authToken}`,
  },

  data: {
    connection_id: process.env.AUTH0_DB_CONNECTION_ID,
    email: member.email,
    mark_email_as_verified: true,
  },
})

export const deleteAuthUserConfig = (memberId, authToken) => ({
  method: 'delete',
  baseURL: process.env.AUTH0_BASE_URL,
  url: `/api/v2/users/${memberId}`,
  headers: {
    autho: '',
    Authorization: `Bearer ${authToken}`,
  },
})

export const getAuthIdConfig = (member, authToken) => ({
  method: 'get',
  baseURL: process.env.AUTH0_BASE_URL,
  url: `/api/v2/users-by-email?email=${member.email}`,
  headers: {
    autho: '',
    Authorization: `Bearer ${authToken}`,
  },
})
export const getUserRoles = (memberId, authToken) => ({
  method: 'get',
  baseURL: process.env.AUTH0_BASE_URL,
  url: `/api/v2/users/${memberId}/roles`,
  headers: {
    autho: '',
    Authorization: `Bearer ${authToken}`,
  },
})
export const setUserRoles = (memberId, roles, authToken) => ({
  method: 'post',
  baseURL: process.env.AUTH0_BASE_URL,
  url: `/api/v2/users/${memberId}/roles`,
  headers: {
    autho: '',
    Authorization: `Bearer ${authToken}`,
  },
  data: {
    roles: roles,
  },
})
export const deleteUserRoles = (memberId, roles, authToken) => ({
  method: 'delete',
  baseURL: process.env.AUTH0_BASE_URL,
  url: `/api/v2/users/${memberId}/roles`,
  headers: {
    autho: '',
    Authorization: `Bearer ${authToken}`,
  },
  data: {
    roles: roles,
  },
})
