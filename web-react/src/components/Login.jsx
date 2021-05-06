import React from 'react'
import { AuthButton } from './buttons/DashboardButton'
import UserProfileIcon from './UserProfileIcon.jsx'
import Logo from '../img/flc-logo-small.png'

export const Login = () => {
  return (
    <>
      <div className="container body-container d-none d-lg-block">
        {/* <!--Web Logo and text--> */}
        <div className="row align-self-center">
          {/* <!--Sign In--> */}

          <form className="login-page-lg">
            <div className="m-5">
              <div className="col-auto my-3">
                <img src={Logo} alt="logo" className="img-fluid" />
                <div className="d-none d-lg-block">
                  First Love Church is a church full of young people on fire for
                  the Lord
                </div>
              </div>
              <UserProfileIcon />
            </div>
          </form>
        </div>
      </div>

      {/* <!--Mobile--> */}
      <div className="row d-flex align-items-center justify-content-center d-lg-none">
        <div className="col-12 col-lg-6">
          <img
            src={Logo}
            alt="logo"
            className="img-fluid mx-auto d-block d-lg-none"
            style={{ maxWidth: '30%' }}
          />
          <div className="d-lg-none h2 text-center text-white">FLC Admin</div>
          <div className="col-auto my-3 align-items-center text-center">
            First Love Church is a church full of young people on fire for the
            Lord!
          </div>
          <div className="col-auto text-center">
            <AuthButton mobileFullSize="true" />
          </div>
        </div>

        <div className="col-12 col-lg-6 d-flex justify-content-center my-3 ">
          <div className="d-lg-none flex-grow-1" />
        </div>
      </div>
    </>
  )
}
