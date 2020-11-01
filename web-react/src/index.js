import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
// import ApolloClient from "apollo-boost";
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
// import {Login} from "./pages/Login";
import './index.css'
import ApostleDashboard from './pageviews/ApostleDashboard'
import { MembersGrid } from './pageviews/MembersGrid'
import { DisplayMemberDetails } from './pageviews/DisplayMemberDetails'
import { AddMember } from './pageviews/AddMember'
import AddCentre from './pageviews/AddCentre'
import AddCommunity from './pageviews/AddCommunity'
import AddTown from './pageviews/AddTown'
import { DisplayCentreDetails } from './pageviews/DisplayCentreDetails'
import { DisplayCommunityDetails } from './pageviews/DisplayCommunityDetails'
import { DisplayTownDetails } from './pageviews/DisplayTownDetails'
import { MemberContext, SearchContext } from './context/MemberContext'
import {
  ApostleContext,
  TownContext,
  CommunityContext,
  CentreContext,
  SontaContext,
} from './context/ChurchContext'
import { DisplayAllSontas } from './pageviews/DisplayAllSontas'
import { DisplayAllCentres } from './pageviews/DisplayAllCentres'
import { DisplayAllCommunities } from './pageviews/DisplayAllCommunities'
import { DisplayAllTowns } from './pageviews/DisplayAllTowns'

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_URI || '/graphql',
  cache: new InMemoryCache(),
})

const PastorsAdmin = () => {
  // const [memberData, setMemberData] = useState({
  //   filtered: [],
  //   searchKey: '',
  // })

  const [apostleID, setApostleID] = useState(
    'abe93bc4-da80-4f9a-aa95-b8df86b4d406'
  )
  const [townID, setTownID] = useState('c963976b-5fe0-4798-a1de-b12a4f8e497f')
  const [communityID, setCommunityID] = useState(
    '6fb72744-f98d-4e55-9932-3cc9c262aaa9'
  )
  const [centreID, setCentreID] = useState(
    '8657b299-1f24-4264-928c-ca5c8382d414'
  )
  const [sontaID, setSontaID] = useState('b7146b8c-d431-4b3d-b522-295fb2b10afa')
  const [memberID, setMemberID] = useState('')
  const [searchKey, setSearchKey] = useState('')

  return (
    <Router>
      <ApostleContext.Provider value={{ apostleID, setApostleID }}>
        <TownContext.Provider value={{ townID, setTownID }}>
          <CommunityContext.Provider value={{ communityID, setCommunityID }}>
            <CentreContext.Provider value={{ centreID, setCentreID }}>
              <SontaContext.Provider value={{ sontaID, setSontaID }}>
                <MemberContext.Provider value={{ memberID, setMemberID }}>
                  <SearchContext.Provider value={{ searchKey, setSearchKey }}>
                    <Switch>
                      <Route path="/" component={ApostleDashboard} exact />
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
                      <Route
                        path="/sonta/displayall"
                        component={DisplayAllSontas}
                        exact
                      />
                      <Route
                        path="/centre/addcentre"
                        component={AddCentre}
                        exact
                      />
                      <Route
                        path="/centre/displaydetails"
                        component={DisplayCentreDetails}
                        exact
                      />
                      <Route
                        path="/centre/displayall"
                        component={DisplayAllCentres}
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
                        path="/community/displayall"
                        component={DisplayAllCommunities}
                        exact
                      />
                      <Route
                        path="/town/displayall"
                        component={DisplayAllTowns}
                        exact
                      />
                      <Route
                        path="/town/displaydetails"
                        component={DisplayTownDetails}
                        exact
                      />
                      <Route path="/town/addtown" component={AddTown} exact />
                    </Switch>
                  </SearchContext.Provider>
                </MemberContext.Provider>
              </SontaContext.Provider>
            </CentreContext.Provider>
          </CommunityContext.Provider>
        </TownContext.Provider>
      </ApostleContext.Provider>
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
