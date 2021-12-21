import Directory from 'pages/dashboards/Directory'
import Churches from 'pages/directory/Churches'
import UserDisplayPage from 'pages/user-profile/DisplayPage'
import DisplayMember from 'pages/display/DetailsMember'
import UserProfileEditPage from 'pages/user-profile/EditPage'
import CreateMember from 'pages/create/CreateMember'
import UpdateMember from 'pages/update/UpdateMember'
import SearchPageMobile from 'pages/mobile/SearchPage'
import MembersGrid from 'components/members-grids/MembersGrid'
import CouncilMembers from 'pages/grids/CouncilMembers'
import ConstituencyMembers from 'pages/grids/ConstituencyMembers'
import BacentaMembers from 'pages/grids/BacentaMembers'
import FellowshipMembers from 'pages/grids/FellowshipMembers'
import SontaMembers from 'pages/grids/SontaMembers'
import DetailsFellowship from 'pages/display/DetailsFellowship'
import DetailsBacenta from 'pages/display/DetailsBacenta'
import DetailsConstituency from 'pages/display/DetailsConstituency'
import DetailsCouncil from 'pages/display/DetailsCouncil'
import DetailsStream from 'pages/display/DetailsStream'
import DetailsSonta from 'pages/display/DetailsSonta'
import DisplayAllBacentas from 'pages/display/AllBacentas'
import DisplayAllSontas from 'pages/display/AllSontas'
import DisplaySontasByConstituency from 'pages/display/SontasByConstituency'
import DisplayAllConstituencies from 'pages/display/AllConstituencies'
import DisplayAllFellowships from 'pages/display/AllFellowships'
import CreateConstituency from 'pages/create/CreateConstituency'
import CreateBacenta from 'pages/create/CreateBacenta'
import CreateFellowship from 'pages/create/CreateFellowship'
import CreateSonta from 'pages/create/CreateSonta'
import UpdateFellowship from 'pages/update/UpdateFellowship'
import UpdateBacenta from 'pages/update/UpdateBacenta'
import UpdateSonta from 'pages/update/UpdateSonta'
import UpdateConstituency from 'pages/update/UpdateConstituency'
import DetailsGatheringService from 'pages/display/DetailsGatheringService.jsx'
import DisplayAllCouncils from 'pages/display/AllCouncils'
import DisplayAllStreams from 'pages/display/AllStreams'
import CreateCouncil from 'pages/create/CreateCouncil'

export const churchDirectory = [
  {
    path: '/directory/churches',
    component: Churches,
    exact: true,
  },
]

export const memberDirectory = [
  {
    path: '/directory/members',
    component: MembersGrid,
    exact: true,
  },
]
export const memberGrids = [
  {
    path: '/council/members',
    component: CouncilMembers,
    roles: ['adminFederal', 'adminCouncil'],
    exact: true,
  },
  {
    path: '/constituency/members',
    component: ConstituencyMembers,
    roles: ['adminFederal', 'adminCouncil', 'adminConstituency'],
    exact: true,
  },

  {
    path: '/bacenta/members',
    component: BacentaMembers,
    roles: ['adminFederal', 'adminCouncil', 'adminConstituency'],
    exact: true,
  },
  {
    path: '/fellowship/members',
    component: FellowshipMembers,
    roles: [
      'adminFederal',
      'adminCouncil',
      'adminConstituency',
      'leaderFellowship',
    ],
    exact: true,
  },
  {
    path: '/sonta/members',
    component: SontaMembers,
    roles: ['adminFederal', 'adminCouncil', 'adminConstituency', 'leaderSonta'],
    exact: true,
  },
]

