import { useQuery } from '@apollo/client'
import BaseComponent from 'components/base-component/BaseComponent'
import MenuButton from 'components/buttons/MenuButton'
import { MemberContext } from 'contexts/MemberContext'
import React from 'react'
import { useContext } from 'react'
import { Container } from 'react-bootstrap'
import { BACENTA_LEADER_ARRIVALS } from './arrivalsQueries'
import { useNavigate } from 'react-router'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import MemberIcon from '../../assets/people-svgrepo-com-2.svg'
import { ChurchContext } from 'contexts/ChurchContext'

const BacentaArrivals = () => {
  const { currentUser } = useContext(MemberContext)
  const { clickCard } = useContext(ChurchContext)
  const navigate = useNavigate()
  const { data, loading, error } = useQuery(BACENTA_LEADER_ARRIVALS, {
    variables: { id: currentUser.id },
  })

  const member = data?.members[0]

  return (
    <BaseComponent data={data} loading={loading} error={error}>
      <Container>
        <HeadingPrimary loading={loading}>
          {member?.fullName} Bacenta Arrivals
        </HeadingPrimary>

        <div className="d-grid gap-2">
          {member?.leadsBacenta.map((bacenta, i) => (
            <MenuButton
              key={i}
              title={`${bacenta.name}`}
              onClick={() => {
                clickCard(bacenta)
                navigate('/arrivals/submit-bus-picture')
              }}
              icon={MemberIcon}
              iconCaption="Bacenta"
              iconBg
              color="members"
              noCaption
            />
          ))}
        </div>
      </Container>
    </BaseComponent>
  )
}

export default BacentaArrivals
