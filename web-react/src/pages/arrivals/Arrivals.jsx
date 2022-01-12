import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
// import { MemberContext } from 'contexts/MemberContext'
// import { isAuthorised, permitMeAndThoseAbove } from 'global-utils'
import React from 'react'
import { Container } from 'react-bootstrap'
// import BacentaArrivals from './BacentaArrivals'
// import ConstituencyHomePage from './ConstituencyArrivals'

const Arrivals = () => {
  // const { currentUser } = useContext(MemberContext)

  // if (isAuthorised(['adminConstituency'], currentUser.roles)) {
  //   return <ConstituencyHomePage />
  // } else if (
  //   isAuthorised(permitMeAndThoseAbove('Bacenta'), currentUser.roles)
  // ) {
  //   return <BacentaArrivals />
  // }

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
