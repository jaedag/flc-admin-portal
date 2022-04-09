import { gql } from '@apollo/client'

export const STREAM_ARRIVALS_HELPERS = gql`
  query ($id: ID!) {
    streams(where: { id: $id }, options: { limit: 1 }) {
      id
      name

      arrivalsCounters {
        id
        firstName
        lastName
        fullName
        pictureUrl
        fellowship {
          id
          name
        }
        ministry {
          id
          name
        }
      }
      arrivalsConfirmers {
        id
        firstName
        lastName
        fullName
        pictureUrl
        fellowship {
          id
          name
        }
        ministry {
          id
          name
        }
      }

      activeBacentaCount
    }
  }
`

export const MAKE_STREAMARRIVALS_COUNTER = gql`
  mutation MakeStreamArrivalsCounter($streamId: ID!, $arrivalsCounterId: ID!) {
    MakeStreamArrivalsCounter(
      streamId: $streamId
      arrivalsCounterId: $arrivalsCounterId
    ) {
      id
      firstName
      lastName
    }
  }
`

export const REMOVE_STREAMARRIVALS_COUNTER = gql`
  mutation RemoveStreamArrivalsCounter(
    $streamId: ID!
    $arrivalsCounterId: ID!
  ) {
    RemoveStreamArrivalsCounter(
      streamId: $streamId
      arrivalsCounterId: $arrivalsCounterId
    ) {
      id
      firstName
      lastName
    }
  }
`

export const MAKE_STREAMARRIVALS_CONFIRMER = gql`
  mutation MakeStreamArrivalsConfirmer(
    $streamId: ID!
    $arrivalsConfirmerId: ID!
  ) {
    MakeStreamArrivalsConfirmer(
      streamId: $streamId
      arrivalsConfirmerId: $arrivalsConfirmerId
    ) {
      id
      firstName
      lastName
    }
  }
`

export const REMOVE_STREAMARRIVALS_CONFIRMER = gql`
  mutation RemoveStreamArrivalsConfirmer(
    $streamId: ID!
    $arrivalsConfirmerId: ID!
  ) {
    RemoveStreamArrivalsConfirmer(
      streamId: $streamId
      arrivalsConfirmerId: $arrivalsConfirmerId
    ) {
      id
      firstName
      lastName
    }
  }
`

export const REMOVE_ALL_STREAMARRIVALS_HELPERS = gql`
  mutation RemoveAllStreamArrivalsHelpers($streamId: ID!) {
    RemoveAllStreamArrivalsHelpers(streamId: $streamId) {
      id
      name
      arrivalsConfirmers {
        id
        firstName
        lastName
        fullName
      }
      arrivalsCounters {
        id
        firstName
        lastName
        fullName
      }
    }
  }
`
