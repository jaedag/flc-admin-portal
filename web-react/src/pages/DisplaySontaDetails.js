import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import { DisplayChurchDetails } from '../components/DisplayChurchDetails'
import { NavBar } from '../components/nav/NavBar'
import { ErrorScreen, LoadingScreen } from '../components/StatusScreens'
import { DISPLAY_SONTA } from '../queries/DisplayQueries'
import { ChurchContext } from '../contexts/ChurchContext'

export const DisplaySontaDetails = () => {
  const { sontaId, church } = useContext(ChurchContext)

  const { data: sontaData, loading: sontaLoading } = useQuery(DISPLAY_SONTA, {
    variables: { id: sontaId },
  })

  if (sontaLoading) {
    // Spinner Icon for Loading Screens
    return <LoadingScreen />
  } else if (sontaData) {
    const { displaySonta, sontaBasontaLeaderList, sontaMemberCount } = sontaData

    let breadcrumb
    if (church.church === 'town') {
      breadcrumb = [displaySonta.town.bishop, displaySonta.town, displaySonta]
    }
    if (church.church === 'campus') {
      breadcrumb = [
        displaySonta.campus.bishop,
        displaySonta.campus,
        displaySonta,
      ]
    }

    return (
      <>
        <NavBar />
        <DisplayChurchDetails
          name={displaySonta?.name}
          leaderTitle="Sonta Leader"
          leaderName={`${displaySonta?.leader.firstName} ${displaySonta?.leader.lastName}`}
          leaderId={displaySonta?.leader.id}
          churchHeading="No of Basonta Leaders"
          churchType={`Sonta`}
          subChurch="Basonta Leaders"
          membership={sontaMemberCount}
          churchNo={sontaBasontaLeaderList.length}
          editlink="/sonta/editsonta"
          history={displaySonta?.history.length !== 0 && displaySonta?.history}
          breadcrumb={breadcrumb}
          buttons={['']}
          basontaLeaders={sontaBasontaLeaderList}
        />
      </>
    )
  } else {
    return <ErrorScreen />
  }
}
