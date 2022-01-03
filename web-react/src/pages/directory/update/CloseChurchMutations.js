import { gql } from '@apollo/client'

export const MAKE_FELLOWSHIP_INACTIVE = gql`
  mutation CloseDownFellowship($fellowshipId: ID!) {
    CloseDownFellowship(fellowshipId: $fellowshipId) {
      id
      name
      bacenta {
        id
        stream_name
        fellowships {
          id
          name
        }
        constituency {
          id
          stream_name
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

export const MAKE_BACENTA_INACTIVE = gql`
  mutation CloseDownBacenta($bacentaId: ID!) {
    CloseDownBacenta(bacentaId: $bacentaId) {
      id
      name
      stream_name
      constituency {
        id
        bacentas {
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

export const MAKE_CONSTITUENCY_INACTIVE = gql`
  mutation CloseDownConstituency($constituencyId: ID!) {
    CloseDownConstituency(constituencyId: $constituencyId) {
      id
      name
      stream_name

      constituency {
        id
        council {
          id
          constituencies
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
  mutation CloseDownCouncil($councilId: ID!) {
    CloseDownCouncil(councilId: $councilId) {
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
  mutation CloseDownStream($streamId: ID!) {
    CloseDownStream(streamId: $streamId) {
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
