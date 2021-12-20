import { useQuery } from '@apollo/client'
import BaseComponent from 'components/base-component/BaseComponent'
import DisplayChurchDetails from 'components/DisplayChurchDetails/DisplayChurchDetails'
import { ChurchContext } from 'contexts/ChurchContext'
import React, { useContext } from 'react'
import { DISPLAY_GATHERING } from './ReadQueries'

const DetailsGatheringService = () => {
  const { gatheringId, church } = useContext(ChurchContext)

  const { data, loading, error } = useQuery(DISPLAY_GATHERING, {
    variables: { id: gatheringId },
  })

  const gathering = data?.gatheringServices[0]
  let breadcrumb = [gathering]
  const details = [
    { title: 'Pastors', number: gathering?.pastorCount || '0', link: '#' },
    {
      title: 'Councils',
      number: gathering?.councilCount,
      link: `#`,
    },
    {
      title: 'Constituencies',
      number: gathering?.constituencyCount,
      link: `/${church.church}/displayall`,
    },
    {
      title: 'Bacenta',
      number: gathering?.bacentaCount,
      link: `#`,
    },
    {
      title: 'Fellowships',
      number: gathering?.fellowshipCount,
      link: '#',
    },
  ]

  return (
    <BaseComponent loading={loading} error={error} data={data} placeholder>
      <DisplayChurchDetails
        name={gathering?.name}
        leaderTitle="Resident Bishop"
        churchId={gatheringId}
        leader={gathering?.leader}
        churchHeading="Streams"
        churchType={gathering?.__typename}
        subChurch="Stream"
        membership={gathering?.memberCount}
        details={details}
        churchCount={gathering?.streamCount}
        editlink="/stream/editstream"
        editPermitted={['adminFederal']}
        history={gathering?.history.length !== 0 && gathering?.history}
        buttons={gathering?.streams ?? []}
        breadcrumb={breadcrumb && breadcrumb}
        loading={loading}
      />
    </BaseComponent>
  )
}

export default DetailsGatheringService
