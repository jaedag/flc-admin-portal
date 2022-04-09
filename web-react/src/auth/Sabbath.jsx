import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import React from 'react'
import { Container } from 'react-bootstrap'

const Sabbath = () => {
  return (
    <Container>
      <HeadingPrimary>Today is the Sabbath!</HeadingPrimary>
      <div>
        <p className="mb-2">Exodus 20:8-10</p>
        <p>
          Remember the sabbath day, to keep it holy. Six days shalt thou labour,
          and do all thy work: But the seventh day is the sabbath of the LORD
          thy God: in it{' '}
          <b className="text-danger">thou shalt not do any work...</b>
        </p>
      </div>
      <div className="mt-5">
        After you are born again, you must show your respect for God by
        honouring the Sabbath day.
        <p className="mt-2 text-end fw-bold">- Dag Heward-Mills</p>
      </div>
    </Container>
  )
}

export default Sabbath
