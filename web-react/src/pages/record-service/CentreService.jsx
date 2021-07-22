import React, { useContext } from 'react'
import { ChurchContext } from '../../contexts/ChurchContext'
import NavBar from '../../components/nav/NavBar'
import { useMutation, useQuery } from '@apollo/client'
import { RECORD_SERVICE } from './RecordServiceMutations'
import { DISPLAY_CENTRE } from '../display/ReadQueries'
import LoadingScreen from '../../components/base-component/LoadingScreen'
import ErrorScreen from '../../components/base-component/ErrorScreen'
import ServiceForm from './ServiceForm'

const CentreService = () => {
  const { centreId } = useContext(ChurchContext)
  const {
    data: centreData,
    loading: centreLoading,
    error: centreError,
  } = useQuery(DISPLAY_CENTRE, { variables: { id: centreId } })
  const [RecordService] = useMutation(RECORD_SERVICE)

  if (centreLoading) {
    return <LoadingScreen />
  } else if (centreError) {
    return <ErrorScreen />
  }

  return (
    <>
      <NavBar />
      <ServiceForm
        RecordServiceMutation={RecordService}
        church={centreData.centres[0]}
        churchId={centreId}
        churchType="centre"
      />
    </>
  )
}

export default CentreService
