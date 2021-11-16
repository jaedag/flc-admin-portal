import PlaceholderCustom from 'components/Placeholder'
import { MemberContext } from 'contexts/MemberContext'
import React, { useContext } from 'react'
import './DetailsCard.css'

const DetailsCard = (props) => {
  const { theme, currentUser } = useContext(MemberContext)
  const loading = !props.heading || props.loading || !currentUser.id

  if (!props.detail) {
    return null
  }

  return (
    <div
      className={`d-flex align-items-center detail-card ${
        !props.bgNone && 'bg-card'
      } ${theme}`}
      onClick={props.onClick}
    >
      {props.img && (
        <PlaceholderCustom
          className="img-search-placeholder"
          as="div"
          xs={12}
          loading={loading}
        >
          <img src={props.img} className="img-search-placeholder" />
        </PlaceholderCustom>
      )}
      <div className="flex-grow-1">
        <PlaceholderCustom loading={loading} as="span" xs={12}>
          <span className={`text-secondary card-heading ${theme}`}>
            {props.heading}
          </span>
        </PlaceholderCustom>
        <PlaceholderCustom loading={loading} as="h2" xs={12}>
          <h2 className={`font-primary card-detail`}>{props.detail}</h2>
        </PlaceholderCustom>
      </div>
    </div>
  )
}

export default DetailsCard
