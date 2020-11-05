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

export const communityCount = gql`
  {
    communityCount
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

export const APOSTLE_MEMBER_COUNT = gql`
  query apostleMemberCount($apostleID: ID) {
    apostleMemberCount(apostleID: $apostleID)
  }
`

export const APOSTLE_TSONTA_MEMBER_COUNT = gql`
  query apostleTSontaMemberCount($apostleID: ID) {
    apostleTSontaMemberCount(apostleID: $apostleID)
  }
`
export const APOSTLE_SONTA_MEMBER_COUNT = gql`
  query apostleSontaMemberCount($apostleID: ID) {
    apostleSontaMemberCount(apostleID: $apostleID)
  }
`

export const APOSTLE_PASTOR_COUNT = gql`
  query apostlePastorCount($apostleID: ID) {
    apostlePastorCount(apostleID: $apostleID)
  }
`

export const APOSTLE_TOWN_COUNT = gql`
  query apostleTownCount($apostleID: ID) {
    apostleTownCount(apostleID: $apostleID)
  }
`
