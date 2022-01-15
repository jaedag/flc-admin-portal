import React from 'react'

const BacentasThatSubmitted = () => {
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

export default BacentasThatSubmitted
