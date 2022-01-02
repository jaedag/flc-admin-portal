import React, { useContext } from 'react'
import { ChurchContext } from '../../../contexts/ChurchContext'

import { useMutation, useQuery } from '@apollo/client'
import { RECORD_CANCELLED_SERVICE } from './RecordServiceMutations'
import { DISPLAY_FELLOWSHIP } from '../../directory/display/ReadQueries'
import CancelledServiceForm from './CancelledServiceForm'
import BaseComponent from 'components/base-component/BaseComponent'

const FellowshipServiceCancelled = () => {
  const { fellowshipId } = useContext(ChurchContext)
  const { data, loading, error } = useQuery(DISPLAY_FELLOWSHIP, {
    variables: { id: fellowshipId },
  })
  const [RecordCancelledService] = useMutation(RECORD_CANCELLED_SERVICE)

  return (
    <BaseComponent loading={loading} error={error} data={data} placeholder>
      <CancelledServiceForm
        RecordServiceMutation={RecordCancelledService}
        church={data?.fellowships[0]}
        churchId={fellowshipId}
        churchType="fellowship"
      />
    </BaseComponent>
  )
}

export default FellowshipServiceCancelled
