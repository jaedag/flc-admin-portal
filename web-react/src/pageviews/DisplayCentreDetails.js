import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import { DisplayCentreSontaDetails } from '../components/DisplayCentreSontaDetails'
import { NavBar } from '../components/NavBar'
import SpinnerPage from '../components/SpinnerPage'
import { DISPLAY_CENTRE } from '../queries/DisplayQueries'
import { CentreContext } from '../context/ChurchContext'

export const DisplayCentreDetails = () => {
  // const { churchHeading, churchNo, ...rest } = props

  const { centreID } = useContext(CentreContext)
  const {
    data: centreData,
    error: centreError,
    loading: centreLoading,
  } = useQuery(DISPLAY_CENTRE, {
    variables: { centreID: centreID },
  })
  console.log(centreData)

  const churchHeading = 'No of Bacentas'
  const churchNo = '2'

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
      <DisplayCentreSontaDetails
        name={centreData.displayCentre.name}
        leaderTitle={centreData.displayCentre.leader.title[0].Title.title}
        membership={centreData.centreMemberCount}
        leaderName={`${centreData.displayCentre.leader.firstName} ${centreData.displayCentre.leader.lastName}`}
        churchHeading={churchHeading}
        churchNo={churchNo}
      />
    </div>
  )
}
