import { MemberContext } from 'contexts/MemberContext'
import React, { useContext } from 'react'
import { useHistory } from 'react-router'

const Churches = () => {
  const { userJobs } = useContext(MemberContext)
  const history = useHistory()

  return (
    <div>
      <p>Directory Churches</p>
      {userJobs.jobs.map((job, index) => (
        <div
          key={index}
          onClick={() => {
            job.clickCard()
            history.push(job.link)
          }}
        >
          {job.church.name}
        </div>
      ))}
    </div>
  )
}

export default Churches
