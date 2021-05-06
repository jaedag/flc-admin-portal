import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import { useHistory } from 'react-router-dom'
import { ChurchContext } from '../contexts/ChurchContext'
import { GET_BISHOPS } from '../queries/ListQueries'
import { NavBar } from '../components/nav/NavBar'
import Spinner from '../components/Spinner.jsx'
import Logo from '../img/flc-logo-small.png'
import { MemberContext } from '../contexts/MemberContext'

const BishopSelect = () => {
  const { determineStream } = useContext(ChurchContext)
  const { currentUser } = useContext(MemberContext)
  const { data, loading } = useQuery(GET_BISHOPS)

  const history = useHistory()
  const version = 'v0.1.9'

  if (loading) {
    return (
      <>
        <NavBar />
        <div className="container text-center my-5  d-none d-lg-block">
          <img
            src={Logo}
            alt="logo"
            className="img-fluid mx-auto"
            style={{ maxWidth: '30%' }}
          />
          <h3>
            FLC Admin Dashboard{' '}
            <sup>
              <small>{version}</small>
            </sup>
          </h3>
          <h5 className="text-secondary">Loading...</h5>
          <div className="spinner-border-center full-center" role="status">
            <Spinner />
            <div className="sr-only">Loading...</div>
          </div>
        </div>
        <div className="container d-lg-none">
          {/* <!--Mobile--> */}
          <div className="row d-flex align-items-center justify-content-center d-lg-none">
            <div className="col-12 col-lg-6">
              <img
                src={Logo}
                alt="logo"
                className="img-fluid mx-auto d-block d-lg-none"
                style={{ maxWidth: '30%' }}
              />
              <div className="text-center">
                <h3>FLC Admin Dashboard</h3>
                <h5 className="text-secondary mt-5">Loading...</h5>
                <div
                  className="spinner-border-center full-center mb-5"
                  role="status"
                >
                  <Spinner />
                  <div className="sr-only">Loading...</div>
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-6 d-flex justify-content-center my-3 ">
              <div className="d-lg-none flex-grow-1" />
            </div>
          </div>
        </div>
      </>
    )
  } else if (data) {
    return (
      <>
        <NavBar />
        <div className="container text-center my-3">
          <img
            src={Logo}
            alt="logo"
            className="img-fluid mx-auto"
            style={{ maxWidth: '30%' }}
          />

          <h3>
            FLC Admin Dashboard{' '}
            <sup>
              <small>{version}</small>
            </sup>
          </h3>
          <h4>{`Hi There ${currentUser.firstName}`}</h4>
          <h5 className="text-secondary">Select Your Bishop</h5>
        </div>
        <div className="row row-cols-sm-1 row-cols-lg-4 d-flex justify-content-center px-5">
          {data.bishopsList.map((soul, index) => {
            return (
              <div
                key={index}
                className="col-sm-12 col-lg card mobile-search-card p-2 m-1"
                onClick={() => {
                  determineStream(soul)
                  history.push('/dashboard')
                }}
              >
                <div className="media">
                  <img
                    className="mr-3 rounded-circle img-search"
                    src={soul.pictureUrl}
                    alt={`${soul.firstName} ${soul.lastName}`}
                  />
                  <div className="media-body">
                    <h5 className="mt-0">{`${soul.firstName} ${soul.lastName}`}</h5>
                    <div>
                      <span className="text-muted">
                        {soul.townBishop[0] ? 'Town' : 'Campus'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </>
    )
  } else {
    return (
      <div className="container body-container">
        {/* <!--Web Logo and text--> */}
        <div className="row d-flex align-items-center justify-content-center">
          <div className="col-12 col-lg-6 justify-content-center">
            {`There seems to be an issue with your login credentials. Please contact the system administrator for more details`}
            <div></div>
          </div>
        </div>
      </div>
    )
  }
}

export default BishopSelect
