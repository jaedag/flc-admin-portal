import React, { useContext } from 'react'
import { ChurchContext } from '../../contexts/ChurchContext'
import NavBar from '../../components/nav/NavBar'
import { useQuery } from '@apollo/client'
import { DISPLAY_CAMPUS_SERVICE } from './RecordServiceMutations'
import LoadingScreen from '../../components/LoadingScreen'
import ErrorScreen from '../../components/ErrorScreen'
import { ServiceContext } from 'contexts/ServiceContext'

import ServiceDetails from './ServiceDetails'

const CampusServiceDetails = () => {
  const { campusId } = useContext(ChurchContext)
  const { serviceRecordId } = useContext(ServiceContext)
  const { data: data, loading: loading, error: error } = useQuery(
    DISPLAY_CAMPUS_SERVICE,
    {
      variables: { serviceId: serviceRecordId, campusId: campusId },
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
        church={data.campuses[0]}
      />
    </>
  )
}

export default CampusServiceDetails
