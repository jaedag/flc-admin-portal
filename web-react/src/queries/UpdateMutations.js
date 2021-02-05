import { gql } from '@apollo/client'

export const EDIT_MEMBER_MUTATION = gql`
  mutation EditMemberDetails(
    $memberID: ID!
    $firstName: String!
    $middleName: String
    $lastName: String!
    $email: String!
    $phoneNumber: String!
    $whatsappNumber: String
    $dob: String!
    $maritalStatus: String!
    $gender: String!
    $occupation: String
    $centre: String!
    $ministry: String
    $pictureUrl: String!
  ) {
    EditMemberDetails(
      memberID: $memberID
      firstName: $firstName
      middleName: $middleName
      lastName: $lastName
      email: $email
      phoneNumber: $phoneNumber
      whatsappNumber: $whatsappNumber
      dob: $dob
      maritalStatus: $maritalStatus
      gender: $gender
      occupation: $occupation
      centre: $centre
      ministry: $ministry
      pictureUrl: $pictureUrl
    ) {
      memberID
      firstName
      lastName
    }
  }
`
