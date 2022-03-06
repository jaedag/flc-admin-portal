import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'
import { alertMsg, capitalise, throwErrorMsg } from '../../../global-utils'

import { GET_CONSTITUENCY_BACENTAS } from '../../../queries/ListQueries'
import {
  ADD_BACENTA_FELLOWSHIPS,
  REMOVE_BACENTA_CONSTITUENCY,
  UPDATE_BACENTA_MUTATION,
  REMOVE_FELLOWSHIP_BACENTA,
  ADD_BACENTA_CONSTITUENCY,
} from './UpdateMutations'
import { ChurchContext } from '../../../contexts/ChurchContext'
import { DISPLAY_BACENTA } from '../display/ReadQueries'
import { LOG_BACENTA_HISTORY, LOG_FELLOWSHIP_HISTORY } from './LogMutations'
import { MAKE_BACENTA_LEADER } from './ChangeLeaderMutations'
import BacentaForm from '../../../components/reusable-forms/BacentaForm'
import { MAKE_FELLOWSHIP_INACTIVE } from './CloseChurchMutations'
import {
  MAKE_BACENTA_GRADUATED,
  MAKE_BACENTA_IC,
  SET_ACTIVE_BACENTA,
  SET_VACATION_BACENTA,
} from './StatusChanges'

