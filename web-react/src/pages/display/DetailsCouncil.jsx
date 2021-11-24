import { useQuery } from '@apollo/client'
import { ChurchContext } from 'contexts/ChurchContext'
import React, { useContext } from 'react'
import { DISPLAY_COUNCIL } from './ReadQueries'

const DetailsCouncil = () => {
  const { councilId } = useContext(ChurchContext)
  const { data, loading, error } = useQuery(DISPLAY_COUNCIL, {
    variable: { id: councilId },
  })
  console.log(data, loading, error)
  return <div></div>
}

export default DetailsCouncil
