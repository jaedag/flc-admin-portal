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
      'leaderBacenta',
      'leaderCentre',
      'leaderTown',
      'adminTown',
      'leaderCampus',
      'adminCampus',
      'adminBishop',
    ],
  },
  {
    name: 'Arrivals',
    to: '/arrivals',
    Icon: Truck,
    roles: [
      'leaderTown',
      'adminTown',
      'leaderCampus',
      'adminCampus',
      'adminBishop',
    ],
  },
  {
    name: 'Campaigns',
    to: '/campaigns',
    Icon: FlagFill,
    roles: [
      'leaderTown',
      'adminTown',
      'leaderCampus',
      'adminCampus',
      'adminBishop',
    ],
  },
  { name: 'Reconciliation', to: '/recon', Icon: JournalCheck },
]
