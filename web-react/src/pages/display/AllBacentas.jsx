import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import DisplayChurchList from '../../components/DisplayChurchList'
import { GET_CENTRE_BACENTAS } from '../../queries/ListQueries'
import { ChurchContext } from '../../contexts/ChurchContext'
import RoleView from '../../auth/RoleView'
import BaseComponent from 'components/base-component/BaseComponent'
import { Container, Row, Col, Button } from 'react-bootstrap'

const DisplayAllBacentas = () => {
  const { centreId, setCentreId } = useContext(ChurchContext)

  const { data, loading, error } = useQuery(GET_CENTRE_BACENTAS, {
    variables: { id: centreId },
  })

  const bacentas = data?.centres[0]?.bacentas

  return (
    <BaseComponent loading={loading} error={error} data={data}>
      <Container>
        <div className="mb-4 border-bottom">
          <Row className="mb-2">
            <Col>
              <Link
                to={`/centre/displaydetails`}
                onClick={() => {
                  setCentreId(centreId)
                }}
              >
                <h4>{`${bacentas?.[0].centre.name} Centre`}</h4>
              </Link>
            </Col>
            <RoleView
              roles={[
                'adminFederal',
                'adminCouncil',
                'adminCampus',
                'adminTown',
              ]}
            >
              <Col className="col-auto">
                <Link to="/bacenta/addbacenta" className="btn btn-primary">
                  Add Bacenta
                </Link>
              </Col>
            </RoleView>
          </Row>

          <Row className="justify-content-between mb-2">
            <Col>
              <Button>{`Bacentas: ${bacentas?.length}`}</Button>
            </Col>
            <Col className="col-auto">
              <Link to="/centre/members">
                <Button>{`Membership: ${data?.centres[0].memberCount}`}</Button>
              </Link>
            </Col>
          </Row>
        </div>
        <DisplayChurchList data={bacentas} churchType="Bacenta" />
      </Container>
    </BaseComponent>
  )
}

export default DisplayAllBacentas
