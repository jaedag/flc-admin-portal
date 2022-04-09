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
import { Container } from 'react-bootstrap'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'

const ProtectedRoute = ({ children, roles, roleBased, placeholder }) => {
  const { currentUser } = useContext(MemberContext)
  const { isAuthenticated } = useAuth0()
  const church = useContext(ChurchContext)

  const location = useLocation()
  const atHome = location?.pathname === '/'
  if (new Date().getDay() === 1) {
    return (
      <Container>
        <HeadingPrimary>Today is the Sabbath!</HeadingPrimary>
        <div>
          <p className="mb-2">Exodus 20:8-10</p>
          <p>
            Remember the sabbath day, to keep it holy. Six days shalt thou
            labour, and do all thy work: But the seventh day is the sabbath of
            the LORD thy God: in it thou shalt not do any work...
          </p>
        </div>
        <div className="mt-5">
          After you are born again, you must show your respect for God by
          honouring the Sabbath day.
          <p className="mt-2 text-end fw-bold">- Dag Heward-Mills</p>
        </div>
      </Container>
    )
  }
  if (atHome && !isAuthenticated) {
    //Unauthenticated and home
    return <Login />
  }

  if (isAuthorised(roles, currentUser.roles)) {
    //if the user has permission to access the route
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
