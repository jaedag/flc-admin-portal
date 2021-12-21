import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import DisplayChurchList from '../../components/DisplayChurchList'

import { GET_CONSTITUENCY_BACENTAS } from '../../queries/ListQueries'
import { ChurchContext } from '../../contexts/ChurchContext'
import RoleView from '../../auth/RoleView'
import BaseComponent from 'components/base-component/BaseComponent'

const DisplayAllSontas = () => {
  const { church, constituencyId, setConsituencyId } = useContext(ChurchContext)

  const { data, loading, error } = useQuery(GET_CONSTITUENCY_BACENTAS, {
    variables: { id: constituencyId },
  })

  return (
    <BaseComponent data={data} loading={loading} error={error}>
      <div className=" container">
        <div className="mb-4 border-bottom">
          <div className="row justify-content-between">
            <div className="col-auto">
              <Link
                to={`/${church.church}/displaydetails`}
                onClick={() => {
                  setConsituencyId(constituencyId)
                }}
              >
                {' '}
                <h4>{`${data.bacentas[0].constituency.name} Constituency`}</h4>
              </Link>
            </div>
            {data.sontas.length < 10 && (
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
                    to="/sonta/addsonta"
                    className="btn btn-primary text-nowrap"
                  >
                    Add Sonta
                  </Link>
                </div>
              </RoleView>
            )}
          </div>
          <div className="row">
            <div className="col">
              <h6 className="text-muted">
                Overseer:
                {data.bacentas[0].campus.leader
                  ? ` ${data.bacentas[0].campus.leader.firstName} ${data.bacentas[0].campus.leader.lastName}`
                  : null}
              </h6>
            </div>
          </div>

          <div className="row justify-content-between">
            <Link
              className="py-1 px-2 m-2 card"
              to="/bacenta/displayall"
            >{`Bacentas: ${data.bacentas.length}`}</Link>
            <div className="py-1 px-2 m-2 card">{`Sontas: ${data.sontas.length}`}</div>
            <div className="py-1 px-2 m-2 card">{`Membership: ${data.campusMemberCount}`}</div>
          </div>
        </div>

        <DisplayChurchList data={data.sontas} churchType="Sonta" />
      </div>
    </BaseComponent>
  )
}

export default DisplayAllSontas
