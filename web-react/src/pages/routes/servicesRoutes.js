import BacentaService from 'pages/record-service/BacentaService'
import BacentaServiceDetails from 'pages/record-service/BacentaServiceDetails'
import ConstituencyService from 'pages/record-service/ConstituencyService'
import ConstituencyServiceDetails from 'pages/record-service/ConstituencyServiceDetails'
import FellowshipService from 'pages/record-service/FellowshipService'
import FellowshipServiceCancelled from 'pages/record-service/FellowshipServiceCancelled'
import FellowshipServiceDetails from 'pages/record-service/FellowshipServiceDetails'
import SontaService from 'pages/record-service/SontaService'
import SontaServiceDetails from 'pages/record-service/SontaServiceDetails'
import BacentaReport from 'pages/reports/BacentaReport'
import ConstituencyReport from 'pages/reports/ConstituencyReport'
import CouncilReport from 'pages/reports/CouncilReport'
import FellowshipReport from 'pages/reports/FellowshipReport'
import SontaReport from 'pages/reports/SontaReport'
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

export const services = [
  {
    path: '/services',
    component: Services,
    roles: ['all'],
    placeholder: true,
    exact: true,
  },
  {
    path: '/services/church-list',
    component: ServicesChurchList,
    roles: ['all'],
    placeholder: true,
    exact: true,
  },
  {
    path: '/services/fellowship',
    component: Fellowship,
    roles: ['all'],
    placeholder: true,
    exact: true,
  },
  {
    path: '/services/bacenta',
    component: BacentaJoint,
    roles: [
      'adminCouncil',
      'adminConstituency',

      'adminFederal',
      'leaderBacenta',
    ],
    placeholder: true,
    exact: true,
  },
  {
    path: '/services/constituency',
    component: ConstituencyJoint,
    roles: [
      'adminCouncil',
      'adminConstituency',
      'adminFederal',
      'leaderConstituency',
    ],
    placeholder: true,
    exact: true,
  },

  {
    path: '/services/banking-slips',
    component: BankingSlipView,
    roles: ['all'],
    placeholder: true,
    exact: true,
  },
  {
    path: '/services/banking-slip/submission',
    component: BankingSlipSubmission,
    roles: ['all'],
    placeholder: true,
    exact: true,
  },
]

