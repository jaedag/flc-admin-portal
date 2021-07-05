import { gql } from '@apollo/client'

export const REMOVE_TOWN_ADMIN = gql`
  mutation($townId: ID!, $adminId: ID!) {
    RemoveTownAdmin(adminId: $adminId, townId: $townId) {
      id
    }
  }
`

export const MAKE_TOWN_ADMIN = gql`
  mutation($townId: ID!, $adminId: ID!) {
    MakeTownAdmin(townId: $townId, adminId: $adminId) {
      id
    }
  }
`

export const REMOVE_CAMPUS_ADMIN = gql`
  mutation($campusId: ID!, $adminId: ID!) {
    RemoveCampusAdmin(adminId: $adminId, campusId: $campusId) {
      id
    }
  }
`

export const MAKE_CAMPUS_ADMIN = gql`
  mutation($campusId: ID!, $adminId: ID!) {
    MakeCampusAdmin(campusId: $campusId, adminId: $adminId) {
      id
    }
  }
`
