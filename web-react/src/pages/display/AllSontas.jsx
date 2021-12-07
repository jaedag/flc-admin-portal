import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { capitalise } from '../../global-utils'
import DisplayChurchList from '../../components/DisplayChurchList'

import ErrorScreen from '../../components/base-component/ErrorScreen'
import LoadingScreen from '../../components/base-component/LoadingScreen'
import {
  GET_CAMPUS_BACENTAS,
  GET_TOWN_BACENTAS,
} from '../../queries/ListQueries'
import { ChurchContext } from '../../contexts/ChurchContext'
import RoleView from '../../auth/RoleView'

const DisplayAllSontas = () => {
  const { church, townId, campusId, setTownId, setCampusId } =
    useContext(ChurchContext)

  const { data: townBacentaData, loading: townLoading } = useQuery(
    GET_TOWN_BACENTAS,
    {
      variables: { id: townId },
    }
  )
  const { data: campusBacentaData, loading: campusLoading } = useQuery(
    GET_CAMPUS_BACENTAS,
    {
      variables: { id: campusId },
    }
  )

  if (campusLoading || townLoading) {
    // Spinner Icon for Loading Screens
    return <LoadingScreen />
  } else if (campusBacentaData && church.church === 'campus') {
    return (
      <>
        <div className=" container">
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
                  <h4>{`${
                    campusBacentaData.bacentas[0].campus.name
                  } ${capitalise(church.church)}`}</h4>
                </Link>
              </div>
              {campusBacentaData.sontas.length < 10 && (
                <RoleView
                  roles={[
                    'adminFederal',
                    'adminCouncil',
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
                  {campusBacentaData.bacentas[0].campus.leader
                    ? ` ${campusBacentaData.bacentas[0].campus.leader.firstName} ${campusBacentaData.bacentas[0].campus.leader.lastName}`
                    : null}
                </h6>
              </div>
            </div>

            <div className="row justify-content-between">
              <Link
                className="py-1 px-2 m-2 card"
                to="/bacenta/displayall"
              >{`Bacentas: ${campusBacentaData.bacentas.length}`}</Link>
              <div className="py-1 px-2 m-2 card">{`Sontas: ${campusBacentaData.sontas.length}`}</div>
              <div className="py-1 px-2 m-2 card">{`Membership: ${campusBacentaData.campusMemberCount}`}</div>
            </div>
          </div>

          <DisplayChurchList
            data={campusBacentaData.sontas}
            churchType="Sonta"
          />
        </div>
      </>
    )
  } else if (townBacentaData && church.church === 'town') {
    return (
      <>
        <div className=" container">
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
                  <h4>{`${townBacentaData.bacentas[0].town.name} ${capitalise(
                    church.church
                  )}`}</h4>
                </Link>
              </div>

              {townBacentaData.sontas.length < 10 && (
                <RoleView
                  roles={[
                    'adminFederal',
                    'adminCouncil',
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
                  {townBacentaData.bacentas[0].town.leader
                    ? ` ${townBacentaData.bacentas[0].town.leader.firstName} ${townBacentaData.bacentas[0].town.leader.lastName}`
                    : null}
                </h6>
              </div>
            </div>

            <div className="row justify-content-between">
              <Link
                className="py-1 px-2 m-2 card text-white"
                to="/bacenta/displayall"
              >{`Bacentas: ${townBacentaData.bacentas.length}`}</Link>
              <div className="py-1 px-2 m-2 card">{`Sontas: ${townBacentaData.sontas.length}`}</div>
              <div className="py-1 px-2 m-2 card">{`Membership: ${townBacentaData.townMemberCount}`}</div>
            </div>
          </div>

          <DisplayChurchList data={townBacentaData.sontas} churchType="Sonta" />
        </div>
      </>
    )
  } else {
    return <ErrorScreen />
  }
}

export default DisplayAllSontas
