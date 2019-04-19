// PZU Muminović, $store.state.site: 5bd40c16020d6d21bbaf610c

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
  muminovic: function(
    test,
    godina,
    spol,
    drstanje,
    menopauza,
    manual,
    calculated
  ) {
    switch (test) {
      case "HbA1c":
        return ["Lab", true, false];
        break;
      case "Total Hb":
        return ["Lab", true, false];
        break;
      case "OGTT - 60 min":
        return ["Lab", true, false];
        break;
      case "OGTT - 120 min":
        return ["Lab", true, false];
        break;
      case "Kreatinin, urin":
        return ["Lab", true, false];
        break;
      case "Ukupni proteini, urin":
        return ["Lab", true, false];
        break;
      // case 'Kreatinin klirens ':
      //   return ['Man', true, false]
      //   break;
      case "Prolaktin 2":
        return ["Lab", true, false];
        break;
      case "Prolaktin 3":
        return ["Lab", true, false];
        break;
      default:
        return odrediDefaultSelection(manual, calculated);
        break;
    }
  }
};
