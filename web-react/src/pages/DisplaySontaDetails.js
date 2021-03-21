import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import { DisplayChurchDetails } from '../components/DisplayChurchDetails'
import { NavBar } from '../components/NavBar'
import { ErrorScreen, LoadingScreen } from '../components/StatusScreens'
import { DISPLAY_BACENTA } from '../queries/DisplayQueries'
import { ChurchContext } from '../contexts/ChurchContext'

export const DisplaySontaDetails = () => {
  const { id } = useContext(ChurchContext)

  const {
    data: sontaData,
    error: sontaError,
    loading: sontaLoading,
  } = useQuery(DISPLAY_BACENTA, {
    variables: { id: id },
  })

  if (sontaError) {
    return <ErrorScreen />
  } else if (sontaLoading) {
    // Spinner Icon for Loading Screens
    return <LoadingScreen />
  }
  return (
    <div>
      <NavBar />
      <DisplayChurchDetails
        name={sontaData.displayBacenta.name}
        leaderTitle="Bacenta Leader"
        leaderName={`${sontaData.displayBacenta.leader.firstName} ${sontaData.displayBacenta.leader.lastName}`}
        leaderId={sontaData.displayBacenta.leader.id}
        membership={sontaData.bacentaMemberCount}
        churchHeading="No of Bacentas"
        churchNo="2"
        subChurch="Bacenta"
        subChurchSetter=""
        churchType="Bacenta"
        buttons={['']}
      />
    </div>
  )
}
