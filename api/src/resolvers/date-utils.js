export const getHumanReadableDate = (date) => {
  if (!date) {
    return
  }
  return new Date(date).toLocaleDateString('en-gb', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  })
}
