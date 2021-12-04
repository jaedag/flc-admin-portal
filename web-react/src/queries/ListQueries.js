import { gql } from '@apollo/client'

export const ALL_MEMBERS = gql`
  {
    members(options: { limit: 50 }) {
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
      id
      centres {
        id
        bacentas {
          id
          bacentaLeader {
            id
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

export const COUNCIL_MEMBER_DROPDOWN = gql`
  query($id: ID!, $nameSearch: String!) {
    councilMemberDropdown(id: $id, nameSearch: $nameSearch) {
      id
      firstName
      lastName
    }
  }
`

export const CENTRE_DROPDOWN = gql`
  query($centreName: String) {
    centreDropdown(centreName: $centreName, first: 8) {
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

export const GET_TOWN_CENTRES = gql`
  query($id: ID) {
    centres(where: { town: { id: $id } }) {
      id
      name
      stream
      leader {
        firstName
        lastName
      }
      town {
        id
        name
        memberCount
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
        }
      }
    }
    sontas(where: { town: { id: $id } }) {
      id
      name
      leader {
        id
        firstName
        lastName
      }
    }
  }
`

export const GET_CAMPUS_CENTRES = gql`
  query($id: ID) {
    centres(where: { campus: { id: $id } }) {
      id
      name
      stream
      campus {
        id
        name
        memberCount
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
        }
      }
      leader {
        firstName
        lastName
      }
    }
    sontas(where: { campus: { id: $id } }) {
      id
      name
      leader {
        id
        firstName
        lastName
      }
    }
  }
`

export const GET_SONTAS_BY_CAMPUSTOWN = gql`
  query($id: ID) {
    towns(where: { bishop: { id: $id } }) {
      id
      name
      bishop {
        id
        firstName
        lastName
      }
      sontas {
        id
        name
        leader {
          id
          firstName
          lastName
        }
      }
    }
    bishopSontaMemberCount(id: $id)
    campuses(where: { bishop: { id: $id } }) {
      id
      name
      bishop {
        id
        firstName
        lastName
      }
      sontas {
        id
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

export const GET_COUNCIL_CAMPUSES = gql`
  query($id: ID) {
    councils(where: { id: $id }) {
      id
      name
      leader {
        id
        firstName
        lastName
        fullName
      }
      memberCount
      admin {
        id
        firstName
        lastName
        stream
      }
      campuses {
        name
        id
        leader {
          id
          firstName
          lastName
          stream
        }
        admin {
          id
          firstName
          lastName
          stream
        }
        sontas {
          id
          name
        }
        centres {
          id
          name
        }
      }
    }
  }
`

export const GET_COUNCIL_TOWNS = gql`
  query($id: ID) {
    councils(where: { id: $id }) {
      id
      name
      leader {
        id
        firstName
        lastName
        fullName
      }
      memberCount
      admin {
        id
        firstName
        lastName
        stream
      }
      towns {
        name
        id
        leader {
          id
          firstName
          lastName
          stream
        }
        admin {
          id
          firstName
          lastName
          stream
        }
        sontas {
          id
          name
        }
        centres {
          id
          name
        }
      }
    }
  }
`

export const GET_COUNCILS = gql`
  {
    councils {
      id
      name
      towns {
        id
      }
      campuses {
        id
      }
    }
  }
`

export const GET_MINISTRIES = gql`
  query {
    ministries {
      id
      name
    }
  }
`

export const GET_CENTRE_BACENTAS = gql`
  query($id: ID) {
    centres(where: { id: $id }) {
      id
      memberCount
      bacentas {
        id
        name
        leader {
          id
          firstName
          lastName
        }
        centre {
          id
          name
          leader {
            id
            firstName
            lastName
            fullName
          }
          town {
            id
            bishop {
              id
            }
          }
          campus {
            id
            bishop {
              id
            }
          }
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
