import MenuButton from 'components/buttons/MenuButton'
import PlaceholderCustom from 'components/Placeholder'
import { MemberContext } from 'contexts/MemberContext'
import React, { useContext } from 'react'
import { Container } from 'react-bootstrap'
import { PencilSquare, XCircleFill } from 'react-bootstrap-icons'
import { useHistory } from 'react-router'

const Fellowship = () => {
  const { currentUser, theme } = useContext(MemberContext)
  const history = useHistory()
  return (
    <div className="d-flex align-items-center justify-content-center ">
      <Container>
        <PlaceholderCustom xs={12} as="h1">
          <div className="text-center">
            <h1 className="mb-0  page-header">{`${currentUser.currentChurch?.name} ${currentUser.currentChurch?.__typename}`}</h1>
            <p className={`${theme} menu-subheading`}>Fellowship</p>
          </div>
        </PlaceholderCustom>

        <div className="d-grid gap-2 mt-5 text-left">
          <MenuButton
            iconComponent={PencilSquare}
            title="Fill Service Form"
            color="members"
            onClick={() => history.push(`/services/bacenta/form`)}
            noCaption
          />
          <MenuButton
            iconComponent={XCircleFill}
            title="No Service"
            color="members"
            onClick={() => history.push(`/services/bacenta/no-service`)}
            noCaption
          />
        </div>
      </Container>
    </div>
  )
}

export default Fellowship
