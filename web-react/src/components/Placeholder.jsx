import { useAuth0 } from '@auth0/auth0-react'
import React from 'react'
import { Placeholder } from 'react-bootstrap'
import '../pages/services/reports/Report.css'

const PlaceholderCustom = (props) => {
  const { isAuthenticated } = useAuth0()
  const { loading, children, as, size, xs, ...rest } = props

  if (loading || !isAuthenticated) {
    if (props.button) {
      return (
        <Placeholder.Button
          aria-hidden="true"
          className={props.className}
          variant={props.variant}
          animation="glow"
        />
      )
    }

    return (
      <>
        <Placeholder as={as ?? 'div'} animation="wave" {...rest}>
          <Placeholder
            xs={xs ?? 8}
            size={size ?? 'lg'}
            className="h-100"
            bg="dark"
          />
        </Placeholder>
      </>
    )
  }

  return <>{children}</>
}

export default PlaceholderCustom
