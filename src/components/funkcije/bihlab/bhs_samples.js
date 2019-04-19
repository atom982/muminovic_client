// BIH MEDICINSKI LABORATORIJ (Sarajevo - Stup), $store.state.site: 5c69f68c338fe912f99f833b

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
  bihlab: function(
    test,
    godina,
    spol,
    drstanje,
    menopauza,
    manual,
    calculated
  ) {
    switch (test) {
      default:
        return odrediDefaultSelection(manual, calculated);
        break;
    }
  }
};
