import lazyLoading from './lazyLoading'

export default {
  name: 'izvjestaji',
  path: '/reports',
  component: lazyLoading('reports/Reports'),
  meta: {
    default: false,
    title: 'Izvještaji', 
    iconClass: 'fa fa-area-chart',
    requiredAuth: true
  }
}
