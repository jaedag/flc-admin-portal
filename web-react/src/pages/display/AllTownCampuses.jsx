import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import DisplayChurchList from '../../components/DisplayChurchList'
import NavBar from '../../components/nav/NavBar'
import ErrorScreen from '../../components/ErrorScreen'
import LoadingScreen from '../../components/LoadingScreen'
import {
  GET_BISHOP_TOWNS,
  GET_BISHOP_CAMPUSES,
} from '../../queries/ListQueries'
import { ChurchContext } from '../../contexts/ChurchContext'
import { BISHOP_MEMBER_COUNT } from '../../queries/CountQueries'
import RoleView from '../../auth/RoleView'

const DisplayAllTownCampuses = () => {
  const { clickCard, church, bishopId } = useContext(ChurchContext)

  const { data: bishopTowns, loading: townLoading } = useQuery(
    GET_BISHOP_TOWNS,
    {
      variables: { id: bishopId },
    }
  )
  const {
    data: bishopCampuses,

    loading: campusLoading,
  } = useQuery(GET_BISHOP_CAMPUSES, {
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
    const towns = bishopTowns.members[0].townBishop

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
                    clickCard(towns[0].bishop)
                  }}
                >
                  <h4>{`${towns[0].bishop.firstName} ${towns[0].bishop.lastName}'s Towns`}</h4>
                </Link>
                {towns[0].bishop?.hasAdmin ? (
                  <Link
                    className="pb-4"
                    to="/member/displaydetails"
                    onClick={() => {
                      clickCard(towns[0].bishop?.hasAdmin)
                    }}
                  >
                    {`Admin: ${towns[0].bishop?.hasAdmin?.firstName} ${towns[0].bishop?.hasAdmin?.lastName}`}
                  </Link>
                ) : null}
              </div>
              <RoleView roles={['federalAdmin', 'bishopAdmin']}>
                <div className="col-auto">
                  <Link to="/town/addtown" className="btn btn-primary">
                    Add Town
                  </Link>
                </div>
              </RoleView>
            </div>

            <div className="row justify-content-between">
              <div className="py-1 px-3 m-2 card">{`Towns: ${towns.length}`}</div>

              <Link
                to={`/${church.church}/members`}
                className="py-1 px-3 m-2 card"
              >{`Membership: ${
                bishopMemberCount ? bishopMemberCount.bishopMemberCount : null
              }`}</Link>
            </div>
          </div>
          <DisplayChurchList data={towns} churchType="Town" />
        </div>
      </>
    )
  } else if (church.church === 'campus') {
    const campus = bishopCampuses.members[0].campusBishop

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
                    clickCard(campus[0].bishop)
                  }}
                >
                  <h4>{`${campus[0].bishop.firstName} ${campus[0].bishop.lastName}'s Campuses`}</h4>
                </Link>
                {campus[0].bishop?.hasAdmin ? (
                  <Link
                    className="pb-4"
                    to="/member/displaydetails"
                    onClick={() => {
                      clickCard(campus[0].bishop?.hasAdmin)
                    }}
                  >
                    {`Admin: ${campus[0].bishop?.hasAdmin?.firstName} ${campus[0].bishop?.hasAdmin?.lastName}`}
                  </Link>
                ) : null}
              </div>
              <RoleView roles={['federalAdmin', 'bishopAdmin']}>
                <div className="col-auto">
                  <Link to="/campus/addcampus" className="btn btn-primary">
                    Add Campus
                  </Link>
                </div>
              </RoleView>
            </div>

            <div className="row justify-content-between">
              <div className="py-1 px-3 m-2 card">{`Campusess: ${campus.length}`}</div>

              <Link
                to={`/${church.church}/members`}
                className="py-1 px-3 m-2 card"
              >{`Membership: ${
                bishopMemberCount ? bishopMemberCount.bishopMemberCount : null
              }`}</Link>
            </div>
          </div>
          <DisplayChurchList data={campus} churchType="Campus" />
        </div>
      </>
    )
  } else {
    return <ErrorScreen />
  }
}

export default DisplayAllTownCampuses
