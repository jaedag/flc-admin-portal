import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import DisplayChurchDetails from '../../../components/DisplayChurchDetails/DisplayChurchDetails'

import { DISPLAY_BACENTA } from './ReadQueries'
import { ChurchContext } from '../../../contexts/ChurchContext'
import BaseComponent from 'components/base-component/BaseComponent'
import { permitAdminAndThoseAbove } from 'global-utils'

const DetailsBacenta = () => {
  const { bacentaId } = useContext(ChurchContext)
  const { data, loading, error } = useQuery(DISPLAY_BACENTA, {
    variables: { id: bacentaId },
  })

  const bacenta = data?.bacentas[0]

  let breadcrumb = [
    bacenta?.constituency.council,
    bacenta?.constituency,
    bacenta,
  ]

  let bacentaStatus = data && 'Graduated'

  if (bacenta?.labels.includes('IC')) {
    bacentaStatus = 'IC'
  }

  const details = [
    {
      title: 'Type',
      number: bacentaStatus,
      link: `#`,
      width: 'auto',
    },
  ]

  return (
    <BaseComponent loading={loading} error={error} data={data} placeholder>
      <DisplayChurchDetails
        details={details}
        loading={loading}
        name={bacenta?.name}
        leaderTitle="Bacenta Leader"
        leader={bacenta?.leader}
        churchId={bacentaId}
        churchHeading="Fellowships"
        churchType="Bacenta"
        subChurch="Fellowship"
        membership={bacenta?.memberCount}
        churchCount={bacenta?.fellowships.length}
        editlink="/bacenta/editbacenta"
        editPermitted={permitAdminAndThoseAbove('Constituency')}
        history={bacenta?.history.length !== 0 && bacenta?.history}
        breadcrumb={breadcrumb && breadcrumb}
        buttons={bacenta ? bacenta?.fellowships : []}
      />
    </BaseComponent>
  )
}

export default DetailsBacenta
