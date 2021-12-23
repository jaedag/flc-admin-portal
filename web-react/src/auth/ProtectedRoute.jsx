import React, { useContext, useEffect } from 'react'
import { Route, useLocation } from 'react-router-dom'
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react'
import { MemberContext } from '../contexts/MemberContext'
import { ChurchContext } from '../contexts/ChurchContext'
import { isAuthorised } from '../global-utils'
import { UnauthMsg } from './UnauthMsg'
import LoadingScreen from 'components/base-component/LoadingScreen'

const ProtectedRoute = ({ component, roles, placeholder, ...args }) => {
  const { currentUser } = useContext(MemberContext)
  const { isAuthenticated } = useAuth0()
  const church = useContext(ChurchContext)

  const location = useLocation()
  const atHome = location?.pathname === '/'

  useEffect(() => {
    church.setGatheringId(currentUser.gatheringService)

    if (!isAuthorised(currentUser.roles, ['adminFederal'])) {
      //if User is not a federal admin
      church.setChurch(currentUser.church)
      church.setStreamId(currentUser.stream)
      if (!isAuthorised(currentUser.roles, ['adminStream', 'leaderStream'])) {
        church.setCouncilId(currentUser.council)
        if (
          !isAuthorised(currentUser.roles, ['adminCouncil', 'leaderCouncil'])
        ) {
          //User is not a Bishops Admin the he can only be looking at his constituency membership
          church.setConstituencyId(currentUser.constituency)

          if (
            !isAuthorised(currentUser.roles, [
              'adminConstituency',
              'leaderConstituency',
            ])
          ) {
            //User is not a Constituency Admin the he can only be looking at his bacenta membership
            church.setBacentaId(currentUser.fellowship?.bacenta?.id)

            // if (!isAuthorised(currentUser.roles, ['leaderBacenta'])) {
            //   //User is not a Bacenta Leader and he can only be looking at his fellowship membership
            //   church.setFellowshipId(currentUser.fellowship?.id)
            // }
          }
        }
      }
    }
    // eslint-disable-next-line
  }, [currentUser, church])

  if (isAuthorised(roles, currentUser.roles)) {
    //if the user has permission to access the route
    return <Route element={component} {...args} />
  } else if (currentUser.roles.includes('leaderFellowship')) {
    //If the user does not have permission but is a Fellowship Leader
    church.setFellowshipId(currentUser.fellowship.id)
    return <Route element={component} {...args} />
  } else if (placeholder && isAuthenticated) {
    //If the user does not have permission but is a Fellowship Leader
    return (
      <Route
        element={withAuthenticationRequired(component, {
          // eslint-disable-next-line react/display-name
          onRedirecting: () => component,
        })}
        {...args}
      />
    )
  } else if (isAuthenticated) {
    return <LoadingScreen />
  } else if (!isAuthenticated && !atHome) {
    return <LoadingScreen />
  } else {
    return <UnauthMsg />
  }
}

export default ProtectedRoute
