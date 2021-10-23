import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'
import { GET_CENTRE_BACENTAS } from '../../queries/ListQueries'
import {
  ADD_BACENTA_CENTRE,
  REMOVE_BACENTA_CENTRE,
  UPDATE_BACENTA,
} from './UpdateMutations'
import { ChurchContext } from '../../contexts/ChurchContext'
import { DISPLAY_BACENTA } from '../display/ReadQueries'
import { LOG_BACENTA_HISTORY } from './LogMutations'
import { MAKE_BACENTA_LEADER } from './ChangeLeaderMutations'
import BacentaForm from 'components/reusable-forms/BacentaForm'
import { alertMsg, repackDecimals, throwErrorMsg } from 'global-utils'

const UpdateBacenta = () => {
  const { setCentreId, bacentaId } = useContext(ChurchContext)

  const {
    data: bacentaData,
    loading: bacentaLoading,
    // error: bacentaError,
  } = useQuery(DISPLAY_BACENTA, {
    variables: { id: bacentaId },
  })

  const history = useHistory()

  const bacenta = bacentaData?.bacentas[0]

  const initialValues = {
    bacentaName: bacenta?.name,
    leaderId: bacenta?.leader?.id,
    leaderName: `${bacenta?.leader?.firstName} ${bacenta?.leader?.lastName} `,
    townCampusSelect: bacenta?.centre?.town?.id ?? bacenta?.centre?.campus?.id,
    centreSelect: bacenta?.centre?.id,
    meetingDay: bacenta?.meetingDay?.day,
    venueLatitude: repackDecimals(bacenta?.location?.latitude),
    venueLongitude: repackDecimals(bacenta?.location?.longitude),
  }

  const [LogBacentaHistory] = useMutation(LOG_BACENTA_HISTORY)
  const [MakeBacentaLeader] = useMutation(MAKE_BACENTA_LEADER)
  const [UpdateBacenta] = useMutation(UPDATE_BACENTA, {
    refetchQueries: [
      {
        query: GET_CENTRE_BACENTAS,
        variables: { id: initialValues.centreSelect },
      },
    ],
  })

  const [RemoveBacentaCentre] = useMutation(REMOVE_BACENTA_CENTRE)

  const [AddBacentaCentre] = useMutation(ADD_BACENTA_CENTRE, {
    onCompleted: (data) => {
      if (initialValues.centreSelect) {
        //Remove Link to the old Bacenta
        RemoveBacentaCentre({
          variables: {
            centreId: initialValues.centreSelect,
            bacentaId: bacentaId,
          },
        })
      }

      //After Adding the bacenta to a centre, then you log that change.
      LogBacentaHistory({
        variables: {
          bacentaId: bacentaId,
          newLeaderId: '',
          oldLeaderId: '',
          newCentreId: data.updateBacentas.bacentas[0]?.centre.id ?? '',
          oldCentreId: bacenta?.centre ? bacenta?.centre.id : null,
          historyRecord: `${initialValues.bacentaName} Bacenta has been moved from ${bacenta?.centre.name} Centre to ${data.updateBacentas.bacentas[0]?.centre.name} Centre`,
        },
      })
    },
  })

  //onSubmit receives the form state as argument
  const onSubmit = (values, onSubmitProps) => {
    setCentreId(values.centreSelect)
    values.venueLongitude = parseFloat(values.venueLongitude)
    values.venueLatitude = parseFloat(values.venueLatitude)

    UpdateBacenta({
      variables: {
        id: bacentaId,
        name: values.bacentaName,
        leaderId: values.leaderId,
        meetingDay: values.meetingDay,
        venueLongitude: values.venueLongitude,
        venueLatitude: values.venueLatitude,
      },
    }).catch((error) =>
      throwErrorMsg('There was an error updating this bacenta', error)
    )

    //Log If The Centre Changes
    if (values.centreSelect !== initialValues.centreSelect) {
      AddBacentaCentre({
        variables: {
          centreId: values.centreSelect,
          bacentaId: bacentaId,
        },
      })
    }

    //Log if the Bacenta Name Changes
    if (values.bacentaName !== initialValues.bacentaName) {
      LogBacentaHistory({
        variables: {
          bacentaId: bacentaId,
          newLeaderId: '',
          oldLeaderId: '',
          oldCentreId: '',
          newCentreId: '',

          historyRecord: `The Bacenta name has been changed from ${initialValues.bacentaName} to ${values.bacentaName}`,
        },
      })
    }

    // Log if the Meeting Day Changes
    if (values.meetingDay !== initialValues.meetingDay) {
      LogBacentaHistory({
        variables: {
          bacentaId: bacentaId,
          newLeaderId: '',
          oldLeaderId: '',
          oldCentreId: '',
          newCentreId: '',

          historyRecord: `${values.bacentaName} Bacenta has changed their meeting day from ${initialValues.meetingDay} to ${values.meetingDay}`,
        },
      })
    }

    //Log if the Venue Changes
    if (
      repackDecimals(values.venueLongitude) !== initialValues.venueLongitude ||
      repackDecimals(values.venueLatitude) !== initialValues.venueLatitude
    ) {
      LogBacentaHistory({
        variables: {
          bacentaId: bacentaId,
          newLeaderId: '',
          oldLeaderId: '',
          oldCentreId: '',
          newCentreId: '',

          historyRecord: `${values.bacentaName} Bacenta has changed their venue`,
        },
      })
    }

    //Log if the Leader Changes
    if (values.leaderId !== initialValues.leaderId) {
      MakeBacentaLeader({
        variables: {
          oldLeaderId: initialValues.leaderId,
          newLeaderId: values.leaderId,
          bacentaId: bacentaId,
        },
      })
        .then(() => alertMsg('Leader Changed Successfully'))
        .catch((err) =>
          throwErrorMsg('There was a problem changing bacenta leader', err)
        )
    }

    onSubmitProps.setSubmitting(false)
    onSubmitProps.resetForm()
    history.push(`/bacenta/displaydetails`)
  }

  return (
    <BacentaForm
      title="Update Bacenta"
      initialValues={initialValues}
      onSubmit={onSubmit}
      loadingState={bacentaLoading}
    />
  )
}

export default UpdateBacenta
