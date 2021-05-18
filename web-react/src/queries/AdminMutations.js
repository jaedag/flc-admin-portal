import { gql } from '@apollo/client'

export const MAKE_BISHOP_ADMIN = gql`
  mutation($bishopId: ID!, $adminId: ID!) {
    AddMemberHasAdmin(from: { id: $adminId }, to: { id: $bishopId }) {
      to {
        id
        firstName
        lastName
      }
    }
  }
`

export const REMOVE_BISHOP_ADMIN = gql`
  mutation($bishopId: ID!, $adminId: ID!) {
    RemoveMemberHasAdmin(from: { id: $adminId }, to: { id: $bishopId }) {
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
    RemoveTownAdmin(from: { id: $adminId }, to: { id: $townId }) {
      tow {
        id
        name
      }
    }
  }
`

export const MAKE_TOWN_ADMIN = gql`
  mutation($townId: ID!, $adminId: ID!) {
    AddTownAdmin(from: { id: $adminId }, to: { id: $townId }) {
      to {
        id
        name
      }
    }
  }
`

export const REMOVE_CAMPUS_ADMIN = gql`
  mutation($campusId: ID!, $adminId: ID!) {
    RemoveCampusAdmin(from: { id: $adminId }, to: { id: $campusId }) {
      to {
        id
        name
      }
    }
  }
`

export const MAKE_CAMPUS_ADMIN = gql`
  mutation($campusId: ID!, $adminId: ID!) {
    AddCampusAdmin(from: { id: $adminId }, to: { id: $campusId }) {
      to {
        id
        name
      }
    }
  }
`
