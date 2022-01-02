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
    ],
  },
  {
    name: 'Arrivals',
    to: '/arrivals',
    roles: [
      'leaderConstituency',
      'adminConstituency',
      'adminCouncil',
      'adminFederal',
    ],
  },
  {
    name: 'Campaigns',
    to: '/campaigns',
    roles: [
      'leaderConstituency',
      'adminConstituency',
      'adminCouncil',
      'adminFederal',
    ],
  },
  {
    name: 'Maps',
    to: '/maps',
    Icon: FlagFill,
    roles: ['all'],
  },
  {
    name: 'Reconciliation',
    to: '/recon',
    roles: ['adminFederal'],
  },
]
