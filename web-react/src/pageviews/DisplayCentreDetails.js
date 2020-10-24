import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import { DisplayChurchDetails } from '../components/DisplayChurchDetails'
import { NavBar } from '../components/NavBar'
import SpinnerPage from '../components/SpinnerPage'
import { DISPLAY_CENTRE } from '../queries/DisplayQueries'
import { CentreContext } from '../context/ChurchContext'

export const DisplayCentreDetails = () => {
  const { centreID } = useContext(CentreContext)

  const {
    data: centreData,
    error: centreError,
    loading: centreLoading,
  } = useQuery(DISPLAY_CENTRE, {
    variables: { centreID: centreID },
  })
  // console.log(centreData)

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
      <DisplayChurchDetails
        name={centreData.displayCentre.name}
        leaderTitle="Centre Leader"
        leaderName={`${centreData.displayCentre.leader.firstName} ${centreData.displayCentre.leader.lastName}`}
        membership={centreData.centreMemberCount}
        churchHeading="No of Bacentas"
        churchNo="2"
        subChurch="Bacenta"
        subChurchSetter=""
        churchType="Centre"
        buttons={['']}
      />
    </div>
  )
}
