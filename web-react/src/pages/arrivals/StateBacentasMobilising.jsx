import { useLazyQuery } from '@apollo/client'
import BaseComponent from 'components/base-component/BaseComponent'
import MemberDisplayCard from 'components/card/MemberDisplayCard'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import HeadingSecondary from 'components/HeadingSecondary'
import React, { useContext } from 'react'
import { Container } from 'react-bootstrap'
import {
  CONSTITUENCY_BACENTAS_MOBILISING,
  COUNCIL_BACENTAS_MOBILISING,
  GATHERINGSERVICE_BACENTAS_MOBILISING,
  STREAM_BACENTAS_MOBILISING,
} from './bussingStatusQueries'
import useChurchLevel from '../../hooks/useChurchLevel'
import NoData from './CompNoData'
import PlaceholderDefaulterList from 'pages/services/defaulters/PlaceholderDefaulterList'
import { ChurchContext } from 'contexts/ChurchContext'
import { useNavigate } from 'react-router'

const BacentasMobilising = () => {
  const { clickCard } = useContext(ChurchContext)
  const navigate = useNavigate()
  const [constituencyBacentasMobilising] = useLazyQuery(
    CONSTITUENCY_BACENTAS_MOBILISING
  )
  const [councilBacentasMobilising] = useLazyQuery(COUNCIL_BACENTAS_MOBILISING)
  const [streamBacentasMobilising] = useLazyQuery(STREAM_BACENTAS_MOBILISING)
  const [gatheringServiceBacentasMobilising] = useLazyQuery(
    GATHERINGSERVICE_BACENTAS_MOBILISING
  )

  const { church, loading, error } = useChurchLevel({
    constituencyFunction: constituencyBacentasMobilising,
    councilFunction: councilBacentasMobilising,
    streamFunction: streamBacentasMobilising,
    gatheringServiceFunction: gatheringServiceBacentasMobilising,
  })

  return (
    <BaseComponent data={church} loading={loading} error={error} placeholder>
      <Container>
        <HeadingPrimary loading={loading}>Bacentas Mobilising</HeadingPrimary>
        <HeadingSecondary loading={!church?.name}>
          {church?.name} {church?.__typename}
        </HeadingSecondary>

        {church && !church?.bacentasMobilising.length && (
          <NoData text="There are no mobilising bacentas" />
        )}

        {church?.bacentasMobilising.map((bacenta, i) => {
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

        {!church?.bacentasMobilising.length && loading && (
          <PlaceholderDefaulterList loading={true} />
        )}
      </Container>
    </BaseComponent>
  )
}

export default BacentasMobilising
