import React, { useContext } from 'react'
import { ChurchContext } from '../../contexts/ChurchContext'

import { useQuery } from '@apollo/client'
import { DISPLAY_BACENTA_SERVICE } from './RecordServiceMutations'
import { ServiceContext } from 'contexts/ServiceContext'

import ServiceDetails from './ServiceDetails'
import BaseComponent from 'components/base-component/BaseComponent'

const BacentaServiceDetails = () => {
  const { bacentaId } = useContext(ChurchContext)
  const { serviceRecordId } = useContext(ServiceContext)
  const { data, loading, error } = useQuery(DISPLAY_BACENTA_SERVICE, {
    variables: { serviceId: serviceRecordId, bacentaId: bacentaId },
  })

  return (
    <BaseComponent loadingState={loading} errorState={error} data={data}>
      <ServiceDetails
        service={data?.serviceRecords[0]}
        church={data?.bacentas[0]}
      />
    </BaseComponent>
  )
}

export default BacentaServiceDetails
