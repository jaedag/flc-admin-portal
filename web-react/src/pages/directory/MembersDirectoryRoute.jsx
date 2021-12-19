import React, { useContext, useEffect } from 'react'
import { Route } from 'react-router-dom'
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react'
import { MemberContext } from '../../contexts/MemberContext'
import { ChurchContext } from '../../contexts/ChurchContext'
import CouncilMembers from '../grids/CouncilMembers.jsx'
import CampusTownMembers from '../grids/CampusTownMembers.jsx'
import LoadingScreen from '../../components/base-component/LoadingScreen'
import { isAuthorised } from '../../global-utils'
import FellowshipMembers from 'pages/grids/FellowshipMembers'
import BacentaMembers from 'pages/grids/BacentaMembers'
import GatheringServiceMembers from 'pages/grids/GatheringServiceMembers'

const MembersDirectoryRoute = ({ component, roles, ...args }) => {
  const { currentUser } = useContext(MemberContext)
  const { isAuthenticated } = useAuth0()
  const church = useContext(ChurchContext)

  useEffect(() => {
    church.setGatheringId(currentUser.gatheringService)
    if (isAuthenticated && !currentUser.roles.includes('adminFederal')) {
      //if User is not a federal admin
      church.setCouncilId(currentUser.council)
      church.setChurch(currentUser.church)

      if (!currentUser.roles.includes('adminCouncil')) {
        //User is not a Bishops Admin the he can only be looking at his constituency membership
        church.setTownId(currentUser.constituency)
        church.setCampusId(currentUser.constituency)
      }

      if (currentUser.roles.includes('leaderFellowship')) {
        //User is not a Bishops Admin the he can only be looking at his constituency membership
        church.setFellowshipId(currentUser.fellowship.id)
      }
    }
    // eslint-disable-next-line
  }, [
    currentUser,
    church.setCouncilId,
    church.setTownId,
    church.setCampusId,
    church.setChurch,
  ])

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
  } else if (isAuthorised(['adminCampus', 'leaderCampus'], currentUser.roles)) {
    //If the user does not have permission but is a CO or CO Admin
    church.setCampusId(currentUser.fellowship.bacenta.campus.id)
    return <Route component={CampusTownMembers} />
  } else if (isAuthorised(['adminTown', 'leaderTown'], currentUser.roles)) {
    //If the user does not have permission but is a CO or CO Admin
    church.setTownId(currentUser.fellowship.bacenta.town.id)
    return <Route component={CampusTownMembers} />
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
