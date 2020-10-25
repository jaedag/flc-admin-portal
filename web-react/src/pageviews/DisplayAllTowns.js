import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { DisplayChurchList } from '../components/DisplayChurchList'
import { NavBar } from '../components/NavBar'
import SpinnerPage from '../components/SpinnerPage'
import { GET_TOWNS } from '../queries/DropDownQueries'
import { ApostleContext, TownContext } from '../context/ChurchContext'
import { MemberContext } from '../context/MemberContext'
import { APOSTLE_MEMBER_COUNT } from '../queries/CountQueries'

export const DisplayAllTowns = () => {
  const { apostleID } = useContext(ApostleContext)
  const { setTownID } = useContext(TownContext)
  const { setMemberID } = useContext(MemberContext)

  const { data: townData, error: townError, loading: townLoading } = useQuery(
    GET_TOWNS,
    {
      variables: { apostleID: apostleID },
    }
  )
  const { data: apostleMemberCount } = useQuery(APOSTLE_MEMBER_COUNT, {
    variables: { apostleID: apostleID },
  })

  if (townError) {
    return (
      <React.Fragment>
        <NavBar />
        <div className="container full-body-center">
          <p className="text-center full-center">
            There seems to be an error loading data
          </p>
        </div>
      </React.Fragment>
    )
  } else if (townLoading) {
    // Spinner Icon for Loading Screens
    return (
      <React.Fragment>
        <NavBar />
        <SpinnerPage />
      </React.Fragment>
    )
  }

  return (
    <div>
      <NavBar />
      <div className="body-container container">
        <div className="mb-4 border-bottom">
          <div className="row justify-content-between">
            <div className="col-8">
              <Link
                to="/members/displaydetails"
                onClick={() => {
                  setMemberID(`${townData.townList[0].apostle.memberID}`)
                }}
              >
                <h4>{`${townData.townList[0].apostle.firstName} ${townData.townList[0].apostle.lastName}'s Towns`}</h4>
              </Link>
            </div>
            <div className="col">
              <Link to="/town/addtown" className="btn btn-primary">
                Add Town
              </Link>
            </div>
          </div>

          <div className="row justify-content-between">
            <div className="py-1 px-3 m-2 card">{`Towns: ${townData.townList.length}`}</div>

            <div className="py-1 px-3 m-2 card">{`Membership: ${
              apostleMemberCount ? apostleMemberCount.apostleMemberCount : null
            }`}</div>
          </div>
        </div>
        <DisplayChurchList
          data={townData.townList}
          setter={setTownID}
          churchType="Town"
        />
      </div>
    </div>
  )
}
