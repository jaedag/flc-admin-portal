import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import { DisplayChurchDetails } from '../components/DisplayChurchDetails'
import { NavBar } from '../components/NavBar'
import { ErrorScreen, LoadingScreen } from '../components/StatusScreens'
import { DISPLAY_BACENTA } from '../queries/DisplayQueries'
import { ChurchContext } from '../contexts/ChurchContext'

export const DisplayBacentaDetails = () => {
  const { bacentaID } = useContext(ChurchContext)

  const {
    data: bacentaData,
    error: bacentaError,
    loading: bacentaLoading,
  } = useQuery(DISPLAY_BACENTA, {
    variables: { id: bacentaID },
  })

  if (bacentaError) {
    return <ErrorScreen />
  } else if (bacentaLoading) {
    // Spinner Icon for Loading Screens
    return <LoadingScreen />
  }
  return (
    <div>
      <NavBar />
      <DisplayChurchDetails
        name={bacentaData.displayBacenta.name}
        leaderTitle="Bacenta Leader"
        leaderName={
          bacentaData.displayBacenta.leader
            ? `${bacentaData.displayBacenta.leader.firstName} ${bacentaData.displayBacenta.leader.lastName}`
            : '-'
        }
        leaderID={bacentaData.displayBacenta.leader.id}
        membership={bacentaData.bacentaMemberCount}
        churchHeading="Meeting Day"
        churchNo={bacentaData.displayBacenta.meetingDay.day}
        churchType="Bacenta"
        buttons={['']}
        editlink="/bacenta/editbacenta"
      />
    </div>
  )
}
