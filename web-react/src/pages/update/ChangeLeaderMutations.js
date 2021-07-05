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
