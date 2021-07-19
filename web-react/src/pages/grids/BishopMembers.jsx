import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import MembersGrid from '../../components/members-grids/MembersGrid'
import { GET_BISHOP_MEMBERS } from './GridQueries'
import { ChurchContext } from '../../contexts/ChurchContext'
// import TabletDesktopView from 'components/responsive-design/TabletDesktopView'

const BishopMembers = () => {
  const { bishopId } = useContext(ChurchContext)
  const { data, loading, error } = useQuery(GET_BISHOP_MEMBERS, {
    variables: { id: bishopId },
  })

  return (
    <MembersGrid
      title={
        data
          ? `Bishop ${data?.members[0]?.firstName} ${data?.members[0]?.lastName}`
          : null
      }
      memberData={data && data.members[0].members}
      memberLoading={loading}
      memberError={error}
    />
  )
}

export default BishopMembers
