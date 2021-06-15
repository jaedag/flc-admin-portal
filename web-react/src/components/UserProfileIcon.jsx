import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { useLazyQuery } from '@apollo/client'
import AuthButton from './buttons/AuthButton'
import './UserProfileIcon.css'
import { GET_LOGGED_IN_USER } from '../queries/SearchQuery'
import { MemberContext } from '../contexts/MemberContext.js'
import userIcon from '../img/user.png'

function UserProfileIcon() {
  const { user, isAuthenticated } = useAuth0()
  const { currentUser, setCurrentUser } = useContext(MemberContext)
  const [memberByEmail] = useLazyQuery(GET_LOGGED_IN_USER, {
    onCompleted: (data) => {
      const isTown = data.members[0].bacenta.centre?.town

      setCurrentUser({
        ...currentUser,
        id: data.members[0].id,
        firstName: data.members[0].firstName,
        lastName: data.members[0].lastName,
        picture: data.members[0]?.pictureUrl ?? null,
        bishop: isTown
          ? data.members[0]?.bacenta?.centre?.town.bishop.id
          : data.members[0]?.bacenta?.centre?.campus.bishop.id,
        constituency: isTown
          ? data.members[0]?.bacenta?.centre?.town.id
          : data.members[0]?.bacenta?.centre?.campus.id,
        church: isTown
          ? { church: 'town', subChurch: 'centre' }
          : { church: 'campus', subChurch: 'centre' },
        email: user?.email,
        roles: user ? user[`https://flcadmin.netlify.app/roles`] : [],
      })
    },
  })

  useEffect(() => {
    if (!currentUser?.email?.length) {
      user && memberByEmail({ variables: { email: user.email } })
    }

    // eslint-disable-next-line
  }, [isAuthenticated])

  return (
    <>
      {isAuthenticated && currentUser.email && (
        <Link
          className="nav-item nav-link d-flex align-items-center flex-column p-0 pb-2"
          to="/user-profile"
        >
          <span>
            <img
              className="user-navbar-img "
              src={currentUser?.picture ? currentUser.picture : userIcon}
              alt={currentUser ? currentUser.firstName : null}
            />
          </span>
          <span className="d-none d-md-inline">
            {currentUser ? currentUser.firstName : `Admin`}
          </span>
        </Link>
      )}
      {isAuthenticated && !currentUser.email && (
        <div className="text-secondary text-center">
          {`There seems to be an issue with your login credentials. Please contact the system administrator for more details`}
        </div>
      )}
      {!isAuthenticated && (
        <div className="nav-item nav-link d-flex align-items-center flex-column">
          <AuthButton />
        </div>
      )}
    </>
  )
}

export default UserProfileIcon
