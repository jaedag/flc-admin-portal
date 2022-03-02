import MenuButton from 'components/buttons/MenuButton'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import { MemberContext } from 'contexts/MemberContext'
import React from 'react'
import { useContext } from 'react'
import { Container } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import MemberIcon from '../../assets/people-svgrepo-com-2.svg'
import HeadingSecondary from 'components/HeadingSecondary'
import { ChurchContext } from 'contexts/ChurchContext'

const Arrivals = () => {
  const { userJobs } = useContext(MemberContext)
  const { clickCard } = useContext(ChurchContext)
  const navigate = useNavigate()
  // console.log(getUserChurchTypeList(userJobs))
  // let arrivalsChurches = getUserChurchTypeList(userJobs)?.filter(
  //   (church) => church !== 'Fellowship'
  // )

  return (
    <Container>
      <HeadingPrimary>Arrivals</HeadingPrimary>
      <HeadingSecondary>
        Click on one of the categories to see your churches
      </HeadingSecondary>
      {/* This Page will require a redesign. Possibly by Basoah */}
      <div className="d-grid gap-2 mt-5 text-left">
        {userJobs?.assessmentData ? (
          userJobs?.jobs.map((role) => {
            if (role.name === 'Fellowship' || role.name === 'Fellowships') {
              return null
            }
            return role.church.map((church, index) => (
              <MenuButton
                key={index}
                title={church.name}
                caption={`${church.memberCount} Members`}
                icon={MemberIcon}
                iconCaption={church.__typename}
                iconBg={true}
                color="arrivals"
                onClick={() => {
                  clickCard(church)
                  navigate(`/arrivals/${church.__typename.toLowerCase()}`)
                }}
              />
            ))
          })
        ) : (
          <>
            <MenuButton color="arrivals" />
            <MenuButton color="arrivals" />
            <MenuButton color="arrivals" />
            <MenuButton color="arrivals" />
          </>
        )}
      </div>
    </Container>
  )
}

export default Arrivals
