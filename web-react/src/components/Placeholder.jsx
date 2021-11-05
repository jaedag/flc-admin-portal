import React from 'react'
import { Placeholder } from 'react-bootstrap'
import '../pages/reports/Report.css'

const PlaceholderCustom = ({ loading, children, element, ...rest }) => {
  return (
    <>
      {loading ? (
        <Placeholder as={element} animation="wave" {...rest}>
          <Placeholder xs={8} />
        </Placeholder>
      ) : (
        <>{children}</>
      )}
    </>
  )
}

export default PlaceholderCustom
