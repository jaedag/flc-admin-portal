import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import { MembersGrid } from '../../components/MembersGrid.jsx'
import { GET_BACENTA_MEMBERS } from '../../queries/GridQueries'
import { ChurchContext } from '../../contexts/ChurchContext'

export const BacentaMembers = () => {
  const { bacentaId } = useContext(ChurchContext)
  const { data, loading, error } = useQuery(GET_BACENTA_MEMBERS, {
    variables: { id: bacentaId },
  })

  return (
    <MembersGrid
      title={data ? `${data.displayBacenta?.name} Bacenta` : null}
      memberData={data?.bacentaMemberList}
      memberLoading={loading}
      memberError={error}
    />
  )
}
