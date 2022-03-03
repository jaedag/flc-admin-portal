import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import React from 'react'
import { Container } from 'react-bootstrap'
import HeadingSecondary from 'components/HeadingSecondary'
import ChurchList from 'pages/services/ChurchList'

const Arrivals = () => {
  return (
    <Container>
      <HeadingPrimary>Arrivals</HeadingPrimary>
      <HeadingSecondary>Click on one of churches below</HeadingSecondary>
      {/* This Page will require a redesign. Possibly by Basoah */}

      <ChurchList color="arrivals" />
    </Container>
  )
}

export default Arrivals
