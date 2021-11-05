import React, { useContext, useEffect } from 'react'
import { Route } from 'react-router-dom'
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react'
import { UnauthMsg } from './UnauthMsg'
import { MemberContext } from '../contexts/MemberContext'
import { ChurchContext } from '../contexts/ChurchContext'
import BishopMembers from '../pages/grids/BishopMembers.jsx'
import CampusTownMembers from '../pages/grids/CampusTownMembers.jsx'
import LoadingScreen from '../components/base-component/LoadingScreen'
import { isAuthorised } from '../global-utils'
import BacentaMembers from 'pages/grids/BacentaMembers'
import CentreMembers from 'pages/grids/CentreMembers'

const MembersDirectoryRoute = ({ component, roles, ...args }) => {
  const { currentUser } = useContext(MemberContext)
  const { isAuthenticated } = useAuth0()
  const { setBishopId, setTownId, setCampusId, setChurch } = useContext(
    ChurchContext
  )

  useEffect(() => {
    if (isAuthenticated && !currentUser.roles.includes('adminFederal')) {
      //if User is not a federal admin
      setBishopId(currentUser.bishop)
      setChurch(currentUser.church)

      if (!currentUser.roles.includes('adminBishop')) {
        //User is not a Bishops Admin the he can only be looking at his constituency membership
        setTownId(currentUser.constituency)
        setCampusId(currentUser.constituency)
      }
    }
    // eslint-disable-next-line
  }, [currentUser, setBishopId, setTownId, setCampusId, setChurch])

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
  } else if (isAuthorised(['adminBishop', 'bishop'], currentUser.roles)) {
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
    return (
      <Route
        component={withAuthenticationRequired(CentreMembers, {
          // eslint-disable-next-line react/display-name
          onRedirecting: () => <LoadingScreen />,
        })}
        {...args}
      />
    )
  } else if (isAuthorised(['leaderBacenta'], currentUser.roles)) {
    //If the user does not have permission but is a Centre Leader
    return <Route component={BacentaMembers} />
  } else {
    return <UnauthMsg />
  }
}

export default MembersDirectoryRoute
