import {
  BookFill,
  FlagFill,
  JournalCheck,
  PencilSquare,
  Speedometer2,
  Truck,
} from 'react-bootstrap-icons'

export const menuItems = [
  { name: 'Home', to: '/', Icon: Speedometer2, exact: true },
  {
    name: 'Directory',
    exact: true,
    to: '/directory',
    subMenus: [
      { name: 'Members', to: '/directory/members' },
      { name: 'Churches', to: '/directory/churches' },
    ],
    Icon: BookFill,
  },
  { name: 'Services', to: '/services', Icon: PencilSquare },
  { name: 'Arrivals', to: '/arrivals', Icon: Truck },
  { name: 'Campaigns', to: '/campaigns', Icon: FlagFill },
  { name: 'Reconciliation', to: '/recon', Icon: JournalCheck },
]
