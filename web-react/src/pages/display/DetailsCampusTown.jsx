import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import { capitalise } from '../../global-utils'
import DisplayChurchDetails from '../../components/DisplayChurchDetails/DisplayChurchDetails'
import NavBar from '../../components/nav/NavBar'
import ErrorScreen from '../../components/ErrorScreen'
import LoadingScreen from '../../components/LoadingScreen'
import { DISPLAY_TOWN, DISPLAY_CAMPUS } from '../../queries/ReadQueries'
import { ChurchContext } from '../../contexts/ChurchContext'

const DisplayCampusTownDetails = () => {
  const { church, townId, campusId } = useContext(ChurchContext)

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
    let breadcrumb = [townData.towns[0]?.bishop, townData.towns[0]]
    return (
      <>
        <NavBar />
        <DisplayChurchDetails
          name={townData.towns[0].name}
          leaderTitle={'Town CO'}
          membership={townData.townMemberCount}
          leaderName={
            townData.towns[0].leader
              ? `${townData.towns[0].leader.firstName} ${townData.towns[0].leader.lastName}`
              : null
          }
          leaderId={townData.towns[0].leader?.id}
          churchHeading="No of Centres"
          churchNo={townData.townCentreCount}
          admin={townData.towns[0].admin}
          churchType={`${capitalise(church.church)}`}
          subChurch={`${capitalise(church.subChurch)}`}
          subChurchBasonta="Sonta"
          buttons={townData.towns[0].centres}
          buttonsSecondRow={townData.towns[0].sontas}
          editlink="/town/edittown"
          history={
            townData.towns[0]?.history.length !== 0 &&
            townData.towns[0]?.history
          }
          breadcrumb={breadcrumb && breadcrumb}
        />
      </>
    )
  } else if (church.church === 'campus' && campusData) {
    let breadcrumb = [campusData.campuses[0]?.bishop, campusData.campuses[0]]
    return (
      <>
        <NavBar />
        <DisplayChurchDetails
          name={campusData.campuses[0].name}
          leaderTitle={'Campus CO'}
          membership={campusData.campusMemberCount}
          leaderName={
            campusData.campuses[0].leader
              ? `${campusData.campuses[0].leader.firstName} ${campusData.campuses[0].leader.lastName}`
              : '-'
          }
          leaderId={
            campusData.campuses[0].leader
              ? campusData.campuses[0].leader.id
              : null
          }
          churchHeading="No of Centres"
          churchNo={campusData.campusCentreCount}
          admin={campusData.campuses[0].admin}
          churchType={`${capitalise(church.church)}`}
          subChurch="Centre"
          subChurchBasonta="Sonta"
          buttons={campusData.campuses[0].centres}
          buttonsSecondRow={campusData.campuses[0].sontas}
          breadcrumb={breadcrumb && breadcrumb}
          history={
            campusData.campuses[0]?.history.length !== 0 &&
            campusData.campuses[0]?.history
          }
          editlink="/campus/editcampus"
        />
      </>
    )
  } else {
    return <ErrorScreen />
  }
}

export default DisplayCampusTownDetails
