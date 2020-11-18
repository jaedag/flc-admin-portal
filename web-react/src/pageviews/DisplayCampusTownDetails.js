import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import { DisplayChurchDetails } from '../components/DisplayChurchDetails'
import { NavBar } from '../components/NavBar'
import { ErrorScreen, LoadingScreen } from '../components/StatusScreens'
import { DISPLAY_TOWN, DISPLAY_CAMPUS } from '../queries/DisplayQueries'
import {
  CommunityHallContext,
  CampusTownContext,
  ChurchContext,
} from '../context/ChurchContext'

export const DisplayCampusTownDetails = () => {
  const { church, capitalise } = useContext(ChurchContext)
  const { townID, campusID } = useContext(CampusTownContext)
  const { setCommunityID, setHallID } = useContext(CommunityHallContext)

  const { data: townData, error: townError, loading: townLoading } = useQuery(
    DISPLAY_TOWN,
    {
      variables: { townID: townID },
    }
  )
  const {
    data: campusData,
    error: campusError,
    loading: campusLoading,
  } = useQuery(DISPLAY_CAMPUS, {
    variables: { campusID: campusID },
  })

  if (townError || campusError) {
    return <ErrorScreen />
  } else if (townLoading || campusLoading) {
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
          churchHeading="No of Communities"
          churchNo={townData.townCommunityCount}
          churchType={`${capitalise(church.church)}`}
          subChurch="Community"
          subChurchSetter={setCommunityID}
          buttons={townData.displayTown.communities}
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
          churchHeading="No of Halls"
          churchNo={campusData.campusHallCount}
          churchType={`${capitalise(church.church)}`}
          subChurch="Hall"
          subChurchSetter={setHallID}
          buttons={campusData.displayCampus.halls}
        />
      </div>
    )
  }
}
