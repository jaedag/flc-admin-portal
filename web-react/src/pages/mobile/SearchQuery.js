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
    federalBacentaSearch(searchKey: $searchKey) {
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
    federalFellowshipSearch(searchKey: $searchKey) {
      id
      name
      bacenta {
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
      fellowship {
        id
        name
        leader {
          id
          firstName
          lastName
        }
        bacenta {
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
    councilFellowshipSearch(searchKey: $searchKey, councilId: $councilId) {
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
      fellowship {
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
    constituencyBacentaSearch(
      searchKey: $searchKey
      constituencyId: $constituencyId
    ) {
      id
      name
    }
    constituencyFellowshipSearch(
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
      fellowship {
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
    bacentaFellowshipSearch(searchKey: $searchKey, bacentaId: $bacentaId) {
      id
      name
    }
    bacentaMemberSearch(searchKey: $searchKey, bacentaId: $bacentaId) {
      id
      firstName
      lastName
      fullName
      pictureUrl
      stream
      fellowship {
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

export const FELLOWSHIP_SEARCH = gql`
  query fellowshipSearch($searchKey: String, $fellowshipId: ID) {
    fellowshipMemberSearch(searchKey: $searchKey, fellowshipId: $fellowshipId) {
      id
      firstName
      lastName
      fullName
      pictureUrl
      stream
      fellowship {
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
