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
    # federalMemberSearch(searchKey: $searchKey) {
    #   id
    #   firstName
    #   lastName
    #   pictureUrl
    #   bacenta {
    #     id
    #     name
    #     leader {
    #       id
    #       firstName
    #       lastName
    #     }
    #     centre {
    #       id
    #       town {
    #         id
    #         bishop {
    #           id
    #         }
    #       }
    #       campus {
    #         id
    #         bishop {
    #           id
    #         }
    #       }
    #     }
    #   }
    #   ministry {
    #     id
    #     name
    #   }
    #   leadsCampus {
    #     id
    #     name
    #     bishop {
    #       id
    #     }
    #   }
    #   leadsTown {
    #     id
    #     name
    #     bishop {
    #       id
    #     }
    #   }
    #   townBishop {
    #     id
    #     name
    #   }
    #   campusBishop {
    #     id
    #     name
    #   }
    # }
  }
`

export const BISHOP_SEARCH = gql`
  query bishopSearch($searchKey: String, $bishopId: ID) {
    bishopSontaSearch(searchKey: $searchKey, bishopId: $bishopId) {
      id
      name
    }
    bishopTownSearch(searchKey: $searchKey, bishopId: $bishopId) {
      id
      name
    }
    bishopCampusSearch(searchKey: $searchKey, bishopId: $bishopId) {
      id
      name
    }
    bishopCentreSearch(searchKey: $searchKey, bishopId: $bishopId) {
      id
      name
    }
    bishopBacentaSearch(searchKey: $searchKey, bishopId: $bishopId) {
      id
      name
    }
    bishopMemberSearch(searchKey: $searchKey, bishopId: $bishopId) {
      id
      firstName
      lastName
      fullName
      pictureUrl
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
    }
  }
`

export const FEDERAL_NEO_SEARCH = gql`
  query federalSearch($searchKey: String) {
    sontas(
      where: {
        OR: [{ name_STARTS_WITH: $searchKey }, { name_CONTAINS: $searchKey }]
      }
    ) {
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
    towns(
      where: {
        OR: [{ name_STARTS_WITH: $searchKey }, { name_CONTAINS: $searchKey }]
      }
    ) {
      id
      name
      bishop {
        id
      }
    }
    campuses(
      where: {
        OR: [{ name_STARTS_WITH: $searchKey }, { name_CONTAINS: $searchKey }]
      }
    ) {
      id
      name
      bishop {
        id
      }
    }
    centres(
      where: {
        OR: [{ name_STARTS_WITH: $searchKey }, { name_CONTAINS: $searchKey }]
      }
    ) {
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
    bacentas(
      where: {
        OR: [{ name_STARTS_WITH: $searchKey }, { name_CONTAINS: $searchKey }]
      }
    ) {
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
    members(
      where: {
        OR: [
          { firstName_STARTS_WITH: $searchKey }
          { firstName_CONTAINS: $searchKey }
          { lastName_CONTAINS: $searchKey }
          { lastName_CONTAINS: $searchKey }
        ]
      }
    ) {
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
