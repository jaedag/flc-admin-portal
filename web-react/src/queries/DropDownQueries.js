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

export const GET_CENTRES = gql`
  query($communityID: ID) {
    centreList(communityID: $communityID) {
      centreID
      name
      leader {
        firstName
        lastName
      }
      community {
        name
        leader {
          memberID
          firstName
          lastName
        }
      }
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
      town {
        name
        leader {
          memberID
          firstName
          lastName
        }
        sontas {
          name
        }
      }

      leader {
        firstName
        lastName
      }
    }
  }
`
export const GET_SONTAS = gql`
  query($townID: ID) {
    townSontaList(townID: $townID) {
      sontaID
      name
      town {
        name
        leader {
          memberID
          firstName
          lastName
        }
      }
      leader {
        memberID
        firstName
        lastName
      }
    }
  }
`

export const GET_TOWNS = gql`
  query($apostleID: ID) {
    townList(apostleID: $apostleID) {
      name
      townID
      leader {
        memberID
        firstName
        lastName
      }
      sontas {
        name
      }
      apostle {
        memberID
        firstName
        lastName
      }
    }
  }
`

export const GET_APOSTLES = gql`
  query {
    apostlesList {
      memberID
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
      leader
    }
  }
`
