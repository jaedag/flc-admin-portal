import React, { useContext } from 'react'
import { useHistory } from 'react-router'
import { ChurchContext } from '../contexts/ChurchContext'
import { capitalise } from '../global-utils'
import PlaceholderCustom from './Placeholder'

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
    bacentaLeader: [],
    fellowshipLeader: [],
    adminCouncil: [],
    adminCampus: [],
    adminTown: [],
  }
  let isServant = false

  const updateRank = (member, churchType) => {
    isServant = true
    if (churchType === 'bishop') {
      if (member.leadsCouncil[0]) {
        member.leadsCouncil.map((church) => {
          rank.bishop.push({
            name: church.name,
            church: church,
            id: church.id,
            stream_name: church.stream_name,
            __typename: church.__typename,
          })
          return null
        })
        return
      }
    }

    if (churchType === 'adminCouncil') {
      member.isAdminForCouncil.map((adminFor) => {
        rank.adminCouncil.push({
          admin: true,
          name: `${adminFor.name}`,
          stream_name: adminFor.stream_name,
          id: adminFor.id,
          __typename: adminFor.__typename,
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
            stream_name: adminFor.stream_name,
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
        stream_name: church.stream_name,
        bacenta: church.bacenta,
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

  if (member.leadsFellowship[0]) {
    updateRank(member, 'fellowship')
  }
  if (member.leadsBacenta[0]) {
    updateRank(member, 'bacenta')
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
  if (member?.leadsMinistry[0]) {
    updateRank(member, 'ministry')
  }
  if (member?.leadsCouncil[0]) {
    updateRank(member, 'bishop')
  }

  if (member?.isAdminForCouncil[0]) {
    updateRank(member, 'adminCouncil')
  }
  if (member?.isAdminForCampus[0]) {
    updateRank(member, 'adminCampus')
  }
  if (member?.isAdminForTown[0]) {
    updateRank(member, 'adminTown')
  }

  if (!isServant) {
    return null
  }

  return (
    <PlaceholderCustom>
      <small>
        {/* <DashboardButton btnLink="/dashboard/servants">
        View Records
      </DashboardButton> */}

        {member.leadsCouncil[0] && (
          <span
            onClick={() => {
              determineStream(member)
              history.push('/dashboard')
            }}
          >{`Bishop in the First Love Bacenta`}</span>
        )}

        {
          //Rank Discussions */}
          Object.entries(rank).map((rank) => {
            return rank[1].map((place, i) => {
              let leader

              if (
                place.__typename === 'Campus' ||
                place.__typename === 'Town'
              ) {
                if (member.leadsCouncil[0]) {
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
                  <p className="font-weight-bold text-secondary mb-0">{`${place.__typename} ${leader}:`}</p>
                  <p>{place.name}</p>
                </span>
              )
            })
          })
        }
      </small>
    </PlaceholderCustom>
  )
}

export default MemberRoleList
