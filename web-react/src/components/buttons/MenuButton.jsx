import PlaceholderCustom from 'components/Placeholder'
import { MemberContext } from 'contexts/MemberContext'
import { capitalise } from 'global-utils'
import React, { useContext } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import './MenuButton.css'

const MenuButton = (props) => {
  const { theme, currentUser } = useContext(MemberContext)

  const icon = props.icon || props.iconComponent

  return (
    <Button
      onClick={props.onClick}
      variant="primary"
      size="lg"
      className={`${theme} ${props.color} menu-buttons`}
    >
      <Row>
        {icon && (
          <Col xs="auto" className="btn-left-col my-auto">
            <PlaceholderCustom
              loading={!currentUser.fullName}
              className="rounded-circle menu"
              as="div"
            >
              <div
                className={
                  props.iconBg &&
                  `rounded-circle menu gradient-bg ${props.color}`
                }
              >
                {props.icon && <img src={props.icon} className="square-img" />}
                {props.iconComponent && <props.iconComponent />}
              </div>
            </PlaceholderCustom>
          </Col>
        )}

        <Col className="btn-right-col">
          <PlaceholderCustom loading={!currentUser.fullName} as="div" xs={10}>
            <span> {capitalise(props.title)}</span>
          </PlaceholderCustom>
          <PlaceholderCustom loading={!currentUser.fullName} as="div" xs={10}>
            <small className="text-secondary dark menu-caption">
              {props.caption}
            </small>
          </PlaceholderCustom>
        </Col>
      </Row>
    </Button>
  )
}

export default MenuButton
