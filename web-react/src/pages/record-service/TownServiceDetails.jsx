import React, { useContext } from 'react'
import { ChurchContext } from '../../contexts/ChurchContext'

import { useQuery } from '@apollo/client'
import { DISPLAY_TOWN_SERVICE } from './RecordServiceMutations'
import { ServiceContext } from 'contexts/ServiceContext'

import ServiceDetails from './ServiceDetails'
import BaseComponent from 'components/base-component/BaseComponent'

const TownServiceDetails = () => {
  const { townId } = useContext(ChurchContext)
  const { serviceRecordId } = useContext(ServiceContext)
  const { data, loading, error } = useQuery(DISPLAY_TOWN_SERVICE, {
    variables: { serviceId: serviceRecordId, townId: townId },
  })

  return (
    <BaseComponent loading={loading} error={error} data={data}>
      <ServiceDetails
        service={data?.serviceRecords[0]}
        church={data?.towns[0]}
      />
    </BaseComponent>
  )
}

export default TownServiceDetails
