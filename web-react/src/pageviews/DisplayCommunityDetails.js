import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import { DisplayChurchDetails } from '../components/DisplayChurchDetails'
import { NavBar } from '../components/NavBar'
import SpinnerPage from '../components/SpinnerPage'
import { DISPLAY_COMMUNITY } from '../queries/DisplayQueries'
import { CentreContext, CommunityContext } from '../context/ChurchContext'

export const DisplayCommunityDetails = () => {
  const { communityID } = useContext(CommunityContext)
  const { setCentreID } = useContext(CentreContext)
  const {
    data: communityData,
    error: communityError,
    loading: communityLoading,
  } = useQuery(DISPLAY_COMMUNITY, {
    variables: { communityID: communityID },
  })

  if (communityError) {
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
  } else if (communityLoading) {
    // Spinner Icon for Loading Screens
    return (
      <React.Fragment>
        <NavBar />
        <SpinnerPage />
      </React.Fragment>
    )
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
        leaderName={`${displayCommunity.leader.firstName} ${displayCommunity.leader.lastName}`}
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
