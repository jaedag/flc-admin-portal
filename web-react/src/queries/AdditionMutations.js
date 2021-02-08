import { gql } from '@apollo/client'

export const NEW_MEMBER_MUTATION = gql`
  mutation AddMember(
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
    $bacenta: String!
    $ministry: String
    $pictureUrl: String!
    $pastoralHistory: [pastoralHistory]
    $pastoralAppointment: [pastoralAppointment]
  ) {
    AddMember(
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
      pastoralHistory: $pastoralHistory
      pastoralAppointment: $pastoralAppointment
    ) {
      memberID
      firstName
      lastName
    }
  }
`

export const ADD_LEADER_HISTORY_MUTATION = gql`
  mutation($memberID: ID, $pastoralHistory: [pastoralHistory]) {
    AddLeaderHistory(memberID: $memberID, pastoralHistory: $pastoralHistory) {
      historyRecord
      created_at {
        formatted
      }
    }
  }
`

export const ADD_LEADER_TITLE_MUTATION = gql`
  mutation($memberID: ID!, $pastoralAppointment: [pastoralAppointment]) {
    AddLeaderTitle(
      memberID: $memberID
      pastoralAppointment: $pastoralAppointment
    ) {
      title
    }
  }
`

export const CREATE_BACENTA_MUTATION = gql`
  mutation AddBacenta(
    $bacentaName: String!
    $bacentaLeaderFName: String
    $bacentaLeaderLName: String
    $lWhatsappNumber: String
    $centreID: ID
    $meetingDay: String!
    $venueLongitude: Float
    $venueLatitude: Float
  ) {
    AddBacenta(
      bacentaName: $bacentaName
      bacentaLeaderFName: $bacentaLeaderFName
      bacentaLeaderLName: $bacentaLeaderLName
      lWhatsappNumber: $lWhatsappNumber
      centreID: $centreID
      meetingDay: $meetingDay
      venueLongitude: $venueLongitude
      venueLatitude: $venueLatitude
    ) {
      bacentaID
      name
    }
  }
`

export const CREATE_CENTRE_MUTATION = gql`
  mutation AddCentre(
    $centreName: String
    $lWhatsappNumber: String
    $townID: ID
    $campusID: ID
  ) {
    AddCentre(
      centreName: $centreName
      lWhatsappNumber: $lWhatsappNumber
      town: $townID
      campus: $campusID
    ) {
      centreID
      name
    }
  }
`

export const CREATE_TOWN_MUTATION = gql`
  mutation AddTown(
    $townName: String
    $lWhatsappNumber: String
    $bishopID: ID
    $centres: [ID]
  ) {
    AddTown(
      townName: $townName
      lWhatsappNumber: $lWhatsappNumber
      bishopID: $bishopID
      centres: $centres
    ) {
      townID
      name
    }
  }
`

export const CREATE_CAMPUS_MUTATION = gql`
  mutation AddCampus(
    $campusName: String
    $lWhatsappNumber: String
    $bishopID: ID
    $centres: [ID]
  ) {
    AddCampus(
      campusName: $campusName
      lWhatsappNumber: $lWhatsappNumber
      bishopID: $bishopID
      centres: $centres
    ) {
      campusID
      name
    }
  }
`
