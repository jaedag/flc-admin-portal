import React, { useContext } from 'react'
import { ChurchContext } from '../../contexts/ChurchContext'
import NavBar from '../../components/nav/NavBar'
import { useMutation, useQuery } from '@apollo/client'
import { RECORD_CANCELLED_SERVICE } from './RecordServiceMutations'
import { DISPLAY_BACENTA } from '../display/ReadQueries'
import CancelledServiceForm from './CancelledServiceForm'
import BaseComponent from 'components/base-component/BaseComponent'

const BacentaServiceCancelled = () => {
  const { bacentaId } = useContext(ChurchContext)
  const { data, loading, error } = useQuery(DISPLAY_BACENTA, {
    variables: { id: bacentaId },
  })
  const [RecordCancelledService] = useMutation(RECORD_CANCELLED_SERVICE)

  return (
    <BaseComponent loadingState={loading} errorState={error} data={data}>
      <NavBar />
      <CancelledServiceForm
        RecordServiceMutation={RecordCancelledService}
        church={data?.bacentas[0]}
        churchId={bacentaId}
        churchType="bacenta"
      />
    </BaseComponent>
  )
}

export default BacentaServiceCancelled
