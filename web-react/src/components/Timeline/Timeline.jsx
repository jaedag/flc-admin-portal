import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { ChurchContext } from '../../contexts/ChurchContext'
import './Timeline.css'
import { parseDate, parseNeoTime } from '../../global-utils'

const Timeline = (props) => {
  const { record, limit, modifier } = props

  const { clickCard } = useContext(ChurchContext)
  const history = useHistory()

  if (!record) {
    return null
  }
  if (record && modifier === 'church') {
    return (
      <ul className="timeline">
        {record.map(
          (element, index) =>
            index < 5 && (
              <li key={index}>
                <p className="timeline-text">
                  {element.historyRecord}
                  <br />
                  <small className="text-secondary">
                    {`${parseDate(element.created_at?.date)} at ${parseNeoTime(
                      element.timeStamp
                    )}`}
                    <span
                      className="font-weight-bold"
                      onClick={() => {
                        clickCard(element?.loggedBy)
                        history.push('/member/displaydetails')
                      }}
                    >
                      {element?.loggedBy &&
                        ` by ${element?.loggedBy?.firstName} ${element?.loggedBy?.lastName}`}
                    </span>
                  </small>
                </p>
              </li>
            )
        )}
      </ul>
    )
  } else if (record) {
    return (
      <ul className="timeline">
        {record.map(
          (element, index) =>
            index < limit && (
              <li key={index}>
                <p className="timeline-text">
                  {element.historyRecord}
                  <br />
                  <small className="text-secondary">
                    {`${parseDate(element.created_at?.date)} at ${parseNeoTime(
                      element.timeStamp
                    )}`}
                    <span
                      className="font-weight-bold"
                      onClick={() => {
                        clickCard(element?.loggedBy)
                        history.push('/member/displaydetails')
                      }}
                    >
                      {element?.loggedBy &&
                        ` by ${element?.loggedBy?.firstName} ${element?.loggedBy?.lastName}`}
                    </span>
                  </small>
                </p>
              </li>
            )
        )}
      </ul>
    )
  }
}

export default Timeline
