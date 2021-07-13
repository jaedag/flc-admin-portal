import React from 'react'

const StatDisplay = ({ title, statistic }) => {
  if (isNaN(statistic)) {
    statistic = 0
  }
  return (
    <>
      <p className="dashboard-title">{title}</p>
      <p className="info-text">{statistic}</p>
    </>
  )
}

export default StatDisplay
