import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { DisplayChurchList } from '../components/DisplayChurchList'
import { NavBar } from '../components/NavBar'
import { ErrorScreen, LoadingScreen } from '../components/StatusScreens'
import { GET_SONTAS_BY_CAMPUSTOWN } from '../queries/ListQueries'
import { ChurchContext } from '../contexts/ChurchContext'
import { MemberContext } from '../contexts/MemberContext'

export const DisplaySontasByCampusTown = () => {
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
                to="/campus/displayall"
              >{`Campuses: ${sontaData.campusList.length}`}</Link>

              <div className="py-1 px-2 m-2 card">{`Membership: ${sontaData.bishopSontaMemberCount}`}</div>
            </div>
          </div>

          {sontaData.campusList.map((campus, index) => {
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
                  <h4>{`${sontaData.townList[0].bishop.firstName} ${sontaData.townList[0].bishop.lastName}'s Sontas`}</h4>
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
                to="/town/displayall"
              >{`Towns: ${sontaData.townList.length}`}</Link>

              <div className="py-1 px-2 m-2 card">{`Membership: ${sontaData.bishopSontaMemberCount}`}</div>
            </div>
          </div>

          {sontaData.townList.map((town, index) => {
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
