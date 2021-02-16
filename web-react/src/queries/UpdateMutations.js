import { gql } from '@apollo/client'

export const UPDATE_MEMBER_MUTATION = gql`
  mutation UpdateMemberDetails(
    $id: ID!
    $firstName: String!
    $middleName: String
    $lastName: String!
    $email: String!
    $phoneNumber: String!
    $whatsappNumber: String
    $dob: String
    $maritalStatus: String!
    $gender: String!
    $occupation: String
    $bacenta: String
    $ministry: String
    $pictureUrl: String!
  ) {
    UpdateMemberDetails(
      id: $id
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
      bacenta: $bacenta
      ministry: $ministry
      pictureUrl: $pictureUrl
    ) {
      id
      firstName
      lastName
    }
  }
`

export const EDIT_TOWN_MUTATION = gql`
  mutation UpdateTown(
    $townID: ID
    $townName: String
    $lWhatsappNumber: String
    $bishopID: ID
    $centres: [ID]
  ) {
    UpdateTown(
      townID: $townID
      townName: $townName
      lWhatsappNumber: $lWhatsappNumber
      bishopID: $bishopID
      centres: $centres
    ) {
      id
      name
    }
  }
`

export const EDIT_CAMPUS_MUTATION = gql`
  mutation EditCampus(
    $campusID: ID
    $campusName: String
    $lWhatsappNumber: String
    $bishopID: ID
    $centres: [ID]
  ) {
    UpdateTown(
      campusID: $campusID
      campusName: $campusName
      lWhatsappNumber: $lWhatsappNumber
      bishopID: $bishopID
      centres: $centres
    ) {
      id
      name
    }
  }
`
