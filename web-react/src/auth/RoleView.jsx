// import { useAuth0 } from '@auth0/auth0-react'
import React, { useContext } from 'react'
import { MemberContext } from '../contexts/MemberContext'
import { isAuthorised } from '../global-utils'

const RoleView = (props) => {
  const { roles, children } = props
  const { currentUser } = useContext(MemberContext)

  if (isAuthorised(roles, currentUser.roles)) {
    return <>{children}</>
  } else {
    return null
  }
}

export default RoleView
