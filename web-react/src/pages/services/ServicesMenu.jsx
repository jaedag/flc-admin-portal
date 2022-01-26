import MenuButton from 'components/buttons/MenuButton'
import PlaceholderCustom from 'components/Placeholder'
import { MemberContext } from 'contexts/MemberContext'
import React, { useContext } from 'react'
import { Container } from 'react-bootstrap'
import {
  BarChartFill,
  Book,
  FileEarmarkArrowUpFill,
} from 'react-bootstrap-icons'
import { useNavigate } from 'react-router'

const Services = () => {
  const { currentUser, theme } = useContext(MemberContext)
  const navigate = useNavigate()

  return (
    <div className="d-flex align-items-center justify-content-center ">
      <Container>
        <PlaceholderCustom xs={12} as="h1">
          <div className="text-center">
            <h1 className="mb-0  page-header">{`${currentUser.currentChurch?.name} ${currentUser.currentChurch?.__typename}`}</h1>
            <p className={`${theme} menu-subheading`}>Services</p>
          </div>
        </PlaceholderCustom>

        <div className="d-grid gap-2 mt-5 text-left">
          {currentUser.currentChurch?.__typename === 'Fellowship' && (
            <MenuButton
              iconComponent={Book}
              title="Fellowship Service"
              color="members"
              onClick={() => navigate(`/services/fellowship`)}
              noCaption
            />
          )}
          {currentUser.currentChurch?.__typename === 'Bacenta' && (
            <MenuButton
              iconComponent={Book}
              title="Bacenta Service"
              color="members"
              onClick={() => navigate(`/services/bacenta`)}
              noCaption
            />
          )}
          {currentUser.currentChurch?.__typename === 'Constituency' && (
            <MenuButton
              iconComponent={Book}
              title="Constituency Joint Service"
              color="members"
              noCaption
              onClick={() => navigate(`/constituency/record-service`)}
            />
          )}

          <MenuButton
            iconComponent={BarChartFill}
            title="Trends"
            color="members"
            noCaption
            onClick={() =>
              navigate(
                `/${currentUser.currentChurch?.__typename.toLowerCase()}/reports`
              )
            }
          />
          {currentUser.currentChurch?.__typename === 'Fellowship' && (
            <MenuButton
              iconComponent={FileEarmarkArrowUpFill}
              title="Banking Slips"
              color="members"
              noCaption
              onClick={() => navigate(`/services/banking-slips`)}
            />
          )}
        </div>
      </Container>
    </div>
  )
}

export default Services
