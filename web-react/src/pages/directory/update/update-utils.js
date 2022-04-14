export const getChurchIdsFromObject = (churchList) => {
  const newArray = churchList.map((churchList) => churchList.id)

  return newArray
}
