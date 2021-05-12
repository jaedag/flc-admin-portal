import { gql } from '@apollo/client'

export const CREATE_MEMBER_MUTATION = gql`
  mutation CreateMember(
    $firstName: String!
    $middleName: String
    $lastName: String!
    $emailAddress: String!
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
      emailAddress: $emailAddress
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
      bacenta {
        id
        centre {
          id
          town {
            id
            bishop {
              id
            }
          }
          campus {
            id
            bishop {
              id
            }
          }
        }
      }
    }
  }
`

export const ADD_MEMBER_TITLE_MUTATION = gql`
  mutation AddMemberTitle(
    $memberId: ID!
    $title: String!
    $status: Boolean
    $date: String
  ) {
    AddMemberTitle(
      from: { id: $memberId }
      to: { title: $title }
      data: { status: $status, yearAppointed: { formatted: $date } }
    ) {
      from {
        id
        firstName
        lastName
      }
      to {
        title
      }
    }
  }
`

export const ADD_LEADER_HISTORY_MUTATION = gql`
  mutation($id: ID, $pastoralHistory: [pastoralHistory]) {
    AddLeaderHistory(id: $id, pastoralHistory: $pastoralHistory) {
      id
      historyRecord
      created_at {
        formatted
      }
    }
  }
`

export const CREATE_BACENTA_MUTATION = gql`
  mutation CreateBacenta(
    $bacentaName: String!
    $leaderId: ID!
    $centreId: ID!
    $meetingDay: String!
    $venueLongitude: Float
    $venueLatitude: Float
  ) {
    CreateBacenta(
      bacentaName: $bacentaName
      leaderId: $leaderId
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
    $centreName: String!
    $leaderId: ID!
    $townCampusId: ID!
  ) {
    CreateCentre(
      centreName: $centreName
      leaderId: $leaderId
      townCampusId: $townCampusId
    ) {
      id
      name
    }
  }
`

export const CREATE_SONTA_MUTATION = gql`
  mutation CreateSonta($ministryId: ID!, $leaderId: ID!, $townCampusId: ID!) {
    CreateSonta(
      ministryId: $ministryId
      leaderId: $leaderId
      townCampusId: $townCampusId
    ) {
      id
      name
    }
  }
`

export const CREATE_TOWN_MUTATION = gql`
  mutation CreateTown($townName: String!, $leaderId: ID!, $id: ID!) {
    CreateTown(townName: $townName, leaderId: $leaderId, id: $id) {
      id
      name
    }
  }
`

export const CREATE_CAMPUS_MUTATION = gql`
  mutation CreateCampus($campusName: String!, $leaderId: ID!, $id: ID!) {
    CreateCampus(campusName: $campusName, leaderId: $leaderId, id: $id) {
      id
      name
    }
  }
`
