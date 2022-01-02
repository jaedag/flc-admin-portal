import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChurchContext } from '../../contexts/ChurchContext'
import user from '../../assets/user.png'
import bussolid from '../../assets/bus-solid.svg'
import { transformCloudinaryImg } from 'global-utils'
import { Card } from 'react-bootstrap'
import { MemberContext } from 'contexts/MemberContext'
import '../../components/members-grids/MemberTable.css'
import './MemberDisplayCard.css'

const MemberDisplayCard = (props) => {
  const { member, ...rest } = props
  const { setChurch, clickCard } = useContext(ChurchContext)
  const { theme } = useContext(MemberContext)
  const navigate = useNavigate()
  let icon, name, details

  switch (member.__typename) {
    case 'Member':
      icon = user
      name = member?.fullName || member.firstName + ' ' + member.lastName
      details = [
        member.fellowship && member.fellowship.name + ' Fellowship',
        member.ministry && member.ministry.name,
      ]
      break
    case 'Fellowship':
      icon = bussolid
      name = member.name + ' Fellowship'
      details = [member?.leader?.fullName]
      break
    case 'Bacenta':
      icon = bussolid
      name = member.name + ' Bacenta'
      details = [member?.leader?.fullName]
      break

    case 'Constituency':
      icon = bussolid
      name = member.name + ' Constituency'
      details = [member?.leader?.fullName]
      break
    case 'Council':
      icon = bussolid
      name = member.name + ' Council'
      details = [member?.leader?.fullName]
      break
    case 'Stream':
      icon = bussolid
      name = member.name + ' Stream'
      details = [member?.leader?.fullName]
      break
    case 'GatheringService':
      icon = bussolid
      name = member.name + ' Gathering Service'
      details = [member?.leader?.fullName]
      break
    case 'Sonta':
      icon = bussolid
      name = member.name + ' Sonta'
      details = [member?.leader?.fullName]
      break
    default:
      break
  }

  return (
    <Card
      {...rest}
      className="mobile-search-card"
      onClick={() => {
        clickCard(member)
        setChurch({ church: member?.stream_name, subChurch: 'bacenta' })
        navigate(`/${member.__typename.toLowerCase()}/displaydetails`)
      }}
    >
      <div className="d-flex align-items-center">
        <div className="flex-shrink-0">
          <img
            className={`${member.pictureUrl && 'rounded-circle'} img-search`}
            src={
              member.pictureUrl
                ? transformCloudinaryImg(member.pictureUrl)
                : icon
            }
            alt={member.fullName}
          />
        </div>
        <div className="flex-grow-1 ms-3">
          <Card.Title>{name}</Card.Title>
          <p className={`text-secondary mb-0 ${theme}`}>
            {details?.length &&
              details.map((detail) => (
                <>
                  <span>{detail}</span>
                  <br />
                </>
              ))}
          </p>
        </div>
      </div>
    </Card>
  )
}

export default MemberDisplayCard
