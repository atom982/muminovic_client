import lazyLoading from './lazyLoading'

export default {
  name: 'pacijenti',
  meta: {
    expanded: false,
    title: 'Pacijenti',
    iconClass: 'fa fa-users'
  },

  children: [
    {
      name: 'pacijenti-unos',
      path: '/pacijenti/unos/',
      component: lazyLoading('pacijenti/unos/UnosPacijenta'),
      meta: {
        title: 'Unos', 
        requiredAuth: true
      },
      props: { default: true }
    },
    {
      name: 'pacijenti-pregled',
      path: '/pacijenti/pregled/',
      component: lazyLoading('pacijenti/pregled/PregledPacijenta'),
      meta: {
        title: 'Pregled', 
        requiredAuth: true
      },
      props: { default: true }
    },
    {
      name: 'pacijenti-prijem',
      path: '/pacijenti/prijem/',
      component: lazyLoading('pacijenti/prijem/prijem'),
      meta: {
        title: 'Prijem',
        requiredAuth: true
      },
      props: { default: true }
    }
  ]
}