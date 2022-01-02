import Directory from 'pages/dashboards/Directory'
import Churches from 'pages/directory/Churches'
import UserDisplayPage from 'pages/directory/user-profile/DisplayPage'
import DisplayMember from 'pages/directory/display/DetailsMember'
import UserProfileEditPage from 'pages/directory/user-profile/EditPage'
import CreateMember from 'pages/directory/create/CreateMember'
import UpdateMember from 'pages/directory/update/UpdateMember'
import SearchPageMobile from 'pages/directory/mobile/SearchPage'
import MembersGrid from 'components/members-grids/MembersGrid'
import CouncilMembers from 'pages/directory/grids/CouncilMembers'
import ConstituencyMembers from 'pages/directory/grids/ConstituencyMembers'
import BacentaMembers from 'pages/directory/grids/BacentaMembers'
import FellowshipMembers from 'pages/directory/grids/FellowshipMembers'
import SontaMembers from 'pages/directory/grids/SontaMembers'
import DetailsFellowship from 'pages/directory/display/DetailsFellowship'
import DetailsBacenta from 'pages/directory/display/DetailsBacenta'
import DetailsConstituency from 'pages/directory/display/DetailsConstituency'
import DetailsCouncil from 'pages/directory/display/DetailsCouncil'
import DetailsStream from 'pages/directory/display/DetailsStream'
import DetailsSonta from 'pages/directory/display/DetailsSonta'
import DisplayAllBacentas from 'pages/directory/display/AllBacentas'
import DisplayAllSontas from 'pages/directory/display/AllSontas'
import DisplaySontasByConstituency from 'pages/directory/display/SontasByConstituency'
import DisplayAllConstituencies from 'pages/directory/display/AllConstituencies'
import DisplayAllFellowships from 'pages/directory/display/AllFellowships'
import CreateConstituency from 'pages/directory/create/CreateConstituency'
import CreateBacenta from 'pages/directory/create/CreateBacenta'
import CreateFellowship from 'pages/directory/create/CreateFellowship'
import CreateSonta from 'pages/directory/create/CreateSonta'
import UpdateFellowship from 'pages/directory/update/UpdateFellowship'
import UpdateBacenta from 'pages/directory/update/UpdateBacenta'
import UpdateSonta from 'pages/directory/update/UpdateSonta'
import UpdateConstituency from 'pages/directory/update/UpdateConstituency'
import DetailsGatheringService from 'pages/directory/display/DetailsGatheringService.jsx'
import DisplayAllCouncils from 'pages/directory/display/AllCouncils'
import DisplayAllStreams from 'pages/directory/display/AllStreams'
import CreateCouncil from 'pages/directory/create/CreateCouncil'
import GatheringServiceConstituencies from 'pages/directory/display/GatheringServiceConstituencies'

export const churchDirectory = [
  {
    path: '/directory/churches',
    element: Churches,
  },
]

export const memberDirectory = [
  {
    path: '/directory/members',
    element: MembersGrid,
  },
]
export const memberGrids = [
  {
    path: '/council/members',
    element: CouncilMembers,
    roles: ['adminFederal', 'adminCouncil'],
  },
  {
    path: '/constituency/members',
    element: ConstituencyMembers,
    roles: ['adminFederal', 'adminCouncil', 'adminConstituency'],
  },

  {
    path: '/bacenta/members',
    element: BacentaMembers,
    roles: ['adminFederal', 'adminCouncil', 'adminConstituency'],
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
  },
  {
    path: '/sonta/members',
    element: SontaMembers,
    roles: ['adminFederal', 'adminCouncil', 'adminConstituency', 'leaderSonta'],
  },
]

