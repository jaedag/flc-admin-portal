import React, { useContext } from 'react'
import { useNavigate, useLocation } from 'react-router'
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
} from '../reports/report-utils'
import { ChurchContext } from 'contexts/ChurchContext'
import StatDisplay from 'pages/reports/CompStatDisplay'
import { authorisedLink, plural } from 'global-utils'
import BaseComponent from 'components/base-component/BaseComponent'
import Container from 'react-bootstrap/Container'
import { Col, Row, Table } from 'react-bootstrap'
import Placeholder from '../../components/Placeholder'

const ServantsDashboard = () => {
  const { memberId, currentUser } = useContext(MemberContext)
  const { clickCard } = useContext(ChurchContext)
  const navigate = useNavigate()
  const location = useLocation()
  const atHome = location.pathname === '/'

  const { data, loading, error } = useQuery(SERVANTS_DASHBOARD, {
    variables: { id: atHome ? currentUser.id : memberId },
  })
  const { data: adminData } = useQuery(SERVANTS_ADMIN, {
    variables: { id: atHome ? currentUser.id : memberId },
  })
  const { data: leaderData } = useQuery(SERVANTS_LEADERSHIP, {
    variables: { id: atHome ? currentUser.id : memberId },
  })

  const servant = data?.members[0]
  const servantAdmin = adminData?.members[0]
  const servantLeader = leaderData?.members[0]

  // What leadership roles does this person play?
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

    if (servantType === 'Bishop') {
      roles.push({
        name: 'Bishop',
        church: servant[`${verb}`][0],
        number: `${churchType} Bishop`,
        clickCard: () => {
          clickCard(servant[`${verb}`][0])
        },
        link: authorisedLink(
          currentUser,
          ['adminFederal', 'adminCouncil', 'leaderBishop'],
          '/dashboard'
        ),
      })
      return
    }

    if (churchType === 'Bishop' && servantType === 'Admin') {
      roles.push({
        name: 'Admin',
        church: servant[`${verb}`][0],
        number: 'Bishop Admin',
        clickCard: () => {
          clickCard(servant[`${verb}`][0])
        },
        link: authorisedLink(
          currentUser,
          ['adminFederal', 'adminCouncil'],
          '/dashboard'
        ),
      })
      return
    }

    if (servantType === 'Admin') {
      const adminsOneChurch = servant[`${verb}`].length === 1 ?? false
      roles.push({
        name: 'Admin',
        church: servant[`${verb}`][0],
        number: `${churchType} Admin`,
        clickCard: () => {
          clickCard(servant[`${verb}`][0])
        },
        link: authorisedLink(
          currentUser,
          ['adminFederal', 'adminCouncil', 'adminConstituency'],
          adminsOneChurch
            ? `/${churchType.toLowerCase()}/displaydetails`
            : `/servants/${churchType.toLowerCase()}-list`
        ),
      })
      assessmentChurch = servant[`${verb}`][0]
      return
    }

    const leadsOneChurch = servant[`${verb}`].length === 1 ?? false
    roles.push({
      name: leadsOneChurch ? churchType : plural(churchType),
      church: servant[`${verb}`][0],
      number: servant[`${verb}`]?.length,
      clickCard: () => {
        clickCard(servant[`${verb}`][0])
      },
      link: leadsOneChurch
        ? `/${churchType.toLowerCase()}/displaydetails`
        : `/servants/${churchType.toLowerCase()}-list`,
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
    if (servantLeader?.leadsConstituency?.length) {
      setServantRoles(servantLeader, 'Leader', 'Constituency')
    }
    if (servantLeader?.leadsSonta?.length) {
      setServantRoles(servantLeader, 'Leader', 'Sonta')
    }
    if (servant?.leadsBasonta?.length) {
      setServantRoles(servant, 'Leader', 'Basonta')
    }
    if (servantLeader?.leadsMinistry?.length) {
      setServantRoles(servantLeader, 'Leader', 'Ministry')
    }
    if (servant?.leadsCouncil?.length) {
      setServantRoles(servant, 'Leader', 'Council')
    }

    if (servantAdmin?.isAdminForCouncil?.length) {
      setServantRoles(servantAdmin, 'Admin', 'Council')
    }
    if (servantAdmin?.isAdminForConstituency?.length) {
      setServantRoles(servantAdmin, 'Admin', 'Constituency')
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
        <Placeholder loading={loading} as="h5">
          <h5 className="font-weight-bold roboto">{`${servant?.fullName}'s Dashboard`}</h5>
        </Placeholder>

        <div className="card-button-row">
          <Table>
            <tbody>
              <tr>
                {roles &&
                  roles.map((role, i) => {
                    return (
                      <td
                        className="col-auto"
                        key={i}
                        onClick={() => {
                          role.clickCard()
                          navigate(role.link)
                        }}
                      >
                        <RoleCard number={role.number} role={role.name} />
                      </td>
                    )
                  })}
              </tr>
            </tbody>
          </Table>
        </div>

        {assessmentChurchData && (
          <>
            <Row className="mt-3">
              <Col>
                <StatDisplay
                  title="Avg Attendance"
                  loading={loading}
                  statistic={getMonthlyStatAverage(
                    assessmentChurchData,
                    'attendance'
                  )}
                />
              </Col>

              <Col>
                <StatDisplay
                  title="Avg Income (in GH₵)"
                  loading={loading}
                  statistic={getMonthlyStatAverage(
                    assessmentChurchData,
                    'income'
                  )}
                />
              </Col>
            </Row>
            <ChurchGraph
              loading={loading}
              stat1="attendance"
              stat2="income"
              churchData={assessmentChurchData}
              secondaryTitle={`${assessmentChurch.name} ${assessmentChurch.__typename}`}
            />
          </>
        )}
      </Container>
    </BaseComponent>
  )
}

export default ServantsDashboard
