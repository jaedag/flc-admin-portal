import { permitMeAndThoseAbove } from 'global-utils'

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
    roles: [
      'leaderFellowship',
      'leaderBacenta',
      'leaderConstituency',
      'adminConstituency',
      'adminCouncil',
      'adminGatheringService',
    ],
  },
  {
    name: 'Arrivals',
    to: '/arrivals',
    roles: permitMeAndThoseAbove('Bacenta'),
  },
  {
    name: 'Campaigns',
    to: '/campaigns',
    roles: permitMeAndThoseAbove('Constituency'),
  },
  {
    name: 'Maps',
    to: '/maps',
    roles: ['adminGatheringService'],
  },
  {
    name: 'Reconciliation',
    to: '/recon',
    roles: ['adminGatheringService'],
  },
]
