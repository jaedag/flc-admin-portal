import { useQuery } from '@apollo/client'
import BaseComponent from 'components/base-component/BaseComponent'
import MemberDisplayCard from 'components/card/MemberDisplayCard'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import HeadingSecondary from 'components/HeadingSecondary'
import { ChurchContext } from 'contexts/ChurchContext'
import React from 'react'
import { useContext } from 'react'
import { Container } from 'react-bootstrap'
import { CONSTIUENCY_BACENTAS_NO_ACTIVITY } from './bussingStatusQueries'

const BacentasNoActiviity = () => {
  const { constituencyId } = useContext(ChurchContext)
  const { data, loading, error } = useQuery(CONSTIUENCY_BACENTAS_NO_ACTIVITY, {
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

        {!constituency?.bacentasNoActivity.length && (
          <div>There are no bacentas without activity</div>
        )}

        {constituency?.bacentasNoActivity.map((bacenta, i) => {
          return (
            <MemberDisplayCard
              key={i}
              member={bacenta}
              leader={bacenta.leader}
              contact
            />
          )
        })}
      </Container>
    </BaseComponent>
  )
}

export default BacentasNoActiviity
