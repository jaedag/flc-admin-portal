import { gql } from '@apollo/client'

export const ALL_MEMBERS = gql`
  {
    Member(first: 50) {
      id
      firstName
      lastName
      pictureUrl
    }
  }
`

export const GET_BISHOP_MEMBERS = gql`
  query($id: ID, $offset: Int) {
    bishopMemberList(id: $id, offset: $offset, first: 24) {
      id
      firstName
      lastName
      pictureUrl
      bacenta {
        name
      }
      ministry {
        name
      }
    }
  }
`

export const GET_BISHOP_PASTORS = gql`
  query($id: ID) {
    bishopPastorList(id: $id, first: 60) {
      id
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

export const BACENTA_DROPDOWN = gql`
  query($bacentaName: String) {
    bacentaDropdown(bacentaName: $bacentaName, first: 8) {
      id
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
  query($id: ID, $bacentaName: String) {
    bishopBacentaDropdown(id: $id, bacentaName: $bacentaName, first: 8) {
      id
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
      id
      name
    }
  }
`

export const GET_TOWN_CENTRES = gql`
  query($id: ID) {
    townCentreList(id: $id) {
      id
      name
      town {
        name
        leader {
          id
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
    townSontaList(id: $id) {
      id
      name
      leader {
        firstName
        lastName
      }
    }
    townMemberCount(id: $id)
  }
`

export const GET_CAMPUS_CENTRES = gql`
  query($id: ID) {
    campusCentreList(id: $id) {
      id
      name
      campus {
        name
        leader {
          id
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
    campusSontaList(id: $id) {
      id
      name
      leader {
        firstName
        lastName
      }
    }
    campusMemberCount(id: $id)
  }
`

export const GET_CENTRE_BACENTAS = gql`
  query($centreId: ID) {
    townSontaLeader(centreId: $centreId) {
      id
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

export const GET_SONTAS_BY_CAMPUSTOWN = gql`
  query($id: ID) {
    townList(id: $id) {
      id
      name
      bishop {
        firstName
        lastName
      }
      sontas {
        id
        name
        leader {
          firstName
          lastName
        }
      }
    }
    campusList(id: $id) {
      id
      name
      bishop {
        firstName
        lastName
      }
      sontas {
        id
        name
        leader {
          firstName
          lastName
        }
      }
    }
  }
`

export const GET_CAMPUSES = gql`
  query($id: ID) {
    campusList(id: $id) {
      name
      id
      leader {
        id
        firstName
        lastName
      }
      sontas {
        id
        name
      }
      bishop {
        id
        firstName
        lastName
      }
    }
  }
`

export const GET_TOWNS = gql`
  query($id: ID) {
    townList(id: $id) {
      name
      id
      leader {
        id
        firstName
        lastName
      }
      sontas {
        id
        name
      }
      bishop {
        id
        firstName
        lastName
      }
    }
  }
`

export const GET_BISHOPS = gql`
  query {
    bishopsList {
      id
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
      id
      firstName
      lastName
    }
    bishopsListTown {
      id
      firstName
      lastName
    }
  }
`

export const MINISTRY_LIST = gql`
  query {
    ministryList {
      id
      name
    }
  }
`

export const CENTRE_BACENTA_LIST = gql`
  query($id: ID) {
    centreBacentaList(id: $id) {
      id
      name
      leader {
        firstName
        lastName
      }
      centre {
        name
        leader {
          id
          firstName
          lastName
        }
      }
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
