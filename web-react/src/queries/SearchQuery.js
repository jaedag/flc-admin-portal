import { gql } from '@apollo/client'

export const GLOBAL_SEARCH = gql`
  query globalSearch($searchKey: String!) {
    globalSearch(searchKey: $searchKey, first: 6) {
      memberID
      firstName
      lastName
      pictureUrl
      centre {
        name
      }
      sonta {
        name
      }
    }
  }
`
