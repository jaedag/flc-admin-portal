import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import MembersGrid from '../../components/members-grids/MembersGrid'
import { GET_CAMPUSTOWN_MEMBERS } from './GridQueries'
import { ChurchContext } from '../../contexts/ChurchContext'

export const CampusTownMembers = () => {
  const { campusId, townId, church } = useContext(ChurchContext)

  const { data, loading, error } = useQuery(GET_CAMPUSTOWN_MEMBERS, {
    variables: { id: church.church === 'campus' ? campusId : townId },
  })
  if (church.church === 'campus') {
    return (
      <MembersGrid
        title={data ? `${data.campuses[0]?.name} Campus` : null}
        memberData={data?.campuses[0]?.members}
        memberLoading={loading}
        memberError={error}
      />
    )
  } else {
    return (
      <MembersGrid
        title={data ? `${data?.towns[0]?.name} Town` : null}
        memberData={data?.towns[0]?.members}
        memberLoading={loading}
        memberError={error}
      />
    )
  }
}

export default CampusTownMembers
