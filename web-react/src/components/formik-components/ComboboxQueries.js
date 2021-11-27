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

export const COUNCIL_CENTRE_DROPDOWN = gql`
  query($id: ID!, $nameSearch: String!) {
    councils(where: { id: $id }, options: { limit: 8 }) {
      id
      name
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
