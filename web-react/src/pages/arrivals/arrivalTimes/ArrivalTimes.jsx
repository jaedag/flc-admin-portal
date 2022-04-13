import { useQuery } from '@apollo/client'
import BaseComponent from 'components/base-component/BaseComponent'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import HeadingSecondary from 'components/HeadingSecondary'
import { MemberContext } from 'contexts/MemberContext'
import { parseNeoTime } from 'date-utils'
import React, { useContext } from 'react'
import { Container, Table, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import { GET_ARRIVAL_TIMES } from './time-gql'

const ArrivalTimes = () => {
  const { currentUser, theme } = useContext(MemberContext)
  const church = currentUser?.currentChurch
  const { data, loading, error } = useQuery(GET_ARRIVAL_TIMES, {
    variables: { id: church?.id },
  })
  const stream = data?.streams[0]
  const navigate = useNavigate()

  return (
    <BaseComponent data={data} loading={loading} error={error}>
      <Container>
        <HeadingPrimary>Arrival Times</HeadingPrimary>
        <HeadingSecondary>{`${church?.name} ${church?.__typename}`}</HeadingSecondary>

        <Button
          onClick={() => navigate('/stream/set-arrivals-time')}
          className="mb-4"
        >
          Edit Times
        </Button>
        <Table variant={theme} striped bordered>
          <tbody>
            <tr>
              <td>Mobilisation Start</td>
              <td>{parseNeoTime(stream?.mobilisationStartTime)}</td>
            </tr>
            <tr>
              <td>Mobilisation End</td>
              <td>{parseNeoTime(stream?.mobilisationEndTime)}</td>
            </tr>
            <tr>
              <td>Arrival Start</td>
              <td>{parseNeoTime(stream?.arrivalStartTime)}</td>
            </tr>
            <tr>
              <td>Arrival End</td>
              <td>{parseNeoTime(stream?.arrivalEndTime)}</td>
            </tr>
          </tbody>
        </Table>
      </Container>
    </BaseComponent>
  )
}

export default ArrivalTimes
