import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { GET_APOSTLE_MEMBERS } from '../queries/ListQueries'
import { MemberContext } from '../context/MemberContext'
import { GLOBAL_SEARCH } from '../queries/SearchQuery'
import Spinner from './Spinner'
import { ApostleContext } from '../context/ChurchContext'

export const MemberTable = () => {
  const { setMemberID } = useContext(MemberContext)
  const { apostleID } = useContext(ApostleContext)
  const history = useHistory()
  const { data: member, error: memberError, loading: memberLoading } = useQuery(
    GET_APOSTLE_MEMBERS,
    {
      variables: { apostleID: apostleID },
    }
  )

  const { data: res } = useQuery(GLOBAL_SEARCH)

  console.log(res)

  if (memberLoading || memberError) {
    return (
      <div className="container d-flex justify-content-center">
        <Spinner />
      </div>
    )
  }
  // else if (res !== undefined) {
  //   console.log(res.fuzzyMemberByName)
  //   return (
  //     <div className="container col-lg-9 col-md-12">
  //       <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
  //         <h3 className="h3">Search Results</h3>
  //         <div className="btn-toolbar mb-2 mb-md-0">
  //           <div className="btn-group mr-2">
  //             <div className="file-field btn btn-sm btn-primary">
  //               <input type="file" />
  //             </div>
  //           </div>
  //           <Link
  //             to="/member/addMember"
  //             type="button"
  //             className="btn btn-sm btn-primary"
  //           >
  //             Add Member
  //           </Link>
  //         </div>
  //       </div>

  //       <div className="row row-no-gutters overflow">
  //         {res.fuzzyMemberByName.map((soul, index) => {
  //           return (
  //             <div className="col-sm-1" key={index}>
  //               <div className="card mt-3">
  //                 <div className="d-none d-sm-block pt-2">
  //                   <img
  //                     className="card-img-top img-fluid"
  //                     src="./img/user.png"
  //                     alt=""
  //                   />
  //                 </div>
  //                 <div className="card-body">
  //                   <p className="card-title pt-2">
  //                     {soul.firstName + ' ' + soul.lastName}
  //                   </p>
  //                 </div>
  //               </div>
  //             </div>
  //           )
  //         })}
  //       </div>
  //     </div>
  //   )
  // }
  member.apostleMemberList.map((index) => {
    return (
      <div key={index} className="container col-lg-9 col-md-9 ">
        <div className="row row-no-gutters">
          <div className="col-sm-2 m-3">
            <div className="card  mt-3">
              <div className="d-none d-sm-block t-2">
                <img
                  className="card-img-top img-fluid"
                  src="./img/user.png"
                  alt=""
                />
              </div>
              <div className="card-body">
                <p className="card-title pt-2">data</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  })
  return (
    // Web View Full Screen without filters applied
    <div className="row no-gutters">
      {member.apostleMemberList.map((soul, index) => {
        return (
          <div className="col px-1" key={index}>
            <div
              className="card grid-card mb-2"
              onClick={() => {
                // console.log('Member ID before', soul.memberID)
                setMemberID(soul.memberID)
                // console.log('Member ID after', setter.memberID)
                history.push('/members/displaydetails')
              }}
            >
              <div className="d-none d-sm-block image-card ">
                <img className="card-img-top" src={soul.pictureUrl} alt="" />
              </div>
              <p className="card-title text-center pt-2">
                {soul.firstName + ' ' + soul.lastName}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
