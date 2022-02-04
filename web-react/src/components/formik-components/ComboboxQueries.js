import { gql } from '@apollo/client'

export const COUNCIL_FELLOWSHIP_DROPDOWN = gql`
  query ($id: ID!, $fellowshipName: String!) {
    councilFellowshipDropdown(id: $id, fellowshipName: $fellowshipName) {
      id
      name
      bacenta {
        id
        name
        constituency {
          id
          name
        }
      }
    }
  }
`
