import React, { useContext } from 'react'
import { ChurchContext } from '../../contexts/ChurchContext'
import NavBar from '../../components/nav/NavBar'
import { useQuery } from '@apollo/client'
import { DISPLAY_CENTRE_SERVICE } from './RecordServiceMutations'
import LoadingScreen from '../../components/base-component/LoadingScreen'
import ErrorScreen from '../../components/base-component/ErrorScreen'
import { ServiceContext } from 'contexts/ServiceContext'

import ServiceDetails from './ServiceDetails'

const CentreServiceDetails = () => {
  const { centreId } = useContext(ChurchContext)
  const { serviceRecordId } = useContext(ServiceContext)
  const { data: data, loading: loading, error: error } = useQuery(
    DISPLAY_CENTRE_SERVICE,
    {
      variables: { serviceId: serviceRecordId, centreId: centreId },
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
        church={data.centres[0]}
      />
    </>
  )
}

export default CentreServiceDetails
