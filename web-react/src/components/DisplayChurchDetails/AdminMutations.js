import { gql } from '@apollo/client'

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
      oldAdminId: $oldAdminId
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

export const MAKE_COUNCIL_ADMIN = gql`
  mutation MakeCouncilAdmin(
    $councilId: ID!
    $newAdminId: ID!
    $oldAdminId: ID!
  ) {
    RemoveCouncilAdmin(councilId: $councilId, adminId: $oldAdminId) {
      id
      firstName
      lastName
    }
    MakeCouncilAdmin(
      councilId: $councilId
      adminId: $newAdminId
      oldAdminId: $oldAdminId
    ) {
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

export const MAKE_STREAM_ADMIN = gql`
  mutation MakeStreamAdmin($streamId: ID!, $newAdminId: ID!, $oldAdminId: ID!) {
    RemoveStreamAdmin(streamId: $streamId, adminId: $oldAdminId) {
      id
      firstName
      lastName
    }
    MakeStreamAdmin(
      streamId: $streamId
      adminId: $newAdminId
      oldAdminId: $oldAdminId
    ) {
      id
      firstName
      lastName
      isAdminForStream {
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
