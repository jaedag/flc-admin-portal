import Directory from './Directory'
import ServantsDashboard from './ServantsDashboard'
import Services from './Services'
import Arrivals from './Arrivals'
import Campaigns from './Campaigns'
import Reconciliation from './Reconciliation'
import {
  BookFill,
  FlagFill,
  JournalCheck,
  PencilSquare,
  Speedometer2,
  Truck,
} from 'react-bootstrap-icons'

export const menuItems = [
  {
    name: 'Home',
    Component: ServantsDashboard,
    to: '/',
    Icon: Speedometer2,
    exact: true,
  },
  {
    name: 'Directory',
    Component: Directory,
    exact: true,
    to: '/directory',
    subMenus: [
      { name: 'Members', to: '/directory/members' },
      { name: 'Churches', to: '/directory/churches' },
    ],
    Icon: BookFill,
  },
  {
    name: 'Services',
    Component: Services,
    to: '/services',
    Icon: PencilSquare,
  },
  { name: 'Arrivals', Component: Arrivals, to: '/arrivals', Icon: Truck },
  { name: 'Campaigns', Component: Campaigns, to: '/campaigns', Icon: FlagFill },
  {
    name: 'Reconciliation',
    Component: Reconciliation,
    to: '/recon',
    Icon: JournalCheck,
  },
]
