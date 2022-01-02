import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import MembersGrid from '../../../components/members-grids/MembersGrid'
import { GET_SONTA_MEMBERS } from './GridQueries'
import { ChurchContext } from '../../../contexts/ChurchContext'

const SontaMembers = () => {
  const { sontaId } = useContext(ChurchContext)

  const { data, loading, error } = useQuery(GET_SONTA_MEMBERS, {
    variables: { id: sontaId },
  })

  return (
    <MembersGrid
      title={data ? `${data.sontas[0]?.name} Sonta` : null}
      memberData={data?.sontas[0]?.members}
      memberLoading={loading}
      memberError={error}
    />
  )
}

export default SontaMembers
