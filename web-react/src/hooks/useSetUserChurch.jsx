import { MemberContext } from 'contexts/MemberContext'
import { useContext } from 'react'

const useSetUserChurch = (church) => {
  const { currentUser, setCurrentUser } = useContext(MemberContext)

  setCurrentUser({
    ...currentUser,
    currentChurch: church,
  })

  sessionStorage.setItem(
    'currentUser',
    JSON.stringify({
      ...currentUser,
      currentChurch: church,
    })
  )
  return { currentUser, setCurrentUser }
}

export default useSetUserChurch
