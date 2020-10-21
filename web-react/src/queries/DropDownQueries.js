import { gql } from '@apollo/client'

export const GET_CENTRE_LEADERS = gql`
  {
    townList(firstName: $firstName, lastName: $lastName) {
      communities {
        centres {
          centreLeader {
            firstName
            lastName
          }
        }
      }
    }
  }
`

export const GET_CENTRE = gql`
  {
    centreList(communityID: $communityID) {
      centreID
      name
    }
  }
`

export const CENTRE_DROPDOWN = gql`
  query($centreName: String) {
    centreDropdown(centreName: $centreName) {
      centreID
      name
      hall {
        campus {
          name
        }
      }
      community {
        town {
          name
        }
      }
    }
  }
`

export const GET_COMMUNITIES = gql`
  query($townID: ID) {
    communityList(townID: $townID) {
      communityID
      name
    }
  }
`

export const GET_TOWNS = gql`
  query($aFirstName: String, $aLastName: String) {
    townList(aFirstName: $aFirstName, aLastName: $aLastName) {
      name
      townID
    }
  }
`

export const GET_APOSTLES = gql`
  query {
    apostlesList {
      # memberID
      firstName
      lastName
    }
  }
`

export const SONTA_LIST = gql`
  query {
    sontaList {
      sontaID
      name
    }
  }
`

export const CENTRE_LIST = gql`
  query($communityID: ID) {
    centreList(communityID: $communityID) {
      centreID
      name
    }
  }
`
