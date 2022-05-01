import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { MemberContext } from '../contexts/MemberContext'
import { ChurchContext } from '../contexts/ChurchContext'
import { isAuthorised } from '../global-utils'
import { permitMe } from 'permission-utils'
import { UnauthMsg } from './UnauthMsg'
import LoadingScreen from 'components/base-component/LoadingScreen'
import Login from 'components/Login'
import Sabbath from './Sabbath'

const ProtectedRoute = ({ children, roles, roleBased, placeholder }) => {
  const { currentUser } = useContext(MemberContext)
  const { isAuthenticated } = useAuth0()
  const church = useContext(ChurchContext)

  const location = useLocation()
  const atHome = location?.pathname === '/'

  if (new Date().getDay() === 1) {
    return <Sabbath />
  }
  if (atHome && !isAuthenticated) {
    //Unauthenticated and home
    return <Login />
  }

  if (isAuthorised(roles, currentUser.roles)) {
    //if the user has permission to access the initialTouchedroute
    return children
  } else if (placeholder && !isAuthenticated && roleBased) {
    //User has no permission but there is a placeholder, and he's authenticated so let's load the screen
    if (isAuthorised(permitMe('Fellowship'), currentUser.roles)) {
      //If the user does not have permission but is a Fellowship Leader
      church.setFellowshipId(currentUser.fellowship)
      return children
    } else if (isAuthorised(permitMe('Bacenta'), currentUser.roles)) {
      //If the user does not have permission but is a Bacenta Leader
      church.setBacentaId(currentUser.bacenta)
      return children
    } else if (isAuthorised(permitMe('Constituency'), currentUser.roles)) {
      //If the user does not have permission but is a Constituency Leader
      church.setConstituencyId(currentUser.constituency)
      return children
    } else if (isAuthorised(permitMe('Council'), currentUser.roles)) {
      //If the user does not have permission but is a Council Leader
      church.setCouncilId(currentUser.council)
      return children
    } else if (isAuthorised(permitMe('Stream'), currentUser.roles)) {
      //If the user does not have permission but is a Stream Leader
      church.setStreamId(currentUser.stream)
      return children
    } else if (isAuthorised(permitMe('GatheringService'), currentUser.roles)) {
      //If the user does not have permission but is a GatheringService Leader
      church.setGatheringServiceId(currentUser.gatheringService)
      return children
    }

    return children
  } else if (placeholder && !isAuthenticated) {
    return children
  } else if (!isAuthenticated || !currentUser.roles.length) {
    //Not Authenticated means that Authentication is still happening
    return <LoadingScreen />
  } else if (isAuthenticated && currentUser.roles.length) {
    //Authenticated but not allowed to view
    return <UnauthMsg />
  }

  return <UnauthMsg />
}

export default ProtectedRoute
