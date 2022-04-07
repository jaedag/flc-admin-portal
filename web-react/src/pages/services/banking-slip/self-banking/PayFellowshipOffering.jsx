import { useQuery } from '@apollo/client'
import { ChurchContext } from 'contexts/ChurchContext'
import React, { useContext } from 'react'
import { FELLOWSHIP_SERVICE_PAYMENT } from './bankingQueries'
import PayOffering from './PayOffering'

const PayFellowshipOffering = () => {
  const { fellowshipId } = useContext(ChurchContext)
  const { data, loading, error } = useQuery(FELLOWSHIP_SERVICE_PAYMENT, {
    variables: {
      id: fellowshipId,
    },
  })

  return (
    <PayOffering
      church={data?.fellowships[0]}
      loading={loading}
      error={error}
    />
  )
}

export default PayFellowshipOffering
