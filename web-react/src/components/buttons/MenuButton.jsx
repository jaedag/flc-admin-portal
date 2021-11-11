import PlaceholderCustom from 'components/Placeholder'
import { MemberContext } from 'contexts/MemberContext'
import { capitalise } from 'global-utils'
import React, { useContext } from 'react'
import { Button, Col, Row } from 'react-bootstrap'

const MenuButton = ({ icon, title, color, caption, onClick, iconBg }) => {
  const { theme, currentUser } = useContext(MemberContext)

  return (
    <Button
      onClick={onClick}
      variant="primary"
      size="lg"
      className={`${theme} ${color} menu-buttons`}
    >
      <Row>
        <Col xs="auto" className="btn-left-col my-auto">
          <PlaceholderCustom
            loading={!currentUser.fullName}
            className="rounded-circle"
            as="div"
          >
            <div className={iconBg && `rounded-circle gradient-bg`}>
              <img src={icon} className="square-img" />
            </div>
          </PlaceholderCustom>
        </Col>

        <Col className="btn-right-col">
          <PlaceholderCustom loading={!currentUser.fullName} as="div" xs={10}>
            <span className> {capitalise(title)}</span>
          </PlaceholderCustom>
          <PlaceholderCustom loading={!currentUser.fullName} as="div" xs={10}>
            <small className="text-secondary dark menu-caption">
              {caption}
            </small>
          </PlaceholderCustom>
        </Col>
      </Row>
    </Button>
  )
}

export default MenuButton
