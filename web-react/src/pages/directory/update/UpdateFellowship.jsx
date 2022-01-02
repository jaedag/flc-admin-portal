import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'
import { GET_BACENTA_FELLOWSHIPS } from '../../../queries/ListQueries'
import {
  ADD_FELLOWSHIP_BACENTA,
  REMOVE_FELLOWSHIP_BACENTA,
  UPDATE_FELLOWSHIP,
} from './UpdateMutations'
import { ChurchContext } from '../../../contexts/ChurchContext'
import { DISPLAY_FELLOWSHIP } from '../display/ReadQueries'
import { LOG_FELLOWSHIP_HISTORY } from './LogMutations'
import { MAKE_FELLOWSHIP_LEADER } from './ChangeLeaderMutations'
import FellowshipForm from 'components/reusable-forms/FellowshipForm'
import { alertMsg, repackDecimals, throwErrorMsg } from 'global-utils'
import { SET_VACATION_FELLOWSHIP } from './CloseChurchMutations'

const UpdateFellowship = () => {
  const { setBacentaId, fellowshipId, setChurch } = useContext(ChurchContext)
  const {
    data: fellowshipData,
    loading: fellowshipLoading,
    // error: fellowshipError,
  } = useQuery(DISPLAY_FELLOWSHIP, {
    variables: { id: fellowshipId },
    onCompleted: (res) =>
      setChurch({
        church: res.fellowships[0].stream_name,
        subChurch: 'bacenta',
      }),
  })

  const navigate = useNavigate()

  const fellowship = fellowshipData?.fellowships[0]

  const initialValues = {
    fellowshipName: fellowship?.name,
    leaderId: fellowship?.leader?.id,
    leaderName: `${fellowship?.leader?.fullName} `,
    constituencySelect: fellowship?.bacenta?.constituency?.id,
    bacentaSelect: fellowship?.bacenta?.id,
    meetingDay: fellowship?.meetingDay?.day,
    vacationStatus: fellowship?.labels.includes('Vacation')
      ? 'Vacation'
      : 'Active',
    venueLatitude: repackDecimals(fellowship?.location?.latitude),
    venueLongitude: repackDecimals(fellowship?.location?.longitude),
  }

  const [LogFellowshipHistory] = useMutation(LOG_FELLOWSHIP_HISTORY)
  const [MakeFellowshipLeader] = useMutation(MAKE_FELLOWSHIP_LEADER)
  const [UpdateFellowship] = useMutation(UPDATE_FELLOWSHIP, {
    refetchQueries: [
      {
        query: GET_BACENTA_FELLOWSHIPS,
        variables: { id: initialValues.bacentaSelect },
      },
    ],
  })
  const [SetFellowshipOnVacation] = useMutation(SET_VACATION_FELLOWSHIP)
  const [RemoveFellowshipFromBacenta] = useMutation(REMOVE_FELLOWSHIP_BACENTA)

  const [AddFellowshipBacenta] = useMutation(ADD_FELLOWSHIP_BACENTA, {
    onCompleted: (data) => {
      if (initialValues.bacentaSelect) {
        //Remove Link to the old Fellowship
        RemoveFellowshipFromBacenta({
          variables: {
            bacentaId: initialValues.bacentaSelect,
            fellowshipIds: [fellowshipId],
          },
        })
      }

      //After Adding the fellowship to a bacenta, then you log that change.
      LogFellowshipHistory({
        variables: {
          fellowshipId: fellowshipId,
          newLeaderId: '',
          oldLeaderId: '',
          newBacentaId: data.updateFellowships.fellowships[0]?.bacenta.id ?? '',
          oldBacentaId: fellowship?.bacenta ? fellowship?.bacenta.id : null,
          historyRecord: `${initialValues.fellowshipName} Fellowship has been moved from ${fellowship?.bacenta.name} Bacenta to ${data.updateFellowships.fellowships[0]?.bacenta.name} Bacenta`,
        },
      })
    },
  })

  //onSubmit receives the form state as argument
  const onSubmit = (values, onSubmitProps) => {
    onSubmitProps.setSubmitting(true)
    setBacentaId(values.bacentaSelect)
    values.venueLongitude = parseFloat(values.venueLongitude)
    values.venueLatitude = parseFloat(values.venueLatitude)

    UpdateFellowship({
      variables: {
        id: fellowshipId,
        name: values.fellowshipName,
        leaderId: values.leaderId,
        meetingDay: values.meetingDay,
        venueLongitude: values.venueLongitude,
        venueLatitude: values.venueLatitude,
      },
    }).catch((error) =>
      throwErrorMsg('There was an error updating this fellowship', error)
    )

    //Log If The Bacenta Changes
    if (values.bacentaSelect !== initialValues.bacentaSelect) {
      AddFellowshipBacenta({
        variables: {
          bacentaId: values.bacentaSelect,
          fellowshipId: fellowshipId,
        },
      })
    }

    //Log if the Fellowship Name Changes
    if (values.fellowshipName !== initialValues.fellowshipName) {
      LogFellowshipHistory({
        variables: {
          fellowshipId: fellowshipId,
          newLeaderId: '',
          oldLeaderId: '',
          oldBacentaId: '',
          newBacentaId: '',

          historyRecord: `The Fellowship name has been changed from ${initialValues.fellowshipName} to ${values.fellowshipName}`,
        },
      })
    }

    // Log if the Meeting Day Changes
    if (values.meetingDay !== initialValues.meetingDay) {
      LogFellowshipHistory({
        variables: {
          fellowshipId: fellowshipId,
          newLeaderId: '',
          oldLeaderId: '',
          oldBacentaId: '',
          newBacentaId: '',

          historyRecord: `${values.fellowshipName} Fellowship has changed their meeting day from ${initialValues.meetingDay} to ${values.meetingDay}`,
        },
      })
    }

    // Log if the Meeting Day Changes
    if (values.vacationStatus !== initialValues.vacationStatus) {
      SetFellowshipOnVacation({
        variables: {
          fellowshipId: fellowshipId,
        },
      })
    }

    //Log if the Venue Changes
    if (
      repackDecimals(values.venueLongitude) !== initialValues.venueLongitude ||
      repackDecimals(values.venueLatitude) !== initialValues.venueLatitude
    ) {
      LogFellowshipHistory({
        variables: {
          fellowshipId: fellowshipId,
          newLeaderId: '',
          oldLeaderId: '',
          oldBacentaId: '',
          newBacentaId: '',

          historyRecord: `${values.fellowshipName} Fellowship has changed their venue`,
        },
      })
    }

    //Log if the Leader Changes
    if (values.leaderId !== initialValues.leaderId) {
      return MakeFellowshipLeader({
        variables: {
          oldLeaderId: initialValues.leaderId,
          newLeaderId: values.leaderId,
          fellowshipId: fellowshipId,
        },
      })
        .then(() => {
          alertMsg('Leader Changed Successfully')
          navigate(`/fellowship/displaydetails`)
        })
        .catch((err) =>
          throwErrorMsg('There was a problem changing fellowship leader', err)
        )
    }
    onSubmitProps.setSubmitting(false)
    onSubmitProps.resetForm()
    navigate(`/fellowship/displaydetails`)
  }

  return (
    <FellowshipForm
      title="Update Fellowship"
      initialValues={initialValues}
      onSubmit={onSubmit}
      loading={fellowshipLoading}
    />
  )
}

export default UpdateFellowship
