import { gql } from '@apollo/client'

export const RECORD_BACENTA_SERVICE = gql`
  mutation RecordBacentaService(
    $bacentaId: ID!
    $serviceDate: String!
    $attendance: Int!
    $income: Float!
    $treasurers: [ID]!
  ) {
    RecordBacentaService(
      bacentaId: $bacentaId
      serviceDate: $serviceDate
      attendance: $attendance
      income: $income
      treasurers: $treasurers
    ) {
      id
    }
  }
`
