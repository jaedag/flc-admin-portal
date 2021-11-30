import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import MemberTable from '../members-grids/MemberTable'
import { memberFilter } from './member-filter-utils'
import { debounce } from '../../global-utils'
import { ChurchContext } from 'contexts/ChurchContext'
import PlaceholderCustom from 'components/Placeholder.jsx'
import {
  Accordion,
  Col,
  Container,
  Row,
  useAccordionButton,
} from 'react-bootstrap'
import { CaretDownFill } from 'react-bootstrap-icons'
import './MembersGrid.css'
import Filters from './Filters'

const MembersGrid = (props) => {
  const { memberData, memberError, memberLoading, title } = props
  const { filters } = useContext(ChurchContext)
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  })

  let numberOfRecords = Math.round(
    ((dimensions.height - 96 - 30) * (0.75 * dimensions.width - 46)) /
      (160 * 126)
  )

  //NavBar takes 70px of the height and side bar takes 25% of the width
  const memberDataLoaded = memberData ? memberFilter(memberData, filters) : null

  useEffect(() => {
    const debouncedHandleResize = debounce(function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      })
    }, 500)

    window.addEventListener('resize', debouncedHandleResize)
    // console.log(dimensions)
    return () => {
      window.removeEventListener('resize', debouncedHandleResize)
    }
  })

  function CustomToggle({ children, eventKey, ...rest }) {
    const decoratedOnClick = useAccordionButton(eventKey)

    return (
      <span {...rest} onClick={decoratedOnClick}>
        {children}
      </span>
    )
  }

  return (
    <>
      <div className="col col-md-9 p-0 text-center">
        <PlaceholderCustom loading={!memberData || memberLoading} xs={10}>
          <Container>
            <h3 className="page-header">{title}</h3>
          </Container>
        </PlaceholderCustom>
        <div className="justify-content-center flex-wrap flex-md-nowrap align-items-center">
          <PlaceholderCustom
            loading={!memberData || memberLoading}
            element="h5"
          >
            <h5 className="data-number">{`${
              memberDataLoaded?.length || 0
            } Members`}</h5>
          </PlaceholderCustom>
        </div>
        <div className="align-middle">
          <input
            className="form-control member-search"
            placeholder="Search Members"
          />
        </div>

        <Accordion>
          <Row className="justify-content-between py-2">
            <Col className="my-auto">
              <Link to="/member/addmember" className="just-text-btn">
                ADD NEW
              </Link>
            </Col>
            <Col></Col>
            <Col className="my-auto">
              <CustomToggle className="just-text-btn" eventKey="0">
                FILTERS <CaretDownFill />
              </CustomToggle>
            </Col>
          </Row>
          <Accordion.Item eventKey="0">
            <Accordion.Body>
              <Filters ToggleAccordion={CustomToggle} />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
      <MemberTable
        memberData={memberDataLoaded}
        memberError={memberError}
        memberLoading={!memberData || memberLoading}
        numberOfRecords={numberOfRecords}
      />
    </>
  )
}

export default MembersGrid
