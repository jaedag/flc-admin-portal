export const filterPastoralTitles = (pastoralApppointmentOptions) => {
  const filteredOptions = pastoralApppointmentOptions.filter(
    (pastoralAppointment) => {
      if (pastoralAppointment.date) {
        return pastoralAppointment
      }
      return null
    }
  )

  return filteredOptions
}
