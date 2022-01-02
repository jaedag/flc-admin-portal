import { useQuery } from '@apollo/client'
import BaseComponent from 'components/base-component/BaseComponent'
import DisplayChurchDetails from 'components/DisplayChurchDetails/DisplayChurchDetails'
import { ChurchContext } from 'contexts/ChurchContext'
import React, { useContext, useEffect } from 'react'
import { DISPLAY_COUNCIL } from './ReadQueries'

const DetailsCouncil = () => {
  const { councilId, setChurch } = useContext(ChurchContext)

  const { data, loading, error } = useQuery(DISPLAY_COUNCIL, {
    variables: { id: councilId },
  })

  const council = data?.councils[0]
  let breadcrumb = [council?.stream, council]
  useEffect(() => {
    setChurch({ church: council?.stream_name, subChurch: 'bacenta' })
  }, [council?.stream_name])

  const details = [
    { title: 'Pastors', number: council?.pastorCount, link: '#' },
    {
      title: 'Bacentas',
      number: council?.bacentaCount,
      link: `#`,
    },
    {
      title: 'Fellowships',
      number: council?.fellowshipCount,
      link: '#',
    },
  ]

  return (
    <BaseComponent loading={loading} error={error} data={data} placeholder>
      <DisplayChurchDetails
        name={council?.name}
        leaderTitle="Council Overseer"
        churchId={councilId}
        leader={council?.leader}
        churchHeading="Constituencies"
        churchType={council?.__typename}
        subChurch="Constituency"
        membership={council?.memberCount}
        details={details}
        churchCount={council?.constituencyCount}
        editlink="/council/editcouncil"
        editPermitted={['adminFederal']}
        history={council?.history.length !== 0 && council?.history}
        buttons={council ? council.constituencies : []}
        breadcrumb={breadcrumb && breadcrumb}
        loading={loading}
      />
    </BaseComponent>
  )
}

export default DetailsCouncil
