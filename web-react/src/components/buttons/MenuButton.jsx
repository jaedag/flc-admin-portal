import PlaceholderCustom from 'components/Placeholder'
import { MemberContext } from 'contexts/MemberContext'
import { capitalise } from 'global-utils'
import React, { useContext } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import './MenuButton.css'

const MenuButton = (props) => {
  const { theme } = useContext(MemberContext)

  const icon = props.icon || props.iconComponent || props.avatar || props.number

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
            <PlaceholderCustom className="rounded-circle menu" as="div">
              <div
                className={
                  props.iconBg &&
                  `rounded-circle menu gradient-bg ${props.color}`
                }
              >
                {props.avatar && <img src={props.avatar} className="avatar" />}
                {props.icon && <img src={props.icon} className="square-img" />}
                {props.iconComponent && <props.iconComponent />}
                {props.number && <div className="fw-bold">{props.number}</div>}
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
            <span>{capitalise(props.title)}</span>
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
