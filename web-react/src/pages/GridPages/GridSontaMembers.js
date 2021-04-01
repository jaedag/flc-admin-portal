import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import { MembersGrid } from '../../components/MembersGrid'
import { GET_SONTA_MEMBERS } from '../../queries/GridQueries'
import { ChurchContext } from '../../contexts/ChurchContext'

export const GridSontaMembers = () => {
  const { sontaId } = useContext(ChurchContext)

  const { data, loading, error } = useQuery(GET_SONTA_MEMBERS, {
    variables: { id: sontaId },
  })

  console.log(error)
  return (
    <MembersGrid
      title={data ? `${data.displaySonta?.name} Sonta` : null}
      memberData={data?.sontaMemberList}
      memberLoading={loading}
      memberError={error}
    />
  )
}
