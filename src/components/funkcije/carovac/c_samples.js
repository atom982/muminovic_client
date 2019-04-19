// Čarovac Lab, $store.state.site: 5b6caf696a0f4166f4da989b

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
  carovaclab: function(
    test,
    godina,
    spol,
    drstanje,
    menopauza,
    manual,
    calculated
  ) {
    switch (test) {
      case "HbA1c - IFCC":
        return ["Lab", true, false];
        break;
      case "Kompletna krvna slika, 5 diff":
        return ["Lab", false, false];
        break;
      case "Double test":
        if (drstanje != "NE") {
          return ["Man", true, true];
        } else {
          return ["Man", false, false];
        }
        break;
      case "Triple test":
        if (drstanje != "NE") {
          return ["Man", true, true];
        } else {
          return ["Man", false, false];
        }
        break;
      case "eGFR":
        if (Number(godina) > 18) {
          return ["Calc", true, true];
        } else {
          return ["Calc", false, false];
        }
        break;
      case "PSA ratio":
        if (spol === "MUŠKI") {
          return ["Calc", true, true];
        } else {
          return ["Calc", false, false];
        }
        break;
      case "ROMA index - pre":
        if (spol === "ŽENSKI" && menopauza === "Premenopauza") {
          return ["Calc", true, true];
        } else {
          return ["Calc", false, false];
        }
        break;
      case "ROMA index - pos":
        if (spol === "ŽENSKI" && menopauza === "Postmenopauza") {
          return ["Calc", true, true];
        } else {
          return ["Calc", false, false];
        }
        break;

      default:
        return odrediDefaultSelection(manual, calculated);
        break;
    }
  }
};
