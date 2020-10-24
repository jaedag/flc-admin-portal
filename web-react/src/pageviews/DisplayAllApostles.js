// import React, { useContext } from 'react'
// import { Link } from 'react-router-dom'
// import { useQuery } from '@apollo/client'
// import { DisplayChurchList } from '../components/DisplayChurchList'
// import { NavBar } from '../components/NavBar'
// import SpinnerPage from '../components/SpinnerPage'
// import { GET_APOSTLES } from '../queries/DropDownQueries'
// import { ApostleContext } from '../context/ChurchContext'
// import { MemberContext } from '../context/MemberContext'
// import { APOSTLE_MEMBER_COUNT} from '../queries/CountQueries'

// export const DisplayAllApostles = () => {
// 	const { setApostleID } = useContext(ApostleContext)

// 	const { data: apostleData, error: apostleError, loading: apostleLoading } = useQuery(GET_APOSTLES)
// 	// const { data: apostleMemberCount } = useQuery(APOSTLE_MEMBER_COUNT, { variables: { apostleID: apostleID } })

// 	if (apostleError) {
// 		return (
// 			<React.Fragment>
// 				<NavBar />
// 				<div className="container full-body-center">
// 					<p className="text-center full-center">There seems to be an error loading data</p>
// 				</div>
// 			</React.Fragment>
// 		)
// 	} else if (apostleLoading) {
// 		// Spinner Icon for Loading Screens
// 		return (
// 			<React.Fragment>
// 				<NavBar />
// 				<SpinnerPage />
// 			</React.Fragment>
// 		)
// 	}

// 	return (
// 		<div>
// 			<NavBar />
// 			<div className="body-container container">
// 				<div className="mb-4 border-bottom">
// 					<div className="row justify-content-between">
// 						<div className="col-8">
// 							<Link
// 								to="/members/displaydetails"
// 								onClick={() => {
// 									setMemberID(`${apostleData.apostleList[0].memberID}`)
// 								}}>
// 								<h4>{`${apostleData.apostleList[0].apostle.firstName} ${apostleData.apostleList[0].apostle
// 									.lastName}'s Towns`}</h4>
// 							</Link>
// 						</div>
// 						<div className="col">
// 							<Link to="/town/addtown" className="btn btn-primary">
// 								Add Town
// 							</Link>
// 						</div>
// 					</div>

// 					<div className="row justify-content-between">
// 						<div className="py-1 px-3 m-2 card">{`Towns: ${apostleData.apostleList.length}`}</div>
// 						<div className="py-1 px-3 m-2 card">{`Membership: ${apostleMemberCount
// 							? apostleMemberCount.apostleMemberCount
// 							: null}`}</div>
// 					</div>
// 				</div>
// 				<DisplayChurchList data={apostleData.apostleList} setter={setTownID} churchType="Town" />
// 			</div>
// 		</div>
// 	)
// }
