import { MemberContext } from 'contexts/MemberContext'
import React, { useContext } from 'react'
import { Container, Button, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Directory = () => {
  const { currentUser } = useContext(MemberContext)

  return (
    <Container>
      {`${currentUser.fullName}'s Directory`}
      <Col>
        <Link to="/bacenta/members">
          <Button variant="primary">Members</Button>
        </Link>
      </Col>
      <Col>
        <Button variant="primary">Church</Button>
      </Col>
    </Container>
  )
}

export default Directory
