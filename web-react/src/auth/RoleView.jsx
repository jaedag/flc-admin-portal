// import { useAuth0 } from '@auth0/auth0-react'
import { useAuth0 } from '@auth0/auth0-react'
import React, { useContext } from 'react'
import { MemberContext } from '../contexts/MemberContext'
import { isAuthorised } from '../global-utils'

const RoleView = (props) => {
  const { roles, children, verifyId } = props
  const { currentUser } = useContext(MemberContext)
  const { isAuthenticated } = useAuth0()

  const verify = (verifyId) => {
    if (!verifyId) return true

    if (verifyId) {
      if (currentUser.id === verifyId) {
        return true
      } else {
        return false
      }
    }
  }

  if (
    isAuthenticated &&
    isAuthorised(roles, currentUser.roles) &&
    verify(verifyId)
  ) {
    return <>{children}</>
  } else {
    return null
  }
}

export default RoleView
