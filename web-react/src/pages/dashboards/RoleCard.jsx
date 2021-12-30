import PlaceholderCustom from 'components/Placeholder'
import React from 'react'

const RoleCard = ({ number, role, loading }) => {
  const isString = typeof number === 'string' && true

  return (
    <div
      className={`card rounded-corners role-card colour-${role?.toLowerCase()}`}
    >
      <PlaceholderCustom
        className={`card rounded-corners role-card`}
        loading={loading}
        as="div"
        animation="wave"
        xs={12}
      >
        <div className="white text-center text-white align-items-center my-auto">
          <div className={isString ? 'church-string' : `church-number`}>
            {number}
          </div>
          <p className="dashboard-title">{role}</p>
        </div>
      </PlaceholderCustom>
    </div>
  )
}

export default RoleCard
