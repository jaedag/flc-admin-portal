import { gql } from '@apollo/client'

export const BISH_DASHBOARD_COUNTS = gql`
  query bishDashboardData($id: ID) {
    members(where: { id: $id }) {
      id
      firstName
      lastName
      hasAdmin {
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
  mutation($bishopId: ID!, $adminId: ID!) {
    MakeBishopAdmin(bishopId: $bishopId, adminId: $adminId) {
      id
    }
  }
`

export const REMOVE_BISHOP_ADMIN = gql`
  mutation($bishopId: ID!, $adminId: ID!) {
    RemoveBishopAdmin(adminId: $adminId, bishopId: $bishopId) {
      id
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
      # The person is an admin
      isTownAdminFor {
        id
      }
      isCampusAdminFor {
        id
      }
      isBishopAdminFor {
        id
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
            serviceDate {
              date
            }
          }
        }
      }
      leadsCentre {
        id
      }
      leadsTown {
        id
      }
      leadsCampus {
        id
      }
      leadsSonta {
        id
      }
      leadsMinistry {
        id
      }
    }
  }
`
