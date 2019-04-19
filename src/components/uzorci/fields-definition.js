export default {
  tableFields: [
    {
      name: 'badge',
      title: ''
    },
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
      name: 'id',
      title: 'id uzorka',
      sortField: 'id'
    },
    {
      name: 'prioritet',
      title: 'prioritet'
    },
    {
      name: 'barkod',
      title: 'barkod'
    },
    

    {
      name: 'uredi',
      title: 'uredi'
    },
    
    
    {
      name: 'izbrisi',
      title: 'akcija'
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
