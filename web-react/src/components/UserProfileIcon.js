import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { useLazyQuery } from '@apollo/client'
import { AuthButton } from './buttons/DashboardButton.jsx'
import './UserProfileIcon.css'
import { GET_LOGGED_IN_USER } from '../queries/SearchQuery'
import { MemberContext } from '../contexts/MemberContext.js'

function UserProfileIcon() {
  const { user, isAuthenticated } = useAuth0()
  const { currentUser, setCurrentUser } = useContext(MemberContext)
  const [memberByEmail] = useLazyQuery(GET_LOGGED_IN_USER, {
    onCompleted: (data) => {
      // determineChurch(data?.memberByEmail)
      setCurrentUser({
        ...currentUser,
        id: data.memberByEmail.id,
        picture: data.memberByEmail.pictureUrl,
        firstName: data.memberByEmail.firstName,
        lastName: data.memberByEmail.lastName,
        constituency: data.memberByEmail.bacenta.centre?.town
          ? data.memberByEmail.bacenta.centre?.town.id
          : data.memberByEmail.bacenta.centre?.campus.id,
      })
    },
  })

  useEffect(() => {
    user &&
      memberByEmail({
        variables: {
          email: user.email,
        },
      })
    setCurrentUser({
      ...currentUser,
      email: user?.email,
      roles: user ? user[`https://flcadmin.netlify.app/roles`] : [],
    })
    // eslint-disable-next-line
  }, [isAuthenticated])

  return (
    <div>
      {isAuthenticated && (
        <Link
          className="nav-item nav-link d-flex align-items-center flex-column p-0 pb-2"
          to="/user-profile"
          // onClick={() => logout({ returnTo: window.location.origin })}
        >
          <span>
            <img
              className="user-navbar-img "
              src={currentUser ? currentUser.picture : null}
              alt={currentUser ? currentUser.firstName : null}
            />
          </span>
          <span className="d-none d-md-inline">
            {currentUser ? currentUser.firstName : `Admin`}
          </span>
        </Link>
      )}
      {!isAuthenticated && (
        <div className="nav-item nav-link d-flex align-items-center flex-column">
          <AuthButton />
        </div>
      )}
    </div>
  )
}

export default UserProfileIcon
