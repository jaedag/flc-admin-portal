import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { DisplayChurchList } from '../components/DisplayChurchList'
import { NavBar } from '../components/NavBar'
import { ErrorScreen, LoadingScreen } from '../components/StatusScreens'
import { GET_HALLS } from '../queries/ListQueries'
import { CampusTownContext } from '../context/ChurchContext'
import { CommunityHallContext } from '../context/ChurchContext'
import { MemberContext } from '../context/MemberContext'

export const DisplayAllHalls = () => {
  const { campusID } = useContext(CampusTownContext)
  const { setHallID } = useContext(CommunityHallContext)
  const { setMemberID } = useContext(MemberContext)

  const { data: hallData, error: hallError, loading: hallLoading } = useQuery(
    GET_HALLS,
    {
      variables: { campusID: campusID },
    }
  )

  if (hallError) {
    return <ErrorScreen />
  } else if (hallLoading) {
    // Spinner Icon for Loading Screens
    return <LoadingScreen />
  }

  return (
    <div>
      <NavBar />
      <div className="body-container container">
        <div className="mb-4 border-bottom">
          <div className="row justify-content-between">
            <div className="col-auto">
              <Link
                to="/members/displaydetails"
                onClick={() => {
                  setMemberID(`${hallData.hallList[0].campus.leader.memberID}`)
                }}
              >
                <h4>{`${hallData.hallList[0].campus.name} campus`}</h4>
              </Link>{' '}
            </div>
            <div className="col-auto">
              <Link to="/hall/addhall" className="btn btn-primary text-nowrap">
                Add Hall
              </Link>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <h6 className="text-muted">
                Hall Leader:
                {hallData.hallList[0].campus.leader
                  ? ` ${hallData.hallList[0].campus.leader.firstName} ${hallData.hallList[0].campus.leader.lastName}`
                  : null}
              </h6>
            </div>
          </div>

          <div className="row justify-content-between">
            <div className="py-1 px-2 m-2 card">{`Halls: ${hallData.hallList.length}`}</div>
            <div className="py-1 px-2 m-2 card">{`Sontas: ${hallData.hallList[0].campus.sontas.length}`}</div>
            <div className="py-1 px-2 m-2 card">{`Membership:`}</div>
          </div>
        </div>

        <DisplayChurchList
          data={hallData.hallList}
          setter={setHallID}
          churchType="Hall"
        />
      </div>
    </div>
  )
}
