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

export const GET_APOSTLE_PASTORS = gql`
  query($apostleID: ID) {
    apostlePastorList(apostleID: $apostleID, first: 60) {
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
  query($communityID: ID, $hallID: ID) {
    centreList(communityID: $communityID, hallID: $hallID) {
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
      hall {
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

export const GET_HALLS = gql`
  query($campusID: ID) {
    hallList(campusID: $campusID) {
      hallID
      name
      campus {
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

export const GET_TOWN_SONTA_LEADERS = gql`
  query($ministryID: ID, $apostleID: ID) {
    townSontaLeader(ministryID: $ministryID, apostleID: $apostleID) {
      memberID
      firstName
      lastName
      sonta {
        name
      }
      leadsSonta {
        name
        town {
          name
        }
      }
    }
  }
`

export const GET_CAMPUSES = gql`
  query($apostleID: ID) {
    campusList(apostleID: $apostleID) {
      name
      campusID
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

export const MINISTRY_LIST = gql`
  query {
    ministryList {
      ministryID
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
