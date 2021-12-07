import { gql } from '@apollo/client'

export const LOG_FELLOWSHIP_HISTORY = gql`
  mutation LogFellowshipHistory(
    $fellowshipId: ID!
    $historyRecord: String!
    $oldLeaderId: ID
    $newLeaderId: ID
    $oldBacentaId: ID
    $newBacentaId: ID
  ) {
    LogFellowshipHistory(
      fellowshipId: $fellowshipId
      historyRecord: $historyRecord
      oldLeaderId: $oldLeaderId
      newLeaderId: $newLeaderId
      oldBacentaId: $oldBacentaId
      newBacentaId: $newBacentaId
    ) {
      id
      history(options: { limit: 10 }) {
        id
        timeStamp
        created_at {
          date
        }
        loggedBy {
          id
          firstName
          lastName
        }
        historyRecord
      }
    }
    ConnectFellowshipHistory(churchId: $fellowshipId) {
      id
      historyRecord
    }
  }
`

export const LOG_BACENTA_HISTORY = gql`
  mutation LogBacentaHistory(
    $bacentaId: ID!
    $historyRecord: String!
    $oldLeaderId: ID
    $newLeaderId: ID
    $oldCampusTownId: ID
    $newCampusTownId: ID
  ) {
    LogBacentaHistory(
      bacentaId: $bacentaId
      historyRecord: $historyRecord
      newLeaderId: $newLeaderId
      oldLeaderId: $oldLeaderId
      oldCampusTownId: $oldCampusTownId
      newCampusTownId: $newCampusTownId
    ) {
      id
      name
      leader {
        id
        firstName
        lastName
      }
      history(options: { limit: 10 }) {
        id
        timeStamp
        created_at {
          date
        }
        loggedBy {
          id
          firstName
          lastName
        }
        historyRecord
      }
    }
    ConnectChurchHistory(churchId: $bacentaId) {
      id
      historyRecord
    }
  }
`

export const LOG_CAMPUSTOWN_HISTORY = gql`
  mutation LogCampusTownHistory(
    $campusTownId: ID!
    $historyRecord: String!
    $oldLeaderId: ID
    $newLeaderId: ID
    $oldCouncilId: ID
    $newCouncilId: ID
  ) {
    LogCampusTownHistory(
      campusTownId: $campusTownId
      historyRecord: $historyRecord
      newLeaderId: $newLeaderId
      oldLeaderId: $oldLeaderId
      oldCouncilId: $oldCouncilId
      newCouncilId: $newCouncilId
    ) {
      id
      name
      leader {
        id
        firstName
        lastName
      }
      history(options: { limit: 10 }) {
        id
        timeStamp
        created_at {
          date
        }
        loggedBy {
          id
          firstName
          lastName
        }
        historyRecord
      }
    }
    ConnectChurchHistory(churchId: $campusTownId) {
      id
      historyRecord
    }
  }
`

export const LOG_COUNCIL_HISTORY = gql`
  mutation LogCouncilHistory(
    $councilId: ID!
    $historyRecord: String!
    $oldLeaderId: ID
    $newLeaderId: ID
    $oldGatheringServiceId: ID
    $newGatheringServiceId: ID
  ) {
    LogCouncilHistory(
      councilId: $councilId
      historyRecord: $historyRecord
      newLeaderId: $newLeaderId
      oldLeaderId: $oldLeaderId
      oldGatheringServiceId: $oldGatheringServiceId
      newGatheringServiceId: $newGatheringServiceId
    ) {
      id
      name
      leader {
        id
        firstName
        lastName
      }
      history(options: { limit: 10 }) {
        id
        timeStamp
        created_at {
          date
        }
        loggedBy {
          id
          firstName
          lastName
        }
        historyRecord
      }
    }
    ConnectCouncilHistory(churchId: $councilId) {
      id
      historyRecord
    }
  }
`

export const LOG_SONTA_HISTORY = gql`
  mutation LogSontaHistory(
    $sontaId: ID!
    $historyRecord: String!
    $oldLeaderId: ID
    $newLeaderId: ID
    $oldCampusTownId: ID
    $newCampusTownId: ID
  ) {
    LogSontaHistory(
      sontaId: $sontaId
      historyRecord: $historyRecord
      newLeaderId: $newLeaderId
      oldLeaderId: $oldLeaderId
      oldCampusTownId: $oldCampusTownId
      newCampusTownId: $newCampusTownId
    ) {
      id
      name
      leader {
        id
        firstName
        lastName
      }
      history(options: { limit: 10 }) {
        id
        timeStamp
        created_at {
          date
        }
        loggedBy {
          id
          firstName
          lastName
        }
        historyRecord
      }
    }
    ConnectFellowshipHistory(churchId: $sontaId) {
      id
      historyRecord
    }
  }
`
