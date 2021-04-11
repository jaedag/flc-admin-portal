import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { DisplayChurchList } from '../components/DisplayChurchList'
import { NavBar } from '../components/NavBar'
import { ErrorScreen, LoadingScreen } from '../components/StatusScreens'
import { GET_TOWNS, GET_CAMPUSES } from '../queries/ListQueries'
import { ChurchContext } from '../contexts/ChurchContext'
import { BISHOP_MEMBER_COUNT } from '../queries/CountQueries'

export const DisplayAllTownCampuses = () => {
  const { clickCard, church, bishopId } = useContext(ChurchContext)

  const { data: townData, loading: townLoading } = useQuery(GET_TOWNS, {
    variables: { id: bishopId },
  })
  const {
    data: campusData,

    loading: campusLoading,
  } = useQuery(GET_CAMPUSES, {
    variables: { id: bishopId },
  })
  const { data: bishopMemberCount, loading: bishopMemberLoading } = useQuery(
    BISHOP_MEMBER_COUNT,
    {
      variables: { id: bishopId },
    }
  )

  if (townLoading || campusLoading || bishopMemberLoading) {
    // Spinner Icon for Loading Screens
    return <LoadingScreen />
  } else if (church.church === 'town') {
    return (
      <>
        <NavBar />
        <div className="body-container container">
          <div className="mb-4 border-bottom">
            <div className="row">
              <div className="col">
                <Link
                  to="/member/displaydetails"
                  onClick={() => {
                    clickCard(townData.townList[0].bishop)
                  }}
                >
                  <h4>{`${townData.townList[0].bishop.firstName} ${townData.townList[0].bishop.lastName}'s Towns`}</h4>
                </Link>
                {townData.townList[0].bishop?.hasAdmin ? (
                  <Link
                    className="pb-4"
                    to="/member/displaydetails"
                    onClick={() => {
                      clickCard(townData.townList[0].bishop?.hasAdmin)
                    }}
                  >
                    {`Admin: ${townData.townList[0].bishop?.hasAdmin?.firstName} ${townData.townList[0].bishop?.hasAdmin?.lastName}`}
                  </Link>
                ) : null}
              </div>
              <div className="col-auto">
                <Link to="/town/addtown" className="btn btn-primary">
                  Add Town
                </Link>
              </div>
            </div>

            <div className="row justify-content-between">
              <div className="py-1 px-3 m-2 card">{`Towns: ${townData.townList.length}`}</div>

              <div className="py-1 px-3 m-2 card">{`Membership: ${
                bishopMemberCount ? bishopMemberCount.bishopMemberCount : null
              }`}</div>
            </div>
          </div>
          <DisplayChurchList data={townData.townList} churchType="Town" />
        </div>
      </>
    )
  } else if (church.church === 'campus') {
    return (
      <>
        <NavBar />
        <div className="body-container container">
          <div className="mb-4 border-bottom">
            <div className="row">
              <div className="col">
                <Link
                  to="/member/displaydetails"
                  onClick={() => {
                    clickCard(campusData.campusList[0].bishop)
                  }}
                >
                  <h4>{`${campusData.campusList[0].bishop.firstName} ${campusData.campusList[0].bishop.lastName}'s Campuses`}</h4>
                </Link>
                {campusData.campusList[0].bishop?.hasAdmin ? (
                  <Link
                    className="pb-4"
                    to="/member/displaydetails"
                    onClick={() => {
                      clickCard(campusData.campusList[0].bishop?.hasAdmin)
                    }}
                  >
                    {`Admin: ${campusData.campusList[0].bishop?.hasAdmin?.firstName} ${campusData.campusList[0].bishop?.hasAdmin?.lastName}`}
                  </Link>
                ) : null}
              </div>
              <div className="col-auto">
                <Link to="/campus/addcampus" className="btn btn-primary">
                  Add Campus
                </Link>
              </div>
            </div>

            <div className="row justify-content-between">
              <div className="py-1 px-3 m-2 card">{`Campuses: ${campusData.campusList.length}`}</div>

              <div className="py-1 px-3 m-2 card">{`Membership: ${
                bishopMemberCount ? bishopMemberCount.bishopMemberCount : null
              }`}</div>
            </div>
          </div>
          <DisplayChurchList data={campusData.campusList} churchType="Campus" />
        </div>
      </>
    )
  } else {
    return <ErrorScreen />
  }
}
