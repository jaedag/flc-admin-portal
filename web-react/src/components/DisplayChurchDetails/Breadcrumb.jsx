import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ChurchContext } from '../../contexts/ChurchContext'
import './Breadcrumb.css'

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
              breadname = bread.name.replace(bread.constituency.name, '')
            } else {
              breadname = bread.name
            }
            if (i === breadcrumb.length - 1) {
              return (
                <small
                  key={i}
                  to={
                    bread?.fullName
                      ? `/dashboard`
                      : `/${bread?.__typename.toLowerCase()}/displaydetails`
                  }
                  className="crumb label text-secondary"
                >
                  {bread?.name
                    ? `${breadname} ${bread?.__typename}`
                    : `Bishop ${bread?.fullName}`}
                </small>
              )
            } else {
              return (
                <Link
                  key={i}
                  to={
                    bread?.fullName
                      ? `/member/displaydetails`
                      : `/${bread?.__typename.toLowerCase()}/displaydetails`
                  }
                  className="pl-0 pr-1 crumb label text-secondary"
                  onClick={() => {
                    clickCard(bread)
                  }}
                >
                  {bread?.name
                    ? `${bread?.name} ${bread?.__typename}`
                    : `Bishop ${bread?.fullName}`}
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
