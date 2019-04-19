export default {
  tableFields: [    
    {
      name: 'verifikacija',
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
      name: 'nalaz',
      title: 'nalaz'
    },
    {
      name: 'status',
      title: 'status'
    }
  ],
  sortFunctions: {
    'ime': function (item1, item2) {
      return item1 >= item2 ? 1 : -1
    },
    'prezime': function (item1, item2) {
      return item1 >= item2 ? 1 : -1
    },
    'id': function (item1, item2) {
      return item1 >= item2 ? 1 : -1
    }
  }
}
