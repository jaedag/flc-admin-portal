import { gql } from '@apollo/client'

export const GET_FEDERAL_MEMBERS = gql`
  query {
    members(options: { sort: { firstName: ASC } }) {
      id
      firstName
      lastName
      pictureUrl
      fellowship {
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
      leadsFellowship {
        name
      }
      leadsBacenta {
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
      fellowship {
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
      leadsFellowship {
        id
        name
      }
      leadsBacenta {
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
  query ($id: ID) {
    councils(where: { id: $id }) {
      id
      name

      members {
        id
        firstName
        lastName
        pictureUrl
        stream
        fellowship {
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
        leadsFellowship {
          id
          name
        }
        leadsBacenta {
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
  query ($id: ID) {
    towns(where: { id: $id }) {
      id
      name
      members {
        id
        firstName
        lastName
        pictureUrl
        fellowship {
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
        leadsFellowship {
          id
          name
        }
        leadsBacenta {
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
        fellowship {
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
        leadsFellowship {
          id
          name
        }
        leadsBacenta {
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
  query ($id: ID) {
    bacentas(where: { id: $id }) {
      id
      name
      members {
        id
        firstName
        lastName
        pictureUrl
        fellowship {
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
        leadsFellowship {
          name
        }
        leadsBacenta {
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

export const GET_FELLOWSHIP_MEMBERS = gql`
  query ($id: ID) {
    fellowships(where: { id: $id }) {
      id
      name
      members {
        id
        firstName
        lastName
        pictureUrl
        stream
        fellowship {
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
        leadsFellowship {
          id
          name
        }
        leadsBacenta {
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
  query ($id: ID) {
    sontas(where: { id: $id }) {
      id
      name
      members {
        id
        firstName
        lastName
        pictureUrl
        fellowship {
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
        leadsFellowship {
          name
        }
        leadsBacenta {
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
