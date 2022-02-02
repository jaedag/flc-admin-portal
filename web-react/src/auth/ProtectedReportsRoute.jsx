import React, { useContext } from 'react'
import { Route } from 'react-router-dom'
import { withAuthenticationRequired } from '@auth0/auth0-react'

import { MemberContext } from '../contexts/MemberContext'
import { ChurchContext } from '../contexts/ChurchContext'
import ConstituencyMembers from '../pages/directory/grids/ConstituencyMembers.jsx'
import LoadingScreen from '../components/base-component/LoadingScreen'
import { isAuthorised } from '../global-utils'
import Churches from 'pages/directory/Churches'

const ProtectedReports = ({ component, roles, ...args }) => {
  const { currentUser } = useContext(MemberContext)
  const church = useContext(ChurchContext)

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
    church.setBacentaId(currentUser.bacenta)
    return <Route element={Churches} />
  } else if (isAuthorised(['leaderFellowship'], currentUser.roles)) {
    //If the user does not have permission but is a Fellowship Leader
    church.setFellowshipId(currentUser.fellowship)
    return <Route element={Churches} />
  } else {
    return <Route element={Churches} />
  }
}

export default ProtectedReports
