import { useQuery } from '@apollo/client'
import BaseComponent from 'components/base-component/BaseComponent'
import DisplayChurchDetails from 'components/DisplayChurchDetails/DisplayChurchDetails'
import { ChurchContext } from 'contexts/ChurchContext'
import { capitalise, plural } from 'global-utils'
import React, { useContext } from 'react'
import { DISPLAY_COUNCIL } from './ReadQueries'

const DetailsCouncil = () => {
  const { councilId, church } = useContext(ChurchContext)
  const { data, loading, error } = useQuery(DISPLAY_COUNCIL, {
    variable: { id: councilId },
  })

  const council = data?.councils[0]
  let breadcrumb = [council?.leader, council]
  return (
    <BaseComponent
      loadingState={loading}
      errorState={error}
      data={data}
      placeholder
    >
      <DisplayChurchDetails
        name={council?.name}
        leaderTitle="Bishop"
        leader={council?.leader}
        churchHeading="Constituencies"
        churchType={council?.__typename}
        subChurch={capitalise(church.church)}
        membership={council?.memberCount}
        churchCount={council.constituencyCount}
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
