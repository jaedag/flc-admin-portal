import { gql } from '@apollo/client'

export const GET_FEDERAL_MEMBERS = gql`
  query {
    Member(orderBy: firstName_asc) {
      id
      firstName
      lastName
      pictureUrl
      bacenta {
        name
      }
      ministry {
        name
      }
      maritalStatus {
        status
      }
      gender {
        gender
      }
      title {
        Title {
          title
        }
        status
        yearAppointed {
          year
        }
      }
      leadsBacenta {
        name
      }
      leadsCentre {
        name
      }
      leadsMinistry {
        name
      }
      leadsSonta {
        name
      }
      leadsBasonta {
        name
      }
      leadsTown {
        name
      }
      leadsCampus {
        name
      }
      townBishop {
        name
      }
      campusBishop {
        name
      }
    }
  }
`

export const GET_FEDERAL_PASTORS = gql`
  query {
    federalPastorList(orderBy: firstName_asc) {
      id
      firstName
      lastName
      pictureUrl
      bacenta {
        name
      }
      ministry {
        name
      }
      maritalStatus {
        status
      }
      gender {
        gender
      }
      title {
        Title {
          title
        }
        status
        yearAppointed {
          year
        }
      }
      leadsBacenta {
        name
      }
      leadsCentre {
        name
      }
      leadsMinistry {
        name
      }
      leadsSonta {
        name
      }
      leadsBasonta {
        name
      }
      leadsTown {
        name
      }
      leadsCampus {
        name
      }
      townBishop {
        name
      }
      campusBishop {
        name
      }
    }
  }
`

export const GET_BISHOP_MEMBERS = gql`
  query($id: ID) {
    bishopMemberList(id: $id, orderBy: firstName_asc) {
      id
      firstName
      lastName
      pictureUrl
      bacenta {
        name
      }
      ministry {
        name
      }
      maritalStatus {
        status
      }
      gender {
        gender
      }
      title {
        Title {
          title
        }
        status
        yearAppointed {
          year
        }
      }
      leadsBacenta {
        name
      }
      leadsCentre {
        name
      }
      leadsMinistry {
        name
      }
      leadsSonta {
        name
      }
      leadsBasonta {
        name
      }
      leadsTown {
        name
      }
      leadsCampus {
        name
      }
      townBishop {
        name
      }
      campusBishop {
        name
      }
    }
  }
`

export const GET_CAMPUSTOWN_MEMBERS = gql`
  query($id: ID) {
    townMemberList(id: $id, orderBy: firstName_asc) {
      id
      firstName
      lastName
      pictureUrl
      bacenta {
        name
      }
      ministry {
        name
      }
      maritalStatus {
        status
      }
      gender {
        gender
      }
      title {
        Title {
          title
        }
        status
        yearAppointed {
          year
        }
      }
      leadsBacenta {
        name
      }
      leadsCentre {
        name
      }
      leadsMinistry {
        name
      }
      leadsSonta {
        name
      }
      leadsBasonta {
        name
      }
      leadsTown {
        name
      }
      leadsCampus {
        name
      }
      townBishop {
        name
      }
      campusBishop {
        name
      }
    }
    campusMemberList(id: $id, orderBy: firstName_asc) {
      id
      firstName
      lastName
      pictureUrl
      bacenta {
        name
      }
      ministry {
        name
      }
      maritalStatus {
        status
      }
      gender {
        gender
      }
      title {
        Title {
          title
        }
        status
        yearAppointed {
          year
        }
      }
      leadsBacenta {
        name
      }
      leadsCentre {
        name
      }
      leadsMinistry {
        name
      }
      leadsSonta {
        name
      }
      leadsBasonta {
        name
      }
      leadsTown {
        name
      }
      leadsCampus {
        name
      }
      townBishop {
        name
      }
      campusBishop {
        name
      }
    }
  }
`

export const GET_CENTRE_MEMBERS = gql`
  query($id: ID) {
    centreMemberList(id: $id, orderBy: firstName_asc) {
      id
      firstName
      lastName
      pictureUrl
      bacenta {
        name
      }
      ministry {
        name
      }
      maritalStatus {
        status
      }
      gender {
        gender
      }
      title {
        Title {
          title
        }
        status
        yearAppointed {
          year
        }
      }
      leadsBacenta {
        name
      }
      leadsCentre {
        name
      }
      leadsMinistry {
        name
      }
      leadsSonta {
        name
      }
      leadsBasonta {
        name
      }
      leadsTown {
        name
      }
      leadsCampus {
        name
      }
      townBishop {
        name
      }
      campusBishop {
        name
      }
    }
  }
`

export const GET_BACENTA_MEMBERS = gql`
  query($id: ID) {
    bacentaMemberList(id: $id, orderBy: firstName_asc) {
      id
      firstName
      lastName
      pictureUrl
      bacenta {
        name
      }
      ministry {
        name
      }
      maritalStatus {
        status
      }
      gender {
        gender
      }
      title {
        Title {
          title
        }
        status
        yearAppointed {
          year
        }
      }
      leadsBacenta {
        name
      }
      leadsCentre {
        name
      }
      leadsMinistry {
        name
      }
      leadsSonta {
        name
      }
      leadsBasonta {
        name
      }
      leadsTown {
        name
      }
      leadsCampus {
        name
      }
      townBishop {
        name
      }
      campusBishop {
        name
      }
    }
  }
`

export const GET_SONTA_MEMBERS = gql`
  query($id: ID) {
    sontaMemberList(id: $id, orderBy: firstName_asc) {
      id
      firstName
      lastName
      pictureUrl
      bacenta {
        name
      }
      ministry {
        name
      }
      maritalStatus {
        status
      }
      gender {
        gender
      }
      title {
        Title {
          title
        }
        status
        yearAppointed {
          year
        }
      }
      leadsBacenta {
        name
      }
      leadsCentre {
        name
      }
      leadsMinistry {
        name
      }
      leadsSonta {
        name
      }
      leadsBasonta {
        name
      }
      leadsTown {
        name
      }
      leadsCampus {
        name
      }
      townBishop {
        name
      }
      campusBishop {
        name
      }
    }
  }
`
