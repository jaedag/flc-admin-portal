import { useAuth0 } from '@auth0/auth0-react'
import React from 'react'
import { Placeholder } from 'react-bootstrap'
import '../pages/reports/Report.css'

const PlaceholderCustom = ({ loading, children, as, size, xs, ...rest }) => {
  const { isAuthenticated } = useAuth0()

  return (
    <>
      {loading || !isAuthenticated ? (
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
