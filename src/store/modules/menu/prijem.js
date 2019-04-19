import lazyLoading from './lazyLoading'

export default {
  name: 'prijem',
  path: '/prijem',
  component: lazyLoading('prijem/PregledPacijenta'),
  meta: {
    default: false,
    title: 'Prijem', 
    iconClass: 'fa fa-users',
    requiredAuth: true
  }
}
