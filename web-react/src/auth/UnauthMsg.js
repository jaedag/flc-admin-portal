import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { AuthButton } from '../components/buttons/DashboardButton'
import { NavBar } from '../components/nav/NavBar'
import { Login } from '../pages/Login'

export const UnauthMsg = () => {
  const history = useHistory()
  const location = useLocation()
  const atHome = location.pathname === '/'

  if (atHome) {
    return (
      <>
        <NavBar />
        <Login />
      </>
    )
  } else {
    return (
      <React.Fragment>
        <NavBar />
        <div className="container body-container">
          {/* <!--Web Logo and text--> */}
          <div className="row d-flex align-items-center justify-content-center">
            <div className="col-12 col-lg-6 justify-content-center">
              {`Heya! Looks like you're trying to view some information that is not
            meant for you. Please contact the system administrator for more
            information`}
              <div>
                {' '}
                <button
                  className="btn-primary"
                  onClick={() => {
                    history.goBack()
                  }}
                >
                  Click Here To Go Back
                </button>
                <AuthButton />
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}
