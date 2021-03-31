import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import { MembersGrid } from '../../components/MembersGrid'
import { GET_CAMPUSTOWN_MEMBERS } from '../../queries/GridQueries'
import { ChurchContext } from '../../contexts/ChurchContext'

export const GridCampusTownMembers = () => {
  const { campusId, townId, church } = useContext(ChurchContext)

  const { data, loading, error } = useQuery(GET_CAMPUSTOWN_MEMBERS, {
    variables: { id: church.church === 'campus' ? campusId : townId },
  })
  if (church.church === 'campus') {
    return (
      <MembersGrid
        memberData={data?.campusMemberList}
        memberLoading={loading}
        memberError={error}
      />
    )
  } else {
    return (
      <MembersGrid
        memberData={data?.townMemberList}
        memberLoading={loading}
        memberError={error}
      />
    )
  }
}
