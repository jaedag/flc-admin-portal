import React, { useContext } from 'react'
import { useNavigate } from 'react-router'
import ChurchGraph from 'components/ChurchGraph/ChurchGraph'
import './Dashboards.css'
import { MemberContext } from 'contexts/MemberContext'
import { useQuery } from '@apollo/client'
import {
  SERVANTS_ADMIN,
  SERVANTS_DASHBOARD,
  SERVANTS_LEADERSHIP,
} from './DashboardQueries'
import RoleCard from './RoleCard'
import {
  getServiceGraphData,
  getMonthlyStatAverage,
} from '../services/reports/report-utils'
import { ChurchContext } from 'contexts/ChurchContext'
import StatDisplay from 'pages/services/reports/CompStatDisplay'
import {
  authorisedLink,
  isAuthorised,
  permitMeAndThoseAbove,
  plural,
} from 'global-utils'
import BaseComponent from 'components/base-component/BaseComponent'
import { Col, Row, Table, Container } from 'react-bootstrap'
import Placeholder from '../../components/Placeholder'

const ServantsDashboard = () => {
  const { memberId, setMemberId, currentUser } = useContext(MemberContext)
  const { clickCard } = useContext(ChurchContext)
  const navigate = useNavigate()
  let servantId = currentUser.id

  if (isAuthorised(permitMeAndThoseAbove('Constituency'), currentUser.roles)) {
    servantId = memberId
  }

  const { data, error } = useQuery(SERVANTS_DASHBOARD, {
    variables: { id: servantId },
  })
  const { data: adminData } = useQuery(SERVANTS_ADMIN, {
    variables: { id: servantId },
  })
  const { data: leaderData } = useQuery(SERVANTS_LEADERSHIP, {
    variables: { id: servantId },
  })

  const servant = data?.members[0]
  const servantAdmin = adminData?.members[0]
  const servantLeader = leaderData?.members[0]

  let roles = []
  let assessmentChurchData, assessmentChurch

  const setServantRoles = (servant, servantType, churchType) => {
    let verb

    switch (servantType) {
      case 'Leader':
        verb = `leads${churchType}`
        break
      case 'Admin':
        verb = `isAdminFor${churchType}`
        break
      default:
        break
    }

    const permittedForLink = permitMeAndThoseAbove(churchType)

    if (servantType === 'Admin') {
      const adminsOneChurch = servant[`${verb}`].length === 1 ?? false
      roles.push({
        name: adminsOneChurch
          ? churchType + ' Admin'
          : plural(churchType) + ' Admin',
        church: servant[`${verb}`],
        number: servant[`${verb}`].length,
        clickCard: () => {
          clickCard(servant[`${verb}`][0])
        },
        link: authorisedLink(
          currentUser,
          permittedForLink,
          adminsOneChurch
            ? `/${churchType.toLowerCase()}/displaydetails`
            : `/servants/church-list`
        ),
      })

      assessmentChurch = servant[`${verb}`][0]
      return
    }

    const leadsOneChurch = servant[`${verb}`].length === 1 ?? false

    roles.push({
      name: leadsOneChurch ? churchType : plural(churchType),
      church: servant[`${verb}`],
      number: servant[`${verb}`]?.length,
      clickCard: () => {
        clickCard(servant[`${verb}`][0])
      },
      link: leadsOneChurch
        ? `/${churchType.toLowerCase()}/displaydetails`
        : `/servants/church-list`,
    })

    assessmentChurch = servant[`${verb}`][0]
  }

  const getServantRoles = (servant) => {
    if (servant?.leadsFellowship?.length) {
      setServantRoles(servant, 'Leader', 'Fellowship')
    }
    if (servant?.leadsBacenta?.length) {
      setServantRoles(servant, 'Leader', 'Bacenta')
    }
    if (servantLeader?.leadsSonta?.length) {
      setServantRoles(servantLeader, 'Leader', 'Sonta')
    }
    if (servantLeader?.leadsConstituency?.length) {
      setServantRoles(servantLeader, 'Leader', 'Constituency')
    }
    if (servantAdmin?.isAdminForConstituency?.length) {
      setServantRoles(servantAdmin, 'Admin', 'Constituency')
    }
    if (servantLeader?.leadsCouncil?.length) {
      setServantRoles(servantLeader, 'Leader', 'Council')
    }
    if (servantAdmin?.isAdminForCouncil?.length) {
      setServantRoles(servantAdmin, 'Admin', 'Council')
    }
    if (servantLeader?.leadsMinistry?.length) {
      setServantRoles(servantLeader, 'Leader', 'Ministry')
    }
    if (servantLeader?.leadsStream?.length) {
      setServantRoles(servantLeader, 'Leader', 'Stream')
    }
    if (servantLeader?.leadsGatheringService?.length) {
      setServantRoles(servantLeader, 'Leader', 'GatheringService')
    }
    if (servantAdmin?.isAdminForGatheringService?.length) {
      setServantRoles(servantAdmin, 'Admin', 'GatheringService')
    }
    if (servantLeader?.leadsBasonta?.length) {
      setServantRoles(servantLeader, 'Leader', 'Basonta')
    }

    //run the get graph function after all checking is done to avoid multiple unnecessary runs
    if (assessmentChurch) {
      return getServiceGraphData(assessmentChurch)
    }

    return
  }

  assessmentChurchData = servant && getServantRoles(servant)

  return (
    <BaseComponent error={error} data={data}>
      <Container>
        <Placeholder loading={!servant?.fullName} as="p">
          <p className="mb-0">{`Welcome to`}</p>
        </Placeholder>
        <Placeholder loading={!servant?.fullName} as="h5">
          <h5 className="font-weight-bold roboto">{`${servant?.fullName}'s Dashboard`}</h5>
        </Placeholder>

        <div className="card-button-row">
          <Table>
            <tbody>
              <tr>
                {roles ? (
                  roles.map((role, i) => {
                    return (
                      <td
                        className="col-auto p-0"
                        key={i}
                        onClick={() => {
                          setMemberId(servantId)
                          role.clickCard()
                          navigate(role.link)
                        }}
                      >
                        <RoleCard number={role.number} role={role.name} />
                      </td>
                    )
                  })
                ) : (
                  <td className="col-auto pl-0">
                    <RoleCard loading={!assessmentChurchData} />
                  </td>
                )}
              </tr>
            </tbody>
          </Table>
        </div>

        <>
          <Row className="mt-3">
            <Col>
              <StatDisplay
                title="Avg Attendance"
                loading={!assessmentChurchData}
                statistic={getMonthlyStatAverage(
                  assessmentChurchData,
                  'attendance'
                )}
              />
            </Col>

            <Col>
              <StatDisplay
                title="Avg Income (in GH₵)"
                loading={!assessmentChurchData}
                statistic={getMonthlyStatAverage(
                  assessmentChurchData,
                  'income'
                )}
              />
            </Col>
          </Row>
          <ChurchGraph
            loading={!assessmentChurchData}
            stat1="attendance"
            stat2="income"
            churchData={assessmentChurchData}
            secondaryTitle={`${assessmentChurch?.name} ${assessmentChurch?.__typename}`}
          />
        </>
      </Container>
    </BaseComponent>
  )
}

export default ServantsDashboard
