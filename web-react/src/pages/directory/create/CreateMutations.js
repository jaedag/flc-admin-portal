import { gql } from '@apollo/client'

export const CREATE_MEMBER_MUTATION = gql`
  mutation CreateMember(
    $firstName: String!
    $middleName: String
    $lastName: String!
    $email: String!
    $phoneNumber: String!
    $whatsappNumber: String!
    $dob: String!
    $maritalStatus: String!
    $gender: String!
    $occupation: String
    $fellowship: String!
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
      fellowship: $fellowship
      ministry: $ministry
      pictureUrl: $pictureUrl
    ) {
      id
      firstName
      lastName
      stream_name
      fellowship {
        id
        bacenta {
          id

          constituency {
            id
            council {
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
    $title: String # $status: Boolean # $date: String
    $date: Date
  ) {
    updateMembers(
      where: { id: $memberId }
      connect: {
        title: { where: { node: { title: $title } }, edge: { date: $date } }
      }
    ) {
      members {
        id
        firstName
        lastName
        title {
          title
        }
        titleConnection {
          edges {
            date
            node {
              title
            }
          }
        }
      }
    }
  }
`

export const ADD_LEADER_HISTORY_MUTATION = gql`
  mutation ($id: ID, $pastoralHistory: [pastoralHistory]) {
    AddLeaderHistory(id: $id, pastoralHistory: $pastoralHistory) {
      id
      historyRecord
      created_at {
        formatted
      }
    }
  }
`

export const CREATE_FELLOWSHIP_MUTATION = gql`
  mutation CreateFellowship(
    $name: String!
    $bacentaId: ID!
    $leaderId: ID!
    $meetingDay: String!
    $venueLongitude: Float
    $venueLatitude: Float
  ) {
    CreateFellowship(
      name: $name
      bacentaId: $bacentaId
      leaderId: $leaderId
      meetingDay: $meetingDay
      venueLongitude: $venueLongitude
      venueLatitude: $venueLatitude
    ) {
      id
      name
      stream_name
      council {
        id
      }
      bacenta {
        id
        fellowships {
          id
          name
        }
      }
    }
  }
`

export const CREATE_BACENTA_MUTATION = gql`
  mutation CreateBacenta(
    $name: String!
    $constituencyId: ID!
    $leaderId: ID!
    $fellowships: [ID]
    $zone: Int!
  ) {
    CreateBacenta(
      name: $name
      constituencyId: $constituencyId
      leaderId: $leaderId
      fellowships: $fellowships
      zone: $zone
    ) {
      id
      name
      stream_name
      constituency {
        id
        bacentas {
          id
        }
      }

      leader {
        id
        firstName
        lastName
        fullName
      }
    }
  }
`

export const CREATE_SONTA_MUTATION = gql`
  mutation CreateSonta($ministryId: ID!, $constituencyId: ID!, $leaderId: ID!) {
    CreateSonta(
      ministryId: $ministryId
      constituencyId: $constituencyId
      leaderId: $leaderId
    ) {
      id
      name
      sontas {
        id
        name
        stream_name
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

export const CREATE_CONSTITUENCY_MUTATION = gql`
  mutation CreateConstituency(
    $name: String!
    $leaderId: ID!
    $councilId: ID!
    $bacentas: [ID]
  ) {
    CreateConstituency(
      name: $name
      leaderId: $leaderId
      councilId: $councilId
      bacentas: $bacentas
    ) {
      id
      name
      stream_name
      council {
        id
        constituencies {
          id
          name
        }
      }
    }
  }
`

export const CREATE_COUNCIL_MUTATION = gql`
  mutation CreateCouncil(
    $name: String!
    $leaderId: ID!
    $streamId: ID!
    $constituencies: [ID]
  ) {
    CreateCouncil(
      name: $name
      leaderId: $leaderId
      streamId: $streamId
      constituencies: $constituencies
    ) {
      id
      name
      stream_name
      stream {
        id
        councils {
          id
          name
        }
      }
    }
  }
`

export const CREATE_STREAM_MUTATION = gql`
  mutation CreateStream(
    $name: String!
    $leaderId: ID!
    $gatheringServiceId: ID!
    $councils: [ID]
  ) {
    CreateStream(
      name: $name
      leaderId: $leaderId
      gatheringServiceId: $gatheringServiceId
      councils: $councils
    ) {
      id
      name

      gatheringService {
        id
        streams {
          id
          name
        }
      }
    }
  }
`
