import { gql } from '@apollo/client'

export const BISH_DASHBOARD_COUNTS = gql`
  query bishDashboardData($id: ID) {
    members(where: { id: $id }) {
      id
      firstName
      lastName
      pictureUrl
      admin {
        id
        firstName
        lastName
        bacenta {
          id
          centre {
            id
            town {
              id
              name
              bishop {
                id
              }
            }
            campus {
              name
              bishop {
                id
              }
            }
          }
        }
      }
    }
    bishopMemberCount(id: $id)
    bishopPastorCount(id: $id)
    bishopCampusTownCount(id: $id)
    bishopCentreCount(id: $id)
    bishopBacentaCount(id: $id)
    bishopSontaMemberCount(id: $id)
  }
`
export const MAKE_BISHOP_ADMIN = gql`
  mutation MakeBishopAdmin($bishopId: ID!, $newAdminId: ID!, $oldAdminId: ID!) {
    RemoveBishopAdmin(bishopId: $bishopId, adminId: $oldAdminId) {
      id
      firstName
      lastName
    }
    MakeBishopAdmin(bishopId: $bishopId, adminId: $newAdminId) {
      id
      firstName
      lastName
      isAdminForBishop {
        id
        admin {
          id
          firstName
          lastName
        }
      }
    }
  }
`

export const BACENTA_LEADER_DASHBOARD = gql`
  query bacentaLeaderDashboard($bacentaId: ID!) {
    bacentas(where: { id: $bacentaId }) {
      id
      name
      leader {
        id
        firstName
        lastName
        fullName
      }
      services {
        id
        historyRecord
        serviceRecords {
          created_at
          attendance
          income
          serviceDate {
            date
          }
        }
      }
    }
    bacentaMemberCount(id: $bacentaId)
  }
`

export const SERVANTS_DASHBOARD = gql`
  query servantsDashboard($id: ID!) {
    members(where: { id: $id }) {
      id
      firstName
      lastName
      fullName
      pictureUrl

      # The person is an admin
      isAdminForTown {
        id
        name
        leader {
          id
        }
        services {
          id
          historyRecord
          serviceRecords {
            created_at
            attendance
            income
            week
            serviceDate {
              date
            }
          }
        }
        componentServiceAggregate {
          week
          attendance
          income
        }
      }
      isAdminForCampus {
        id
        name
        leader {
          id
          firstName
          lastName
          fullName
        }
        services {
          id
          historyRecord
          serviceRecords {
            created_at
            attendance
            income
            week
            serviceDate {
              date
            }
          }
        }
        componentServiceAggregate {
          week
          attendance
          income
        }
      }
      isAdminForBishop {
        id
        firstName
        lastName
        fullName
      }

      isBishopForCampus {
        id
        name
      }
      isBishopForTown {
        id
        name
      }

      # The person leads in the Bacenta side
      leadsBacenta {
        id
        name
        services {
          id
          historyRecord
          serviceRecords {
            created_at
            attendance
            income
            week
            serviceDate {
              date
            }
          }
        }
      }
      leadsCentre {
        id
        name
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
        memberCount
        services {
          id
          historyRecord
          serviceRecords {
            created_at
            attendance
            income
            week
            serviceDate {
              date
            }
          }
        }
        bacentaServiceAggregate {
          week
          attendance
          income
        }
      }
      leadsTown {
        id
        name
        leader {
          id
          firstName
          lastName
          fullName
        }
        services {
          id
          historyRecord
          serviceRecords {
            created_at
            attendance
            income
            week
            serviceDate {
              date
            }
          }
        }
        componentServiceAggregate {
          week
          attendance
          income
        }
      }
      leadsCampus {
        id
        name
        leader {
          id
          firstName
          lastName
          fullName
        }
        services {
          id
          historyRecord
          serviceRecords {
            created_at
            attendance
            income
            week
            serviceDate {
              date
            }
          }
        }
        componentServiceAggregate {
          week
          attendance
          income
        }
      }
      leadsSonta {
        id
        name
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
        services {
          id
          historyRecord
          serviceRecords {
            created_at
            attendance
            week
            serviceDate {
              date
            }
          }
        }
      }
      leadsMinistry {
        id
      }
    }
  }
`

export const SERVANT_CHURCHES_COUNT = gql`
  query churchesLed($id: ID!) {
    members(where: { id: $id }) {
      id
      membershipCount
      basontaMembershipCount
    }
    leadsBacentaCount(id: $id)
    leadsCentreCount(id: $id)
    leadsConstituencyCount(id: $id)
    bishopConstituencyCount(id: $id)
  }
`
