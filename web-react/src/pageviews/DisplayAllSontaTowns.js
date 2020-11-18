import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'
// import { DisplayChurchList } from '../components/DisplayChurchList'
import { NavBar } from '../components/NavBar'
import SpinnerPage from '../components/SpinnerPage'
import { GET_TOWN_SONTA_LEADERS } from '../queries/ListQueries'
import { ApostleContext, SontaContext } from '../context/ChurchContext'
import { MemberContext } from '../context/MemberContext'

export const DisplayAllSontaTowns = () => {
  // Display Ministries per Town
  const { apostleID } = useContext(ApostleContext)
  const {
    ministryID,
    // , setSontaID
  } = useContext(SontaContext)
  const { setMemberID } = useContext(MemberContext)

  const {
    data: sontaData,
    error: sontaError,
    loading: sontaLoading,
  } = useQuery(GET_TOWN_SONTA_LEADERS, {
    variables: { ministryID: ministryID, apostleID: apostleID },
  })
  // console.log(sontaData)

  if (sontaError) {
    return (
      <React.Fragment>
        <NavBar />
        <div className="container full-body-center">
          <p className="text-center full-center">
            There seems to be an error loading data
          </p>
        </div>
      </React.Fragment>
    )
  } else if (sontaLoading) {
    // Spinner Icon for Loading Screens
    return (
      <React.Fragment>
        <NavBar />
        <SpinnerPage />
      </React.Fragment>
    )
  }

  return (
    <div>
      <NavBar />
      <div className="body-container container">
        <div className="my-5">
          {sontaData.townSontaLeader.map((leader, index) => {
            console.log(leader)
            return (
              <React.Fragment key={index}>
                <h4>{`${leader.sonta.name}`}</h4>
                <Link
                  to="/members/displaydetails"
                  onClick={() => {
                    setMemberID(`${leader.memberID}`)
                  }}
                />
                {sontaData.townSontaLeader.map((leader, index) => {
                  return (
                    <React.Fragment key={index}>
                      <div className="card p-2 m-2">
                        {leader.leadsSonta[0].town.name}
                        <h6 className="text-muted">
                          Leader:
                          {`${leader.firstName} ${leader.lastName}`}
                        </h6>
                      </div>
                    </React.Fragment>
                  )
                })}
              </React.Fragment>
            )
          })}
        </div>
        {/* <DisplayChurchList data={sontaData.townSontaLeader} setter={setSontaID} churchType="Sonta" /> */}
      </div>
    </div>
  )
}
