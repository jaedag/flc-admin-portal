import { MemberContext } from 'contexts/MemberContext'
import { useContext } from 'react'

const useMyAuth = () => {
  const { currentUser } = useContext(MemberContext)

  const isAuthorised = (permittedRoles) => {
    if (permittedRoles?.includes('all')) {
      return true
    }

    return permittedRoles?.some((r) => currentUser?.roles.includes(r))
  }
  return { isAuthorised }
}

export default useMyAuth
