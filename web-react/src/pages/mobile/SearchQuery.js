import { gql } from '@apollo/client'

export const GLOBAL_SEARCH = gql`
  query globalSearch($searchKey: String!) {
    globalSontaSearch(searchKey: $searchKey) {
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
    globalTownSearch(searchKey: $searchKey) {
      id
      name
      bishop {
        id
      }
    }
    globalCampusSearch(searchKey: $searchKey) {
      id
      name
      bishop {
        id
      }
    }
    globalCentreSearch(searchKey: $searchKey) {
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
    globalBacentaSearch(searchKey: $searchKey) {
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
    # globalMemberSearch(searchKey: $searchKey) {
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

export const GLOBAL_NEO_SEARCH = gql`
  query globalSearch($searchKey: String!) {
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
