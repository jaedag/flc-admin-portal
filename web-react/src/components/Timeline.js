import React, { useContext } from 'react'
import { ChurchContext } from '../contexts/ChurchContext'

export const Timeline = (props) => {
  const { record, limit, modifier } = props

  const { parseDate } = useContext(ChurchContext)

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
