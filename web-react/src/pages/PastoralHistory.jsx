import React, { useContext } from 'react'
import { MemberContext } from '../contexts/MemberContext'

function PastoralHistory() {
  const { currentUser } = useContext(MemberContext)

  return <div>{currentUser.firstName}</div>
}

export default PastoralHistory
