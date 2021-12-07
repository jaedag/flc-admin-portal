import { gql } from '@apollo/client'

export const COUNCIL_FELLOWSHIP_DROPDOWN = gql`
  query ($id: ID!, $fellowshipName: String!) {
    councilFellowshipDropdown(id: $id, fellowshipName: $fellowshipName) {
      id
      name
      bacenta {
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

export const COUNCIL_BACENTA_DROPDOWN = gql`
  query ($id: ID!, $nameSearch: String!) {
    councilBacentaDropdown(id: $id, nameSearch: $nameSearch) {
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
`
