import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import { useHistory } from 'react-router-dom'
import { ChurchContext } from '../contexts/ChurchContext'
import { GET_BISHOPS } from '../queries/ListQueries'

import { NavBar } from '../components/NavBar'
import { AuthButton } from '../components/DashboardButton'
import Logo from '../img/flc-logo-small.png'

const BishopSelect = () => {
  const { setChurch, setBishopID } = useContext(ChurchContext)
  const { data, error, loading } = useQuery(GET_BISHOPS)
  const history = useHistory()

  if (error) {
    return (
      <div className="container text-center my-5">
        <img
          src={Logo}
          alt="logo"
          className="img-fluid mx-auto d-block d-lg-none"
          style={{ maxWidth: '30%' }}
        />
        <h3>FLC Admin Dashboard</h3>
        <div className="container">
          <p className="text-center">
            There seems to be an error loading data. Make sure you are logged in{' '}
          </p>
          <AuthButton />
        </div>
      </div>
    )
  } else if (loading) {
    return (
      <div className="container text-center my-5">
        <img
          src={Logo}
          alt="logo"
          className="img-fluid mx-auto d-block d-lg-none"
          style={{ maxWidth: '30%' }}
        />
        <h3>FLC Admin Dashboard</h3>
        <h5 className="text-secondary">Select Your Bishop</h5>
        <div className="body-container full-body-center">
          <div className="row h-75">
            <div className="col my-auto">
              <div className="spinner-border-center full-center" role="status">
                <div className="sr-only">Loading...</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <React.Fragment>
        <NavBar />
        <div className="container text-center my-3">
          <img
            src={Logo}
            alt="logo"
            className="img-fluid mx-auto"
            style={{ maxWidth: '30%' }}
          />
          <h3>FLC Admin Dashboard</h3>
          <h5 className="text-secondary">Select Your Bishop</h5>
        </div>
        <div className="row row-cols-sm-1 row-cols-lg-4 d-flex justify-content-center px-5">
          {data.bishopsList.map((soul, index) => {
            return (
              <div
                key={index}
                className="col-sm-12 col-lg card mobile-search-card p-2 m-1"
                onClick={() => {
                  if (soul.townBishop[0]) {
                    setChurch({ church: 'town', subChurch: 'centre' })
                  } else if (soul.campusBishop[0]) {
                    setChurch({ church: 'campus', subChurch: 'centre' })
                  }

                  setBishopID(soul.id)
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
      </React.Fragment>
    )
  }
}

export default BishopSelect
