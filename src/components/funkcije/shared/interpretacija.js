module.exports = {
  odrediDefaultReferenceAnalitNe: function (rezultat, jedinica, dref, gref) {
    if (dref === "0" && gref === "0") {
      return "Nije broj";
    } else if (Number(gref) > 0) {
      return "Standardni referentni interval";
    } else if (Number(gref) < 0) {
      return "Standardni granicni interval";
    }
  },

  referentniIntervalStandard: function (rezultat, jedinica, dref, gref) {
    if (rezultat.includes(",")) {
      rezultat.replace(",", ".").trim();
    }
    if (rezultat.includes("<")) {
      rezultat.replace("<", "").trim();
    }
    if (rezultat.includes(">")) {
      rezultat.replace(">", "").trim();
    }

    if (isNaN(rezultat) || rezultat === "") {
      return [" ", "No Class"];
    } else if (Number(rezultat) < Number(dref)) {
      return ["L", "Red"];
    } else if (Number(rezultat) > Number(gref)) {
      return ["H", "Red"];
    } else if (
      Number(rezultat) === Number(dref) ||
      Number(rezultat) === Number(gref)
    ) {
      return [" ", "Yellow"];
    } else {
      return [" ", "Green"];
    }
  },

  nijeBrojStandard: function (rezultat, jedinica, dref, gref) {
    if (rezultat === "") {
      return [" ", "No Class"];
    } else if (
      rezultat.toUpperCase().includes("POZ") ||
      rezultat.toUpperCase() === "REAKTIVAN"
    ) {
      return ["pozitivan", "Red"];
    } else if (
      rezultat.toUpperCase().includes("NEG") ||
      rezultat.toUpperCase() === "NEREAKTIVAN"
    ) {
      return [" ", "Green"];
    } else {
      return [" ", "No Class"];
    }
  },

  nijeBrojNereaktivan: function (rezultat, jedinica, dref, gref) {
    if (rezultat === "") {
      return [" ", "No Class"];
    } else if (rezultat === "reaktivan") {
      return ["reaktivan", "Red"];
    } else if (rezultat === "nereaktivan") {
      return [" ", "Green"];
    } else {
      return [" ", "No Class"];
    }
  },

  nijeBrojNegativan: function (rezultat, jedinica, dref, gref) {
    if (rezultat === "") {
      return [" ", "No Class"];
    } else if (
      rezultat.includes("pozitivan") ||
      rezultat.includes("pos") ||
      !rezultat.includes("neg")
    ) {
      return ["pozitivan", "Red"];
    } else if (rezultat === "negativan" || rezultat === "neg") {
      return [" ", "Green"];
    } else {
      return [" ", "No Class"];
    }
  },

  //

  CoV2IgG: function (rezultat, jedinica, dref, gref) {
    if (rezultat === "") {
      return [" ", "No Class"];
    } else if (rezultat.includes("pozitivan")) {
      return ["pozitivan", "Red"];
    } else if (!isNaN(rezultat)) {
      if (rezultat < 1.4) {
        return [" ", "Green"];
      } else {
        return ["pozitivan", "Red"];
      }
    } else if (rezultat.includes("negativan")) {
      return [" ", "Green"];
    } else {
      return [" ", "No Class"];
    }
  },

  CoV2IgGkv: function (rezultat, jedinica, dref, gref) {
    if (rezultat === "") {
      return [" ", "No Class"];
    } else if (rezultat.includes("pozitivan")) {
      return ["pozitivan", "Red"];
    } else if (!isNaN(rezultat)) {
      if (rezultat < 50) {
        return [" ", "Green"];
      } else {
        return ["pozitivan", "Red"];
      }
    } else if (rezultat.includes("negativan")) {
      return [" ", "Green"];
    } else {
      return [" ", "No Class"];
    }
  },

  CoV2IgM: function (rezultat, jedinica, dref, gref) {
    if (rezultat === "") {
      return [" ", "No Class"];
    } else if (rezultat.includes("pozitivan")) {
      return ["pozitivan", "Red"];
    } else if (!isNaN(rezultat)) {
      if (rezultat < 1.0) {
        return [" ", "Green"];
      } else {
        return ["pozitivan", "Red"];
      }
    } else if (rezultat.includes("negativan")) {
      return [" ", "Green"];
    } else {
      return [" ", "No Class"];
    }
  },

  nijeBrojNormalan: function (rezultat, jedinica, dref, gref) {
    if (rezultat === "") {
      return [" ", "No Class"];
    } else if (
      rezultat.includes("pozitivan") ||
      rezultat.includes("pos") ||
      !rezultat.includes("norm")
    ) {
      return ["pozitivan", "Red"];
    } else if (rezultat === "normalan" || rezultat === "norm") {
      return [" ", "Green"];
    } else {
      return [" ", "No Class"];
    }
  },

  granicniIntervalVeceOd: function (rezultat, jedinica, dref, gref) {
    if (rezultat.includes(",")) {
      rezultat.replace(",", ".").trim();
    }
    if (rezultat.includes("<")) {
      rezultat.replace("<", "").trim();
    }
    if (rezultat.includes(">")) {
      rezultat.replace(">", "").trim();
    }

    if (isNaN(rezultat) || rezultat === "") {
      return [" ", "No Class"];
    } else if (Number(rezultat) < Number(Math.abs(gref))) {
      return ["L", "Red"];
    } else {
      return [" ", "Green"];
    }
  },

  granicniIntervalGreater: function (rezultat, jedinica, dref, gref) {
    if (rezultat.includes(",")) {
      rezultat.replace(",", ".").trim();
    }
    if (rezultat.includes("<")) {
      rezultat.replace("<", "").trim();
    }
    if (rezultat.includes(">")) {
      rezultat.replace(">", "").trim();
    }

    if (isNaN(rezultat) || rezultat === "") {
      return [" ", "No Class"];
    } else if (Number(rezultat) < Number(Math.abs(gref))) {
      return ["L", "Red"];
    } else if (Number(rezultat) == Number(Math.abs(gref))) {
      return [" ", "Yellow"];
    } else {
      return [" ", "Green"];
    }
  },

  granicniIntervalManjeOd: function (rezultat, jedinica, dref, gref) {
    if (rezultat.includes(",")) {
      rezultat.replace(",", ".").trim();
    }
    if (rezultat.includes("<")) {
      rezultat.replace("<", "").trim();
    }
    if (rezultat.includes(">")) {
      rezultat.replace(">", "").trim();
    }

    if (isNaN(rezultat) || rezultat === "") {
      return [" ", "No Class"];
    } else if (Number(rezultat) > Number(Math.abs(gref))) {
      return ["H", "Red"];
    } else if (Number(rezultat) == Number(Math.abs(gref))) {
      return [" ", "Yellow"];
    } else {
      return [" ", "Green"];
    }
  },

  referentniIntervalPrisutno: function (rezultat, jedinica, dref, gref) {
    if (rezultat.includes(",")) {
      rezultat.replace(",", ".").trim();
    }
    if (rezultat.includes("<")) {
      rezultat.replace("<", "").trim();
    }
    if (rezultat.includes(">")) {
      rezultat.replace(">", "").trim();
    }

    if (isNaN(rezultat) || rezultat === "") {
      return [" ", "No Class"];
    } else if (Number(rezultat) > Number(gref)) {
      return ["H", "Red"];
    } else {
      return [" ", "Green"];
    }
  },

  referentniIntervalPrisutnoGljivice: function (
    rezultat,
    jedinica,
    dref,
    gref
  ) {
    if (rezultat.includes(",")) {
      rezultat.replace(",", ".").trim();
    }
    if (rezultat.includes("<")) {
      rezultat.replace("<", "").trim();
    }
    if (rezultat.includes(">")) {
      rezultat.replace(">", "").trim();
    }

    if (rezultat === "") {
      return [" ", "No Class"];
    } else if (Number(rezultat) > Number(gref)) {
      return ["H", "Red"];
    } else if (isNaN(rezultat)) {
      return ["pozitivan", "Red"];
    } else {
      return [" ", "Green"];
    }
  },

  nijeBrojKrvnaGrupa: function (rezultat, jedinica, dref, gref) {
    return [" ", "No Class"];
  },

  nijeBrojRhFaktor: function (rezultat, jedinica, dref, gref) {
    return [" ", "No Class"];
  },
  nijeBrojHOMAi: function (rezultat, jedinica, dref, gref) {
    return [" ", "No Class"];
  },

  opisniRezultat: function (rezultat, jedinica, dref, gref) {
    return [" ", "No Class"];
  },

  OPUrinIzgled: function (rezultat, jedinica, dref, gref) {
    if (rezultat === "") {
      return [" ", "No Class"];
    } else if (rezultat === "bistar") {
      return [" ", "Green"];
    } else {
      return ["pozitivan", "Red"];
    }
  },

  OPUrinBoja: function (rezultat, jedinica, dref, gref) {
    if (rezultat === "") {
      return [" ", "No Class"];
    } else if (rezultat === "žut") {
      return [" ", "Green"];
    } else {
      return ["pozitivan", "Red"];
    }
  },

  SedimentMaloDostaMasa: function (rezultat, jedinica, dref, gref) {
    if (rezultat === "") {
      return [" ", "No Class"];
    } else {
      return ["H", "Red"];
    }
  },

  SedimentLeukocitiEritrociti: function (rezultat, jedinica, dref, gref) {
    if (rezultat.includes("-")) {
      rezultat = rezultat.split("-")[1].trim();
    }

    if (isNaN(rezultat) || rezultat === "") {
      return [" ", "No Class"];
    } else if (Number(rezultat) > Number(gref)) {
      return ["H", "Red"];
    } else if (Number(rezultat) === Number(gref)) {
      return [" ", "Yellow"];
    } else {
      return [" ", "Green"];
    }
  },

  SedimentLeukocitiEritrocitiMedLab: function (rezultat, jedinica, dref, gref) {
    if (rezultat.includes("-")) {
      rezultat = rezultat.split("-")[1].trim();
    }

    if (isNaN(rezultat) || rezultat === "") {
      return [" ", "No Class"];
    } else if (Number(rezultat) > Number(gref)) {
      return ["H", "Red"];
    } else if (Number(rezultat) === Number(gref)) {
      return [" ", "Yellow"];
    } else {
      return [" ", "Green"];
    }
  },

  SedimentLeukocitiEritrocitiMedLabDosta: function (
    rezultat,
    jedinica,
    dref,
    gref
  ) {
    if (rezultat.includes("-")) {
      rezultat = rezultat.split("-")[1].trim();
    }

    if (rezultat.toUpperCase().includes("DOSTA")) {
      return ["H", "Red"];
    } else if (isNaN(rezultat) || rezultat === "") {
      return [" ", "No Class"];
    } else if (Number(rezultat) > Number(gref)) {
      return ["H", "Red"];
    } else if (Number(rezultat) === Number(gref)) {
      return [" ", "Yellow"];
    } else {
      return [" ", "Green"];
    }
  },

  SedimentSveOsimNula: function (rezultat, jedinica, dref, gref) {
    if (rezultat === "") {
      return [" ", "No Class"];
    } else if (!isNaN(rezultat) && parseFloat(rezultat) === 0) {
      return [" ", "Green"];
    } else {
      return ["pozitivan", "Red"];
    }
  },

  // BIH MEDICINSKI LABORATORIJ (Sarajevo - Stup), $store.state.site: 5c69f68c338fe912f99f833b

  Sedimentacija: function (rezultat, jedinica, dref, gref) {
    if (rezultat.includes("/")) {
      rezultat = rezultat.split("/")[0].trim();
    }

    if (isNaN(rezultat) || rezultat === "") {
      return [" ", "No Class"];
    } else if (Number(rezultat) > Number(Math.abs(gref))) {
      return ["H", "Red"];
    } else if (Number(rezultat) === Number(Math.abs(gref))) {
      return [" ", "Yellow"];
    } else {
      return [" ", "Green"];
    }
  },

  nijeBrojNegativanPozGr: function (rezultat, jedinica, dref, gref) {
    if (rezultat === "") {
      return [" ", "No Class"];
    } else if (rezultat.includes("pozitivan") || rezultat.includes("pos")) {
      return ["pozitivan", "Red"];
    } else if (rezultat === "negativan" || rezultat === "neg") {
      return [" ", "Green"];
    } else {
      return ["graničan", "Yellow"];
    }
  },

  granicniIntervalNegGrPoz: function (rezultat, jedinica, dref, gref) {
    if (rezultat.includes(",")) {
      rezultat.replace(",", ".").trim();
    }
    if (rezultat.includes("<")) {
      rezultat.replace("<", "").trim();
    }
    if (rezultat.includes(">")) {
      rezultat.replace(">", "").trim();
    }

    if (isNaN(rezultat) || rezultat === "") {
      return [" ", "No Class"];
    } else if (Number(rezultat) > Number(Math.abs(gref))) {
      return ["pozitivan", "Red"]; // pozitivan
    } else if (
      Number(rezultat) <= Number(Math.abs(gref)) &&
      Number(rezultat) >= Number(Math.abs(dref))
    ) {
      return ["graničan", "Yellow"]; // graničan
    } else {
      return [" ", "Green"]; // negativan
    }
  },

  granicniIntervalBiHLabHDL: function (rezultat, jedinica, dref, gref) {
    if (rezultat.includes(",")) {
      rezultat.replace(",", ".").trim();
    }
    if (rezultat.includes("<")) {
      rezultat.replace("<", "").trim();
    }
    if (rezultat.includes(">")) {
      rezultat.replace(">", "").trim();
    }

    if (isNaN(rezultat) || rezultat === "") {
      return [" ", "No Class"];
    } else if (Number(rezultat) > Number(Math.abs(gref))) {
      return ["optimalno", "Green"]; // optimalno
    } else if (
      Number(rezultat) <= Number(Math.abs(gref)) &&
      Number(rezultat) >= Number(Math.abs(dref))
    ) {
      return ["rizik", "Yellow"]; // rizik
    } else {
      return ["visok rizik", "Red"]; // visok rizik
    }
  },

  granicniIntervalBiHLabLDL: function (rezultat, jedinica, dref, gref) {
    if (rezultat.includes(",")) {
      rezultat.replace(",", ".").trim();
    }
    if (rezultat.includes("<")) {
      rezultat.replace("<", "").trim();
    }
    if (rezultat.includes(">")) {
      rezultat.replace(">", "").trim();
    }

    if (isNaN(rezultat) || rezultat === "") {
      return [" ", "No Class"];
    } else if (Number(rezultat) > Number(Math.abs(gref))) {
      return ["visok rizik", "Red"]; // visok rizik
    } else if (
      Number(rezultat) <= Number(Math.abs(gref)) &&
      Number(rezultat) >= Number(Math.abs(dref))
    ) {
      return ["rizik", "Yellow"]; // rizik
    } else {
      return ["optimalno", "Green"]; // optimalno
    }
  },

  granicniIntervalCALPRO: function (rezultat, jedinica, dref, gref) {
    if (rezultat.includes(",")) {
      rezultat.replace(",", ".").trim();
    }
    if (rezultat.includes("<")) {
      rezultat.replace("<", "").trim();
    }
    if (rezultat.includes(">")) {
      rezultat.replace(">", "").trim();
    }

    if (isNaN(rezultat) || rezultat === "") {
      return [" ", "No Class"];
    } else if (Number(rezultat) > Number(Math.abs(gref))) {
      return ["značajno povišeno", "Red"]; // značajno povišeno
    } else if (
      Number(rezultat) <= Number(Math.abs(gref)) &&
      Number(rezultat) >= Number(Math.abs(dref))
    ) {
      return ["blago povišeno", "Yellow"]; // blago povišeno
    } else {
      return [" ", "Green"]; // normalno
    }
  },

  granicniIntervalInfekcija: function (rezultat, jedinica, dref, gref) {
    if (rezultat.includes(",")) {
      rezultat.replace(",", ".").trim();
    }
    if (rezultat.includes("<")) {
      rezultat.replace("<", "").trim();
    }
    if (rezultat.includes(">")) {
      rezultat.replace(">", "").trim();
    }

    if (isNaN(rezultat) || rezultat === "") {
      return [" ", "No Class"];
    } else if (Number(rezultat) > Number(Math.abs(gref))) {
      return ["pasivna infekcija", "Green"]; // pasivna infekcija
    } else if (
      Number(rezultat) <= Number(Math.abs(gref)) &&
      Number(rezultat) >= Number(Math.abs(dref))
    ) {
      return ["siva zona", "Yellow"]; // siva zona
    } else {
      return ["svježa infekcija", "Red"]; // svježa infekcija
    }
  },

  granicniIntervalTSH: function (rezultat, jedinica, dref, gref) {
    if (rezultat.includes(",")) {
      rezultat.replace(",", ".").trim();
    }
    if (rezultat.includes("<")) {
      rezultat.replace("<", "").trim();
    }
    if (rezultat.includes(">")) {
      rezultat.replace(">", "").trim();
    }

    if (isNaN(rezultat) || rezultat === "") {
      return [" ", "No Class"];
    } else if (Number(rezultat) > Number(Math.abs(gref))) {
      return ["hipotireoza", "Red"];
    } else if (
      Number(rezultat) <= Number(Math.abs(gref)) &&
      Number(rezultat) >= Number(Math.abs(dref))
    ) {
      return ["eutireoza", "Green"];
    } else {
      return ["hipertireoza", "Red"];
    }
  },

  granicniIntervalfPSA: function (rezultat, jedinica, dref, gref) {
    if (rezultat.includes(",")) {
      rezultat.replace(",", ".").trim();
    }
    if (rezultat.includes("<")) {
      rezultat.replace("<", "").trim();
    }
    if (rezultat.includes(">")) {
      rezultat.replace(">", "").trim();
    }

    if (isNaN(rezultat) || rezultat === "") {
      return [" ", "No Class"];
    } else if (Number(rezultat) > Number(Math.abs(gref))) {
      return ["benigni proces", "Red"]; // benigni proces
    } else if (
      Number(rezultat) <= Number(Math.abs(gref)) &&
      Number(rezultat) >= Number(Math.abs(dref))
    ) {
      return ["siva zona", "Yellow"]; // siva zona
    } else {
      return [" ", "Green"];
    }
  },
};
