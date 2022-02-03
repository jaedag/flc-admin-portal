import { gql } from '@apollo/client'

export const MAKE_FELLOWSHIP_INACTIVE = gql`
  mutation CloseDownFellowship($fellowshipId: ID!, $leaderId: ID!) {
    CloseDownFellowship(fellowshipId: $fellowshipId, leaderId: $leaderId) {
      #Returns Bacenta
      id
      name

      fellowships {
        id
        name
      }
    }
  }
`

export const MAKE_BACENTA_INACTIVE = gql`
  mutation CloseDownBacenta($bacentaId: ID!, $leaderId: ID!) {
    CloseDownBacenta(bacentaId: $bacentaId, leaderId: $leaderId) {
      # Returns Constituency
      id
      name

      bacentas {
        id
        name
      }
    }
  }
`

export const MAKE_CONSTITUENCY_INACTIVE = gql`
  mutation CloseDownConstituency($constituencyId: ID!, $leaderId: ID!) {
    CloseDownConstituency(
      constituencyId: $constituencyId
      leaderId: $leaderId
    ) {
      id
      name
      stream_name
      council {
        id
        constituencies {
          id
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
    }
  }
`

export const MAKE_COUNCIL_INACTIVE = gql`
  mutation CloseDownCouncil($councilId: ID!, $leaderId: ID!) {
    CloseDownCouncil(councilId: $councilId, leaderId: $leaderId) {
      id
      name
      stream_name

      stream {
        id
        councils {
          id
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
    }
  }
`

export const MAKE_STREAM_INACTIVE = gql`
  mutation CloseDownStream($streamId: ID!, $leaderId: ID!) {
    CloseDownStream(streamId: $streamId, leaderId: $leaderId) {
      id
      name

      gatheringService {
        id
        streams {
          id
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
    }
  }
`

export const SET_VACATION_FELLOWSHIP = gql`
  mutation SetVacationFellowship($fellowshipId: ID!) {
    SetVacationFellowship(fellowshipId: $fellowshipId) {
      id
      name
      labels
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
      labels
      history {
        id
        historyRecord
      }
    }
  }
`
