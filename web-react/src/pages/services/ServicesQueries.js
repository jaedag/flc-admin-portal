import { gql } from '@apollo/client'

export const FELLOWSHIP_BANKING_SLIP_QUERIES = gql`
  query fellowshipServices($fellowshipId: ID) {
    fellowships(where: { id: $fellowshipId }) {
      id
      bankingCode
      name
      services(limit: 12) {
        id
        noServiceReason
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
`
export const CONSTITUENCY_BANKING_SLIP_QUERIES = gql`
  query constituencyServices($constituencyId: ID) {
    constituencies(where: { id: $constituencyId }) {
      id

      name
      services(limit: 20) {
        id
        noServiceReason
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
`

export const BANKING_SLIP_SUBMISSION = gql`
  mutation SubmitBankingSlip($serviceRecordId: ID!, $bankingSlip: String!) {
    updateServiceRecords(
      where: { id: $serviceRecordId }
      update: { bankingSlip: $bankingSlip }
    ) {
      serviceRecords {
        id
        bankingSlip
        serviceLog {
          fellowship {
            id
          }
        }
      }
    }
  }
`

export const FELLOWSHIP_SERVICE_RECORDS = gql`
  query FellowshipServiceRecords($serviceId: ID!) {
    serviceRecords(where: { id: $serviceId }) {
      id
      serviceLog {
        fellowship {
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

export const CONSTITUENCY_SERVICE_RECORDS = gql`
  query ConstituencyServiceRecords($serviceId: ID!) {
    serviceRecords(where: { id: $serviceId }) {
      id
      serviceLog {
        constituency {
          id
          name
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
