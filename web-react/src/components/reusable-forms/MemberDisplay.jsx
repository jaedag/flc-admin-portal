import React from 'react'
import { useQuery } from '@apollo/client'
import userIcon from '../../assets/user.png'
import Timeline from '../../components/Timeline/Timeline'
import MemberRoleList from '../../components/MemberRoleList'
import {
  getNameWithTitle,
  getMemberDob,
  transformCloudinaryImg,
  throwErrorMsg,
} from '../../global-utils'
import { DISPLAY_MEMBER } from 'pages/display/ReadQueries'
import { useLocation } from 'react-router'
import AuthButton from 'components/buttons/AuthButton'
import { Col, Container, Row } from 'react-bootstrap'
import PlaceholderCustom from 'components/Placeholder'
import DetailsCard from 'components/card/DetailsCard'
import EditButton from 'components/buttons/EditButton'
import RoleView from 'auth/RoleView'
import ViewAll from 'components/buttons/ViewAll'

const MemberDisplay = ({ memberId }) => {
  const { data, loading, error } = useQuery(DISPLAY_MEMBER, {
    variables: { id: memberId },
  })
  throwErrorMsg(error)
  const location = useLocation()
  const atProfile = location.pathname === '/user-profile'

  const member = data?.member
  const memberBirthday = getMemberDob(member)
  const nameAndTitle = getNameWithTitle(member)

  return (
    <Container>
      <RoleView
        roles={['adminCouncil', 'adminFederal', 'adminCampus', 'adminTown']}
      >
        <EditButton link="/member/editmember" />
      </RoleView>
      <Row>
        <Col>
          <PlaceholderCustom
            as="div"
            className="profile-img"
            loading={!member || loading}
            xs={12}
          >
            <div>
              <img
                src={
                  transformCloudinaryImg(member?.pictureUrl, 'large') ||
                  userIcon
                }
                className="profile-img"
                alt={`${member?.fullName}`}
              />
            </div>
          </PlaceholderCustom>
        </Col>
        <Col>
          <PlaceholderCustom as="h3" loading={!member || loading}>
            <h3>{nameAndTitle}</h3>
          </PlaceholderCustom>
          <MemberRoleList member={member} />
        </Col>
      </Row>
      <Row>
        <Col>
          <DetailsCard heading="Gender" detail={member?.gender.gender} />
        </Col>
        <Col>
          <DetailsCard
            heading="Marital Status"
            detail={member?.maritalStatus.status}
          />
        </Col>
        <Col sm={1}>
          <DetailsCard heading="Date of Birth" detail={memberBirthday} />
        </Col>
        <Col sm={1}>
          <a href={`tel:${member?.phoneNumber}`}>
            <DetailsCard
              heading="Phone Number"
              loading={!member?.phoneNumber}
              detail={'+' + member?.phoneNumber}
            />
          </a>
        </Col>
        <Col sm={1}>
          <a href={`https://wa.me/${member?.whatsappNumber}`}>
            <DetailsCard
              heading="Whatsapp Number"
              loading={!member?.whatsappNumber}
              detail={'+' + member?.whatsappNumber}
            />
          </a>
        </Col>
        <Col sm={1}>
          <DetailsCard
            heading="Occupation"
            detail={member?.occupation?.occupation}
          />
        </Col>
        <Col sm={1}>
          <DetailsCard heading="Email Address" detail={member?.email} />
        </Col>
        <Col sm={1}>
          <DetailsCard heading="Bacenta" detail={member?.bacenta?.name} />
        </Col>
        <Col>
          <DetailsCard heading="Ministry" detail={member?.ministry?.name} />
        </Col>

        <Col sm={1}>
          <DetailsCard
            heading="Pastoral Rank"
            detail={member?.titleConnection.edges[0]?.node.title}
          />
        </Col>
        <Col className="mt-5">
          <Row>
            <Col>
              <PlaceholderCustom>
                <h3>Church History</h3>
              </PlaceholderCustom>
            </Col>
            <Col className="col-auto">
              <ViewAll to={`/member/history`} />
            </Col>
          </Row>
          <Timeline record={member?.history} limit={3} />
        </Col>
      </Row>

      {atProfile && (
        <div className="row justify-content-center my-2 mb-4">
          <div className="col-auto ">
            <AuthButton mobileFullSize="true" />
          </div>
        </div>
      )}
    </Container>
  )
}

export default MemberDisplay
