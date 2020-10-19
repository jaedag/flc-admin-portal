import React from 'react'

export const Login = () => {
  return (
    <>
      <div className="container body-container d-none d-lg-block">
        {/* <!--Web-->
      /* <!--Logo and text--> */}
        <div className="row align-self-center">
          <div className="col-6 align-items-center">
            <img
              src="https://admin-firstlovecenter.imfast.io/images/flc-logo-small.png"
              className="img-fluid"
            />
            <div className="d-none d-lg-block">
              First Love Church is a church full of young people on fire for the
              Lord
            </div>
          </div>

          {/* <!--Sign In--> */}
          <div className="col-6 d-flex justify-content-center">
            <form className="login-page-lg">
              <div className="m-5">
                <input
                  type="text"
                  placeholder="username"
                  className="form-control my-2 text-white"
                  required
                  autoFocus
                />
                <input
                  type="password"
                  placeholder="password"
                  className="form-control my-2"
                  required
                  autoFocus
                />
                <button className="btn-primary btn-block my-3 p-2 rounded-lg">
                  Log In
                </button>
                <div className="d-flex justify-content-center my-2">
                  <small className="text-muted" href="#">
                    Forgotten password?
                  </small>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="container d-lg-none">
        {/* <!--Mobile--> */}
        <div className="row d-flex align-items-center justify-content-center d-lg-none">
          <div className="col-12 col-lg-6">
            <img
              src="https://admin-firstlovecenter.imfast.io/images/flc-logo-small.png"
              className="img-fluid mx-auto d-block d-lg-none"
              style={{ maxWidth: '30%' }}
            />
            <div className="d-lg-none h2 text-center text-white">
              Database App
            </div>
          </div>

          <div className="col-12 col-lg-6 d-flex justify-content-center my-3 ">
            <div className="d-lg-none flex-grow-1">
              <form>
                <div className="m-2">
                  <input
                    type="text"
                    placeholder="username"
                    className="form-control rounded-lg my-2 text-box"
                    required
                    autoFocus
                  />
                  <input
                    type="password"
                    placeholder="password"
                    className="form-control rounded-lg my-2 text-box"
                    required
                    autoFocus
                  />
                  <button className="btn-primary btn-block my-3 p-2 rounded-lg">
                    Log In
                  </button>
                  <div className="d-flex justify-content-center my-2 rounded-lg">
                    <small className="text-muted" href="#">
                      Forgotten password?
                    </small>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
