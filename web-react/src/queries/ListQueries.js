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

export const GET_FELLOWSHIP_LEADERS = gql`
  {
    townList(firstName: $firstName, lastName: $lastName) {
      id
      bacentas {
        id
        fellowships {
          id
          fellowshipLeader {
            id
            firstName
            lastName
          }
        }
      }
    }
  }
`

export const FELLOWSHIP_DROPDOWN = gql`
  query ($fellowshipName: String) {
    fellowshipDropdown(fellowshipName: $fellowshipName, first: 8) {
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

export const COUNCIL_MEMBER_DROPDOWN = gql`
  query ($id: ID!, $nameSearch: String!) {
    councilMemberDropdown(id: $id, nameSearch: $nameSearch) {
      id
      firstName
      lastName
    }
  }
`

export const BACENTA_DROPDOWN = gql`
  query ($bacentaName: String) {
    bacentaDropdown(bacentaName: $bacentaName, first: 8) {
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

export const GET_TOWN_BACENTAS = gql`
  query ($id: ID) {
    towns(where: { id: $id }) {
      id
      name
      stream_name
      council {
        id
      }
      leader {
        firstName
        lastName
      }
      memberCount
      sontas {
        id
        name
        leader {
          id
          firstName
          lastName
        }
      }
      bacentas {
        id
        name
        stream_name
        council {
          id
        }
        leader {
          id
          firstName
          lastName
        }
      }
    }
  }
`

export const GET_CAMPUS_BACENTAS = gql`
  query ($id: ID) {
    campuses(where: { id: $id }) {
      id
      name
      stream_name
      council {
        id
      }
      leader {
        firstName
        lastName
      }
      memberCount
      sontas {
        id
        name
        leader {
          id
          firstName
          lastName
        }
      }
      bacentas {
        id
        name
        stream_name
        council {
          id
        }
        leader {
          id
          firstName
          lastName
        }
      }
    }
  }
`

export const GET_SONTAS_BY_CAMPUSTOWN = gql`
  query ($id: ID) {
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
  query ($id: ID) {
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
        stream_name
      }
      campuses {
        name
        id
        stream_name
        leader {
          id
          firstName
          lastName
          stream_name
        }
        admin {
          id
          firstName
          lastName
          stream_name
        }
        sontas {
          id
          name
        }
        bacentas {
          id
          name
        }
      }
    }
  }
`

export const GET_COUNCIL_TOWNS = gql`
  query ($id: ID) {
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
        stream_name
      }
      towns {
        name
        id
        stream_name
        leader {
          id
          firstName
          lastName
          stream_name
        }
        admin {
          id
          firstName
          lastName
          stream_name
        }
        sontas {
          id
          name
        }
        bacentas {
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

export const GET_BACENTA_FELLOWSHIPS = gql`
  query ($id: ID) {
    bacentas(where: { id: $id }) {
      id
      memberCount
      fellowships {
        id
        name
        leader {
          id
          firstName
          lastName
        }
        bacenta {
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
  query ($searchKey: String!) {
    occupationList(searchKey: $searchKey, first: 5) {
      occupation
    }
  }
`
