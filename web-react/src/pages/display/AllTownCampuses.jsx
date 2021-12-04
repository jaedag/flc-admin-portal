import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import DisplayChurchList from '../../components/DisplayChurchList'
import {
  GET_COUNCIL_TOWNS,
  GET_COUNCIL_CAMPUSES,
} from '../../queries/ListQueries'
import { ChurchContext } from '../../contexts/ChurchContext'
import RoleView from '../../auth/RoleView'
import BaseComponent from 'components/base-component/BaseComponent'
import { Container, Row, Col, Button } from 'react-bootstrap'

const DisplayAllTownCampuses = () => {
  const { clickCard, church, councilId } = useContext(ChurchContext)

  const {
    data: townsData,
    loading: townsLoading,
    error: townsError,
  } = useQuery(GET_COUNCIL_TOWNS, {
    variables: { id: councilId },
  })
  const {
    data: campusesData,
    loading: campusesLoading,
    error: campusesError,
  } = useQuery(GET_COUNCIL_CAMPUSES, {
    variables: { id: councilId },
  })

  if (church.church === 'town') {
    const towns = townsData?.councils[0].towns
    const council = townsData?.councils[0]

    return (
      <BaseComponent data={townsData} loading={townsLoading} error={townsError}>
        <Container>
          <div className="mb-4 border-bottom">
            <Row className="mb-2">
              <Col>
                <Link
                  to="/member/displaydetails"
                  onClick={() => {
                    clickCard(towns?.leader)
                  }}
                >
                  <h4>{`${council?.leader.fullName}'s Towns`}</h4>
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
              <RoleView roles={['adminFederal', 'adminCouncil']}>
                <Col className="col-auto">
                  <Link to="/town/addtown" className="btn btn-primary">
                    Add Town
                  </Link>
                </Col>
              </RoleView>
            </Row>

            <Row className="justify-content-between mb-2">
              <Col>
                <Button>{`Towns: ${towns?.length}`}</Button>
              </Col>
              <Col className="col-auto">
                <Link to="/bishop/members">
                  <Button>{`Membership: ${council?.memberCount}`}</Button>
                </Link>
              </Col>
            </Row>
          </div>
          <DisplayChurchList data={towns} churchType="Town" />
        </Container>
      </BaseComponent>
    )
  } else if (church.church === 'campus') {
    const campuses = campusesData?.councils[0].campuses
    const council = campusesData?.councils[0]

    return (
      <BaseComponent
        data={campusesData}
        loading={campusesLoading}
        error={campusesError}
      >
        <Container>
          <div className="mb-4 border-bottom">
            <Row>
              <Col>
                <Link
                  to="/member/displaydetails"
                  onClick={() => {
                    clickCard(campuses?.leader)
                  }}
                >
                  <h4>{`${council?.leader.fullName}'s Campuses`}</h4>
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
              <RoleView roles={['adminFederal', 'adminCouncil']}>
                <Col className="col-auto">
                  <Link to="/campus/addcampus" className="btn btn-primary">
                    Add Campus
                  </Link>
                </Col>
              </RoleView>
            </Row>

            <Row className="justify-content-between mb-2">
              <Col>
                <Button>{`Campuses: ${campuses?.length}`}</Button>
              </Col>
              <Col className="col-auto">
                <Link to="/bishop/members">
                  <Button>{`Membership: ${council?.memberCount}`}</Button>
                </Link>
              </Col>
            </Row>
          </div>
          <DisplayChurchList data={campuses} churchType="Campus" />
        </Container>
      </BaseComponent>
    )
  }
}

export default DisplayAllTownCampuses
