import { gql } from '@apollo/client'

export const jobs = gql`
  {
    Occupation {
      occupation
    }
  }
`

export const ALL_MEMBERS = gql`
  {
    Member {
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
