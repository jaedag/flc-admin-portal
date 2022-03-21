import { MemberContext } from 'contexts/MemberContext'
import { useContext, useEffect, useState } from 'react'

const useChurchLevel = (props) => {
  const { currentUser } = useContext(MemberContext)

  const currentChurch = currentUser?.currentChurch
  const churchLevel = currentUser?.currentChurch?.__typename

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
        }
        break
      case 'Council':
        {
          const res = await props.councilFunction({
            variables: {
              id: currentChurch?.id,
            },
          })

          setChurch(res?.data.councils[0])
          setLoading(res.loading)
          setError(res.error)
        }

        break
      case 'Stream':
        props.streamFunction({
          variables: {
            id: currentChurch?.id,
          },
        })
        setChurch(props.streamData?.streams[0])
        break

      case 'GatheringService':
        props.gatheringServiceFunction({
          variables: {
            id: currentChurch?.id,
          },
        })
        props.setChurch(props.gatheringServiceData?.gatheringServices[0])

        break
      default:
        break
    }
  }, [setChurch])

  return { church, loading, error }
}

export default useChurchLevel
