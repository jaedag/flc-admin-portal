import { gql } from '@apollo/client'

export const MAKE_BACENTA_LEADER = gql`
  mutation MakeBacentaLeader($bacentaId: ID!, $leaderId: ID!) {
    RemoveBacentaLeader(bacentaId: $bacentaId, leaderId: $leaderId) {
      id
      firstName
      lastName
    }
    MakeBacentaLeader(bacentaId: $bacentaId, leaderId: $leaderId) {
      id
      firstName
      lastName
    }
  }
`

export const MAKE_CENTRE_LEADER = gql`
  mutation MakeCentreLeader($centreId: ID!, $leaderId: ID!) {
    RemoveCentreLeader(centreId: $centreId, leaderId: $leaderId) {
      id
      firstName
      lastName
    }
    MakeCentreLeader(centreId: $centreId, leaderId: $leaderId) {
      id
      firstName
      lastName
    }
  }
`

export const MAKE_CAMPUS_LEADER = gql`
  mutation MakeCampusLeader($campusId: ID!, $leaderId: ID!) {
    RemoveCampusLeader(campusId: $campusId, leaderId: $leaderId) {
      id
      firstName
      lastName
    }
    MakeCampusLeader(campusId: $campusId, leaderId: $leaderId) {
      id
      firstName
      lastName
    }
  }
`

export const MAKE_TOWN_LEADER = gql`
  mutation MakeTownLeader($townId: ID!, $leaderId: ID!) {
    RemoveTownLeader(townId: $townId, leaderId: $leaderId) {
      id
      firstName
      lastName
    }
    MakeTownLeader(townId: $townId, leaderId: $leaderId) {
      id
      firstName
      lastName
    }
  }
`
