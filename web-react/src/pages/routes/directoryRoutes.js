import Directory from 'pages/dashboards/Directory'
import Churches from 'pages/directory/Churches'
import UserDisplayPage from 'pages/user-profile/DisplayPage'
import DisplayMember from 'pages/display/DetailsMember'
import UserProfileEditPage from 'pages/user-profile/EditPage'
import CreateMember from 'pages/create/CreateMember'
import UpdateMember from 'pages/update/UpdateMember'
import SearchPageMobile from 'pages/mobile/SearchPage'
import MemberFiltersMobile from 'pages/mobile/MemberFilters'
import MembersGrid from 'components/members-grids/MembersGrid'
import CouncilMembers from 'pages/grids/CouncilMembers'
import CampusTownMembers from 'pages/grids/CampusTownMembers'
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
import DisplaySontasByCampusTown from 'pages/display/SontasByCampusTown'
import DisplayAllTownCampuses from 'pages/display/AllTownCampuses'
import DisplayAllFellowships from 'pages/display/AllFellowships'
import CreateTownCampus from 'pages/create/CreateTownCampus'
import CreateBacenta from 'pages/create/CreateBacenta'
import CreateFellowship from 'pages/create/CreateFellowship'
import CreateSonta from 'pages/create/CreateSonta'
import UpdateFellowship from 'pages/update/UpdateFellowship'
import UpdateBacenta from 'pages/update/UpdateBacenta'
import UpdateSonta from 'pages/update/UpdateSonta'
import UpdateTownCampus from 'pages/update/UpdateTownCampus'
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
    path: '/campus/members',
    component: CampusTownMembers,
    roles: ['adminFederal', 'adminCouncil', 'adminCampus'],
    exact: true,
  },
  {
    path: '/town/members',
    component: CampusTownMembers,
    roles: ['adminFederal', 'adminCouncil', 'adminTown'],
    exact: true,
  },
  {
    path: '/bacenta/members',
    component: BacentaMembers,
    roles: ['adminFederal', 'adminCouncil', 'adminCampus', 'adminTown'],
    exact: true,
  },
  {
    path: '/fellowship/members',
    component: FellowshipMembers,
    roles: [
      'adminFederal',
      'adminCouncil',
      'adminCampus',
      'adminTown',
      'leaderFellowship',
    ],
    exact: true,
  },
  {
    path: '/sonta/members',
    component: SontaMembers,
    roles: [
      'adminFederal',
      'adminCouncil',
      'adminCampus',
      'adminTown',
      'leaderSonta',
    ],
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
      'adminCampus',
      'adminTown',
      'leaderCampus',
      'leaderTown',
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
      'adminCampus',
      'adminTown',
      'leaderBacenta',
      'leaderTown',
      'leaderCampus',
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
  {
    path: '/filter-members',
    component: MemberFiltersMobile,
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
    path: '/town/displaydetails',
    component: DetailsConstituency,
    roles: [
      'adminFederal',
      'adminCouncil',
      'adminTown',
      'leaderCouncil',
      'leaderTown',
    ],
    placeholder: true,
    exact: true,
  },
  {
    path: '/campus/displaydetails',
    component: DetailsConstituency,
    roles: [
      'adminFederal',
      'adminCouncil',
      'adminCampus',
      'leaderCouncil',
      'leaderCampus',
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
    path: '/town/display-sontas',
    component: DisplaySontasByCampusTown,
    roles: ['all'],
    placeholder: false,
    exact: true,
  },
  {
    path: '/campus/display-sontas',
    component: DisplaySontasByCampusTown,
    roles: ['all'],
    placeholder: false,
    exact: true,
  },
  {
    path: '/town/displayall',
    component: DisplayAllTownCampuses,
    roles: ['adminFederal', 'adminCouncil'],
    placeholder: false,
    exact: true,
  },
  {
    path: '/campus/displayall',
    component: DisplayAllTownCampuses,
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
    roles: ['adminFederal', 'adminCouncil', 'adminCampus', 'adminTown'],
    placeholder: false,
    exact: true,
  },
  {
    path: '/bacenta/addbacenta',
    component: CreateBacenta,
    roles: ['adminFederal', 'adminCouncil', 'adminCampus', 'adminTown'],
    placeholder: false,
    exact: true,
  },
  {
    path: '/sonta/addsonta',
    component: CreateSonta,
    roles: ['adminFederal', 'adminCouncil', 'adminCampus', 'adminTown'],
    placeholder: false,
    exact: true,
  },
  {
    path: '/town/addtown',
    component: CreateTownCampus,
    roles: ['adminFederal', 'adminCouncil'],
    placeholder: false,
    exact: true,
  },
  {
    path: '/campus/addcampus',
    component: CreateTownCampus,
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
    roles: ['adminFederal', 'adminCouncil', 'adminCampus', 'adminTown'],
    placeholder: false,
    exact: true,
  },
  {
    path: '/bacenta/editbacenta',
    component: UpdateBacenta,
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
    path: '/sonta/editsonta',
    component: UpdateSonta,
    roles: ['adminFederal', 'adminCouncil', 'adminCampus', 'adminTown'],
    placeholder: false,
    exact: true,
  },
  {
    path: '/town/edittown',
    component: UpdateTownCampus,
    roles: ['adminFederal', 'adminCouncil'],
    placeholder: false,
    exact: true,
  },
  {
    path: '/campus/editcampus',
    component: UpdateTownCampus,
    roles: ['adminFederal', 'adminCouncil'],
    placeholder: false,
    exact: true,
  },
]
