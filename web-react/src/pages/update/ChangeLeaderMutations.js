import { gql } from '@apollo/client'

export const MAKE_BACENTA_LEADER = gql`
  mutation MakeBacentaLeader(
    $bacentaId: ID!
    $newLeaderId: ID!
    $oldLeaderId: ID!
  ) {
    RemoveBacentaLeader(bacentaId: $bacentaId, leaderId: $oldLeaderId) {
      id
      firstName
      lastName
    }
    MakeBacentaLeader(bacentaId: $bacentaId, leaderId: $newLeaderId) {
      id
      firstName
      lastName
    }
  }
`

export const MAKE_CENTRE_LEADER = gql`
  mutation MakeCentreLeader(
    $centreId: ID!
    $newLeaderId: ID!
    $oldLeaderId: ID!
  ) {
    RemoveCentreLeader(centreId: $centreId, leaderId: $oldLeaderId) {
      id
      firstName
      lastName
    }
    MakeCentreLeader(centreId: $centreId, leaderId: $newLeaderId) {
      id
      firstName
      lastName
    }
  }
`

export const MAKE_CAMPUS_LEADER = gql`
  mutation MakeCampusLeader(
    $campusId: ID!
    $newLeaderId: ID!
    $oldLeaderId: ID!
  ) {
    RemoveCampusLeader(campusId: $campusId, leaderId: $oldLeaderId) {
      id
      firstName
      lastName
    }
    MakeCampusLeader(campusId: $campusId, leaderId: $newLeaderId) {
      id
      firstName
      lastName
    }
  }
`

export const MAKE_TOWN_LEADER = gql`
  mutation MakeTownLeader($townId: ID!, $newLeaderId: ID!, $oldLeaderId: ID!) {
    RemoveTownLeader(townId: $townId, leaderId: $oldLeaderId) {
      id
      firstName
      lastName
    }
    MakeTownLeader(townId: $townId, leaderId: $newLeaderId) {
      id
      firstName
      lastName
    }
  }
`
