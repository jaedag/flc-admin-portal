import React, { useContext } from 'react'
import { MemberContext } from '../contexts/MemberContext'

const RoleView = (props) => {
  const { authRoles, children } = props
  const { currentUser } = useContext(MemberContext)

  if (authRoles.some((r) => currentUser.roles.includes(r))) {
    return <React.Fragment>{children}</React.Fragment>
  } else {
    return null
  }
}

export default RoleView
