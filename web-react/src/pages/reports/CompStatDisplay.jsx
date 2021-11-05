import PlaceholderCustom from 'components/Placeholder'
import React from 'react'
import './Report.css'

const StatDisplay = ({ title, statistic, loading }) => {
  if (isNaN(statistic)) {
    statistic = 0
  }
  return (
    <>
      <p className="dashboard-title text-truncate">{title}</p>
      <PlaceholderCustom
        className="h-100 info-text"
        loading={loading}
        as="h1"
        animation="wave"
      >
        <p className="info-text">{statistic}</p>
      </PlaceholderCustom>
    </>
  )
}

export default StatDisplay
