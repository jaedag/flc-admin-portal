import { gql } from '@apollo/client'

export const GATHERINGSERVICE_MEMBER_SEARCH = gql`
  query ($id: ID!, $key: String!) {
    gatheringServices(where: { id: $id }) {
      id
      memberSearch(key: $key, limit: 5) {
        id
        firstName
        lastName
      }
    }
  }
`

export const STREAM_MEMBER_SEARCH = gql`
  query ($id: ID!, $key: String!) {
    streams(where: { id: $id }) {
      id
      memberSearch(key: $key, limit: 5) {
        id
        firstName
        lastName
      }
    }
  }
`

export const COUNCIL_MEMBER_SEARCH = gql`
  query ($id: ID!, $key: String!) {
    councils(where: { id: $id }) {
      id
      memberSearch(key: $key, limit: 5) {
        id
        firstName
        lastName
      }
    }
  }
`

export const CONSTITUENCY_MEMBER_SEARCH = gql`
  query ($id: ID!, $key: String!) {
    constituencies(where: { id: $id }) {
      id
      memberSearch(key: $key, limit: 5) {
        id
        firstName
        lastName
      }
    }
  }
`

export const BACENTA_MEMBER_SEARCH = gql`
  query ($id: ID!, $key: String!) {
    bacentas(where: { id: $id }) {
      id
      memberSearch(key: $key, limit: 5) {
        id
        firstName
        lastName
      }
    }
  }
`

export const FELLOWSHIP_MEMBER_SEARCH = gql`
  query ($id: ID!, $key: String!) {
    fellowships(where: { id: $id }) {
      id
      memberSearch(key: $key, limit: 5) {
        id
        firstName
        lastName
      }
    }
  }
`
