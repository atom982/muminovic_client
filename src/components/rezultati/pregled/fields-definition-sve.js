export default {
  tableFields: [    
    {
      name: 'badge',
      title: ''
    }, 
    {
      name: 'pacijent',
      title: 'pacijent'
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
      name: 'rezultati',
      title: 'rezultati'
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