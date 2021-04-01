import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import { DisplayChurchDetails } from '../components/DisplayChurchDetails'
import { NavBar } from '../components/NavBar'
import { ErrorScreen, LoadingScreen } from '../components/StatusScreens'
import { DISPLAY_CENTRE } from '../queries/DisplayQueries'
import { ChurchContext } from '../contexts/ChurchContext'

export const DisplayCentreDetails = () => {
  const { centreId, setBacentaId } = useContext(ChurchContext)
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
      <div>
        <NavBar />
        <DisplayChurchDetails
          name={displayCentre?.name}
          // leaderTitle={displayCentre.leader.title[0].Title.title}
          leaderTitle="Centre Leader"
          membership={centreMemberCount}
          leaderName={
            displayCentre?.leader
              ? `${displayCentre.leader.firstName} ${displayCentre.leader.lastName}`
              : '-'
          }
          leaderId={displayCentre?.leader ? displayCentre.leader.id : null}
          churchHeading="No of Bacentas"
          churchType="Centre"
          subChurch="Bacenta"
          subChurchSetter={setBacentaId}
          churchNo={centreBacentaCount}
          buttons={displayCentre ? displayCentre.bacentas : []}
          editlink="/centre/editcentre"
          breadcrumb={breadcrumb && breadcrumb}
        />
      </div>
    )
  } else {
    return <ErrorScreen />
  }
}
