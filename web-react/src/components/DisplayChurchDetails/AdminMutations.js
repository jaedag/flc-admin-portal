import { gql } from '@apollo/client'

export const REMOVE_TOWN_ADMIN = gql`
  mutation ($townId: ID!, $adminId: ID!) {
    RemoveTownAdmin(adminId: $adminId, townId: $townId) {
      id
    }
  }
`

export const MAKE_TOWN_ADMIN = gql`
  mutation MakeTownAdmin($townId: ID!, $newAdminId: ID!, $oldAdminId: ID!) {
    RemoveTownAdmin(townId: $townId, adminId: $oldAdminId) {
      id
      firstName
      lastName
    }
    MakeTownAdmin(townId: $townId, adminId: $newAdminId) {
      id
      firstName
      lastName
      isAdminForTown {
        id
        admin {
          id
          firstName
          lastName
        }
      }
    }
  }
`

export const REMOVE_CAMPUS_ADMIN = gql`
  mutation RemoveCampusAdmin($campusId: ID!, $adminId: ID!) {
    RemoveCampusAdmin(adminId: $adminId, campusId: $campusId) {
      id
    }
  }
`

export const MAKE_CAMPUS_ADMIN = gql`
  mutation MakeCampusAdmin($campusId: ID!, $newAdminId: ID!, $oldAdminId: ID!) {
    RemoveCampusAdmin(campusId: $campusId, adminId: $oldAdminId) {
      id
      firstName
      lastName
    }
    MakeCampusAdmin(campusId: $campusId, adminId: $newAdminId) {
      id
      firstName
      lastName
      isAdminForCampus {
        id
        admin {
          id
          firstName
          lastName
        }
      }
    }
  }
`

export const NEW_CAMPUS_ADMIN = gql`
  mutation MakeCampusAdmin($campusId: ID!, $adminId: ID!) {
    MakeCampusAdmin(campusId: $campusId, adminId: $adminId) {
      id
      firstName
      lastName
      isAdminForCampus {
        id
        admin {
          id
          firstName
          lastName
        }
      }
    }
  }
`
