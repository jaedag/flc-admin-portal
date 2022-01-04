import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import DisplayChurchList from '../../../components/DisplayChurchList'
import { GET_STREAM_COUNCILS } from '../../../queries/ListQueries'
import { ChurchContext } from '../../../contexts/ChurchContext'
import RoleView from '../../../auth/RoleView'
import BaseComponent from 'components/base-component/BaseComponent'
import { Container, Row, Col, Button } from 'react-bootstrap'

const DisplayAllCouncils = () => {
  const { clickCard, streamId } = useContext(ChurchContext)

  const { data, loading, error } = useQuery(GET_STREAM_COUNCILS, {
    variables: { id: streamId },
  })

  const councils = data?.streams[0].councils
  const stream = data?.streams[0]

  return (
    <BaseComponent data={data} loading={loading} error={error}>
      <Container>
        <div className="mb-4 border-bottom">
          <Row className="mb-2">
            <Col>
              <Link
                to="/stream/displaydetails"
                onClick={() => {
                  clickCard(stream)
                }}
              >
                <h4>{`${stream?.name} Councils`}</h4>
              </Link>
              <Link
                to="/member/displaydetails"
                onClick={() => {
                  clickCard(stream?.leader)
                }}
              >
                <h6 className="text-muted">
                  Overseer:
                  {stream?.leader ? ` ${stream.leader.fullName}` : null}
                </h6>
              </Link>
              {stream?.admin ? (
                <Link
                  className="pb-4"
                  to="/member/displaydetails"
                  onClick={() => {
                    clickCard(stream?.admin)
                  }}
                >
                  {`Admin: ${stream?.admin?.fullName}`}
                </Link>
              ) : null}
            </Col>
            <RoleView roles={['adminGatheringService', 'adminStream']}>
              <Col className="col-auto">
                <Link to="/council/addcouncil" className="btn btn-primary">
                  Add Council
                </Link>
              </Col>
            </RoleView>
          </Row>

          <Row className="justify-content-between mb-2">
            <Col>
              <Button>{`Councils: ${councils?.length}`}</Button>
            </Col>
            <Col className="col-auto">
              <Link to="/stream/members">
                <Button>{`Membership: ${stream?.memberCount}`}</Button>
              </Link>
            </Col>
          </Row>
        </div>
        <DisplayChurchList data={councils} churchType="Council" />
      </Container>
    </BaseComponent>
  )
}

export default DisplayAllCouncils
