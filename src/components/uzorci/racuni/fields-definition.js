export default {
  tableFields: [    
    {
      name: 'racuni',
      title: 'pregled'
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
      name: 'jmbg',
      title: 'jmbg',
      sortField: 'jmbg'
    }
  ],
  sortFunctions: {
    'ime': function (item1, item2) {
      return item1 >= item2 ? 1 : -1
    },
    'prezime': function (item1, item2) {
      return item1 >= item2 ? 1 : -1
    },
    'jmbg': function (item1, item2) {
      return item1 >= item2 ? 1 : -1
    }
  }
}