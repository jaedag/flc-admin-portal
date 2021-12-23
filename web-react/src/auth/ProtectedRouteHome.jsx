import React, { useContext, useEffect } from 'react'
import { Route } from 'react-router-dom'
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react'
import { UnauthMsg } from './UnauthMsg'
import { MemberContext } from '../contexts/MemberContext'
import { ChurchContext } from '../contexts/ChurchContext'
import LoadingScreen from '../components/base-component/LoadingScreen'
import { isAuthorised } from '../global-utils'
import UserDashboard from 'pages/dashboards/UserDashboard'

const ProtectedRoute = ({ component, roles, ...args }) => {
  const { currentUser, setMemberId } = useContext(MemberContext)
  const { isAuthenticated } = useAuth0()
  const { setCouncilId, setConstituencyId, setChurch } =
    useContext(ChurchContext)

  useEffect(() => {
    if (isAuthenticated && !currentUser.roles.includes('adminFederal')) {
      //if User is not a federal admin
      setCouncilId(currentUser.council)
      setChurch(currentUser.church)

      if (!currentUser.roles.includes('adminCouncil')) {
        //User is not a councils Admin the he can only be looking at his constituency membership
        setConstituencyId(currentUser.constituency)
      }
    }
    // eslint-disable-next-line
  }, [currentUser, setCouncilId, setConstituencyId, setChurch])

  if (isAuthorised(roles, currentUser.roles)) {
    //if the user has permission to access the route
    return (
      <Route
        element={withAuthenticationRequired(component, {
          // eslint-disable-next-line react/display-name
          onRedirecting: () => {
            return <LoadingScreen />
          },
        })}
        {...args}
      />
    )
  } else if (
    isAuthorised(
      [
        'adminCouncil',
        'adminConstituency',
        'leaderConstituency',
        'leaderBacenta',
        'leaderSonta',
        'leaderFellowship',
      ],
      currentUser.roles
    )
  ) {
    setMemberId(currentUser.id)
    //If the user does not have permission but is a CO Admin
    return (
      <Route
        element={withAuthenticationRequired(UserDashboard, {
          // eslint-disable-next-line react/display-name
          onRedirecting: () => {
            return <LoadingScreen />
          },
        })}
        {...args}
      />
    )
  } else {
    return <UnauthMsg />
  }
}

export default ProtectedRoute
