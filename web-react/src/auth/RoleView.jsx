// import { useAuth0 } from '@auth0/auth0-react'
import React, { useContext } from 'react'
import { MemberContext } from '../contexts/MemberContext'
import useAuth from './useAuth'

const RoleView = (props) => {
  const { roles, children, verifyId, stream } = props
  const { currentUser } = useContext(MemberContext)
  const { isAuthorised } = useAuth()

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

  const permittedStream = (stream) => {
    if (!stream) return true

    if (stream) {
      if (stream.includes(currentUser.stream_name)) {
        return true
      } else {
        return false
      }
    }
  }

  if (isAuthorised(roles) && verify(verifyId) && permittedStream(stream)) {
    return <>{children}</>
  } else {
    return null
  }
}

export default RoleView
