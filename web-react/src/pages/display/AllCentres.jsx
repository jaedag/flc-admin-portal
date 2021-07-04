import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { capitalise } from '../../global-utils'
import DisplayChurchList from '../../components/DisplayChurchList'
import NavBar from '../../components/nav/NavBar'
import ErrorScreen from '../../components/ErrorScreen'
import LoadingScreen from '../../components/LoadingScreen'
import { GET_CAMPUS_CENTRES, GET_TOWN_CENTRES } from '../../queries/ListQueries'
import { ChurchContext } from '../../contexts/ChurchContext'
import RoleView from '../../auth/RoleView'

const DisplayAllCentres = () => {
  const {
    church,
    townId,
    campusId,
    setCentreId,
    setTownId,
    setCampusId,
  } = useContext(ChurchContext)

  const { data: townCentreData, loading: townLoading } = useQuery(
    GET_TOWN_CENTRES,
    {
      variables: { id: townId },
    }
  )
  const { data: campusCentreData, loading: campusLoading } = useQuery(
    GET_CAMPUS_CENTRES,
    {
      variables: { id: campusId },
    }
  )

  if (campusLoading || townLoading) {
    // Spinner Icon for Loading Screens
    return <LoadingScreen />
  } else if (campusCentreData && church.church === 'campus') {
    const campus = campusCentreData.centres[0].campus
    return (
      <>
        <NavBar />
        <div className="body-container container">
          <div className="mb-4 border-bottom">
            <div className="row justify-content-between">
              <div className="col-auto">
                <Link
                  to={`/${church.church}/displaydetails`}
                  onClick={() => {
                    setCampusId(campusId)
                  }}
                >
                  {' '}
                  <h4>{`${campus.name} ${capitalise(church.church)}`}</h4>
                </Link>
              </div>
              <RoleView
                roles={['adminFederal', 'adminBishop', 'adminConstituency']}
              >
                <div className="col-auto">
                  <Link
                    to="/centre/addcentre"
                    className="btn btn-primary text-nowrap"
                  >
                    Add Centre
                  </Link>
                </div>
              </RoleView>
            </div>
            <div className="row">
              <div className="col">
                <h6 className="text-muted">
                  Overseer:
                  {campus.leader
                    ? ` ${campus.leader.firstName} ${campus.leader.lastName}`
                    : null}
                </h6>
              </div>
            </div>

            <div className="row justify-content-between">
              <div className="py-1 px-2 m-2 card">{`Centres: ${campusCentreData.centres.length}`}</div>
              <Link
                className="py-1 px-2 m-2 card text-white"
                to="/sonta/displayall"
              >{`Sontas: ${campusCentreData.centres.length}`}</Link>
              <Link
                to="/campus/members"
                className="py-1 px-2 m-2 card"
              >{`Membership: ${campusCentreData.campusMemberCount}`}</Link>
            </div>
          </div>

          <DisplayChurchList
            data={campusCentreData.centres}
            setter={setCentreId}
            churchType="Centre"
          />
        </div>
      </>
    )
  } else if (townCentreData && church.church === 'town') {
    const town = townCentreData.centres[0].town
    return (
      <>
        <NavBar />
        <div className="body-container container">
          <div className="mb-4 border-bottom">
            <div className="row justify-content-between">
              <div className="col-auto">
                <Link
                  to={`/${church.church}/displaydetails`}
                  onClick={() => {
                    setTownId(townId)
                  }}
                >
                  {' '}
                  <h4>{`${town.name} ${capitalise(church.church)}`}</h4>
                </Link>
              </div>
              <RoleView
                roles={['adminFederal', 'adminBishop', 'adminConstituency']}
              >
                <div className="col-auto">
                  <Link
                    to="/centre/addcentre"
                    className="btn btn-primary text-nowrap"
                  >
                    Add Centre
                  </Link>
                </div>
                <div className="col-auto">
                  <Link
                    to="/sonta/addsonta"
                    className="btn btn-primary text-nowrap"
                  >
                    Add Sonta
                  </Link>
                </div>
              </RoleView>
            </div>
            <div className="row">
              <div className="col">
                <h6 className="text-muted">
                  Constituency Overseer:
                  {town.leader
                    ? ` ${town.leader.firstName} ${town.leader.lastName}`
                    : null}
                </h6>
              </div>
            </div>

            <div className="row justify-content-between">
              <div className="py-1 px-2 m-2 card">{`Centres: ${townCentreData.centres.length}`}</div>
              <Link
                className="py-1 px-2 m-2 card text-white"
                to="/sonta/displayall"
              >{`Sontas: ${townCentreData.sontas.length}`}</Link>
              <Link
                to="/town/members"
                className="py-1 px-2 m-2 card"
              >{`Membership: ${townCentreData.townMemberCount}`}</Link>
            </div>
          </div>

          <DisplayChurchList
            data={townCentreData.centres}
            churchType="Centre"
          />
        </div>
      </>
    )
  } else {
    return <ErrorScreen />
  }
}

export default DisplayAllCentres
