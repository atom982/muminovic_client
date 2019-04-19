import lazyLoading from './lazyLoading'

export default {
  name: 'pomoc',
  path: '/pomoc',
  component: lazyLoading('pomoc/Pomoc'),
  meta: {
    default: false,
    title: 'Pomoć',   
    iconClass: 'fa fa-support',
    requiredAuth: true
  }
}
