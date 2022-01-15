import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import { MemberContext } from 'contexts/MemberContext'
import { isAuthorised, permitMeAndThoseAbove } from 'global-utils'
import React, { useContext } from 'react'
import { Container } from 'react-bootstrap'
import BacentaArrivals from './BacentaArrivals'
import ConstituencyArrivalss from './ConstituencyArrivals'

const Arrivals = () => {
  const { currentUser } = useContext(MemberContext)

  if (
    isAuthorised(
      ['adminConstituency', 'adminConstituencyArrivals'],
      currentUser.roles
    )
  ) {
    return <ConstituencyArrivalss />
  }
  if (isAuthorised(permitMeAndThoseAbove('Bacenta'), currentUser.roles)) {
    return <BacentaArrivals />
  }

  return (
    <Container>
      <HeadingPrimary>Arrivals</HeadingPrimary>
      <div>
        The Arrivals Feature is still being worked on. Will update soon!
      </div>
    </Container>
  )
}

export default Arrivals
