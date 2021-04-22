import { gql } from '@apollo/client'

export const GET_LOGGED_IN_USER = gql`
  query memberByEmail($email: String) {
    memberByEmail(email: $email) {
      id
      firstName
      lastName
      pictureUrl
      bacenta {
        centre {
          campus {
            id
            bishop {
              id
            }
          }
          town {
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

export const GLOBAL_SEARCH = gql`
  query globalSearch($searchKey: String!) {
    globalSontaSearch(searchKey: $searchKey, first: 6) {
      id
      name
      town {
        id
        bishop {
          id
        }
      }
      campus {
        bishop {
          id
        }
      }
    }
    globalTownSearch(searchKey: $searchKey, first: 6) {
      id
      name
      bishop {
        id
      }
    }
    globalCampusSearch(searchKey: $searchKey, first: 6) {
      id
      name
      bishop {
        id
      }
    }
    globalCentreSearch(searchKey: $searchKey, first: 6) {
      id
      name
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
    globalBacentaSearch(searchKey: $searchKey, first: 6) {
      id
      name
      centre {
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

    globalMemberSearch(searchKey: $searchKey, first: 6) {
      id
      firstName
      lastName
      pictureUrl
      bacenta {
        id
        name
        leader {
          id
          firstName
          lastName
        }
        centre {
          id
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
      ministry {
        id
        name
      }
      leadsCampus {
        id
        name
        bishop {
          id
        }
      }
      leadsTown {
        id
        name
        bishop {
          id
        }
      }
      townBishop {
        id
        name
      }
      campusBishop {
        id
        name
      }
    }
  }
`
