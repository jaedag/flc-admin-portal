import { gql } from '@apollo/client'

export const CREATE_MEMBER_MUTATION = gql`
  mutation CreateMember(
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
  ) {
    CreateMember(
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

export const ADD_LEADER_HISTORY_MUTATION = gql`
  mutation($id: ID, $pastoralHistory: [pastoralHistory]) {
    AddLeaderHistory(id: $id, pastoralHistory: $pastoralHistory) {
      historyRecord
      created_at {
        formatted
      }
    }
  }
`

export const ADD_LEADER_TITLE_MUTATION = gql`
  mutation($id: ID!, $pastoralAppointment: [pastoralAppointment]) {
    CreateLeaderTitle(id: $id, pastoralAppointment: $pastoralAppointment) {
      title
    }
  }
`

export const CREATE_BACENTA_MUTATION = gql`
  mutation CreateBacenta(
    $bacentaName: String!
    $lWhatsappNumber: String
    $centreId: ID
    $meetingDay: String!
    $venueLongitude: Float
    $venueLatitude: Float
  ) {
    CreateBacenta(
      bacentaName: $bacentaName
      lWhatsappNumber: $lWhatsappNumber
      centreId: $centreId
      meetingDay: $meetingDay
      venueLongitude: $venueLongitude
      venueLatitude: $venueLatitude
    ) {
      id
      name
    }
  }
`

export const CREATE_CENTRE_MUTATION = gql`
  mutation CreateCentre(
    $centreName: String
    $lWhatsappNumber: String
    $townCampusId: ID
    $bacentas: [ID]
  ) {
    CreateCentre(
      centreName: $centreName
      lWhatsappNumber: $lWhatsappNumber
      townCampusId: $townCampusId
      bacentas: $bacentas
    ) {
      id
      name
    }
  }
`

export const CREATE_TOWN_MUTATION = gql`
  mutation CreateTown(
    $townName: String
    $lWhatsappNumber: String
    $id: ID
    $centres: [ID]
  ) {
    CreateTown(
      townName: $townName
      lWhatsappNumber: $lWhatsappNumber
      id: $id
      centres: $centres
    ) {
      id
      name
    }
  }
`

export const CREATE_CAMPUS_MUTATION = gql`
  mutation CreateCampus(
    $campusName: String
    $lWhatsappNumber: String
    $id: ID
    $centres: [ID]
  ) {
    CreateCampus(
      campusName: $campusName
      lWhatsappNumber: $lWhatsappNumber
      id: $id
      centres: $centres
    ) {
      id
      name
    }
  }
`
