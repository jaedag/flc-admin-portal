import RoleView from 'auth/RoleView'
import MenuButton from 'components/buttons/MenuButton'
import PlaceholderCustom from 'components/Placeholder'
import { MemberContext } from 'contexts/MemberContext'
import { parseMemberCount } from 'global-utils'
import React, { useContext } from 'react'
import { Container } from 'react-bootstrap'
import { EmojiFrown } from 'react-bootstrap-icons'
import { useHistory } from 'react-router'
import MemberIcon from '../../assets/people-svgrepo-com-2.svg'

const ServicesChurchList = () => {
  const { currentUser, setCurrentUser, userJobs, theme } =
    useContext(MemberContext)

  const history = useHistory()
  return (
    <div className="d-flex align-items-center justify-content-center ">
      <Container>
        <PlaceholderCustom xs={12} as="h1">
          <div className="text-center">
            <h1 className="mb-0  page-header">{`${currentUser.fullName}'s`}</h1>
            <p className={`${theme} menu-subheading`}>Services</p>
          </div>
        </PlaceholderCustom>

        <div className="d-grid gap-2 mt-5 text-left">
          {userJobs?.jobs[0] ? (
            userJobs.jobs.map((job, index) => (
              <MenuButton
                key={index}
                title={job.church.name}
                caption={parseMemberCount(job.church.memberCount)}
                icon={MemberIcon}
                iconBg={true}
                iconCaption={job.church.__typename}
                onClick={() => {
                  job.clickCard()
                  setCurrentUser({
                    ...currentUser,
                    currentChurch: job.church,
                  })
                  history.push('/services')
                }}
                color="churches"
              />
            ))
          ) : (
            <>
              <MenuButton color="churches" />
              <MenuButton color="churches" />
            </>
          )}

          <RoleView
            roles={['adminTown', 'leaderTown', 'adminCampus', 'leaderCampus']}
          >
            <MenuButton
              title="Defaulters"
              color="danger"
              iconComponent={EmojiFrown}
              onClick={() => history.push('/services/defaulters')}
              noCaption
            />
          </RoleView>
        </div>
      </Container>
    </div>
  )
}

export default ServicesChurchList
