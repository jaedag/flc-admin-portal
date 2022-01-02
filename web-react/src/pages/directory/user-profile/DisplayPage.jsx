import React, { useContext } from 'react'
import { Row, Col, Image, Accordion, Stack } from 'react-bootstrap'
import { useQuery } from '@apollo/client'
import userIcon from '../../../assets/user.png'
import { MemberContext } from '../../../contexts/MemberContext'
import { getMemberDob, transformCloudinaryImg } from '../../../global-utils'
import Timeline from '../../../components/Timeline/Timeline'
import BaseComponent from 'components/base-component/BaseComponent'
import {
  DISPLAY_MEMBER_BIO,
  DISPLAY_MEMBER_CHURCH,
} from 'pages/directory/display/ReadQueries'
import PlaceholderCustom from 'components/Placeholder'
import './UserProfile.css'
import AuthButton from 'components/buttons/AuthButton'

const DisplayPage = () => {
  const { currentUser, theme } = useContext(MemberContext)

  const {
    data: bioData,
    loading,
    error,
  } = useQuery(DISPLAY_MEMBER_BIO, {
    variables: { id: currentUser?.id },
  })
  const { data: churchData } = useQuery(DISPLAY_MEMBER_CHURCH, {
    variables: { id: currentUser?.id },
  })

  const member = bioData?.members[0]
  const memberChurch = churchData?.members[0]
  const memberBirthday = getMemberDob(member)
  //const nameAndTitle = getNameWithTitle(member)

  return (
    <div className="scroll-bottom">
      <BaseComponent
        loadingState={loading}
        errorState={error}
        data={bioData}
        placeholder
      >
        <div className="py-5">
          <div className="pt-5">
            <Row className="d-flex justify-content-center">
              <Col xs={6} md={6} lg={2}>
                <PlaceholderCustom
                  xs={12}
                  loading={!member?.pictureUrl}
                  className="img bg-secondary m-2"
                >
                  <Image
                    src={
                      transformCloudinaryImg(member?.pictureUrl, 'large') ||
                      userIcon
                    }
                    fluid
                    rounded
                    className="rounded-circle bg-secondary ml-auto mr-auto"
                    style={{ objectFit: 'cover' }}
                  />
                </PlaceholderCustom>
              </Col>
            </Row>
          </div>
          <div>
            <PlaceholderCustom
              loading={!member?.fullName}
              as="h1"
              className="text-center"
            >
              <h1 className="text-center">{`${member?.fullName}`}</h1>
            </PlaceholderCustom>
            <PlaceholderCustom as="h6" className="text-center">
              <h6 className="text-center text-secondary">
                {memberChurch?.fellowship?.name}
              </h6>
            </PlaceholderCustom>
          </div>
          <div className="py-5">
            <Row className="d-flex justify-content-center">
              <Col lg={8}>
                <Accordion className={theme}>
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
                            {memberChurch?.history?.length ? (
                              <Timeline
                                record={memberChurch?.history}
                                limit={3}
                              />
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
                                {memberChurch?.bishop?.fullName}
                              </Col>
                            </Row>
                            <Row>
                              <Col className="text-secondary placeholder-display">
                                Fellowship
                              </Col>
                              <Col className="placeholder-display">
                                {memberChurch?.fellowship?.name}
                              </Col>
                            </Row>
                            <Row>
                              <Col className="text-secondary placeholder-display">
                                Ministry
                              </Col>
                              <Col className="placeholder-display">
                                {memberChurch?.ministry
                                  ? `${memberChurch?.ministry.name}`
                                  : null}
                              </Col>
                            </Row>
                          </div>
                        </Accordion.Body>
                      </Accordion.Item>
                    </div>
                  </Stack>
                </Accordion>
                <div className="mt-3 text-center">
                  <AuthButton mobileFullSize />
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </BaseComponent>
    </div>
  )
}

export default DisplayPage
