import React, { useCallback, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react'
import CacheBuster from 'CacheBuster'
// import registerServiceWorker from './registerServiceWorker'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import PastorsAdmin from 'App'

const AppWithApollo = () => {
  const [accessToken, setAccessToken] = useState()
  const { getAccessTokenSilently } = useAuth0()

  const getAccessToken = useCallback(async () => {
    try {
      const token = await getAccessTokenSilently({
        audience: 'https://flcadmin.netlify.app/graphql',
        scope: 'read:current_user',
      })

      setAccessToken(token)
      sessionStorage.setItem('token', token)
    } catch (err) {
      // eslint-disable-next-line
      console.error(err)
    }
  }, [getAccessTokenSilently])

  useEffect(() => {
    getAccessToken()
  }, [getAccessToken])

  const httpLink = createHttpLink({
    uri: process.env.REACT_APP_GRAPHQL_URI || '/graphql',
  })

  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = sessionStorage.getItem('token') || accessToken

    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        Authorization: `Bearer ${token}`,
      },
    }
  })

  const client = new ApolloClient({
    uri: process.env.REACT_APP_GRAPHQL_URI || '/graphql',
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  })

  return (
    <ApolloProvider client={client}>
      <PastorsAdmin />
    </ApolloProvider>
  )
}

const App = () => (
  <CacheBuster>
    {({ loading, isLatestVersion, refreshCacheAndReload }) => {
      if (loading) return null
      if (!loading && !isLatestVersion) {
        refreshCacheAndReload()
      }

      return (
        <Auth0Provider
          domain={process.env.REACT_APP_AUTH0_DOMAIN}
          clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
          redirectUri={window.location.origin}
          audience="https://flcadmin.netlify.app/graphql"
          scope
        >
          <AppWithApollo />
        </Auth0Provider>
      )
    }}
  </CacheBuster>
)

ReactDOM.render(<App />, document.getElementById('root'))
// registerServiceWorker()
