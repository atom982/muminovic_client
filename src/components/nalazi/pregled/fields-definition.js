export default {
  tableFields: [    
    {
      name: 'nalazipregled',
      title: 'pregled',
      width: "18%"
    },
    
    {
      name: 'ime',
      sortField: 'ime',
      width: "13%"
    
    },
    {
      name: 'prezime',
      sortField: 'prezime',
      width: "18%"
    },
    {
      name: 'jmbg',
      title: 'jmbg',
      sortField: 'jmbg',
      width: "13%"
    },
    {
      name: "status",
      title: "status",
      width: "13%"
    },    
    {
      name: 'izmjena',
      title: 'datum',
      width: "11%"
   },
   {
    name: "time",
    title: "vrijeme",
    width: "9%"
  },
  {
    name: "partials",
    title: "",
    width: "5%"
  },
    // {
    //   name: 'brisanje',
    //   title: 'akcija'
    // }
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