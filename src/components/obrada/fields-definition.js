export default {
  tableFields: [
    {
      name: "obrada",
      title: "detalji",
      width: "13%"
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
      width: "9%"
    },
    {
      name: "prezime",
      sortField: "prezime",
      width: "13%"
    },
    {
      name: "jmbg",
      title: "jmbg",
      width: "11%"
    },
    {
      name: "barcodes",
      title: "barcodes",
      width: "17%"
    },
    {
      name: "racun",
      title: "račun",
      width: "13%"
    },
    {
      name: "datum",
      title: "datum",
      width: "10%"
    },
    {
      name: "time",
      title: "vrijeme",
      width: "9%"
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
