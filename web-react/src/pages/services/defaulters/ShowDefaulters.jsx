import React, { useContext } from 'react'
import { MemberContext } from 'contexts/MemberContext'
import DefaultersDashboard from './DefaultersDashboard'

const ShowDefaulters = () => {
  const { currentUser } = useContext(MemberContext)

  switch (currentUser?.currentChurch?.__typename) {
    case 'Constituency':
      return <DefaultersDashboard churchLevel="Constituency" />
    case 'Council':
      return <DefaultersDashboard churchLevel="Council" />
    case 'Stream':
      return <DefaultersDashboard churchLevel="Stream" />
    case 'GatheringService':
      return <DefaultersDashboard churchLevel="GatheringService" />
    default:
      break
  }
}

export default ShowDefaulters
