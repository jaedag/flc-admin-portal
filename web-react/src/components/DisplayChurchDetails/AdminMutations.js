import { gql } from '@apollo/client'

export const REMOVE_TOWN_ADMIN = gql`
  mutation($townId: ID!, $adminId: ID!) {
    RemoveTownAdmin(from: $adminId, to: $townId) {
      id
    }
  }
`

export const MAKE_TOWN_ADMIN = gql`
  mutation($townId: ID!, $adminId: ID!) {
    MakeTownAdmin(to: $townId, from: $adminId) {
      id
    }
  }
`

export const REMOVE_CAMPUS_ADMIN = gql`
  mutation($campusId: ID!, $adminId: ID!) {
    RemoveCampusAdmin(from: $adminId, to: $campusId) {
      id
    }
  }
`

export const MAKE_CAMPUS_ADMIN = gql`
  mutation($campusId: ID!, $adminId: ID!) {
    MakeCampusAdmin(to: $campusId, from: $adminId) {
      id
    }
  }
`
