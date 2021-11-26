import React, { useContext } from 'react'
import { ChurchContext } from '../../contexts/ChurchContext'

import { useMutation, useQuery } from '@apollo/client'
import { RECORD_SERVICE } from './RecordServiceMutations'
import { DISPLAY_CAMPUS } from '../display/ReadQueries'
import ServiceForm from './ServiceForm'
import BaseComponent from 'components/base-component/BaseComponent'

const CampusService = () => {
  const { campusId } = useContext(ChurchContext)
  const { data, loading, error } = useQuery(DISPLAY_CAMPUS, {
    variables: { id: campusId },
  })
  const [RecordService] = useMutation(RECORD_SERVICE)

  return (
    <BaseComponent loading={loading} error={error} data={data}>
      <ServiceForm
        RecordServiceMutation={RecordService}
        church={data?.campuses[0]}
        churchId={campusId}
        churchType="campus"
      />
    </BaseComponent>
  )
}

export default CampusService
