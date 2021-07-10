import { gql } from '@apollo/client'

export const RECORD_BACENTA_SERVICE = gql`
  mutation RecordBacentaService(
    $bacentaId: ID!
    $serviceDate: String!
    $attendance: Int!
    $income: Float!
    $treasurers: [ID]!
    $treasurerSelfie: String!
    $servicePicture: String!
  ) {
    RecordBacentaService(
      bacentaId: $bacentaId
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
