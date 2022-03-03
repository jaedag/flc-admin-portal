import BacentaService from 'pages/services/record-service/BacentaService'
import BacentaServiceDetails from 'pages/services/record-service/BacentaServiceDetails'
import ConstituencyService from 'pages/services/record-service/ConstituencyService'
import ConstituencyServiceDetails from 'pages/services/record-service/ConstituencyServiceDetails'
import FellowshipService from 'pages/services/record-service/FellowshipService'
import FellowshipServiceCancelled from 'pages/services/record-service/FellowshipServiceCancelled'
import FellowshipServiceDetails from 'pages/services/record-service/FellowshipServiceDetails'
import SontaService from 'pages/services/record-service/SontaService'
import SontaServiceDetails from 'pages/services/record-service/SontaServiceDetails'
import BacentaReport from 'pages/services/reports/BacentaReport'
import ConstituencyReport from 'pages/services/reports/ConstituencyReport'
import CouncilReport from 'pages/services/reports/CouncilReport'
import FellowshipReport from 'pages/services/reports/FellowshipReport'
import SontaReport from 'pages/services/reports/SontaReport'
import BacentaJoint from 'pages/services/BacentaJoint'
import FellowshipBankingSlipSubmission from 'pages/services/banking-slip/FellowshipSubmission'
import FellowshipBankingSlipView from 'pages/services/banking-slip/FellowshipView'
import ConstituencyJoint from 'pages/services/ConstituencyJoint'
import Banked from 'pages/services/defaulters/Banked'
import BankingDefaulters from 'pages/services/defaulters/BankingDefaulters'
import CancelledServicesThisWeek from 'pages/services/defaulters/CancelledServiceThisWeek'
import CouncilByConstituency from 'pages/services/defaulters/CouncilByConstituency'
import ShowDefaulters from 'pages/services/defaulters/ShowDefaulters'
import FormDefaulters from 'pages/services/defaulters/FormDefaulters'
import ServicesThisWeek from 'pages/services/defaulters/ServicesThisWeek'
import Fellowship from 'pages/services/Fellowship'
import ServicesChurchList from 'pages/services/ServicesChurchList'
import ServicesMenu from 'pages/services/ServicesMenu'
import StreamReport from 'pages/services/reports/StreamReport'
import GatheringServiceReport from 'pages/services/reports/GatheringServiceReport'
import StreamByCouncil from 'pages/services/defaulters/StreamByCouncil'
import GatheringServiceByStream from 'pages/services/defaulters/GatheringServiceByStream'
import { permitLeaderAdmin } from 'permission-utils'
import ConstituencyBankingSlipView from 'pages/services/banking-slip/ConstituencyView'
import ConstituencyBankingSlipSubmission from 'pages/services/banking-slip/ConstituencySubmission'
import CouncilService from 'pages/services/record-service/CouncilService'
import CouncilServiceDetails from 'pages/services/record-service/CouncilServiceDetails'
import CouncilBankingSlipView from 'pages/services/banking-slip/CouncilView'
import CouncilBankingSlipSubmission from 'pages/services/banking-slip/CouncilSubmission'
import CouncilJoint from 'pages/services/CouncilJoint'
import StreamJoint from 'pages/services/StreamJoint'
import GatheringServiceJoint from 'pages/services/GatheringServiceJoint'
import StreamService from 'pages/services/record-service/StreamService'
import StreamServiceDetails from 'pages/services/record-service/StreamServiceDetails'
import GatheringServiceService from 'pages/services/record-service/GatheringServiceService'
import GatheringServiceServiceDetails from 'pages/services/record-service/GatheringServiceServiceDetails'
import Defaulters from './defaulters/Defaulters'

