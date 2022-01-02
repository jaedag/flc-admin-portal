import { gql } from '@apollo/client'

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
      fullName
      pictureUrl

      # The person leads in the Fellowship side

      leadsConstituency {
        id
        name
        stream_name
        memberCount
        leader {
          id
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

      leadsCouncil {
        id
        name
        stream_name
        memberCount
        leader {
          id
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

      leadsGatheringService {
        id
        name

        memberCount
        leader {
          id
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
      isAdminForConstituency {
        id
        name
        stream_name
        memberCount
        leader {
          id
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
      isAdminForCouncil {
        id
        name
        stream_name
        memberCount
        leader {
          id
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
        memberCount
        leader {
          id
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
      leadsGatheringServiceCount
    }
  }
`
