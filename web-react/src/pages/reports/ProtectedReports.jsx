import React, { useContext, useEffect } from 'react'
import { Route } from 'react-router-dom'
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react'

import { MemberContext } from '../contexts/MemberContext'
import { ChurchContext } from '../contexts/ChurchContext'
import CampusTownMembers from '../pages/grids/CampusTownMembers.jsx'
import LoadingScreen from '../components/base-component/LoadingScreen'
import { isAuthorised } from '../global-utils'
import Churches from 'pages/directory/Churches'

const ProtectedReports = ({ component, roles, ...args }) => {
  const { currentUser } = useContext(MemberContext)
  const { isAuthenticated } = useAuth0()
  const church = useContext(ChurchContext)

  useEffect(() => {
    if (isAuthenticated && !currentUser.roles.includes('adminFederal')) {
      //if User is not a federal admin
      church.setBishopId(currentUser.bishop)
      church.setChurch(currentUser.church)

      if (!currentUser.roles.includes('adminBishop')) {
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
  } else if (isAuthorised(['adminBishop', 'bishop'], currentUser.roles)) {
    //if the user does not have permission but is a Bishop's Admin
    return <Route component={component} {...args} />
  } else if (
    isAuthorised(
      ['adminCampus', 'adminTown', 'leaderCampus', 'leaderTown'],
      currentUser.roles
    )
  ) {
    //If the user does not have permission but is a CO Admin
    return (
      <Route
        component={withAuthenticationRequired(CampusTownMembers, {
          // eslint-disable-next-line react/display-name
          onRedirecting: () => <LoadingScreen />,
        })}
        {...args}
      />
    )
  } else if (isAuthorised(['leaderCentre'], currentUser.roles)) {
    //If the user does not have permission but is a Centre Leader
    church.setCentreId(currentUser.bacenta.centre.id)
    return <Route component={Churches} />
  } else if (isAuthorised(['leaderBacenta'], currentUser.roles)) {
    //If the user does not have permission but is a Bacenta Leader
    church.setBacentaId(currentUser.bacenta.id)
    return <Route component={Churches} />
  } else {
    return <Route component={Churches} />
  }
}

export default ProtectedReports