export const services = [
  {
    path: '/services',
    element: ServicesMenu,
    roles: permitLeaderAdmin('Fellowship'),
    placeholder: true,
  },
  {
    path: '/services/church-list',
    element: ServicesChurchList,
    roles: permitLeaderAdmin('Fellowship'),
    placeholder: true,
  },
  {
    path: '/fellowship/record-service',
    element: Fellowship,
    roles: permitLeaderAdmin('Fellowship'),
    placeholder: true,
  },
  {
    path: '/services/fellowship',
    element: Fellowship,
    roles: permitLeaderAdmin('Fellowship'),
    placeholder: true,
  },
  {
    path: '/services/bacenta',
    element: BacentaJoint,
    roles: permitLeaderAdmin('Bacenta'),
    placeholder: true,
  },
  {
    path: '/services/constituency',
    element: ConstituencyJoint,
    roles: permitLeaderAdmin('Constituency'),
    placeholder: true,
  },
  {
    path: '/services/council',
    element: CouncilJoint,
    roles: permitLeaderAdmin('Council'),
    placeholder: true,
  },
  {
    path: '/services/stream',
    element: StreamJoint,
    roles: permitLeaderAdmin('Stream'),
    placeholder: true,
  },
  {
    path: '/services/gatheringservice',
    element: GatheringServiceJoint,
    roles: permitLeaderAdmin('GatheringService'),
    placeholder: true,
  },

  {
    path: '/services/fellowship/banking-slips',
    element: FellowshipBankingSlipView,
    roles: ['leaderFellowship'],
    placeholder: true,
  },
  {
    path: '/services/constituency/banking-slips',
    element: ConstituencyBankingSlipView,
    roles: permitLeaderAdmin('Constituency'),
    placeholder: true,
  },
  {
    path: '/services/council/banking-slips',
    element: CouncilBankingSlipView,
    roles: permitLeaderAdmin('Council'),
    placeholder: true,
  },
  {
    path: '/fellowship/banking-slip/submission',
    element: FellowshipBankingSlipSubmission,
    roles: ['leaderFellowship'],
    placeholder: true,
  },
  {
    path: '/constituency/banking-slip/submission',
    element: ConstituencyBankingSlipSubmission,
    roles: ['leaderConstituency', 'adminConstituency'],
    placeholder: true,
  },
  {
    path: '/council/banking-slip/submission',
    element: CouncilBankingSlipSubmission,
    roles: ['leaderCouncil', 'adminCouncil', 'adminGatheringService'],
    placeholder: true,
  },
]

