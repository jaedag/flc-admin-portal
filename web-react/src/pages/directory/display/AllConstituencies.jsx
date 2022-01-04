import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import DisplayChurchList from 'components/DisplayChurchList'
import { GET_COUNCIL_CONSTITUENCIES } from 'queries/ListQueries'
import { ChurchContext } from 'contexts/ChurchContext'
import BaseComponent from 'components/base-component/BaseComponent'
import { Container, Row, Col, Button } from 'react-bootstrap'
import RoleView from 'auth/RoleView'

const DisplayAllConstituencies = () => {
  const { clickCard, councilId } = useContext(ChurchContext)

  const { data, loading, error } = useQuery(GET_COUNCIL_CONSTITUENCIES, {
    variables: { id: councilId },
  })

  const constituencies = data?.councils[0].constituencies
  const council = data?.councils[0]

  return (
    <BaseComponent data={data} loading={loading} error={error}>
      <Container>
        <div className="mb-4 border-bottom">
          <Row className="mb-2">
            <Col>
              <Link
                to="/council/displaydetails"
                onClick={() => {
                  clickCard(constituencies?.council)
                }}
              >
                <h4>{`${council?.leader.fullName}'s Constituencies`}</h4>
              </Link>
              {council?.admin ? (
                <Link
                  className="pb-4"
                  to="/member/displaydetails"
                  onClick={() => {
                    clickCard(council?.admin)
                  }}
                >
                  {`Admin: ${council?.admin?.firstName} ${council?.admin?.lastName}`}
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
                <Button>{`Membership: ${council?.memberCount}`}</Button>
              </Link>
            </Col>
          </Row>
        </div>
        <DisplayChurchList data={constituencies} churchType="Constituency" />
      </Container>
    </BaseComponent>
  )
}

export default DisplayAllConstituencies
