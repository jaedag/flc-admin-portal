import { gql } from '@apollo/client'

export const GLOBAL_SEARCH = gql`
  query globalSearch($searchKey: String!) {
    globalSearch(searchKey: $searchKey, first: 6) {
      id
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
              id
            }
          }
          campus {
            bishop {
              id
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