export const directory = [
  {
    path: '/directory',
    element: Directory,
    placeholder: true,
  },
  // Member Display and Edit Pages
  {
    path: '/user-profile',
    element: UserDisplayPage,
    roles: ['all'],
    placeholder: true,
  },
  {
    path: '/member/displaydetails',
    element: DisplayMember,
    roles: ['all'],
    placeholder: true,
  },
  {
    path: '/user-profile/edit',
    element: UserProfileEditPage,
    roles: ['all'],
    placeholder: true,
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
  },

  //Search Routes
  {
    path: '/search-results',
    element: SearchPageMobile,
    roles: ['all'],
    placeholder: true,
  },

  //Display Church Details
  {
    path: '/fellowship/displaydetails',
    element: DetailsFellowship,
    roles: ['all'],
    placeholder: true,
  },
  {
    path: '/bacenta/displaydetails',
    element: DetailsBacenta,
    roles: ['all'],
    placeholder: true,
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
  },

  {
    path: '/council/displaydetails',
    element: DetailsCouncil,
    roles: ['adminFederal', 'adminCouncil', 'leaderCouncil'],
    placeholder: true,
  },
  {
    path: '/stream/displaydetails',
    element: DetailsStream,
    roles: ['adminFederal', 'adminStream'],
    placeholder: false,
  },
  {
    path: '/gatheringservice/displaydetails',
    element: DetailsGatheringService,
    roles: ['adminFederal'],
    placeholder: false,
  },
  {
    path: '/gatheringservice/constituencies',
    element: GatheringServiceConstituencies,
    roles: ['adminFederal'],
    placeholder: false,
  },
  {
    path: '/sonta/displaydetails',
    element: DetailsSonta,
    roles: ['all'],
    placeholder: true,
  },

  //Display Lists in the Directory
  {
    path: '/bacenta/displayall',
    element: DisplayAllBacentas,
    roles: ['all'],
    placeholder: false,
  },
  {
    path: '/sonta/displayall',
    element: DisplayAllSontas,
    roles: ['all'],
    placeholder: false,
  },
  {
    path: '/constituency/display-sontas',
    element: DisplaySontasByConstituency,
    roles: ['all'],
    placeholder: false,
  },

  {
    path: '/constituency/displayall',
    element: DisplayAllConstituencies,
    roles: ['adminFederal', 'adminCouncil'],
    placeholder: false,
  },

  {
    path: '/fellowship/displayall',
    element: DisplayAllFellowships,
    roles: ['all'],
    placeholder: false,
  },
  {
    path: '/council/displayall',
    element: DisplayAllCouncils,
    roles: ['adminFederal', 'adminStream'],
    placeholder: false,
  },
  {
    path: '/stream/displayall',
    element: DisplayAllStreams,
    roles: ['adminFederal'],
    placeholder: false,
  },

  //Creation Pages
  {
    path: '/fellowship/addfellowship',
    element: CreateFellowship,
    roles: ['adminFederal', 'adminCouncil', 'adminConstituency'],
    placeholder: false,
  },
  {
    path: '/bacenta/addbacenta',
    element: CreateBacenta,
    roles: ['adminFederal', 'adminCouncil', 'adminConstituency'],
    placeholder: false,
  },
  {
    path: '/sonta/addsonta',
    element: CreateSonta,
    roles: ['adminFederal', 'adminCouncil', 'adminConstituency'],
    placeholder: false,
  },
  {
    path: '/constituency/addconstituency',
    element: CreateConstituency,
    roles: ['adminFederal', 'adminCouncil'],
    placeholder: false,
  },

  {
    path: '/council/addcouncil',
    element: CreateCouncil,
    roles: ['adminFederal', 'adminStream'],
    placeholder: false,
  },

  //Pages to Update the Directory
  {
    path: '/fellowship/editfellowship',
    element: UpdateFellowship,
    roles: ['adminFederal', 'adminCouncil', 'adminConstituency'],
    placeholder: false,
  },
  {
    path: '/bacenta/editbacenta',
    element: UpdateBacenta,
    roles: ['adminFederal', 'adminCouncil', 'adminConstituency'],
    placeholder: false,
  },
  {
    path: '/sonta/editsonta',
    element: UpdateSonta,
    roles: ['adminFederal', 'adminCouncil', 'adminConstituency'],
    placeholder: false,
  },
  {
    path: '/constituency/editconstituency',
    element: UpdateConstituency,
    roles: ['adminFederal', 'adminCouncil'],
    placeholder: false,
  },
]
