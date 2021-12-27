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
    element: Churches,
    exact: true,
  },
]

export const memberDirectory = [
  {
    path: '/directory/members',
    element: MembersGrid,
    exact: true,
  },
]
export const memberGrids = [
  {
    path: '/council/members',
    element: CouncilMembers,
    roles: ['adminFederal', 'adminCouncil'],
    exact: true,
  },
  {
    path: '/constituency/members',
    element: ConstituencyMembers,
    roles: ['adminFederal', 'adminCouncil', 'adminConstituency'],
    exact: true,
  },

  {
    path: '/bacenta/members',
    element: BacentaMembers,
    roles: ['adminFederal', 'adminCouncil', 'adminConstituency'],
    exact: true,
  },
  {
    path: '/fellowship/members',
    element: FellowshipMembers,
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
    element: SontaMembers,
    roles: ['adminFederal', 'adminCouncil', 'adminConstituency', 'leaderSonta'],
    exact: true,
  },
]

export const directory = [
  {
    path: '/directory',
    element: Directory,
    placeholder: true,
    exact: true,
  },
  // Member Display and Edit Pages
  {
    path: '/user-profile',
    element: UserDisplayPage,
    roles: ['all'],
    placeholder: true,
    exact: true,
  },
  {
    path: '/member/displaydetails',
    element: DisplayMember,
    roles: ['all'],
    placeholder: true,
    exact: true,
  },
  {
    path: '/user-profile/edit',
    element: UserProfileEditPage,
    roles: ['all'],
    placeholder: true,
    exact: true,
  },
  {
    path: '/member/addmember',
    element: CreateMember,
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
    element: UpdateMember,
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
    element: SearchPageMobile,
    roles: ['all'],
    placeholder: true,
    exact: true,
  },

  //Display Church Details
  {
    path: '/fellowship/displaydetails',
    element: DetailsFellowship,
    roles: ['all'],
    placeholder: true,
    exact: true,
  },
  {
    path: '/bacenta/displaydetails',
    element: DetailsBacenta,
    roles: ['all'],
    placeholder: true,
    exact: true,
  },
  {
    path: '/constituency/displaydetails',
    element: DetailsConstituency,
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
    element: DetailsCouncil,
    roles: ['adminFederal', 'adminCouncil', 'leaderCouncil'],
    placeholder: true,
    exact: true,
  },
  {
    path: '/stream/displaydetails',
    element: DetailsStream,
    roles: ['adminFederal', 'adminStream'],
    placeholder: false,
    exact: true,
  },
  {
    path: '/gatheringservice/displaydetails',
    element: DetailsGatheringService,
    roles: ['adminFederal'],
    placeholder: false,
    exact: true,
  },
  {
    path: '/sonta/displaydetails',
    element: DetailsSonta,
    roles: ['all'],
    placeholder: true,
    exact: true,
  },

  //Display Lists in the Directory
  {
    path: '/bacenta/displayall',
    element: DisplayAllBacentas,
    roles: ['all'],
    placeholder: false,
    exact: true,
  },
  {
    path: '/sonta/displayall',
    element: DisplayAllSontas,
    roles: ['all'],
    placeholder: false,
    exact: true,
  },
  {
    path: '/constituency/display-sontas',
    element: DisplaySontasByConstituency,
    roles: ['all'],
    placeholder: false,
    exact: true,
  },

  {
    path: '/constituency/displayall',
    element: DisplayAllConstituencies,
    roles: ['adminFederal', 'adminCouncil'],
    placeholder: false,
    exact: true,
  },

  {
    path: '/fellowship/displayall',
    element: DisplayAllFellowships,
    roles: ['all'],
    placeholder: false,
    exact: true,
  },
  {
    path: '/council/displayall',
    element: DisplayAllCouncils,
    roles: ['adminFederal', 'adminStream'],
    placeholder: false,
    exact: true,
  },
  {
    path: '/stream/displayall',
    element: DisplayAllStreams,
    roles: ['adminFederal'],
    placeholder: false,
    exact: true,
  },

  //Creation Pages
  {
    path: '/fellowship/addfellowship',
    element: CreateFellowship,
    roles: ['adminFederal', 'adminCouncil', 'adminConstituency'],
    placeholder: false,
    exact: true,
  },
  {
    path: '/bacenta/addbacenta',
    element: CreateBacenta,
    roles: ['adminFederal', 'adminCouncil', 'adminConstituency'],
    placeholder: false,
    exact: true,
  },
  {
    path: '/sonta/addsonta',
    element: CreateSonta,
    roles: ['adminFederal', 'adminCouncil', 'adminConstituency'],
    placeholder: false,
    exact: true,
  },
  {
    path: '/constituency/addconstituency',
    element: CreateConstituency,
    roles: ['adminFederal', 'adminCouncil'],
    placeholder: false,
    exact: true,
  },

  {
    path: '/council/addcouncil',
    element: CreateCouncil,
    roles: ['adminFederal', 'adminStream'],
    placeholder: false,
    exact: true,
  },

  //Pages to Update the Directory
  {
    path: '/fellowship/editfellowship',
    element: UpdateFellowship,
    roles: ['adminFederal', 'adminCouncil', 'adminConstituency'],
    placeholder: false,
    exact: true,
  },
  {
    path: '/bacenta/editbacenta',
    element: UpdateBacenta,
    roles: ['adminFederal', 'adminCouncil', 'adminConstituency'],
    placeholder: false,
    exact: true,
  },
  {
    path: '/sonta/editsonta',
    element: UpdateSonta,
    roles: ['adminFederal', 'adminCouncil', 'adminConstituency'],
    placeholder: false,
    exact: true,
  },
  {
    path: '/constituency/editconstituency',
    element: UpdateConstituency,
    roles: ['adminFederal', 'adminCouncil'],
    placeholder: false,
    exact: true,
  },
]
