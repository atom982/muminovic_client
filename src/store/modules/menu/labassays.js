import lazyLoading from './lazyLoading'

export default {
  name: 'labassays',
  path: '/postavke/labassays',
  component: lazyLoading('postavke/labassays/LabAssays'),
  meta: {
    default: false,
    expanded: false,
    title: 'Testovi',
    iconClass: 'fa fa-flask',
    requiredAuth: true
  }
}