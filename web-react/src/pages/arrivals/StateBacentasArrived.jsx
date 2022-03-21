import { useQuery } from '@apollo/client'
import BaseComponent from 'components/base-component/BaseComponent'
import MemberDisplayCard from 'components/card/MemberDisplayCard'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import HeadingSecondary from 'components/HeadingSecondary'
import { ChurchContext } from 'contexts/ChurchContext'
import PlaceholderMemberDisplay from 'pages/services/defaulters/PlaceholderDefaulter'
import React, { useContext } from 'react'
import { Card, Container } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import { CONSTITUENCY_BACENTAS_ARRIVED } from './bussingStatusQueries'

const BacentasHaveArrived = () => {
  const { constituencyId, clickCard } = useContext(ChurchContext)
  const navigate = useNavigate()
  const { data, loading, error } = useQuery(CONSTITUENCY_BACENTAS_ARRIVED, {
    variables: { id: constituencyId },
  })
  const constituency = data?.constituencies[0]

  return (
    <BaseComponent data={data} loading={loading} error={error} placeholder>
      <Container>
        <HeadingPrimary loading={loading}>
          Bacentas That Have Arrived
        </HeadingPrimary>
        <HeadingSecondary loading={!constituency?.name}>
          {constituency?.name} Constituency
        </HeadingSecondary>

        {!constituency?.bacentasHaveArrived.length && !loading && (
          <Card>
            <Card.Body>No Bacentas Have Arrived at the Centre</Card.Body>
          </Card>
        )}

        {constituency?.bacentasHaveArrived?.map((bacenta, i) => {
          return (
            <MemberDisplayCard
              key={i}
              member={bacenta}
              leader={bacenta.leader}
              contact
              onClick={() => {
                clickCard(bacenta)
                clickCard(bacenta.bussing[0])
                navigate('/bacenta/bussing-details')
              }}
            />
          )
        })}

        {!constituency?.bacentasHaveArrived.length && loading && (
          <PlaceholderMemberDisplay />
        )}
      </Container>
    </BaseComponent>
  )
}

export default BacentasHaveArrived