export const directory = [
  {
    path: '/directory',
    component: Directory,
    placeholder: true,
    exact: true,
  },
  // Member Display and Edit Pages
  {
    path: '/user-profile',
    component: UserDisplayPage,
    roles: ['all'],
    placeholder: true,
    exact: true,
  },
  {
    path: '/member/displaydetails',
    component: DisplayMember,
    roles: ['all'],
    placeholder: true,
    exact: true,
  },
  {
    path: '/user-profile/edit',
    component: UserProfileEditPage,
    roles: ['all'],
    placeholder: true,
    exact: true,
  },
  {
    path: '/member/addmember',
    component: CreateMember,
    roles: [
      'adminFederal',
      'adminCouncil',
      'adminConstituency',
      'leaderConstituency',
      'leaderBacenta',
      'leaderFellowship',
    ],
    placeholder: true,
    exact: true,
  },
  {
    path: '/member/editmember',
    component: UpdateMember,
    roles: [
      'adminFederal',
      'adminCouncil',
      'adminConstituency',
      'leaderBacenta',
      'leaderConstituency',
    ],
    placeholder: true,
    exact: true,
  },

  //Search Routes
  {
    path: '/search-results',
    component: SearchPageMobile,
    roles: ['all'],
    placeholder: true,
    exact: true,
  },

  //Display Church Details
  {
    path: '/fellowship/displaydetails',
    component: DetailsFellowship,
    roles: ['all'],
    placeholder: true,
    exact: true,
  },
  {
    path: '/bacenta/displaydetails',
    component: DetailsBacenta,
    roles: ['all'],
    placeholder: true,
    exact: true,
  },
  {
    path: '/constituency/displaydetails',
    component: DetailsConstituency,
    roles: [
      'adminFederal',
      'adminCouncil',
      'adminConstituency',
      'leaderCouncil',
      'leaderConstituency',
    ],
    placeholder: true,
    exact: true,
  },

  {
    path: '/council/displaydetails',
    component: DetailsCouncil,
    roles: ['adminFederal', 'adminCouncil', 'leaderCouncil'],
    placeholder: true,
    exact: true,
  },
  {
    path: '/stream/displaydetails',
    component: DetailsStream,
    roles: ['adminFederal', 'adminStream'],
    placeholder: false,
    exact: true,
  },
  {
    path: '/gatheringservice/displaydetails',
    component: DetailsGatheringService,
    roles: ['adminFederal'],
    placeholder: false,
    exact: true,
  },
  {
    path: '/sonta/displaydetails',
    component: DetailsSonta,
    roles: ['all'],
    placeholder: true,
    exact: true,
  },

  //Display Lists in the Directory
  {
    path: '/bacenta/displayall',
    component: DisplayAllBacentas,
    roles: ['all'],
    placeholder: false,
    exact: true,
  },
  {
    path: '/sonta/displayall',
    component: DisplayAllSontas,
    roles: ['all'],
    placeholder: false,
    exact: true,
  },
  {
    path: '/constituency/display-sontas',
    component: DisplaySontasByConstituency,
    roles: ['all'],
    placeholder: false,
    exact: true,
  },

  {
    path: '/constituency/displayall',
    component: DisplayAllConstituencies,
    roles: ['adminFederal', 'adminCouncil'],
    placeholder: false,
    exact: true,
  },

  {
    path: '/fellowship/displayall',
    component: DisplayAllFellowships,
    roles: ['all'],
    placeholder: false,
    exact: true,
  },
  {
    path: '/council/displayall',
    component: DisplayAllCouncils,
    roles: ['adminFederal', 'adminStream'],
    placeholder: false,
    exact: true,
  },
  {
    path: '/stream/displayall',
    component: DisplayAllStreams,
    roles: ['adminFederal'],
    placeholder: false,
    exact: true,
  },

  //Creation Pages
  {
    path: '/fellowship/addfellowship',
    component: CreateFellowship,
    roles: ['adminFederal', 'adminCouncil', 'adminConstituency'],
    placeholder: false,
    exact: true,
  },
  {
    path: '/bacenta/addbacenta',
    component: CreateBacenta,
    roles: ['adminFederal', 'adminCouncil', 'adminConstituency'],
    placeholder: false,
    exact: true,
  },
  {
    path: '/sonta/addsonta',
    component: CreateSonta,
    roles: ['adminFederal', 'adminCouncil', 'adminConstituency'],
    placeholder: false,
    exact: true,
  },
  {
    path: '/constituency/addconstituency',
    component: CreateConstituency,
    roles: ['adminFederal', 'adminCouncil'],
    placeholder: false,
    exact: true,
  },

  {
    path: '/council/addcouncil',
    component: CreateCouncil,
    roles: ['adminFederal', 'adminStream'],
    placeholder: false,
    exact: true,
  },

  //Pages to Update the Directory
  {
    path: '/fellowship/editfellowship',
    component: UpdateFellowship,
    roles: ['adminFederal', 'adminCouncil', 'adminConstituency'],
    placeholder: false,
    exact: true,
  },
  {
    path: '/bacenta/editbacenta',
    component: UpdateBacenta,
    roles: ['adminFederal', 'adminCouncil', 'adminConstituency'],
    placeholder: false,
    exact: true,
  },
  {
    path: '/sonta/editsonta',
    component: UpdateSonta,
    roles: ['adminFederal', 'adminCouncil', 'adminConstituency'],
    placeholder: false,
    exact: true,
  },
  {
    path: '/constituency/editconstituency',
    component: UpdateConstituency,
    roles: ['adminFederal', 'adminCouncil'],
    placeholder: false,
    exact: true,
  },
]
