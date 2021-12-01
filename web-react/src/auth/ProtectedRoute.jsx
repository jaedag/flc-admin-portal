import React, { useContext, useEffect } from 'react'
import { Route } from 'react-router-dom'
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react'
import { MemberContext } from '../contexts/MemberContext'
import { ChurchContext } from '../contexts/ChurchContext'
import { isAuthorised } from '../global-utils'
import Login from 'components/Login'

const ProtectedRoute = ({ component, roles, placeholder, ...args }) => {
  const { currentUser } = useContext(MemberContext)
  const { isAuthenticated } = useAuth0()
  const church = useContext(ChurchContext)

  useEffect(() => {
    if (isAuthenticated && !currentUser.roles.includes('adminFederal')) {
      //if User is not a federal admin
      church.setBishopId(currentUser.bishop)
      church.setChurch(currentUser.church)
      church.setCouncilId(currentUser.council)

      if (!currentUser.roles.includes('adminCouncil')) {
        //User is not a Bishops Admin the he can only be looking at his constituency membership
        church.setTownId(currentUser.constituency)
        church.setCampusId(currentUser.constituency)
      }
    }
    // eslint-disable-next-line
  }, [
    currentUser,
    church.setBishopId,
    church.setTownId,
    church.setCampusId,
    church.setChurch,
  ])

  if (isAuthorised(roles, currentUser.roles)) {
    //if the user has permission to access the route
    return <Route component={component} {...args} />
  } else if (isAuthorised(['leaderBacenta'], currentUser.roles)) {
    //If the user does not have permission but is a Bacenta Leader
    church.setBacentaId(currentUser.bacenta.id)
    return <Route component={component} {...args} />
  } else if (placeholder && isAuthenticated) {
    //If the user does not have permission but is a Bacenta Leader
    return (
      <Route
        component={withAuthenticationRequired(component, {
          // eslint-disable-next-line react/display-name
          onRedirecting: () => component,
        })}
        {...args}
      />
    )
  } else {
    return <Login />
  }
}

export default ProtectedRoute
