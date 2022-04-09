import { useMutation } from '@apollo/client'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import { ChurchContext } from 'contexts/ChurchContext'
import { alertMsg, throwErrorMsg } from 'global-utils'
import React, { useContext } from 'react'
import { Button, Container } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import {
  REMOVE_ALL_STREAMARRIVALS_HELPERS,
  STREAM_ARRIVALS_HELPERS,
} from './ArrivalsHelpersGQL'

const ArrivalsHelpersStream = () => {
  const { streamId } = useContext(ChurchContext)
  const navigate = useNavigate()

  const [RemoveAllStreamArrivalsHelpers] = useMutation(
    REMOVE_ALL_STREAMARRIVALS_HELPERS,
    {
      refetchQueries: [
        {
          query: STREAM_ARRIVALS_HELPERS,
          variables: { id: streamId },
        },
      ],
    }
  )

  return (
    <Container>
      <HeadingPrimary>Arrivals Helpers Assignment Screen</HeadingPrimary>{' '}
      <div className="d-grid gap-2 mt-5">
        <Button
          variant="primary"
          size="lg"
          onClick={() => {
            navigate('/stream/arrivals-counters')
          }}
        >
          Assign Counters
        </Button>

        <Button
          variant="primary"
          size="lg"
          onClick={() => {
            navigate('/stream/arrivals-confirmers')
          }}
        >
          Assign Confirmers
        </Button>

        <Button
          variant="primary"
          size="lg"
          onClick={async () => {
            const confirmBox = window.confirm(
              `Do you want to delete all helpers`
            )

            if (confirmBox === true) {
              try {
                await RemoveAllStreamArrivalsHelpers({
                  variables: { streamId: streamId },
                })

                alertMsg('All Stream Arrivals Helpers have been deleted')
              } catch (error) {
                throwErrorMsg(error)
              }
            }
          }}
        >
          Delete All Helpers
        </Button>
      </div>
    </Container>
  )
}

export default ArrivalsHelpersStream
