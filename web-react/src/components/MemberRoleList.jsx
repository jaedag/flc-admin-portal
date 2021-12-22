import React, { useContext } from 'react'
import { useHistory } from 'react-router'
import { ChurchContext } from '../contexts/ChurchContext'
import { capitalise } from '../global-utils'
import PlaceholderCustom from './Placeholder'

const MemberRoleList = ({ member }) => {
  if (!member) {
    return null
  }

  const { clickCard } = useContext(ChurchContext)
  const history = useHistory()

  //To Display Ranks on the Member Card
  let rank = {
    councilLeader: [],
    constituencyLeader: [],
    sontaLeader: [],
    basontaLeader: [],
    bacentaLeader: [],
    fellowshipLeader: [],
    adminCouncil: [],
    adminConstituency: [],
  }
  let isServant = false

  const updateRank = (member, churchType) => {
    isServant = true
    if (churchType === 'bishop') {
      if (member.leadsCouncil[0]) {
        member.leadsCouncil.map((church) => {
          rank.councilLeader.push({
            name: church.name,
            church: church,
            link: '/council/displaydetails',
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

    if (churchType === 'adminConstituency') {
      if (member.isAdminForConstituency[0]) {
        member.isAdminForConstituency.map((adminFor) => {
          rank.adminConstituency.push({
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
        constituency: church.constituency,
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
  if (member.leadsConstituency[0]) {
    updateRank(member, 'constituency')
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
  if (member?.isAdminForConstituency[0]) {
    updateRank(member, 'adminConstituency')
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

        {
          //Rank Discussions */}
          Object.entries(rank).map((rank) => {
            return rank[1].map((place, i) => {
              let leader

              if (place.__typename === 'Constituency') {
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
