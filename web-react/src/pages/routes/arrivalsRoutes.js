import { permitArrivalsAndThoseAbove } from 'global-utils'
import Arrivals from 'pages/arrivals/Arrivals'
import BacentasHaveBeenCounted from 'pages/arrivals/BacentasHaveBeenCounted'
import BacentasNotArrived from 'pages/arrivals/BacentasNotArrived'
import BacentasThatSubmitted from 'pages/arrivals/BacentasThatSubmitted'
import BusFormAttendanceSubmission from 'pages/arrivals/BusFormAttendanceSubmission'
import BusFormDetails from 'pages/arrivals/BusFormDetails'
import BusFormSubmission from 'pages/arrivals/BusFormSubmission'

export const arrivals = [
  {
    path: '/arrivals',
    element: Arrivals,
    placeholder: true,
  },

  {
    path: '/arrivals/bacentas-not-arrived',
    roles: permitArrivalsAndThoseAbove('Constituency'),
    element: BacentasNotArrived,
    placeholder: true,
  },
  {
    path: '/arrivals/bacentas-that-submitted',
    roles: permitArrivalsAndThoseAbove('Constituency'),
    element: BacentasThatSubmitted,
    placeholder: true,
  },
  {
    path: '/arrivals/bacentas-have-been-counted',
    roles: permitArrivalsAndThoseAbove('Constituency'),
    element: BacentasHaveBeenCounted,
    placeholder: true,
  },
  {
    path: '/arrivals/submit-bus-picture',
    roles: ['leaderBacenta'],
    element: BusFormSubmission,
    placeholder: false,
  },
  {
    path: '/arrivals/submit-bus-attendance',
    roles: ['adminConstituencyArrivals'],
    element: BusFormAttendanceSubmission,
    placeholder: false,
  },
  {
    path: '/bacenta/bussing-details',
    roles: ['leaderBacenta'],
    element: BusFormDetails,
    placeholder: false,
  },
]
