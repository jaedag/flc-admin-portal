import { useQuery } from '@apollo/client'
import BaseComponent from 'components/base-component/BaseComponent'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import { MemberContext } from 'contexts/MemberContext'
import { ServiceContext } from 'contexts/ServiceContext'
import { parseNeoTime } from 'date-utils'
import { parseDate } from 'date-utils'
import { getHumanReadableDate } from 'date-utils'
import React, { useContext } from 'react'
import { Button, Container, Table } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import { SELF_BANKING_RECEIPT } from './bankingQueries'

const ReceiptPage = () => {
  const { serviceRecordId } = useContext(ServiceContext)
  const { theme } = useContext(MemberContext)
  const { data, loading, error } = useQuery(SELF_BANKING_RECEIPT, {
    variables: {
      id: serviceRecordId,
    },
  })
  const navigate = useNavigate()
  const service = data?.serviceRecords[0]
  const tablevalues = [
    ['Date of Service', getHumanReadableDate(service?.serviceDate.date)],
    ['Income', service?.income],
    ['Offering Banked By', service?.offeringBankedBy.fullName],
    ['Network Used', service?.sourceNetwork],
    ['Number Used', service?.sourceNumber],
    ['Reference', service?.desc],
    ['Date of Banking', parseDate(service?.transactionTime)],
    ['Time of Banking', parseNeoTime(service?.transactionTime)],
  ]

  return (
    <BaseComponent data={data} loading={loading} error={error}>
      <Container>
        <HeadingPrimary>Self Banking Receipt</HeadingPrimary>
      </Container>
      <Table variant={theme} striped bordered>
        <tbody>
          {tablevalues.map((row, i) => (
            <tr key={i}>
              {row.map((col, i) => (
                <td key={i}>{col}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
      <Container>
        <div className="d-grid gap-2">
          <Button size="lg" onClick={() => navigate(-1)}>
            Go Back
          </Button>
        </div>
      </Container>
    </BaseComponent>
  )
}

export default ReceiptPage
