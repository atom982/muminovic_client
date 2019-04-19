import lazyLoading from './lazyLoading'

export default {
  name: 'nalazi',
  meta: {
    expanded: false,
    title: 'Nalazi', 
    iconClass: 'vuestic-icon vuestic-icon-forms'
  },

  children: [
    {
      name: 'nalazi-pregled',
      path: '/nalazi/pregled',
      component: lazyLoading('nalazi/pregled/pregled'),
      meta: {
        title: 'Pregled', 
        requiredAuth: true
      }
    },    
    {
      name: 'nalazi-verifikacija',
      path: '/nalazi/verifikacija',
      component: lazyLoading('nalazi/verifikacija/verifikacija'),
      meta: {
        title: 'Verifikacija', 
        requiredAuth: true
      }
    },
    {
      name: 'nalazi-outbox',
      path: '/nalazi/outbox',
      component: lazyLoading('nalazi/outbox/outbox'),
      meta: {
        title: 'Odlazna pošta', 
        requiredAuth: true
      }
    }
  ]
}