import lazyLoading from './lazyLoading'

export default {
  name: 'assays',
  path: '/postavke/assays',
  component: lazyLoading('assays/Assays'),
  meta: {
    default: false,
    expanded: false,
    title: 'Assays',
    iconClass: 'fa fa-font',
    requiredAuth: true
  }
}