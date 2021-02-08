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

export const GET_BISHOP_MEMBERS = gql`
  query($bishopID: ID) {
    bishopMemberList(bishopID: $bishopID, first: 60) {
      memberID
      firstName
      lastName
      pictureUrl
    }
  }
`

export const GET_BISHOP_PASTORS = gql`
  query($bishopID: ID) {
    bishopPastorList(bishopID: $bishopID, first: 60) {
      memberID
      firstName
      lastName
      pictureUrl
    }
  }
`

export const GET_BACENTA_LEADERS = gql`
  {
    townList(firstName: $firstName, lastName: $lastName) {
      centres {
        bacentas {
          bacentaLeader {
            firstName
            lastName
          }
        }
      }
    }
  }
`

export const GET_BACENTAS = gql`
  query($centreID: ID) {
    bacentaList(centreID: $centreID) {
      bacentaID
      name
      leader {
        firstName
        lastName
      }
      centre {
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

export const BACENTA_DROPDOWN = gql`
  query($bacentaName: String) {
    bacentaDropdown(bacentaName: $bacentaName, first: 8) {
      bacentaID
      name
      centre {
        campus {
          name
        }
        town {
          name
        }
      }
    }
  }
`

export const BISHOP_BACENTA_DROPDOWN = gql`
  query($bishopID: ID, $bacentaName: String) {
    bishopBacentaDropdown(
      bishopID: $bishopID
      bacentaName: $bacentaName
      first: 8
    ) {
      bacentaID
      name
      centre {
        campus {
          name
        }
        town {
          name
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
    }
  }
`

export const GET_CENTRES = gql`
  query($townID: ID, $campusID: ID) {
    centreList(townID: $townID, campusID: $campusID) {
      centreID
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
  query($bishopID: ID) {
    townSontaLeader(bishopID: $bishopID) {
      memberID
      firstName
      lastName
      leadsSonta {
        ministry {
          name
        }
        name
        town {
          name
        }
      }
    }
  }
`

export const GET_CAMPUSES = gql`
  query($bishopID: ID) {
    campusList(bishopID: $bishopID) {
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
      bishop {
        memberID
        firstName
        lastName
      }
    }
  }
`

export const GET_TOWNS = gql`
  query($bishopID: ID) {
    townList(bishopID: $bishopID) {
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
      bishop {
        memberID
        firstName
        lastName
      }
    }
  }
`

export const GET_BISHOPS = gql`
  query {
    bishopsList {
      memberID
      firstName
      lastName
      pictureUrl
      townBishop {
        name
      }
      campusBishop {
        name
      }
    }
    bishopsListCampus {
      memberID
      firstName
      lastName
    }
    bishopsListTown {
      memberID
      firstName
      lastName
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

export const BACENTA_LIST = gql`
  query($centreID: ID) {
    bacentaList(centreID: $centreID) {
      bacentaID
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
