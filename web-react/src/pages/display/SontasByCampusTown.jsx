import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import DisplayChurchList from '../../components/DisplayChurchList'
import NavBar from '../../components/nav/NavBar'
import ErrorScreen from '../../components/base-component/ErrorScreen'
import LoadingScreen from '../../components/base-component/LoadingScreen'
import { GET_SONTAS_BY_CAMPUSTOWN } from '../../queries/ListQueries'
import { ChurchContext } from '../../contexts/ChurchContext'
import { MemberContext } from '../../contexts/MemberContext'
import RoleView from '../../auth/RoleView'

const DisplaySontasByCampusTown = () => {
  const { church, bishopId, setSontaId } = useContext(ChurchContext)
  const { setMemberId } = useContext(MemberContext)

  const { data: sontaData, loading: sontaLoading } = useQuery(
    GET_SONTAS_BY_CAMPUSTOWN,
    {
      variables: { id: bishopId },
    }
  )

  if (sontaLoading) {
    // Spinner Icon for Loading Screens
    return <LoadingScreen />
  } else if (sontaData && church.church === 'campus') {
    const campuses = sontaData.campuses

    return (
      <>
        <NavBar />
        <div className="body-container container">
          <div className="mb-4 border-bottom">
            <div className="row justify-content-between">
              <div className="col-auto">
                <Link
                  to={`/member/displaydetails`}
                  onClick={() => {
                    setMemberId(bishopId)
                  }}
                >
                  {' '}
                  <h4>{`${campuses[0].bishop?.firstName} ${campuses[0].bishop?.lastName}'s Sontas`}</h4>
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

            <div className="row justify-content-between">
              <Link
                className="py-1 px-2 m-2 card"
                to="/campus/displayall"
              >{`Campuses: ${campuses.length}`}</Link>

              <div className="py-1 px-2 m-2 card">{`Membership: ${sontaData.bishopSontaMemberCount}`}</div>
            </div>
          </div>

          {campuses.map((campus, index) => {
            return (
              <div key={index}>
                <h4>{campus.name}</h4>
                <DisplayChurchList
                  data={campus.sontas}
                  setter={setSontaId}
                  churchType="Sonta"
                />
              </div>
            )
          })}
        </div>
      </>
    )
  } else if (sontaData && church.church === 'town') {
    const towns = sontaData.towns
    return (
      <>
        <NavBar />
        <div className="body-container container">
          <div className="mb-4 border-bottom">
            <div className="row justify-content-between">
              <div className="col-auto">
                <Link
                  to={`/member/displaydetails`}
                  onClick={() => {
                    setMemberId(bishopId)
                  }}
                >
                  {' '}
                  <h4>{`${towns[0].bishop?.firstName} ${towns[0].bishop?.lastName}'s Sontas`}</h4>
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
                  <Link
                    to="/sonta/addsonta"
                    className="btn btn-primary text-nowrap"
                  >
                    Add Sonta
                  </Link>
                </div>
              </RoleView>
            </div>

            <div className="row justify-content-between">
              <Link
                className="py-1 px-2 m-2 card"
                to="/town/displayall"
              >{`Towns: ${towns.length}`}</Link>

              <div className="py-1 px-2 m-2 card">{`Membership: ${sontaData.bishopSontaMemberCount}`}</div>
            </div>
          </div>

          {towns.map((town, index) => {
            return (
              <div key={index}>
                <h4>{town.name}</h4>
                <DisplayChurchList
                  data={town.sontas}
                  setter={setSontaId}
                  churchType="Sonta"
                />
              </div>
            )
          })}
        </div>
      </>
    )
  } else {
    return <ErrorScreen />
  }
}

export default DisplaySontasByCampusTown
