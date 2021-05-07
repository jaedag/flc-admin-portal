import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'

const AuthButton = (props) => {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0()
  const { mobileFullSize } = props

  return (
    <>
      {!isAuthenticated && (
        <>
          <button
            className={`btn btn-primary text-nowrap px-4 ${
              !mobileFullSize && `d-none d-md-inline`
            }`}
            onClick={() => loginWithRedirect()}
          >
            Log In
          </button>
          {!mobileFullSize && (
            <i
              className="fas fa-sign-in-alt fa-2x d-md-none"
              onClick={() => loginWithRedirect()}
            />
          )}
        </>
      )}
      {isAuthenticated && (
        <>
          <button
            className={`btn btn-primary text-nowrap px-4 ${
              !mobileFullSize && `d-none d-md-inline`
            }`}
            onClick={() => logout({ returnTo: window.location.origin })}
          >
            Log Out
          </button>
          {!mobileFullSize && (
            <i
              className="fas fa-sign-out-alt fa-2x d-md-none"
              onClick={() => logout({ returnTo: window.location.origin })}
            />
          )}
        </>
      )}
    </>
  )
}

export default AuthButton
