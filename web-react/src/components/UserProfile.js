import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { AuthButton } from './DashboardButton'

function UserProfile() {
  const { user, isAuthenticated } = useAuth0()

  return (
    <div>
      {isAuthenticated && (
        <Link
          className="nav-item nav-link d-flex align-items-center flex-column p-0 pb-2"
          to="#"
        >
          <span>
            <img
              className="user-navbar-img "
              src={user ? user.picture : null}
              alt={user ? user.name : null}
            />
          </span>
          <span className="d-none d-md-inline">
            {user ? user.given_name : `Admin`}
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

export default UserProfile
