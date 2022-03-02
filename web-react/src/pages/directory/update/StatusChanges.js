import { gql } from '@apollo/client'

export const SET_VACATION_FELLOWSHIP = gql`
  mutation SetVacationFellowship($fellowshipId: ID!) {
    SetVacationFellowship(fellowshipId: $fellowshipId) {
      id
      name
      vacationStatus
      history {
        id
        historyRecord
      }
    }
  }
`

export const SET_ACTIVE_FELLOWSHIP = gql`
  mutation SetActiveFellowship($fellowshipId: ID!) {
    SetActiveFellowship(fellowshipId: $fellowshipId) {
      id
      name
      vacationStatus
      history {
        id
        historyRecord
      }
    }
  }
`

export const SET_VACATION_BACENTA = gql`
  mutation SetVacationBacenta($bacentaId: ID!) {
    SetVacationBacenta(bacentaId: $bacentaId) {
      id
      name
      vacationStatus
      history {
        id
        historyRecord
      }
    }
  }
`

export const SET_ACTIVE_BACENTA = gql`
  mutation SetActiveBacenta($bacentaId: ID!) {
    SetActiveBacenta(bacentaId: $bacentaId) {
      id
      name
      vacationStatus
      history {
        id
        historyRecord
      }
    }
  }
`

export const MAKE_BACENTA_IC = gql`
  mutation MakeBacentaIC($bacentaId: ID!) {
    MakeBacentaIC(bacentaId: $bacentaId) {
      id
      name
      graduationStatus
      status
      history(options: { limit: 5 }) {
        id
        timeStamp
        created_at {
          date
        }
        loggedBy {
          id
          firstName
          lastName
          stream_name
        }
        historyRecord
      }
    }
  }
`

export const MAKE_BACENTA_GRADUATED = gql`
  mutation MakeBacentaGraduated($bacentaId: ID!) {
    MakeBacentaGraduated(bacentaId: $bacentaId) {
      id
      name
      graduationStatus
      history(options: { limit: 5 }) {
        id
        timeStamp
        created_at {
          date
        }
        loggedBy {
          id
          firstName
          lastName
          stream_name
        }
        historyRecord
      }
    }
  }
`
