import { permitLeaderAdminArrivals } from 'permission-utils'
// import Arrivals from 'pages/arrivals/Arrivals'
import BacentaArrivals from 'pages/arrivals/BacentaArrivals'
import BacentasHaveBeenCounted from 'pages/arrivals/StateBacentasHaveArrived'
import BacentasNotActivity from 'pages/arrivals/StateBacentasNoActivity'
import BacentasOnTheWay from 'pages/arrivals/StateBacentasOnTheWay'
import BusFormConfirmation from 'pages/arrivals/FormAttendanceConfirmation'
import BusFormDetails from 'pages/arrivals/BusFormDetails'
import OnTheWaySubmission from 'pages/arrivals/FormOnTheWaySubmission'
import ConstituencyDashboard from 'pages/arrivals/DashboardConstituency'
import CouncilDashboard from './DashboardCouncil'
import MobilisationSubmission from './FormMobilisationSubmission'
import MobilisationPicture from './MobilisationPicture'
import BacentasMobilising from './StateBacentasMobilising'
import StreamDashboard from './DashboardStream'
import ArrivalsHelpersStream from './ArrivalsHelpersStream'
import ArrivalsDummy from './ArrivalsDummy'

export const arrivals = [
  {
    path: '/arrivals',
    element: ArrivalsDummy,
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
  {
    path: '/arrivals/stream',
    roles: permitLeaderAdminArrivals('Stream'),
    element: StreamDashboard,
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
    path: '/arrivals/bacentas-mobilising',
    roles: permitLeaderAdminArrivals('Constituency'),
    element: BacentasMobilising,
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
    roles: permitLeaderAdminArrivals('Bacenta'),
    element: BusFormDetails,
    placeholder: false,
  },
  {
    path: '/arrivals/mobilisation-picture',
    roles: permitLeaderAdminArrivals('Bacenta'),
    element: MobilisationPicture,
    placeholder: false,
  },

  //Arrivals Helpers
  {
    path: '/stream/arrivals-helpers',
    roles: permitLeaderAdminArrivals('Bacenta'),
    element: ArrivalsHelpersStream,
    placeholder: false,
  },
]
