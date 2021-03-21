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

export const UPDATE_TOWN_MUTATION = gql`
  mutation UpdateTown(
    $townId: ID!
    $townName: String
    $lWhatsappNumber: String
    $bishopId: ID
    $centres: [ID]
  ) {
    UpdateTown(
      townId: $townId
      townName: $townName
      lWhatsappNumber: $lWhatsappNumber
      bishopId: $bishopId
      centres: $centres
    ) {
      id
      name
    }
  }
`

export const UPDATE_CAMPUS_MUTATION = gql`
  mutation UpdateCampus(
    $campusId: ID
    $campusName: String
    $lWhatsappNumber: String
    $bishopId: ID
    $centres: [ID]
  ) {
    UpdateCampus(
      campusId: $campusId
      campusName: $campusName
      lWhatsappNumber: $lWhatsappNumber
      bishopId: $bishopId
      centres: $centres
    ) {
      id
      name
    }
  }
`

export const UPDATE_CENTRE_MUTATION = gql`
  mutation UpdateCentre(
    $centreID: ID
    $centreName: String
    $lWhatsappNumber: String
    $campusTownID: ID
  ) {
    UpdateCentre(
      centreID: $centreID
      centreName: $centreName
      lWhatsappNumber: $lWhatsappNumber
      campusTownID: $campusTownID
    ) {
      id
      name
    }
  }
`

export const ADD_CENTRE_BACENTAS = gql`
  mutation AddCentreBacentas($centreID: ID!, $bacentaID: ID!) {
    AddCentreBacentas(from: { id: $centreID }, to: { id: $bacentaID }) {
      from {
        id
        name
        bacentas {
          name
        }
      }
    }
  }
`
export const REMOVE_CENTRE_BACENTAS = gql`
  mutation RemoveCentreBacentas($centreID: ID!, $bacentaID: ID!) {
    RemoveCentreBacentas(from: { id: $centreID }, to: { id: $bacentaID }) {
      from {
        id
        name
        bacentas {
          name
        }
      }
    }
  }
`

export const REMOVE_BACENTA_CENTRE = gql`
  mutation RemoveBacentaCentre($centreID: ID!, $bacentaID: ID!) {
    RemoveBacentaCentre(from: { id: $centreID }, to: { id: $bacentaID }) {
      from {
        id
        name
        bacentas {
          name
        }
      }
    }
  }
`

export const UPDATE_BACENTA = gql`
  mutation UpdateBacenta(
    $id: ID
    $name: String
    $lWhatsappNumber: String
    $meetingDay: String
    $venueLatitude: Float
    $venueLongitude: Float
  ) {
    UpdateBacenta(
      id: $id
      name: $name
      lWhatsappNumber: $lWhatsappNumber
      meetingDay: $meetingDay
      venueLatitude: $venueLatitude
      venueLongitude: $venueLongitude
    ) {
      id
      name
      meetingDay {
        day
      }
    }
  }
`

export const ADD_BACENTA_CENTRE = gql`
  mutation AddBacentaCentre($centreID: ID!, $bacentaID: ID!) {
    AddBacentaCentre(from: { id: $centreID }, to: { id: $bacentaID }) {
      from {
        id
        name
      }
    }
  }
`
