import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import DisplayChurchList from '../../../components/DisplayChurchList'
import { GET_BACENTA_FELLOWSHIPS } from '../../../queries/ListQueries'
import { ChurchContext } from '../../../contexts/ChurchContext'
import RoleView from '../../../auth/RoleView'
import BaseComponent from 'components/base-component/BaseComponent'
import { Container, Row, Col, Button } from 'react-bootstrap'

const DisplayAllFellowships = () => {
  const { bacentaId, setBacentaId } = useContext(ChurchContext)

  const { data, loading, error } = useQuery(GET_BACENTA_FELLOWSHIPS, {
    variables: { id: bacentaId },
  })

  const fellowships = data?.bacentas[0]?.fellowships

  return (
    <BaseComponent loading={loading} error={error} data={data}>
      <Container>
        <div className="mb-4 border-bottom">
          <Row className="mb-2">
            <Col>
              <Link
                to={`/bacenta/displaydetails`}
                onClick={() => {
                  setBacentaId(bacentaId)
                }}
              >
                <h4>{`${fellowships?.[0].bacenta.name} Bacenta`}</h4>
              </Link>
            </Col>
            <RoleView
              roles={[
                'adminFederal',
                'adminStream',
                'adminCouncil',
                'adminConstituency',
              ]}
            >
              <Col className="col-auto">
                <Link
                  to="/fellowship/addfellowship"
                  className="btn btn-primary"
                >
                  Add Fellowship
                </Link>
              </Col>
            </RoleView>
          </Row>

          <Row className="justify-content-between mb-2">
            <Col>
              <Button>{`Fellowships: ${fellowships?.length}`}</Button>
            </Col>
            <Col className="col-auto">
              <Link to="/bacenta/members">
                <Button>{`Membership: ${data?.bacentas[0].memberCount}`}</Button>
              </Link>
            </Col>
          </Row>
        </div>
        <DisplayChurchList data={fellowships} churchType="Fellowship" />
      </Container>
    </BaseComponent>
  )
}

export default DisplayAllFellowships
