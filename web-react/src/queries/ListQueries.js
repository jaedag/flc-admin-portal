import { gql } from '@apollo/client'

export const ALL_MEMBERS = gql`
  {
    Member(first: 50) {
      memberID
      firstName
      lastName
      pictureUrl
    }
  }
`

export const GET_APOSTLE_MEMBERS = gql`
  query($apostleID: ID) {
    apostleMemberList(apostleID: $apostleID, first: 60) {
      memberID
      firstName
      lastName
      pictureUrl
    }
  }
`

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
    centreDropdown(centreName: $centreName, first: 8) {
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

export const GET_SONTA_TOWNS = gql`
  query($ministryID: ID, $apostleID: ID) {
    sontaTownList(ministryID: $ministryID, apostleID: $apostleID) {
      townID
      name
      sontas {
        sontaID
        name
        ministry {
          name
        }
        leader {
          memberID
          firstName
          lastName
        }
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
      pictureUrl
      town {
        name
      }
      campus {
        name
      }
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

export const OCCUPATION_LIST = gql`
  query($searchKey: String!) {
    occupationList(searchKey: $searchKey, first: 5) {
      occupation
    }
  }
`
