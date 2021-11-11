import React, { useContext } from 'react'
import { useHistory, useLocation } from 'react-router'
import ChurchGraph from 'components/ChurchGraph/ChurchGraph'
import './Dashboards.css'
import { MemberContext } from 'contexts/MemberContext'
import { useQuery } from '@apollo/client'
import { SERVANTS_DASHBOARD } from './DashboardQueries'
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
import { Col, Row } from 'react-bootstrap'
import Placeholder from '../../components/Placeholder'

const ServantsDashboard = () => {
  const { memberId, currentUser } = useContext(MemberContext)
  const { clickCard } = useContext(ChurchContext)
  const history = useHistory()
  const location = useLocation()
  const atHome = location.pathname === '/'

  const { data, loading, error } = useQuery(SERVANTS_DASHBOARD, {
    variables: { id: atHome ? currentUser.id : memberId },
  })

  const servant = data?.members[0]

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
      case 'Bishop':
        verb = `isBishopFor${churchType}`
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
          ['adminFederal', 'adminBishop', 'leaderBishop'],
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
          ['adminFederal', 'adminBishop'],
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
          ['adminFederal', 'adminBishop', 'adminCampus', 'adminTown'],
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
    if (servant?.leadsBacenta?.length) {
      setServantRoles(servant, 'Leader', 'Bacenta')
    }
    if (servant?.leadsCentre?.length) {
      setServantRoles(servant, 'Leader', 'Centre')
    }
    if (servant?.leadsTown?.length) {
      setServantRoles(servant, 'Leader', 'Town')
    }
    if (servant?.leadsCampus?.length) {
      setServantRoles(servant, 'Leader', 'Campus')
    }
    if (servant?.leadsSonta?.length) {
      setServantRoles(servant, 'Leader', 'Sonta')
    }
    if (servant?.leadsBasonta?.length) {
      setServantRoles(servant, 'Leader', 'Basonta')
    }
    if (servant?.leadsMinistry?.length) {
      setServantRoles(servant, 'Leader', 'Ministry')
    }
    if (servant?.isBishopForTown?.length) {
      setServantRoles(servant, 'Bishop', 'Town')
    }
    if (servant?.isBishopForCampus?.length) {
      setServantRoles(servant, 'Bishop', 'Campus')
    }
    if (servant?.isAdminForBishop?.length) {
      setServantRoles(servant, 'Admin', 'Bishop')
    }
    if (servant?.isAdminForCampus?.length) {
      setServantRoles(servant, 'Admin', 'Campus')
    }
    if (servant?.isAdminForTown?.length) {
      setServantRoles(servant, 'Admin', 'Town')
    }

    //run the get graph function after all checking is done to avoid multiple unnecessary runs
    if (assessmentChurch) {
      return getServiceGraphData(assessmentChurch)
    }
    return
  }

  assessmentChurchData = servant && getServantRoles(servant)

  return (
    <BaseComponent errorState={error} data={data}>
      <Container>
        <Placeholder loading={!servant?.fullName} as="p">
          <p className="mb-0">{`Welcome to`}</p>
        </Placeholder>
        <Placeholder loading={loading} as="h5">
          <h5 className="font-weight-bold roboto">{`${servant?.fullName}'s Dashboard`}</h5>
        </Placeholder>

        <div className="card-button-row">
          <table>
            <tbody>
              <tr>
                {roles &&
                  roles.map((role, i) => {
                    return (
                      <td
                        className="col-auto pl-0"
                        key={i}
                        onClick={() => {
                          role.clickCard()
                          history.push(role.link)
                        }}
                      >
                        <RoleCard number={role.number} role={role.name} />
                      </td>
                    )
                  })}
              </tr>
            </tbody>
          </table>
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
