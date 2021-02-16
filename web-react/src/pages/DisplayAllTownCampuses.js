import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { DisplayChurchList } from '../components/DisplayChurchList'
import { NavBar } from '../components/NavBar'
import { ErrorScreen, LoadingScreen } from '../components/StatusScreens'
import { GET_TOWNS, GET_CAMPUSES } from '../queries/ListQueries'
import { ChurchContext } from '../contexts/ChurchContext'
import { MemberContext } from '../contexts/MemberContext'
import { BISHOP_MEMBER_COUNT } from '../queries/CountQueries'

export const DisplayAllTownCampuses = () => {
  const { church, bishopID, setTownID, setCampusID } = useContext(ChurchContext)
  const { setMemberID } = useContext(MemberContext)

  const { data: townData, error: townError, loading: townLoading } = useQuery(
    GET_TOWNS,
    {
      variables: { id: bishopID },
    }
  )
  const {
    data: campusData,
    error: campusError,
    loading: campusLoading,
  } = useQuery(GET_CAMPUSES, {
    variables: { id: bishopID },
  })
  const { data: bishopMemberCount } = useQuery(BISHOP_MEMBER_COUNT, {
    variables: { id: bishopID },
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
          <div className="mb-4 border-bottom">
            <div className="row">
              <div className="col">
                <Link
                  to="/member/displaydetails"
                  onClick={() => {
                    setMemberID(`${townData.townList[0].bishop.id}`)
                  }}
                >
                  <h4>{`${townData.townList[0].bishop.firstName} ${townData.townList[0].bishop.lastName}'s Towns`}</h4>
                </Link>
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
          <DisplayChurchList
            data={townData.townList}
            setter={setTownID}
            churchType="Town"
          />
        </div>
      </div>
    )
  } else if (church.church === 'campus') {
    return (
      <div>
        <NavBar />
        <div className="body-container container">
          <div className="mb-4 border-bottom">
            <div className="row">
              <div className="col">
                <Link
                  to="/member/displaydetails"
                  onClick={() => {
                    setMemberID(`${campusData.campusList[0].bishop.id}`)
                  }}
                >
                  <h4>{`${campusData.campusList[0].bishop.firstName} ${campusData.campusList[0].bishop.lastName}'s Campuses`}</h4>
                </Link>
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
          <DisplayChurchList
            data={campusData.campusList}
            setter={setCampusID}
            churchType="Campus"
          />
        </div>
      </div>
    )
  }
}
