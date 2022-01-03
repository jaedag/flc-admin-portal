import React, { useContext } from 'react'
import { Route } from 'react-router-dom'
import BacentaReport from './BacentaReport'
import FellowshipReport from './FellowshipReport'
import ConstituencyReport from './ConstituencyReport'
import { MemberContext } from 'contexts/MemberContext'
import { ChurchContext } from 'contexts/ChurchContext'
import { isAuthorised } from 'global-utils'

const ProtectedReports = ({ component, roles, ...args }) => {
  const { currentUser } = useContext(MemberContext)

  const church = useContext(ChurchContext)

  if (isAuthorised(roles, currentUser.roles)) {
    //if the user has permission to access the route
    return <Route component={component} {...args} />
  } else if (
    isAuthorised(['adminCouncil', 'leaderCouncil'], currentUser.roles)
  ) {
    //if the user does not have permission but is a Bishop's Admin
    return <Route component={component} {...args} />
  } else if (
    isAuthorised(['adminConstituency', 'leaderConstituency'], currentUser.roles)
  ) {
    //If the user does not have permission but is a CO Admin
    return <Route component={ConstituencyReport} />
  } else if (isAuthorised(['leaderBacenta'], currentUser.roles)) {
    //If the user does not have permission but is a Bacenta Leader
    church.setBacentaId(currentUser.fellowship.bacenta.id)
    return <Route component={BacentaReport} />
  } else if (isAuthorised(['leaderFellowship'], currentUser.roles)) {
    //If the user does not have permission but is a Fellowship Leader
    church.setFellowshipId(currentUser.fellowship)
    return <Route component={FellowshipReport} />
  } else {
    return <Route component={FellowshipReport} />
  }
}

export default ProtectedReports
