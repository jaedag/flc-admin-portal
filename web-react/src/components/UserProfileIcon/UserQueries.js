import { gql } from '@apollo/client'

export const GET_LOGGED_IN_USER = gql`
  query memberByEmail($email: String) {
    members(where: { email: $email }, options: { limit: 1 }) {
      id
      firstName
      lastName
      pictureUrl
      bacenta {
        id
        centre {
          id
          campus {
            id
            bishop {
              id
            }
          }
          town {
            id
            bishop {
              id
            }
          }
        }
      }
    }
  }
`
