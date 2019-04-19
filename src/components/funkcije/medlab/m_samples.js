// Med Lab, $store.state.site: 5bc71402bf21a379083d6e07

function odrediDefaultSelection(manual, calculated) {
  if (!manual && !calculated) {
    return ["Lab", true, true];
  } else if (manual && !calculated) {
    return ["Man", true, true];
  } else if (!manual && calculated) {
    return ["Calc", true, true];
  } else if (manual && calculated) {
    return ["Calc", true, true];
  }
}

module.exports = {
  medlab: function(
    test,
    godina,
    spol,
    drstanje,
    menopauza,
    manual,
    calculated
  ) {
    switch (test) {
      case "Kompletna krvna slika, 5 diff":
        return ["Lab", false, false];
        break;
      case "Protr. vrijeme – INR":
        return ["Lab", false, false];
        break;
      case "eGFR":
        return ["Lab", true, false];
        break;
      default:
        return odrediDefaultSelection(manual, calculated);
        break;
    }
  }
};
