import React, { useContext, useEffect } from 'react'
import { Route } from 'react-router-dom'
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react'
import { MemberContext } from '../../contexts/MemberContext'
import { ChurchContext } from '../../contexts/ChurchContext'
import BishopMembers from '../grids/BishopMembers.jsx'
import CampusTownMembers from '../grids/CampusTownMembers.jsx'
import LoadingScreen from '../../components/base-component/LoadingScreen'
import { isAuthorised } from '../../global-utils'
import BacentaMembers from 'pages/grids/BacentaMembers'
import CentreMembers from 'pages/grids/CentreMembers'

const MembersDirectoryRoute = ({ component, roles, ...args }) => {
  const { currentUser } = useContext(MemberContext)
  const { isAuthenticated } = useAuth0()
  const church = useContext(ChurchContext)

  useEffect(() => {
    if (isAuthenticated && !currentUser.roles.includes('adminFederal')) {
      //if User is not a federal admin
      church.setBishopId(currentUser.bishop)
      church.setChurch(currentUser.church)

      if (!currentUser.roles.includes('adminCouncil')) {
        //User is not a Bishops Admin the he can only be looking at his constituency membership
        church.setTownId(currentUser.constituency)
        church.setCampusId(currentUser.constituency)
      }

      if (currentUser.roles.includes('leaderBacenta')) {
        //User is not a Bishops Admin the he can only be looking at his constituency membership
        church.setBacentaId(currentUser.bacenta.id)
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
    return (
      <Route
        component={withAuthenticationRequired(component, {
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
        component={withAuthenticationRequired(BishopMembers, {
          // eslint-disable-next-line react/display-name
          onRedirecting: () => <LoadingScreen />,
        })}
        {...args}
      />
    )
  } else if (isAuthorised(['adminCampus', 'leaderCampus'], currentUser.roles)) {
    //If the user does not have permission but is a CO or CO Admin
    church.setCampusId(currentUser.bacenta.centre.campus.id)
    return <Route component={CampusTownMembers} />
  } else if (isAuthorised(['adminTown', 'leaderTown'], currentUser.roles)) {
    //If the user does not have permission but is a CO or CO Admin
    church.setTownId(currentUser.bacenta.centre.town.id)
    return <Route component={CampusTownMembers} />
  } else if (isAuthorised(['leaderCentre'], currentUser.roles)) {
    //If the user does not have permission but is a Centre Leader
    church.setCentreId(currentUser.bacenta.centre.id)
    return <Route component={CentreMembers} />
  } else if (isAuthorised(['leaderBacenta'], currentUser.roles)) {
    //If the user does not have permission but is a Bacenta Leader
    church.setBacentaId(currentUser.bacenta.id)
    return <Route component={BacentaMembers} />
  } else {
    return <BacentaMembers />
  }
}

export default MembersDirectoryRoute
