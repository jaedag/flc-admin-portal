import React, { useContext, useEffect } from 'react'
import { Route } from 'react-router-dom'
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react'
import { UnauthMsg } from './UnauthMsg'
import { MemberContext } from '../contexts/MemberContext'
import { ChurchContext } from '../contexts/ChurchContext'
// import DisplayCampusTownDetails from '../pages/display/DetailsCampusTown.jsx'
import LoadingScreen from '../components/base-component/LoadingScreen'
import { isAuthorised } from '../global-utils'
import UserDashboard from 'pages/dashboards/UserDashboard'

const ProtectedRoute = ({ component, roles, ...args }) => {
  const { currentUser, setMemberId } = useContext(MemberContext)
  const { isAuthenticated } = useAuth0()
  const { setBishopId, setTownId, setCampusId, setChurch } = useContext(
    ChurchContext
  )

  useEffect(() => {
    if (isAuthenticated && !currentUser.roles.includes('adminFederal')) {
      //if User is not a federal admin
      setBishopId(currentUser.bishop)
      setChurch(currentUser.church)

      if (!currentUser.roles.includes('adminBishop')) {
        //User is not a Bishops Admin the he can only be looking at his constituency membership
        setTownId(currentUser.constituency)
        setCampusId(currentUser.constituency)
      }
    }
    // eslint-disable-next-line
  }, [currentUser, setBishopId, setTownId, setCampusId, setChurch])

  if (isAuthorised(roles, currentUser.roles)) {
    //if the user has permission to access the route
    return (
      <Route
        component={withAuthenticationRequired(component, {
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
        'adminBishop',
        'adminCampus',
        'adminTown',
        'leaderCampus',
        'leaderTown',
        'leaderCentre',
        'leaderSonta',
        'leaderBacenta',
      ],
      currentUser.roles
    )
  ) {
    setMemberId(currentUser.id)
    //If the user does not have permission but is a CO Admin
    return (
      <Route
        component={withAuthenticationRequired(UserDashboard, {
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
