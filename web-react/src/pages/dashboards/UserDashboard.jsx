import React, { useContext } from 'react'
import { useNavigate } from 'react-router'
import ChurchGraph from 'components/ChurchGraph/ChurchGraph'
import './Dashboards.css'
import { MemberContext } from 'contexts/MemberContext'
import RoleCard from './RoleCard'
import { getMonthlyStatAverage } from '../services/reports/report-utils'
import StatDisplay from 'pages/services/reports/CompStatDisplay'
import { Col, Row, Table, Container } from 'react-bootstrap'
import Placeholder from '../../components/Placeholder'
import { ChurchContext } from 'contexts/ChurchContext'

const UserDashboard = () => {
  const { currentUser, userJobs } = useContext(MemberContext)
  const { clickCard } = useContext(ChurchContext)
  const navigate = useNavigate()

  return (
    <>
      <Container>
        <Placeholder loading={!currentUser?.fullName} as="p">
          <p className="mb-0">{`Welcome to`}</p>
        </Placeholder>
        <Placeholder loading={!currentUser?.fullName} as="h5">
          <h5 className="font-weight-bold roboto">{`${currentUser?.fullName}'s Dashboard`}</h5>
        </Placeholder>

        <div className="card-button-row">
          <Table className="border-bottom-0">
            <tbody>
              <tr>
                {userJobs?.assessmentData ? (
                  userJobs?.jobs.map((role, i) => (
                    <td
                      className="col-auto p-0"
                      key={i}
                      onClick={() => {
                        clickCard(currentUser)
                        role.clickCard()
                        navigate(role.link)
                      }}
                    >
                      <RoleCard number={role.number} role={role.name} />
                    </td>
                  ))
                ) : (
                  <td className="col-auto pl-0">
                    <RoleCard loading={!userJobs?.assessmentData} />
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
                title="Avg Weekly Attendance"
                loading={!userJobs?.assessmentData}
                statistic={getMonthlyStatAverage(
                  userJobs?.assessmentData,
                  'attendance'
                )}
              />
            </Col>

            <Col>
              <StatDisplay
                title="Avg Weekly Income (GH₵)"
                loading={!userJobs?.assessmentData}
                statistic={getMonthlyStatAverage(
                  userJobs?.assessmentData,
                  'income'
                )}
              />
            </Col>
          </Row>
          <ChurchGraph
            loading={!userJobs?.assessmentData}
            stat1="attendance"
            stat2="income"
            church={userJobs?.assessmentChurch?.__typename.toLowerCase()}
            churchData={userJobs?.assessmentData}
            secondaryTitle={`${userJobs?.assessmentChurch?.name} ${userJobs?.assessmentChurch?.__typename}`}
          />
        </>
      </Container>
    </>
  )
}

export default UserDashboard
