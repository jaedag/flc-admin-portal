import React, { useContext } from 'react'
import { ChurchContext } from '../../contexts/ChurchContext'

import { useMutation, useQuery } from '@apollo/client'
import { RECORD_SERVICE } from './RecordServiceMutations'
import { DISPLAY_CONSTITUENCY } from '../display/ReadQueries'
import ServiceForm from './ServiceForm'
import BaseComponent from 'components/base-component/BaseComponent'

const TownService = () => {
  const { townId } = useContext(ChurchContext)
  const {
    data: townData,
    loading: townLoading,
    error: townError,
  } = useQuery(DISPLAY_CONSTITUENCY, { variables: { id: townId } })
  const [RecordService] = useMutation(RECORD_SERVICE)

  return (
    <BaseComponent loading={townLoading} error={townError} data={townData}>
      <ServiceForm
        RecordServiceMutation={RecordService}
        church={townData?.towns[0]}
        churchId={townId}
        churchType="town"
      />
    </BaseComponent>
  )
}

export default TownService
