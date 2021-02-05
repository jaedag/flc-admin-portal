import { gql } from '@apollo/client'

export const DELETE_BACENTA_MUTATION = gql`
  mutation RemoveBacenta($bacentaID: ID!) {
    RemoveBacenta(bacentaID: $bacentaID)
  }
`
