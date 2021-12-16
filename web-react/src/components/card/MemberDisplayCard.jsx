import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
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
  const history = useHistory()
  let icon, name, details

  switch (member.__typename) {
    case 'Member':
      icon = user
      name = member.fullName
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
    case 'Town':
      icon = bussolid
      name = member.name + ' Town'
      details = [member?.leader?.fullName]
      break
    case 'Campus':
      icon = bussolid
      name = member.name + ' Campus'
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
  console.log(member)
  return (
    <Card
      {...rest}
      className="mobile-search-card"
      onClick={() => {
        clickCard(member)
        setChurch({ church: member?.stream, subChurch: 'bacenta' })
        history.push(`/${member.__typename.toLowerCase()}/displaydetails`)
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
