import React from 'react'
import { Button, Container } from 'react-bootstrap'
import { useHistory, useLocation } from 'react-router-dom'
import MenAtWork from '../assets/men-at-work-shivendu-shukla.jpeg'
import Login from '../components/Login'
import './UnauthMsg.css'

export const UnauthMsg = () => {
  const history = useHistory()
  const location = useLocation()
  const atHome = location.pathname === '/'

  if (atHome) {
    return <Login />
  }

  return (
    <div className="bg-img" style={{ backgroundImage: `url(${MenAtWork})` }}>
      <Container className="message text-center">
        {/* <!--Web Logo and text--> */}

        {`Sorry! There was an error trying to view this page, but we are working on it!`}
        <div className="pt-3">
          <Button
            variant="dark"
            size="lg"
            onClick={() => {
              history.push('/')
            }}
          >
            Click Here To Go Home
          </Button>
        </div>
      </Container>
    </div>
  )
}
