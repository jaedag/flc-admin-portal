import { gql } from '@apollo/client'

export const BISHOP_BACENTA_DROPDOWN = gql`
  query($id: ID!, $bacentaName: String!) {
    bishopBacentaDropdown(id: $id, bacentaName: $bacentaName) {
      id
      name
      centre {
        id
        name
        campus {
          id
          name
        }
        town {
          id
          name
        }
      }
    }
  }
`

export const BISHOP_CENTRE_DROPDOWN = gql`
  query($id: ID!, $nameSearch: String!) {
    members(where: { id: $id }, options: { limit: 8 }) {
      id
      firstName
      lastName
      centres(search: $nameSearch) {
        id
        name
        campus {
          id
          name
        }
        town {
          id
          name
        }
      }
    }
  }
`
