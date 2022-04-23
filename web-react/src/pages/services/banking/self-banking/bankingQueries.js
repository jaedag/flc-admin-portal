import { gql } from '@apollo/client'

export const FELLOWSHIP_SERVICE_PAYMENT = gql`
  query ($id: ID!) {
    fellowships(where: { id: $id }) {
      id
      name
      bankingCode
    }
  }
`

export const DISPLAY_OFFERING_DETAILS = gql`
  query ($serviceRecordId: ID!) {
    serviceRecords(where: { id: $serviceRecordId }) {
      id
      serviceDate {
        date
      }
      income
      transactionTime
      stream_name
    }
  }
`

export const PAY_OFFERING_MUTATION = gql`
  mutation (
    $serviceRecordId: ID!
    $stream_name: String!
    $mobileNetwork: String!
    $momoName: String!
    $mobileNumber: String!
  ) {
    BankServiceOffering(
      serviceRecordId: $serviceRecordId
      stream_name: $stream_name
      mobileNetwork: $mobileNetwork
      mobileNumber: $mobileNumber
      momoName: $momoName
    )
  }
`
export const CONFIRM_OFFERING_PAYMENT = gql`
  mutation ($serviceRecordId: ID!, $stream_name: String!) {
    ConfirmOfferingPayment(
      serviceRecordId: $serviceRecordId
      stream_name: $stream_name
    ) {
      id
      income
      transactionId
      transactionStatus
      offeringBankedBy {
        id
        firstName
        lastName
        fullName
      }
    }
  }
`

export const SELF_BANKING_RECEIPT = gql`
  query ($id: ID!) {
    serviceRecords(where: { id: $id }) {
      id
      income
      serviceDate {
        date
      }
      offeringBankedBy {
        id
        firstName
        lastName
        fullName
      }
      sourceNetwork
      sourceNumber
      desc
      transactionId
      transactionTime
      transactionStatus
    }
  }
`
