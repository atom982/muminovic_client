export default {
  tableFields: [
    {
      name: "badge",
      title: "",
      width: "4%"
    },
    {
      name: "ime",
      title: "ime",
      sortField: "ime",
      width: "16%"
    },
    {
      name: "prezime",
      title: "prezime",
      sortField: "prezime",
      width: "20%"
    },
    {
      name: "prijem",
      title: "prijem",
      width: "20%"
    },
    {
      name: "jmbg",
      title: "jmbg",
      sortField: "jmbg",
      width: "20%"
    },
    {
      name: "spol",
      title: "spol",
      width: "10%"
    },
    {
      name: "akcija",
      title: "akcija",
      width: "10%"
    }
  ],
  sortFunctions: {
    id: function(item1, item2) {
      return item1 >= item2 ? 1 : -1;
    }
  }
};
