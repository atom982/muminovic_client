import lazyLoading from './lazyLoading'

export default {
  name: 'pregled',
  path: '/dashboard',
  component: lazyLoading('dashboard/Dashboard'),
  meta: {
    default: true,
    title: 'Statistika', 
    iconClass: 'vuestic-icon vuestic-icon-dashboard',
    requiredAuth: true
  }
}
