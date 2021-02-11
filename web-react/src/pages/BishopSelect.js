import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import { useHistory } from 'react-router-dom'
import { ChurchContext } from '../contexts/ChurchContext'
import { GET_BISHOPS } from '../queries/ListQueries'
import { AuthButton } from '../components/DashboardButton'
import { UserProfile } from './UserProfile'

const BishopSelect = () => {
  const { setChurch, setBishopID } = useContext(ChurchContext)
  const { data, error, loading } = useQuery(GET_BISHOPS)
  const history = useHistory()

  if (error) {
    return (
      <div className="container text-center mb-4">
        <h3>FLC Admin Dashboard</h3>
        <h5 className="text-secondary">Select Your Bishop</h5>
        <div className="container">
          <UserProfile />
          <p className="text-center">
            There seems to be an error loading data. Make sure you are logged in{' '}
          </p>
          <AuthButton />
        </div>
      </div>
    )
  } else if (loading) {
    return (
      <div className="container text-center mb-4">
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
        <div className="container text-center mb-4">
          <h3>FLC Admin Dashboard</h3>
          <h5 className="text-secondary">Select Your Bishop</h5>
        </div>
        <div className="row px-5">
          {data.bishopsList.map((soul, index) => {
            return (
              <div className="col" key={index}>
                <div
                  className="card grid-card mb-5"
                  onClick={() => {
                    if (soul.townBishop[0]) {
                      setChurch({ church: 'town', subChurch: 'centre' })
                    } else if (soul.campusBishop[0]) {
                      setChurch({ church: 'campus', subChurch: 'centre' })
                    }

                    setBishopID(soul.memberID)
                    history.push('/dashboard')
                  }}
                >
                  <img
                    className="card-img-top d-none d-sm-block image-card"
                    src={soul.pictureUrl}
                    alt=""
                  />
                  <p className="card-title text-center pt-2">
                    {soul.firstName + ' ' + soul.lastName}
                  </p>
                  <p className="text-center text-muted">
                    {soul.townBishop[0] ? 'Town' : 'Campus'}
                  </p>
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
