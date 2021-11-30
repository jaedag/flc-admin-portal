import { useQuery } from '@apollo/client'
import BaseComponent from 'components/base-component/BaseComponent'
import DisplayChurchDetails from 'components/DisplayChurchDetails/DisplayChurchDetails'
import { ChurchContext } from 'contexts/ChurchContext'
import { capitalise, plural } from 'global-utils'
import React, { useContext } from 'react'
import { DISPLAY_COUNCIL } from './ReadQueries'

const DetailsCouncil = () => {
  const { councilId, church } = useContext(ChurchContext)
  console.log(councilId)
  const { data, loading, error } = useQuery(DISPLAY_COUNCIL, {
    variables: { id: councilId },
  })

  const council = data?.councils[0]
  let breadcrumb = [council?.leader, council]

  const details = [
    { title: 'Pastors', number: council?.pastorCount, link: '#' },
    {
      title: 'Constituencies',
      number: council?.constituencyCount,
      link: `/${church.church}/displayall`,
    },
    {
      title: 'Centre',
      number: council?.centreCount,
      link: `#`,
    },
    {
      title: 'Bacentas',
      number: council?.bacentaCount,
      link: '#',
    },
  ]

  return (
    <BaseComponent loading={loading} error={error} data={data} placeholder>
      <DisplayChurchDetails
        name={council?.name}
        leaderTitle="Bishop"
        leader={council?.leader}
        churchHeading="Constituencies"
        churchType={council?.__typename}
        subChurch={capitalise(church.church)}
        membership={council?.memberCount}
        details={details}
        churchCount={council?.constituencyCount}
        editlink="/council/editcouncil"
        editPermitted={['adminFederal']}
        history={council?.history.length !== 0 && council?.history}
        buttons={council ? council[`${plural(church.church)}`] : []}
        breadcrumb={breadcrumb && breadcrumb}
        loading={loading}
      />
    </BaseComponent>
  )
}

export default DetailsCouncil
