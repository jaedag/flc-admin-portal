import React, { useContext } from 'react'
import { ChurchContext } from '../../contexts/ChurchContext'
import NavBar from '../../components/nav/NavBar'
import { useQuery } from '@apollo/client'
import { DISPLAY_BACENTA_SERVICE } from './RecordServiceMutations'
import LoadingScreen from '../../components/LoadingScreen'
import ErrorScreen from '../../components/ErrorScreen'
import { ServiceContext } from 'contexts/ServiceContext'

import ServiceDetails from './ServiceDetails'

const BacentaServiceDetails = () => {
  const { bacentaId } = useContext(ChurchContext)
  const { serviceRecordId } = useContext(ServiceContext)
  const { data: data, loading: loading, error: error } = useQuery(
    DISPLAY_BACENTA_SERVICE,
    {
      variables: { serviceId: serviceRecordId, bacentaId: bacentaId },
    }
  )

  if (loading) {
    return <LoadingScreen />
  } else if (error) {
    return <ErrorScreen />
  }

  return (
    <>
      <NavBar />
      <ServiceDetails
        service={data.serviceRecords[0]}
        church={data.bacentas[0]}
      />
    </>
  )
}

export default BacentaServiceDetails
