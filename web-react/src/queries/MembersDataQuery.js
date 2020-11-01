import { gql } from '@apollo/client'

export const ALL_MEMBERS = gql`
  {
    Member(first: 50) {
      memberID
      firstName
      lastName
      pictureUrl
    }
  }
`

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
