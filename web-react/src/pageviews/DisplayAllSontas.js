import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'
// import { DisplayChurchList } from '../components/DisplayChurchList'
import { NavBar } from '../components/NavBar'
import { ErrorScreen, LoadingScreen } from '../components/StatusScreens'
import {
  ApostleContext,
  SontaContext,
  ChurchContext,
} from '../context/ChurchContext'
// import { MemberContext } from '../context/MemberContext'
import { GET_TOWNS, GET_CAMPUSES } from '../queries/ListQueries'

export const DisplayAllSontas = () => {
  // Display Ministries per Town
  const { apostleID } = useContext(ApostleContext)
  const { church } = useContext(ChurchContext)
  const { setSontaID } = useContext(SontaContext)

  const { data: townData, error: townError, loading: townLoading } = useQuery(
    GET_TOWNS,
    {
      variables: { apostleID: apostleID },
    }
  )
  const {
    data: campusData,
    error: campusError,
    loading: campusLoading,
  } = useQuery(GET_CAMPUSES, {
    variables: { apostleID: apostleID },
  })

  if (townError || campusError) {
    return <ErrorScreen />
  } else if (townLoading || campusLoading) {
    // Spinner Icon for Loading Screens
    return <LoadingScreen />
  } else if (church.church === 'town') {
    return (
      <div>
        <NavBar />
        <div className="body-container container">
          <div className="my-5">
            <h3 className="text-center">{`${townData.townList[0].apostle.firstName} ${townData.townList[0].apostle.lastName}'s Towns and Ministries`}</h3>
            {townData.townList.map((town, index) => {
              return (
                <React.Fragment key={index}>
                  <h4>{`${town.name}`}</h4>
                  <div className="row row-cols-1 row-cols-md-6 my-4">
                    {town.sontas.map((sonta, i) => {
                      return (
                        <div key={i} className="col col-sm-12 col-md-4 mb-2">
                          <Link
                            to="/sonta/displaydetails"
                            className="card"
                            onClick={() => {
                              setSontaID(sonta.sontaID)
                            }}
                          >
                            <p className="card-body text-center">
                              {sonta.name}
                            </p>
                          </Link>
                        </div>
                      )
                    })}
                  </div>
                </React.Fragment>
              )
            })}
          </div>
          {/* <DisplayChurchList data={sontaData.townSontaLeader} setter={setSontaID} churchType="Sonta" /> */}
        </div>
      </div>
    )
  } else if (church.church === 'campus') {
    return (
      <div>
        <NavBar />
        <div className="body-container container">
          <div className="my-5">
            <h3 className="text-center">{`${campusData.campusList[0].apostle.firstName} ${campusData.campusList[0].apostle.lastName}'s Campuses and Ministries`}</h3>
            {campusData.campusList.map((campus, index) => {
              return (
                <React.Fragment key={index}>
                  <h4>{`${campus.name}`}</h4>
                  <div className="row row-cols-1 row-cols-md-6 my-4">
                    {campus.sontas.map((sonta, i) => {
                      return (
                        <div key={i} className="col col-sm-12 col-md-4 mb-2">
                          <Link
                            to="/sonta/displaydetails"
                            className="card"
                            onClick={() => {
                              setSontaID(sonta.sontaID)
                            }}
                          >
                            <p className="card-body text-center">
                              {sonta.name}
                            </p>
                          </Link>
                        </div>
                      )
                    })}
                  </div>
                </React.Fragment>
              )
            })}
          </div>
          {/* <DisplayChurchList data={sontaData.campusesontaLeader} setter={setSontaID} churchType="Sonta" /> */}
        </div>
      </div>
    )
  }
}
