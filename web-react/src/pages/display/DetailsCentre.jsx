import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import DisplayChurchDetails from '../../components/DisplayChurchDetails/DisplayChurchDetails'

import { DISPLAY_CENTRE } from './ReadQueries'
import { ChurchContext } from '../../contexts/ChurchContext'
import BaseComponent from 'components/base-component/BaseComponent'

const DetailsCentre = () => {
  const { centreId } = useContext(ChurchContext)
  const { data, loading, error } = useQuery(DISPLAY_CENTRE, {
    variables: { id: centreId },
  })

  const displayCentre = data?.centres[0]

  let breadcrumb = [
    displayCentre?.town
      ? displayCentre?.town.bishop
      : displayCentre?.campus.bishop,
    displayCentre?.town ? displayCentre?.town : displayCentre?.campus,
    displayCentre,
  ]
  return (
    <BaseComponent loadingState={loading} errorState={error} data={data}>
      <DisplayChurchDetails
        name={displayCentre?.name}
        leaderTitle="Centre Leader"
        leaderName={
          displayCentre?.leader
            ? `${displayCentre?.leader.firstName} ${displayCentre?.leader.lastName}`
            : '-'
        }
        leaderId={displayCentre?.leader?.id}
        churchHeading="Bacentas"
        churchType="Centre"
        subChurch="Bacenta"
        membership={data?.centreMemberCount}
        churchCount={displayCentre?.bacentas.length}
        editlink="/centre/editcentre"
        editPermitted={[
          'leaderCentre',
          'leaderCampus',
          'leaderTown',
          'adminCampus',
          'adminTown',
          'adminBishop',
          'adminFederal',
        ]}
        history={displayCentre?.history.length !== 0 && displayCentre?.history}
        breadcrumb={breadcrumb && breadcrumb}
        buttons={displayCentre ? displayCentre?.bacentas : []}
      />
    </BaseComponent>
  )
}

export default DetailsCentre
