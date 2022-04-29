import {
  permitArrivals,
  permitArrivalsHelpers,
  permitLeaderAdmin,
} from 'permission-utils'

export const menuItems = [
  { name: 'Home', to: '/', roles: ['all'] },
  {
    name: 'Directory',
    exact: true,
    to: '/directory',
    subMenus: [
      { name: 'Members', to: '/directory/members' },
      { name: 'Churches', to: '/directory/churches' },
    ],
    roles: ['all'],
  },
  {
    name: 'Services',
    to: '/services/church-list',
    roles: permitLeaderAdmin('Fellowship'),
  },
  {
    name: 'Arrivals',
    to: '/arrivals',
    roles: [
      ...permitLeaderAdmin('Bacenta'),
      ...permitArrivals('Bacenta'),
      ...permitArrivalsHelpers('Stream'),
    ],
  },
  {
    name: 'Campaigns',
    to: '/campaigns',
    roles: permitLeaderAdmin('Constituency'),
  },
  {
    name: 'Maps',
    to: '/maps',
    roles: ['adminGatheringService'],
  },
]
