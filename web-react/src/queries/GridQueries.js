import { gql } from '@apollo/client'

export const GET_FEDERAL_MEMBERS = gql`
  query {
    members(options: { sort: { firstName: ASC } }) {
      id
      firstName
      lastName
      pictureUrl
      bacenta {
        id
        name
      }
      ministry {
        id
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
        id
        name
      }
      isBishopAdminFor {
        id
        firstName
        lastName
      }
      isCampusAdminFor {
        id
        name
      }
      isTownAdminFor {
        id
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
        id
        name
      }
      ministry {
        id
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
        id
        name
      }
      leadsCentre {
        id
        name
      }
      leadsMinistry {
        id
        name
      }
      leadsSonta {
        id
        name
      }
      leadsBasonta {
        id
        name
      }
      leadsTown {
        id
        name
      }
      leadsCampus {
        id
        name
      }
      townBishop {
        id
        name
      }
      campusBishop {
        id
        name
      }
      isBishopAdminFor {
        id
        firstName
        lastName
      }
      isCampusAdminFor {
        id
        name
      }
      isTownAdminFor {
        id
        name
      }
    }
  }
`

export const GET_BISHOP_MEMBERS = gql`
  query($id: ID) {
    members(where: { id: $id }) {
      id
      firstName
      lastName
      fullName
    }
    bishopMemberList(id: $id) {
      id
      firstName
      lastName
      pictureUrl
      bacenta {
        id
        name
      }
      ministry {
        id
        name
      }
      maritalStatus {
        status
      }
      gender {
        gender
      }
      title {
        title
      }
      leadsBacenta {
        id
        name
      }
      leadsCentre {
        id
        name
      }
      leadsMinistry {
        id
        name
      }
      leadsSonta {
        id
        name
      }
      leadsBasonta {
        id
        name
      }
      leadsTown {
        id
        name
      }
      leadsCampus {
        id
        name
      }
      townBishop {
        id
        name
      }
      campusBishop {
        id
        name
      }
      isBishopAdminFor {
        id
        firstName
        lastName
      }
      isCampusAdminFor {
        id
        name
      }
      isTownAdminFor {
        id
        name
      }
    }
  }
`

export const GET_CAMPUSTOWN_MEMBERS = gql`
  query($id: ID) {
    towns(where: { id: $id }) {
      id
      name
    }
    townMemberList(id: $id) {
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
        title
      }
      leadsBacenta {
        id
        name
      }
      leadsCentre {
        id
        name
      }
      leadsMinistry {
        id
        name
      }
      leadsSonta {
        id
        name
      }
      leadsBasonta {
        id
        name
      }
      leadsTown {
        id
        name
      }
      leadsCampus {
        id
        name
      }
      townBishop {
        id
        name
      }
      campusBishop {
        id
        name
      }
      isBishopAdminFor {
        id
        firstName
        lastName
      }
      isCampusAdminFor {
        id
        name
      }
      isTownAdminFor {
        id
        name
      }
    }
    campuses(where: { id: $id }) {
      id
      name
    }
    campusMemberList(id: $id) {
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
        title
      }
      leadsBacenta {
        id
        name
      }
      leadsCentre {
        id
        name
      }
      leadsMinistry {
        id
        name
      }
      leadsSonta {
        id
        name
      }
      leadsBasonta {
        id
        name
      }
      leadsTown {
        id
        name
      }
      leadsCampus {
        id
        name
      }
      townBishop {
        id
        name
      }
      campusBishop {
        id
        name
      }
      isBishopAdminFor {
        id
        firstName
        lastName
      }
      isCampusAdminFor {
        id
        name
      }
      isTownAdminFor {
        id
        name
      }
    }
  }
`

export const GET_CENTRE_MEMBERS = gql`
  query($id: ID) {
    displayCentre(id: $id) {
      id
      name
    }
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
        id
        name
      }
      isBishopAdminFor {
        id
        firstName
        lastName
      }
      isCampusAdminFor {
        id
        name
      }
      isTownAdminFor {
        id
        name
      }
    }
  }
`

export const GET_BACENTA_MEMBERS = gql`
  query($id: ID) {
    displayBacenta(id: $id) {
      name
    }
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
        id
        name
      }
      leadsCentre {
        id
        name
      }
      leadsMinistry {
        id
        name
      }
      leadsSonta {
        id
        name
      }
      leadsBasonta {
        id
        name
      }
      leadsTown {
        id
        name
      }
      leadsCampus {
        id
        name
      }
      townBishop {
        id
        name
      }
      campusBishop {
        id
        name
      }
      isBishopAdminFor {
        id
        firstName
        lastName
      }
      isCampusAdminFor {
        id
        name
      }
      isTownAdminFor {
        id
        name
      }
    }
  }
`

export const GET_SONTA_MEMBERS = gql`
  query($id: ID) {
    displaySonta(id: $id) {
      id
      name
    }
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
        id
        name
      }
      leadsCentre {
        id
        name
      }
      leadsMinistry {
        id
        name
      }
      leadsSonta {
        id
        name
      }
      leadsBasonta {
        id
        name
      }
      leadsTown {
        id
        name
      }
      leadsCampus {
        id
        name
      }
      townBishop {
        id
        name
      }
      campusBishop {
        id
        name
      }
      isBishopAdminFor {
        id
        firstName
        lastName
      }
      isCampusAdminFor {
        id
        name
      }
      isTownAdminFor {
        id
        name
      }
    }
  }
`