export const reports = [
  {
    path: '/fellowship/reports',
    component: FellowshipReport,
    roles: [
      'adminFederal',
      'adminCouncil',
      'adminConstituency',

      'leaderFellowship',
      'leaderBacenta',
      'leaderConstituency',
    ],
    placeholder: true,
    exact: true,
  },
  {
    path: '/bacenta/reports',
    component: BacentaReport,
    roles: [
      'adminFederal',
      'adminCouncil',
      'adminConstituency',

      'leaderFellowship',
      'leaderBacenta',
      'leaderConstituency',
    ],
    placeholder: true,
    exact: true,
  },
  {
    path: '/sonta/reports',
    component: SontaReport,
    roles: [
      'adminFederal',
      'adminCouncil',
      'adminConstituency',
      'leaderBacenta',
      'leaderSonta',
      'leaderConstituency',
    ],
    placeholder: true,
    exact: true,
  },
  {
    path: '/constituency/reports',
    component: ConstituencyReport,
    roles: [
      'adminFederal',
      'adminCouncil',
      'adminConstituency',
      'leaderConstituency',
    ],
    placeholder: true,
    exact: true,
  },

  {
    path: '/council/reports',
    component: CouncilReport,
    roles: ['adminFederal', 'adminCouncil'],
    placeholder: true,
    exact: true,
  },

  //Fellowship Services
  {
    path: '/fellowship/service-details',
    component: FellowshipServiceDetails,
    roles: ['adminFederal', 'adminCouncil', 'adminConstituency'],
    placeholder: true,
    exact: true,
  },
  {
    path: '/services/fellowship/no-service',
    component: FellowshipServiceCancelled,
    roles: ['adminFederal', 'adminCouncil', 'adminConstituency'],
    placeholder: true,
    exact: true,
  },
  {
    path: '/services/fellowship/form',
    component: FellowshipService,
    roles: [
      'adminFederal',
      'adminCouncil',
      'adminConstituency',

      'leaderFellowship',
    ],
    placeholder: false,
    exact: true,
  },
  {
    path: '/fellowship/record-service',
    component: FellowshipService,
    roles: [
      'adminFederal',
      'adminCouncil',
      'adminConstituency',

      'leaderFellowship',
    ],
    placeholder: false,
    exact: true,
  },

  {
    path: '/services/constituency-joint/form',
    component: ConstituencyService,
    roles: [
      'adminFederal',
      'adminCouncil',
      'adminConstituency',
      'leaderConstituency',
    ],
    placeholder: false,
    exact: true,
  },
  {
    path: '/bacenta/record-service',
    component: BacentaService,
    roles: [
      'adminFederal',
      'adminCouncil',
      'adminConstituency',

      'leaderBacenta',
    ],
    placeholder: false,
    exact: true,
  },

  //Sonta Service Details
  {
    path: '/sonta/record-service',
    component: SontaService,
    roles: [
      'adminFederal',
      'adminCouncil',
      'adminConstituency',

      'leaderConstituency',

      'leaderSonta',
    ],
    placeholder: false,
    exact: true,
  },
  {
    path: '/sonta/service-details',
    component: SontaServiceDetails,
    roles: [
      'adminFederal',
      'adminCouncil',
      'adminConstituency',

      'leaderConstituency',

      'leaderBacenta',
    ],
    placeholder: false,
    exact: true,
  },

  //Bacenta Service Things
  {
    path: '/bacenta/service-details',
    component: BacentaServiceDetails,
    roles: [
      'adminFederal',
      'adminCouncil',
      'adminConstituency',

      'leaderConstituency',

      'leaderBacenta',
    ],
    placeholder: false,
    exact: true,
  },

  //Constituency Services
  {
    path: '/constituency/record-service',
    component: ConstituencyService,
    roles: [
      'adminFederal',
      'adminCouncil',
      'adminConstituency',
      'leaderConstituency',
    ],
    placeholder: false,
    exact: true,
  },
  {
    path: '/constituency/service-details',
    component: ConstituencyServiceDetails,
    roles: [
      'adminFederal',
      'adminCouncil',
      'adminConstituency',
      'leaderConstituency',
    ],
    placeholder: false,
    exact: true,
  },

  //Defaulters Flow
  {
    path: '/services/defaulters',
    component: Defaulters,
    roles: [
      'adminFederal',
      'adminCouncil',
      'adminConstituency',
      'leaderConstituency',
    ],
    placeholder: true,
    exact: true,
  },
  {
    path: '/services/form-defaulters',
    component: FormDefaulters,
    roles: [
      'adminFederal',
      'adminCouncil',
      'adminConstituency',
      'leaderConstituency',
    ],
    placeholder: true,
    exact: true,
  },
  {
    path: '/services/banking-defaulters',
    component: BankingDefaulters,
    roles: [
      'adminFederal',
      'adminCouncil',
      'adminConstituency',
      'leaderConstituency',
    ],
    placeholder: true,
    exact: true,
  },
  {
    path: '/services/banked',
    component: Banked,
    roles: [
      'adminFederal',
      'adminCouncil',
      'adminConstituency',
      'leaderConstituency',
    ],
    placeholder: true,
    exact: true,
  },
  {
    path: '/services/filled-services',
    component: ServicesThisWeek,
    roles: [
      'adminFederal',
      'adminCouncil',
      'adminConstituency',
      'leaderConstituency',
    ],
    placeholder: true,
    exact: true,
  },
  {
    path: '/services/cancelled-services',
    component: CancelledServicesThisWeek,
    roles: [
      'adminFederal',
      'adminCouncil',
      'adminConstituency',
      'leaderConstituency',
    ],
    placeholder: true,
    exact: true,
  },

  //Council By Constituency
  {
    path: '/services/council-by-constituencies',
    component: CouncilByConstituency,
    roles: ['adminFederal', 'adminCouncil', 'leaderCouncil'],
    placeholder: true,
    exact: true,
  },
]
