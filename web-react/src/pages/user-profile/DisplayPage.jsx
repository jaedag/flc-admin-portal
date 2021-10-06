import React, { useContext } from 'react'
import { MemberContext } from '../../contexts/MemberContext'
import MemberDisplay from 'components/reusable-forms/MemberDisplay'

const UserProfileDisplayPage = () => {
  const { currentUser } = useContext(MemberContext)

  return <MemberDisplay memberId={currentUser.id} />
}

export default UserProfileDisplayPage
