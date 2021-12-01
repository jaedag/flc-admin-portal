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
        title
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
      isBishopForTown {
        name
      }
      isBishopForCampus {
        id
        name
      }
      isAdminForCouncil {
        id
        name
      }
      isAdminForCampus {
        id
        name
      }
      isAdminForTown {
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
      isBishopForTown {
        id
        name
      }
      isBishopForCampus {
        id
        name
      }
      isAdminForCouncil {
        id
        name
      }
      isAdminForCampus {
        id
        name
      }
      isAdminForTown {
        id
        name
      }
    }
  }
`

export const GET_COUNCIL_MEMBERS = gql`
  query($id: ID) {
    councils(where: { id: $id }) {
      id
      name

      members {
        id
        firstName
        lastName
        pictureUrl
        stream
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
        isBishopForTown {
          id
          name
        }
        isBishopForCampus {
          id
          name
        }
        isAdminForCouncil {
          id
          name
        }
        isAdminForCampus {
          id
          name
        }
        isAdminForTown {
          id
          name
        }
      }
    }
  }
`

export const GET_CAMPUSTOWN_MEMBERS = gql`
  query($id: ID) {
    towns(where: { id: $id }) {
      id
      name
      members {
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
        isBishopForTown {
          id
          name
        }
        isBishopForCampus {
          id
          name
        }
        isAdminForCouncil {
          id
          name
        }
        isAdminForCampus {
          id
          name
        }
        isAdminForTown {
          id
          name
        }
      }
    }

    campuses(where: { id: $id }) {
      id
      name
      members {
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
        isBishopForTown {
          id
          name
        }
        isBishopForCampus {
          id
          name
        }
        isAdminForCouncil {
          id
          name
        }
        isAdminForCampus {
          id
          name
        }
        isAdminForTown {
          id
          name
        }
      }
    }
  }
`

export const GET_CENTRE_MEMBERS = gql`
  query($id: ID) {
    centres(where: { id: $id }) {
      id
      name
      members {
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
        isBishopForTown {
          name
        }
        isBishopForCampus {
          id
          name
        }
        isAdminForCouncil {
          id
          name
        }
        isAdminForCampus {
          id
          name
        }
        isAdminForTown {
          id
          name
        }
      }
    }
  }
`

export const GET_BACENTA_MEMBERS = gql`
  query($id: ID) {
    bacentas(where: { id: $id }) {
      id
      name
      members {
        id
        firstName
        lastName
        pictureUrl
        stream
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
        isBishopForTown {
          id
          name
        }
        isBishopForCampus {
          id
          name
        }
        isAdminForCouncil {
          id
          name
        }
        isAdminForCampus {
          id
          name
        }
        isAdminForTown {
          id
          name
        }
      }
    }
  }
`

export const GET_SONTA_MEMBERS = gql`
  query($id: ID) {
    sontas(where: { id: $id }) {
      id
      name
      members {
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
        isBishopForTown {
          name
        }
        isBishopForCampus {
          id
          name
        }
        isAdminForCouncil {
          id
          name
        }
        isAdminForCampus {
          id
          name
        }
        isAdminForTown {
          id
          name
        }
      }
    }
  }
`
