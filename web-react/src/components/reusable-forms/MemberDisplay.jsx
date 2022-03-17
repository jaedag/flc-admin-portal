import React from 'react'
import { useQuery } from '@apollo/client'
import userIcon from '../../assets/user.png'
import Timeline from '../../components/Timeline/Timeline'
import MemberRoleList from '../../components/MemberRoleList'
import {
  getNameWithTitle,
  transformCloudinaryImg,
  throwErrorMsg,
  getHighestTitle,
} from '../../global-utils'
import { getMemberDob } from 'date-utils'
import {
  DISPLAY_MEMBER_ADMIN,
  DISPLAY_MEMBER_BIO,
  DISPLAY_MEMBER_CHURCH,
  DISPLAY_MEMBER_LEADERSHIP,
} from 'pages/directory/display/ReadQueries'
import { Col, Container, Row } from 'react-bootstrap'
import PlaceholderCustom from 'components/Placeholder'
import DetailsCard from 'components/card/DetailsCard'
import EditButton from 'components/buttons/EditButton'
import RoleView from 'auth/RoleView'
import ViewAll from 'components/buttons/ViewAll'
import { permitAdmin } from 'permission-utils'

const MemberDisplay = ({ memberId }) => {
  const {
    data: bioData,
    loading,
    error,
  } = useQuery(DISPLAY_MEMBER_BIO, {
    variables: { id: memberId },
  })
  const { data: churchData } = useQuery(DISPLAY_MEMBER_CHURCH, {
    variables: { id: memberId },
  })
  const { data: leaderData } = useQuery(DISPLAY_MEMBER_LEADERSHIP, {
    variables: { id: memberId },
  })
  const { data: adminData } = useQuery(DISPLAY_MEMBER_ADMIN, {
    variables: { id: memberId },
  })
  throwErrorMsg(error)

  const member = bioData?.members[0]
  const memberChurch = churchData?.members[0]
  const memberLeader = leaderData?.members[0]
  const memberAdmin = adminData?.members[0]
  const memberBirthday = getMemberDob(member)
  const nameAndTitle = getNameWithTitle(member)

  return (
    <Container>
      <RoleView roles={permitAdmin('Constituency')}>
        <EditButton link="/member/editmember" />
      </RoleView>

      <div className="d-flex justify-content-center pb-4">
        <PlaceholderCustom
          as="div"
          className="profile-img mx-auto"
          loading={!member || loading}
          xs={12}
        >
          <div>
            <img
              src={
                transformCloudinaryImg(member?.pictureUrl, 'large') || userIcon
              }
              className="profile-img"
              alt={`${member?.fullName}`}
            />
          </div>
        </PlaceholderCustom>
      </div>

      <div className="text-center">
        <PlaceholderCustom as="h3" loading={!member || loading}>
          <h3>{nameAndTitle}</h3>
        </PlaceholderCustom>
        <MemberRoleList memberLeader={memberLeader} memberAdmin={memberAdmin} />
      </div>
      <Row>
        <Col>
          <DetailsCard heading="First Name" detail={member?.firstName} />
        </Col>
        <Col>
          <DetailsCard heading="Last Name" detail={member?.lastName || ''} />
        </Col>
        {member?.middleName && (
          <Col sm={1} md="auto">
            <DetailsCard
              heading="Middle Name"
              detail={member?.middleName || ' '}
            />
          </Col>
        )}
      </Row>
      <Row>
        <Col>
          <DetailsCard heading="Gender" detail={member?.gender?.gender} />
        </Col>
        <Col>
          <DetailsCard
            heading="Marital Status"
            detail={member?.maritalStatus?.status}
          />
        </Col>
      </Row>
      <Row>
        <Col sm={1} md="auto">
          <DetailsCard heading="Date of Birth" detail={memberBirthday || ''} />
        </Col>
        <Col sm={1} md="auto">
          <a href={`tel:${member?.phoneNumber}`}>
            <DetailsCard
              heading="Phone Number"
              loading={!member?.phoneNumber}
              detail={'+' + member?.phoneNumber}
            />
          </a>
        </Col>

        <Col sm={1} md="auto">
          <a href={`https://wa.me/${member?.whatsappNumber}`}>
            <DetailsCard
              heading="Whatsapp Number"
              loading={!member?.whatsappNumber}
              detail={'+' + member?.whatsappNumber}
            />
          </a>
        </Col>
      </Row>
      <Row>
        {member?.occupation?.occupation && (
          <Col sm={1} md="auto">
            <DetailsCard
              heading="Occupation"
              detail={member?.occupation?.occupation || ''}
            />
          </Col>
        )}
        <Col sm={1} md="auto">
          <DetailsCard heading="Email Address" detail={member?.email} />
        </Col>
        <Col sm={1} md="auto">
          <DetailsCard
            heading="Fellowship"
            detail={memberChurch?.fellowship?.name}
          />
        </Col>
        {memberChurch?.ministry && (
          <Col>
            <DetailsCard
              heading="Ministry"
              detail={memberChurch?.ministry?.name}
            />
          </Col>
        )}

        {member?.titleConnection?.edges[0]?.node.title && (
          <Col sm={1} md="auto">
            <DetailsCard
              heading="Pastoral Rank"
              detail={getHighestTitle(member)}
            />
          </Col>
        )}

        <Row className="mt-5">
          <Col>
            <PlaceholderCustom>
              <h3>Church History</h3>
            </PlaceholderCustom>
          </Col>
          <Col className="col-auto">
            <ViewAll to={`/member/history`} />
          </Col>
        </Row>
        <Timeline record={memberChurch?.history} limit={3} />
      </Row>
    </Container>
  )
}

export default MemberDisplay
