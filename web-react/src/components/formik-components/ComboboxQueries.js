import { gql } from '@apollo/client'

export const BISHOP_BACENTA_DROPDOWN = gql`
  query($id: ID, $bacentaName: String) {
    members(where: { id: $id }) {
      id
      firstName
      lastName
      bacentas(search: $bacentaName) {
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
  }
`
