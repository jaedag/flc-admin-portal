import React, { useContext, useEffect } from 'react'
import { Route } from 'react-router-dom'
import { withAuthenticationRequired, useAuth0 } from '@auth0/auth0-react'
import { UnauthMsg } from './UnauthMsg'
import { MemberContext } from '../contexts/MemberContext'
import { ChurchContext } from '../contexts/ChurchContext'
import LoadingScreen from '../components/LoadingScreen'
import { isAuthorised } from '../global-utils'

const ProtectedRoute = ({ component, roles, ...args }) => {
  const { currentUser } = useContext(MemberContext)
  const { isAuthenticated } = useAuth0()
  const { setBishopId, setTownId, setCampusId, setChurch } =
    useContext(ChurchContext)

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
  } else {
    return <UnauthMsg />
  }
}

export default ProtectedRoute
