import {
  permitAdminArrivals,
  permitArrivalsHelper,
  permitLeaderAdminArrivals,
} from 'permission-utils'
import Arrivals from 'pages/arrivals/Arrivals'
import BacentaArrivals from 'pages/arrivals/BacentaArrivals'
import ConfirmBacentaArrival from 'pages/arrivals/ConfirmBacentaArrival'
import StateBacentasNoActivity from 'pages/arrivals/StateBacentasNoActivity'
import BacentasOnTheWay from 'pages/arrivals/StateBacentasOnTheWay'
import BusFormConfirmation from 'pages/arrivals/FormAttendanceConfirmation'
import BusFormDetails from 'pages/arrivals/BusFormDetails'
import OnTheWaySubmission from 'pages/arrivals/FormOnTheWaySubmission'
import ConstituencyDashboard from 'pages/arrivals/DashboardConstituency'
import CouncilDashboard from './DashboardCouncil'
import MobilisationSubmission from './FormMobilisationSubmission'
import MobilisationPicture from './PreMobilisationPicture'
import BacentasMobilising from './StateBacentasMobilising'
import StreamDashboard from './DashboardStream'
import ArrivalsHelpersStream from './ArrivalsHelpers/ArrivalsHelpersStream'
import GatheringSerivceDashboard from './DashboardGatheringService'
import BacentasHaveArrived from './StateBacentasArrived'
import ChurchBySubChurch from './ChurchBySubChurch'

export const arrivals = [
  {
    path: '/arrivals',
    element: Arrivals,
    placeholder: true,
    roles: [
      ...permitLeaderAdminArrivals('Fellowship'),
      ...permitArrivalsHelper('Stream'),
    ],
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
    roles: [
      ...permitLeaderAdminArrivals('Stream'),
      ...permitArrivalsHelper('Stream'),
    ],
    element: StreamDashboard,
    placeholder: true,
  },
  {
    path: '/arrivals/gatheringservice',
    roles: permitLeaderAdminArrivals('GatheringService'),
    element: GatheringSerivceDashboard,
    placeholder: true,
  },

  //Drilling Down
  {
    path: '/arrivals/council-by-constituency',
    roles: permitLeaderAdminArrivals('Council'),
    element: ChurchBySubChurch,
    placeholder: true,
  },
  {
    path: '/arrivals/stream-by-council',
    roles: permitLeaderAdminArrivals('Stream'),
    element: ChurchBySubChurch,
    placeholder: true,
  },
  {
    path: '/arrivals/gatheringservice-by-stream',
    roles: permitLeaderAdminArrivals('GatheringService'),
    element: ChurchBySubChurch,
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
    roles: [
      ...permitLeaderAdminArrivals('Constituency'),
      ...permitArrivalsHelper('Stream'),
    ],
    element: StateBacentasNoActivity,
    placeholder: true,
  },
  {
    path: '/arrivals/bacentas-mobilising',
    roles: [
      ...permitLeaderAdminArrivals('Constituency'),
      ...permitArrivalsHelper('Stream'),
    ],
    element: BacentasMobilising,
    placeholder: true,
  },
  {
    path: '/arrivals/bacentas-on-the-way',
    roles: [
      ...permitLeaderAdminArrivals('Constituency'),
      ...permitArrivalsHelper('Stream'),
    ],
    element: BacentasOnTheWay,
    placeholder: true,
  },
  {
    path: '/arrivals/confirm-bacenta-arrival',
    roles: permitLeaderAdminArrivals('Council'),
    element: ConfirmBacentaArrival,
    placeholder: true,
  },
  {
    path: '/arrivals/bacentas-have-arrived',
    roles: [
      ...permitLeaderAdminArrivals('Constituency'),
      ...permitArrivalsHelper('Stream'),
    ],
    element: BacentasHaveArrived,
    placeholder: true,
  },

  //Bacenta Forms
  {
    path: '/arrivals/submit-bus-attendance',
    roles: ['arrivalsHelperStream'],
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
    roles: permitAdminArrivals('Stream'),
    element: ArrivalsHelpersStream,
    placeholder: false,
  },
]
