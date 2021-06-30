import { gql } from '@apollo/client'

export const REMOVE_TOWN_ADMIN = gql`
  mutation($townId: ID!, $adminId: ID!) {
    RemoveMemberIsTownAdminFor(from: $adminId, to: $townId) {
      id
    }
  }
`

export const MAKE_TOWN_ADMIN = gql`
  mutation($townId: ID!, $adminId: ID!) {
    MergeMemberIsTownAdminFor(to: $townId, from: $adminId) {
      id
    }
  }
`

export const REMOVE_CAMPUS_ADMIN = gql`
  mutation($campusId: ID!, $adminId: ID!) {
    RemoveMemberIsCampusAdminFor(from: $adminId, to: $campusId) {
      id
    }
  }
`

export const MAKE_CAMPUS_ADMIN = gql`
  mutation($campusId: ID!, $adminId: ID!) {
    MergeMemberIsCampusAdminFor(to: $campusId, from: $adminId) {
      id
    }
  }
`
