import lazyLoading from './lazyLoading'

export default {
  name: 'definicija-testova',
  meta: {
    expanded: false,
    title: 'Definicija testova',
    iconClass: 'fa fa-flask'
  },

  children: [
    {
      name: 'laboratorijski-testovi',
      path: '/postavke/testovi',
      component: lazyLoading('postavke/testovi/Testovi'),
      meta: {
        title: 'Laboratorijski testovi',
        requiredAuth: true
      }
    },
    {
      name: 'rucni-testovi',
      path: '/postavke/manual/testovi',
      component: lazyLoading('postavke/testovi/Manual'),
      meta: {
        title: 'Ručni testovi',
        requiredAuth: true
      }
    },
    {
      name: 'kalkulisani-testovi',
      path: '/postavke/calculated/testovi',
      component: lazyLoading('postavke/testovi/Calculated'),
      meta: {
        title: 'Kalkulisani testovi',
        requiredAuth: true
      }
    }
  ]
}
