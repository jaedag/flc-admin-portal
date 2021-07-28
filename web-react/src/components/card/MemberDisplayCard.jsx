import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { ChurchContext } from '../../contexts/ChurchContext'
import user from '../../img/user.png'
import bussolid from '../../img/bus-solid.svg'
import { transformCloudinaryImg } from 'global-utils'

const MemberDisplayCard = (props) => {
  const { member, ...rest } = props
  const { clickCard } = useContext(ChurchContext)
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
            member.name ? member.name : member.firstName + ' ' + member.lastName
          }`}</h6>

          {member.bacenta ? (
            <div>
              <span className="font-weight-bold text-secondary">Bacenta:</span>{' '}
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
              <span className="font-weight-bold text-secondary">Ministry:</span>{' '}
              {member.ministry.name}{' '}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default MemberDisplayCard
