import { gql } from '@apollo/client'

export const CONSTIUENCY_BACENTAS_NO_ACTIVITY = gql`
  query ($id: ID) {
    constituencies(where: { id: $id }, options: { limit: 1 }) {
      id
      name

      bacentasNoActivity {
        id
        name
        leader {
          id
          firstName
          lastName
          fullName
          pictureUrl
        }
      }
    }
  }
`

export const CONSTIUENCY_BACENTAS_MOBILISING = gql`
  query ($id: ID) {
    constituencies(where: { id: $id }, options: { limit: 1 }) {
      id
      name

      bacentasMobilising {
        id
        name
        leader {
          id
          firstName
          lastName
          fullName
          pictureUrl
        }
      }
    }
  }
`

export const CONSTIUENCY_BACENTAS_ON_THE_WAY = gql`
  query ($id: ID) {
    constituencies(where: { id: $id }, options: { limit: 1 }) {
      id
      name

      bacentasOnTheWay {
        id
        name
        leader {
          id
          firstName
          lastName
          fullName
          pictureUrl
        }
        bussing(limit: 1) {
          id
        }
      }
    }
  }
`