const UpdateBacenta = () => {
  const { church, bacentaId, setConstituencyId } = useContext(ChurchContext)
  const { data: bacentaData, loading: bacentaLoading } = useQuery(
    DISPLAY_BACENTA,
    {
      variables: { id: bacentaId },
    }
  )

  const navigate = useNavigate()
  const bacenta = bacentaData?.bacentas[0]

  const initialValues = {
    name: bacenta?.name,
    leaderName: bacenta?.leader?.fullName ?? '',
    leaderId: bacenta?.leader?.id || '',
    constituency: bacenta?.constituency?.id,
    fellowships: bacenta?.fellowships.length ? bacenta?.fellowships : [''],
    zone: bacenta?.zone.number,
    graduationStatus: bacenta?.graduationStatus,
    vacationStatus: bacenta?.vacationStatus,
  }

  const [LogBacentaHistory] = useMutation(LOG_BACENTA_HISTORY)

  const [LogFellowshipHistory] = useMutation(LOG_FELLOWSHIP_HISTORY, {
    refetchQueries: [{ query: DISPLAY_BACENTA, variables: { id: bacentaId } }],
  })

  const [MakeBacentaLeader] = useMutation(MAKE_BACENTA_LEADER)
  const [MakeBacentaIC] = useMutation(MAKE_BACENTA_IC)
  const [MakeBacentaGraduated] = useMutation(MAKE_BACENTA_GRADUATED)
  const [SetBacentaOnVacation] = useMutation(SET_VACATION_BACENTA)
  const [SetBacentaActive] = useMutation(SET_ACTIVE_BACENTA)
  const [UpdateBacenta] = useMutation(UPDATE_BACENTA_MUTATION, {
    refetchQueries: [
      {
        query: GET_CONSTITUENCY_BACENTAS,
        variables: { id: initialValues.constituency },
      },
    ],
  })

  //Changes downwards.ie. Changes to the Fellowships underneath the Bacenta
  const [AddBacentaFellowships] = useMutation(ADD_BACENTA_FELLOWSHIPS)
  const [CloseDownFellowship] = useMutation(MAKE_FELLOWSHIP_INACTIVE)
  const [RemoveFellowshipFromBacenta] = useMutation(REMOVE_FELLOWSHIP_BACENTA, {
    onCompleted: (data) => {
      let prevBacenta = data.updateBacentas.bacentas[0]
      let fellowship = data.updateFellowships.fellowships[0]
      let newBacentaId = ''
      let oldBacentaId = ''
      let historyRecord

      if (prevBacenta.id === bacentaId) {
        //Fellowship has previous bacenta which is current bacenta and is going
        oldBacentaId = bacentaId
        newBacentaId = ''
        historyRecord = `${fellowship.name} Fellowship has been closed down under ${initialValues.name} Bacenta`
      } else if (prevBacenta.id !== bacentaId) {
        //Fellowship has previous bacenta which is not current bacenta and is joining
        oldBacentaId = prevBacenta.id
        newBacentaId = bacentaId
        historyRecord = `${fellowship.name} Fellowship has been moved to ${initialValues.name} Bacenta from ${prevBacenta.name} Bacenta`
      }

      //After removing the fellowship from a bacenta, then you log that change.
      LogFellowshipHistory({
        variables: {
          fellowshipId: fellowship.id,
          newLeaderId: '',
          oldLeaderId: '',
          newBacentaId: newBacentaId,
          oldBacentaId: oldBacentaId,
          historyRecord: historyRecord,
        },
      })
    },
  })

  //Changes upwards. ie. Changes to the Constituency the Bacenta is under

  const [RemoveBacentaConstituency] = useMutation(REMOVE_BACENTA_CONSTITUENCY)

  const [AddBacentaConstituency] = useMutation(ADD_BACENTA_CONSTITUENCY, {
    onCompleted: (data) => {
      const oldConstituency = bacenta?.constituency
      const newConstituency = data.updateBacentas.constituencies[0].constituency
      if (!oldConstituency) {
        //If There is no old Constituency
        let recordIfNooldConstituency = `${initialValues.name} Bacenta has been moved to ${newConstituency.name} Constituency`

        LogBacentaHistory({
          variables: {
            bacentaId: bacentaId,
            newLeaderId: '',
            oldLeaderId: '',
            newConstituencyId: newConstituency.id,
            oldConstituencyId: oldConstituency.id,
            historyRecord: recordIfNooldConstituency,
          },
        })
      } else {
        //If there is an old Constituency

        //Break Link to the Old Constituency
        RemoveBacentaConstituency({
          variables: {
            constituencyId: oldConstituency.id,
            bacentaId: bacentaId,
          },
        })

        let recordIfoldConstituency = `${initialValues.name} Bacenta has been moved from ${oldConstituency.name} Constituency to ${newConstituency.name} Constituency`

        //After Adding the bacenta to a constituency, then you log that change.
        LogBacentaHistory({
          variables: {
            bacentaId: bacentaId,
            newLeaderId: '',
            oldLeaderId: '',
            newConstituencyId: newConstituency.id,
            oldConstituencyId: oldConstituency.id,
            historyRecord: recordIfoldConstituency,
          },
        })
      }
    },
  })

  //onSubmit receives the form state as argument
  const onSubmit = (values, onSubmitProps) => {
    onSubmitProps.setSubmitting(true)
    setConstituencyId(values.constituency)

    UpdateBacenta({
      variables: {
        bacentaId: bacentaId,
        name: values.name,
        leaderId: values.leaderId,
        constituencyId: values.constituency,
        zone: parseInt(values.zone),
      },
    })
      .then(() => {
        //Log if Bacenta Name Changes
        if (values.name !== initialValues.name) {
          LogBacentaHistory({
            variables: {
              bacentaId: bacentaId,
              newLeaderId: '',
              oldLeaderId: '',
              oldConstituencyId: '',
              newConstituencyId: '',
              historyRecord: `Bacenta name has been changed from ${initialValues.name} to ${values.name}`,
            },
          })
        }

        if (values.zone !== initialValues.zone) {
          LogBacentaHistory({
            variables: {
              bacentaId: bacentaId,
              newLeaderId: '',
              oldLeaderId: '',
              oldConstituencyId: '',
              newConstituencyId: '',
              historyRecord: `Bacenta has been moved from Zone ${initialValues.zone} to Zone ${values.zone}`,
            },
          })
        }

        //Change from IC to Graduated
        if (values.graduationStatus !== initialValues.graduationStatus) {
          if (values.graduationStatus === 'IC') {
            MakeBacentaIC({
              variables: {
                bacentaId: bacentaId,
              },
            })
          }

          if (values.graduationStatus === 'Graduated') {
            MakeBacentaGraduated({ variables: { bacentaId: bacentaId } })
          }
        }

        //Change if the vacation status changes
        if (values.vacationStatus !== initialValues.vacationStatus) {
          if (values.vacationStatus === 'Vacation') {
            SetBacentaOnVacation({
              variables: {
                bacentaId: bacentaId,
              },
            })
          }
          if (values.vacationStatus === 'Active') {
            SetBacentaActive({
              variables: {
                bacentaId: bacentaId,
              },
            })
          }
        }

        //Log if the Leader Changes
        if (values.leaderId !== initialValues.leaderId) {
          return MakeBacentaLeader({
            variables: {
              oldLeaderId: initialValues.leaderId || 'old-leader',
              newLeaderId: values.leaderId,
              bacentaId: bacentaId,
            },
          })
            .then(() => {
              alertMsg('Leader Changed Successfully')
              navigate(`/bacenta/displaydetails`)
            })
            .catch((error) =>
              throwErrorMsg('There was an error changing the leader', error)
            )
        }

        //Log If The Constituency Changes
        if (values.constituency !== initialValues.constituency) {
          RemoveBacentaConstituency({
            variables: {
              constituencyId: initialValues.constituency,
              bacentaId: bacentaId,
            },
          })
          AddBacentaConstituency({
            variables: {
              constituencyId: values.constituency,
              bacentaId: bacentaId,
            },
          })
        }

        //For the adding and removing of fellowships
        const oldFellowshipList = initialValues.fellowships.map(
          (fellowship) => {
            return fellowship.id
          }
        )

        const newFellowshipList = values.fellowships.map((fellowship) => {
          return fellowship.id ? fellowship.id : fellowship
        })

        const removeFellowships = oldFellowshipList.filter(function (value) {
          return !newFellowshipList.includes(value)
        })

        const addFellowships = values.fellowships.filter(function (value) {
          return !oldFellowshipList.includes(value.id)
        })

        if (removeFellowships.length) {
          removeFellowships.forEach((fellowship) => {
            CloseDownFellowship({
              variables: {
                fellowshipId: fellowship ?? '',
              },
            }).catch((error) => throwErrorMsg(error))
          })
        }

        if (addFellowships.length) {
          addFellowships.forEach((fellowship) => {
            if (fellowship.bacenta) {
              RemoveFellowshipFromBacenta({
                variables: {
                  bacentaId: fellowship.bacenta.id,
                  fellowshipIds: [fellowship.id],
                },
              })
            } else {
              //Fellowship has no previous bacenta and is now joining. ie. CloseDownFellowship won't run
              LogFellowshipHistory({
                variables: {
                  fellowshipId: fellowship.id,
                  newLeaderId: '',
                  oldLeaderId: '',
                  newBacentaId: bacentaId,
                  oldBacentaId: '',
                  historyRecord: `${fellowship.name} 
              Fellowship has been started again under ${initialValues.name} Bacenta`,
                },
              })
            }

            AddBacentaFellowships({
              variables: {
                bacentaId: bacentaId,
                fellowshipId: [fellowship.id],
              },
            })
          })
        }

        onSubmitProps.setSubmitting(false)
        onSubmitProps.resetForm()
        navigate(`/bacenta/displaydetails`)
      })
      .catch((error) =>
        throwErrorMsg('There was an error updating this bacenta', error)
      )
  }

  return (
    <BacentaForm
      initialValues={initialValues}
      onSubmit={onSubmit}
      title={`${capitalise(church.subChurch)} Update Form`}
      loading={bacentaLoading}
    />
  )
}

export default UpdateBacenta
