import React, { useContext, useEffect } from 'react'
import { Route } from 'react-router-dom'
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react'
import { UnauthMsg } from './UnauthMsg'
import { MemberContext } from '../contexts/MemberContext'
import BishopDashboard from '../pages/dashboards/BishopDashboard.jsx'
import { ChurchContext } from '../contexts/ChurchContext'
import DisplayCampusTownDetails from '../pages/display/DetailsCampusTown.jsx'
import LoadingScreen from '../components/LoadingScreen'
import { isAuthorised } from '../global-utils'
import BacentaLeaderDashboard from '../pages/dashboards/BacentaLeaderDashboard'

const ProtectedRoute = ({ component, roles, ...args }) => {
  const { currentUser } = useContext(MemberContext)
  const { isAuthenticated } = useAuth0()
  const { setBishopId, setTownId, setCampusId, setChurch } = useContext(
    ChurchContext
  )

  useEffect(() => {
    if (isAuthenticated && !currentUser.roles.includes('federalAdmin')) {
      setBishopId(currentUser.bishop)
      setChurch(currentUser.church)
      setTownId(currentUser.constituency)
      setCampusId(currentUser.constituency)
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
  } else if (currentUser.roles.includes('bishopAdmin')) {
    //if the user does not have permission but is a Bishop's Admin

    return <BishopDashboard />
  } else if (currentUser.roles.includes('constituencyAdmin')) {
    //If the user does not have permission but is a CO Admin

    return <DisplayCampusTownDetails />
  } else if (currentUser.roles.includes('bacentaLeader')) {
    //If the user does not have permission but is a Bacenta Leader

    return <BacentaLeaderDashboard />
  } else {
    return <UnauthMsg />
  }
}

export default ProtectedRoute
