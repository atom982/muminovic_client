import lazyLoading from './lazyLoading'

export default {
  name: 'kontrole',
  meta: {
    expanded: false,
    title: 'Kontrole',
    iconClass: 'vuestic-icon vuestic-icon-graph'
  },

  children: [
    {
      name: 'kontrole-unos',
      path: '/kontrole/unos',
      component: lazyLoading('kontrole/unos/Unos'),
      meta: {
        title: 'Unos',
        requiredAuth: true
      }
    },
    {
      name: 'kontrole-pregled',
      path: '/kontrole/pregled',
      component: lazyLoading('kontrole/pregled/Pregled'),
      meta: {
        title: 'Pregled',        
        requiredAuth: true
      }
    },
    {
      name: 'kontrole-levey',
      path: '/kontrole/levey',
      component: lazyLoading('kontrole/pregled/Levey'),
      meta: {
        title: 'Levey - J', 
        requiredAuth: true
      }
    }
  ]
}