import lazyLoading from './lazyLoading'

// export default {
//   name: 'uzorci',
//   meta: {
//     expanded: false,
//     title: 'Uzorci', 
//     iconClass: 'vuestic-icon vuestic-icon-ui-elements'
//   },

//   children: [
//     {
//       name: 'uzorci-unos',
//       path: '/uzorci/unos',
//       component: lazyLoading('uzorci/unos'),
//       meta: {
//         title: 'Unos', 
//         requiredAuth: true
//       }
//     },
//     {
//       name: 'uzorci-pregled',
//       path: '/uzorci/pregled',
//       component: lazyLoading('uzorci/pregled'),
//       meta: {
//         title: 'Pregled',
//         requiredAuth: true
//       }
//     },
//     {
//       name: 'uzorci-predracun',
//       path: '/uzorci/racuni',
//       component: lazyLoading('uzorci/racuni/racuni'),
//       meta: {
//         title: 'Predračun',
//         requiredAuth: true
//       }
//     }
//   ]
// }


export default {
  name: 'uzorci-pregled',
  path: '/uzorci/pregled',
  component: lazyLoading('uzorci/pregled'),
  meta: {
    default: false,
    title: 'Uzorci', 
    iconClass: 'fa fa-flask',
    requiredAuth: true
  }
}