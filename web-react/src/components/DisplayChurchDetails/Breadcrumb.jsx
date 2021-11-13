import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ChurchContext } from '../../contexts/ChurchContext'

const Breadcrumb = ({ breadcrumb }) => {
  const { clickCard } = useContext(ChurchContext)

  return (
    <>
      {breadcrumb
        ? breadcrumb.map((bread, i) => {
            if (!bread) {
              return null
            }

            let breadname
            if (bread?.__typename === 'Sonta') {
              bread.campus &&
                (breadname = bread.name.replace(bread.campus.name, ''))
              bread.town &&
                (breadname = bread.name.replace(bread.town.name, ''))
            } else {
              breadname = bread.name
            }
            if (i === breadcrumb.length - 1) {
              return (
                <small
                  key={i}
                  to={
                    bread?.firstName
                      ? `/dashboard`
                      : `/${bread?.__typename.toLowerCase()}/displaydetails`
                  }
                  className="label text-secondary"
                >
                  {bread?.name
                    ? `${breadname} ${bread?.__typename}`
                    : `Bishop ${bread?.firstName} ${bread?.lastName}`}
                </small>
              )
            } else {
              return (
                <Link
                  key={i}
                  to={
                    bread?.firstName
                      ? `/dashboard`
                      : `/${bread?.__typename.toLowerCase()}/displaydetails`
                  }
                  className="pl-0 pr-1  label text-secondary"
                  onClick={() => {
                    clickCard(bread)
                  }}
                >
                  {bread?.name
                    ? `${bread?.name} ${bread?.__typename}`
                    : `Bishop ${bread?.firstName} ${bread?.lastName}`}
                  {' >'}
                  {'  '}
                </Link>
              )
            }
          })
        : null}
    </>
  )
}

export default Breadcrumb
