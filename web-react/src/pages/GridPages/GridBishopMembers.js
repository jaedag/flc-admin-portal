import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import { MembersGrid } from '../../components/MembersGrid'
import { GET_BISHOP_MEMBERS } from '../../queries/GridQueries'
import { ChurchContext } from '../../contexts/ChurchContext'

export const GridBishopMembers = () => {
  const { bishopId } = useContext(ChurchContext)
  const { data, loading, error } = useQuery(GET_BISHOP_MEMBERS, {
    variables: { id: bishopId },
  })

  return (
    <MembersGrid
      memberData={data && data.bishopMemberList}
      memberLoading={loading}
      memberError={error}
    />
  )
}
