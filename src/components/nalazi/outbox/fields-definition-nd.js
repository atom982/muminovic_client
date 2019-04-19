export default {
  tableFieldsNoDelete: [    
    {
      name: 'outbox',
      title: 'pregled',
      width: "15%"
    },
    {
      name: 'to',
      title: 'adresa',
      width: "20%"
    },
    {
      name: 'ime',
      sortField: 'ime',
      width: "15%"
    },
    {
      name: 'prezime',
      sortField: 'prezime',
      width: "20%"
    },
    {
      name: 'jmbg',
      title: 'jmbg',
      sortField: 'jmbg',
      width: "15%"
    },
    {
      name: 'izmjena',
      title: 'poslano',
      width: "15%"
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