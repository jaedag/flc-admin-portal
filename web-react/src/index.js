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
import { MembersGridBishop } from './pages/MembersGrid'
import { PastorsGrid } from './pages/PastorsGrid'
import { SearchPageMobile } from './pages/SearchPageMobile'
import { DisplayMemberDetails } from './pages/DisplayMemberDetails'
import { CreateMember } from './pages/CreateMember'
import { UpdateMemberDetails } from './pages/UpdateMemberDetails'
import CreateCentre from './pages/CreateCentre'
import CreateTownCampus from './pages/CreateTownCampus'
import { UpdateTownCampus } from './pages/UpdateTownCampus'
import { DisplayBacentaDetails } from './pages/DisplayBacentaDetails'
import { DisplayCentreDetails } from './pages/DisplayCentreDetails'
import { DisplayCampusTownDetails } from './pages/DisplayCampusTownDetails'
import { DisplaySontaDetails } from './pages/DisplaySontaDetails'
import { MemberContext, SearchContext } from './contexts/MemberContext'
import { ChurchContext } from './contexts/ChurchContext'
import { DisplayAllBacentas } from './pages/DisplayAllBacentas'
import { DisplayAllCentres } from './pages/DisplayAllCentres'
import { DisplayAllSontas } from './pages/DisplayAllSontas'
import { DisplayAllTownCampuses } from './pages/DisplayAllTownCampuses'
import { CreateBacenta } from './pages/CreateBacenta'
import { UpdateCentre } from './pages/UpdateCentre'
import { DisplaySontasByCampusTown } from './pages/DisplaySontasByCampusTown'
import { UpdateBacenta } from './pages/UpdateBacenta'

