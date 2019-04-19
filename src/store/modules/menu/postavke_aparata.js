import lazyLoading from './lazyLoading'

export default {
  name: 'postavke-aparata',
  meta: {
    expanded: false,
    title: 'Postavke aparata', 
    iconClass: 'glyphicon glyphicon-object-align-bottom'
  },

  children: [  
    {
      name: 'aparati',
      path: '/postavke/aparati',
      component: lazyLoading('postavke/aparati/Aparati'),
      meta: {
        title: 'Aparati', 
        requiredAuth: true
      }
    },
    {
      name: 'testovi-aparata',
      path: '/postavke/aptestovi',
      component: lazyLoading('postavke/aptestovi/Aptestovi'),
      meta: {
        title: 'Testovi aparata',
        requiredAuth: true
      }
    }    
  ]
}
