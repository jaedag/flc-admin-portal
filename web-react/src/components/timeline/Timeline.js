import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { ChurchContext } from '../../contexts/ChurchContext'
import './Timeline.css'

export const Timeline = (props) => {
  const { record, limit, modifier } = props

  const { parseDate, clickCard } = useContext(ChurchContext)
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
                  {element.HistoryLog.historyRecord}
                  <br />
                  <small className="text-secondary">
                    {`${parseDate(
                      element.HistoryLog.created_at.date?.formatted
                    )} at ${
                      element.HistoryLog.timeStamp.hour
                    }:${element.HistoryLog.timeStamp.minute.toLocaleString(
                      'en-US',
                      {
                        minimumIntegerDigits: 2,
                      }
                    )}`}
                    <span
                      className="font-weight-bold"
                      onClick={() => {
                        clickCard(element.HistoryLog?.loggedBy)
                        history.push('/member/displaydetails')
                      }}
                    >
                      {element.HistoryLog?.loggedBy &&
                        ` by ${element.HistoryLog?.loggedBy?.firstName} ${element.HistoryLog?.loggedBy?.lastName}`}
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
                  <small className="text-secondary">{`${parseDate(
                    element.created_at?.date.formatted
                  )} at ${
                    element.timeStamp.hour
                  }:${element.timeStamp.minute.toLocaleString('en-US', {
                    minimumIntegerDigits: 2,
                  })}`}</small>
                </p>
              </li>
            )
        )}
      </ul>
    )
  }
}
