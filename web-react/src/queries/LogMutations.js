import { gql } from '@apollo/client'

export const LOG_BACENTA_HISTORY = gql`
  mutation LogBacentaHistory(
    $bacentaId: ID!
    $historyRecord: String
    $leaderId: ID
    $oldCentreId: ID
    $newCentreId: ID
  ) {
    LogBacentaHistory(
      bacentaId: $bacentaId
      historyRecord: $historyRecord
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
    $leaderId: ID
    $oldTownId: ID
    $newTownId: ID
  ) {
    LogCentreHistory(
      centreId: $centreId
      historyRecord: $historyRecord
      leaderId: $leaderId
      oldTownId: $oldTownId
      newTownId: $newTownId
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
