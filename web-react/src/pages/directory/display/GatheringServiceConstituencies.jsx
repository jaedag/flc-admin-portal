import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import DisplayChurchList from '../../../components/DisplayChurchList'
import { GET_GATHERING_SERVICE_CONSTITUENCIES } from '../../../queries/ListQueries'
import { ChurchContext } from '../../../contexts/ChurchContext'
import RoleView from '../../../auth/RoleView'
import BaseComponent from 'components/base-component/BaseComponent'
import { Container, Row, Col, Button } from 'react-bootstrap'

const GatheringServiceConstituencies = () => {
  const { clickCard, gatheringServiceId } = useContext(ChurchContext)

  const { data, loading, error } = useQuery(
    GET_GATHERING_SERVICE_CONSTITUENCIES,
    {
      variables: { id: gatheringServiceId },
    }
  )

  const constituencies = data?.gatheringServices[0].constituencies
  const gatheringService = data?.gatheringServices[0]

  return (
    <BaseComponent data={data} loading={loading} error={error}>
      <Container>
        <div className="mb-4 border-bottom">
          <Row className="mb-2">
            <Col>
              <Link
                to="/gatheringservice/displaydetails"
                onClick={() => {
                  clickCard(gatheringService)
                }}
              >
                <h4>{`${gatheringService?.name}'s Constituencies`}</h4>
              </Link>
              <Link
                to="/member/displaydetails"
                onClick={() => {
                  clickCard(gatheringService?.leader)
                }}
              >
                <h6 className="text-muted">
                  Resident Pastor:
                  {gatheringService?.leader
                    ? ` ${gatheringService.leader.fullName}`
                    : null}
                </h6>
              </Link>
              {gatheringService?.admin ? (
                <Link
                  className="pb-4 text-muted"
                  to="/member/displaydetails"
                  onClick={() => {
                    clickCard(gatheringService?.admin)
                  }}
                >
                  {`Admin: ${gatheringService?.admin?.fullName}`}
                </Link>
              ) : null}
            </Col>
            <RoleView roles={['adminFederal', 'adminStream', 'adminCouncil']}>
              <Col className="col-auto">
                <Link
                  to="/constituency/addconstituency"
                  className="btn btn-primary"
                >
                  Add Constituency
                </Link>
              </Col>
            </RoleView>
          </Row>

          <Row className="justify-content-between mb-2">
            <Col>
              <Button>{`Constituencies: ${constituencies?.length}`}</Button>
            </Col>
            <Col className="col-auto">
              <Link to="/bishop/members">
                <Button>{`Membership: ${gatheringService?.memberCount}`}</Button>
              </Link>
            </Col>
          </Row>
        </div>
        <DisplayChurchList
          data={constituencies}
          churchType="GatheringService"
        />
      </Container>
    </BaseComponent>
  )
}

export default GatheringServiceConstituencies
