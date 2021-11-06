import PlaceholderCustom from 'components/Placeholder'
import { MemberContext } from 'contexts/MemberContext'
import React, { useContext } from 'react'
import { Container, Button } from 'react-bootstrap'
import { useHistory } from 'react-router'

const Directory = () => {
  const { currentUser, theme } = useContext(MemberContext)
  let history = useHistory()

  return (
    <Container className="text-center">
      <PlaceholderCustom loading={!currentUser.fullName} xs={12} as="h1">
        <h1>{`${currentUser.fullName}'s Directory`}</h1>
      </PlaceholderCustom>

      <div className="d-grid gap-2">
        <Button
          onClick={() => history.push('/directory/members')}
          variant="primary"
          size="lg"
          className={`${theme}`}
        >
          Members
        </Button>
        <Button
          onClick={() => history.push('/directory/churches')}
          variant="secondary"
          size="lg"
          className={`${theme} `}
        >
          Churches
        </Button>
      </div>
    </Container>
  )
}

export default Directory
