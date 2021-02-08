import { gql } from '@apollo/client'

export const GLOBAL_SEARCH = gql`
  query globalSearch($searchKey: String!) {
    globalSearch(searchKey: $searchKey, first: 6) {
      memberID
      firstName
      lastName
      pictureUrl
      bacenta {
        name
        leader {
          firstName
          lastName
        }
        centre {
          town {
            bishop {
              memberID
            }
          }
          campus {
            bishop {
              memberID
            }
          }
        }
      }
      ministry {
        name
      }
      campusGSO {
        name
      }
      townGSO {
        name
      }
      townBishop {
        name
      }
      campusBishop {
        name
      }
    }
  }
`
