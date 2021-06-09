import { gql } from '@apollo/client'

export const MAKE_BISHOP_ADMIN = gql`
  mutation ($bishopId: ID!, $adminId: ID!) {
    MergeMemberIsBishopAdminFor(to: { id: $bishopId }, from: { id: $adminId }) {
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
  mutation ($bishopId: ID!, $adminId: ID!) {
    RemoveMemberIsBishopAdminFor(
      from: { id: $adminId }
      to: { id: $bishopId }
    ) {
      from {
        id
        firstName
        lastName
      }
    }
  }
`

export const REMOVE_TOWN_ADMIN = gql`
  mutation ($townId: ID!, $adminId: ID!) {
    RemoveMemberIsTownAdminFor(from: { id: $adminId }, to: { id: $townId }) {
      tow {
        id
        name
      }
    }
  }
`

export const MAKE_TOWN_ADMIN = gql`
  mutation ($townId: ID!, $adminId: ID!) {
    MergeMemberIsTownAdminFor(to: { id: $townId }, from: { id: $adminId }) {
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
  mutation ($campusId: ID!, $adminId: ID!) {
    RemoveMemberIsCampusAdminFor(
      from: { id: $adminId }
      to: { id: $campusId }
    ) {
      to {
        id
        name
      }
    }
  }
`

export const MAKE_CAMPUS_ADMIN = gql`
  mutation ($campusId: ID!, $adminId: ID!) {
    MergeMemberIsCampusAdminFor(to: { id: $townId }, from: { id: $adminId }) {
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
