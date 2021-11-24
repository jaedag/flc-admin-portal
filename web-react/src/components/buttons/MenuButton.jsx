import PlaceholderCustom from 'components/Placeholder'
import { MemberContext } from 'contexts/MemberContext'
import { capitalise } from 'global-utils'
import React, { useContext } from 'react'
import { Button, Col, Row } from 'react-bootstrap'

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
              className="rounded-circle"
              as="div"
            >
              <div
                className={
                  props.iconBg && `rounded-circle gradient-bg ${props.color}`
                }
              >
                {props.icon && <img src={props.icon} className="square-img" />}
                {props.iconComponent && <props.iconComponent />}
              </div>
              {props.iconCaption && (
                <small className={`${theme} icon-caption`}>
                  {props.iconCaption}
                </small>
              )}
            </PlaceholderCustom>
          </Col>
        )}

        <Col className="btn-right-col">
          <PlaceholderCustom loading={!props.title} as="div" xs={10}>
            <span> {capitalise(props.title)}</span>
          </PlaceholderCustom>
          {!props.noCaption && (
            <PlaceholderCustom loading={!props.caption} as="div" xs={10}>
              <small className="text-secondary dark menu-caption">
                {props.caption}
              </small>
            </PlaceholderCustom>
          )}
        </Col>
      </Row>
    </Button>
  )
}

export default MenuButton
