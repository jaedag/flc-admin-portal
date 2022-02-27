import { permitArrivals } from 'permission-utils'
import Arrivals from 'pages/arrivals/Arrivals'
import BacentaArrivals from 'pages/arrivals/BacentaArrivals'
import BacentasHaveBeenCounted from 'pages/arrivals/BacentasHaveBeenCounted'
import BacentasNotArrived from 'pages/arrivals/BacentasNotArrived'
import BacentasThatSubmitted from 'pages/arrivals/BacentasThatSubmitted'
import BusFormConfirmation from 'pages/arrivals/BusFormConfirmation'
import BusFormDetails from 'pages/arrivals/BusFormDetails'
import BusFormSubmission from 'pages/arrivals/BusFormSubmission'
import ConstituencyArrivals from 'pages/arrivals/ConstituencyArrivals'
import ConstituencyDashboard from 'pages/arrivals/ConstituencyDashboard'
import CouncilArrivals from 'pages/arrivals/CouncilArrivals'
import CouncilDashboard from './CouncilDashboard'

export const arrivals = [
  {
    path: '/arrivals',
    element: Arrivals,
    placeholder: true,
    roles: permitArrivals('Fellowship'),
  },

  //Main Arrivals Pages for the Different Churches
  {
    path: '/arrivals/bacentas',
    roles: permitArrivals('Bacenta'),
    element: BacentaArrivals,
    placeholder: true,
  },
  {
    path: '/arrivals/constituencies',
    roles: permitArrivals('Constituency'),
    element: ConstituencyArrivals,
    placeholder: true,
  },
  {
    path: '/arrivals/constituency/dashboard',
    roles: permitArrivals('Constituency'),
    element: ConstituencyDashboard,
    placeholder: true,
  },
  {
    path: '/arrivals/councils',
    roles: permitArrivals('Council'),
    element: CouncilArrivals,
    placeholder: true,
  },
  {
    path: '/arrivals/council/dashboard',
    roles: permitArrivals('Council'),
    element: CouncilDashboard,
    placeholder: true,
  },

  //Forms that need to be Filled

  {
    path: '/arrivals/bacentas-not-arrived',
    roles: permitArrivals('Constituency'),
    element: BacentasNotArrived,
    placeholder: true,
  },
  {
    path: '/arrivals/bacentas-that-submitted',
    roles: permitArrivals('Constituency'),
    element: BacentasThatSubmitted,
    placeholder: true,
  },
  {
    path: '/arrivals/bacentas-have-been-counted',
    roles: permitArrivals('Constituency'),
    element: BacentasHaveBeenCounted,
    placeholder: true,
  },
  {
    path: '/arrivals/submit-bus-picture',
    roles: ['leaderBacenta'],
    element: BusFormSubmission,
    placeholder: false,
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
