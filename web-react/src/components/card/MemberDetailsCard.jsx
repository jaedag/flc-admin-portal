import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import EditButton from '../buttons/EditButton'
import './MemberDetailsCard.css'
import RoleView from '../../auth/RoleView'

const MemberDetailsCard = (props) => {
  const { title, editlink } = props
  const { isAuthenticated } = useAuth0()

  return (
    <div className="member-info-card mb-4 p-4">
      <div className="row info-heading">
        <div className="col">
          <p className="font-weight-bold my-2">{title}</p>
        </div>
        {isAuthenticated && (
          <div className="col-auto my-auto d-flex justify-content-end">
            <RoleView
              roles={['adminFederal', 'adminBishop', 'adminConstituency']}
            >
              <EditButton link={editlink} />
            </RoleView>
          </div>
        )}
      </div>
      {props.children}
    </div>
  )
}

export default MemberDetailsCard
