import { gql } from '@apollo/client'

export const FUZZY_SEARCH = gql`
  query memberSearch($searchKey: String!) {
    fuzzyMemberByName(searchKey: $searchKey) {
      firstName
      lastName
      email
      phoneNumber
    }
  }
`
