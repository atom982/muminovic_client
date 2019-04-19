import lazyLoading from './lazyLoading'

export default {
  name: 'definicija-kontrola',
  path: '/postavke/kontrole',
  component: lazyLoading('postavke/kontrole/Kontrole'),
  meta: {
    default: false,
    expanded: false,
    title: 'Definicija kontrola',
    iconClass: 'glyphicon glyphicon-check',
    requiredAuth: true
  }
}
