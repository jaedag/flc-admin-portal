import { gql } from '@apollo/client'

export const LOG_BACENTA_HISTORY = gql`
  mutation LogBacentaHistory(
    $bacentaId: ID!
    $historyRecord: String
    $oldLeaderId: ID
    $newLeaderId: ID
    $oldCentreId: ID
    $newCentreId: ID
  ) {
    LogBacentaHistory(
      bacentaId: $bacentaId
      historyRecord: $historyRecord
      oldLeaderId: $oldLeaderId
      newLeaderId: $newLeaderId
      oldCentreId: $oldCentreId
      newCentreId: $newCentreId
    ) {
      id
      name
      history {
        HistoryLog {
          historyRecord
          timeStamp {
            formatted
          }
        }
        pointer
      }
    }
  }
`

export const LOG_CENTRE_HISTORY = gql`
  mutation LogCentreHistory(
    $centreId: ID!
    $historyRecord: String
    $oldLeaderId: ID
    $newLeaderId: ID
    $oldCampusTownId: ID
    $newCampusTownId: ID
  ) {
    LogCentreHistory(
      centreId: $centreId
      historyRecord: $historyRecord
      newLeaderId: $newLeaderId
      oldLeaderId: $oldLeaderId
      oldCampusTownId: $oldCampusTownId
      newCampusTownId: $newCampusTownId
    ) {
      id
      name
      history {
        HistoryLog {
          historyRecord
          timeStamp {
            formatted
          }
        }
        pointer
      }
    }
  }
`

export const LOG_CAMPUSTOWN_HISTORY = gql`
  mutation LogCampusTownHistory(
    $campusTownId: ID!
    $historyRecord: String
    $oldLeaderId: ID
    $newLeaderId: ID
    $oldBishopId: ID
    $newBishopId: ID
  ) {
    LogCampusTownHistory(
      campusTownId: $campusTownId
      historyRecord: $historyRecord
      newLeaderId: $newLeaderId
      oldLeaderId: $oldLeaderId
      oldBishopId: $oldBishopId
      newBishopId: $newBishopId
    ) {
      id
      name
      history {
        HistoryLog {
          historyRecord
          timeStamp {
            formatted
          }
        }
        pointer
      }
    }
  }
`

export const LOG_SONTA_HISTORY = gql`
  mutation LogSontaHistory(
    $sontaId: ID!
    $historyRecord: String
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
      history {
        HistoryLog {
          historyRecord
          timeStamp {
            formatted
          }
        }
        pointer
      }
    }
  }
`
