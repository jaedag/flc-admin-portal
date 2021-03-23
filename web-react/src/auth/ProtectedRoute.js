import React from 'react'
import { Route } from 'react-router-dom'
import { withAuthenticationRequired } from '@auth0/auth0-react'
import Loading from '../components/index/Loading'

const ProtectedRoute = ({ component, ...args }) => (
  <Route
    component={withAuthenticationRequired(component, {
      // eslint-disable-next-line react/display-name
      onRedirecting: () => {
        return <Loading />
      },
    })}
    {...args}
  />
)

export default ProtectedRoute
