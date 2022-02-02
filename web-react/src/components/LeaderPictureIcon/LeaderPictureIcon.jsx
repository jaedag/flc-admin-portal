import { transformCloudinaryImg } from 'global-utils'
import React from 'react'

function LeaderPictureIcon({ member }) {
  if (!member) {
    return null
  }

  return (
    <img
      className="mr-3 rounded-circle img-search"
      src={transformCloudinaryImg(member?.pictureUrl)}
      alt={member.fullName}
    />
  )
}

export default LeaderPictureIcon
