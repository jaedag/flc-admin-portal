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
    component: ServantsDashboard,
    to: '/',
    Icon: Speedometer2,
    exact: true,
  },
  {
    name: 'Directory',
    component: Directory,
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
    component: Services,
    to: '/services',
    Icon: PencilSquare,
  },
  { name: 'Arrivals', component: Arrivals, to: '/arrivals', Icon: Truck },
  { name: 'Campaigns', component: Campaigns, to: '/campaigns', Icon: FlagFill },
  {
    name: 'Reconciliation',
    component: Reconciliation,
    to: '/recon',
    Icon: JournalCheck,
  },
]
