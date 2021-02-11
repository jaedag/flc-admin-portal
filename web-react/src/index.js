import React, { useState, useCallback, useEffect } from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react'
import './index.css'
import BishopSelect from './pages/BishopSelect'
import BishopDashboard from './pages/BishopDashboard'
import { MembersGrid } from './pages/MembersGrid'
import { PastorsGrid } from './pages/PastorsGrid'
import { SearchPageMobile } from './pages/SearchPageMobile'
import { DisplayMemberDetails } from './pages/DisplayMemberDetails'
import { AddMember } from './pages/AddMember'
import { EditMemberDetails } from './pages/EditMemberDetails'
import AddCentre from './pages/AddCentre'
import AddTownCampus from './pages/AddTownCampus'
import { EditTownCampus } from './pages/EditTownCampus'
import { DisplayBacentaDetails } from './pages/DisplayBacentaDetails'
import { DisplayCentreDetails } from './pages/DisplayCentreDetails'
import { DisplayCampusTownDetails } from './pages/DisplayCampusTownDetails'
import { DisplaySontaDetails } from './pages/DisplaySontaDetails'
import { MemberContext, SearchContext } from './contexts/MemberContext'
import { ChurchContext } from './contexts/ChurchContext'
import { DisplayAllSontaTowns } from './pages/DisplayAllSontaTowns'
import { DisplayAllBacentas } from './pages/DisplayAllBacentas'
import { DisplayAllCentres } from './pages/DisplayAllCentres'
import { DisplayAllTownCampuses } from './pages/DisplayAllTownCampuses'
import { AddBacenta } from './pages/AddBacenta'

const AppWithApollo = () => {
  const [accessToken, setAccessToken] = useState()
  const { getAccessTokenSilently, loginWithRedirect } = useAuth0()

  const getAccessToken = useCallback(async () => {
    try {
      const token = await getAccessTokenSilently()

      setAccessToken(token)
    } catch (err) {
      loginWithRedirect()
    }
  }, [getAccessTokenSilently, loginWithRedirect])

  useEffect(() => {
    getAccessToken()
  }, [getAccessToken])

  const httpLink = createHttpLink({
    uri: process.env.REACT_APP_GRAPHQL_URI || '/graphql',
  })

  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    // const token = localStorage.getItem('token');

    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        Authorization: accessToken ? `Bearer ${accessToken}` : '',
      },
    }
  })

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  })

  return (
    <ApolloProvider client={client}>
      <PastorsAdmin />
    </ApolloProvider>
  )
}

const PastorsAdmin = () => {
  const [church, setChurch] = useState({
    church: '',
    subChurch: '',
  })
  const capitalise = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }
  const phoneRegExp = /^[+][(]{0,1}[1-9]{1,4}[)]{0,1}[-\s/0-9]*$/
  const parsePhoneNum = (phoneNumber) => {
    return phoneNumber
      .replace(/\s/g, '')
      .replace('+', '')
      .replace('(', '')
      .replace(')', '')
  }
  const [bishopID, setBishopID] = useState('')
  const [townID, setTownID] = useState('')
  const [campusID, setCampusID] = useState('')
  const [bacentaID, setBacentaID] = useState('')
  const [centreID, setCentreID] = useState('')
  const [sontaID, setSontaID] = useState('')
  const [ministryID, setMinistryID] = useState('')
  const [memberID, setMemberID] = useState('')
  const [searchKey, setSearchKey] = useState('')

  return (
    <Router>
      <ChurchContext.Provider
        value={{
          capitalise,
          phoneRegExp,
          parsePhoneNum,
          church,
          setChurch,
          bishopID,
          setBishopID,
          townID,
          setTownID,
          campusID,
          setCampusID,
          centreID,
          setCentreID,
          bacentaID,
          setBacentaID,
          sontaID,
          setSontaID,
          ministryID,
          setMinistryID,
        }}
      >
        <MemberContext.Provider value={{ memberID, setMemberID }}>
          <SearchContext.Provider value={{ searchKey, setSearchKey }}>
            <Switch>
              <Route path="/" component={BishopSelect} exact />
              <Route path="/dashboard" component={BishopDashboard} exact />
              <Route path="/membersearch" component={SearchPageMobile} exact />
              <Route path="/members" component={MembersGrid} exact />
              <Route path="/pastors" component={PastorsGrid} exact />
              <Route path="/member/addmember" component={AddMember} exact />
              <Route
                path="/member/editmember"
                component={EditMemberDetails}
                exact
              />
              <Route
                path="/member/displaydetails"
                component={DisplayMemberDetails}
                exact
              />
              <Route
                path="/sonta/displayall"
                component={DisplayAllSontaTowns}
                exact
              />
              <Route
                path="/sonta/displaydetails"
                component={DisplaySontaDetails}
                exact
              />
              <Route path="/bacenta/addbacenta" component={AddBacenta} exact />
              <Route
                path="/bacenta/displaydetails"
                component={DisplayBacentaDetails}
                exact
              />
              <Route
                path="/bacenta/displayall"
                component={DisplayAllBacentas}
                exact
              />
              <Route
                path="/centre/displaydetails"
                component={DisplayCentreDetails}
                exact
              />
              <Route path="/centre/addcentre" component={AddCentre} exact />
              <Route
                path="/centre/displayall"
                component={DisplayAllCentres}
                exact
              />
              <Route
                path="/town/displayall"
                component={DisplayAllTownCampuses}
                exact
              />
              <Route
                path="/town/displaydetails"
                component={DisplayCampusTownDetails}
                exact
              />
              <Route
                path="/campus/displayall"
                component={DisplayAllTownCampuses}
                exact
              />
              <Route
                path="/campus/displaydetails"
                component={DisplayCampusTownDetails}
                exact
              />
              <Route path="/town/addtown" component={AddTownCampus} exact />
              <Route path="/campus/addcampus" component={AddTownCampus} exact />
              <Route path="/town/edittown" component={EditTownCampus} exact />
              <Route
                path="/campus/editcampus"
                component={EditTownCampus}
                exact
              />
            </Switch>
          </SearchContext.Provider>
        </MemberContext.Provider>
      </ChurchContext.Provider>
    </Router>
  )
}

const Main = () => (
  <Auth0Provider
    domain={process.env.REACT_APP_AUTH0_DOMAIN}
    clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
    redirectUri={window.location.origin}
    audience="https://flcadmin.us.auth0.com/api/v2/"
  >
    <AppWithApollo />
  </Auth0Provider>
)

ReactDOM.render(<Main />, document.getElementById('root'))
registerServiceWorker()
