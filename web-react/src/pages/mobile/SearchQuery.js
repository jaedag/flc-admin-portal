import { gql } from '@apollo/client'

export const FEDERAL_SEARCH = gql`
  query federalSearch($searchKey: String) {
    federalSontaSearch(searchKey: $searchKey) {
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
    federalTownSearch(searchKey: $searchKey) {
      id
      name
      bishop {
        id
      }
    }
    federalCampusSearch(searchKey: $searchKey) {
      id
      name
      bishop {
        id
      }
    }
    federalCentreSearch(searchKey: $searchKey) {
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
    federalBacentaSearch(searchKey: $searchKey) {
      id
      name
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
    federalMemberSearch(searchKey: $searchKey) {
      id
      firstName
      lastName
      pictureUrl
      stream
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
    }
  }
`

export const COUNCIL_SEARCH = gql`
  query councilSearch($searchKey: String, $councilId: ID) {
    councilSontaSearch(searchKey: $searchKey, councilId: $councilId) {
      id
      name
    }
    councilTownSearch(searchKey: $searchKey, councilId: $councilId) {
      id
      name
      leader {
        id
        firstName
        lastName
        fullName
      }
    }
    councilCampusSearch(searchKey: $searchKey, councilId: $councilId) {
      id
      name
      leader {
        id
        firstName
        lastName
        fullName
      }
    }
    councilCentreSearch(searchKey: $searchKey, councilId: $councilId) {
      id
      name
      leader {
        id
        firstName
        lastName
        fullName
      }
    }
    councilBacentaSearch(searchKey: $searchKey, councilId: $councilId) {
      id
      name
      leader {
        id
        firstName
        lastName
        fullName
      }
    }
    councilMemberSearch(searchKey: $searchKey, councilId: $councilId) {
      id
      firstName
      lastName
      fullName
      pictureUrl
      stream
      bacenta {
        id
        name
      }
      ministry {
        id
        name
      }
    }
  }
`

export const CONSTITUENCY_SEARCH = gql`
  query constituencySearch($searchKey: String, $constituencyId: ID) {
    constituencySontaSearch(
      searchKey: $searchKey
      constituencyId: $constituencyId
    ) {
      id
      name
    }
    constituencyCentreSearch(
      searchKey: $searchKey
      constituencyId: $constituencyId
    ) {
      id
      name
    }
    constituencyBacentaSearch(
      searchKey: $searchKey
      constituencyId: $constituencyId
    ) {
      id
      name
    }
    constituencyMemberSearch(
      searchKey: $searchKey
      constituencyId: $constituencyId
    ) {
      id
      firstName
      lastName
      fullName
      pictureUrl
      stream
      bacenta {
        id
        name
      }
      ministry {
        id
        name
      }
    }
  }
`

export const CENTRE_SEARCH = gql`
  query centreSearch($searchKey: String, $centreId: ID) {
    centreBacentaSearch(searchKey: $searchKey, centreId: $centreId) {
      id
      name
    }
    centreMemberSearch(searchKey: $searchKey, centreId: $centreId) {
      id
      firstName
      lastName
      fullName
      pictureUrl
      stream
      bacenta {
        id
        name
      }
      ministry {
        id
        name
      }
    }
  }
`

export const BACENTA_SEARCH = gql`
  query bacentaSearch($searchKey: String, $bacentaId: ID) {
    bacentaMemberSearch(searchKey: $searchKey, bacentaId: $bacentaId) {
      id
      firstName
      lastName
      fullName
      pictureUrl
      stream
      bacenta {
        id
        name
      }
      ministry {
        id
        name
      }
    }
  }
`
