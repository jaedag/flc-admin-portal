import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import DisplayChurchList from '../../../components/DisplayChurchList'
import { GET_SONTAS_BY_CONSTITUENCY } from '../../../queries/ListQueries'
import { ChurchContext } from '../../../contexts/ChurchContext'
import { MemberContext } from '../../../contexts/MemberContext'
import RoleView from '../../../auth/RoleView'
import BaseComponent from 'components/base-component/BaseComponent'

const DisplaySontasByConstituency = () => {
  const { councilId, setSontaId } = useContext(ChurchContext)
  const { setMemberId } = useContext(MemberContext)

  const { data, loading, error } = useQuery(GET_SONTAS_BY_CONSTITUENCY, {
    variables: { id: councilId },
  })

  const constituencies = data.constituencies

  return (
    <BaseComponent data={data} loading={loading} error={error}>
      <div className=" container">
        <div className="mb-4 border-bottom">
          <div className="row justify-content-between">
            <div className="col-auto">
              <Link
                to={`/member/displaydetails`}
                onClick={() => {
                  setMemberId(councilId)
                }}
              >
                {' '}
                <h4>{`${constituencies[0].coucnil?.name}'s Sontas`}</h4>
              </Link>
            </div>
            <RoleView
              roles={['adminFederal', 'adminCouncil', 'adminConstituency']}
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

          <div className="row justify-content-between">
            <Link
              className="py-1 px-2 m-2 card"
              to="/campus/displayall"
            >{`constituencies: ${constituencies.length}`}</Link>

            <div className="py-1 px-2 m-2 card">{`Membership: ${data?.bishopSontaMemberCount}`}</div>
          </div>
        </div>

        {constituencies.map((campus, index) => {
          return (
            <div key={index}>
              <h4>{campus.name}</h4>
              <DisplayChurchList
                data={campus.sontas}
                setter={setSontaId}
                churchType="Sonta"
              />
            </div>
          )
        })}
      </div>
    </BaseComponent>
  )
}

export default DisplaySontasByConstituency
