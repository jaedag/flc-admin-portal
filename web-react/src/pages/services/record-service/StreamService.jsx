import React, { useContext } from 'react'
import { ChurchContext } from '../../../contexts/ChurchContext'

import { useMutation, useQuery } from '@apollo/client'
import { RECORD_SERVICE } from './RecordServiceMutations'
import { DISPLAY_STREAM } from '../../directory/display/ReadQueries'
import ServiceForm from './ServiceForm'
import BaseComponent from 'components/base-component/BaseComponent'

const StreamService = () => {
  const { streamId } = useContext(ChurchContext)
  const { data, loading, error } = useQuery(DISPLAY_STREAM, {
    variables: { id: streamId },
  })
  const [RecordService] = useMutation(RECORD_SERVICE)

  return (
    <BaseComponent loading={loading} error={error} data={data}>
      <ServiceForm
        RecordServiceMutation={RecordService}
        church={data?.streams[0]}
        churchId={streamId}
        churchType="stream"
      />
    </BaseComponent>
  )
}

export default StreamService
