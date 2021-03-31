import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import { DisplayChurchDetails } from '../components/DisplayChurchDetails'
import { NavBar } from '../components/NavBar'
import { ErrorScreen, LoadingScreen } from '../components/StatusScreens'
import { DISPLAY_SONTA } from '../queries/DisplayQueries'
import { ChurchContext } from '../contexts/ChurchContext'

export const DisplaySontaDetails = () => {
  const { sontaId } = useContext(ChurchContext)

  const { data: sontaData, loading: sontaLoading } = useQuery(DISPLAY_SONTA, {
    variables: { id: sontaId },
  })

  if (sontaLoading) {
    // Spinner Icon for Loading Screens
    return <LoadingScreen />
  } else if (sontaData) {
    console.log(sontaData.sontaBasontaLeaderList)
    return (
      <div>
        <NavBar />
        <DisplayChurchDetails
          name={sontaData.displaySonta?.name}
          leaderTitle="Sonta Leader"
          leaderName={`${sontaData.displaySonta?.leader.firstName} ${sontaData.displaySonta?.leader.lastName}`}
          leaderId={sontaData.displaySonta?.leader.id}
          membership={sontaData.sontaMemberCount}
          churchHeading="No of Basonta Leaders"
          churchNo={sontaData.sontaBasontaLeaderList.length}
          subChurch=""
          subChurchSetter=""
          churchType={`Sonta`}
          buttons={['']}
        />
      </div>
    )
  } else {
    return <ErrorScreen />
  }
}
