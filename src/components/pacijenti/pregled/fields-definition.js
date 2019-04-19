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
      sortField: "prezime"
    },
    {
      name: "prijem",
      title: "prijem"
    },
    {
      name: "jmbg",
      title: "jmbg",
      sortField: "jmbg"
    },
    {
      name: "spol",
      title: "spol"
    },
    {
      name: "akcija",
      title: "akcija"
    }
  ],
  sortFunctions: {
    id: function(item1, item2) {
      return item1 >= item2 ? 1 : -1;
    }
  }
};
