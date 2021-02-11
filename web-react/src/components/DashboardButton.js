import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'

export const DashboardButton = (props) => {
  return (
    <div className="col">
      <Link to={`${props.btnLink}`}>
        <button className="btn btn-primary btn-block text-nowrap px-4">
          {props.btnText}
        </button>
      </Link>
    </div>
  )
}

export const AuthButton = () => {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0()

  return (
    <div>
      {!isAuthenticated && (
        <button
          className="btn btn-primary text-nowrap px-4"
          onClick={() => loginWithRedirect()}
        >
          Log In
        </button>
      )}
      {isAuthenticated && (
        <button
          className="btn btn-primary text-nowrap px-4"
          onClick={() => logout({ returnTo: window.location.origin })}
        >
          Log Out
        </button>
      )}
    </div>
  )
}
