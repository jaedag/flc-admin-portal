import { useQuery } from '@apollo/client'
import BaseComponent from 'components/base-component/BaseComponent'
import DisplayChurchDetails from 'components/DisplayChurchDetails/DisplayChurchDetails'
import { ChurchContext } from 'contexts/ChurchContext'
import { capitalise } from 'global-utils'
import React, { useContext } from 'react'
import { DISPLAY_STREAM } from './ReadQueries'

const DetailsStream = () => {
  const { streamId, church } = useContext(ChurchContext)

  const { data, loading, error } = useQuery(DISPLAY_STREAM, {
    variables: { id: streamId },
  })

  const stream = data?.streams[0]
  let breadcrumb = [stream?.leader, stream]
  const details = [
    { title: 'Pastors', number: stream?.pastorCount || '0', link: '#' },
    {
      title: 'Constituencies',
      number: stream?.constituencyCount,
      link: `/${church.church}/displayall`,
    },
    {
      title: 'Bacenta',
      number: stream?.bacentaCount,
      link: `#`,
    },
    {
      title: 'Fellowships',
      number: stream?.fellowshipCount,
      link: '#',
    },
  ]

  return (
    <BaseComponent loading={loading} error={error} data={data} placeholder>
      <DisplayChurchDetails
        name={stream?.name}
        leaderTitle="Bishop"
        deatils={streamId}
        leader={stream?.leader}
        churchHeading="Constituencies"
        churchType={stream?.__typename}
        subChurch={capitalise(church.church)}
        membership={stream?.memberCount}
        details={details}
        churchCount={stream?.constituencyCount}
        editlink="/stream/editstream"
        editPermitted={['adminFederal']}
        history={stream?.history.length !== 0 && stream?.history}
        buttons={stream?.councils ?? []}
        breadcrumb={breadcrumb && breadcrumb}
        loading={loading}
      />
    </BaseComponent>
  )
}

export default DetailsStream
