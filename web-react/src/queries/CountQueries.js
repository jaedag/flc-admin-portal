import { gql } from '@apollo/client'

export const members = gql`
  {
    memberCount
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
  query townMemberCount($townID: ID) {
    townMemberCount(townID: $townID)
  }
`

export const BISHOP_MEMBER_COUNT = gql`
  query bishopMemberCount($bishopID: ID) {
    bishopMemberCount(bishopID: $bishopID)
  }
`

export const BISHOP_TSONTA_MEMBER_COUNT = gql`
  query bishopTSontaMemberCount($bishopID: ID) {
    bishopTSontaMemberCount(bishopID: $bishopID)
  }
`
export const BISHOP_SONTA_MEMBER_COUNT = gql`
  query bishopSontaMemberCount($bishopID: ID) {
    bishopSontaMemberCount(bishopID: $bishopID)
  }
`

export const BISHOP_PASTOR_COUNT = gql`
  query bishopPastorCount($bishopID: ID) {
    bishopPastorCount(bishopID: $bishopID)
  }
`

export const BISHOP_CAMPUSTOWN_COUNT = gql`
  query bishopCampusTownCount($bishopID: ID) {
    bishopsCampusTownCount(bishopID: $bishopID)
  }
`
