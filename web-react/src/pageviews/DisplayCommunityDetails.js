import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import { DisplayCentreSontaDetails } from '../components/DisplayCentreSontaDetails'
import { NavBar } from '../components/NavBar'
import SpinnerPage from '../components/SpinnerPage'
import { DISPLAY_COMMUNITY } from '../queries/DisplayQueries'
import { CommunityContext } from '../context/ChurchContext'

export const DisplayCommunityDetails = () => {
  // const { churchHeading, churchNo, ...rest } = props

  const { communityID } = useContext(CommunityContext)

  const {
    data: communityData,
    error: communityError,
    loading: communityLoading,
  } = useQuery(DISPLAY_COMMUNITY, {
    variables: { communityID: communityID },
  })
  console.log(communityData)

  const churchHeading = 'No of Centres'

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
  return (
    <div>
      <NavBar />
      <DisplayCentreSontaDetails
        name={communityData.displayCommunity.name}
        leaderTitle={communityData.displayCommunity.leader.title[0].Title.title}
        membership={communityData.communityMemberCount}
        leaderName={`${communityData.displayCommunity.leader.firstName} ${communityData.displayCommunity.leader.lastName}`}
        churchHeading={churchHeading}
        churchNo={communityData.communityCentreCount}
      />
    </div>
  )
}
