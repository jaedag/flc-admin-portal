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
import UpdateCouncil from 'pages/directory/update/UpdateCouncil'
import CreateStream from 'pages/directory/create/CreateStream'
import UpdateStream from 'pages/directory/update/UpdateStream'
import GatheringServiceMembers from 'pages/directory/grids/GatheringServiceMembers'
import StreamMembers from 'pages/directory/grids/StreamMembers'
import { permitAdminAndThoseAbove, permitMeAndThoseAbove } from 'global-utils'

export const memberDirectory = [
  {
    path: '/directory/members',
    element: MembersGrid,
    roles: ['all'],
  },
]
export const memberGrids = [
  {
    path: '/gatheringservice/members',
    element: GatheringServiceMembers,
    roles: permitMeAndThoseAbove('GatheringService'),
  },
  {
    path: '/stream/members',
    element: StreamMembers,
    roles: permitMeAndThoseAbove('Stream'),
  },
  {
    path: '/council/members',
    element: CouncilMembers,
    roles: permitMeAndThoseAbove('Council'),
  },
  {
    path: '/constituency/members',
    element: ConstituencyMembers,
    roles: permitMeAndThoseAbove('Constituency'),
  },

  {
    path: '/bacenta/members',
    element: BacentaMembers,
    roles: permitMeAndThoseAbove('Bacenta'),
  },
  {
    path: '/fellowship/members',
    element: FellowshipMembers,
    roles: permitMeAndThoseAbove('Fellowship'),
  },
  {
    path: '/sonta/members',
    element: SontaMembers,
    roles: permitMeAndThoseAbove('Sonta'),
  },
]

export const directory = [
  {
    path: '/directory',
    element: Directory,
    placeholder: true,
    roles: ['all'],
  },
  {
    path: '/directory/churches',
    element: Churches,
    roles: permitMeAndThoseAbove('Fellowship'),
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
    roles: permitMeAndThoseAbove('Fellowship'),
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
    roles: permitMeAndThoseAbove('Fellowship'),
    placeholder: true,
  },
  {
    path: '/member/editmember',
    element: UpdateMember,
    roles: permitMeAndThoseAbove('Constituency'),
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
    roles: permitMeAndThoseAbove('Fellowship'),
    placeholder: true,
  },
  {
    path: '/bacenta/displaydetails',
    element: DetailsBacenta,
    roles: permitMeAndThoseAbove('Bacenta'),
    placeholder: true,
  },
  {
    path: '/constituency/displaydetails',
    element: DetailsConstituency,
    roles: permitMeAndThoseAbove('Constituency'),
    placeholder: true,
  },

  {
    path: '/council/displaydetails',
    element: DetailsCouncil,
    roles: permitMeAndThoseAbove('Council'),
    placeholder: true,
  },
  {
    path: '/stream/displaydetails',
    element: DetailsStream,
    roles: permitAdminAndThoseAbove('Stream'),
    placeholder: false,
  },
  {
    path: '/gatheringservice/displaydetails',
    element: DetailsGatheringService,
    roles: permitMeAndThoseAbove('GatheringService'),
    placeholder: false,
  },
  {
    path: '/gatheringservice/constituencies',
    element: GatheringServiceConstituencies,
    roles: permitMeAndThoseAbove('GatheringService'),
    placeholder: false,
  },
  {
    path: '/sonta/displaydetails',
    element: DetailsSonta,
    roles: permitMeAndThoseAbove('Sonta'),
    placeholder: true,
  },

  //Display Lists in the Directory
  {
    path: '/bacenta/displayall',
    element: DisplayAllBacentas,
    roles: permitMeAndThoseAbove('Constituency'),
    placeholder: false,
  },
  {
    path: '/sonta/displayall',
    element: DisplayAllSontas,
    roles: permitMeAndThoseAbove('Constituency'),
    placeholder: false,
  },
  {
    path: '/constituency/display-sontas',
    element: DisplaySontasByConstituency,
    roles: permitMeAndThoseAbove('Council'),
    placeholder: false,
  },

  {
    path: '/constituency/displayall',
    element: DisplayAllConstituencies,
    roles: permitAdminAndThoseAbove('Council'),
    placeholder: false,
  },

  {
    path: '/fellowship/displayall',
    element: DisplayAllFellowships,
    roles: permitMeAndThoseAbove('Bacenta'),
    placeholder: false,
  },
  {
    path: '/council/displayall',
    element: DisplayAllCouncils,
    roles: permitMeAndThoseAbove('Stream'),
    placeholder: false,
  },
  {
    path: '/stream/displayall',
    element: DisplayAllStreams,
    roles: permitMeAndThoseAbove('GatheringService'),
    placeholder: false,
  },

  //Creation Pages
  {
    path: '/fellowship/addfellowship',
    element: CreateFellowship,
    roles: permitAdminAndThoseAbove('Constituency'),
    placeholder: false,
  },
  {
    path: '/bacenta/addbacenta',
    element: CreateBacenta,
    roles: permitAdminAndThoseAbove('Constituency'),
    placeholder: false,
  },
  {
    path: '/sonta/addsonta',
    element: CreateSonta,
    roles: permitAdminAndThoseAbove('Constituency'),
    placeholder: false,
  },
  {
    path: '/constituency/addconstituency',
    element: CreateConstituency,
    roles: permitAdminAndThoseAbove('Council'),
    placeholder: false,
  },
  {
    path: '/council/addcouncil',
    element: CreateCouncil,
    roles: permitAdminAndThoseAbove('Stream'),
    placeholder: false,
  },
  {
    path: '/stream/addstream',
    element: CreateStream,
    roles: permitAdminAndThoseAbove('GatheringService'),
    placeholder: false,
  },

  //Pages to Update the Directory
  {
    path: '/fellowship/editfellowship',
    element: UpdateFellowship,
    roles: permitAdminAndThoseAbove('Constituency'),
    placeholder: false,
  },
  {
    path: '/bacenta/editbacenta',
    element: UpdateBacenta,
    roles: permitAdminAndThoseAbove('Constituency'),
    placeholder: false,
  },
  {
    path: '/sonta/editsonta',
    element: UpdateSonta,
    roles: permitAdminAndThoseAbove('Constituency'),
    placeholder: false,
  },
  {
    path: '/constituency/editconstituency',
    element: UpdateConstituency,
    roles: permitAdminAndThoseAbove('Council'),
    placeholder: false,
  },
  {
    path: '/council/editcouncil',
    element: UpdateCouncil,
    roles: permitAdminAndThoseAbove('Stream'),
    placeholder: false,
  },
  {
    path: '/stream/editstream',
    element: UpdateStream,
    roles: permitAdminAndThoseAbove('GatheringService'),
    placeholder: false,
  },
]
