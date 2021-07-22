import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import DisplayChurchDetails from '../../components/DisplayChurchDetails/DisplayChurchDetails'
import NavBar from '../../components/nav/NavBar'
import ErrorScreen from '../../components/base-component/ErrorScreen'
import LoadingScreen from '../../components/base-component/LoadingScreen'
import { DISPLAY_SONTA } from './ReadQueries'
import { ChurchContext } from '../../contexts/ChurchContext'

const DisplaySontaDetails = () => {
  const { sontaId, church } = useContext(ChurchContext)

  const { data: sontaData, loading: sontaLoading } = useQuery(DISPLAY_SONTA, {
    variables: { id: sontaId },
  })

  if (sontaLoading) {
    // Spinner Icon for Loading Screens
    return <LoadingScreen />
  } else if (sontaData) {
    const { sontas, sontaBasontaLeaderList, sontaMemberCount } = sontaData

    let breadcrumb
    if (church.church === 'town') {
      breadcrumb = [sontas[0].town?.bishop, sontas[0].town, sontas[0]]
    }
    if (church.church === 'campus') {
      breadcrumb = [sontas[0].campus?.bishop, sontas[0].campus, sontas[0]]
    }

    return (
      <>
        <NavBar />
        <DisplayChurchDetails
          name={sontas[0]?.name}
          leaderTitle="Sonta Leader"
          leaderName={`${sontas[0]?.leader.firstName} ${sontas[0]?.leader.lastName}`}
          leaderId={sontas[0]?.leader.id}
          churchHeading="No of Basonta Leaders"
          churchType={`Sonta`}
          subChurch="Basonta Leaders"
          membership={sontaMemberCount}
          churchNo={sontaBasontaLeaderList.length}
          editlink="/sonta/editsonta"
          history={sontas[0]?.history.length !== 0 && sontas[0]?.history}
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

export default DisplaySontaDetails
