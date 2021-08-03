import { useMutation } from '@apollo/client'
import {
  NEW_BACENTA_LEADER,
  NEW_CAMPUS_LEADER,
  NEW_CENTRE_LEADER,
  NEW_SONTA_LEADER,
  NEW_TOWN_LEADER,
} from 'pages/create/MakeLeaderMutations'
import { MAKE_BISHOP_ADMIN } from 'pages/dashboards/DashboardQueries'
import React, { useContext } from 'react'
import { useHistory } from 'react-router'
import { ChurchContext } from '../contexts/ChurchContext'
import { alertMsg, capitalise, throwErrorMsg } from '../global-utils'
import DashboardButton from './buttons/DashboardButton'
import {
  MAKE_CAMPUS_ADMIN,
  MAKE_TOWN_ADMIN,
} from './DisplayChurchDetails/AdminMutations'

const MemberRoleList = ({ member }) => {
  if (!member) {
    return null
  }

  const { clickCard, determineStream } = useContext(ChurchContext)
  const history = useHistory()

  //To Display Ranks on the Member Card
  let rank = {
    bishop: [],
    campusLeader: [],
    townLeader: [],
    sontaLeader: [],
    basontaLeader: [],
    centreLeader: [],
    bacentaLeader: [],
    adminBishop: [],
    adminCampus: [],
    adminTown: [],
  }
  let isServant = false

  const updateRank = (member, churchType) => {
    isServant = true
    if (churchType === 'bishop') {
      if (member.isBishopForTown[0]) {
        member.isBishopForTown.map((church) => {
          rank.bishop.push({
            name: church.name,
            church: church,
            id: church.id,
            __typename: church.__typename,
          })
          return null
        })
        return
      } else if (member.isBishopForCampus[0]) {
        member.isBishopForCampus.map((church) => {
          rank.bishop.push({
            name: church.name,
            church: church,
            id: church.id,
            __typename: church.__typename,
          })
          return null
        })
        return
      }
    }

    if (churchType === 'adminBishop') {
      member.isAdminForBishop.map((adminFor) => {
        rank.adminBishop.push({
          admin: true,
          name: `Bishop ${adminFor.firstName} ${adminFor.lastName}`,
          id: adminFor.id,
          __typename: 'Bishop',
        })
        return null
      })
      return
    }

    if (churchType === 'adminCampus' || churchType === 'adminTown') {
      if (member.isAdminForCampus[0]) {
        member.isAdminForCampus.map((adminFor) => {
          rank.adminCampus.push({
            constituency: true,
            name: `${adminFor.name}`,
            id: adminFor.id,
            __typename: adminFor.__typename,
          })
          return null
        })
        return
      } else if (member.isAdminForTown[0]) {
        member.isAdminForTown.map((adminFor) => {
          rank.adminTown.push({
            constituency: true,
            name: `${adminFor.name}`,
            id: adminFor.id,
            __typename: adminFor.__typename,
          })
          return null
        })
        return
      }
    }

    member[`leads${capitalise(churchType)}`].map((church) => {
      let ch = church.__typename.toLowerCase()

      rank[`${ch}Leader`].push({
        name: church.name,
        centre: church.centre,
        sonta: church.sonta,
        campus: church.campus,
        town: church.town,
        bishop: church.bishop,
        id: church.id,
        link: '',
        __typename: church.__typename,
      })
      return null
    })
    return null
  }

  if (member.leadsBacenta[0]) {
    updateRank(member, 'bacenta')
  }
  if (member.leadsCentre[0]) {
    updateRank(member, 'centre')
  }
  if (member.leadsTown[0]) {
    updateRank(member, 'town')
  }
  if (member.leadsCampus[0]) {
    updateRank(member, 'campus')
  }
  if (member.leadsSonta[0]) {
    updateRank(member, 'sonta')
  }
  if (member.leadsBasonta[0]) {
    updateRank(member, 'basonta')
  }
  if (member.leadsMinistry[0]) {
    updateRank(member, 'ministry')
  }
  if (member.isBishopForTown[0]) {
    updateRank(member, 'bishop')
  }
  if (member.isBishopForCampus[0]) {
    updateRank(member, 'bishop')
  }
  if (member.isAdminForBishop[0]) {
    updateRank(member, 'adminBishop')
  }
  if (member.isAdminForCampus[0]) {
    updateRank(member, 'adminCampus')
  }
  if (member.isAdminForTown[0]) {
    updateRank(member, 'adminTown')
  }

  if (!isServant) {
    return null
  }

  const [NewBacentaLeader] = useMutation(NEW_BACENTA_LEADER)
  const [NewCentreLeader] = useMutation(NEW_CENTRE_LEADER)
  const [NewCampusLeader] = useMutation(NEW_CAMPUS_LEADER)
  const [NewTownLeader] = useMutation(NEW_TOWN_LEADER)
  const [NewSontaLeader] = useMutation(NEW_SONTA_LEADER)
  const [MakeTownAdmin] = useMutation(MAKE_TOWN_ADMIN)
  const [MakeCampusAdmin] = useMutation(MAKE_CAMPUS_ADMIN)
  const [MakeBishopAdmin] = useMutation(MAKE_BISHOP_ADMIN)

  const createAccount = () => {
    if (member.auth_id) {
      alert(`${member.fullName} already has an account`)
    }

    if (rank.bacentaLeader.length) {
      NewBacentaLeader({
        variables: {
          bacentaId: rank.bacentaLeader[0].id,
          leaderId: member.id,
        },
      })
        .then(() =>
          alertMsg(
            member.fullName + ' Account Successfully Created as Bacenta Leader'
          )
        )
        .catch((error) =>
          throwErrorMsg('There was error an making you a bacenta leader', error)
        )
    }
    if (rank.centreLeader.length) {
      NewCentreLeader({
        variables: {
          centreId: rank.centreLeader[0].id,
          leaderId: member.id,
        },
      })
        .then(() =>
          alertMsg(
            member.fullName + ' Account Successfully Created as Centre Leader'
          )
        )
        .catch((error) =>
          throwErrorMsg('There was error an making you a centre leader', error)
        )
    }
    if (rank.townLeader.length) {
      NewTownLeader({
        variables: {
          townId: rank.townLeader[0].id,
          leaderId: member.id,
        },
      })
        .then(() =>
          alertMsg(member.fullName, ' Account Successfully Created as Town CO')
        )
        .catch((error) =>
          throwErrorMsg('There was error an making you a town leader', error)
        )
    }
    if (rank.campusLeader.length) {
      NewCampusLeader({
        variables: {
          campusId: rank.campusLeader[0].id,
          leaderId: member.id,
        },
      })
        .then(() =>
          alertMsg(
            member.fullName + ' Account Successfully Created as Campus CO'
          )
        )
        .catch((error) =>
          throwErrorMsg('There was error an making you a campus leader', error)
        )
    }
    if (rank.sontaLeader.length) {
      NewSontaLeader({
        variables: {
          sontaId: rank.sontaLeader[0].id,
          leaderId: member.id,
        },
      })
        .then(() =>
          alertMsg(
            member.fullName + ' Account Successfully Created as Sonta Leader'
          )
        )
        .catch((error) =>
          throwErrorMsg('There was error an making you a sonta leader', error)
        )
    }
    if (rank.adminCampus.length) {
      MakeCampusAdmin({
        variables: {
          campusId: rank.adminCampus[0].id,
          newAdminId: member.id,
          oldAdminId: '',
        },
      })
        .then(() =>
          alertMsg(
            member.fullName + ' Account Successfully Created as Campus Admin'
          )
        )
        .catch((error) =>
          throwErrorMsg(
            `There was error an making ${member.fullName} a campus admin`,
            error
          )
        )
    }
    if (rank.adminTown.length) {
      MakeTownAdmin({
        variables: {
          townId: rank.adminTown[0].id,
          newAdminId: member.id,
          oldAdminId: '',
        },
      })
        .then(() =>
          alertMsg(
            member.fullName + ' Account Successfully Created as Town Admin'
          )
        )
        .catch((error) =>
          throwErrorMsg(
            `There was error an making ${member.fullName} a town admin`,
            error
          )
        )
    }
    if (rank.adminBishop.length) {
      MakeBishopAdmin({
        variables: {
          bishopId: rank.adminBishop[0].id,
          adminId: member.id,
        },
      })
        .then(() =>
          alertMsg(
            member.fullName + ' Account Successfully Created as Bishop Admin'
          )
        )
        .catch((error) =>
          throwErrorMsg(
            `There was error an making ${member.fullName} a bishop admin`,
            error
          )
        )
    }
  }

  return (
    <div className="font-weight-light card-text text-center">
      <DashboardButton btnLink="/dashboard/servants">
        View Records
      </DashboardButton>

      <button className="btn btn-primary" onClick={createAccount}>
        Click To Create Account
      </button>

      <br />
      {(member.isBishopForTown[0] || member.isBishopForCampus[0]) && (
        <span
          onClick={() => {
            determineStream(member)
            history.push('/dashboard')
          }}
        >{`Bishop in the First Love Centre`}</span>
      )}
      <br />
      {
        //Rank Discussions */}
        Object.entries(rank).map((rank) => {
          return rank[1].map((place, i) => {
            let leader

            if (place.__typename === 'Campus' || place.__typename === 'Town') {
              if (member.isBishopForTown[0] || member.isBishopForCampus[0]) {
                return
              }
              leader = 'CO'
            } else {
              leader = 'Leader'
            }

            if (place.admin || place.constituency) {
              leader = 'Admin'
            }

            return (
              <span
                key={i}
                onClick={() => {
                  clickCard(place)
                  history.push(place.link)
                }}
              >
                <span className="font-weight-bold">{`${place.__typename} ${leader}`}</span>
                {` for ${place.name}`}
                <br />
              </span>
            )
          })
        })
      }
    </div>
  )
}

export default MemberRoleList
