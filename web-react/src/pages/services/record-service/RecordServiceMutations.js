import { gql } from '@apollo/client'

export const RECORD_SERVICE = gql`
  mutation RecordService(
    $id: ID!
    $serviceDate: String!
    $attendance: Int!
    $income: Float!
    $foreignCurrency: String
    $numberOfTithers: Int!
    $treasurers: [ID]!
    $treasurerSelfie: String!
    $servicePicture: String!
  ) {
    RecordService(
      id: $id
      serviceDate: $serviceDate
      attendance: $attendance
      income: $income
      foreignCurrency: $foreignCurrency
      numberOfTithers: $numberOfTithers
      treasurers: $treasurers
      treasurerSelfie: $treasurerSelfie
      servicePicture: $servicePicture
    ) {
      id
      serviceLog {
        id
        fellowship {
          id
          services(limit: 5) {
            id
            week
            bankingSlip
          }
        }
      }
    }
  }
`

export const RECORD_CANCELLED_SERVICE = gql`
  mutation RecordCancelledService(
    $id: ID!
    $serviceDate: String!
    $noServiceReason: String!
  ) {
    RecordCancelledService(
      id: $id
      serviceDate: $serviceDate
      noServiceReason: $noServiceReason
    ) {
      id
      serviceLog {
        id
        fellowship {
          id
          services(limit: 3) {
            id
          }
        }
      }
    }
  }
`

export const RECORD_SERVICE_NO_OFFERING = gql`
  mutation RecordServiceNoOffering(
    $id: ID!
    $serviceDate: String!
    $attendance: Int!
    $servicePicture: String!
  ) {
    RecordServiceNoOffering(
      id: $id
      serviceDate: $serviceDate
      attendance: $attendance
      servicePicture: $servicePicture
    ) {
      id
    }
  }
`

export const DISPLAY_FELLOWSHIP_SERVICE = gql`
  query DisplayServiceRecords($serviceId: ID!, $fellowshipId: ID!) {
    serviceRecords(where: { id: $serviceId }) {
      id
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
      noServiceReason
      attendance
      income
      foreignCurrency
      treasurerSelfie
      servicePicture
      bankingSlip
      treasurers {
        id
        firstName
        lastName
        fullName
      }
    }
    fellowships(where: { id: $fellowshipId }) {
      id
      name
    }
  }
`

export const DISPLAY_BACENTA_SERVICE = gql`
  query DisplayServiceRecords($serviceId: ID!, $bacentaId: ID!) {
    serviceRecords(where: { id: $serviceId }) {
      id
      created_at
      serviceDate {
        date
      }
      attendance
      income
      foreignCurrency
      treasurerSelfie
      servicePicture
      treasurers {
        id
        firstName
        lastName
        fullName
      }
    }
    bacentas(where: { id: $bacentaId }) {
      id
      name
    }
  }
`

export const DISPLAY_SONTA_SERVICE = gql`
  query DisplayServiceRecords($serviceId: ID!, $sontaId: ID!) {
    serviceRecords(where: { id: $serviceId }) {
      id
      created_at
      serviceDate {
        date
      }
      attendance
      income
      foreignCurrency
      treasurerSelfie
      servicePicture
      treasurers {
        id
        firstName
        lastName
        fullName
      }
    }
    sontas(where: { id: $sontaId }) {
      id
      name
    }
  }
`

export const DISPLAY_CONSTITUENCY_SERVICE = gql`
  query DisplayServiceRecords($serviceId: ID!, $constituencyId: ID!) {
    serviceRecords(where: { id: $serviceId }) {
      id
      created_at
      serviceDate {
        date
      }
      attendance
      income
      foreignCurrency
      treasurerSelfie
      servicePicture
      treasurers {
        id
        firstName
        lastName
        fullName
      }
    }
    constituencies(where: { id: $constituencyId }) {
      id
      name
    }
  }
`
