import { useQuery } from '@apollo/client'
import BaseComponent from 'components/base-component/BaseComponent'
import MemberDisplayCard from 'components/card/MemberDisplayCard'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import HeadingSecondary from 'components/HeadingSecondary'
import { ChurchContext } from 'contexts/ChurchContext'
import React from 'react'
import { useContext } from 'react'
import { Container } from 'react-bootstrap'
import { CONSTITUENCY_BACENTAS_NOT_ARRIVED } from './arrivalsQueries'

const BacentasNotArrived = () => {
  const { constituencyId } = useContext(ChurchContext)
  const { data, loading, error } = useQuery(CONSTITUENCY_BACENTAS_NOT_ARRIVED, {
    variables: { id: constituencyId },
  })
  const constituency = data?.constituencies[0]

  return (
    <BaseComponent data={data} loading={loading} error={error} placeholder>
      <Container>
        <HeadingPrimary loading={loading}>
          Bacentas Not Yet Arrived
        </HeadingPrimary>
        <HeadingSecondary loading={!constituency?.name}>
          {constituency?.name} Constituency
        </HeadingSecondary>

        {constituency?.bacentas.map((bacenta, i) => {
          if (!bacenta.bussing.length) {
            return (
              <MemberDisplayCard
                key={i}
                member={bacenta}
                leader={bacenta.leader}
                contact
              />
            )
          }
        })}
      </Container>
    </BaseComponent>
  )
}

export default BacentasNotArrived
