import { gql } from '@apollo/client'

export const LOG_BACENTA_HISTORY = gql`
  mutation LogBacentaHistory(
    $bacentaId: ID!
    $historyRecord: String
    $oldLeaderId: ID
    $leaderId: ID
    $oldCentreId: ID
    $newCentreId: ID
  ) {
    LogBacentaHistory(
      bacentaId: $bacentaId
      historyRecord: $historyRecord
      oldLeaderId: $oldLeaderId
      leaderId: $leaderId
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
    $leaderId: ID
    $oldCampusTownId: ID
    $newCampusTownId: ID
  ) {
    LogCentreHistory(
      centreId: $centreId
      historyRecord: $historyRecord
      leaderId: $leaderId
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

export const LOG_CAMPUS_HISTORY = gql`
  mutation LogCampusHistory(
    $campusId: ID!
    $historyRecord: String
    $oldLeaderId: ID
    $leaderId: ID
    $oldBishopId: ID
    $newBishopId: ID
  ) {
    LogCampusHistory(
      campusId: $campusId
      historyRecord: $historyRecord
      leaderId: $leaderId
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

export const LOG_TOWN_HISTORY = gql`
  mutation LogTownHistory(
    $townId: ID!
    $historyRecord: String
    $oldLeaderId: ID
    $leaderId: ID
    $oldBishopId: ID
    $newBishopId: ID
  ) {
    LogTownHistory(
      townId: $townId
      historyRecord: $historyRecord
      leaderId: $leaderId
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
