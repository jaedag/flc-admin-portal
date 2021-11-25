import React, { useContext } from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { ChurchContext } from '../contexts/ChurchContext'

const DisplayChurchList = (props) => {
  const { data, churchType } = props
  const { clickCard } = useContext(ChurchContext)
  if (!data) {
    return
  }

  return (
    <Container>
      <h5 className="text-muted">{`${churchType} Locations:`}</h5>
      <Row>
        {data.map((church, index) => {
          return (
            <Link
              key={index}
              to={`/${churchType.toLowerCase()}/displaydetails`}
            >
              <Col
                sm={8}
                md={3}
                onClick={() => {
                  clickCard(church)
                }}
              >
                <Card className="mb-2">
                  <Card.Body>
                    <Card.Title>{church.name}</Card.Title>
                    <Card.Text>
                      {church.leader
                        ? `${church.leader.firstName} ${church.leader.lastName}`
                        : null}
                      {church.admin && (
                        <p className="text-muted">{`Admin: ${church.admin.firstName} ${church.admin.lastName}`}</p>
                      )}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Link>
          )
        })}
      </Row>
    </Container>
  )
}

export default DisplayChurchList
