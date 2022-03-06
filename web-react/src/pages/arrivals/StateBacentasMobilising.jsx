import { useQuery } from '@apollo/client'
import BaseComponent from 'components/base-component/BaseComponent'
import MemberDisplayCard from 'components/card/MemberDisplayCard'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import HeadingSecondary from 'components/HeadingSecondary'
import { ChurchContext } from 'contexts/ChurchContext'
import React from 'react'
import { useContext } from 'react'
import { Card, Container } from 'react-bootstrap'
import { CONSTIUENCY_BACENTAS_MOBILISING } from './bussingStatusQueries'

const BacentasMobilising = () => {
  const { constituencyId } = useContext(ChurchContext)
  const { data, loading, error } = useQuery(CONSTIUENCY_BACENTAS_MOBILISING, {
    variables: { id: constituencyId },
  })
  const constituency = data?.constituencies[0]

  return (
    <BaseComponent data={data} loading={loading} error={error} placeholder>
      <Container>
        <HeadingPrimary loading={loading}>Bacentas Mobilising</HeadingPrimary>
        <HeadingSecondary loading={!constituency?.name}>
          {constituency?.name} Constituency
        </HeadingSecondary>

        {!constituency?.bacentasMobilising.length && (
          <Card>
            <Card.Body>There are no mobilising bacentas</Card.Body>
          </Card>
        )}

        {constituency?.bacentasMobilising.map((bacenta, i) => {
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

export default BacentasMobilising
