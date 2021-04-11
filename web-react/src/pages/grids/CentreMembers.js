import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import { MembersGrid } from '../../components/MembersGrid'
import { GET_CENTRE_MEMBERS } from '../../queries/GridQueries'
import { ChurchContext } from '../../contexts/ChurchContext'

export const CentreMembers = () => {
  const { centreId } = useContext(ChurchContext)
  const { data, loading, error } = useQuery(GET_CENTRE_MEMBERS, {
    variables: { id: centreId },
  })

  return (
    <MembersGrid
      title={data ? `${data.displayCentre?.name} Centre` : null}
      memberData={data?.centreMemberList}
      memberLoading={loading}
      memberError={error}
    />
  )
}
