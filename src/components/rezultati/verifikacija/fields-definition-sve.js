export default {
  tableFields: [
    // {
    //   name: "badge",
    //   title: "",
    //   width: "4%"
    // },
    {
      name: "odobravanje",
      title: "detalji",
      width: "15%"
    },
    {
      name: "id",
      title: "id",
      sortField: "id",
      width: "5%"
    },
    {
      name: "ime",
      sortField: "ime",
      width: "10%"
    },
    {
      name: "prezime",
      sortField: "prezime",
      width: "16%"
    },
    {
      name: "jmbg",
      title: "jmbg",
      width: "12%"
    },
    {
      name: "barcodes",
      title: "barcodes",
      width: "17%"
    },
    {
      name: "predracun",
      title: "račun",
      width: "14%"
    },

    {
      name: "datum",
      title: "datum",
      width: "11%"
    }
  ],
  sortFunctions: {
    ime: function(item1, item2) {
      return item1 >= item2 ? 1 : -1;
    },
    prezime: function(item1, item2) {
      return item1 >= item2 ? 1 : -1;
    },
    pacijent: function(item1, item2) {
      return item1 >= item2 ? 1 : -1;
    }
  }
};
