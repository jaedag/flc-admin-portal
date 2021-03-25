import { gql } from '@apollo/client'

export const LOG_BACENTA_HISTORY = gql`
  mutation LogBacentaHistory(
    $bacentaId: ID!
    $historyRecord: String
    $leaderId: ID
  ) {
    LogBacentaHistory(
      bacentaId: $bacentaId
      historyRecord: $historyRecord
      leaderId: $leaderId
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
