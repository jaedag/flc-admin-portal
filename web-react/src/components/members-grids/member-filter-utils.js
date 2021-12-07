export const memberFilter = (memberData, filters) => {
  let filteredData = memberData

  const filterFor = (data, field, subfield, criteria, subsubfield) => {
    data = data.filter((member) => {
      if (
        subfield
          ? member[`${field}`] && member[`${field}`][`${subfield}`] === criteria
          : member[`${field}`][0]
      ) {
        return member
      }

      if (subsubfield === 'title') {
        for (let i = 0; i < member.title.length; i++) {
          if (member.title[i]?.title === criteria) {
            return member
          }
        }
      }
      return null
    })

    return data
  }

  //Filter for Gender
  if (filters.gender.length > 0 && filters.gender.length !== 2) {
    if (filters.gender.includes('Male')) {
      filteredData = filterFor(filteredData, 'gender', 'gender', 'Male')
    }
    if (filters.gender.includes('Female')) {
      filteredData = filterFor(filteredData, 'gender', 'gender', 'Female')
    }
  }

  //Filter for Marital Status
  if (filters.maritalStatus.length > 0 && filters.maritalStatus.length !== 2) {
    if (filters.maritalStatus.includes('Single')) {
      filteredData = filterFor(
        filteredData,
        'maritalStatus',
        'status',
        'Single'
      )
    }
    if (filters.maritalStatus.includes('Married')) {
      filteredData = filterFor(
        filteredData,
        'maritalStatus',
        'status',
        'Married'
      )
    }
  }

  //Filter for Ministry

  if (filters.ministry.length > 0) {
    let filteredByMinistry = []

    filters.ministry.map((ministryToFilter) => {
      filteredByMinistry = [
        ...new Set([
          ...filteredByMinistry,
          ...filterFor(filteredData, 'ministry', 'name', ministryToFilter),
        ]),
      ]
    })

    filteredData = filteredByMinistry
  }

  //Filter for Leadership Rank
  let leaderData = {
    admins: [],
    basontaLeaders: [],
    sontaLeaders: [],
    fellowshipLeaders: [],
    bacentaLeaders: [],
    cOs: [],
  }

  if (filters.leaderRank.includes('Admin')) {
    leaderData.admins = filteredData.filter((member) => {
      if (
        member.isAdminForTown[0] ||
        member.isAdminForCampus[0] ||
        member.isAdminForCouncil[0]
      ) {
        return member
      }
      return null
    })
  }
  if (filters.leaderRank.includes('Basonta Leader')) {
    leaderData.basontaLeaders = filterFor(filteredData, 'leadsBasonta')
  }
  if (filters.leaderRank.includes('Sonta Leader')) {
    leaderData.sontaLeaders = filterFor(filteredData, 'leadsSonta')
  }
  if (filters.leaderRank.includes('Fellowship Leader')) {
    leaderData.fellowshipLeaders = filterFor(filteredData, 'leadsFellowship')
  }
  if (filters.leaderRank.includes('Bacenta Leader')) {
    leaderData.bacentaLeaders = filterFor(filteredData, 'leadsBacenta')
  }
  if (filters.leaderRank.includes('CO')) {
    leaderData.cOs = filteredData.filter((member) => {
      if (member.leadsTown[0] || member.leadsCampus[0]) {
        return member
      }
      return null
    })
  }

  //Merge the Arrays without duplicates
  if (filters.leaderRank[0]) {
    filteredData = [
      ...new Set([
        ...leaderData.admins,
        ...leaderData.basontaLeaders,
        ...leaderData.sontaLeaders,
        ...leaderData.fellowshipLeaders,
        ...leaderData.bacentaLeaders,
        ...leaderData.cOs,
      ]),
    ]
  }

  //Filter for Pastors
  let leaderTitleData = {
    pastors: [],
    reverends: [],
    bishops: [],
  }

  if (filters.leaderTitle.includes('Pastor')) {
    leaderTitleData.pastors = filterFor(
      filteredData,
      'title',
      'Title',
      'Pastor',
      'title'
    )
  }
  if (filters.leaderTitle.includes('Reverend')) {
    leaderTitleData.reverends = filterFor(
      filteredData,
      'title',
      'Title',
      'Reverend',
      'title'
    )
  }
  if (filters.leaderTitle.includes('Bishop')) {
    leaderTitleData.bishops = filterFor(
      filteredData,
      'title',
      'Title',
      'Bishop',
      'title'
    )
  }

  //Merge the Arrays without duplicates
  if (filters.leaderTitle[0]) {
    filteredData = [
      ...new Set([
        ...leaderTitleData.pastors,
        ...leaderTitleData.reverends,
        ...leaderTitleData.bishops,
      ]),
    ]
  }

  return filteredData
}
