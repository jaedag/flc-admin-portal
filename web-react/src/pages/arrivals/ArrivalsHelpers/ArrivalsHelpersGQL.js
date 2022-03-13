import { gql } from '@apollo/client'

export const STREAM_ARRIVALS_HELPERS = gql`
  query ($id: ID) {
    streams(where: { id: $id }, options: { limit: 1 }) {
      id
      name

      arrivalsHelpers {
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

      bacentaCount
    }
  }
`

export const MAKE_STREAMARRIVALS_HELPER = gql`
  mutation MakeStreamArrivalsHelper($streamId: ID!, $arrivalsHelperId: ID!) {
    MakeStreamArrivalsHelper(
      streamId: $streamId
      arrivalsHelperId: $arrivalsHelperId
    ) {
      id
      firstName
      lastName
    }
  }
`

export const REMOVE_STREAMARRIVALS_HELPER = gql`
  mutation RemoveStreamArrivalsHelper($streamId: ID!, $arrivalsHelperId: ID!) {
    RemoveStreamArrivalsHelper(
      streamId: $streamId
      arrivalsHelperId: $arrivalsHelperId
    ) {
      id
      firstName
      lastName
    }
  }
`
