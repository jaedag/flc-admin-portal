import React, { useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import Popup from '../Popup/Popup'

const AuthButton = (props) => {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0()
  const { mobileFullSize } = props
  const [isOpen, setIsOpen] = useState(false)
  const togglePopup = () => {
    setIsOpen(!isOpen)
  }

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
          <input
            type="button"
            className={`btn btn-primary text-nowrap px-4 ${
              !mobileFullSize && `d-none d-md-inline`
            }`}
            value="Logout"
            onClick={togglePopup}
          />
          {isOpen && (
            <Popup
              content={
                <>
                  <b>Confirm Log Out</b>
                  <p>Are you sure you want to Log Out?</p>
                  <button
                    className={`btn btn-primary text-nowrap px-4 ${
                      !mobileFullSize && `d-none d-md-inline`
                    }`}
                    onClick={() => logout({ returnTo: window.location.origin })}
                  >
                    Log Out
                  </button>
                </>
              }
              handleClose={togglePopup}
            />
          )}

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
