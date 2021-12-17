import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import userIcon from '../../assets/user.png'
import TabletDesktopView from '../responsive-design/TabletDesktopView'
import MobileView from '../responsive-design/MobileView'
import { ChurchContext } from 'contexts/ChurchContext.js'
import { transformCloudinaryImg } from 'global-utils.js'
import PlaceholderCustom from 'components/Placeholder.jsx'
import './MemberTable.css'
import { MemberContext } from 'contexts/MemberContext.js'
import { Container } from 'react-bootstrap'

const MemberTable = (props) => {
  const { memberData, memberError, memberLoading, offset, numberOfRecords } =
    props

  const { setChurch } = useContext(ChurchContext)
  const { theme, setMemberId } = useContext(MemberContext)
  const history = useHistory()

  const loading = memberLoading || memberError || !memberData

  if (loading) {
    return (
      <MobileView>
        <div className="member-grid">
          {[0, 1, 2, 3, 4, 5].map((_, index) => {
            return (
              <Container key={index}>
                <div
                  className={`d-flex align-items-center card-border ${theme}`}
                >
                  {/* <div className="rounded-circle img-search-placeholder "> */}
                  <PlaceholderCustom
                    className="rounded-circle img-search-placeholder"
                    as="div"
                    xs={12}
                    loading={loading}
                  />
                  {/* </div> */}

                  <div className="flex-grow-1 ms-3">
                    <PlaceholderCustom loading={loading} as="span" xs={12} />
                    <PlaceholderCustom loading={loading} as="span" xs={12} />
                  </div>
                </div>
              </Container>
            )
          })}
        </div>
      </MobileView>
    )
  }

  return (
    // Web View Full Screen without filters applied
    <>
      <TabletDesktopView>
        <div className="container member-grid">
          <div className="row">
            {memberData.map((soul, index) => {
              if (index < offset) {
                return null
              } else if (index >= offset + numberOfRecords - 1) {
                return null
              }
              return (
                <div className="col-auto " key={index}>
                  <div
                    className="card grid-card fade-in"
                    onClick={() => {
                      setMemberId(soul.id)
                      setChurch({
                        church: soul.stream_name,
                        subChurch: 'bacenta',
                      })
                      history.push('/member/displaydetails')
                    }}
                  >
                    <img
                      className="card-img-top"
                      src={transformCloudinaryImg(soul?.pictureUrl) || userIcon}
                      alt={soul?.firstName + ' ' + soul?.lastName}
                    />

                    <p className="card-title text-center pt-2">
                      {soul?.firstName + ' ' + soul?.lastName}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </TabletDesktopView>

      {/* Mobile View */}
      <MobileView>
        <div className="member-grid">
          {memberData.map((soul, index) => {
            // if (index < offset) {
            //   return null
            // } else if (index >= offset + numberOfRecords) {
            //   return null
            // }

            return (
              <Container key={index}>
                <div
                  className={`d-flex align-items-center card-border ${theme}`}
                  onClick={() => {
                    setMemberId(soul.id)
                    setChurch({
                      church: soul.stream_name,
                      subChurch: 'bacenta',
                    })
                    history.push('/member/displaydetails')
                  }}
                >
                  <div className="flex-shrink-0">
                    <img
                      className="rounded-circle img-search"
                      src={transformCloudinaryImg(soul?.pictureUrl) || userIcon}
                      alt={`${soul?.firstName} ${soul?.lastName}`}
                    />
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <p className="card-title">{`${soul?.firstName} ${soul?.lastName}`}</p>
                    {soul?.fellowship ? (
                      <span className={`text-secondary card-subinfo ${theme}`}>
                        {soul?.fellowship.name}
                        {' - '}
                      </span>
                    ) : null}
                    {soul?.ministry && (
                      <span className={`text-secondary card-subinfo ${theme}`}>
                        {soul?.ministry.name}
                      </span>
                    )}
                  </div>
                </div>
              </Container>
            )
          })}
        </div>
      </MobileView>
    </>
  )
}

export default MemberTable
