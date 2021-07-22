import React, { useContext } from 'react'
import { ChurchContext } from '../../contexts/ChurchContext'
import NavBar from '../../components/nav/NavBar'
import { useMutation, useQuery } from '@apollo/client'
import { RECORD_SERVICE } from './RecordServiceMutations'
import { DISPLAY_CAMPUS } from '../display/ReadQueries'
import LoadingScreen from '../../components/base-component/LoadingScreen'
import ErrorScreen from '../../components/base-component/ErrorScreen'
import ServiceForm from './ServiceForm'

const CampusService = () => {
  const { campusId } = useContext(ChurchContext)
  const {
    data: campusData,
    loading: campusLoading,
    error: campusError,
  } = useQuery(DISPLAY_CAMPUS, { variables: { id: campusId } })
  const [RecordService] = useMutation(RECORD_SERVICE)

  if (campusLoading) {
    return <LoadingScreen />
  } else if (campusError) {
    return <ErrorScreen />
  }

  return (
    <>
      <NavBar />
      <ServiceForm
        RecordServiceMutation={RecordService}
        church={campusData.campuses[0]}
        churchId={campusId}
        churchType="campus"
      />
    </>
  )
}

export default CampusService
