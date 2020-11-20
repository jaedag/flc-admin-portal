import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
// import ApolloClient from "apollo-boost";
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
// import {Login} from "./pages/Login";
import './index.css'
import ApostleSelect from './pageviews/ApostleSelect'
import ApostleDashboard from './pageviews/ApostleDashboard'
import { MembersGrid } from './pageviews/MembersGrid'
import { PastorsGrid } from './pageviews/PastorsGrid'
import { SearchPageMobile } from './pageviews/SearchPageMobile'
import { DisplayMemberDetails } from './pageviews/DisplayMemberDetails'
import { AddMember } from './pageviews/AddMember'
import AddCentre from './pageviews/AddCentre'
import AddCommunity from './pageviews/AddCommunity'
import AddHall from './pageviews/AddHall'
import AddTown from './pageviews/AddTown'
import { DisplayCentreDetails } from './pageviews/DisplayCentreDetails'
import { DisplayCommunityDetails } from './pageviews/DisplayCommunityDetails'
import { DisplayHallDetails } from './pageviews/DisplayHallDetails'
import { DisplayCampusTownDetails } from './pageviews/DisplayCampusTownDetails'
import { DisplaySontaDetails } from './pageviews/DisplaySontaDetails'
import { MemberContext, SearchContext } from './context/MemberContext'
import {
  ChurchContext,
  ApostleContext,
  CampusTownContext,
  CommunityHallContext,
  CentreContext,
  SontaContext,
} from './context/ChurchContext'
import { DisplayAllSontaTowns } from './pageviews/DisplayAllSontaTowns'
import { DisplayAllCentres } from './pageviews/DisplayAllCentres'
import { DisplayAllCommunities } from './pageviews/DisplayAllCommunities'
import { DisplayAllHalls } from './pageviews/DisplayAllHalls'
import { DisplayAllTowns } from './pageviews/DisplayAllTowns'
import { DisplayAllCampuses } from './pageviews/DisplayAllCampuses'

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_URI || '/graphql',
  cache: new InMemoryCache(),
})

const PastorsAdmin = () => {
  // const [memberData, setMemberData] = useState({
  //   filtered: [],
  //   searchKey: '',
  // })

  const [church, setChurch] = useState({
    church: '',
    subChurch: '',
  })
  const capitalise = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }
  const [apostleID, setApostleID] = useState(
    'ce059b26-66f0-497b-aa23-3361594a5027'
  )
  const [townID, setTownID] = useState('7f9f647d-1528-4eff-9b91-6869de496bef')
  const [campusID, setCampusID] = useState(
    '638250f3-5500-46ad-a5d8-614d09b2eee9'
  )
  const [communityID, setCommunityID] = useState(
    '6fb72744-f98d-4e55-9932-3cc9c262aaa9'
  )
  const [hallID, setHallID] = useState('ba3aab75-7b0d-45c5-a155-fec54060c44a')
  const [centreID, setCentreID] = useState(
    '8657b299-1f24-4264-928c-ca5c8382d414'
  )
  const [sontaID, setSontaID] = useState('0a2dd076-0ed6-47e6-8055-8ce0df248125')
  const [ministryID, setMinistryID] = useState(
    'be2ce778-1da2-4bc1-a5d0-c4cde747f963'
  )
  const [memberID, setMemberID] = useState('')
  const [searchKey, setSearchKey] = useState('')

  return (
    <Router>
      <ChurchContext.Provider value={{ church, setChurch, capitalise }}>
        <ApostleContext.Provider value={{ apostleID, setApostleID }}>
          <CampusTownContext.Provider
            value={{ townID, setTownID, campusID, setCampusID }}
          >
            <CommunityHallContext.Provider
              value={{ communityID, setCommunityID, hallID, setHallID }}
            >
              <CentreContext.Provider value={{ centreID, setCentreID }}>
                <SontaContext.Provider
                  value={{ sontaID, setSontaID, ministryID, setMinistryID }}
                >
                  <MemberContext.Provider value={{ memberID, setMemberID }}>
                    <SearchContext.Provider value={{ searchKey, setSearchKey }}>
                      <Switch>
                        <Route path="/" component={ApostleSelect} exact />
                        <Route
                          path="/dashboard"
                          component={ApostleDashboard}
                          exact
                        />
                        <Route
                          path="/membersearch"
                          component={SearchPageMobile}
                          exact
                        />
                        <Route path="/members" component={MembersGrid} exact />
                        <Route path="/pastors" component={PastorsGrid} exact />
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
                          component={DisplayAllSontaTowns}
                          exact
                        />
                        <Route
                          path="/sonta/displaydetails"
                          component={DisplaySontaDetails}
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
                          path="/hall/displaydetails"
                          component={DisplayHallDetails}
                          exact
                        />
                        <Route path="/hall/addhall" component={AddHall} exact />
                        <Route
                          path="/hall/displayall"
                          component={DisplayAllHalls}
                          exact
                        />
                        <Route
                          path="/town/displayall"
                          component={DisplayAllTowns}
                          exact
                        />
                        <Route
                          path="/town/displaydetails"
                          component={DisplayCampusTownDetails}
                          exact
                        />
                        <Route
                          path="/campus/displayall"
                          component={DisplayAllCampuses}
                          exact
                        />
                        <Route
                          path="/campus/displaydetails"
                          component={DisplayCampusTownDetails}
                          exact
                        />
                        <Route path="/town/addtown" component={AddTown} exact />
                      </Switch>
                    </SearchContext.Provider>
                  </MemberContext.Provider>
                </SontaContext.Provider>
              </CentreContext.Provider>
            </CommunityHallContext.Provider>
          </CampusTownContext.Provider>
        </ApostleContext.Provider>
      </ChurchContext.Provider>
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
