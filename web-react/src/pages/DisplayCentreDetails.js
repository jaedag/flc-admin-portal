import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import { DisplayChurchDetails } from '../components/DisplayChurchDetails'
import { NavBar } from '../components/NavBar'
import { ErrorScreen, LoadingScreen } from '../components/StatusScreens'
import { DISPLAY_CENTRE } from '../queries/DisplayQueries'
import { ChurchContext } from '../contexts/ChurchContext'

export const DisplayCentreDetails = () => {
  const { centreID, setBacentaID } = useContext(ChurchContext)
  const {
    data: centreData,
    error: centreError,
    loading: centreLoading,
  } = useQuery(DISPLAY_CENTRE, {
    variables: { id: centreID },
  })

  if (centreError) {
    return <ErrorScreen />
  } else if (centreLoading) {
    // Spinner Icon for Loading Screens
    return <LoadingScreen />
  }

  const { displayCentre, centreMemberCount, centreBacentaCount } = centreData
  return (
    <div>
      <NavBar />
      <DisplayChurchDetails
        name={displayCentre.name}
        // leaderTitle={displayCentre.leader.title[0].Title.title}
        leaderTitle="Centre Leader"
        membership={centreMemberCount}
        leaderName={
          displayCentre.leader
            ? `${displayCentre.leader.firstName} ${displayCentre.leader.lastName}`
            : '-'
        }
        leaderID={displayCentre.leader ? displayCentre.leader.id : null}
        churchHeading="No of Bacentas"
        churchType="Centre"
        subChurch="Bacenta"
        subChurchSetter={setBacentaID}
        churchNo={centreBacentaCount}
        buttons={displayCentre.bacentas}
      />
    </div>
  )
}
