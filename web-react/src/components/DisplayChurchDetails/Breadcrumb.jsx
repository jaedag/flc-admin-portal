import { MemberContext } from 'contexts/MemberContext'
import { authorisedLink } from 'global-utils'
import { permitMe } from 'permission-utils'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ChurchContext } from '../../contexts/ChurchContext'
import './Breadcrumb.css'

const Breadcrumb = ({ breadcrumb }) => {
  const { clickCard } = useContext(ChurchContext)
  const { currentUser } = useContext(MemberContext)

  if (!breadcrumb.length) {
    return null
  }

  return breadcrumb.map((bread, i) => {
    if (!bread) {
      return null
    }

    let breadname
    if (bread?.__typename === 'Sonta') {
      breadname = bread.name.replace(bread.constituency.name, '')
    } else {
      breadname = bread.name
    }

    return (
      <Link
        key={i}
        to={authorisedLink(
          currentUser,
          permitMe(bread?.__typename),
          `/${bread?.__typename.toLowerCase()}/displaydetails`
        )}
        onClick={() => {
          clickCard(bread)
        }}
        className="crumb label text-secondary"
      >
        {`${breadname} ${bread?.__typename}`}
        {i !== breadcrumb.length - 1 && ' > '}
      </Link>
    )
  })
}

export default Breadcrumb
