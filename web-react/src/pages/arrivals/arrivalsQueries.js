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
        bussing(limit: 4) {
          id
          week
        }
      }
    }
  }
`

export const BACENTA_ARRIVALS = gql`
  query ($id: ID) {
    bacentas(where: { id: $id }, options: { limit: 1 }) {
      id
      name
    }
  }
`

export const BACENTA_LEADER_ARRIVALS = gql`
  query ($id: ID) {
    members(where: { id: $id }, options: { limit: 1 }) {
      id
      firstName
      lastName
      fullName
      leadsBacenta {
        id
        name
      }
    }
  }
`

export const DISPLAY_BUSSING_RECORDS = gql`
  query DisplayBussingRecords($bussingRecordId: ID!, $bacentaId: ID!) {
    bussingRecords(where: { id: $bussingRecordId }) {
      id
      created_at
      created_by {
        id
        firstName
        lastName
        fullName
      }
      serviceDate {
        date
      }
      bussingPictures
      bussingCost
      offeringRaised
      numberOfBusses
      numberOfCars
    }
    bacentas(where: { id: $bacentaId }) {
      id
      name
    }
  }
`
