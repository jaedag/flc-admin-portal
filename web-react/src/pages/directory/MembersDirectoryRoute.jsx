import React, { useContext, useEffect } from 'react'
import { Route } from 'react-router-dom'
import { withAuthenticationRequired } from '@auth0/auth0-react'
import { MemberContext } from '../../contexts/MemberContext'
import { ChurchContext } from '../../contexts/ChurchContext'
import CouncilMembers from '../grids/CouncilMembers.jsx'
import ConstituencyMembers from '../grids/ConstituencyMembers.jsx'
import LoadingScreen from '../../components/base-component/LoadingScreen'
import { isAuthorised } from '../../global-utils'
import FellowshipMembers from 'pages/grids/FellowshipMembers'
import BacentaMembers from 'pages/grids/BacentaMembers'
import GatheringServiceMembers from 'pages/grids/GatheringServiceMembers'

const MembersDirectoryRoute = ({ component, roles, ...args }) => {
  const { currentUser } = useContext(MemberContext)
  const church = useContext(ChurchContext)

  useEffect(() => {
    church.setGatheringId(currentUser.gatheringService)

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
    return (
      <Route
        component={withAuthenticationRequired(component, {
          // eslint-disable-next-line react/display-name
          onRedirecting: () => <LoadingScreen />,
        })}
        {...args}
      />
    )
  } else if (isAuthorised(['adminFederal', 'bishop'], currentUser.roles)) {
    //if the user does not have permission but is a Bishop's Admin
    return (
      <Route
        component={withAuthenticationRequired(GatheringServiceMembers, {
          // eslint-disable-next-line react/display-name
          onRedirecting: () => <LoadingScreen />,
        })}
        {...args}
      />
    )
  } else if (isAuthorised(['adminCouncil', 'bishop'], currentUser.roles)) {
    //if the user does not have permission but is a Bishop's Admin
    return (
      <Route
        component={withAuthenticationRequired(CouncilMembers, {
          // eslint-disable-next-line react/display-name
          onRedirecting: () => <LoadingScreen />,
        })}
        {...args}
      />
    )
  } else if (
    isAuthorised(['adminConstituency', 'leaderConstituency'], currentUser.roles)
  ) {
    //If the user does not have permission but is a CO or CO Admin
    church.setConstituencyId(currentUser.fellowship.bacenta.constituency.id)
    return <Route component={ConstituencyMembers} />
  } else if (isAuthorised(['leaderBacenta'], currentUser.roles)) {
    //If the user does not have permission but is a Bacenta Leader
    church.setBacentaId(currentUser.fellowship.bacenta.id)
    return <Route component={BacentaMembers} />
  } else if (isAuthorised(['leaderFellowship'], currentUser.roles)) {
    //If the user does not have permission but is a Fellowship Leader
    church.setFellowshipId(currentUser.fellowship.id)
    return <Route component={FellowshipMembers} />
  } else {
    return <FellowshipMembers />
  }
}

export default MembersDirectoryRoute
