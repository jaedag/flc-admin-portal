import React, { useContext } from 'react'
import { ChurchContext } from '../../contexts/ChurchContext'
import NavBar from '../../components/nav/NavBar'
import { useMutation, useQuery } from '@apollo/client'
import { RECORD_SERVICE } from '././RecordServiceMutations'
import { DISPLAY_BACENTA } from '../display/ReadQueries'
import LoadingScreen from '../../components/LoadingScreen'
import ErrorScreen from '../../components/ErrorScreen'
import ServiceForm from './ServiceForm'

const BacentaService = () => {
  const { bacentaId } = useContext(ChurchContext)
  const {
    data: bacentaData,
    loading: bacentaLoading,
    error: bacentaError,
  } = useQuery(DISPLAY_BACENTA, { variables: { id: bacentaId } })
  const [RecordService] = useMutation(RECORD_SERVICE)

  if (bacentaLoading) {
    return <LoadingScreen />
  } else if (bacentaError) {
    return <ErrorScreen />
  }

  return (
    <>
      <NavBar />
      <ServiceForm
        RecordServiceMutation={RecordService}
        church={bacentaData.bacentas[0]}
        churchId={bacentaId}
        churchType="bacenta"
      />
    </>
  )
}

export default BacentaService
