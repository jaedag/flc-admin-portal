import React, { useContext } from 'react'
import { ChurchContext } from '../../contexts/ChurchContext'

import { useQuery } from '@apollo/client'
import { DISPLAY_CONSTITUENCY_SERVICE } from './RecordServiceMutations'
import { ServiceContext } from 'contexts/ServiceContext'

import ServiceDetails from './ServiceDetails'
import BaseComponent from 'components/base-component/BaseComponent'

const ConstituencyServiceDetails = () => {
  const { constituencyId } = useContext(ChurchContext)
  const { serviceRecordId } = useContext(ServiceContext)
  const { data, loading, error } = useQuery(DISPLAY_CONSTITUENCY_SERVICE, {
    variables: { serviceId: serviceRecordId, constituencyId: constituencyId },
  })

  return (
    <BaseComponent loading={loading} error={error} data={data}>
      <ServiceDetails
        service={data?.serviceRecords[0]}
        church={data?.constituencies[0]}
      />
    </BaseComponent>
  )
}

export default ConstituencyServiceDetails