const AppWithApollo = () => {
  // const [ accessToken, setAccessToken ] = useState()
  const { getAccessTokenSilently } = useAuth0()

  const getAccessToken = useCallback(async () => {
    try {
      const token = await getAccessTokenSilently()
      // setAccessToken(token)
      localStorage.setItem('token', token)
    } catch (err) {
      // loginWithRedirect()
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
    const token = localStorage.getItem('token')

    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : '',
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
  const [bishopID, setBishopID] = useState('')
  const [townID, setTownID] = useState('')
  const [campusID, setCampusID] = useState('')
  const [bacentaID, setBacentaID] = useState('')
  const [centreID, setCentreID] = useState('')
  const [sontaID, setSontaID] = useState('')
  const [ministryID, setMinistryID] = useState('')
  const [memberID, setMemberID] = useState('')
  const [searchKey, setSearchKey] = useState('')
  const [filters, setFilters] = useState({
    gender: '',
    maritalStatus: '',
    occupation: '',
    leaderRank: [],
    ministry: '',
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
  const makeSelectOptions = (data) => {
    return data.map((data) => ({
      value: data.id,
      key: data.name ? data.name : data.firstName + ' ' + data.lastName,
    }))
  }

  const memberFilter = (memberData, filters) => {
    let filteredData = memberData

    const filterFor = (data, field, subfield, criteria) => {
      data = data.filter((member) => {
        if (
          subfield
            ? member[`${field}`] &&
              member[`${field}`][`${subfield}`] === criteria
            : member[`${field}`][0]
        ) {
          return member
        }
        return null
      })

      return data
    }

    //Filter for Gender
    switch (filters.gender) {
      case 'Male':
        filteredData = filterFor(filteredData, 'gender', 'gender', 'Male')
        break
      case 'Female':
        filteredData = filterFor(filteredData, 'gender', 'gender', 'Female')
        break
      default:
        //do nothing
        break
    }

    //Filter for Marital Status
    switch (filters.maritalStatus) {
      case 'Single':
        filteredData = filterFor(
          filteredData,
          'maritalStatus',
          'status',
          'Single'
        )

        break
      case 'Married':
        filteredData = filterFor(
          filteredData,
          'maritalStatus',
          'status',
          'Married'
        )
        break
      default:
        //do nothing
        break
    }

    //Filter for Ministry
    switch (filters.ministry) {
      case 'Greater Love Choir':
        filteredData = filterFor(
          filteredData,
          'ministry',
          'name',
          'Greater Love Choir'
        )

        break
      case 'Dancing Stars':
        filteredData = filterFor(
          filteredData,
          'ministry',
          'name',
          'Dancing Stars'
        )
        break

      case 'Film Stars':
        filteredData = filterFor(filteredData, 'ministry', 'name', 'Film Stars')
        break
      case 'Ushers':
        filteredData = filterFor(filteredData, 'ministry', 'name', 'Ushers')
        break
      case 'Culinary Stars':
        filteredData = filterFor(
          filteredData,
          'ministry',
          'name',
          'Culinary Stars'
        )
        break
      case 'Arrivals':
        filteredData = filterFor(filteredData, 'ministry', 'name', 'Arrivals')
        break
      case 'Fragrance':
        filteredData = filterFor(filteredData, 'ministry', 'name', 'Fragrance')
        break
      case 'Telepastors':
        filteredData = filterFor(
          filteredData,
          'ministry',
          'name',
          'Telepastors'
        )
        break
      case 'Seeing and Hearing':
        filteredData = filterFor(
          filteredData,
          'ministry',
          'name',
          'Seeing and Hearing'
        )
        break
      case 'Understanding Campaign':
        filteredData = filterFor(
          filteredData,
          'ministry',
          'name',
          'Understanding Campaign'
        )
        break
      case 'BENMP':
        filteredData = filterFor(filteredData, 'ministry', 'name', 'BENMP')
        break
      case 'Still Photography':
        filteredData = filterFor(
          filteredData,
          'ministry',
          'name',
          'Still Photography'
        )
        break
      default:
        //do nothing
        break
    }

    //Filter for Leadership Rank
    let leaderData = {
      basontaLeaders: [],
      sontaLeaders: [],
      bacentaLeaders: [],
      centreLeaders: [],
      cOs: [],
    }

    if (filters.leaderRank.includes('Basonta Leader')) {
      // leaderData.basontaLeaders = filteredData.filter((member) => {
      //   if (member.leadsBasonta[0]) {
      //     return member
      //   }
      //   return null
      // })
      leaderData.basontaLeaders = filterFor(filteredData, 'leadsBasonta')
    }
    if (filters.leaderRank.includes('Sonta Leader')) {
      leaderData.sontaLeaders = filterFor(filteredData, 'leadsSonta')
    }
    if (filters.leaderRank.includes('Bacenta Leader')) {
      leaderData.bacentaLeaders = filterFor(filteredData, 'leadsBacenta')
    }
    if (filters.leaderRank.includes('Centre Leader')) {
      leaderData.centreLeaders = filterFor(filteredData, 'leadsCentre')
    }
    if (filters.leaderRank.includes('CO')) {
      leaderData.cOs = filteredData.filter((member) => {
        if (member.townGSO[0] || member.campusGSO[0]) {
          return member
        }
        return null
      })
    }

    //Merge the Arrays without duplicates
    if (filters.leaderRank[0]) {
      filteredData = [
        ...new Set([
          ...leaderData.basontaLeaders,
          ...leaderData.sontaLeaders,
          ...leaderData.bacentaLeaders,
          ...leaderData.centreLeaders,
          ...leaderData.cOs,
        ]),
      ]
    }

    //Code for finding duplicates
    // let duplicates = [...yourArray]
    // yourArrayWithoutDuplicates.forEach((item) => {
    //   const i = duplicates.indexOf(item)
    //   duplicates = duplicates
    //     .slice(0, i)
    //     .concat(duplicates.slice(i + 1, duplicates.length))
    // })

    // console.log("duplicates",duplicates) //[ 1, 5 ]

    // console.log("FIltered",filteredData)

    return filteredData
  }

  const determineChurch = (member) => {
    if (!member.bacenta) {
      if (!member.townBishop) {
        return
      }
      if (member.townBishop[0]) {
        setChurch({ church: 'town', subChurch: 'centre' })
        setBishopID(member.id)
        return
      } else if (member.campusBishop[0]) {
        setChurch({ church: 'campus', subChurch: 'centre' })
        setBishopID(member.id)
        return
      } else {
        return
      }
    }
    if (member.bacenta && member.bacenta.centre && member.bacenta.centre.town) {
      setChurch({ church: 'town', subChurch: 'centre' })
      setBishopID(member.bacenta.centre.town.bishop.id)
      return
    } else if (member.townGSO && member.townGSO[0]) {
      setChurch({ church: 'town', subChurch: 'centre' })
      setBishopID(member.townGSO[0].bishop.id)
      return
    } else if (
      member.bacenta &&
      member.bacenta.centre &&
      member.bacenta.centre.campus
    ) {
      setChurch({ church: 'campus', subChurch: 'centre' })
      setBishopID(member.bacenta.centre.campus.bishop.id)
      return
    } else if (member.campusGSO && member.campusGSO[0]) {
      setChurch({ church: 'campus', subChurch: 'centre' })
      setBishopID(member.campusGSO[0].bishop.id)
      return
    }
  }

  return (
    <Router>
      <ChurchContext.Provider
        value={{
          capitalise,
          phoneRegExp,
          parsePhoneNum,
          makeSelectOptions,
          determineChurch,
          filters,
          setFilters,
          memberFilter,
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
              <Route path="/member-search" component={SearchPageMobile} exact />
              <Route path="/members" component={MembersGridBishop} exact />
              <Route path="/pastors" component={PastorsGrid} exact />
              <Route path="/member/addmember" component={CreateMember} exact />
              <Route
                path="/member/editmember"
                component={UpdateMemberDetails}
                exact
              />
              <Route
                path="/member/displaydetails"
                component={DisplayMemberDetails}
                exact
              />
              <Route
                path="/sonta/displaydetails"
                component={DisplaySontaDetails}
                exact
              />
              <Route
                path="/bacenta/addbacenta"
                component={CreateBacenta}
                exact
              />
              <Route
                path="/bacenta/editbacenta"
                component={UpdateBacenta}
                exact
              />
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
              <Route path="/centre/addcentre" component={CreateCentre} exact />
              <Route path="/centre/editcentre" component={UpdateCentre} exact />
              <Route
                path="/centre/displayall"
                component={DisplayAllCentres}
                exact
              />
              <Route
                path="/sonta/displayall"
                component={DisplayAllSontas}
                exact
              />
              <Route
                path="/town/display-sontas"
                component={DisplaySontasByCampusTown}
                exact
              />
              <Route
                path="/campus/display-sontas"
                component={DisplaySontasByCampusTown}
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
              <Route path="/town/addtown" component={CreateTownCampus} exact />
              <Route
                path="/campus/addcampus"
                component={CreateTownCampus}
                exact
              />
              <Route path="/town/edittown" component={UpdateTownCampus} exact />
              <Route
                path="/campus/editcampus"
                component={UpdateTownCampus}
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
    audience="https://flcadmin.netlify.app/graphql"
  >
    <AppWithApollo />
  </Auth0Provider>
)

ReactDOM.render(<Main />, document.getElementById('root'))
registerServiceWorker()
