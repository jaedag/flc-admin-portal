import React from 'react'

const RoleCard = ({ number, role }) => {
  const isString = typeof number === 'string' && true

  return (
    <div
      className={`card rounded-corners role-card colour-${role.toLowerCase()}`}
    >
      <p className="white text-center align-items-center my-auto">
        <div>
          <div className={isString ? 'church-string' : `church-number`}>
            {number}
          </div>
          <p className="dashboard-title">{role}</p>
        </div>
      </p>
    </div>
  )
}

export default RoleCard
