import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import DisplayChurchList from '../../components/DisplayChurchList'

import { GET_CONSTITUENCY_BACENTAS } from '../../queries/ListQueries'
import { ChurchContext } from '../../contexts/ChurchContext'
import RoleView from '../../auth/RoleView'
import BaseComponent from 'components/base-component/BaseComponent'
import { Col, Container, Row, Button } from 'react-bootstrap'

const DisplayAllBacentas = () => {
  const { constituencyId, setBacentaId, setConstituencyId, clickCard } =
    useContext(ChurchContext)

  const { data, loading, error } = useQuery(GET_CONSTITUENCY_BACENTAS, {
    variables: { id: constituencyId },
  })

  const constituency = data?.constituencies[0]
  return (
    <BaseComponent loading={loading} data={data} error={error}>
      <Container>
        <div className="mb-4 border-bottom">
          <Row className="mb-2">
            <Col>
              <Link
                to={`/constituency/displaydetails`}
                onClick={() => {
                  setConstituencyId(constituencyId)
                }}
              >
                {' '}
                <h4>{`${constituency?.name} Constituency`}</h4>
              </Link>
              <Link
                to="/member/displaydetails"
                onClick={() => {
                  clickCard(constituency?.leader)
                }}
              >
                <h6 className="text-muted">
                  Overseer:
                  {constituency?.leader
                    ? ` ${constituency?.leader.firstName} ${constituency?.leader.lastName}`
                    : null}
                </h6>
              </Link>
              {constituency?.admin ? (
                <Link
                  className="pb-4"
                  to="/member/displaydetails"
                  onClick={() => {
                    clickCard(constituency?.admin)
                  }}
                >
                  {`Admin: ${constituency?.admin?.firstName} ${constituency?.admin?.lastName}`}
                </Link>
              ) : null}
            </Col>
            <RoleView
              roles={['adminFederal', 'adminCouncil', 'adminConstituency']}
            >
              <Col className="col-auto">
                <Link
                  to="/bacenta/addbacenta"
                  className="btn btn-primary text-nowrap"
                >
                  Add Bacenta
                </Link>
              </Col>
            </RoleView>
          </Row>

          <Row className="justify-content-between mb-2">
            <Col>
              <Button>{`Bacentas: ${constituency?.bacentas.length}`}</Button>
            </Col>
            <Col className="col-auto">
              <Link to="/constituency/members">
                <Button>{`Membership: ${constituency?.memberCount}`}</Button>
              </Link>

              <Link to="/sonta/displayall">
                <Button>{`Sontas: ${constituency?.sontas.length}`}</Button>
              </Link>
            </Col>
          </Row>
        </div>

        <DisplayChurchList
          data={constituency?.bacentas}
          setter={setBacentaId}
          churchType="Bacenta"
        />
      </Container>
    </BaseComponent>
  )
}

export default DisplayAllBacentas
