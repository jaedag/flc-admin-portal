import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { MemberContext } from '../contexts/MemberContext'
import { ChurchContext } from '../contexts/ChurchContext'
import { isAuthorised } from '../global-utils'
import { UnauthMsg } from './UnauthMsg'
import LoadingScreen from 'components/base-component/LoadingScreen'

const ProtectedRoute = ({ children, roles, placeholder }) => {
  const { currentUser } = useContext(MemberContext)
  const { isAuthenticated } = useAuth0()
  const church = useContext(ChurchContext)

  const location = useLocation()
  const atHome = location?.pathname === '/'

  if (isAuthorised(roles, currentUser.roles)) {
    //if the user has permission to access the route
    return children
  } else if (currentUser.roles.includes('leaderFellowship')) {
    //If the user does not have permission but is a Fellowship Leader
    church.setFellowshipId(currentUser.fellowship)
    return children
  } else if (currentUser.roles.includes('leaderBacenta')) {
    //If the user does not have permission but is a Bacenta Leader
    church.setBacentaId(currentUser.bacenta)
    return children
  } else if (
    currentUser.roles.includes('leaderConstituency', 'adminConstituency')
  ) {
    //If the user does not have permission but is a Constituency Leader
    church.setConstituencyId(currentUser.constituency)
    return children
  } else if (currentUser.roles.includes('leaderCouncil', 'adminCouncil')) {
    //If the user does not have permission but is a Council Leader
    church.setCouncilId(currentUser.council)
    return children
  } else if (currentUser.roles.includes('leaderStream', 'adminStream')) {
    //If the user does not have permission but is a Stream Leader
    church.setStreamId(currentUser.stream)
    return children
  } else if (
    currentUser.roles.includes(
      'leaderGatheringService',
      'adminGatheringService'
    )
  ) {
    //If the user does not have permission but is a GatheringService Leader
    church.setGatheringServiceId(currentUser.gatheringService)
    return children
  } else if (placeholder && isAuthenticated) {
    //If the user does not have permission but is a Fellowship Leader
    return children
  } else if (isAuthenticated) {
    return <LoadingScreen />
  } else if (!isAuthenticated && !atHome) {
    return <LoadingScreen />
  } else {
    return <UnauthMsg />
  }
}

export default ProtectedRoute