export const reports = [
  {
    path: '/fellowship/reports',
    element: FellowshipReport,
    roles: permitLeaderAdmin('Fellowship'),
    placeholder: true,
  },
  {
    path: '/bacenta/reports',
    element: BacentaReport,
    roles: permitLeaderAdmin('Bacenta'),
    placeholder: true,
  },
  {
    path: '/sonta/reports',
    element: SontaReport,
    roles: permitLeaderAdmin('Sonta'),
    placeholder: true,
  },
  {
    path: '/constituency/reports',
    element: ConstituencyReport,
    roles: permitLeaderAdmin('Constituency'),
    placeholder: true,
  },

  {
    path: '/council/reports',
    element: CouncilReport,
    roles: permitLeaderAdmin('Council'),
    placeholder: true,
  },
  {
    path: '/stream/reports',
    element: StreamReport,
    roles: permitLeaderAdmin('Stream'),
    placeholder: true,
  },
  {
    path: '/gatheringservice/reports',
    element: GatheringServiceReport,
    roles: permitLeaderAdmin('GatheringService'),
    placeholder: true,
  },

  //Fellowship Services
  {
    path: '/fellowship/service-details',
    element: FellowshipServiceDetails,
    roles: permitLeaderAdmin('Fellowship'),
    placeholder: true,
  },
  {
    path: '/services/fellowship/no-service',
    element: FellowshipServiceCancelled,
    roles: permitLeaderAdmin('Fellowship'),
    placeholder: true,
  },
  {
    path: '/fellowship/record-service',
    element: FellowshipService,
    roles: permitLeaderAdmin('Fellowship'),
    placeholder: false,
  },

  //Sonta Service Details
  {
    path: '/sonta/record-service',
    element: SontaService,
    roles: permitLeaderAdmin('Sonta'),
    placeholder: false,
  },
  {
    path: '/sonta/service-details',
    element: SontaServiceDetails,
    roles: permitLeaderAdmin('Sonta'),
    placeholder: false,
  },

  //Bacenta Service Things
  {
    path: '/bacenta/record-service',
    element: BacentaService,
    roles: permitLeaderAdmin('Bacenta'),
    placeholder: false,
  },
  {
    path: '/bacenta/service-details',
    element: BacentaServiceDetails,
    roles: permitLeaderAdmin('Bacenta'),
    placeholder: false,
  },

  //Constituency Services
  {
    path: '/constituency/record-service',
    element: ConstituencyService,
    roles: permitLeaderAdmin('Constituency'),
    placeholder: false,
  },
  {
    path: '/constituency/service-details',
    element: ConstituencyServiceDetails,
    roles: permitLeaderAdmin('Constituency'),
    placeholder: false,
  },

  //Council Services
  {
    path: '/council/record-service',
    element: CouncilService,
    roles: permitLeaderAdmin('Council'),
    placeholder: false,
  },
  {
    path: '/council/service-details',
    element: CouncilServiceDetails,
    roles: permitLeaderAdmin('Council'),
    placeholder: false,
  },

  //Stream Services
  {
    path: '/stream/record-service',
    element: StreamService,
    roles: permitLeaderAdmin('Stream'),
    placeholder: false,
  },
  {
    path: '/stream/service-details',
    element: StreamServiceDetails,
    roles: permitLeaderAdmin('Stream'),
    placeholder: false,
  },

  //Gathering Service Services
  {
    path: '/gatheringservice/record-service',
    element: GatheringServiceService,
    roles: permitLeaderAdmin('GatheringService'),
    placeholder: false,
  },
  {
    path: '/gatheringservice/service-details',
    element: GatheringServiceServiceDetails,
    roles: permitLeaderAdmin('GatheringService'),
    placeholder: false,
  },

  //Defaulters Flow
  {
    path: '/services/defaulters',
    element: Defaulters,
    roles: permitLeaderAdmin('Constituency'),
    placeholder: true,
  },
  {
    path: '/services/defaulters/dashboard',
    element: ShowDefaulters,
    roles: permitLeaderAdmin('Constituency'),
    placeholder: true,
  },
  {
    path: '/services/form-defaulters',
    element: FormDefaulters,
    roles: permitLeaderAdmin('Constituency'),
    placeholder: true,
  },
  {
    path: '/services/banking-defaulters',
    element: BankingDefaulters,
    roles: permitLeaderAdmin('Constituency'),
    placeholder: true,
  },
  {
    path: '/services/banked',
    element: Banked,
    roles: permitLeaderAdmin('Constituency'),
    placeholder: true,
  },
  {
    path: '/services/filled-services',
    element: ServicesThisWeek,
    roles: permitLeaderAdmin('Constituency'),
    placeholder: true,
  },
  {
    path: '/services/cancelled-services',
    element: CancelledServicesThisWeek,
    roles: permitLeaderAdmin('Constituency'),
    placeholder: true,
  },

  //Council By Constituency

  {
    path: '/services/council-by-constituency',
    element: CouncilByConstituency,
    roles: permitLeaderAdmin('Council'),
    placeholder: true,
  },
  //Stream By Council
  {
    path: '/services/stream-by-council',
    element: StreamByCouncil,
    roles: permitLeaderAdmin('Stream'),
    placeholder: true,
  },
  //Gathering Service By Stream
  {
    path: '/services/gatheringservice-by-stream',
    element: GatheringServiceByStream,
    roles: permitLeaderAdmin('GatheringService'),
    placeholder: true,
  },
  //Stream By Council
  {
    path: '/services/stream-by-council',
    element: StreamByCouncil,
    roles: ['leaderFellowship'],
    placeholder: true,
  },
  //Gathering Service By Stream
  {
    path: '/services/gatheringservice-by-streams',
    element: GatheringServiceByStream,
    roles: ['leaderFellowship'],
    placeholder: true,
  },
]
