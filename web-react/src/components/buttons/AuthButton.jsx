import React, { useContext } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import Popup from '../Popup/Popup'
import { ChurchContext } from 'contexts/ChurchContext'
import { Button, Spinner } from 'react-bootstrap'
import { useLocation } from 'react-router'

const AuthButton = (props) => {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0()
  const { togglePopup, isOpen } = useContext(ChurchContext)
  const { mobileFullSize } = props
  const location = useLocation()

  if (!isAuthenticated) {
    return (
      <>
        <Button
          className={`${!mobileFullSize && `d-none d-md-inline`} px-5 p-3`}
          onClick={() => loginWithRedirect()}
        >
          Log In
        </Button>
        {!mobileFullSize && (
          <i
            className="fas fa-sign-in-alt fa-2x d-md-none"
            onClick={() => loginWithRedirect()}
          />
        )}
      </>
    )
  }

  if (isAuthenticated && location.pathname === '/') {
    return (
      <div className="text-secondary text-center">
        <p>Please wait while we log you in</p>
        <Spinner animation="grow" />
      </div>
    )
  }

  if (isAuthenticated) {
    return (
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
          <Popup handleClose={togglePopup}>
            <>
              <b>Confirm Log Out</b>
              <p>Are you sure you want to Log Out?</p>
              <button
                className={`btn btn-primary text-nowrap px-4 ${
                  !mobileFullSize && `d-none d-md-inline`
                }`}
                onClick={() => {
                  logout({ returnTo: window.location.origin })
                  togglePopup()
                }}
              >
                Log Out
              </button>
            </>
          </Popup>
        )}

        {!mobileFullSize && (
          <i
            className="fas fa-sign-out-alt fa-2x d-md-none"
            onClick={() => logout({ returnTo: window.location.origin })}
          />
        )}
      </>
    )
  }
}

export default AuthButton
