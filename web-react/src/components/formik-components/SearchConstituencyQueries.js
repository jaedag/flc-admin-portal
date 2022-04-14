import { gql } from '@apollo/client'

export const GATHERINGSERVICE_CONSTITUENCY_SEARCH = gql`
  query ($id: ID!, $key: String!) {
    gatheringServices(where: { id: $id }) {
      id
      constituencySearch(key: $key, limit: 5) {
        id
        name
      }
    }
  }
`

export const STREAM_CONSTITUENCY_SEARCH = gql`
  query ($id: ID!, $key: String!) {
    streams(where: { id: $id }) {
      id
      constituencySearch(key: $key, limit: 5) {
        id
        name
      }
    }
  }
`

export const COUNCIL_CONSTITUENCY_SEARCH = gql`
  query ($id: ID!, $key: String!) {
    councils(where: { id: $id }) {
      id
      constituencySearch(key: $key, limit: 5) {
        id
        name
      }
    }
  }
`

export const MEMBER_CONSTITUENCY_SEARCH = gql`
  query ($id: ID!, $key: String!) {
    members(where: { id: $id }) {
      id
      constituencySearch(key: $key) {
        id
        name
      }
    }
  }
`
