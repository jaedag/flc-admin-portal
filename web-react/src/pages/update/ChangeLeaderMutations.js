import { gql } from '@apollo/client'

export const MAKE_FELLOWSHIP_LEADER = gql`
  mutation MakeFellowshipLeader(
    $fellowshipId: ID!
    $newLeaderId: ID!
    $oldLeaderId: ID!
  ) {
    RemoveFellowshipLeader(
      fellowshipId: $fellowshipId
      leaderId: $oldLeaderId
    ) {
      id
      firstName
      lastName
    }
    MakeFellowshipLeader(fellowshipId: $fellowshipId, leaderId: $newLeaderId) {
      id
      firstName
      lastName
      fullName
      leadsFellowship {
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
      leadsBacenta {
        id
        leader {
          id
          firstName
          lastName
        }
        # history(options: { limit: 10 }) {
        #   id
        #   timeStamp
        #   created_at {
        #     date
        #   }
        #   loggedBy {
        #     id
        #     firstName
        #     lastName
        #   }
        #   historyRecord
        # }
      }
    }
  }
`

export const MAKE_SONTA_LEADER = gql`
  mutation MakeSontaLeader(
    $sontaId: ID!
    $newLeaderId: ID!
    $oldLeaderId: ID!
  ) {
    RemoveSontaLeader(sontaId: $sontaId, leaderId: $oldLeaderId) {
      id
      firstName
      lastName
    }
    MakeSontaLeader(sontaId: $sontaId, leaderId: $newLeaderId) {
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
        # history(options: { limit: 10 }) {
        #   id
        #   timeStamp
        #   created_at {
        #     date
        #   }
        #   loggedBy {
        #     id
        #     firstName
        #     lastName
        #   }
        #   historyRecord
        # }
      }
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
      leadsCampus {
        id
        leader {
          id
          firstName
          lastName
        }
        # history(options: { limit: 10 }) {
        #   id
        #   timeStamp
        #   created_at {
        #     date
        #   }
        #   loggedBy {
        #     id
        #     firstName
        #     lastName
        #   }
        #   historyRecord
        # }
      }
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
      leadsTown {
        id
        leader {
          id
          firstName
          lastName
        }
        # history(options: { limit: 10 }) {
        #   id
        #   timeStamp
        #   created_at {
        #     date
        #   }
        #   loggedBy {
        #     id
        #     firstName
        #     lastName
        #   }
        #   historyRecord
        # }
      }
    }
  }
`
