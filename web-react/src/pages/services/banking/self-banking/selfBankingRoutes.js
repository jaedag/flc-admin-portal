import { permitMe } from 'permission-utils'
import ConfirmPayment from './ConfirmPayment'
import FellowshipSelfBanking from './FellowshipSelfBanking'
import PayFellowshipOffering from './PayFellowshipOffering'
import ReceiptPage from './ReceiptPage'

export const banking = [
  //Self Banking Options
  {
    path: '/services/fellowship/self-banking',
    element: FellowshipSelfBanking,
    roles: ['leaderFellowship'],
    placeholder: true,
  },
  {
    path: '/services/fellowship/self-banking/pay',
    element: PayFellowshipOffering,
    roles: ['leaderFellowship'],
  },
  {
    path: '/self-banking/confirm-payment',
    element: ConfirmPayment,
    roles: permitMe('Fellowship'),
  },
  {
    path: '/self-banking/receipt',
    element: ReceiptPage,
    roles: permitMe('Fellowship'),
  },
]
