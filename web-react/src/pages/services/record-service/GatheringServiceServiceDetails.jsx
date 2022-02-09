import React, { useContext } from 'react'
import { ChurchContext } from '../../../contexts/ChurchContext'

import { useQuery } from '@apollo/client'
import { DISPLAY_GATHERINGSERVICE_SERVICE } from './RecordServiceMutations'
import { ServiceContext } from 'contexts/ServiceContext'

import ServiceDetails from './ServiceDetails'
import BaseComponent from 'components/base-component/BaseComponent'

const GatheringServiceServiceDetails = () => {
  const { gatheringServiceId } = useContext(ChurchContext)
  const { serviceRecordId } = useContext(ServiceContext)
  const { data, loading, error } = useQuery(DISPLAY_GATHERINGSERVICE_SERVICE, {
    variables: {
      serviceId: serviceRecordId,
      gatheringServiceId: gatheringServiceId,
    },
  })

  return (
    <BaseComponent loading={loading} error={error} data={data}>
      <ServiceDetails
        service={data?.serviceRecords[0]}
        church={data?.gatheringServices[0]}
      />
    </BaseComponent>
  )
}

export default GatheringServiceServiceDetails
