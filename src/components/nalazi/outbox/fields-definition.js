export default {
  tableFields: [    

    {
      name: 'outbox',
      title: 'pregled',
      width: "13%"
    },
    {
      name: 'to',
      title: 'adresa',
      width: "17%"
    },
    {
      name: 'ime',
      sortField: 'ime',
      width: "12%"
    },
    {
      name: 'prezime',
      sortField: 'prezime',
      width: "17%"
    },
    {
      name: 'jmbg',
      title: 'jmbg',
      sortField: 'jmbg',
      width: "13%"
    },
    {
      name: 'izmjena',
      title: 'poslano',
      width: "13%"
    },


 
    {
      name: 'brisanjeOutbox',
      title: 'akcija',
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