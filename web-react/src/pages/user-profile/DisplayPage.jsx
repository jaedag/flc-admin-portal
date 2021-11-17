import React, { useContext } from 'react'
import { Row, Col, Image, Accordion, Stack } from 'react-bootstrap'
import { useQuery } from '@apollo/client'
import userIcon from '../../assets/user.png'
import { MemberContext } from '../../contexts/MemberContext'
import { getMemberDob, transformCloudinaryImg } from '../../global-utils'
import Timeline from '../../components/Timeline/Timeline'
import BaseComponent from 'components/base-component/BaseComponent'
import { DISPLAY_MEMBER } from 'pages/display/ReadQueries'
//import { useLocation } from 'react-router'

const DisplayPage = () => {
  const { currentUser } = useContext(MemberContext)

  const { data, loading, error } = useQuery(DISPLAY_MEMBER, {
    variables: { id: currentUser.id },
  })

  //const location = useLocation()
  //const atProfile = location.pathname === '/user-profile'

  const member = data?.member
  const memberBirthday = getMemberDob(member)
  //const nameAndTitle = getNameWithTitle(member)

  return (
    <div className="scroll-bottom">
      <BaseComponent loadingState={loading} errorState={error} data={data}>
        <div className="py-5">
          <div className="pt-5">
            <Row className="d-flex justify-content-center">
              <Col xs={6} md={6}>
                <Image
                  src={
                    transformCloudinaryImg(member?.pictureUrl, 'large') ||
                    userIcon
                  }
                  fluid
                  rounded
                  className="rounded-circle bg-secondary m-2"
                  style={{ objectFit: 'cover' }}
                />
              </Col>
            </Row>
          </div>
          <div>
            <h1 className="text-center">{`${member?.fullName}`}</h1>
            <h6 className="text-center text-secondary">
              {member?.bacenta?.name}
            </h6>
          </div>
          <div className="py-5">
            <Accordion>
              <Stack gap={4}>
                <div className="px-4">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>Bio</Accordion.Header>
                    <Accordion.Body>
                      <div>
                        <Row>
                          <Col className="text-secondary placeholder-display">
                            First Name
                          </Col>
                          <Col className="placeholder-display">
                            {member?.firstName}
                          </Col>
                        </Row>
                        <Row>
                          <Col className="text-secondary placeholder-display">
                            Middle Name
                          </Col>
                          <Col className="placeholder-display">
                            {member?.middleName}
                          </Col>
                        </Row>
                        <Row>
                          <Col className="text-secondary placeholder-display">
                            Last Name
                          </Col>
                          <Col className="placeholder-display">
                            {member?.lastName}
                          </Col>
                        </Row>
                        <Row>
                          <Col className="text-secondary placeholder-display">
                            Email Address
                          </Col>
                          <Col className="placeholder-display">
                            {member?.email}
                          </Col>
                        </Row>
                        <Row>
                          <Col className="text-secondary placeholder-display">
                            Date Of Birth
                          </Col>
                          <Col className="placeholder-display">
                            {memberBirthday && memberBirthday}
                          </Col>
                        </Row>
                        <Row>
                          <Col className="text-secondary placeholder-display">
                            Gender
                          </Col>
                          <Col className="placeholder-display">
                            {member?.gender ? member?.gender.gender : null}
                          </Col>
                        </Row>
                        <Row>
                          <Col className="text-secondary placeholder-display">
                            Marital Status
                          </Col>
                          <Col className="placeholder-display">
                            {member?.maritalStatus
                              ? member?.maritalStatus.status
                              : null}
                          </Col>
                        </Row>
                        <Row>
                          <Col className="text-secondary placeholder-display">
                            Occupation
                          </Col>
                          <Col className="placeholder-display">
                            {member?.occupation
                              ? member?.occupation.occupation
                              : '-'}
                          </Col>
                        </Row>
                        <Row>
                          <Col className="text-secondary placeholder-display">
                            Phone Number
                          </Col>
                          <Col className="placeholder-display">
                            {member?.phoneNumber}
                          </Col>
                        </Row>
                        <Row>
                          <Col className="text-secondary placeholder-display">
                            WhatsApp No.
                          </Col>
                          <Col className="placeholder-display">
                            <a
                              className="font-weight-bold"
                              href={`https://wa.me/${member?.whatsappNumber}`}
                            >
                              {member?.whatsappNumber}
                            </a>
                          </Col>
                        </Row>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                </div>
                <div className="px-4">
                  <Accordion.Item eventKey="1">
                    <Accordion.Header>History</Accordion.Header>
                    <Accordion.Body>
                      <div>
                        {member?.history?.length ? (
                          <Timeline record={member?.history} limit={3} />
                        ) : null}
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                </div>
                <div className="px-4">
                  <Accordion.Item eventKey="2">
                    <Accordion.Header>Church Groups</Accordion.Header>
                    <Accordion.Body>
                      <div className="col-mt-2">
                        <Row>
                          <Col className="text-secondary placeholder-display">
                            Bishop
                          </Col>
                          <Col className="placeholder-display">
                            {member?.bishop?.fullName}
                          </Col>
                        </Row>
                        <Row>
                          <Col className="text-secondary placeholder-display">
                            Bacenta
                          </Col>
                          <Col className="placeholder-display">
                            {member?.bacenta?.name}
                          </Col>
                        </Row>
                        <Row>
                          <Col className="text-secondary placeholder-display">
                            Ministry
                          </Col>
                          <Col className="placeholder-display">
                            {member?.ministry
                              ? `${member?.ministry.name}`
                              : null}
                          </Col>
                        </Row>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                </div>
              </Stack>
            </Accordion>
          </div>
        </div>
      </BaseComponent>
    </div>
  )
}

export default DisplayPage
