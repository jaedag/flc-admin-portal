import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import MembersGrid from '../../components/MembersGrid'
import { GET_CENTRE_MEMBERS } from '../../queries/GridQueries'
import { ChurchContext } from '../../contexts/ChurchContext'

const CentreMembers = () => {
  const { centreId } = useContext(ChurchContext)
  const { data, loading, error } = useQuery(GET_CENTRE_MEMBERS, {
    variables: { id: centreId },
  })

  return (
    <MembersGrid
      title={data ? `${data.centres[0]?.name} Centre` : null}
      memberData={data?.centreMemberList}
      memberLoading={loading}
      memberError={error}
    />
  )
}

export default CentreMembers
