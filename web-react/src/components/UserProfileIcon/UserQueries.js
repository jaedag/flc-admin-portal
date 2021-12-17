import { gql } from '@apollo/client'

export const GET_LOGGED_IN_USER = gql`
  query memberByEmail($email: String!) {
    memberByEmail(email: $email) {
      id
      firstName
      lastName
      pictureUrl
      fellowship {
        id
        bacenta {
          id
          campus {
            id
            council {
              id
              stream {
                id
              }
            }
          }
          town {
            id
            council {
              id
              stream {
                id
              }
            }
          }
        }
      }
    }
  }
`
