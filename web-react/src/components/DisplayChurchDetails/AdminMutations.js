import { gql } from '@apollo/client'

export const REMOVE_CONSTITUENCY_ADMIN = gql`
  mutation RemoveConstituencyAdmin($constituencyId: ID!, $adminId: ID!) {
    RemoveConstituencyAdmin(
      adminId: $adminId
      constituencyId: $constituencyId
    ) {
      id
    }
  }
`

export const MAKE_CONSTITUENCY_ADMIN = gql`
  mutation MakeConstituencyAdmin(
    $constituencyId: ID!
    $newAdminId: ID!
    $oldAdminId: ID!
  ) {
    RemoveConstituencyAdmin(
      constituencyId: $constituencyId
      adminId: $oldAdminId
    ) {
      id
      firstName
      lastName
    }
    MakeConstituencyAdmin(
      constituencyId: $constituencyId
      adminId: $newAdminId
    ) {
      id
      firstName
      lastName
      isAdminForConstituency {
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

export const NEW_CONSTITUENCY_ADMIN = gql`
  mutation MakeConstituencyAdmin($constituencyId: ID!, $adminId: ID!) {
    MakeConstituencyAdmin(constituencyId: $constituencyId, adminId: $adminId) {
      id
      firstName
      lastName
      isAdminForConstituency {
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

export const NEW_COUNCIL_ADMIN = gql`
  mutation MakeCouncilAdmin($councilId: ID!, $adminId: ID!) {
    MakeCouncilAdmin(councilId: $councilId, adminId: $adminId) {
      id
      firstName
      lastName
      isAdminForCouncil {
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
