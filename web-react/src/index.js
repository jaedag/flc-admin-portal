import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
// import ApolloClient from "apollo-boost";
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
// import {Login} from "./pages/Login";
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
import { DisplayBacentaDetails } from './pages/DisplayBacentaDetails'
import { DisplayCentreDetails } from './pages/DisplayCentreDetails'
import { DisplayCampusTownDetails } from './pages/DisplayCampusTownDetails'
import { DisplaySontaDetails } from './pages/DisplaySontaDetails'
import { MemberContext, SearchContext } from './contexts/MemberContext'
import { ChurchContext } from './contexts/ChurchContext'
import { DisplayAllSontaTowns } from './pages/DisplayAllSontaTowns'
import { DisplayAllBacentas } from './pages/DisplayAllBacentas'
import { DisplayAllCentres } from './pages/DisplayAllCentres'
import { DisplayAllTowns } from './pages/DisplayAllTowns'
import { DisplayAllCampuses } from './pages/DisplayAllCampuses'
import { AddBacenta } from './pages/AddBacenta'

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_URI || '/graphql',
  cache: new InMemoryCache(),
})

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
              <Route path="/members/addmember" component={AddMember} exact />
              <Route
                path="/members/editmember"
                component={EditMemberDetails}
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
              <Route path="/town/addtown" component={AddTownCampus} exact />
              <Route path="/campus/addcampus" component={AddTownCampus} exact />
            </Switch>
          </SearchContext.Provider>
        </MemberContext.Provider>
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
