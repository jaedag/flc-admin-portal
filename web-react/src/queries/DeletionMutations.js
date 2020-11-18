import { gql } from '@apollo/client'

export const DELETE_CENTRE_MUTATION = gql`
  mutation RemoveCentre($centreID: ID!) {
    RemoveCentre(centreID: $centreID)
  }
`
