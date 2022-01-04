import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import DisplayChurchDetails from '../../../components/DisplayChurchDetails/DisplayChurchDetails'

import { DISPLAY_BACENTA } from './ReadQueries'
import { ChurchContext } from '../../../contexts/ChurchContext'
import BaseComponent from 'components/base-component/BaseComponent'

const DetailsBacenta = () => {
  const { bacentaId } = useContext(ChurchContext)
  const { data, loading, error } = useQuery(DISPLAY_BACENTA, {
    variables: { id: bacentaId },
  })

  const displayBacenta = data?.bacentas[0]

  let breadcrumb = [
    displayBacenta?.constituency.council,
    displayBacenta?.constituency,
    displayBacenta,
  ]

  return (
    <BaseComponent loading={loading} error={error} data={data} placeholder>
      <DisplayChurchDetails
        name={displayBacenta?.name}
        leaderTitle="Bacenta Leader"
        leader={displayBacenta?.leader}
        churchId={bacentaId}
        churchHeading="Fellowships"
        churchType="Bacenta"
        subChurch="Fellowship"
        membership={displayBacenta?.memberCount}
        churchCount={displayBacenta?.fellowships.length}
        editlink="/bacenta/editbacenta"
        editPermitted={[
          'leaderConstituency',
          'adminConstituency',
          'adminCouncil',
          'adminGatheringService',
        ]}
        history={
          displayBacenta?.history.length !== 0 && displayBacenta?.history
        }
        breadcrumb={breadcrumb && breadcrumb}
        buttons={displayBacenta ? displayBacenta?.fellowships : []}
      />
    </BaseComponent>
  )
}

export default DetailsBacenta
