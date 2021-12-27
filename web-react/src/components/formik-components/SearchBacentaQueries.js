import { gql } from '@apollo/client'

export const GATHERINGSERVICE_BACENTA_SEARCH = gql`
  query ($id: ID!, $key: String!) {
    gatheringServices(where: { id: $id }) {
      id
      bacentaSearch(key: $key, limit: 5) {
        id
        name
      }
    }
  }
`

export const STREAM_BACENTA_SEARCH = gql`
  query ($id: ID!, $key: String!) {
    streams(where: { id: $id }) {
      id
      bacentaSearch(key: $key, limit: 5) {
        id
        name
      }
    }
  }
`

export const COUNCIL_BACENTA_SEARCH = gql`
  query ($id: ID!, $key: String!) {
    councils(where: { id: $id }) {
      id
      bacentaSearch(key: $key, limit: 5) {
        id
        name
      }
    }
  }
`

export const CONSTITUENCY_BACENTA_SEARCH = gql`
  query ($id: ID!, $key: String!) {
    constituencies(where: { id: $id }) {
      id
      bacentaSearch(key: $key, limit: 5) {
        id
        name
      }
    }
  }
`
