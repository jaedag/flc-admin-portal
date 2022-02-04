import MenuButton from 'components/buttons/MenuButton'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import { MemberContext } from 'contexts/MemberContext'
import React from 'react'
import { useContext } from 'react'
import { Container } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import MemberIcon from '../../assets/people-svgrepo-com-2.svg'
import HeadingSecondary from 'components/HeadingSecondary'

const Arrivals = () => {
  const { userJobs } = useContext(MemberContext)
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
          userJobs?.jobs.map((role, index) => {
            if (role.name === 'Fellowship' || role.name === 'Fellowships') {
              return null
            }

            return (
              <MenuButton
                key={index}
                title={role.name}
                caption={`${role.number} ${role.name}`}
                icon={MemberIcon}
                iconBg={true}
                color="arrivals"
                onClick={() => navigate(`/arrivals/${role.name.toLowerCase()}`)}
              />
            )
          })
        ) : (
          <>
            <MenuButton color="arrivals" />
            <MenuButton color="arrivals" />
          </>
        )}
      </div>
    </Container>
  )
}

export default Arrivals
