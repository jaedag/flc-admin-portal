import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import DisplayChurchList from '../../components/DisplayChurchList'
import { GET_CENTRE_BACENTAS } from '../../queries/ListQueries'
import { ChurchContext } from '../../contexts/ChurchContext'
import { MemberContext } from '../../contexts/MemberContext'
import RoleView from '../../auth/RoleView'
import BaseComponent from 'components/base-component/BaseComponent'

const DisplayAllBacentas = () => {
  const { centreId, setCentreId } = useContext(ChurchContext)
  const { setMemberId } = useContext(MemberContext)

  const { data, loading, error } = useQuery(GET_CENTRE_BACENTAS, {
    variables: { id: centreId },
  })

  const bacentas = data?.centres[0]?.bacentas
  return (
    <BaseComponent loading={loading} error={error} data={data}>
      <div className=" container">
        <div className="mb-4 border-bottom">
          <div className="row justify-content-between">
            <div className="col-auto">
              <Link
                to={`/centre/displaydetails`}
                onClick={() => {
                  setCentreId(centreId)
                }}
              >
                <h4>{`${bacentas?.[0].centre.name} Centre`}</h4>
              </Link>
            </div>
            <RoleView
              roles={[
                'adminFederal',
                'adminCouncil',
                'adminCampus',
                'adminTown',
              ]}
            >
              <div className="col-auto">
                <Link
                  to="/bacenta/addbacenta"
                  className="btn btn-primary text-nowrap"
                >
                  Add Bacenta
                </Link>
              </div>
            </RoleView>
          </div>

          <div className="row">
            <Link
              className="col"
              to="/member/displaydetails"
              onClick={() => {
                setMemberId(`${bacentas?.[0].centre.leader.id}`)
              }}
            >
              <h6 className="text-muted">
                Bacenta Leader:
                {bacentas?.[0].centre.leader
                  ? ` ${bacentas?.[0].centre.leader.fullName}`
                  : null}
              </h6>
            </Link>
          </div>

          <div className="row justify-content-between">
            <div className="py-1 px-2 m-2 card">{`Bacentas: ${bacentas?.length}`}</div>

            <Link
              to="/centre/members"
              className="py-1 px-2 m-2 card"
            >{`Membership: ${data?.centreMemberCount}`}</Link>
          </div>
        </div>
        <DisplayChurchList data={bacentas} churchType="Bacenta" />
      </div>
    </BaseComponent>
  )
}

export default DisplayAllBacentas
