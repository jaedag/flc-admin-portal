import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import { DisplayChurchDetails } from '../components/DisplayChurchDetails'
import { NavBar } from '../components/NavBar'
import { ErrorScreen, LoadingScreen } from '../components/StatusScreens'
import { DISPLAY_TOWN, DISPLAY_CAMPUS } from '../queries/DisplayQueries'
import { ChurchContext } from '../contexts/ChurchContext'

export const DisplayCampusTownDetails = () => {
  const { church, capitalise, townId, campusId } = useContext(ChurchContext)

  const { data: townData, loading: townLoading } = useQuery(DISPLAY_TOWN, {
    variables: { id: townId },
  })
  const { data: campusData, loading: campusLoading } = useQuery(
    DISPLAY_CAMPUS,
    {
      variables: { id: campusId },
    }
  )

  if (townLoading || campusLoading) {
    // Spinner Icon for Loading Screens
    return <LoadingScreen />
  } else if (church.church === 'town' && townData) {
    let breadcrumb = [townData.displayTown?.bishop, townData.displayTown]
    return (
      <>
        <NavBar />
        <DisplayChurchDetails
          name={townData.displayTown.name}
          leaderTitle={'Town CO'}
          membership={townData.townMemberCount}
          leaderName={
            townData.displayTown.leader
              ? `${townData.displayTown.leader.firstName} ${townData.displayTown.leader.lastName}`
              : null
          }
          leaderId={townData.displayTown.leader?.id}
          churchHeading="No of Centres"
          churchNo={townData.townCentreCount}
          admin={townData.displayTown.admin}
          churchType={`${capitalise(church.church)}`}
          subChurch={`${capitalise(church.subChurch)}`}
          buttons={townData.displayTown.centres}
          editlink="/town/edittown"
          history={
            townData.displayTown?.history.length !== 0 &&
            townData.displayTown?.history
          }
          breadcrumb={breadcrumb && breadcrumb}
        />
      </>
    )
  } else if (church.church === 'campus' && campusData) {
    let breadcrumb = [
      campusData.displayCampus?.bishop,
      campusData.displayCampus,
    ]
    return (
      <>
        <NavBar />
        <DisplayChurchDetails
          name={campusData.displayCampus.name}
          leaderTitle={'Campus CO'}
          membership={campusData.campusMemberCount}
          leaderName={
            campusData.displayCampus.leader
              ? `${campusData.displayCampus.leader.firstName} ${campusData.displayCampus.leader.lastName}`
              : '-'
          }
          leaderId={
            campusData.displayCampus.leader
              ? campusData.displayCampus.leader.id
              : null
          }
          churchHeading="No of Centres"
          churchNo={campusData.campusCentreCount}
          admin={campusData.displayCampus.admin}
          churchType={`${capitalise(church.church)}`}
          subChurch="Centre"
          buttons={campusData.displayCampus.centres}
          breadcrumb={breadcrumb && breadcrumb}
          history={
            campusData.displayCampus?.history.length !== 0 &&
            campusData.displayCampus?.history
          }
          editlink="/campus/editcampus"
        />
      </>
    )
  } else {
    return <ErrorScreen />
  }
}
