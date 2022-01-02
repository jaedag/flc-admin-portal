import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import MembersGrid from '../../../components/members-grids/MembersGrid'
import { GET_GATHERING_SERVICE_MEMBERS } from './GridQueries'
import { ChurchContext } from '../../../contexts/ChurchContext'
// import TabletDesktopView from 'components/responsive-design/TabletDesktopView'

const GatheringServiceMembers = () => {
  const { gatheringServiceId } = useContext(ChurchContext)
  const { data, loading, error } = useQuery(GET_GATHERING_SERVICE_MEMBERS, {
    variables: { id: gatheringServiceId },
  })

  return (
    <MembersGrid
      title={data ? `${data?.gatheringServices[0]?.name}` : null}
      memberData={data && data.gatheringServices[0].members}
      memberLoading={loading}
      memberError={error}
    />
  )
}

export default GatheringServiceMembers
