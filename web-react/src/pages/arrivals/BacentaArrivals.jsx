import { useQuery } from '@apollo/client'
import BaseComponent from 'components/base-component/BaseComponent'
import MenuButton from 'components/buttons/MenuButton'
import { ChurchContext } from 'contexts/ChurchContext'
import React from 'react'
import { useContext } from 'react'
import { Container } from 'react-bootstrap'
import { BACENTA_ARRIVALS_DASHBOARD } from './arrivalsHome'
import { useNavigate } from 'react-router'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'

const BacentaArrivals = () => {
  const { bacentaId } = useContext(ChurchContext)
  const navigate = useNavigate()
  const { data, loading, error } = useQuery(BACENTA_ARRIVALS_DASHBOARD, {
    variables: { id: bacentaId },
  })

  const bacenta = data?.bacentas[0]

  return (
    <BaseComponent data={data} loading={loading} error={error}>
      <Container>
        <HeadingPrimary loading={loading}>
          {bacenta?.name} Bacenta Arrivals
        </HeadingPrimary>

        <div className="d-grid gap-2">
          <MenuButton
            title="Upload Bussing Picture"
            onClick={() => navigate('/arrivals/submit-bus-picture')}
            icon
            iconBg
            noCaption
          />
        </div>
      </Container>
    </BaseComponent>
  )
}

export default BacentaArrivals
