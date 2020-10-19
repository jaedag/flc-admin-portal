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
    $centre: String!
    $sonta: String
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
      centre: $centre
      sonta: $sonta
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

export const CREATE_CENTRE_MUTATION = gql`
  mutation StartCentre(
    $centreName: String!
    $centreLeaderFName: String
    $centreLeaderLName: String
    $lWhatsappNumber: String
    $communityID: ID
    $meetingDay: String!
    $venueLongitude: Float
    $venueLatitude: Float
  ) {
    StartCentre(
      centreName: $centreName
      centreLeaderFName: $centreLeaderFName
      centreLeaderLName: $centreLeaderLName
      lWhatsappNumber: $lWhatsappNumber
      communityID: $communityID
      meetingDay: $meetingDay
      venueLongitude: $venueLongitude
      venueLatitude: $venueLatitude
    ) {
      centreID
      name
    }
  }
`

export const CREATE_COMMUNITY_MUTATION = gql`
  mutation AddCommunity(
    $communityName: String
    $lWhatsappNumber: String
    $townID: ID
  ) {
    AddCommunity(
      communityName: $communityName
      lWhatsappNumber: $lWhatsappNumber
      town: $townID
    ) {
      communityID
      name
    }
  }
`

export const CREATE_TOWN_MUTATION = gql`
  mutation AddTown(
    $townName: String
    $lWhatsappNumber: String
    $apostleID: ID
  ) {
    AddTown(
      townName: $townName
      lWhatsappNumber: $lWhatsappNumber
      apostleID: $apostleID
    ) {
      townID
      name
    }
  }
`
