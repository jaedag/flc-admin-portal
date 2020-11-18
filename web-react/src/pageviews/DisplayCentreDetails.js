import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import { DisplayChurchDetails } from '../components/DisplayChurchDetails'
import { NavBar } from '../components/NavBar'
import { ErrorScreen, LoadingScreen } from '../components/StatusScreens'
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
    return <ErrorScreen />
  } else if (centreLoading) {
    // Spinner Icon for Loading Screens
    return <LoadingScreen />
  }
  return (
    <div>
      <NavBar />
      <DisplayChurchDetails
        name={centreData.displayCentre.name}
        leaderTitle="Centre Leader"
        leaderName={
          centreData.displayCentre.leader
            ? `${centreData.displayCentre.leader.firstName} ${centreData.displayCentre.leader.lastName}`
            : '-'
        }
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
