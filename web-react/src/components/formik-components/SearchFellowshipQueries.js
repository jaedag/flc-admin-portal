import { gql } from '@apollo/client'

export const GATHERINGSERVICE_FELLOWSHIP_SEARCH = gql`
  query ($id: ID!, $key: String!) {
    gatheringServices(where: { id: $id }) {
      id
      fellowshipSearch(key: $key, limit: 5) {
        id
        name
      }
    }
  }
`

export const STREAM_FELLOWSHIP_SEARCH = gql`
  query ($id: ID!, $key: String!) {
    streams(where: { id: $id }) {
      id
      fellowshipSearch(key: $key, limit: 5) {
        id
        name
      }
    }
  }
`

export const COUNCIL_FELLOWSHIP_SEARCH = gql`
  query ($id: ID!, $key: String!) {
    councils(where: { id: $id }) {
      id
      fellowshipSearch(key: $key, limit: 5) {
        id
        name
      }
    }
  }
`

export const CONSTITUENCY_FELLOWSHIP_SEARCH = gql`
  query ($id: ID!, $key: String!) {
    constituencies(where: { id: $id }) {
      id
      fellowshipSearch(key: $key, limit: 5) {
        id
        name
      }
    }
  }
`

export const BACENTA_FELLOWSHIP_SEARCH = gql`
  query ($id: ID!, $key: String!) {
    bacentas(where: { id: $id }) {
      id
      fellowshipSearch(key: $key, limit: 5) {
        id
        name
      }
    }
  }
`

export const MEMBER_FELLOWSHIP_SEARCH = gql`
  query ($id: ID!, $key: String!) {
    members(where: { id: $id }) {
      id
      fellowshipSearch(key: $key) {
        id
        name
      }
    }
  }
`
