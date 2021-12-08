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
    if (!currentUser.roles.includes('adminFederal')) {
      //if User is not a federal admin
      church.setChurch(currentUser.church)
      church.setCouncilId(currentUser.council)
      church.setStreamId(currentUser.stream)

      if (!currentUser.roles.includes('adminCouncil')) {
        //User is not a Bishops Admin the he can only be looking at his constituency membership
        church.setTownId(currentUser.constituency)
        church.setCampusId(currentUser.constituency)
      }
    }
    // eslint-disable-next-line
  }, [
    currentUser.council,
    church.setCouncilId,
    church.setTownId,
    church.setCampusId,
    church.setChurch,
  ])

  if (isAuthorised(roles, currentUser.roles)) {
    //if the user has permission to access the route
    return <Route component={component} {...args} />
  } else if (isAuthorised(['leaderFellowship'], currentUser.roles)) {
    //If the user does not have permission but is a Fellowship Leader
    church.setFellowshipId(currentUser.fellowship.id)
    return <Route component={component} {...args} />
  } else if (placeholder && isAuthenticated) {
    //If the user does not have permission but is a Fellowship Leader
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
