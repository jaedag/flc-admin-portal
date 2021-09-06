import { transformCloudinaryImg } from 'global-utils'
import React from 'react'

function LeaderPictureIcon({ member }) {
  if (!member) {
    return
  }

  return (
    <img
      className="mr-3 rounded-circle img-search"
      src={transformCloudinaryImg(member?.pictureUrl)}
      alt={`${member.firstName} ${member.lastName}`}
    />
  )
}

export default LeaderPictureIcon
