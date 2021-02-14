import { gql } from '@apollo/client'

export const DELETE_BACENTA_MUTATION = gql`
  mutation DeleteBacenta($id: ID!) {
    DeleteBacenta(id: $id)
  }
`
