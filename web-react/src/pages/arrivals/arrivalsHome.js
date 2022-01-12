import { gql } from '@apollo/client'

export const CONSTIUENCY_ARRIVALS_DASHBOARD = gql`
  query ($id: ID) {
    constituencies(where: { id: $id }, options: { limit: 1 }) {
      id
      name
      admin {
        id
        firstName
        lastName
      }
      bacentas {
        id
        name
      }
    }
  }
`

export const CONSTITUENCY_BACENTAS_NOT_ARRIVED = gql`
  query ($id: ID) {
    constituencies(where: { id: $id }, options: { limit: 1 }) {
      id
      name

      bacentas {
        id
        name
        leader {
          id
          firstName
          lastName
          fullName
          pictureUrl
          phoneNumber
          whatsappNumber
        }
        bussing(limit: 3) {
          id
          week
        }
      }
    }
  }
`

export const BACENTA_ARRIVALS_DASHBOARD = gql`
  query ($id: ID) {
    bacentas(where: { id: $id }, options: { limit: 1 }) {
      id
      name
    }
  }
`
