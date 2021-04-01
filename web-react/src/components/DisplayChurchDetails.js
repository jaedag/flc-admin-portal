import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { DetailsCard } from './DetailsCard'
import { NavBar } from './NavBar'
import { MemberContext } from '../contexts/MemberContext'
import { ChurchContext } from '../contexts/ChurchContext'

export const DisplayChurchDetails = (props) => {
  const {
    name,
    leaderTitle,
    leaderName,
    leaderId,
    admin,
    churchHeading,
    subChurch,
    subChurchSetter,
    churchType,
    churchNo,
    membership,
    buttons,
    editlink,
    history,
  } = props

  const { isAuthenticated } = useAuth0()
  const { setMemberId } = useContext(MemberContext)
  const { clickCard } = useContext(ChurchContext)

  return (
    <div>
      <NavBar />
      <div className=" py-2 top-heading title-bar mt-4">
        <div className="container ">
          <h3 className="mx-3 mt-3 font-weight-bold">
            {`${name} ${churchType}`}
            {!isAuthenticated && (
              <Link to={`${editlink}`}>
                <sup className="text-secondary card-text icon-color font-weight-bold ml-3">
                  <i className="fas fa-edit" />
                  Edit
                </sup>
              </Link>
            )}
          </h3>
          {admin && (
            <Link
              to="/member/displaydetails"
              onClick={() => {
                clickCard(admin)
              }}
              className="mx-3 mb-2 text-muted font-weight-bold"
            >
              {admin.firstName} {admin.lastName}
            </Link>
          )}
        </div>
      </div>

      <div className="container">
        <div className="row detail-top-margin ml-2 text-secondary">Details</div>
        <div className="row row-cols-3 detail-bottom-margin">
          <Link
            className="col-9 col-md-6 col-lg-4"
            to={`/${churchType.toLowerCase()}/members`}
          >
            <DetailsCard heading="Membership" detail={membership} />
          </Link>
          <Link
            to="/member/displaydetails"
            onClick={() => {
              setMemberId(leaderId)
            }}
            className="col-9 col-md-6 col-lg-4"
          >
            <DetailsCard heading={leaderTitle} detail={leaderName} />
          </Link>
          <div className="col-9 col-md-6 col-lg-4">
            <DetailsCard heading={churchHeading} detail={churchNo} />
          </div>
        </div>
      </div>
      {subChurch && buttons[0] ? (
        <React.Fragment>
          <div className="container">
            <hr className="hr-line" />

            <div className="row justify-content-between">
              <div className="col">
                <p className="text-secondary">{`${subChurch} Locations`}</p>
              </div>
              <div className="col-auto">
                <Link
                  className="card text-secondary px-1"
                  to={`/${subChurch.toLowerCase()}/displayall`}
                >
                  View All
                </Link>
              </div>
            </div>
          </div>

          <div className="container mb-4 card-button-row">
            <table>
              <tbody>
                <tr>
                  {buttons.map((church, index) => {
                    if (index > 4) {
                      return null
                    }
                    return (
                      <td className="col-auto" key={index}>
                        <Link
                          to={
                            subChurch
                              ? `/${subChurch.toLowerCase()}/displaydetails`
                              : null
                          }
                        >
                          <button
                            className="card-buttons py-2 px-3 text-center text-nowrap text-white"
                            onClick={() => {
                              subChurchSetter(church.id)
                            }}
                          >
                            {church.name}
                          </button>
                        </Link>
                      </td>
                    )
                  })}
                </tr>
              </tbody>
            </table>
          </div>
        </React.Fragment>
      ) : null}

      {history && (
        <div className="container px-3">
          <h5>Church History</h5>
          <ul className="timeline">
            {history.map(
              (element, index) =>
                index < 5 && (
                  <li key={index}>
                    <p className="timeline-text">
                      {element.HistoryLog.historyRecord}
                      <br />
                      <small className="text-secondary">
                        {element.HistoryLog.created_at.date?.formatted}
                      </small>
                    </p>
                  </li>
                )
            )}
          </ul>
        </div>
      )}
    </div>
  )
}
