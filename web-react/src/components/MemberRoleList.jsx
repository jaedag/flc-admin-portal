import React, { useContext } from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import { ChurchContext } from '../contexts/ChurchContext'
import { capitalise } from '../global-utils'
import PlaceholderCustom from './Placeholder'
import './MemberRoleList.css'

const MemberRoleList = ({ memberLeader, memberAdmin }) => {
  if (!memberLeader || !memberAdmin) {
    return null
  }
  const { clickCard } = useContext(ChurchContext)
  const navigate = useNavigate()

  //To Display Ranks on the Member Card
  let rank = {
    gatheringserviceLeader: [],
    streamLeader: [],
    councilLeader: [],
    constituencyLeader: [],
    bacentaLeader: [],
    fellowshipLeader: [],
    gatheringserviceAdmin: [],
    streamAdmin: [],
    councilAdmin: [],
    constituencyAdmin: [],
    sontaLeader: [],
    basontaLeader: [],
  }
  let isServant = false

  const updateRank = (member, churchType) => {
    isServant = true

    member[`isAdminFor${capitalise(churchType)}`]?.map((church) => {
      let ch = church.__typename.toLowerCase()

      rank[`${ch}Admin`].push({
        name: church.name,
        stream_name: church.stream_name,
        bacenta: church.bacenta,
        sonta: church.sonta,
        constituency: church.constituency,
        id: church.id,
        admin: true,
        link: '',
        __typename: church.__typename,
      })
      return null
    })

    member[`leads${capitalise(churchType)}`]?.map((church) => {
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

  if (memberLeader.leadsFellowship[0]) {
    updateRank(memberLeader, 'fellowship')
  }
  if (memberLeader.leadsBacenta[0]) {
    updateRank(memberLeader, 'bacenta')
  }
  if (memberLeader.leadsConstituency[0]) {
    updateRank(memberLeader, 'constituency')
  }
  if (memberLeader?.leadsCouncil[0]) {
    updateRank(memberLeader, 'council')
  }
  if (memberLeader?.leadsStream[0]) {
    updateRank(memberLeader, 'stream')
  }
  if (memberLeader?.leadsGatheringService[0]) {
    updateRank(memberLeader, 'gatheringService')
  }

  if (memberAdmin.isAdminForConstituency[0]) {
    updateRank(memberAdmin, 'constituency')
  }
  if (memberAdmin.isAdminForCouncil[0]) {
    updateRank(memberAdmin, 'council')
  }
  if (memberAdmin.isAdminForStream[0]) {
    updateRank(memberAdmin, 'stream')
  }
  if (memberAdmin.isAdminForGatheringService[0]) {
    updateRank(memberAdmin, 'gatheringService')
  }

  if (memberLeader.leadsSonta[0]) {
    updateRank(memberLeader, 'sonta')
  }

  if (memberLeader?.leadsMinistry[0]) {
    updateRank(memberLeader, 'ministry')
  }

  if (!isServant) {
    return null
  }

  return (
    <PlaceholderCustom>
      <small>
        <Button
          onClick={() => navigate('/dashboard/servants')}
          className="mb-3 view-trends-button"
        >
          View Trends
        </Button>

        {
          //Rank Discussions */}
          Object.entries(rank).map((rank) => {
            return rank[1].map((place, i) => {
              let servant = 'Leader'

              if (place.admin) {
                servant = 'Admin'
              }

              return (
                <span
                  key={i}
                  onClick={() => {
                    clickCard(place)
                    navigate(place.link)
                  }}
                >
                  <p className="mb-5">
                    <span className=" text-secondary">{`${place.__typename} ${servant} : `}</span>
                    <span>{place.name}</span>
                  </p>
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
