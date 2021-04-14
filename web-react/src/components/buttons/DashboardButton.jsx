import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'

export const DashboardButton = (props) => {
  return (
    <Link to={`${props.btnLink}`}>
      <button className="btn btn-primary btn-block text-nowrap px-4">
        {props.btnText}
      </button>
    </Link>
  )
}

export const AuthButton = () => {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0()

  return (
    <div>
      {!isAuthenticated && (
        <>
          <button
            className="btn btn-primary text-nowrap px-4 d-none d-md-inline"
            onClick={() => loginWithRedirect()}
          >
            Log In
          </button>
          <i
            className="fas fa-sign-in-alt fa-2x d-md-none"
            onClick={() => loginWithRedirect()}
          />
        </>
      )}
      {isAuthenticated && (
        <>
          <button
            className="btn btn-primary text-nowrap px-4 d-none d-md-inline"
            onClick={() => logout({ returnTo: window.location.origin })}
          >
            Log Out
          </button>
          <i
            className="fas fa-sign-out-alt fa-2x d-md-none"
            onClick={() => logout({ returnTo: window.location.origin })}
          />
        </>
      )}
    </div>
  )
}
