import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import DisplayChurchDetails from '../../components/DisplayChurchDetails/DisplayChurchDetails'
import NavBar from '../../components/nav/NavBar'
import { DISPLAY_CENTRE } from './ReadQueries'
import { ChurchContext } from '../../contexts/ChurchContext'
import BaseComponent from 'components/base-component/BaseComponent'

const DisplayCentreDetails = () => {
  const { centreId } = useContext(ChurchContext)
  const { data: centreData, loading: centreLoading } = useQuery(
    DISPLAY_CENTRE,
    {
      variables: { id: centreId },
    }
  )

  const displayCentre = centreData?.centres[0]
  const { centreMemberCount, centreBacentaCount } = centreData
  let breadcrumb = [
    displayCentre.town
      ? displayCentre.town.bishop
      : displayCentre.campus.bishop,
    displayCentre.town ? displayCentre.town : displayCentre.campus,
    displayCentre,
  ]
  return (
    <BaseComponent loadingState={centreLoading}>
      <NavBar />
      <DisplayChurchDetails
        name={displayCentre?.name}
        leaderTitle="Centre Leader"
        leaderName={
          displayCentre?.leader
            ? `${displayCentre.leader.firstName} ${displayCentre.leader.lastName}`
            : '-'
        }
        leaderId={displayCentre?.leader?.id}
        churchHeading="No of Bacentas"
        churchType="Centre"
        subChurch="Bacenta"
        membership={centreMemberCount}
        churchNo={centreBacentaCount}
        editlink="/centre/editcentre"
        history={displayCentre?.history.length !== 0 && displayCentre?.history}
        breadcrumb={breadcrumb && breadcrumb}
        buttons={displayCentre ? displayCentre.bacentas : []}
      />
    </BaseComponent>
  )
}

export default DisplayCentreDetails
