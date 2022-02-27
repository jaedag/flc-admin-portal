import { permitLeaderAdminArrivals } from 'permission-utils'
import Arrivals from 'pages/arrivals/Arrivals'
import BacentaArrivals from 'pages/arrivals/BacentaArrivals'
import BacentasHaveBeenCounted from 'pages/arrivals/BacentasHaveBeenCounted'
import BacentasNotArrived from 'pages/arrivals/BacentasNotArrived'
import BacentasThatSubmitted from 'pages/arrivals/BacentasThatSubmitted'
import BusFormConfirmation from 'pages/arrivals/BusFormConfirmation'
import BusFormDetails from 'pages/arrivals/BusFormDetails'
import OnTheWaySubmission from 'pages/arrivals/OnTheWaySubmission'
import ConstituencyArrivals from 'pages/arrivals/ConstituencyArrivals'
import ConstituencyDashboard from 'pages/arrivals/ConstituencyDashboard'
import CouncilArrivals from 'pages/arrivals/CouncilArrivals'
import CouncilDashboard from './CouncilDashboard'
import MobilisationSubmission from './MobilisationSubmission'

export const arrivals = [
  {
    path: '/arrivals',
    element: Arrivals,
    placeholder: true,
    roles: permitLeaderAdminArrivals('Fellowship'),
  },

  //Main Arrivals Pages for the Different Churches
  {
    path: '/arrivals/bacentas',
    roles: permitLeaderAdminArrivals('Bacenta'),
    element: BacentaArrivals,
    placeholder: true,
  },
  {
    path: '/arrivals/constituencies',
    roles: permitLeaderAdminArrivals('Constituency'),
    element: ConstituencyArrivals,
    placeholder: true,
  },
  {
    path: '/arrivals/constituency/dashboard',
    roles: permitLeaderAdminArrivals('Constituency'),
    element: ConstituencyDashboard,
    placeholder: true,
  },
  {
    path: '/arrivals/councils',
    roles: permitLeaderAdminArrivals('Council'),
    element: CouncilArrivals,
    placeholder: true,
  },
  {
    path: '/arrivals/council/dashboard',
    roles: permitLeaderAdminArrivals('Council'),
    element: CouncilDashboard,
    placeholder: true,
  },

  //Bacenta Forms that need to be Filled
  {
    path: '/arrivals/submit-bus-picture',
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
    path: '/arrivals/bacentas-not-arrived',
    roles: permitLeaderAdminArrivals('Constituency'),
    element: BacentasNotArrived,
    placeholder: true,
  },
  {
    path: '/arrivals/bacentas-that-submitted',
    roles: permitLeaderAdminArrivals('Constituency'),
    element: BacentasThatSubmitted,
    placeholder: true,
  },
  {
    path: '/arrivals/bacentas-have-been-counted',
    roles: permitLeaderAdminArrivals('Constituency'),
    element: BacentasHaveBeenCounted,
    placeholder: true,
  },

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
]
