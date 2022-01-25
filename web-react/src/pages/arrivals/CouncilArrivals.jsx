import { useQuery } from '@apollo/client'
import BaseComponent from 'components/base-component/BaseComponent'
import MenuButton from 'components/buttons/MenuButton'
import { ChurchContext } from 'contexts/ChurchContext'
import React from 'react'
import { useContext } from 'react'
import { Container } from 'react-bootstrap'
import { COUNCIL_LEADER_ARRIVALS } from './arrivalsQueries'
import { useNavigate } from 'react-router'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import { MemberContext } from 'contexts/MemberContext'
import MemberIcon from '../../assets/people-svgrepo-com-2.svg'

const CouncilArrivals = () => {
  const { currentUser } = useContext(MemberContext)
  const { clickCard } = useContext(ChurchContext)
  const navigate = useNavigate()
  const { data, loading, error } = useQuery(COUNCIL_LEADER_ARRIVALS, {
    variables: { id: currentUser.id },
  })

  const member = data?.members[0]

  return (
    <BaseComponent data={data} loading={loading} error={error}>
      <Container>
        <HeadingPrimary loading={loading}>
          {member?.fullName} Council Arrivals
        </HeadingPrimary>

        <div className="d-grid gap-2">
          {member?.leadsCouncil.map((council, i) => (
            <MenuButton
              key={i}
              title={`${council.name}`}
              onClick={() => {
                clickCard(council)
                navigate('/arrivals/council/dashboard')
              }}
              icon={MemberIcon}
              iconCaption="Council"
              iconBg
              color="arrivals"
              noCaption
            />
          ))}
        </div>
      </Container>
    </BaseComponent>
  )
}

export default CouncilArrivals
