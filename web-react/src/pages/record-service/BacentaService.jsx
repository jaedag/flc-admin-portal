import React, { useContext } from 'react'
import { ChurchContext } from '../../contexts/ChurchContext'
import NavBar from '../../components/nav/NavBar'
import { useMutation, useQuery } from '@apollo/client'
import { RECORD_SERVICE } from '././RecordServiceMutations'
import { DISPLAY_BACENTA } from '../display/ReadQueries'
import ServiceForm from './ServiceForm'
import BaseComponent from 'components/base-component/BaseComponent'

const BacentaService = () => {
  const { bacentaId } = useContext(ChurchContext)
  const { data, loading, error } = useQuery(DISPLAY_BACENTA, {
    variables: { id: bacentaId },
  })
  const [RecordService] = useMutation(RECORD_SERVICE)

  return (
    <BaseComponent loadingState={loading} errorState={error} data={data}>
      <NavBar />
      <ServiceForm
        RecordServiceMutation={RecordService}
        church={data?.bacentas[0]}
        churchId={bacentaId}
        churchType="bacenta"
      />
    </BaseComponent>
  )
}

export default BacentaService
