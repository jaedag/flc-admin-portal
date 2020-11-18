import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import { useHistory } from 'react-router-dom'
import { ApostleContext, ChurchContext } from '../context/ChurchContext'
import { GET_APOSTLES } from '../queries/ListQueries'
import SpinnerPage from '../components/SpinnerPage'

const ApostleSelect = () => {
  const { setApostleID } = useContext(ApostleContext)
  const { setChurch } = useContext(ChurchContext)
  const { data, error, loading } = useQuery(GET_APOSTLES)
  const history = useHistory()

  if (error) {
    return (
      <div>
        <div>Error loading data</div>
      </div>
    )
  } else if (loading) {
    return (
      <div>
        <SpinnerPage />
      </div>
    )
  } else {
    return (
      <React.Fragment>
        <div className="container text-center mb-4">
          <h1>Welcome to the FLC Admin Dashboard</h1>
          <h4>Please choose your apostle!</h4>
        </div>
        <div className="row px-5">
          {data.apostlesList.map((soul, index) => {
            return (
              <div className="col" key={index}>
                <div
                  className="card grid-card mb-5"
                  onClick={() => {
                    if (soul.town[0]) {
                      setChurch({ church: 'town', subChurch: 'community' })
                    } else if (soul.campus[0]) {
                      setChurch({ church: 'campus', subChurch: 'hall' })
                    }

                    setApostleID(soul.memberID)
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
                    {soul.town[0] ? 'Town' : 'Campus'}
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

export default ApostleSelect
