export default {
  tableFields: [
    {
      name: 'detalji',
      title: 'detalji'
    },
    {
      name: 'ime',
      sortField: 'ime'
    },
    {
      name: 'prezime',
      sortField: 'prezime'
    },
    {
      name: 'id_uzorka',
      title: 'id uzorka',
      sortField: 'id_uzorka'
    },
    {
      name: 'barkod',
      title: 'barkod'
    },
    {
      name: 'status',
      title: 'status'
    },
    {
      name: '__component:badge-column',
      title: '',
      dataClass: 'text-center'
    }
  ],
  sortFunctions: {
    'name': function (item1, item2) {
      return item1 >= item2 ? 1 : -1
    },
    'prezime': function (item1, item2) {
      return item1 >= item2 ? 1 : -1
    },
    'id_uzorka': function (item1, item2) {
      return item1 >= item2 ? 1 : -1
    }
  }
}
