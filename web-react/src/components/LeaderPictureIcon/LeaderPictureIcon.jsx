import CloudinaryImage from 'components/CloudinaryImage'
import React from 'react'

function LeaderPictureIcon({ member }) {
  if (!member) {
    return null
  }

  return (
    <CloudinaryImage
      className="mr-3 rounded-circle img-search"
      src={member?.pictureUrl}
      alt={member.fullName}
    />
  )
}

export default LeaderPictureIcon
