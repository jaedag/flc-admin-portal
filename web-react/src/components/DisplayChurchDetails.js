import React from 'react'
import { Link } from 'react-router-dom'
import { DetailsCard } from './DetailsCard'
import { NavBar } from './NavBar'

export const DisplayChurchDetails = (props) => {
  const {
    name,
    leaderTitle,
    leaderName,
    churchHeading,
    subChurch,
    subChurchSetter,
    churchType,
    churchNo,
    membership,
    buttons,
  } = props

  return (
    <div>
      <NavBar />
      <div className=" py-2 top-heading title-bar mt-4">
        <div className="container ">
          <h3 className="mx-3 mt-3 mb-2 font-weight-bold">
            {`${name} ${churchType}`}
            <sup className="text-secondary card-text icon-color font-weight-bold ml-3">
              <i className="fas fa-edit" />
              Edit
            </sup>
          </h3>
        </div>
      </div>

      <div className="container">
        <div className="row detail-top-margin ml-2 text-secondary">Details</div>
        <div className="row row-cols-3 detail-bottom-margin">
          <div className="col-9 col-md-6 col-lg-4">
            <DetailsCard heading="Membership" detail={membership} />
          </div>
          <div className="col-9 col-md-6 col-lg-4">
            <DetailsCard heading={leaderTitle} detail={leaderName} />
          </div>
          <div className="col-9 col-md-6 col-lg-4">
            <DetailsCard heading={churchHeading} detail={churchNo} />
          </div>
        </div>
      </div>

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
              onClick={() => console.log("I'm the one")}
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
                    <Link to={`/${subChurch.toLowerCase()}/displaydetails`}>
                      <button
                        className="card-buttons py-2 px-3 text-center text-nowrap text-white"
                        onClick={() => {
                          subChurchSetter(
                            church[`${subChurch.toLowerCase()}ID`]
                          )
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
    </div>
  )
}
