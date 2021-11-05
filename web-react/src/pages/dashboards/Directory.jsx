import { MemberContext } from 'contexts/MemberContext'
import React, { useContext } from 'react'
import { Container, Button } from 'react-bootstrap'

const Directory = () => {
  const { currentUser } = useContext(MemberContext)

  return (
    <Container>
      {`${currentUser.fullName}'s Directory`}
      <Button variant="primary">Members</Button>
      <Button variant="primary">Church</Button>
    </Container>
  )
}

export default Directory
