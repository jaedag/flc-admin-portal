import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import { DisplayChurchDetails } from '../components/DisplayChurchDetails'
import { NavBar } from '../components/NavBar'
import { ErrorScreen, LoadingScreen } from '../components/StatusScreens'
import { DISPLAY_HALL } from '../queries/DisplayQueries'
import { CentreContext, CommunityHallContext } from '../context/ChurchContext'

export const DisplayHallDetails = () => {
  const { hallID } = useContext(CommunityHallContext)
  const { setCentreID } = useContext(CentreContext)
  const { data: hallData, error: hallError, loading: hallLoading } = useQuery(
    DISPLAY_HALL,
    {
      variables: { hallID: hallID },
    }
  )

  if (hallError) {
    return <ErrorScreen />
  } else if (hallLoading) {
    // Spinner Icon for Loading Screens
    return <LoadingScreen />
  }

  const { displayHall, hallMemberCount, hallCentreCount } = hallData
  return (
    <div>
      <NavBar />
      <DisplayChurchDetails
        name={displayHall.name}
        // leaderTitle={displayHall.leader.title[0].Title.title}
        leaderTitle="Hall Leader"
        membership={hallMemberCount}
        leaderName={
          displayHall.leader
            ? `${displayHall.leader.firstName} ${displayHall.leader.lastName}`
            : '-'
        }
        churchHeading="No of Centres"
        churchType="Hall"
        subChurch="Centre"
        subChurchSetter={setCentreID}
        churchNo={hallCentreCount}
        buttons={displayHall.centres}
      />
    </div>
  )
}
