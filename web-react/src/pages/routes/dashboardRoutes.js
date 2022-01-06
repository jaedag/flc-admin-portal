import ServantsDashboard from 'pages/dashboards/ServantsDashboard'
import UserDashboard from 'pages/dashboards/UserDashboard'
import Maps from 'pages/maps/Maps'

export const dashboards = [
  {
    path: '/',
    element: UserDashboard,
    placeholder: true,
  },
  {
    path: '/dashboard/servants',
    element: ServantsDashboard,
    placeholder: true,
  },
  {
    path: '/maps',
    element: Maps,
    placeholder: true,
  },
]
