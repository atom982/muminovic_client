export default {
  tableFields: [
    {
      name: 'badge',
      title: ''
    },
    {
      name: 'id',
      title: 'id kontrole',
      sortField: 'id'
    },
    {
      name: 'aparat',
      
    },
    {
      name: 'ime',  
      title: 'naziv',    
      sortField: 'ime'
    },
    {
      name: 'detaljiKontrole',
      title: 'detalji'
    },
    {
      name: 'barkod',
      title: 'barkod'
    },   
    {
      name: 'izbrisiKontrolu',
      title: 'akcija'
    },
    {
      name: 'status',
      title: 'status'
    },
  ],
  sortFunctions: {
    'id': function (item1, item2) {
      return item1 >= item2 ? 1 : -1
    },
  }
}
