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
        town {
          id
          bishop {
            id
          }
        }
        campus {
          id
          bishop {
            id
          }
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
      town {
        id
        bacentas {
          id
        }
        bishop {
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
      campus {
        id
        bacentas {
          id
        }
        bishop {
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

export const MAKE_CAMPUSTOWN_INACTIVE = gql`
  mutation CloseDownCampusTown($campusTownId: ID!) {
    CloseDownCampusTown(campusTownId: $campusTownId) {
      id
      name
      stream_name

      town {
        id
        council {
          id
          towns
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
      campus {
        id
        council {
          id
          towns
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
