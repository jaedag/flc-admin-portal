import { gql } from '@apollo/client'

export const MAKE_BACENTA_INACTIVE = gql`
  mutation CloseDownBacenta($bacentaId: ID!) {
    CloseDownBacenta(bacentaId: $bacentaId) {
      id
      name
      centre {
        id
        stream
        bacentas {
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

export const MAKE_CENTRE_INACTIVE = gql`
  mutation CloseDownCentre($centreId: ID!) {
    CloseDownCentre(centreId: $centreId) {
      id
      name
      stream
      town {
        id
        centres {
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
        centres {
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
      stream

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

export const SET_VACATION_BACENTA = gql`
  mutation SetVacationBacenta($bacentaId: ID!) {
    SetVacationBacenta(bacentaId: $bacentaId) {
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
