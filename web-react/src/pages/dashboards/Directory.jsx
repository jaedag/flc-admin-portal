import { MemberContext } from 'contexts/MemberContext'
import React, { useContext } from 'react'
import { Col, Container, Row, Button } from 'react-bootstrap'

const Directory = () => {
  const { currentUser } = useContext(MemberContext)

  return (
    <Container>
      {`${currentUser.fullName} Directory`}
      <Row>
        <Col>
          <Button>Members</Button>
          <Button>Church</Button>
        </Col>
      </Row>
    </Container>
  )
}

export default Directory
