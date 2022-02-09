import React, { useContext } from 'react'
import { ChurchContext } from '../../../contexts/ChurchContext'

import { useQuery } from '@apollo/client'
import { DISPLAY_STREAM_SERVICE } from './RecordServiceMutations'
import { ServiceContext } from 'contexts/ServiceContext'

import ServiceDetails from './ServiceDetails'
import BaseComponent from 'components/base-component/BaseComponent'

const StreamServiceDetails = () => {
  const { streamId } = useContext(ChurchContext)
  const { serviceRecordId } = useContext(ServiceContext)
  const { data, loading, error } = useQuery(DISPLAY_STREAM_SERVICE, {
    variables: { serviceId: serviceRecordId, streamId: streamId },
  })

  return (
    <BaseComponent loading={loading} error={error} data={data}>
      <ServiceDetails
        service={data?.serviceRecords[0]}
        church={data?.streams[0]}
      />
    </BaseComponent>
  )
}

export default StreamServiceDetails
