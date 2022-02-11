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
    ConnectFellowshipHistory(churchId: $fellowshipId) {
      id
      historyRecord
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
    ConnectChurchHistory(churchId: $bacentaId) {
      id
      historyRecord
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

export const MAKE_CONSTITUENCY_LEADER = gql`
  mutation MakeConstituencyLeader(
    $constituencyId: ID!
    $newLeaderId: ID!
    $oldLeaderId: ID!
  ) {
    RemoveConstituencyLeader(
      constituencyId: $constituencyId
      leaderId: $oldLeaderId
    ) {
      id
      firstName
      lastName
    }
    MakeConstituencyLeader(
      constituencyId: $constituencyId
      leaderId: $newLeaderId
    ) {
      id
      firstName
      lastName
      leadsConstituency {
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
    ConnectChurchHistory(churchId: $constituencyId) {
      id
      historyRecord
    }
  }
`

export const MAKE_COUNCIL_LEADER = gql`
  mutation MakeCouncilLeader(
    $councilId: ID!
    $newLeaderId: ID!
    $oldLeaderId: ID!
  ) {
    RemoveCouncilLeader(councilId: $councilId, leaderId: $oldLeaderId) {
      id
      firstName
      lastName
    }
    MakeCouncilLeader(councilId: $councilId, leaderId: $newLeaderId) {
      id
      firstName
      lastName
      leadsCouncil {
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
    ConnectChurchHistory(churchId: $councilId) {
      id
      historyRecord
    }
  }
`

export const MAKE_STREAM_LEADER = gql`
  mutation MakeStreamLeader(
    $streamId: ID!
    $newLeaderId: ID!
    $oldLeaderId: ID!
  ) {
    RemoveStreamLeader(streamId: $streamId, leaderId: $oldLeaderId) {
      id
      firstName
      lastName
    }
    MakeStreamLeader(streamId: $streamId, leaderId: $newLeaderId) {
      id
      firstName
      lastName
      leadsStream {
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
    ConnectChurchHistory(churchId: $streamId) {
      id
      historyRecord
    }
  }
`
