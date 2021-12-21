import React, { useContext, useEffect } from 'react'
import { Route } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'

import { MemberContext } from '../contexts/MemberContext'
import { ChurchContext } from '../contexts/ChurchContext'
import { isAuthorised } from '../global-utils'
import Churches from 'pages/directory/Churches'

const ChurchDirectoryRoute = ({ component, roles, ...args }) => {
  const { currentUser } = useContext(MemberContext)
  const { isAuthenticated } = useAuth0()
  const church = useContext(ChurchContext)

  useEffect(() => {
    if (isAuthenticated && !currentUser.roles.includes('adminFederal')) {
      //if User is not a federal admin
      church.setCouncilId(currentUser.council)
      church.setChurch(currentUser.church)

      if (!currentUser.roles.includes('adminCouncil')) {
        //User is not a Bishops Admin the he can only be looking at his constituency membership
        church.setConstituencyId(currentUser.constituency)
      }
    }
    // eslint-disable-next-line
  }, [
    currentUser,
    church.setCouncilId,
    church.setConstituencyId,
    church.setChurch,
  ])

  if (isAuthorised(roles, currentUser.roles)) {
    //if the user has permission to access the route
    return <Route component={component} {...args} />
  } else if (isAuthorised(['adminCouncil', 'bishop'], currentUser.roles)) {
    //if the user does not have permission but is a Bishop's Admin
    return <Route component={component} {...args} />
  } else if (isAuthorised(['leaderTown', 'adminTown'], currentUser.roles)) {
    //If the user does not have permission but is a Town Leader or Admin
    church.setConstituency(currentUser.fellowship.bacenta.constituency.id)
    return <Route component={Churches} />
  } else if (isAuthorised(['leaderCampus', 'adminCampus'], currentUser.roles)) {
    //If the user does not have permission but is a Campus Leader or Admin
    church.setConstituency(currentUser.fellowship.bacenta.constituency.id)
    return <Route component={Churches} />
  } else if (isAuthorised(['leaderBacenta'], currentUser.roles)) {
    //If the user does not have permission but is a Bacenta Leader
    church.setBacentaId(currentUser.fellowship.bacenta.id)
    return <Route component={Churches} />
  } else if (isAuthorised(['leaderFellowship'], currentUser.roles)) {
    //If the user does not have permission but is a Fellowship Leader
    church.setFellowshipId(currentUser.fellowship.id)
    return <Route component={Churches} />
  } else {
    return <Route component={Churches} />
  }
}

export default ChurchDirectoryRoute
