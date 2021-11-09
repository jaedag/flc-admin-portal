import { MemberContext } from 'contexts/MemberContext'
import { capitalise } from 'global-utils'
import React, { useContext } from 'react'
import { Button, Col, Row } from 'react-bootstrap'

const MenuButton = ({ icon, title, color, caption, onClick }) => {
  const { theme } = useContext(MemberContext)

  return (
    <Button
      onClick={onClick}
      variant="primary"
      size="lg"
      className={`${theme} ${color} menu-buttons`}
    >
      <Row>
        <Col xs="auto" className="btn-left-col">
          <img src={icon} />
        </Col>
        <Col className="btn-right-col">
          <span className> {capitalise(title)}</span>
          <small className="text-secondary dark menu-caption">{caption}</small>
        </Col>
      </Row>
    </Button>
  )
}

export default MenuButton
