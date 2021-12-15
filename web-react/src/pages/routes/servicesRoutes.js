import BacentaService from 'pages/record-service/BacentaService'
import BacentaServiceDetails from 'pages/record-service/BacentaServiceDetails'
import CampusService from 'pages/record-service/CampusService'
import CampusServiceDetails from 'pages/record-service/CampusServiceDetails'
import FellowshipService from 'pages/record-service/FellowshipService'
import FellowshipServiceCancelled from 'pages/record-service/FellowshipServiceCancelled'
import FellowshipServiceDetails from 'pages/record-service/FellowshipServiceDetails'
import SontaService from 'pages/record-service/SontaService'
import SontaServiceDetails from 'pages/record-service/SontaServiceDetails'
import TownService from 'pages/record-service/TownService'
import TownServiceDetails from 'pages/record-service/TownServiceDetails'
import BacentaReport from 'pages/reports/BacentaReport'
import CampusReport from 'pages/reports/CampusReport'
import CouncilReport from 'pages/reports/CouncilReport'
import FellowshipReport from 'pages/reports/FellowshipReport'
import SontaReport from 'pages/reports/SontaReport'
import TownReport from 'pages/reports/TownReport'
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
      'adminCampus',
      'adminTown',
      'adminFederal',
      'leaderBacenta',
    ],
    placeholder: true,
    exact: true,
  },
  {
    path: '/services/campus',
    component: ConstituencyJoint,
    roles: ['adminCouncil', 'adminCampus', 'adminFederal', 'leaderCampus'],
    placeholder: true,
    exact: true,
  },
  {
    path: '/services/town',
    component: ConstituencyJoint,
    roles: ['adminCouncil', 'adminTown', 'adminFederal', 'leaderTown'],
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
      'adminCampus',
      'adminTown',
      'leaderFellowship',
      'leaderBacenta',
      'leaderCampus',
      'leaderTown',
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
      'adminCampus',
      'adminTown',
      'leaderFellowship',
      'leaderBacenta',
      'leaderCampus',
      'leaderTown',
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
      'adminCampus',
      'adminTown',
      'leaderBacenta',
      'leaderSonta',
      'leaderCampus',
      'leaderTown',
    ],
    placeholder: true,
    exact: true,
  },
  {
    path: '/campus/reports',
    component: CampusReport,
    roles: ['adminFederal', 'adminCouncil', 'adminCampus', 'leaderCampus'],
    placeholder: true,
    exact: true,
  },
  {
    path: '/town/reports',
    component: TownReport,
    roles: ['adminFederal', 'adminCouncil', 'adminTown', 'leaderTown'],
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
    roles: ['adminFederal', 'adminCouncil', 'adminCampus', 'adminTown'],
    placeholder: true,
    exact: true,
  },
  {
    path: '/services/fellowship/no-service',
    component: FellowshipServiceCancelled,
    roles: ['adminFederal', 'adminCouncil', 'adminCampus', 'adminTown'],
    placeholder: true,
    exact: true,
  },
  {
    path: '/services/fellowship/form',
    component: FellowshipService,
    roles: [
      'adminFederal',
      'adminCouncil',
      'adminCampus',
      'adminTown',
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
      'adminCampus',
      'adminTown',
      'leaderFellowship',
    ],
    placeholder: false,
    exact: true,
  },
  {
    path: '/services/town/constituency-joint/form',
    component: TownService,
    roles: ['adminFederal', 'adminCouncil', 'adminTown', 'leaderTown'],
    placeholder: false,
    exact: true,
  },
  {
    path: '/services/campus/constituency-joint/form',
    component: CampusService,
    roles: ['adminFederal', 'adminCouncil', 'adminCampus', 'leaderCampus'],
    placeholder: false,
    exact: true,
  },
  {
    path: '/bacenta/record-service',
    component: BacentaService,
    roles: [
      'adminFederal',
      'adminCouncil',
      'adminCampus',
      'adminTown',
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
      'adminCampus',
      'adminTown',
      'leaderCampus',
      'leaderTown',
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
      'adminCampus',
      'adminTown',
      'leaderCampus',
      'leaderTown',
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
      'adminCampus',
      'adminTown',
      'leaderCampus',
      'leaderTown',
      'leaderBacenta',
    ],
    placeholder: false,
    exact: true,
  },

  //Town Service
  {
    path: '/town/record-service',
    component: TownService,
    roles: [
      'adminFederal',
      'adminCouncil',
      'adminCampus',
      'adminTown',
      'leaderTown',
    ],
    placeholder: false,
    exact: true,
  },
  {
    path: '/town/service-details',
    component: TownServiceDetails,
    roles: ['adminFederal', 'adminCouncil', 'adminTown', 'leaderTown'],
    placeholder: false,
    exact: true,
  },
  //Campus Services
  {
    path: '/campus/record-service',
    component: CampusService,
    roles: ['adminFederal', 'adminCouncil', 'adminCampus', 'leaderCampus'],
    placeholder: false,
    exact: true,
  },
  {
    path: '/town/service-details',
    component: CampusServiceDetails,
    roles: ['adminFederal', 'adminCouncil', 'adminCampus', 'leaderCampus'],
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
      'adminCampus',
      'leaderCampus',
      'adminTown',
      'leaderTown',
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
      'adminCampus',
      'leaderCampus',
      'adminTown',
      'leaderTown',
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
      'adminCampus',
      'leaderCampus',
      'adminTown',
      'leaderTown',
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
      'adminCampus',
      'leaderCampus',
      'adminTown',
      'leaderTown',
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
      'adminCampus',
      'leaderCampus',
      'adminTown',
      'leaderTown',
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
      'adminCampus',
      'leaderCampus',
      'adminTown',
      'leaderTown',
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
