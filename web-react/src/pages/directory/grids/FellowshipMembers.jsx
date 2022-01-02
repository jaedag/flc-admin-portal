import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import MembersGrid from '../../../components/members-grids/MembersGrid'
import { GET_FELLOWSHIP_MEMBERS } from './GridQueries'
import { ChurchContext } from '../../../contexts/ChurchContext'

const FellowshipMembers = () => {
  const { fellowshipId } = useContext(ChurchContext)
  const { data, loading, error } = useQuery(GET_FELLOWSHIP_MEMBERS, {
    variables: { id: fellowshipId },
  })

  return (
    <MembersGrid
      title={data ? `${data.fellowships[0]?.name} Fellowship Membership` : null}
      memberData={data?.fellowships[0]?.members}
      memberLoading={loading}
      memberError={error}
    />
  )
}

export default FellowshipMembers
