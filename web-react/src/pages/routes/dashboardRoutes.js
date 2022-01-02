import UserDashboard from 'pages/dashboards/UserDashboard'
import Maps from 'pages/maps/Maps'

export const dashboards = [
  {
    path: '/',
    element: UserDashboard,
    placeholder: true,
  },
  {
    path: '/maps',
    element: Maps,
    placeholder: true,
  },
]
