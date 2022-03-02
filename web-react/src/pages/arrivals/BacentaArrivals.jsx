import { useQuery } from '@apollo/client'
import BaseComponent from 'components/base-component/BaseComponent'
import React from 'react'
import { useContext } from 'react'
import { Button, Container } from 'react-bootstrap'
import { BACENTA_ARRIVALS } from './arrivalsQueries'
import { useNavigate } from 'react-router'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import { ChurchContext } from 'contexts/ChurchContext'
import { getWeekNumber } from 'global-utils'

const BacentaArrivals = () => {
  const { clickCard, bacentaId } = useContext(ChurchContext)
  const navigate = useNavigate()
  const { data, loading, error } = useQuery(BACENTA_ARRIVALS, {
    variables: { id: bacentaId },
  })

  const bacenta = data?.bacentas[0]
  let bussing

  data?.bacentas[0].bussing.map((data) => {
    if (data?.week === getWeekNumber()) {
      bussing = data
    }
    return
  })

  return (
    <BaseComponent data={data} loading={loading} error={error}>
      <Container>
        <HeadingPrimary loading={loading}>
          {bacenta?.name} Arrivals
        </HeadingPrimary>

        <div className="d-grid gap-2 mt-5">
          <Button
            variant="primary"
            size="lg"
            disabled={bussing?.mobilisationPicture && true}
            onClick={() => {
              clickCard(bacenta)
              navigate('/arrivals/submit-mobilisation-picture')
            }}
          >
            Upload Mobilisation Picture
          </Button>
          <Button
            variant="primary"
            size="lg"
            disabled={
              (!bussing?.mobilisationPicture ||
                bussing?.bussingPictures?.length) &&
              true
            }
            onClick={() => {
              clickCard(bacenta)
              navigate('/arrivals/submit-on-the-way')
            }}
          >
            Submit On-The-Way Picture
          </Button>
        </div>
      </Container>
    </BaseComponent>
  )
}

export default BacentaArrivals
