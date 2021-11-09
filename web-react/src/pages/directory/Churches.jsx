import MenuButton from 'components/buttons/MenuButton'
import PlaceholderCustom from 'components/Placeholder'
import { MemberContext } from 'contexts/MemberContext'
import React, { useContext } from 'react'
import { Container } from 'react-bootstrap'
import { useHistory } from 'react-router'
import MemberIcon from '../../assets/people-svgrepo-com-2.svg'

const Churches = () => {
  const { currentUser, userJobs } = useContext(MemberContext)
  const history = useHistory()

  return (
    <div className="d-flex align-items-center justify-content-center h-75 nav-margin-top-0">
      <Container>
        <PlaceholderCustom loading={!currentUser.fullName} xs={12} as="h1">
          <div className="text-center">
            <h1 className="mb-0  page-header">{`${currentUser.fullName}'s`}</h1>
            <p className="text-secondary dark menu-caption">Churches</p>
          </div>
        </PlaceholderCustom>

        <div className="d-grid gap-2 mt-5 text-left">
          {userJobs.jobs.map((job, index) => (
            <MenuButton
              key={index}
              title={job.church.name}
              icon={MemberIcon}
              onClick={() => {
                job.clickCard()
                history.push(job.link)
              }}
              color="churches"
            />
          ))}
        </div>
      </Container>
    </div>
  )
}

export default Churches
