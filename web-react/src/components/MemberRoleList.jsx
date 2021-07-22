import React, { useContext } from 'react'
import { useHistory } from 'react-router'
import { ChurchContext } from '../contexts/ChurchContext'
import { capitalise } from '../global-utils'
import DashboardButton from './buttons/DashboardButton'

const MemberRoleList = ({ member }) => {
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
    adminConstituency: [],
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

    if (churchType === 'adminConstituency') {
      if (member.isAdminForCampus[0]) {
        member.isAdminForCampus.map((adminFor) => {
          rank.adminConstituency.push({
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
          rank.adminConstituency.push({
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
    updateRank(member, 'adminConstituency')
  }
  if (member.isAdminForTown[0]) {
    updateRank(member, 'adminConstituency')
  }

  if (!isServant) {
    return null
  }

  return (
    <div className="font-weight-light card-text text-center">
      <DashboardButton btnLink="/dashboard/servants">
        View Records
      </DashboardButton>
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
