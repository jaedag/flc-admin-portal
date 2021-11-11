import React from 'react'
import { Placeholder } from 'react-bootstrap'
import '../pages/reports/Report.css'

const PlaceholderCustom = ({ loading, children, as, size, xs, ...rest }) => {
  return (
    <>
      {loading ? (
        <Placeholder as={as} animation="wave" {...rest}>
          <Placeholder
            xs={xs ?? 8}
            size={size ?? 'lg'}
            className="h-100"
            bg="dark"
          />
        </Placeholder>
      ) : (
        <>{children}</>
      )}
    </>
  )
}

export default PlaceholderCustom
