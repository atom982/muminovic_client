export default {
  tableFieldsNoDelete: [    
    {
      name: 'nalazipregled',
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
    },
    {
      name: 'izmjena',
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
    'jmbg': function (item1, item2) {
      return item1 >= item2 ? 1 : -1
    }
  }
}