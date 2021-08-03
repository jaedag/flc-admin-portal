import React, { useContext } from 'react'
import { ChurchContext } from '../../contexts/ChurchContext'
import NavBar from '../../components/nav/NavBar'
import { useQuery } from '@apollo/client'
import { DISPLAY_SONTA_SERVICE } from './RecordServiceMutations'
import { ServiceContext } from 'contexts/ServiceContext'

import ServiceDetails from './ServiceDetails'
import BaseComponent from 'components/base-component/BaseComponent'

const SontaServiceDetails = () => {
  const { sontaId } = useContext(ChurchContext)
  const { serviceRecordId } = useContext(ServiceContext)
  const { data: data, loading: loading, error: error } = useQuery(
    DISPLAY_SONTA_SERVICE,
    {
      variables: { serviceId: serviceRecordId, sontaId: sontaId },
    }
  )

  return (
    <BaseComponent loadingState={loading} errorState={error} data={data}>
      <NavBar />
      <ServiceDetails
        service={data?.serviceRecords[0]}
        church={data?.sontas[0]}
      />
    </BaseComponent>
  )
}

export default SontaServiceDetails
