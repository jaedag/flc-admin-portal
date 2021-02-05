import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { DisplayChurchList } from '../components/DisplayChurchList'
import { NavBar } from '../components/NavBar'
import { ErrorScreen, LoadingScreen } from '../components/StatusScreens'
import { GET_CAMPUSES } from '../queries/ListQueries'
import { ChurchContext } from '../contexts/ChurchContext'
import { BISHOP_MEMBER_COUNT } from '../queries/CountQueries'

export const DisplayAllCampuses = () => {
  const { bishopID, setCampusID, setMemberID } = useContext(ChurchContext)

  const {
    data: campusData,
    error: campusError,
    loading: campusLoading,
  } = useQuery(GET_CAMPUSES, {
    variables: { bishopID: bishopID },
  })
  const { data: bishopMemberCount } = useQuery(BISHOP_MEMBER_COUNT, {
    variables: { bishopID: bishopID },
  })

  if (campusError) {
    return <ErrorScreen />
  } else if (campusLoading) {
    return <LoadingScreen />
  }

  return (
    <div>
      <NavBar />
      <div className="body-container container">
        <div className="mb-4 border-bottom">
          <div className="row">
            <div className="col">
              <Link
                to="/members/displaydetails"
                onClick={() => {
                  setMemberID(`${campusData.campusList[0].bishop.memberID}`)
                }}
              >
                <h4>{`${campusData.campusList[0].bishop.firstName} ${campusData.campusList[0].bishop.lastName}'s Campuses`}</h4>
              </Link>
            </div>
            <div className="col-auto">
              <Link to="/campus/addcampus" className="btn btn-primary">
                Add Town
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
