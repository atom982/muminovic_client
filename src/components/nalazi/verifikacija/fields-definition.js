export default {
  tableFields: [
    {
      name: "nalazi",
      title: "pregled",
      width: "15%"
    },
    {
      name: "pacijent",
      // sortField: "id",
      title: "id",
      width: "5%"
    },
    {
      name: "ime",
      sortField: "ime",
      width: "15%"
    },
    {
      name: "prezime",
      sortField: "prezime",
      width: "20%"
    },
    {
      name: "jmbg",
      title: "jmbg",
      sortField: "jmbg",
      width: "15%"
    },
    {
      name: "izmjena",
      title: "status",
      width: "15%"
    },
    {
      name: "datum",
      title: "datum",
      width: "15%"
    }
  ],
  sortFunctions: {
    ime: function(item1, item2) {
      return item1 >= item2 ? 1 : -1;
    },
    prezime: function(item1, item2) {
      return item1 >= item2 ? 1 : -1;
    },
    jmbg: function(item1, item2) {
      return item1 >= item2 ? 1 : -1;
    }
  }
};
