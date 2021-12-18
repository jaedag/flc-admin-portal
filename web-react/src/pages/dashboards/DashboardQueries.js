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
        fellowship {
          id
          bacenta {
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
    bishopBacentaCount(id: $id)
    bishopFellowshipCount(id: $id)
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
      isAdminForCouncil {
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

export const FELLOWSHIP_LEADER_DASHBOARD = gql`
  query fellowshipLeaderDashboard($fellowshipId: ID!) {
    fellowships(where: { id: $fellowshipId }) {
      id
      name
      leader {
        id
        firstName
        lastName
        fullName
      }
      serviceLogs {
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
    fellowshipMemberCount(id: $fellowshipId)
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
      leadsFellowship {
        id
        name
        stream_name
        memberCount

        services(limit: 4) {
          created_at
          attendance
          income
          week
          serviceDate {
            date
          }
        }
      }
      leadsBacenta {
        id
        name
        stream_name
        memberCount

        services(limit: 4) {
          created_at
          attendance
          income
          week
          serviceDate {
            date
          }
        }

        fellowshipServiceAggregate {
          week
          attendance
          income
        }
      }
    }
  }
`

export const SERVANTS_LEADERSHIP = gql`
  query servantIsLeader($id: ID!) {
    members(where: { id: $id }) {
      id
      firstName
      lastName
      fullName
      pictureUrl

      # The person leads in the Fellowship side

      leadsTown {
        id
        name
        stream_name
        memberCount
        leader {
          id
          firstName
          lastName
          fullName
        }
        services(limit: 4) {
          created_at
          attendance
          income
          week
          serviceDate {
            date
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
        stream_name
        memberCount
        leader {
          id
          firstName
          lastName
          fullName
        }
        services(limit: 4) {
          created_at
          attendance
          income
          week
          serviceDate {
            date
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
        stream_name
      }
      leadsMinistry {
        id
      }
    }
  }
`

export const SERVANTS_ADMIN = gql`
  query servantIsAdmin($id: ID!) {
    members(where: { id: $id }) {
      id

      # The person is an admin
      isAdminForTown {
        id
        name
        stream_name
        memberCount
        leader {
          id
          firstName
          lastName
          fullName
        }
        services(limit: 4) {
          created_at
          attendance
          income
          week
          serviceDate {
            date
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
        stream_name
        memberCount
        leader {
          id
          firstName
          lastName
          fullName
        }
        services(limit: 4) {
          id
          created_at
          attendance
          income
          week
          serviceDate {
            date
          }
        }

        componentServiceAggregate {
          week
          attendance
          income
        }
      }
      isAdminForCouncil {
        id
        name
        stream_name
        memberCount
        leader {
          id
          firstName
          lastName
          fullName
        }
        services(limit: 4) {
          created_at
          attendance
          income
          week
          serviceDate {
            date
          }
        }

        componentServiceAggregate {
          week
          attendance
          income
        }
      }
      isAdminForGatheringService {
        id
        name
        leader {
          id
          firstName
          lastName
          fullName
        }
        services(limit: 4) {
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
  }
`

export const SERVANT_CHURCHES_COUNT = gql`
  query churchesLed($id: ID!) {
    members(where: { id: $id }) {
      id
      memberCount
      basontaMembershipCount
      leadsFellowshipCount
      leadsBacentaCount
      leadsConstituencyCount
      leadsCouncilCount
    }
  }
`
