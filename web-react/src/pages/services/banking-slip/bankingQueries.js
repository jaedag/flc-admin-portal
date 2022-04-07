import { gql } from '@apollo/client'

export const DISPLAY_OFFERING_DETAILS = gql`
  query ($serviceRecordId: ID!) {
    serviceRecords(where: { id: $serviceRecordId }) {
      id
      stream_name
      income
    }
  }
`

export const PAY_OFFERING_MUTATION = gql`
  mutation (
    $serviceRecordId: ID!
    $stream_name: String!
    $mobileNetwork: String!
    $mobileNumber: String!
  ) {
    BankServiceOffering(
      serviceRecordId: $serviceRecordId
      stream_name: $stream_name
      mobileNetwork: $mobileNetwork
      mobileNumber: $mobileNumber
    ) {
      id
      income
      transactionId
    }
  }
`
