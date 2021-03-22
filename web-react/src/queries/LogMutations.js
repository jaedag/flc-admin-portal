import { gql } from '@apollo/client'

export const LOG_BACENTA_HISTORY = gql`
  mutation LogBacentaHistory(
    $bacentaId: ID!
    $historyRecord: String
    $leader: ID
  ) {
    LogBacentaHistory(
      bacentaId: $bacentaId
      historyRecord: $historyRecord
      leader: $leader
    ) {
      id
      name
    }
  }
`
