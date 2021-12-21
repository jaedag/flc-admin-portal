import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import { capitalise } from '../../global-utils'
import DisplayChurchDetails from '../../components/DisplayChurchDetails/DisplayChurchDetails'

import { DISPLAY_CONSTITUENCY } from './ReadQueries'
import { ChurchContext } from '../../contexts/ChurchContext'
import BaseComponent from 'components/base-component/BaseComponent'

const DetailsConstituency = () => {
  const { church, constituencyId } = useContext(ChurchContext)

  const { data, loading, error } = useQuery(DISPLAY_CONSTITUENCY, {
    variables: { id: constituencyId },
  })

  return (
    <BaseComponent loading={loading} error={error} data={data}>
      <>
        <DisplayChurchDetails
          name={data?.constituencies[0].name}
          leaderTitle={'Constituency Overseer'}
          membership={data?.constituencies[0].memberCount}
          leader={data?.constituencies[0].leader}
          churchId={constituencyId}
          churchHeading="Bacentas"
          church2Heading="Fellowships"
          churchCount={data?.constituencies[0].bacentas.length}
          church2Count={data?.constituencies[0].fellowshipCount}
          admin={data?.constituencies[0].admin}
          churchType={`${capitalise(church.church)}`}
          subChurch={`${capitalise(church.subChurch)}`}
          subChurchBasonta="Sonta"
          buttons={data?.constituencies[0].bacentas}
          buttonsSecondRow={data?.constituencies[0].sontas}
          editlink="/town/edittown"
          editPermitted={['adminCouncil', 'adminFederal']}
          history={
            data?.constituencies[0]?.history.length !== 0 &&
            data?.constituencies[0]?.history
          }
          breadcrumb={[
            data?.constituencies[0]?.council,
            data?.constituencies[0],
          ]}
        />
      </>
    </BaseComponent>
  )
}

export default DetailsConstituency
