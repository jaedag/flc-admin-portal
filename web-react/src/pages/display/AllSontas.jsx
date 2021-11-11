import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { capitalise } from '../../global-utils'
import DisplayChurchList from '../../components/DisplayChurchList'

import ErrorScreen from '../../components/base-component/ErrorScreen'
import LoadingScreen from '../../components/base-component/LoadingScreen'
import { GET_CAMPUS_CENTRES, GET_TOWN_CENTRES } from '../../queries/ListQueries'
import { ChurchContext } from '../../contexts/ChurchContext'
import RoleView from '../../auth/RoleView'

const DisplayAllSontas = () => {
  const { church, townId, campusId, setTownId, setCampusId } = useContext(
    ChurchContext
  )

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
    return (
      <>
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
                  <h4>{`${campusCentreData.centres[0].campus.name} ${capitalise(
                    church.church
                  )}`}</h4>
                </Link>
              </div>
              {campusCentreData.sontas.length < 10 && (
                <RoleView
                  roles={[
                    'adminFederal',
                    'adminBishop',
                    'adminCampus',
                    'adminTown',
                  ]}
                >
                  <div className="col-auto">
                    <Link
                      to="/sonta/addsonta"
                      className="btn btn-primary text-nowrap"
                    >
                      Add Sonta
                    </Link>
                  </div>
                </RoleView>
              )}
            </div>
            <div className="row">
              <div className="col">
                <h6 className="text-muted">
                  Overseer:
                  {campusCentreData.centres[0].campus.leader
                    ? ` ${campusCentreData.centres[0].campus.leader.firstName} ${campusCentreData.centres[0].campus.leader.lastName}`
                    : null}
                </h6>
              </div>
            </div>

            <div className="row justify-content-between">
              <Link
                className="py-1 px-2 m-2 card"
                to="/centre/displayall"
              >{`Centres: ${campusCentreData.centres.length}`}</Link>
              <div className="py-1 px-2 m-2 card">{`Sontas: ${campusCentreData.sontas.length}`}</div>
              <div className="py-1 px-2 m-2 card">{`Membership: ${campusCentreData.campusMemberCount}`}</div>
            </div>
          </div>

          <DisplayChurchList
            data={campusCentreData.sontas}
            churchType="Sonta"
          />
        </div>
      </>
    )
  } else if (townCentreData && church.church === 'town') {
    return (
      <>
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
                  <h4>{`${townCentreData.centres[0].town.name} ${capitalise(
                    church.church
                  )}`}</h4>
                </Link>
              </div>

              {townCentreData.sontas.length < 10 && (
                <RoleView
                  roles={[
                    'adminFederal',
                    'adminBishop',
                    'adminCampus',
                    'adminTown',
                  ]}
                >
                  <div className="col-auto">
                    <Link
                      to="/sonta/addsonta"
                      className="btn btn-primary text-nowrap"
                    >
                      Add Sonta
                    </Link>
                  </div>
                </RoleView>
              )}
            </div>
            <div className="row">
              <div className="col">
                <h6 className="text-muted">
                  Constituency Overseer:
                  {townCentreData.centres[0].town.leader
                    ? ` ${townCentreData.centres[0].town.leader.firstName} ${townCentreData.centres[0].town.leader.lastName}`
                    : null}
                </h6>
              </div>
            </div>

            <div className="row justify-content-between">
              <Link
                className="py-1 px-2 m-2 card text-white"
                to="/centre/displayall"
              >{`Centres: ${townCentreData.centres.length}`}</Link>
              <div className="py-1 px-2 m-2 card">{`Sontas: ${townCentreData.sontas.length}`}</div>
              <div className="py-1 px-2 m-2 card">{`Membership: ${townCentreData.townMemberCount}`}</div>
            </div>
          </div>

          <DisplayChurchList data={townCentreData.sontas} churchType="Sonta" />
        </div>
      </>
    )
  } else {
    return <ErrorScreen />
  }
}

export default DisplayAllSontas
