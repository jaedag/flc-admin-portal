import { gql } from '@apollo/client'

export const MAKE_BACENTA_INACTIVE = gql`
  mutation MakeBacentaInactive($bacentaId: ID!) {
    MakeBacentaInactive(bacentaId: $bacentaId) {
      id
      name
      centre {
        id
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
  mutation MakeCentreInactive($centreId: ID!) {
    MakeCentreInactive(centreId: $centreId) {
      id
      name
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
  mutation MakeCampusTownInactive($campusTownId: ID!) {
    MakeCampusTownInactive(campusTownId: $campusTownId) {
      id
      name
      campusBishop {
        id
        isBishopForCampus {
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
      townBishop {
        id
        isBishopForTown {
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
