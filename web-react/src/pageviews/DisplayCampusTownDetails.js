import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import { DisplayChurchDetails } from '../components/DisplayChurchDetails'
import { NavBar } from '../components/NavBar'
import SpinnerPage from '../components/SpinnerPage'
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
    return (
      <React.Fragment>
        <NavBar />
        <div className="container full-body-center">
          <p className="text-center full-center">
            There seems to be an error loading data
          </p>
        </div>
      </React.Fragment>
    )
  } else if (townLoading || campusLoading) {
    // Spinner Icon for Loading Screens
    return (
      <React.Fragment>
        <NavBar />
        <SpinnerPage />
      </React.Fragment>
    )
  } else if (townData) {
    return (
      <div>
        <NavBar />
        <DisplayChurchDetails
          name={townData.displayTown.name}
          leaderTitle={
            townData.displayTown.leader.title[0]
              ? townData.displayTown.leader.title[0].Title.title
              : 'Town GSO'
          }
          membership={townData.townMemberCount}
          leaderName={`${townData.displayTown.leader.firstName} ${townData.displayTown.leader.lastName}`}
          churchHeading="No of Communities"
          churchNo={townData.townCommunityCount}
          churchType={`${capitalise(church.church)}`}
          subChurch="Community"
          subChurchSetter={setCommunityID}
          buttons={townData.displayTown.communities}
        />
      </div>
    )
  } else if (campusData) {
    return (
      <div>
        <NavBar />
        <DisplayChurchDetails
          name={campusData.displayCampus.name}
          leaderTitle={
            campusData.displayCampus.leader.title[0]
              ? campusData.displayCampus.leader.title[0].Title.title
              : 'Campus GSO'
          }
          membership={campusData.campusMemberCount}
          leaderName={`${campusData.displayCampus.leader.firstName} ${campusData.displayCampus.leader.lastName}`}
          churchHeading="No of Halls"
          churchNo={campusData.campusHallCount}
          churchType={`${capitalise(church.church)}`}
          subChurch="Community"
          subChurchSetter={setHallID}
          buttons={campusData.displayCampus.communities}
        />
      </div>
    )
  }
}
