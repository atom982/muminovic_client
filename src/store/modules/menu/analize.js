import lazyLoading from './lazyLoading'

export default {
  name: 'analize',
  path: '/postavke/analize',
  component: lazyLoading('postavke/analize/Analize'),
  meta: {
    default: false,
    expanded: false,
    title: 'Reference',
    iconClass: 'glyphicon glyphicon-stats',
    requiredAuth: true
  }
}