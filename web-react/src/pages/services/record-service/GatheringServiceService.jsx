import React, { useContext } from 'react'
import { ChurchContext } from '../../../contexts/ChurchContext'

import { useMutation, useQuery } from '@apollo/client'
import { RECORD_SERVICE } from './RecordServiceMutations'
import { DISPLAY_GATHERINGSERVICE } from '../../directory/display/ReadQueries'
import ServiceForm from './ServiceForm'
import BaseComponent from 'components/base-component/BaseComponent'

const GatheringServiceService = () => {
  const { gatheringServiceId } = useContext(ChurchContext)
  const { data, loading, error } = useQuery(DISPLAY_GATHERINGSERVICE, {
    variables: { id: gatheringServiceId },
  })
  const [RecordService] = useMutation(RECORD_SERVICE)

  return (
    <BaseComponent loading={loading} error={error} data={data}>
      <ServiceForm
        RecordServiceMutation={RecordService}
        church={data?.gatheringServices[0]}
        churchId={gatheringServiceId}
        churchType="gatheringService"
      />
    </BaseComponent>
  )
}

export default GatheringServiceService
