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
    $title: [String] # $status: Boolean # $date: String
  ) {
    updateMembers(
      where: { id: $memberId }
      connect: { title: { where: { title_IN: $title } } }
    ) {
      members {
        id
        firstName
        lastName
        title {
          title
        }
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
    $centreId: ID!
    $leaderId: ID!
    $meetingDay: String!
    $venueLongitude: Float
    $venueLatitude: Float
  ) {
    CreateBacenta(
      bacentaName: $bacentaName
      centreId: $centreId
      leaderId: $leaderId
      meetingDay: $meetingDay
      venueLongitude: $venueLongitude
      venueLatitude: $venueLatitude
    ) {
      id
      name
      centre {
        id
        bacentas {
          id
          name
        }
      }
    }
  }
`

export const CREATE_CENTRE_MUTATION = gql`
  mutation CreateCentre(
    $centreName: String!
    $townCampusId: ID!
    $leaderId: ID!
  ) {
    CreateCentre(
      centreName: $centreName
      townCampusId: $townCampusId
      leaderId: $leaderId
    ) {
      id
      name
      centres {
        id
        name
        leader {
          id
          firstName
          lastName
          fullName
        }
      }
    }
  }
`

export const CREATE_SONTA_MUTATION = gql`
  mutation CreateSonta($ministryId: ID!, $townCampusId: ID!, $leaderId: ID!) {
    CreateSonta(
      ministryId: $ministryId
      townCampusId: $townCampusId
      leaderId: $leaderId
    ) {
      id
      name
      sontas {
        id
        name
        leader {
          id
          firstName
          lastName
          fullName
        }
      }
    }
  }
`

export const CREATE_TOWN_MUTATION = gql`
  mutation CreateTown($townName: String!, $leaderId: ID!, $bishopId: ID!) {
    CreateTown(townName: $townName, leaderId: $leaderId, bishopId: $bishopId) {
      id
      name
    }
  }
`

export const CREATE_CAMPUS_MUTATION = gql`
  mutation CreateCampus($campusName: String!, $leaderId: ID!, $bishopId: ID!) {
    CreateCampus(
      campusName: $campusName
      leaderId: $leaderId
      bishopId: $bishopId
    ) {
      id
      name
    }
  }
`
