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
      leadsConstituency {
        name
      }

      isAdminForCouncil {
        id
        name
      }
      isAdminForConstituency {
        id
        name
      }
    }
  }
`

export const GET_SERVANT_MEMBERS = gql`
  query ($id: ID) {
    members(where: { id: $id }) {
      id
      firstName
      lastName
      fullName

      members {
        id
        firstName
        lastName
        pictureUrl
        stream_name
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
        leadsConstituency {
          id
          name
        }

        isAdminForCouncil {
          id
          name
        }
        isAdminForConstituency {
          id
          name
        }
      }
    }
  }
`

export const GET_GATHERING_SERVICE_MEMBERS = gql`
  query ($id: ID) {
    gatheringServices(where: { id: $id }) {
      id
      name

      members {
        id
        firstName
        lastName
        pictureUrl
        stream_name
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
        leadsConstituency {
          id
          name
        }

        isAdminForCouncil {
          id
          name
        }
        isAdminForConstituency {
          id
          name
        }
      }
    }
  }
`
export const GET_STREAM_MEMBERS = gql`
  query ($id: ID) {
    streams(where: { id: $id }) {
      id
      name

      members {
        id
        firstName
        lastName
        pictureUrl
        stream_name
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
        leadsConstituency {
          id
          name
        }

        isAdminForCouncil {
          id
          name
        }
        isAdminForConstituency {
          id
          name
        }
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
        stream_name
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
        leadsConstituency {
          id
          name
        }

        isAdminForCouncil {
          id
          name
        }
        isAdminForConstituency {
          id
          name
        }
      }
    }
  }
`

export const GET_CONSTITUENCY_MEMBERS = gql`
  query ($id: ID) {
    constituencies(where: { id: $id }) {
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
        leadsConstituency {
          id
          name
        }

        isAdminForCouncil {
          id
          name
        }
        isAdminForConstituency {
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
        leadsConstituency {
          id
          name
        }

        isAdminForCouncil {
          id
          name
        }
        isAdminForConstituency {
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
        stream_name
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
        leadsConstituency {
          id
          name
        }

        isAdminForCouncil {
          id
          name
        }
        isAdminForConstituency {
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
        leadsConstituency {
          id
          name
        }

        isAdminForCouncil {
          id
          name
        }
        isAdminForConstituency {
          id
          name
        }
      }
    }
  }
`
