import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import { DisplayChurchDetails } from '../components/DisplayChurchDetails'
import { NavBar } from '../components/NavBar'
import { ErrorScreen, LoadingScreen } from '../components/StatusScreens'
import { DISPLAY_TOWN, DISPLAY_CAMPUS } from '../queries/DisplayQueries'
import { ChurchContext } from '../contexts/ChurchContext'

export const DisplayCampusTownDetails = () => {
  const { church, capitalise, townID, campusID, setCentreID } = useContext(
    ChurchContext
  )

  const { data: townData, loading: townLoading } = useQuery(DISPLAY_TOWN, {
    variables: { townID: townID },
  })
  const { data: campusData, loading: campusLoading } = useQuery(
    DISPLAY_CAMPUS,
    {
      variables: { campusID: campusID },
    }
  )

  if (townLoading || campusLoading) {
    // Spinner Icon for Loading Screens
    return <LoadingScreen />
  } else if (church.church === 'town') {
    return (
      <div>
        <NavBar />
        <DisplayChurchDetails
          name={townData.displayTown.name}
          leaderTitle={'Town GSO'}
          membership={townData.townMemberCount}
          leaderName={
            townData.displayTown.leader
              ? `${townData.displayTown.leader.firstName} ${townData.displayTown.leader.lastName}`
              : null
          }
          leaderID={
            townData.displayTown.leader
              ? townData.displayTown.leader.memberID
              : null
          }
          churchHeading="No of Centres"
          churchNo={townData.townCentreCount}
          churchType={`${capitalise(church.church)}`}
          subChurch={`${capitalise(church.subChurch)}`}
          subChurchSetter={setCentreID}
          buttons={townData.displayTown.centres}
          editlink={``}
        />
      </div>
    )
  } else if (church.church === 'campus') {
    return (
      <div>
        <NavBar />
        <DisplayChurchDetails
          name={campusData.displayCampus.name}
          leaderTitle={'Campus GSO'}
          membership={campusData.campusMemberCount}
          leaderName={
            campusData.displayCampus.leader
              ? `${campusData.displayCampus.leader.firstName} ${campusData.displayCampus.leader.lastName}`
              : '-'
          }
          leaderID={
            campusData.displayCampus.leader
              ? campusData.displayCampus.leader.memberID
              : null
          }
          churchHeading="No of Centres"
          churchNo={campusData.campusCentreCount}
          churchType={`${capitalise(church.church)}`}
          subChurch="Centre"
          subChurchSetter={setCentreID}
          buttons={campusData.displayCampus.centres}
        />
      </div>
    )
  }
  return <ErrorScreen />
}
