import { gql } from '@apollo/client'

export const BACENTA_REPORT = gql`
  query bacentaReports($bacentaId: ID) {
    bacentas(where: { id: $bacentaId }) {
      id
      name
      leader {
        id
        firstName
        lastName
        fullName
      }
      services {
        id
        historyRecord
        serviceRecords {
          created_at
          attendance
          income
          serviceDate {
            date
          }
        }
      }
    }
    bacentaMemberCount(id: $bacentaId)
  }
`

export const CENTRE_REPORT = gql`
  query centreReports($centreId: ID!) {
    centres(where: { id: $centreId }) {
      id
      name
      leader {
        id
        firstName
        lastName
        fullName
      }
      services {
        id
        historyRecord
        serviceRecords {
          created_at
          attendance
          income
          serviceDate {
            date
          }
        }
      }
      bacentaServiceAggregate {
        serviceDate
        attendance
        income
      }
    }
    centreMemberCount(id: $centreId)
  }
`
