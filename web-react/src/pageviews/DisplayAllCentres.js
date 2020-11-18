import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { DisplayChurchList } from '../components/DisplayChurchList'
import { NavBar } from '../components/NavBar'
import { ErrorScreen, LoadingScreen } from '../components/StatusScreens'
import { GET_CENTRES } from '../queries/ListQueries'
import {
  CentreContext,
  CommunityHallContext,
  ChurchContext,
} from '../context/ChurchContext'
import { MemberContext } from '../context/MemberContext'

export const DisplayAllCentres = () => {
  const { church } = useContext(ChurchContext)
  const { communityID, hallID } = useContext(CommunityHallContext)
  const { setCentreID } = useContext(CentreContext)
  const { setMemberID } = useContext(MemberContext)

  const {
    data: centreData,
    error: centreError,
    loading: centreLoading,
  } = useQuery(GET_CENTRES, {
    variables: { communityID: communityID, hallID: hallID },
  })

  if (church.church === 'campus' && centreData) {
    return (
      <div>
        <NavBar />
        <div className="body-container container">
          <div className="mb-4">
            <h4>{`${centreData.centreList[0].hall.name} Hall`}</h4>
            <Link
              to="/members/displaydetails"
              onClick={() => {
                setMemberID(`${centreData.centreList[0].hall.leader.memberID}`)
              }}
            >
              <h6 className="text-muted">
                Leader:
                {` ${centreData.centreList[0].hall.leader.firstName} ${centreData.centreList[0].hall.leader.lastName}`}
              </h6>
            </Link>
          </div>
          <DisplayChurchList
            data={centreData.centreList}
            setter={setCentreID}
            churchType="Centre"
          />
        </div>
      </div>
    )
  } else if (church.church === 'town' && centreData) {
    return (
      <div>
        <NavBar />
        <div className="body-container container">
          <div className="mb-4">
            <h4>{`${centreData.centreList[0].community.name} Community`}</h4>
            <Link
              to="/members/displaydetails"
              onClick={() => {
                setMemberID(
                  `${centreData.centreList[0].community.leader.memberID}`
                )
              }}
            >
              <h6 className="text-muted">
                Leader:
                {` ${centreData.centreList[0].community.leader.firstName} ${centreData.centreList[0].community.leader.lastName}`}
              </h6>
            </Link>
          </div>
          <DisplayChurchList
            data={centreData.centreList}
            setter={setCentreID}
            churchType="Centre"
          />
        </div>
      </div>
    )
  } else if (centreError) {
    return <ErrorScreen />
  } else if (centreLoading) {
    // Spinner Icon for Loading Screens
    return <LoadingScreen />
  }
}
