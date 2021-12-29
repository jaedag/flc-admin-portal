import React, { useContext } from 'react'
import { MemberContext } from '../contexts/MemberContext'
import { ChurchContext } from '../contexts/ChurchContext'
import { isAuthorised } from '../global-utils'
import Churches from 'pages/directory/Churches'

const ChurchDirectoryRoute = ({ children, roles }) => {
  const { currentUser } = useContext(MemberContext)
  const church = useContext(ChurchContext)

  if (isAuthorised(roles, currentUser.roles)) {
    //if the user has permission to access the route
    return children
  } else if (isAuthorised(['adminCouncil', 'bishop'], currentUser.roles)) {
    //if the user does not have permission but is a Bishop's Admin
    return
  } else if (
    isAuthorised(['leaderConstituency', 'adminConstituency'], currentUser.roles)
  ) {
    //If the user does not have permission but is a Constituency Leader or Admin
    church.setConstituencyId(currentUser.fellowship.bacenta.constituency.id)
    return <Churches />
  } else if (isAuthorised(['leaderBacenta'], currentUser.roles)) {
    //If the user does not have permission but is a Bacenta Leader
    church.setBacentaId(currentUser.fellowship.bacenta.id)
    return <Churches />
  } else if (isAuthorised(['leaderFellowship'], currentUser.roles)) {
    //If the user does not have permission but is a Fellowship Leader
    church.setFellowshipId(currentUser.fellowship.id)
    return <Churches />
  } else {
    return <Churches />
  }
}

export default ChurchDirectoryRoute
