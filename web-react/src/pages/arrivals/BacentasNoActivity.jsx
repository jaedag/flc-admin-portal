import { useQuery } from '@apollo/client'
import BaseComponent from 'components/base-component/BaseComponent'
import MemberDisplayCard from 'components/card/MemberDisplayCard'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import HeadingSecondary from 'components/HeadingSecondary'
import { ChurchContext } from 'contexts/ChurchContext'
import { getWeekNumber } from 'global-utils'
import React from 'react'
import { useContext } from 'react'
import { Container } from 'react-bootstrap'
import { CONSTITUENCY_BUSSING_DATA } from './arrivalsQueries'

const BacentasNoActiviity = () => {
  const { constituencyId } = useContext(ChurchContext)
  const { data, loading, error } = useQuery(CONSTITUENCY_BUSSING_DATA, {
    variables: { id: constituencyId },
  })
  const constituency = data?.constituencies[0]

  return (
    <BaseComponent data={data} loading={loading} error={error} placeholder>
      <Container>
        <HeadingPrimary loading={loading}>
          Bacentas With No Activity
        </HeadingPrimary>
        <HeadingSecondary loading={!constituency?.name}>
          {constituency?.name} Constituency
        </HeadingSecondary>

        {constituency?.bacentas.map((bacenta, i) => {
          if (bacenta.bussing[0]?.week !== getWeekNumber()) {
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

export default BacentasNoActiviity
