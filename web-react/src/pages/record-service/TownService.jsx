import React, { useContext } from 'react'
import { ChurchContext } from '../../contexts/ChurchContext'
import NavBar from '../../components/nav/NavBar'
import { useMutation, useQuery } from '@apollo/client'
import { RECORD_SERVICE } from './RecordServiceMutations'
import { DISPLAY_TOWN } from '../display/ReadQueries'
import LoadingScreen from '../../components/base-component/LoadingScreen'
import ErrorScreen from '../../components/base-component/ErrorScreen'
import ServiceForm from './ServiceForm'

const TownService = () => {
  const { townId } = useContext(ChurchContext)
  const {
    data: townData,
    loading: townLoading,
    error: townError,
  } = useQuery(DISPLAY_TOWN, { variables: { id: townId } })
  const [RecordService] = useMutation(RECORD_SERVICE)

  if (townLoading) {
    return <LoadingScreen />
  } else if (townError) {
    return <ErrorScreen />
  }

  return (
    <>
      <NavBar />
      <ServiceForm
        RecordServiceMutation={RecordService}
        church={townData.towns[0]}
        churchId={townId}
        churchType="town"
      />
    </>
  )
}

export default TownService
