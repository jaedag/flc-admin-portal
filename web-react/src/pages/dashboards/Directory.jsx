import PlaceholderCustom from 'components/Placeholder'
import { MemberContext } from 'contexts/MemberContext'
import React, { useContext } from 'react'
import { Container } from 'react-bootstrap'
import './Directory.css'
import ChurchIcon from '../../assets/church-svgrepo-com.svg'
import MemberIcon from '../../assets/people-svgrepo-com.svg'
import { useQuery } from '@apollo/client'
import { SERVANT_CHURCHES_COUNT } from './DashboardQueries'
import MenuButton from 'components/buttons/MenuButton'
import { useHistory } from 'react-router'

const Directory = () => {
  const { currentUser } = useContext(MemberContext)
  const { data } = useQuery(SERVANT_CHURCHES_COUNT, {
    variables: { id: currentUser.id },
  })
  const history = useHistory()

  const getMemberCount = (servant) => {
    return (
      servant?.bacentaMembershipCount +
      ' Members, ' +
      servant?.basontaMembershipCount +
      ' in Ministries'
    )
  }

  const getChurchCounts = (servant) => {
    let churchesCount = ''

    if (servant?.leadsConstituencyCount) {
      if (churchesCount) {
        churchesCount = churchesCount + ','
      }
      if (servant.leadsConstituencyCount === 1) {
        churchesCount = servant.leadsConstituencyCount + ' Constituency'
      } else {
        churchesCount = servant.leadsConstituencyCount + ' Constituencies'
      }
    }

    if (servant?.bishopConstituencyCount) {
      if (churchesCount) {
        churchesCount = churchesCount + ','
      }
      if (servant.bishopConstituencyCount === 1) {
        churchesCount = servant.bishopConstituencyCount + ' Constituency'
      } else {
        churchesCount = servant.bishopConstituencyCount + ' Constituencies'
      }
    }

    if (servant?.leadsCentreCount) {
      if (churchesCount) {
        churchesCount = churchesCount + ','
      }
      if (servant.leadsCentreCount === 1) {
        churchesCount =
          churchesCount + ' ' + servant.leadsCentreCount + ' Centre'
      } else {
        churchesCount =
          churchesCount + ' ' + servant.leadsCentreCount + ' Centres'
      }
    }

    if (servant?.leadsBacentaCount) {
      if (churchesCount) {
        churchesCount = churchesCount + ','
      }
      if (servant.leadsBacentaCount === 1) {
        churchesCount =
          churchesCount + ' ' + servant.leadsBacentaCount + ' Bacenta'
      } else {
        churchesCount =
          churchesCount + ' ' + servant.leadsBacentaCount + ' Bacentas'
      }
    }

    return churchesCount
  }

  return (
    <div className="d-flex align-items-center justify-content-center h-75 nav-margin-top-0">
      <Container>
        <PlaceholderCustom loading={!currentUser.fullName} xs={12} as="h1">
          <div className="text-center">
            <h1 className="mb-0  page-header">{`${currentUser.fullName}'s`}</h1>
            <p className="dark menu-subheading">Directory</p>
          </div>
        </PlaceholderCustom>

        <div className="d-grid gap-2 mt-5 text-left">
          <MenuButton
            icon={MemberIcon}
            title="members"
            caption={getMemberCount(data)}
            color="members"
            onClick={() => history.push(`/directory/members`)}
          />
          <MenuButton
            icon={ChurchIcon}
            title="churches"
            caption={getChurchCounts(data)}
            color="churches"
            onClick={() => history.push(`/directory/churches`)}
          />
        </div>
      </Container>
    </div>
  )
}

export default Directory
