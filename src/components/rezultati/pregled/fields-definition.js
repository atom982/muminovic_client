export default {
  tableFields: [    
    {
      name: 'rezultati',
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
      title: 'status',        
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