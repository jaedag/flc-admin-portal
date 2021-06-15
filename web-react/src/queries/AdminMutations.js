import { gql } from '@apollo/client'

export const MAKE_BISHOP_ADMIN = gql`
  mutation($bishopId: ID!, $adminId: ID!) {
    MergeMemberIsBishopAdminFor(to: $bishopId, from: $adminId) {
      to {
        id
      }
      from {
        id
        firstName
        lastName
      }
    }
  }
`

export const REMOVE_BISHOP_ADMIN = gql`
  mutation($bishopId: ID!, $adminId: ID!) {
    RemoveMemberIsBishopAdminFor(from: $adminId, to: $bishopId) {
      from {
        id
        firstName
        lastName
      }
    }
  }
`

export const REMOVE_TOWN_ADMIN = gql`
  mutation($townId: ID!, $adminId: ID!) {
    RemoveMemberIsTownAdminFor(from: $adminId, to: $townId) {
      tow {
        id
        name
      }
    }
  }
`

export const MAKE_TOWN_ADMIN = gql`
  mutation($townId: ID!, $adminId: ID!) {
    MergeMemberIsTownAdminFor(to: $townId, from: $adminId) {
      to {
        id
      }
      from {
        id
        firstName
        lastName
      }
    }
  }
`

export const REMOVE_CAMPUS_ADMIN = gql`
  mutation($campusId: ID!, $adminId: ID!) {
    RemoveMemberIsCampusAdminFor(from: $adminId, to: $campusId) {
      to {
        id
        name
      }
    }
  }
`

export const MAKE_CAMPUS_ADMIN = gql`
  mutation($campusId: ID!, $adminId: ID!) {
    MergeMemberIsCampusAdminFor(to: $townId, from: $adminId) {
      to {
        id
      }
      from {
        id
        firstName
        lastName
      }
    }
  }
`
