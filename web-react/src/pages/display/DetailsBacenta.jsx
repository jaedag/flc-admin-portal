import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import DisplayChurchDetails from '../../components/DisplayChurchDetails/DisplayChurchDetails'
import NavBar from '../../components/nav/NavBar'
import ErrorScreen from '../../components/ErrorScreen'
import LoadingScreen from '../../components/LoadingScreen'
import { DISPLAY_BACENTA } from '../../queries/ReadQueries'
import { ChurchContext } from '../../contexts/ChurchContext'

const DisplayBacentaDetails = () => {
  const { bacentaId } = useContext(ChurchContext)

  const { data: bacentaData, loading: bacentaLoading } = useQuery(
    DISPLAY_BACENTA,
    {
      variables: { id: bacentaId },
    }
  )

  if (bacentaLoading) {
    // Spinner Icon for Loading Screens
    return <LoadingScreen />
  } else if (bacentaData) {
    let breadcrumb = [
      bacentaData.displayBacenta?.centre?.town
        ? bacentaData.displayBacenta?.centre?.town.bishop
        : bacentaData.displayBacenta?.centre?.campus.bishop,
      bacentaData.displayBacenta?.centre?.town
        ? bacentaData.displayBacenta?.centre?.town
        : bacentaData.displayBacenta?.centre?.campus,
      bacentaData.displayBacenta?.centre,
      bacentaData.displayBacenta,
    ]
    if (!bacentaData.displayBacenta?.centre) {
      breadcrumb = [bacentaData.displayBacenta]
    }

    return (
      <>
        <NavBar />
        <DisplayChurchDetails
          name={bacentaData.displayBacenta?.name}
          leaderTitle="Bacenta Leader"
          leaderName={
            bacentaData.displayBacenta?.leader
              ? `${bacentaData.displayBacenta.leader.firstName} ${bacentaData.displayBacenta.leader.lastName}`
              : '-'
          }
          leaderId={bacentaData.displayBacenta?.leader?.id}
          membership={bacentaData.bacentaMemberCount}
          churchHeading="Meeting Day"
          churchNo={bacentaData.displayBacenta?.meetingDay.day}
          churchType="Bacenta"
          buttons={['']}
          editlink="/bacenta/editbacenta"
          history={
            bacentaData.displayBacenta?.history.length !== 0 &&
            bacentaData.displayBacenta?.history
          }
          breadcrumb={breadcrumb && breadcrumb}
        />
      </>
    )
  } else {
    return <ErrorScreen />
  }
}

export default DisplayBacentaDetails
