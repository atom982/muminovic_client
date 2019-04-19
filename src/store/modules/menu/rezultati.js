import lazyLoading from './lazyLoading'

// export default {
//   name: 'rezultati',
//   meta: {
//     expanded: false,
//     title: 'Rezultati', 
//     iconClass: 'vuestic-icon vuestic-icon-files'
//   },

//   children: [
//     {
//       name: 'rezultati-pregled',
//       path: '/rezultati/pregled/',
//       component: lazyLoading('rezultati/pregled/pregled'),
//       meta: {
//         title: 'Pregled',
//         requiredAuth: true
//       }
//     },
//     {
//       name: 'rezultati-odobravanje',
//       path: '/rezultati/verifikacija/',
//       component: lazyLoading('rezultati/verifikacija/verifikacija'),
//       meta: {
//         title: 'Odobravanje',
//         requiredAuth: true
//       }
//     }
//   ]
// }

export default {
  name: 'rezultati-odobravanje',
  path: '/rezultati/verifikacija/',
  component: lazyLoading('rezultati/verifikacija/verifikacija'),
  meta: {
    default: false,
    title: 'Rezultati', 
    iconClass: 'vuestic-icon vuestic-icon-files',
    requiredAuth: true
  }
}