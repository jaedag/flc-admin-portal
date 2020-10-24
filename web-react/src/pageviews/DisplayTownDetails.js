import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import { DisplayChurchDetails } from '../components/DisplayChurchDetails'
import { NavBar } from '../components/NavBar'
import SpinnerPage from '../components/SpinnerPage'
import { DISPLAY_TOWN } from '../queries/DisplayQueries'
import { CommunityContext, TownContext } from '../context/ChurchContext'

export const DisplayTownDetails = () => {
  // const { churchHeading, churchNo, ...rest } = props

  const { townID } = useContext(TownContext)
  const { setCommunityID } = useContext(CommunityContext)

  const { data: townData, error: townError, loading: townLoading } = useQuery(
    DISPLAY_TOWN,
    {
      variables: { townID: townID },
    }
  )

  if (townError) {
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
  } else if (townLoading) {
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
        churchType="Town"
        subChurch="Community"
        subChurchSetter={setCommunityID}
        buttons={townData.displayTown.communities}
      />
    </div>
  )
}
