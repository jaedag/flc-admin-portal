import RoleView from 'auth/RoleView'
import MenuButton from 'components/buttons/MenuButton'
import PlaceholderCustom from 'components/Placeholder'
import { MemberContext } from 'contexts/MemberContext'
import { permitLeaderAdmin } from 'permission-utils'
import React, { useContext } from 'react'
import { Container } from 'react-bootstrap'
import { EmojiFrown } from 'react-bootstrap-icons'
import { useNavigate } from 'react-router'
import ChurchList from './ChurchList'

const ServicesChurchList = () => {
  const { currentUser, theme } = useContext(MemberContext)

  const navigate = useNavigate()
  return (
    <div className="d-flex align-items-center justify-content-center ">
      <Container>
        <PlaceholderCustom xs={12} as="h1">
          <div className="text-center">
            <h1 className="mb-0  page-header">{`${currentUser.fullName}'s`}</h1>
            <p className={`${theme} menu-subheading`}>Services</p>
          </div>
        </PlaceholderCustom>
        <ChurchList link="/services" color="churches" />
        <div className="d-grid gap-2 mt-2 text-left">
          <RoleView roles={permitLeaderAdmin('Constituency')}>
            <MenuButton
              title="Defaulters"
              color="danger"
              iconComponent={EmojiFrown}
              onClick={() => navigate('/services/defaulters')}
              noCaption
            />
          </RoleView>
        </div>
      </Container>
    </div>
  )
}

export default ServicesChurchList
