import React from 'react'
import AuthButton from './buttons/AuthButton'
import UserProfileIcon from './UserProfileIcon/UserProfileIcon'
import Logo from '../assets/flc-logo-small.png'
import MobileView from './responsive-design/MobileView'
import TabletDesktopView from './responsive-design/TabletDesktopView'
import { Container } from 'react-bootstrap'

const Login = () => {
  return (
    <>
      <TabletDesktopView>
        <div className="container  ">
          {/* <!--Web Logo and text--> */}
          <div className="row align-self-center">
            {/* <!--Sign In--> */}

            <form className="login-page-lg">
              <div className="m-5">
                <div className="col-auto my-3">
                  <img src={Logo} alt="logo" className="img-fluid" />{' '}
                  <div className="">
                    First Love Church is a church full of young people on fire
                    for the Lord
                  </div>
                </div>
                <UserProfileIcon />
              </div>
            </form>
          </div>
        </div>
      </TabletDesktopView>

      {/* <!--Mobile--> */}
      <MobileView>
        <Container className="text-center">
          <div className="col-12 col-lg-6">
            <img
              src={Logo}
              alt="logo"
              className="img-fluid mx-auto d-block "
              style={{ maxWidth: '30%' }}
            />

            <h2 className="font-weight-bold">First Love Church</h2>

            <div className="col-auto my-3 align-items-center text-center">
              Please log in to your first love servants portal
            </div>
            <div className="col-auto text-center">
              <AuthButton mobileFullSize="true" />
            </div>
          </div>

          <div className="col-12 col-lg-6 d-flex justify-content-center my-3 ">
            <div className=" flex-grow-1" />
          </div>
        </Container>
      </MobileView>
    </>
  )
}

export default Login
