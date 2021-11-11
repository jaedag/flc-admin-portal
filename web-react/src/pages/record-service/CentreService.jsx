import React, { useContext } from 'react'
import { ChurchContext } from '../../contexts/ChurchContext'

import { useMutation, useQuery } from '@apollo/client'
import { RECORD_SERVICE } from './RecordServiceMutations'
import { DISPLAY_CENTRE } from '../display/ReadQueries'
import ServiceForm from './ServiceForm'
import BaseComponent from 'components/base-component/BaseComponent'

const CentreService = () => {
  const { centreId } = useContext(ChurchContext)
  const {
    data: centreData,
    loading: centreLoading,
    error: centreError,
  } = useQuery(DISPLAY_CENTRE, { variables: { id: centreId } })
  const [RecordService] = useMutation(RECORD_SERVICE)

  return (
    <BaseComponent
      loadingState={centreLoading}
      errorState={centreError}
      data={centreData}
    >
      <ServiceForm
        RecordServiceMutation={RecordService}
        church={centreData?.centres[0]}
        churchId={centreId}
        churchType="centre"
      />
    </BaseComponent>
  )
}

export default CentreService
