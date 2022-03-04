import { permitLeaderAdminArrivals } from 'permission-utils'
import Arrivals from 'pages/arrivals/Arrivals'
import BacentaArrivals from 'pages/arrivals/BacentaArrivals'
import BacentasHaveBeenCounted from 'pages/arrivals/BacentasHaveBeenCounted'
import BacentasNotActivity from 'pages/arrivals/BacentasNoActivity'
import BacentasOnTheWay from 'pages/arrivals/BacentasOnTheWay'
import BusFormConfirmation from 'pages/arrivals/BusFormConfirmation'
import BusFormDetails from 'pages/arrivals/BusFormDetails'
import OnTheWaySubmission from 'pages/arrivals/OnTheWaySubmission'
import ConstituencyDashboard from 'pages/arrivals/ConstituencyDashboard'
import CouncilDashboard from './CouncilDashboard'
import MobilisationSubmission from './MobilisationSubmission'
import MobilisationPicture from './MobilisationPicture'

export const arrivals = [
  {
    path: '/arrivals',
    element: Arrivals,
    placeholder: true,
    roles: permitLeaderAdminArrivals('Fellowship'),
  },

  //Main Arrivals Pages for the Different Churches
  {
    path: '/arrivals/bacenta',
    roles: permitLeaderAdminArrivals('Bacenta'),
    element: BacentaArrivals,
    placeholder: true,
  },
  {
    path: '/arrivals/constituency',
    roles: permitLeaderAdminArrivals('Constituency'),
    element: ConstituencyDashboard,
    placeholder: true,
  },

  {
    path: '/arrivals/council',
    roles: permitLeaderAdminArrivals('Council'),
    element: CouncilDashboard,
    placeholder: true,
  },

  //Bacenta Forms that need to be Filled
  {
    path: '/arrivals/submit-on-the-way',
    roles: ['leaderBacenta'],
    element: OnTheWaySubmission,
    placeholder: false,
  },
  {
    path: '/arrivals/submit-mobilisation-picture',
    roles: ['leaderBacenta'],
    element: MobilisationSubmission,
    placeholder: false,
  },

  {
    path: '/arrivals/bacentas-no-activity',
    roles: permitLeaderAdminArrivals('Constituency'),
    element: BacentasNotActivity,
    placeholder: true,
  },
  {
    path: '/arrivals/bacentas-on-the-way',
    roles: permitLeaderAdminArrivals('Constituency'),
    element: BacentasOnTheWay,
    placeholder: true,
  },
  {
    path: '/arrivals/bacentas-have-been-counted',
    roles: permitLeaderAdminArrivals('Constituency'),
    element: BacentasHaveBeenCounted,
    placeholder: true,
  },

  //Bacenta Forms
  {
    path: '/arrivals/submit-bus-attendance',
    roles: ['arrivalsAdminConstituency'],
    element: BusFormConfirmation,
    placeholder: false,
  },
  {
    path: '/bacenta/bussing-details',
    roles: ['leaderBacenta'],
    element: BusFormDetails,
    placeholder: false,
  },
  {
    path: '/arrivals/mobilisation-picture',
    roles: permitLeaderAdminArrivals('Bacenta'),
    element: MobilisationPicture,
    placeholder: false,
  },
]
