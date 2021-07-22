import { gql } from '@apollo/client'

export const NEW_BACENTA_LEADER = gql`
  mutation NewBacentaLeader($bacentaId: ID!, $leaderId: ID!) {
    MakeBacentaLeader(bacentaId: $bacentaId, leaderId: $leaderId) {
      id
      firstName
      lastName
    }
  }
`

export const NEW_SONTA_LEADER = gql`
  mutation NewSontaLeader($sontaId: ID!, $leaderId: ID!) {
    MakeSontaLeader(sontaId: $sontaId, leaderId: $leaderId) {
      id
      firstName
      lastName
      leadsSonta {
        id
        leader {
          id
          firstName
          lastName
        }
      }
    }
  }
`

export const NEW_CENTRE_LEADER = gql`
  mutation NewCentreLeader($centreId: ID!, $leaderId: ID!) {
    MakeCentreLeader(centreId: $centreId, leaderId: $leaderId) {
      id
      firstName
      lastName
    }
  }
`

export const NEW_CAMPUS_LEADER = gql`
  mutation NewCampusLeader($campusId: ID!, $leaderId: ID!) {
    MakeCampusLeader(campusId: $campusId, leaderId: $leaderId) {
      id
      firstName
      lastName
    }
  }
`

export const NEW_TOWN_LEADER = gql`
  mutation NewTownLeader($townId: ID!, $leaderId: ID!) {
    MakeTownLeader(townId: $townId, leaderId: $leaderId) {
      id
      firstName
      lastName
    }
  }
`
