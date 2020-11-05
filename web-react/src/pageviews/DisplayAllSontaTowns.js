import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'
// import { DisplayChurchList } from '../components/DisplayChurchList'
import { NavBar } from '../components/NavBar'
import SpinnerPage from '../components/SpinnerPage'
import { GET_SONTA_TOWNS } from '../queries/ListQueries'
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
  } = useQuery(GET_SONTA_TOWNS, {
    variables: { apostleID: apostleID, ministryID: ministryID },
  })

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
          {sontaData.sontaTownList.map((ministry, index) => {
            console.log(ministry)
            return (
              <React.Fragment key={index}>
                <h4>{`${ministry.sontas[0].ministry.name} Sontas`}</h4>
                <Link
                  to="/members/displaydetails"
                  onClick={() => {
                    setMemberID(`${ministry.sontas[0].leader.memberID}`)
                  }}
                >
                  <h6 className="text-muted">
                    Leader:
                    {`${ministry.sontas[0].leader.firstName} 
										${ministry.sontas[0].leader.lastName}`}
                  </h6>
                </Link>
                {ministry.sontas.map((sonta) => {
                  console.log(sonta)
                  return null
                })}
              </React.Fragment>
            )
          })}
        </div>
        {/* <DisplayChurchList data={sontaData.sontaTownList} setter={setSontaID} churchType="Sonta" /> */}
      </div>
    </div>
  )
}
