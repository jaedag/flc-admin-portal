import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import MembersGrid from '../../components/members-grids/MembersGrid'
import { GET_CAMPUSTOWN_MEMBERS } from './GridQueries'
import { ChurchContext } from '../../contexts/ChurchContext'

export const ConstituencyMembers = () => {
  const { constituencyId } = useContext(ChurchContext)

  const { data, loading, error } = useQuery(GET_CAMPUSTOWN_MEMBERS, {
    variables: { id: constituencyId },
  })

  return (
    <MembersGrid
      title={data ? `${data?.constituencies[0]?.name} Constituency` : null}
      memberData={data?.constituencies[0]?.members}
      memberLoading={loading}
      memberError={error}
    />
  )
}

export default ConstituencyMembers
