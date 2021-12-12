import PlaceholderCustom from 'components/Placeholder'
import { ChurchContext } from 'contexts/ChurchContext'
import { ServiceContext } from 'contexts/ServiceContext'
import React, { useContext } from 'react'
import { Card, Button } from 'react-bootstrap'
import { TelephoneFill, Whatsapp } from 'react-bootstrap-icons'
import { useHistory } from 'react-router'

const DefaulterCard = ({ defaulter, link }) => {
  const { setFellowshipId } = useContext(ChurchContext)
  const { setServiceRecordId } = useContext(ServiceContext)
  const history = useHistory()

  const serviceDetails = defaulter?.services?.length && defaulter?.services[0]
  return (
    <Card>
      <PlaceholderCustom
        loading={!defaulter?.name}
        className={`fw-bold large-number pb-3`}
      >
        <Card.Header
          onClick={() => {
            setFellowshipId(defaulter?.id)

            history.push(
              `/${defaulter?.__typename.toLowerCase()}/displaydetails`
            )
          }}
          className="fw-bold"
        >
          {`${defaulter?.name} ${defaulter?.__typename}`}
          <br />
          {defaulter?.bacenta?.constituency?.name && (
            <span className="text-secondary">
              {`${defaulter?.bacenta?.constituency?.name} ${defaulter?.bacenta?.constituency?.__typename}`}
            </span>
          )}
        </Card.Header>
        <Card.Body>
          <Card.Text
            onClick={() => {
              setFellowshipId(defaulter?.id)
              setServiceRecordId(serviceDetails?.id)
              history.push(
                link || `/${defaulter?.__typename.toLowerCase()}/displaydetails`
              )
            }}
          >
            {defaulter?.leader?.fullName || 'No Leader'}
            {serviceDetails?.attendance && (
              <div>
                <span className="text-muted">Attendance: </span>
                {serviceDetails?.attendance}
              </div>
            )}
            {serviceDetails?.income && (
              <div>
                <span className="text-muted">Income: </span>
                GHS {serviceDetails?.income}
              </div>
            )}
            {serviceDetails?.noServiceReason && (
              <div>
                <span className="text-muted">Reason for No Service: </span>
                {serviceDetails?.noServiceReason}
              </div>
            )}
          </Card.Text>
          <a href={`tel:${defaulter?.leader?.phoneNumber}`}>
            <Button variant="primary">
              <TelephoneFill /> Call
            </Button>
          </a>
          <a
            href={`https://wa.me/${defaulter?.leader?.whatsappNumber}`}
            className="ms-3"
          >
            <Button variant="success">
              <Whatsapp /> WhatsApp
            </Button>
          </a>
        </Card.Body>
        <Card.Footer className="text-muted">{`Meeting Day: ${defaulter?.meetingDay?.day}`}</Card.Footer>
      </PlaceholderCustom>
    </Card>
  )
}

export default DefaulterCard
