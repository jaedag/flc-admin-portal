import React, { useContext } from 'react'
import { ChurchContext } from '../../../contexts/ChurchContext'

import { useMutation, useQuery } from '@apollo/client'
import { RECORD_SERVICE } from './RecordServiceMutations'
import { DISPLAY_BACENTA } from '../../directory/display/ReadQueries'
import ServiceForm from './ServiceForm'
import BaseComponent from 'components/base-component/BaseComponent'

const BacentaService = () => {
  const { bacentaId } = useContext(ChurchContext)
  const {
    data: bacentaData,
    loading: bacentaLoading,
    error: bacentaError,
  } = useQuery(DISPLAY_BACENTA, { variables: { id: bacentaId } })
  const [RecordService] = useMutation(RECORD_SERVICE)

  return (
    <BaseComponent
      loading={bacentaLoading}
      error={bacentaError}
      data={bacentaData}
    >
      <ServiceForm
        RecordServiceMutation={RecordService}
        church={bacentaData?.bacentas[0]}
        churchId={bacentaId}
        churchType="bacenta"
      />
    </BaseComponent>
  )
}

export default BacentaService
