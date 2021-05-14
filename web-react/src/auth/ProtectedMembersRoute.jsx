import React, { useContext, useEffect } from 'react'
import { Route } from 'react-router-dom'
import { withAuthenticationRequired } from '@auth0/auth0-react'
import { UnauthMsg } from './UnauthMsg'
import { MemberContext } from '../contexts/MemberContext'
import { ChurchContext } from '../contexts/ChurchContext'
import BishopMembers from '../pages/grids/BishopMembers.jsx'
import CampusTownMembers from '../pages/grids/CampusTownMembers.jsx'
import LoadingScreen from '../components/LoadingScreen'
import { isAuthorised } from '../global-utils'

const ProtectedMembersRoute = ({ component, roles, ...args }) => {
  const { currentUser } = useContext(MemberContext)
  const { setBishopId, setTownId, setCampusId, setChurch } = useContext(
    ChurchContext
  )

  useEffect(() => {
    if (!currentUser.roles.includes('federalAdmin')) {
      setBishopId(currentUser.bishop)
      setChurch(currentUser.church)
      setTownId(currentUser.constituency)
      setCampusId(currentUser.constituency)
    }
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
  } else if (currentUser.roles.includes('bishopAdmin')) {
    //if the user does not have permission but is a Bishop's Admin

    return <BishopMembers />
  } else if (currentUser.roles.includes('constituencyAdmin')) {
    //If the user does not have permission but is a CO Admin

    return <CampusTownMembers />
  } else {
    return <UnauthMsg />
  }
}

export default ProtectedMembersRoute
