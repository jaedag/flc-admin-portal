import React, { useContext, useEffect } from 'react'
import { Route } from 'react-router-dom'
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react'

import { MemberContext } from '../contexts/MemberContext'
import { ChurchContext } from '../contexts/ChurchContext'
import ConstituencyMembers from '../pages/grids/ConstituencyMembers.jsx'
import LoadingScreen from '../components/base-component/LoadingScreen'
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
    return <Route element={component} {...args} />
  } else if (
    isAuthorised(['adminCouncil', 'leaderCouncil'], currentUser.roles)
  ) {
    //if the user does not have permission but is a Bishop's Admin
    return <Route element={component} {...args} />
  } else if (
    isAuthorised(['adminConstituency', 'leaderConstituency'], currentUser.roles)
  ) {
    //If the user does not have permission but is a CO Admin
    return (
      <Route
        element={withAuthenticationRequired(ConstituencyMembers, {
          // eslint-disable-next-line react/display-name
          onRedirecting: () => <LoadingScreen />,
        })}
        {...args}
      />
    )
  } else if (isAuthorised(['leaderBacenta'], currentUser.roles)) {
    //If the user does not have permission but is a Bacenta Leader
    church.setBacentaId(currentUser.fellowship.bacenta.id)
    return <Route element={Churches} />
  } else if (isAuthorised(['leaderFellowship'], currentUser.roles)) {
    //If the user does not have permission but is a Fellowship Leader
    church.setFellowshipId(currentUser.fellowship.id)
    return <Route element={Churches} />
  } else {
    return <Route element={Churches} />
  }
}

export default ChurchDirectoryRoute
