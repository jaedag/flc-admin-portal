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

export const pastors = gql`
  {
    pastorCount
  }
`

export const centreCount = gql`
  {
    centreCount
  }
`

export const sontaCount = gql`
  {
    sontaCount
  }
`
export const TOWN_MEMBER_COUNT = gql`
  query townMemberCount($id: ID) {
    townMemberCount(id: $id)
  }
`

export const BISHOP_MEMBER_COUNT = gql`
  query bishopMemberCount($id: ID) {
    bishopMemberCount(id: $id)
  }
`

export const BISHOP_TSONTA_MEMBER_COUNT = gql`
  query bishopTSontaMemberCount($id: ID) {
    bishopTSontaMemberCount(id: $id)
  }
`
export const BISHOP_SONTA_MEMBER_COUNT = gql`
  query bishopSontaMemberCount($id: ID) {
    bishopSontaMemberCount(id: $id)
  }
`

export const BISHOP_PASTOR_COUNT = gql`
  query bishopPastorCount($id: ID) {
    bishopPastorCount(id: $id)
  }
`

export const BISHOP_CAMPUSTOWN_COUNT = gql`
  query bishopCampusTownCount($id: ID) {
    bishopsCampusTownCount(id: $id)
  }
`
