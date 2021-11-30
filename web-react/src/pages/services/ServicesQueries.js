import { gql } from '@apollo/client'

export const BANKING_SLIP_QUERIES = gql`
  query bacentaServices($bacentaId: ID) {
    bacentas(where: { id: $bacentaId }) {
      id
      bankingCode
      name
      services {
        id
        serviceRecords {
          id
          created_at
          serviceDate {
            date
          }
          created_by {
            id
            firstName
            lastName
            fullName
          }
          bankingSlip
          income
        }
      }
    }
  }
`

export const BANKING_SLIP_SUBMISSION = gql`
  mutation SubmitBankingSlip($serviceRecordId: ID!, $bankingSlip: String!) {
    updateServiceRecords(
      where: { id: $serviceRecordId }
      update: { bankingSlip: $bankingSlip }
    ) {
      serviceRecords {
        id
        serviceLog {
          bacenta {
            id
          }
        }
      }
    }
  }
`

export const DISPLAY_SERVICE_RECORDS = gql`
  query DisplayServiceRecords($serviceId: ID!) {
    serviceRecords(where: { id: $serviceId }) {
      id
      serviceLog {
        bacenta {
          id
          name
          bankingCode
        }
      }
      created_at
      created_by {
        id
        firstName
        lastName
        fullName
      }
      serviceDate {
        date
      }
      attendance
      income
      foreignCurrency
    }
  }
`
