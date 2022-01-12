import { permitMeAndThoseAbove } from 'global-utils'
import Arrivals from 'pages/arrivals/Arrivals'
import BacentasNotArrived from 'pages/arrivals/BacentasNotArrived'
import BusPictureSubmit from 'pages/arrivals/BusPictureSubmit'

export const arrivals = [
  {
    path: '/arrivals',
    element: Arrivals,
    placeholder: true,
  },

  {
    path: '/arrivals/bacentas-not-arrived',
    roles: permitMeAndThoseAbove('Constituency'),
    element: BacentasNotArrived,
    placeholder: true,
  },
  {
    path: '/arrivals/bacentas-not-arrived',
    roles: permitMeAndThoseAbove('Constituency'),
    element: BacentasNotArrived,
    placeholder: true,
  },
  {
    path: '/arrivals/submit-bus-picture',
    roles: ['leaderBacenta'],
    element: BusPictureSubmit,
    placeholder: true,
  },
]
