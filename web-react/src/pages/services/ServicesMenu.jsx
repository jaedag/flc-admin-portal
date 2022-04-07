import MenuButton from 'components/buttons/MenuButton'
import PlaceholderCustom from 'components/Placeholder'
import { MemberContext } from 'contexts/MemberContext'
import { ChurchContext } from 'contexts/ChurchContext'
import React, { useContext } from 'react'
import { Container } from 'react-bootstrap'
import {
  BarChartFill,
  Book,
  Coin,
  FileEarmarkArrowUpFill,
} from 'react-bootstrap-icons'
import { useNavigate } from 'react-router'

const Services = () => {
  const { currentUser, theme } = useContext(MemberContext)
  const navigate = useNavigate()
  const { clickCard } = useContext(ChurchContext)

  const church = currentUser.currentChurch
  const churchType = currentUser.currentChurch?.__typename

  return (
    <div className="d-flex align-items-center justify-content-center ">
      <Container>
        <PlaceholderCustom xs={12} as="h1">
          <div className="text-center">
            <h1 className="mb-0  page-header">{`${church?.name} ${churchType}`}</h1>
            <p className={`${theme} menu-subheading`}>Services</p>
          </div>
        </PlaceholderCustom>

        <div className="d-grid gap-2 mt-5 text-left">
          {churchType === 'Fellowship' &&
            church?.vacationStatus === 'Active' && (
              <MenuButton
                iconComponent={Book}
                title="Fellowship Service"
                color="members"
                onClick={() => navigate(`/services/fellowship`)}
                noCaption
              />
            )}
          {churchType === 'Bacenta' && (
            <MenuButton
              iconComponent={Book}
              title="Bacenta Service"
              color="members"
              onClick={() => navigate(`/services/bacenta`)}
              noCaption
            />
          )}
          {['Constituency', 'Council'].includes(churchType) && (
            <MenuButton
              iconComponent={Book}
              title={`${churchType} Joint Service`}
              color="members"
              noCaption
              onClick={() =>
                navigate(`/${churchType.toLowerCase()}/record-service`)
              }
            />
          )}

          <MenuButton
            iconComponent={BarChartFill}
            title="Trends"
            color="members"
            noCaption
            onClick={() => navigate(`/${churchType.toLowerCase()}/reports`)}
          />
          {['Council', 'Constituency', 'Fellowship'].includes(churchType) && (
            <>
              <MenuButton
                iconComponent={FileEarmarkArrowUpFill}
                title="Upload Banking Slips"
                color="banking"
                noCaption
                onClick={() => {
                  clickCard(church)
                  navigate(
                    `/services/${churchType.toLowerCase()}/banking-slips`
                  )
                }}
              />

              <MenuButton
                iconComponent={Coin}
                title="Self Banking Option"
                color="banking"
                noCaption
                onClick={() =>
                  navigate(`/services/${churchType.toLowerCase()}/self-banking`)
                }
              />
            </>
          )}
        </div>
      </Container>
    </div>
  )
}

export default Services
