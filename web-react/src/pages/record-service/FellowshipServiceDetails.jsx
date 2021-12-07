import React, { useContext } from 'react'
import { ChurchContext } from '../../contexts/ChurchContext'

import { useQuery } from '@apollo/client'
import { DISPLAY_FELLOWSHIP_SERVICE } from './RecordServiceMutations'
import { ServiceContext } from 'contexts/ServiceContext'

import ServiceDetails from './ServiceDetails'
import { throwErrorMsg } from 'global-utils'
import BaseComponent from 'components/base-component/BaseComponent'

const FellowshipServiceDetails = () => {
  const { fellowshipId } = useContext(ChurchContext)
  const { serviceRecordId } = useContext(ServiceContext)
  const { data, loading, error } = useQuery(DISPLAY_FELLOWSHIP_SERVICE, {
    variables: { serviceId: serviceRecordId, fellowshipId: fellowshipId },
  })
  throwErrorMsg(error)

  return (
    <BaseComponent loading={loading} error={error} data={data} placeholder>
      <ServiceDetails
        loading={loading}
        service={data?.serviceRecords[0]}
        church={data?.fellowships[0]}
      />
    </BaseComponent>
  )
}

export default FellowshipServiceDetails
