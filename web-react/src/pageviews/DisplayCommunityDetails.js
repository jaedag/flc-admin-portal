import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import { DisplayChurchDetails } from '../components/DisplayChurchDetails'
import { NavBar } from '../components/NavBar'
import { ErrorScreen, LoadingScreen } from '../components/StatusScreens'
import { DISPLAY_COMMUNITY } from '../queries/DisplayQueries'
import { CentreContext, CommunityHallContext } from '../context/ChurchContext'

export const DisplayCommunityDetails = () => {
  const { communityID } = useContext(CommunityHallContext)
  const { setCentreID } = useContext(CentreContext)
  const {
    data: communityData,
    error: communityError,
    loading: communityLoading,
  } = useQuery(DISPLAY_COMMUNITY, {
    variables: { communityID: communityID },
  })

  if (communityError) {
    return <ErrorScreen />
  } else if (communityLoading) {
    // Spinner Icon for Loading Screens
    return <LoadingScreen />
  }

  const {
    displayCommunity,
    communityMemberCount,
    communityCentreCount,
  } = communityData
  return (
    <div>
      <NavBar />
      <DisplayChurchDetails
        name={displayCommunity.name}
        // leaderTitle={displayCommunity.leader.title[0].Title.title}
        leaderTitle="Community Leader"
        membership={communityMemberCount}
        leaderName={
          displayCommunity.leader
            ? `${displayCommunity.leader.firstName} ${displayCommunity.leader.lastName}`
            : '-'
        }
        churchHeading="No of Centres"
        churchType="Community"
        subChurch="Centre"
        subChurchSetter={setCentreID}
        churchNo={communityCentreCount}
        buttons={displayCommunity.centres}
      />
    </div>
  )
}
