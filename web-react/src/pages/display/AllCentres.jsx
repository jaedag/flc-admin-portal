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
                    church.church === 'town'
                      ? setTownId(townId)
                      : setCampusId(campusId)
                  }}
                >
                  {' '}
                  <h4>{`${
                    campusCentreData.campusCentreList[0].campus.name
                  } ${capitalise(church.church)}`}</h4>
                </Link>
              </div>
              <RoleView
                roles={['federalAdmin', 'bishopAdmin', 'constituencyAdmin']}
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
                  Con Overseer:
                  {campusCentreData.campusCentreList[0].campus.leader
                    ? ` ${campusCentreData.campusCentreList[0].campus.leader.firstName} ${campusCentreData.campusCentreList[0].campus.leader.lastName}`
                    : null}
                </h6>
              </div>
            </div>

            <div className="row justify-content-between">
              <div className="py-1 px-2 m-2 card">{`Centres: ${campusCentreData.campusCentreList.length}`}</div>
              <Link
                className="py-1 px-2 m-2 card text-white"
                to="/sonta/displayall"
              >{`Sontas: ${campusCentreData.campusCentreList.length}`}</Link>
              <div className="py-1 px-2 m-2 card">{`Membership: ${campusCentreData.campusMemberCount}`}</div>
            </div>
          </div>

          <DisplayChurchList
            data={campusCentreData.campusCentreList}
            setter={setCentreId}
            churchType="Centre"
          />
        </div>
      </>
    )
  } else if (townCentreData && church.church === 'town') {
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
                    church.church === 'town'
                      ? setTownId(townId)
                      : setCampusId(campusId)
                  }}
                >
                  {' '}
                  <h4>{`${
                    townCentreData.townCentreList[0].town.name
                  } ${capitalise(church.church)}`}</h4>
                </Link>
              </div>
              <RoleView
                roles={['federalAdmin', 'bishopAdmin', 'constituencyAdmin']}
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
                  {townCentreData.townCentreList[0].town.leader
                    ? ` ${townCentreData.townCentreList[0].town.leader.firstName} ${townCentreData.townCentreList[0].town.leader.lastName}`
                    : null}
                </h6>
              </div>
            </div>

            <div className="row justify-content-between">
              <div className="py-1 px-2 m-2 card">{`Centres: ${townCentreData.townCentreList.length}`}</div>
              <Link
                className="py-1 px-2 m-2 card text-white"
                to="/sonta/displayall"
              >{`Sontas: ${townCentreData.townSontaList.length}`}</Link>
              <div className="py-1 px-2 m-2 card">{`Membership: ${townCentreData.townMemberCount}`}</div>
            </div>
          </div>

          <DisplayChurchList
            data={townCentreData.townCentreList}
            churchType="Centre"
          />
          {/* <DisplayChurchList
            data={townCentreData.townSontaList}
            setter={setSontaId}
            churchType="Sonta"
          /> */}
        </div>
      </>
    )
  } else {
    return <ErrorScreen />
  }
}

export default DisplayAllCentres