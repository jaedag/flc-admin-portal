import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChurchContext } from '../../contexts/ChurchContext'
import bussolid from '../../assets/bus-solid.svg'
import fellowship from '../../assets/fellowship.svg'
import stream from '../../assets/stream.svg'
import council from '../../assets/council.svg'
import bacenta from '../../assets/bacenta.svg'
import constituency from '../../assets/constituency-location.svg'
import { Button, Card } from 'react-bootstrap'
import { MemberContext } from 'contexts/MemberContext'
import '../../components/members-grids/MemberTable.css'
import './MemberDisplayCard.css'
import { TelephoneFill, Whatsapp } from 'react-bootstrap-icons'
import CloudinaryImage from 'components/CloudinaryImage'
import { USER_PLACEHOLDER } from 'global-utils'

const MemberDisplayCard = (props) => {
  const { member, leader, ...rest } = props
  const { clickCard } = useContext(ChurchContext)
  const { theme } = useContext(MemberContext)
  const navigate = useNavigate()
  let icon, name, details
  const noPicture = !member?.pictureUrl && !leader?.pictureUrl
  let picture = member?.pictureUrl || leader?.pictureUrl || USER_PLACEHOLDER

  switch (member.__typename) {
    case 'Member':
      icon = ''
      name = member?.fullName || member.firstName + ' ' + member.lastName
      details = [
        member.fellowship && member.fellowship.name + ' Fellowship',
        member.ministry && member.ministry.name,
      ]
      break
    case 'Fellowship':
      icon = fellowship
      name = member.name + ' Fellowship'
      details = [member?.leader?.fullName]
      break
    case 'Bacenta':
      icon = bacenta
      name = member.name + ' Bacenta'
      details = [member?.leader?.fullName]
      break

    case 'Constituency':
      icon = constituency
      name = member.name + ' Constituency'
      details = [member?.leader?.fullName]
      break
    case 'Council':
      icon = council
      name = member.name + ' Council'
      details = [member?.leader?.fullName]
      break
    case 'Stream':
      icon = stream
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

  const clickFunction = () => {
    clickCard(member)
    navigate(`/${member.__typename.toLowerCase()}/displaydetails`)
  }

  return (
    <Card
      {...rest}
      className="mobile-search-card"
      onClick={props.onClick || clickFunction}
    >
      <div className="d-flex align-items-center">
        <div className="flex-shrink-0">
          {noPicture && member.__typename !== 'Member' ? (
            <img
              className={`${picture && 'rounded-circle'} img-search`}
              src={icon}
            />
          ) : (
            <CloudinaryImage
              src={picture}
              alt={member.fullName}
              className={`${picture && 'rounded-circle'} img-search`}
            />
          )}
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
          {props.contact && (
            <div>
              <a href={`tel:${leader?.phoneNumber}`}>
                <Button variant="primary">
                  <TelephoneFill /> Call
                </Button>
              </a>
              <a
                href={`https://wa.me/${leader?.whatsappNumber}`}
                className="ms-3"
              >
                <Button variant="success">
                  <Whatsapp /> WhatsApp
                </Button>
              </a>
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}

export default MemberDisplayCard
