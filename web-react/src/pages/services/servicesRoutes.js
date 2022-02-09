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
import Defaulters from 'pages/services/defaulters/Defaulters'
import FormDefaulters from 'pages/services/defaulters/FormDefaulters'
import ServicesThisWeek from 'pages/services/defaulters/ServicesThisWeek'
import Fellowship from 'pages/services/Fellowship'
import ServicesChurchList from 'pages/services/ServicesChurchList'
import Services from 'pages/services/ServicesMenu'
import StreamReport from 'pages/services/reports/StreamReport'
import GatheringServiceReport from 'pages/services/reports/GatheringServiceReport'
import StreamByCouncil from 'pages/services/defaulters/StreamByCouncil'
import GatheringServiceByStream from 'pages/services/defaulters/GatheringServiceByStream'
import { permitMeAndThoseAbove } from 'global-utils'
import ConstituencyBankingSlipView from 'pages/services/banking-slip/ConstituencyView'
import ConstituencyBankingSlipSubmission from 'pages/services/banking-slip/ConstituencySubmission'
import CouncilService from 'pages/services/record-service/CouncilService'
import CouncilServiceDetails from 'pages/services/record-service/CouncilServiceDetails'
import CouncilBankingSlipView from 'pages/services/banking-slip/CouncilView'
import CouncilBankingSlipSubmission from 'pages/services/banking-slip/CouncilSubmission'

export const services = [
  {
    path: '/services',
    element: Services,
    roles: ['all'],
    placeholder: true,
  },
  {
    path: '/services/church-list',
    element: ServicesChurchList,
    roles: ['all'],
    placeholder: true,
  },
  {
    path: '/fellowship/record-service',
    element: Fellowship,
    roles: permitMeAndThoseAbove('Fellowship'),
    placeholder: true,
  },
  {
    path: '/services/bacenta',
    element: BacentaJoint,
    roles: permitMeAndThoseAbove('Bacenta'),
    placeholder: true,
  },
  {
    path: '/services/constituency',
    element: ConstituencyJoint,
    roles: permitMeAndThoseAbove('Constituency'),
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
    roles: permitMeAndThoseAbove('Constituency'),
    placeholder: true,
  },
  {
    path: '/services/council/banking-slips',
    element: CouncilBankingSlipView,
    roles: permitMeAndThoseAbove('Council'),
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
    roles: permitMeAndThoseAbove('Fellowship'),
    placeholder: true,
  },
  {
    path: '/bacenta/reports',
    element: BacentaReport,
    roles: permitMeAndThoseAbove('Bacenta'),
    placeholder: true,
  },
  {
    path: '/sonta/reports',
    element: SontaReport,
    roles: permitMeAndThoseAbove('Sonta'),
    placeholder: true,
  },
  {
    path: '/constituency/reports',
    element: ConstituencyReport,
    roles: permitMeAndThoseAbove('Constituency'),
    placeholder: true,
  },

  {
    path: '/council/reports',
    element: CouncilReport,
    roles: permitMeAndThoseAbove('Council'),
    placeholder: true,
  },
  {
    path: '/stream/reports',
    element: StreamReport,
    roles: permitMeAndThoseAbove('Stream'),
    placeholder: true,
  },
  {
    path: '/gatheringservice/reports',
    element: GatheringServiceReport,
    roles: permitMeAndThoseAbove('GatheringService'),
    placeholder: true,
  },

  //Fellowship Services
  {
    path: '/fellowship/service-details',
    element: FellowshipServiceDetails,
    roles: permitMeAndThoseAbove('Fellowship'),
    placeholder: true,
  },
  {
    path: '/services/fellowship/no-service',
    element: FellowshipServiceCancelled,
    roles: permitMeAndThoseAbove('Fellowship'),
    placeholder: true,
  },
  {
    path: '/fellowship/record-service',
    element: FellowshipService,
    roles: permitMeAndThoseAbove('Fellowship'),
    placeholder: false,
  },

  //Sonta Service Details
  {
    path: '/sonta/record-service',
    element: SontaService,
    roles: permitMeAndThoseAbove('Sonta'),
    placeholder: false,
  },
  {
    path: '/sonta/service-details',
    element: SontaServiceDetails,
    roles: permitMeAndThoseAbove('Sonta'),
    placeholder: false,
  },

  //Bacenta Service Things
  {
    path: '/bacenta/record-service',
    element: BacentaService,
    roles: permitMeAndThoseAbove('Bacenta'),
    placeholder: false,
  },
  {
    path: '/bacenta/service-details',
    element: BacentaServiceDetails,
    roles: permitMeAndThoseAbove('Bacenta'),
    placeholder: false,
  },

  //Constituency Services
  {
    path: '/constituency/record-service',
    element: ConstituencyService,
    roles: permitMeAndThoseAbove('Constituency'),
    placeholder: false,
  },
  {
    path: '/constituency/service-details',
    element: ConstituencyServiceDetails,
    roles: permitMeAndThoseAbove('Constituency'),
    placeholder: false,
  },

  //Council Services
  {
    path: '/council/record-service',
    element: CouncilService,
    roles: permitMeAndThoseAbove('Council'),
    placeholder: false,
  },
  {
    path: '/council/service-details',
    element: CouncilServiceDetails,
    roles: permitMeAndThoseAbove('Council'),
    placeholder: false,
  },

  //Defaulters Flow
  {
    path: '/services/defaulters',
    element: Defaulters,
    roles: permitMeAndThoseAbove('Constituency'),
    placeholder: true,
  },
  {
    path: '/services/form-defaulters',
    element: FormDefaulters,
    roles: permitMeAndThoseAbove('Constituency'),
    placeholder: true,
  },
  {
    path: '/services/banking-defaulters',
    element: BankingDefaulters,
    roles: permitMeAndThoseAbove('Constituency'),
    placeholder: true,
  },
  {
    path: '/services/banked',
    element: Banked,
    roles: permitMeAndThoseAbove('Constituency'),
    placeholder: true,
  },
  {
    path: '/services/filled-services',
    element: ServicesThisWeek,
    roles: permitMeAndThoseAbove('Constituency'),
    placeholder: true,
  },
  {
    path: '/services/cancelled-services',
    element: CancelledServicesThisWeek,
    roles: permitMeAndThoseAbove('Constituency'),
    placeholder: true,
  },

  //Council By Constituency

  {
    path: '/services/council-by-constituency',
    element: CouncilByConstituency,
    roles: permitMeAndThoseAbove('Council'),
    placeholder: true,
  },
  //Stream By Council
  {
    path: '/services/stream-by-council',
    element: StreamByCouncil,
    roles: permitMeAndThoseAbove('Stream'),
    placeholder: true,
  },
  //Gathering Service By Stream
  {
    path: '/services/gatheringservice-by-stream',
    element: GatheringServiceByStream,
    roles: permitMeAndThoseAbove('GatheringService'),
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
