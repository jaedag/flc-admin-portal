import React, { useContext, useEffect } from 'react'
import { Route } from 'react-router-dom'
import { withAuthenticationRequired } from '@auth0/auth0-react'
import { UnauthMsg } from './UnauthMsg'
import { MemberContext } from '../contexts/MemberContext'
import BishopDashboard from '../pages/BishopDashboard'
import { ChurchContext } from '../contexts/ChurchContext'
import { DisplayCampusTownDetails } from '../pages/DisplayCampusTownDetails'
import { LoadingScreen } from '../components/StatusScreens'

const ProtectedRoute = ({ component, roles, ...args }) => {
  const { currentUser } = useContext(MemberContext)
  const { setBishopId, setTownId, setCampusId, setChurch } = useContext(
    ChurchContext
  )

  useEffect(() => {
    setBishopId(currentUser.bishop)
    setTownId(currentUser.constituency)
    setCampusId(currentUser.constituency)
    setChurch(currentUser.church)
  }, [currentUser, setBishopId, setTownId, setCampusId, setChurch])

  if (roles.some((r) => currentUser.roles.includes(r))) {
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
  } else if (currentUser.roles.includes('coAdmin')) {
    //If the user does not have permission but is a CO Admin

    return <DisplayCampusTownDetails />
  } else {
    return <UnauthMsg />
  }
}

export default ProtectedRoute
