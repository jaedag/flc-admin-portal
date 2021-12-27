import {
  BookFill,
  FlagFill,
  JournalCheck,
  PencilSquare,
  Speedometer2,
  Truck,
} from 'react-bootstrap-icons'

export const menuItems = [
  { name: 'Home', to: '/', Icon: Speedometer2, exact: true, roles: ['all'] },
  {
    name: 'Directory',
    exact: true,
    to: '/directory',
    subMenus: [
      { name: 'Members', to: '/directory/members' },
      { name: 'Churches', to: '/directory/churches' },
    ],
    Icon: BookFill,
    roles: ['all'],
  },
  {
    name: 'Services',
    to: '/services/church-list',
    Icon: PencilSquare,
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
    Icon: Truck,
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
    Icon: FlagFill,
    roles: [
      'leaderConstituency',
      'adminConstituency',
      'adminCouncil',
      'adminFederal',
    ],
  },
  {
    name: 'Reconciliation',
    to: '/recon',
    Icon: JournalCheck,
    roles: ['adminFederal'],
  },
]
