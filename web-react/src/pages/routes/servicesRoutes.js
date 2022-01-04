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
import BankingSlipSubmission from 'pages/services/BankingSlipSubmission'
import BankingSlipView from 'pages/services/BankingSlipView'
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
    path: '/services/fellowship',
    element: Fellowship,
    roles: ['all'],
    placeholder: true,
  },
  {
    path: '/services/bacenta',
    element: BacentaJoint,
    roles: [
      'adminCouncil',
      'adminConstituency',

      'adminFederal',
      'leaderBacenta',
    ],
    placeholder: true,
  },
  {
    path: '/services/constituency',
    element: ConstituencyJoint,
    roles: [
      'adminCouncil',
      'adminConstituency',
      'adminFederal',
      'leaderConstituency',
    ],
    placeholder: true,
  },

  {
    path: '/services/banking-slips',
    element: BankingSlipView,
    roles: ['all'],
    placeholder: true,
  },
  {
    path: '/services/banking-slip/submission',
    element: BankingSlipSubmission,
    roles: ['all'],
    placeholder: true,
  },
]

export const reports = [
  {
    path: '/fellowship/reports',
    element: FellowshipReport,
    roles: [
      'adminFederal',
      'adminCouncil',
      'adminConstituency',

      'leaderFellowship',
      'leaderBacenta',
      'leaderConstituency',
    ],
    placeholder: true,
  },
  {
    path: '/bacenta/reports',
    element: BacentaReport,
    roles: [
      'adminFederal',
      'adminCouncil',
      'adminConstituency',

      'leaderFellowship',
      'leaderBacenta',
      'leaderConstituency',
    ],
    placeholder: true,
  },
  {
    path: '/sonta/reports',
    element: SontaReport,
    roles: [
      'adminFederal',
      'adminCouncil',
      'adminConstituency',
      'leaderBacenta',
      'leaderSonta',
      'leaderConstituency',
    ],
    placeholder: true,
  },
  {
    path: '/constituency/reports',
    element: ConstituencyReport,
    roles: [
      'adminFederal',
      'adminCouncil',
      'adminConstituency',
      'leaderConstituency',
    ],
    placeholder: true,
  },

  {
    path: '/council/reports',
    element: CouncilReport,
    roles: ['adminFederal', 'adminStream', 'adminCouncil'],
    placeholder: true,
  },
  {
    path: '/stream/reports',
    element: StreamReport,
    roles: ['adminFederal', 'adminStream'],
    placeholder: true,
  },
  {
    path: '/gatheringservice/reports',
    element: GatheringServiceReport,
    roles: ['adminFederal'],
    placeholder: true,
  },

  //Fellowship Services
  {
    path: '/fellowship/service-details',
    element: FellowshipServiceDetails,
    roles: ['adminFederal', 'adminStream', 'adminCouncil', 'adminConstituency'],
    placeholder: true,
  },
  {
    path: '/services/fellowship/no-service',
    element: FellowshipServiceCancelled,
    roles: ['adminFederal', 'adminStream', 'adminCouncil', 'adminConstituency'],
    placeholder: true,
  },
  {
    path: '/services/fellowship/form',
    element: FellowshipService,
    roles: [
      'adminFederal',
      'adminCouncil',
      'adminConstituency',

      'leaderFellowship',
    ],
    placeholder: false,
  },
  {
    path: '/fellowship/record-service',
    element: FellowshipService,
    roles: [
      'adminFederal',
      'adminCouncil',
      'adminConstituency',

      'leaderFellowship',
    ],
    placeholder: false,
  },

  {
    path: '/services/constituency-joint/form',
    element: ConstituencyService,
    roles: [
      'adminFederal',
      'adminCouncil',
      'adminConstituency',
      'leaderConstituency',
    ],
    placeholder: false,
  },
  {
    path: '/bacenta/record-service',
    element: BacentaService,
    roles: [
      'adminFederal',
      'adminCouncil',
      'adminConstituency',

      'leaderBacenta',
    ],
    placeholder: false,
  },

  //Sonta Service Details
  {
    path: '/sonta/record-service',
    element: SontaService,
    roles: [
      'adminFederal',
      'adminCouncil',
      'adminConstituency',

      'leaderConstituency',

      'leaderSonta',
    ],
    placeholder: false,
  },
  {
    path: '/sonta/service-details',
    element: SontaServiceDetails,
    roles: [
      'adminFederal',
      'adminCouncil',
      'adminConstituency',

      'leaderConstituency',

      'leaderBacenta',
    ],
    placeholder: false,
  },

  //Bacenta Service Things
  {
    path: '/bacenta/service-details',
    element: BacentaServiceDetails,
    roles: [
      'adminFederal',
      'adminCouncil',
      'adminConstituency',

      'leaderConstituency',

      'leaderBacenta',
    ],
    placeholder: false,
  },

  //Constituency Services
  {
    path: '/constituency/record-service',
    element: ConstituencyService,
    roles: [
      'adminFederal',
      'adminCouncil',
      'adminConstituency',
      'leaderConstituency',
    ],
    placeholder: false,
  },
  {
    path: '/constituency/service-details',
    element: ConstituencyServiceDetails,
    roles: [
      'adminFederal',
      'adminCouncil',
      'adminConstituency',
      'leaderConstituency',
    ],
    placeholder: false,
  },

  //Defaulters Flow
  {
    path: '/services/defaulters',
    element: Defaulters,
    roles: [
      'adminFederal',
      'adminCouncil',
      'adminConstituency',
      'leaderConstituency',
    ],
    placeholder: true,
  },
  {
    path: '/services/form-defaulters',
    element: FormDefaulters,
    roles: [
      'adminFederal',
      'adminCouncil',
      'adminConstituency',
      'leaderConstituency',
    ],
    placeholder: true,
  },
  {
    path: '/services/banking-defaulters',
    element: BankingDefaulters,
    roles: [
      'adminFederal',
      'adminCouncil',
      'adminConstituency',
      'leaderConstituency',
    ],
    placeholder: true,
  },
  {
    path: '/services/banked',
    element: Banked,
    roles: [
      'adminFederal',
      'adminCouncil',
      'adminConstituency',
      'leaderConstituency',
    ],
    placeholder: true,
  },
  {
    path: '/services/filled-services',
    element: ServicesThisWeek,
    roles: [
      'adminFederal',
      'adminCouncil',
      'adminConstituency',
      'leaderConstituency',
    ],
    placeholder: true,
  },
  {
    path: '/services/cancelled-services',
    element: CancelledServicesThisWeek,
    roles: [
      'adminFederal',
      'adminCouncil',
      'adminConstituency',
      'leaderConstituency',
    ],
    placeholder: true,
  },

  //Council By Constituency
  {
    path: '/services/council-by-constituencies',
    element: CouncilByConstituency,
    roles: ['adminFederal', 'adminStream', 'adminCouncil', 'leaderCouncil'],
    placeholder: true,
  },
]
