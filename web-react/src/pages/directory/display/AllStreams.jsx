import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import DisplayChurchList from '../../../components/DisplayChurchList'
import { GET_GATHERINGSERVICE_STREAMS } from '../../../queries/ListQueries'
import { ChurchContext } from '../../../contexts/ChurchContext'
import RoleView from '../../../auth/RoleView'
import BaseComponent from 'components/base-component/BaseComponent'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { permitAdminAndThoseAbove } from 'global-utils'

const DisplayAllStreams = () => {
  const { clickCard, gatheringServiceId } = useContext(ChurchContext)

  const { data, loading, error } = useQuery(GET_GATHERINGSERVICE_STREAMS, {
    variables: { id: gatheringServiceId },
  })

  const streams = data?.gatheringServices[0]?.streams
  const gatheringService = data?.gatheringServices[0]

  return (
    <BaseComponent data={data} loading={loading} error={error}>
      <Container>
        <div className="mb-4 border-bottom">
          <Row className="mb-2">
            <Col>
              <Link
                to="/gatheringService/displaydetails"
                onClick={() => {
                  clickCard(gatheringService)
                }}
              >
                <h4>{`${gatheringService?.name} Streams`}</h4>
              </Link>
              <Link
                to="/member/displaydetails"
                onClick={() => {
                  clickCard(gatheringService?.leader)
                }}
              >
                <h6 className="text-muted">
                  Overseer:
                  {gatheringService?.leader
                    ? ` ${gatheringService.leader.fullName}`
                    : null}
                </h6>
              </Link>
              {gatheringService?.admin ? (
                <Link
                  className="pb-4"
                  to="/member/displaydetails"
                  onClick={() => {
                    clickCard(gatheringService?.admin)
                  }}
                >
                  {`Admin: ${gatheringService?.admin?.fullName}`}
                </Link>
              ) : null}
            </Col>
            <RoleView roles={permitAdminAndThoseAbove('GatheringService')}>
              <Col className="col-auto">
                <Link to="/stream/addstream" className="btn btn-primary">
                  Add Stream
                </Link>
              </Col>
            </RoleView>
          </Row>

          <Row className="justify-content-between mb-2">
            <Col>
              <Button>{`Streams: ${streams?.length}`}</Button>
            </Col>
            <Col className="col-auto">
              <Link to="/gatheringService/members">
                <Button>{`Membership: ${gatheringService?.memberCount}`}</Button>
              </Link>
            </Col>
          </Row>
        </div>
        <DisplayChurchList data={streams} churchType="Stream" />
      </Container>
    </BaseComponent>
  )
}

export default DisplayAllStreams
