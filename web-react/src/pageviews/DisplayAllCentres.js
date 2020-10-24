import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { DisplayChurchList } from '../components/DisplayChurchList'
import { NavBar } from '../components/NavBar'
import SpinnerPage from '../components/SpinnerPage'
import { GET_CENTRES } from '../queries/DropDownQueries'
import { CentreContext, CommunityContext } from '../context/ChurchContext'
import { MemberContext } from '../context/MemberContext'

export const DisplayAllCentres = () => {
  const { communityID } = useContext(CommunityContext)
  const { setCentreID } = useContext(CentreContext)
  const { setMemberID } = useContext(MemberContext)

  const {
    data: centreData,
    error: centreError,
    loading: centreLoading,
  } = useQuery(GET_CENTRES, {
    variables: { communityID: communityID },
  })
  console.log(centreData)

  if (centreError) {
    return (
      <React.Fragment>
        <NavBar />
        <div className="container full-body-center">
          <p className="text-center full-center">
            There seems to be an error loading data
          </p>
        </div>
      </React.Fragment>
    )
  } else if (centreLoading) {
    // Spinner Icon for Loading Screens
    return (
      <React.Fragment>
        <NavBar />
        <SpinnerPage />
      </React.Fragment>
    )
  }

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
}
