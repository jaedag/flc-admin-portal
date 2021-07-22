import React, { useContext } from 'react'
import { ChurchContext } from '../../contexts/ChurchContext'
import NavBar from '../../components/nav/NavBar'
import { useMutation, useQuery } from '@apollo/client'
import { RECORD_SERVICE_NO_OFFERING } from './RecordServiceMutations'
import { DISPLAY_SONTA } from '../display/ReadQueries'
import LoadingScreen from '../../components/base-component/LoadingScreen'
import ErrorScreen from '../../components/base-component/ErrorScreen'
import ServiceFormNoOffering from './ServiceFormNoOffering'

const SontaService = () => {
  const { sontaId } = useContext(ChurchContext)
  const {
    data: sontaData,
    loading: sontaLoading,
    error: sontaError,
  } = useQuery(DISPLAY_SONTA, { variables: { id: sontaId } })
  const [RecordServiceNoOffering] = useMutation(RECORD_SERVICE_NO_OFFERING)

  if (sontaLoading) {
    return <LoadingScreen />
  } else if (sontaError) {
    return <ErrorScreen />
  } else {
    return (
      <>
        <NavBar />
        <ServiceFormNoOffering
          RecordServiceMutation={RecordServiceNoOffering}
          church={sontaData.sontas[0]}
          churchId={sontaId}
          churchType="sonta"
        />
      </>
    )
  }
}

export default SontaService
