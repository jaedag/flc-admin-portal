import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { DisplayChurchList } from '../components/DisplayChurchList'
import { NavBar } from '../components/NavBar'
import { ErrorScreen, LoadingScreen } from '../components/StatusScreens'
import { GET_SONTAS_BY_CAMPUSTOWN } from '../queries/ListQueries'
import { ChurchContext } from '../contexts/ChurchContext'

export const DisplaySontasByCampusTown = () => {
  const {
    capitalise,
    church,
    campusID,
    townID,
    bishopID,
    setTownID,
    setCampusID,
    setSontaID,
  } = useContext(ChurchContext)

  const { data: sontaData, loading: sontaLoading } = useQuery(
    GET_SONTAS_BY_CAMPUSTOWN,
    {
      variables: { id: bishopID },
    }
  )

  const campusCentreData = 0
  const townCentreData = 0

  if (sontaLoading) {
    // Spinner Icon for Loading Screens
    return <LoadingScreen />
  } else if (sontaData && church.church === 'campus') {
    console.log(sontaData)
    return (
      <div>
        <NavBar />
        <div className="body-container container">
          <div className="mb-4 border-bottom">
            <div className="row justify-content-between">
              <div className="col-auto">
                <Link
                  to={`/${church.church}/displaydetails`}
                  onClick={() => {
                    setCampusID(campusID)
                  }}
                >
                  {' '}
                  <h4>{`${sontaData.campusList[0].bishop.firstName} ${sontaData.campusList[0].bishop.lastName}'s Sontas`}</h4>
                </Link>
              </div>
              <div className="col-auto">
                <Link
                  to="/centre/addcentre"
                  className="btn btn-primary text-nowrap"
                >
                  Add Centre
                </Link>
              </div>
            </div>

            <div className="row justify-content-between">
              <Link
                className="py-1 px-2 m-2 card"
                to="/centre/displayall"
              >{`Towns: ${sontaData.campusList.length}`}</Link>
              {/* <div className="py-1 px-2 m-2 card">{`Sontas: ${sontaData.campusSontaList
								.length}`}</div> */}
              <div className="py-1 px-2 m-2 card">{`Membership:${campusCentreData.campusMemberCount}`}</div>
            </div>
          </div>

          {sontaData.campusList.map((campus, index) => {
            return (
              <div key={index}>
                <h4>{campus.name}</h4>
                <DisplayChurchList
                  data={campus.sontas}
                  setter={setSontaID}
                  churchType="Sonta"
                />
              </div>
            )
          })}
        </div>
      </div>
    )
  } else if (sontaData && church.church === 'town') {
    console.log(sontaData)
    return (
      <div>
        <NavBar />
        <div className="body-container container">
          <div className="mb-4 border-bottom">
            <div className="row justify-content-between">
              <div className="col-auto">
                <Link
                  to={`/${church.church}/displaydetails`}
                  onClick={() => {
                    setTownID(townID)
                  }}
                >
                  {' '}
                  <h4>{`${
                    townCentreData.townCentreList[0].town.name
                  } ${capitalise(church.church)}`}</h4>
                </Link>
              </div>
              <div className="col-auto">
                <Link
                  to="/centre/addcentre"
                  className="btn btn-primary text-nowrap"
                >
                  Add Centre
                </Link>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <h6 className="text-muted">
                  Constituency Overseer:
                  {townCentreData.townCentreList[0].town.leader
                    ? ` ${townCentreData.townCentreList[0].town.leader.firstName} ${townCentreData.townCentreList[0].town.leader.lastName}`
                    : null}
                </h6>
              </div>
            </div>

            <div className="row justify-content-between">
              <Link
                className="py-1 px-2 m-2 card text-white"
                to="/centre/displayall"
              >{`Centres: ${townCentreData.townCentreList.length}`}</Link>
              <div className="py-1 px-2 m-2 card">{`Sontas: ${townCentreData.townSontaList.length}`}</div>
              <div className="py-1 px-2 m-2 card">{`Membership: ${townCentreData.townMemberCount}`}</div>
            </div>
          </div>

          <DisplayChurchList
            data={townCentreData.townSontaList}
            setter={setSontaID}
            churchType="Sonta"
          />
        </div>
      </div>
    )
  } else {
    return <ErrorScreen />
  }
}
