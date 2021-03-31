import { gql } from '@apollo/client'

export const GET_LOGGED_IN_USER = gql`
  query memberByEmail($email: String) {
    memberByEmail(email: $email) {
      id
      firstName
      lastName
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
    globalBacentaSearch(searchKey: $searchKey, first: 6) {
      id
      name
      centre {
        town {
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
    }

    globalMemberSearch(searchKey: $searchKey, first: 6) {
      id
      firstName
      lastName
      pictureUrl
      bacenta {
        name
        leader {
          firstName
          lastName
        }
        centre {
          town {
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
      }
      ministry {
        name
      }
      leadsCampus {
        name
        bishop {
          id
        }
      }
      leadsTown {
        name
        bishop {
          id
        }
      }
      townBishop {
        name
      }
      campusBishop {
        name
      }
    }
  }
`
