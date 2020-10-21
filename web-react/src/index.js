import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
// import ApolloClient from "apollo-boost";
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
// import {Login} from "./pages/Login";
import './index.css'
import Dashboard from './pageviews/Dashboard'
import { MembersGrid } from './pageviews/MembersGrid'
import { DisplayMemberDetails } from './pageviews/DisplayMemberDetails'
import { AddMember } from './pageviews/AddMember'
import AddCentre from './pageviews/AddCentre'
import AddCommunity from './pageviews/AddCommunity'
import AddTown from './pageviews/AddTown'
import { DisplayCentreDetails } from './pageviews/DisplayCentreDetails'
import { DisplayCommunityDetails } from './pageviews/DisplayCommunityDetails'
import { MemberContext, SearchContext } from './context/MemberContext'
import {
  TownContext,
  CommunityContext,
  CentreContext,
} from './context/ChurchContext'

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_URI || '/graphql',
  cache: new InMemoryCache(),
})

const PastorsAdmin = () => {
  const [memberData, setMemberData] = useState({
    filtered: [],
    searchKey: '',
  })

  const [townID, setTownID] = useState('190a9543-d81d-4e76-9488-a37fb919a677')
  const [communityID, setCommunityID] = useState(
    'a39b6928-816d-4082-948b-19de278308f2'
  )
  const [centreID, setCentreID] = useState(
    'b9f89e20-334b-4b8e-b3ea-61c0e0547c1a'
  )
  const [memberID, setMemberID] = useState(
    'bc961eac-5b4a-4f13-9ddd-78f1cd3b4adb'
  )
  const [searchKey, setSearchKey] = useState('')

  return (
    <Router>
      <TownContext.Provider value={{ townID, setTownID }}>
        <CommunityContext.Provider value={{ communityID, setCommunityID }}>
          <CentreContext.Provider value={{ centreID, setCentreID }}>
            <MemberContext.Provider
              value={{ memberID, setMemberID, memberData, setMemberData }}
            >
              <SearchContext.Provider value={{ searchKey, setSearchKey }}>
                <Switch>
                  <Route path="/" component={Dashboard} exact />
                  <Route path="/members" component={MembersGrid} exact />
                  <Route
                    path="/members/addmember"
                    component={AddMember}
                    exact
                  />
                  <Route
                    path="/members/displaydetails"
                    component={DisplayMemberDetails}
                    exact
                  />
                  <Route path="/centre/addcentre" component={AddCentre} exact />
                  <Route
                    path="/centre/displaydetails"
                    component={DisplayCentreDetails}
                    exact
                  />
                  <Route
                    path="/community/displaydetails"
                    component={DisplayCommunityDetails}
                    exact
                  />
                  <Route
                    path="/community/addcommunity"
                    component={AddCommunity}
                    exact
                  />
                  <Route
                    path="/town/displaydetails"
                    component={DisplayCommunityDetails}
                    exact
                  />
                  <Route path="/town/addtown" component={AddTown} exact />
                </Switch>
              </SearchContext.Provider>
            </MemberContext.Provider>
          </CentreContext.Provider>
        </CommunityContext.Provider>
      </TownContext.Provider>
    </Router>
  )
}

const Main = () => (
  <ApolloProvider client={client}>
    <PastorsAdmin />
  </ApolloProvider>
)

ReactDOM.render(<Main />, document.getElementById('root'))
registerServiceWorker()
