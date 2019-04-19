var myArrayObjects = [
  {
    id: 1,
    name: "1 example"
  },
  {
    id: 2,
    name: "2"
  },
  {
    id: 3,
    name: "12"
  },
  {
    id: 4,
    name: "22"
  }
];

module.exports = {
  sortiraj: function() {
    myArrayObjects = myArrayObjects.sort(function(a, b) {
      return a.name.localeCompare(b.name, undefined, {
        numeric: true,
        sensitivity: "base"
      });
    });
  }
};
