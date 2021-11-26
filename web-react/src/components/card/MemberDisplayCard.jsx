import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { ChurchContext } from '../../contexts/ChurchContext'
import user from '../../assets/user.png'
import bussolid from '../../assets/bus-solid.svg'
import { transformCloudinaryImg } from 'global-utils'
import { Card } from 'react-bootstrap'
import { MemberContext } from 'contexts/MemberContext'
import '../../components/members-grids/MemberTable.css'
const MemberDisplayCard = (props) => {
  const { member, ...rest } = props
  const { clickCard } = useContext(ChurchContext)
  const { theme } = useContext(MemberContext)
  const history = useHistory()
  let icon

  switch (member.__typename) {
    case 'Member':
      icon = user
      break
    case 'Bacenta':
      icon = bussolid
      break
    case 'Centre':
      icon = bussolid
      break
    case 'Town':
      icon = bussolid
      break
    case 'Campus':
      icon = bussolid
      break
    case 'Sonta':
      icon = bussolid
      break
    default:
      break
  }

  return (
    <>
      <div
        {...rest}
        className="card mobile-search-card p-2 py-3 my-4"
        onClick={() => {
          clickCard(member)
          history.push(`/${member.__typename.toLowerCase()}/displaydetails`)
        }}
      >
        <div className="media">
          {member.pictureUrl ? (
            <img
              className="mr-3 rounded-circle img-search"
              src={transformCloudinaryImg(member.pictureUrl)}
              alt={`${
                member.name
                  ? member.name
                  : member.firstName + ' ' + member.lastName
              }`}
            />
          ) : (
            <img
              className="mr-3 rounded-circle img-search p-2 text-secondary"
              src={icon}
              alt={`${
                member.name
                  ? member.name
                  : member.firstName + ' ' + member.lastName
              }`}
            />
          )}

          <div className="media-body">
            <h6 className="mt-0">{`${
              member.name
                ? member.name
                : member.firstName + ' ' + member.lastName
            }`}</h6>

            {member.bacenta ? (
              <div>
                <span className="font-weight-bold text-secondary">
                  Bacenta:
                </span>{' '}
                {member.bacenta.name}
              </div>
            ) : member.__typename ? (
              <div>
                <span className="font-weight-bold text-secondary">
                  {member.__typename}
                </span>
              </div>
            ) : null}
            {member.ministry ? (
              <div>
                <span className="font-weight-bold text-secondary">
                  Ministry:
                </span>{' '}
                {member.ministry.name}{' '}
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <br />
      <br />
      <Card className="text-center">
        <Card.Body>
          <Card.Title>{member.fullName}</Card.Title>
          <Card.Text>
            {' '}
            {member.bacenta && <span>{member.bacenta.name} </span>}
            {' - '}
            {member.ministry && <span>{member.ministry.name} </span>}
          </Card.Text>
        </Card.Body>
        <Card.Footer>{member.__typename}</Card.Footer>
      </Card>
      <br />
      <br />
      <div className="d-flex align-items-center">
        <div className="flex-shrink-0">
          <img
            className="img-search"
            src={transformCloudinaryImg(member.pictureUrl)}
            alt="..."
          />
        </div>
        <div className="flex-grow-1 ms-3">
          {member.fullName}
          <p>
            {member.bacenta && <span>{member.bacenta.name} </span>}
            {' - '}
            {member.ministry && <span>{member.ministry.name} </span>}
          </p>
        </div>
      </div>

      <div
        className={`d-flex align-items-center card-border ${theme}`}
        onClick={() => {
          clickCard(member)
          history.push('/member/displaydetails')
        }}
      >
        <div className="flex-shrink-0">
          <img
            className="rounded-circle img-search"
            src={transformCloudinaryImg(member?.pictureUrl)}
            alt={`${member?.firstName} ${member?.lastName}`}
          />
        </div>
        <div className="flex-grow-1 ms-3">
          <p className="card-title">{`${member?.firstName} ${member?.lastName}`}</p>
          {member?.bacenta ? (
            <span className={`text-secondary card-subinfo ${theme}`}>
              {member?.bacenta.name}
              {' - '}
            </span>
          ) : null}
          {member?.ministry && (
            <span className={`text-secondary card-subinfo ${theme}`}>
              {member?.ministry.name}
            </span>
          )}
        </div>
      </div>
    </>
  )
}

export default MemberDisplayCard
