import { MemberContext } from 'contexts/MemberContext'
import { getSubChurchLevel } from 'global-utils'
import { useContext, useEffect, useState } from 'react'

const useChurchLevel = (props) => {
  const { currentUser } = useContext(MemberContext)

  const currentChurch = currentUser?.currentChurch
  const churchLevel = currentUser?.currentChurch?.__typename
  const subChurchLevel = getSubChurchLevel(currentChurch?.__typename)

  const [church, setChurch] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(async () => {
    switch (churchLevel) {
      case 'Constituency':
        {
          const res = await props.constituencyFunction({
            variables: {
              id: currentChurch?.id,
            },
          })

          setChurch(res.data?.constituencies[0])
          setLoading(res.loading)
          setError(res.error)
        }
        break
      case 'Council':
        {
          const res = await props.councilFunction({
            variables: {
              id: currentChurch?.id,
            },
          })

          setChurch(res?.data?.councils[0])
          setLoading(res.loading)
          setError(res.error)
        }

        break
      case 'Stream':
        {
          const res = await props.streamFunction({
            variables: {
              id: currentChurch?.id,
            },
          })
          setChurch(res?.data?.streams[0])
          setLoading(res.loading)
          setError(res.error)
        }
        break

      case 'GatheringService':
        {
          const res = await props.gatheringServiceFunction({
            variables: {
              id: currentChurch?.id,
            },
          })

          setChurch(res?.data?.gatheringServices[0])
          setLoading(res.loading)
          setError(res.error)
        }
        break
      default:
        break
    }
  }, [setChurch, currentChurch])

  return { church, subChurchLevel, loading, error }
}

export default useChurchLevel
