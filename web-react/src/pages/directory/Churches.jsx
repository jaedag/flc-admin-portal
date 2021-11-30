import MenuButton from 'components/buttons/MenuButton'
import PlaceholderCustom from 'components/Placeholder'
import { MemberContext } from 'contexts/MemberContext'
import { parseMemberCount } from 'global-utils'
import React, { useContext } from 'react'
import { Container } from 'react-bootstrap'
import { useHistory } from 'react-router'
import MemberIcon from '../../assets/people-svgrepo-com-2.svg'

const Churches = () => {
  const { currentUser, userJobs } = useContext(MemberContext)
  const history = useHistory()

  return (
    <div className="d-flex align-items-center justify-content-center ">
      <Container>
        <div className="text-center">
          <PlaceholderCustom loading={!currentUser.fullName} xs={12} as="h1">
            {' '}
            <h1 className="mb-0 page-header">{`${currentUser.fullName}'s`}</h1>
          </PlaceholderCustom>
          <PlaceholderCustom loading={!currentUser.fullName} as="p">
            <p className="text-secondary dark menu-caption">Churches</p>
          </PlaceholderCustom>
        </div>

        <div className="d-grid gap-2 mt-5 text-left">
          {userJobs?.jobs[0] ? (
            userJobs.jobs.map((job, index) => (
              <MenuButton
                key={index}
                title={job.church.name}
                caption={parseMemberCount(job.church.memberCount)}
                icon={MemberIcon}
                iconBg
                iconCaption={job.church.__typename}
                onClick={() => {
                  job.clickCard()
                  history.push(job.link)
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
        </div>
      </Container>
    </div>
  )
}

export default Churches
