import { gql } from '@apollo/client'

export const GLOBAL_SEARCH = gql`
  query memberSearch($searchKey: String!) {
    memberSearch(searchKey: $searchKey) {
      memberID
      firstName
      lastName
    }
  }
`
