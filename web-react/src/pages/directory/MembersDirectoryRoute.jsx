import React, { useContext, useEffect } from 'react'
import { MemberContext } from '../../contexts/MemberContext'
import { ChurchContext } from '../../contexts/ChurchContext'
import CouncilMembers from './grids/CouncilMembers.jsx'
import ConstituencyMembers from './grids/ConstituencyMembers.jsx'
import { isAuthorised } from '../../global-utils'
import FellowshipMembers from 'pages/directory/grids/FellowshipMembers'
import BacentaMembers from 'pages/directory/grids/BacentaMembers'
import GatheringServiceMembers from 'pages/directory/grids/GatheringServiceMembers'

const MembersDirectoryRoute = ({ children, roles }) => {
  const { currentUser } = useContext(MemberContext)
  const church = useContext(ChurchContext)

  useEffect(() => {
    church.setGatheringServiceId(currentUser.gatheringService)

    if (!isAuthorised(currentUser.roles, ['adminFederal'])) {
      //if User is not a federal admin
      church.setChurch(currentUser.church)
      church.setStreamId(currentUser.stream)
      if (!isAuthorised(currentUser.roles, ['adminStream', 'leaderStream'])) {
        church.setCouncilId(currentUser.council)
        if (
          !isAuthorised(currentUser.roles, ['adminCouncil', 'leaderCouncil'])
        ) {
          //User is not a Bishops Admin the he can only be looking at his constituency membership
          church.setConstituencyId(currentUser.constituency)

          if (
            !isAuthorised(currentUser.roles, [
              'adminConstituency',
              'leaderConstituency',
            ])
          ) {
            //User is not a Constituency Admin the he can only be looking at his bacenta membership
            church.setBacentaId(currentUser.fellowship?.bacenta?.id)

            // if (!isAuthorised(currentUser.roles, ['leaderBacenta'])) {
            //   //User is not a Bacenta Leader and he can only be looking at his fellowship membership
            //   church.setFellowshipId(currentUser.fellowship?.id)
            // }
          }
        }
      }
    }
    // eslint-disable-next-line
  }, [currentUser, church])

  if (isAuthorised(roles, currentUser.roles)) {
    //if the user has permission to access the route
    return children
  } else if (isAuthorised(['adminFederal', 'bishop'], currentUser.roles)) {
    //if the user does not have permission but is a Bishop's Admin
    return <GatheringServiceMembers />
  } else if (isAuthorised(['adminCouncil', 'bishop'], currentUser.roles)) {
    //if the user does not have permission but is a Bishop's Admin
    return <CouncilMembers />
  } else if (
    isAuthorised(['adminConstituency', 'leaderConstituency'], currentUser.roles)
  ) {
    //If the user does not have permission but is a CO or CO Admin
    church.setConstituencyId(currentUser.fellowship.bacenta.constituency.id)
    return <ConstituencyMembers />
  } else if (isAuthorised(['leaderBacenta'], currentUser.roles)) {
    //If the user does not have permission but is a Bacenta Leader
    church.setBacentaId(currentUser.fellowship.bacenta.id)
    return <BacentaMembers />
  } else if (isAuthorised(['leaderFellowship'], currentUser.roles)) {
    //If the user does not have permission but is a Fellowship Leader
    church.setFellowshipId(currentUser.fellowship.id)
    return <FellowshipMembers />
  } else {
    return <FellowshipMembers />
  }
}

export default MembersDirectoryRoute
