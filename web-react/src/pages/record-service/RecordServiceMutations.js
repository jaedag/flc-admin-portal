import { gql } from '@apollo/client'

export const RECORD_BACENTA_SERVICE = gql`
  mutation RecordService(
    $id: ID!
    $serviceDate: String!
    $attendance: Int!
    $income: Float!
    $treasurers: [ID]!
    $treasurerSelfie: String!
    $servicePicture: String!
  ) {
    RecordService(
      id: $id
      serviceDate: $serviceDate
      attendance: $attendance
      income: $income
      treasurers: $treasurers
      treasurerSelfie: $treasurerSelfie
      servicePicture: $servicePicture
    ) {
      id
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

export const RECORD_CENTRE_SERVICE = gql`
  mutation RecordCentreService(
    $centreId: ID!
    $serviceDate: String!
    $attendance: Int!
    $income: Float!
    $treasurers: [ID]!
    $treasurerSelfie: String!
    $servicePicture: String!
  ) {
    RecordCentreService(
      centreId: $centreId
      serviceDate: $serviceDate
      attendance: $attendance
      income: $income
      treasurers: $treasurers
      treasurerSelfie: $treasurerSelfie
      servicePicture: $servicePicture
    ) {
      id
    }
  }
`
