import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import { DisplayChurchDetails } from '../components/DisplayChurchDetails'
import { NavBar } from '../components/NavBar'
import { ErrorScreen, LoadingScreen } from '../components/StatusScreens'
import { DISPLAY_TOWN, DISPLAY_CAMPUS } from '../queries/DisplayQueries'
import { ChurchContext } from '../contexts/ChurchContext'

export const DisplayCampusTownDetails = () => {
  const { church, capitalise, townId, campusId, setCentreId } = useContext(
    ChurchContext
  )

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
      <div>
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
          subChurchSetter={setCentreId}
          buttons={townData.displayTown.centres}
          editlink="/town/edittown"
          breadcrumb={breadcrumb && breadcrumb}
        />
      </div>
    )
  } else if (church.church === 'campus' && campusData) {
    let breadcrumb = [
      campusData.displayCampus?.bishop,
      campusData.displayCampus,
    ]
    return (
      <div>
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
          subChurchSetter={setCentreId}
          buttons={campusData.displayCampus.centres}
          breadcrumb={breadcrumb && breadcrumb}
          editlink="/campus/editcampus"
        />
      </div>
    )
  } else {
    return <ErrorScreen />
  }
}
