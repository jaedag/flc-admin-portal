import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import { DisplayChurchDetails } from '../components/DisplayChurchDetails'
import { NavBar } from '../components/nav/NavBar.jsx'
import { ErrorScreen, LoadingScreen } from '../components/StatusScreens'
import { DISPLAY_CENTRE } from '../queries/ReadQueries'
import { ChurchContext } from '../contexts/ChurchContext'

export const DisplayCentreDetails = () => {
  const { centreId } = useContext(ChurchContext)
  const { data: centreData, loading: centreLoading } = useQuery(
    DISPLAY_CENTRE,
    {
      variables: { id: centreId },
    }
  )

  if (centreLoading) {
    // Spinner Icon for Loading Screens
    return <LoadingScreen />
  } else if (centreData) {
    const { displayCentre, centreMemberCount, centreBacentaCount } = centreData
    let breadcrumb = [
      displayCentre.town
        ? displayCentre.town.bishop
        : displayCentre.campus.bishop,
      displayCentre.town ? displayCentre.town : displayCentre.campus,
      displayCentre,
    ]

    return (
      <>
        <NavBar />
        <DisplayChurchDetails
          name={displayCentre?.name}
          leaderTitle="Centre Leader"
          leaderName={
            displayCentre?.leader
              ? `${displayCentre.leader.firstName} ${displayCentre.leader.lastName}`
              : '-'
          }
          leaderId={displayCentre?.leader?.id}
          churchHeading="No of Bacentas"
          churchType="Centre"
          subChurch="Bacenta"
          membership={centreMemberCount}
          churchNo={centreBacentaCount}
          editlink="/centre/editcentre"
          history={
            centreData.displayCentre?.history.length !== 0 &&
            centreData.displayCentre?.history
          }
          breadcrumb={breadcrumb && breadcrumb}
          buttons={displayCentre ? displayCentre.bacentas : []}
        />
      </>
    )
  } else {
    return <ErrorScreen />
  }
}
