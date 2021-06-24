import { gql } from '@apollo/client'

export const MAKE_BISHOP_ADMIN = gql`
  mutation($bishopId: ID!, $adminId: ID!) {
    MergeMemberIsBishopAdminFor(to: $bishopId, from: $adminId) {
      id
    }
  }
`

export const REMOVE_BISHOP_ADMIN = gql`
  mutation($bishopId: ID!, $adminId: ID!) {
    RemoveMemberIsBishopAdminFor(from: $adminId, to: $bishopId) {
      id
    }
  }
`

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
