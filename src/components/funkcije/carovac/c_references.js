// Čarovac Lab, $store.state.site: 5b6caf696a0f4166f4da989b

var interpretacija = require("../shared/interpretacija");

module.exports = {
  carovaclabAnalitNe: function(test, rezultat, jedinica, dref, gref, site) {
    switch (test) {
      case "Okultno krvarenje": // Nije broj
        return [
          test,
          rezultat,
          interpretacija.nijeBrojStandard(rezultat, jedinica, dref, gref)[0],
          jedinica,
          "Neg.",
          interpretacija.nijeBrojStandard(rezultat, jedinica, dref, gref)[1]
        ];
        break;
      case "H. pylori, feces": // Nije broj
        return [
          test,
          rezultat,
          interpretacija.nijeBrojStandard(rezultat, jedinica, dref, gref)[0],
          jedinica,
          "Neg.",
          interpretacija.nijeBrojStandard(rezultat, jedinica, dref, gref)[1]
        ];
        break;
      case "PSA ratio": // Granični interval
        return [
          test,
          rezultat,
          interpretacija.granicniIntervalException(
            rezultat,
            jedinica,
            dref,
            gref
          )[0],
          jedinica,
          " ≥ " + gref.replace("-", ""),
          interpretacija.granicniIntervalException(
            rezultat,
            jedinica,
            dref,
            gref
          )[1]
        ];
        break;

      default:
        if (
          interpretacija.odrediDefaultReferenceAnalitNe(
            rezultat,
            jedinica,
            dref,
            gref
          ) === "Nije broj"
        ) {
          return [
            test,
            rezultat,
            interpretacija.nijeBrojStandard(rezultat, jedinica, dref, gref)[0],
            jedinica,
            "n/a",
            interpretacija.nijeBrojStandard(rezultat, jedinica, dref, gref)[1]
          ];
          break;
        } else if (
          interpretacija.odrediDefaultReferenceAnalitNe(
            rezultat,
            jedinica,
            dref,
            gref
          ) === "Standardni referentni interval"
        ) {
          return [
            test,
            rezultat,
            interpretacija.referentniIntervalStandard(
              rezultat,
              jedinica,
              dref,
              gref
            )[0],
            jedinica,
            dref.replace("-", "") + " - " + gref.replace("-", ""),
            interpretacija.referentniIntervalStandard(
              rezultat,
              jedinica,
              dref,
              gref
            )[1]
          ];
          break;
        } else if (
          interpretacija.odrediDefaultReferenceAnalitNe(
            rezultat,
            jedinica,
            dref,
            gref
          ) === "Standardni granicni interval"
        ) {
          return [
            test,
            rezultat,
            interpretacija.granicniIntervalStandard(
              rezultat,
              jedinica,
              dref,
              gref
            )[0],
            jedinica,
            " < " + gref.replace("-", ""),
            interpretacija.granicniIntervalStandard(
              rezultat,
              jedinica,
              dref,
              gref
            )[1]
          ];
          break;
        }
    }
  },

  carovaclabAnalitDa: function(
    izbor,
    test,
    rezultat,
    jedinica,
    dref,
    gref,
    site
  ) {
    if (izbor === "Kompletna krvna slika, 3 diff") {
      switch (test) {
        case "Leukociti":
          return [
            test,
            rezultat,
            interpretacija.referentniIntervalStandard(
              rezultat,
              jedinica,
              dref,
              gref
            )[0],
            jedinica,
            dref.replace("-", "") + " - " + gref.replace("-", ""),
            interpretacija.referentniIntervalStandard(
              rezultat,
              jedinica,
              dref,
              gref
            )[1]
          ];
          break;
        case "%Limfociti":
          return [
            test,
            rezultat,
            interpretacija.referentniIntervalStandard(
              rezultat,
              jedinica,
              dref,
              gref
            )[0],
            jedinica,
            dref.replace("-", "") + " - " + gref.replace("-", ""),
            interpretacija.referentniIntervalStandard(
              rezultat,
              jedinica,
              dref,
              gref
            )[1]
          ];
          break;
        case "Limfociti":
          return [
            test,
            rezultat,
            interpretacija.referentniIntervalStandard(
              rezultat,
              jedinica,
              dref,
              gref
            )[0],
            jedinica,
            dref.replace("-", "") + " - " + gref.replace("-", ""),
            interpretacija.referentniIntervalStandard(
              rezultat,
              jedinica,
              dref,
              gref
            )[1]
          ];
          break;
        case "%MID ćelije":
          return [
            test,
            rezultat,
            interpretacija.referentniIntervalStandard(
              rezultat,
              jedinica,
              dref,
              gref
            )[0],
            jedinica,
            dref.replace("-", "") + " - " + gref.replace("-", ""),
            interpretacija.referentniIntervalStandard(
              rezultat,
              jedinica,
              dref,
              gref
            )[1]
          ];
          break;
        case "MID ćelije":
          return [
            test,
            rezultat,
            interpretacija.referentniIntervalStandard(
              rezultat,
              jedinica,
              dref,
              gref
            )[0],
            jedinica,
            dref.replace("-", "") + " - " + gref.replace("-", ""),
            interpretacija.referentniIntervalStandard(
              rezultat,
              jedinica,
              dref,
              gref
            )[1]
          ];
          break;
        case "%Granulociti":
          return [
            test,
            rezultat,
            interpretacija.referentniIntervalStandard(
              rezultat,
              jedinica,
              dref,
              gref
            )[0],
            jedinica,
            dref.replace("-", "") + " - " + gref.replace("-", ""),
            interpretacija.referentniIntervalStandard(
              rezultat,
              jedinica,
              dref,
              gref
            )[1]
          ];
          break;
        case "Granulociti":
          return [
            test,
            rezultat,
            interpretacija.referentniIntervalStandard(
              rezultat,
              jedinica,
              dref,
              gref
            )[0],
            jedinica,
            dref.replace("-", "") + " - " + gref.replace("-", ""),
            interpretacija.referentniIntervalStandard(
              rezultat,
              jedinica,
              dref,
              gref
            )[1]
          ];
          break;
        case "Eritrociti":
          return [
            test,
            rezultat,
            interpretacija.referentniIntervalStandard(
              rezultat,
              jedinica,
              dref,
              gref
            )[0],
            jedinica,
            dref.replace("-", "") + " - " + gref.replace("-", ""),
            interpretacija.referentniIntervalStandard(
              rezultat,
              jedinica,
              dref,
              gref
            )[1]
          ];
          break;
        case "Hemoglobin":
          return [
            test,
            rezultat,
            interpretacija.referentniIntervalStandard(
              rezultat,
              jedinica,
              dref,
              gref
            )[0],
            jedinica,
            dref.replace("-", "") + " - " + gref.replace("-", ""),
            interpretacija.referentniIntervalStandard(
              rezultat,
              jedinica,
              dref,
              gref
            )[1]
          ];
          break;
        case "Hematokrit":
          return [
            test,
            rezultat,
            interpretacija.referentniIntervalStandard(
              rezultat,
              jedinica,
              dref,
              gref
            )[0],
            jedinica,
            dref.replace("-", "") + " - " + gref.replace("-", ""),
            interpretacija.referentniIntervalStandard(
              rezultat,
              jedinica,
              dref,
              gref
            )[1]
          ];
          break;
        case "MCV":
          return [
            test,
            rezultat,
            interpretacija.referentniIntervalStandard(
              rezultat,
              jedinica,
              dref,
              gref
            )[0],
            jedinica,
            dref.replace("-", "") + " - " + gref.replace("-", ""),
            interpretacija.referentniIntervalStandard(
              rezultat,
              jedinica,
              dref,
              gref
            )[1]
          ];
          break;
        case "MCH":
          return [
            test,
            rezultat,
            interpretacija.referentniIntervalStandard(
              rezultat,
              jedinica,
              dref,
              gref
            )[0],
            jedinica,
            dref.replace("-", "") + " - " + gref.replace("-", ""),
            interpretacija.referentniIntervalStandard(
              rezultat,
              jedinica,
              dref,
              gref
            )[1]
          ];
          break;
        case "MCHC":
          return [
            test,
            rezultat,
            interpretacija.referentniIntervalStandard(
              rezultat,
              jedinica,
              dref,
              gref
            )[0],
            jedinica,
            dref.replace("-", "") + " - " + gref.replace("-", ""),
            interpretacija.referentniIntervalStandard(
              rezultat,
              jedinica,
              dref,
              gref
            )[1]
          ];
          break;
        case "RDW":
          return [
            test,
            rezultat,
            interpretacija.referentniIntervalStandard(
              rezultat,
              jedinica,
              dref,
              gref
            )[0],
            jedinica,
            dref.replace("-", "") + " - " + gref.replace("-", ""),
            interpretacija.referentniIntervalStandard(
              rezultat,
              jedinica,
              dref,
              gref
            )[1]
          ];
          break;
        case "Trombociti":
          return [
            test,
            rezultat,
            interpretacija.referentniIntervalStandard(
              rezultat,
              jedinica,
              dref,
              gref
            )[0],
            jedinica,
            dref.replace("-", "") + " - " + gref.replace("-", ""),
            interpretacija.referentniIntervalStandard(
              rezultat,
              jedinica,
              dref,
              gref
            )[1]
          ];
          break;
        case "MPV":
          return [
            test,
            rezultat,
            interpretacija.referentniIntervalStandard(
              rezultat,
              jedinica,
              dref,
              gref
            )[0],
            jedinica,
            dref.replace("-", "") + " - " + gref.replace("-", ""),
            interpretacija.referentniIntervalStandard(
              rezultat,
              jedinica,
              dref,
              gref
            )[1]
          ];
          break;
      }
    } else if (izbor === "Kompletna krvna slika, 5 diff") {
      switch (test) {
        case "Leukociti":
          return [
            test,
            rezultat,
            interpretacija.referentniIntervalStandard(
              rezultat,
              jedinica,
              dref,
              gref
            )[0],
            jedinica,
            dref.replace("-", "") + " - " + gref.replace("-", ""),
            interpretacija.referentniIntervalStandard(
              rezultat,
              jedinica,
              dref,
              gref
            )[1]
          ];
          break;
        case "%Neutrofili":
          return [
            test,
            rezultat,
            interpretacija.referentniIntervalStandard(
              rezultat,
              jedinica,
              dref,
              gref
            )[0],
            jedinica,
            dref.replace("-", "") + " - " + gref.replace("-", ""),
            interpretacija.referentniIntervalStandard(
              rezultat,
              jedinica,
              dref,
              gref
            )[1]
          ];
          break;
        case "%Limfociti":
          return [
            test,
            rezultat,
            interpretacija.referentniIntervalStandard(
              rezultat,
              jedinica,
              dref,
              gref
            )[0],
            jedinica,
            dref.replace("-", "") + " - " + gref.replace("-", ""),
            interpretacija.referentniIntervalStandard(
              rezultat,
              jedinica,
              dref,
              gref
            )[1]
          ];
          break;
        case "%Monociti":
          return [
            test,
            rezultat,
            interpretacija.referentniIntervalStandard(
              rezultat,
              jedinica,
              dref,
              gref
            )[0],
            jedinica,
            dref.replace("-", "") + " - " + gref.replace("-", ""),
            interpretacija.referentniIntervalStandard(
              rezultat,
              jedinica,
              dref,
              gref
            )[1]
          ];
          break;
        case "%Eozinofili":
          return [
            test,
            rezultat,
            interpretacija.referentniIntervalStandard(
              rezultat,
              jedinica,
              dref,
              gref
            )[0],
            jedinica,
            dref.replace("-", "") + " - " + gref.replace("-", ""),
            interpretacija.referentniIntervalStandard(
              rezultat,
              jedinica,
              dref,
              gref
            )[1]
          ];
          break;
        case "%Bazofili":
          return [
            test,
            rezultat,
            interpretacija.referentniIntervalStandard(
              rezultat,
              jedinica,
              dref,
              gref
            )[0],
            jedinica,
            dref.replace("-", "") + " - " + gref.replace("-", ""),
            interpretacija.referentniIntervalStandard(
              rezultat,
              jedinica,
              dref,
              gref
            )[1]
          ];
          break;
        case "Neutrofili":
          return [
            test,
            rezultat,
            interpretacija.referentniIntervalStandard(
              rezultat,
              jedinica,
              dref,
              gref
            )[0],
            jedinica,
            dref.replace("-", "") + " - " + gref.replace("-", ""),
            interpretacija.referentniIntervalStandard(
              rezultat,
              jedinica,
              dref,
              gref
            )[1]
          ];
          break;
        case "Limfociti":
          return [
            test,
            rezultat,
            interpretacija.referentniIntervalStandard(
              rezultat,
              jedinica,
              dref,
              gref
            )[0],
            jedinica,
            dref.replace("-", "") + " - " + gref.replace("-", ""),
            interpretacija.referentniIntervalStandard(
              rezultat,
              jedinica,
              dref,
              gref
            )[1]
          ];
          break;
        case "Monociti":
          return [
            test,
            rezultat,
            interpretacija.referentniIntervalStandard(
              rezultat,
              jedinica,
              dref,
              gref
            )[0],
            jedinica,
            dref.replace("-", "") + " - " + gref.replace("-", ""),
            interpretacija.referentniIntervalStandard(
              rezultat,
              jedinica,
              dref,
              gref
            )[1]
          ];
          break;
        case "Eozinofili":
          return [
            test,
            rezultat,
            interpretacija.referentniIntervalStandard(
              rezultat,
              jedinica,
              dref,
              gref
            )[0],
            jedinica,
            dref.replace("-", "") + " - " + gref.replace("-", ""),
            interpretacija.referentniIntervalStandard(
              rezultat,
              jedinica,
              dref,
              gref
            )[1]
          ];
          break;
        case "Bazofili":
          return [
            test,
            rezultat,
            interpretacija.referentniIntervalStandard(
              rezultat,
              jedinica,
              dref,
              gref
            )[0],
            jedinica,
            dref.replace("-", "") + " - " + gref.replace("-", ""),
            interpretacija.referentniIntervalStandard(
              rezultat,
              jedinica,
              dref,
              gref
            )[1]
          ];
          break;
        case "Eritrociti":
          return [
            test,
            rezultat,
            interpretacija.referentniIntervalStandard(
              rezultat,
              jedinica,
              dref,
              gref
            )[0],
            jedinica,
            dref.replace("-", "") + " - " + gref.replace("-", ""),
            interpretacija.referentniIntervalStandard(
              rezultat,
              jedinica,
              dref,
              gref
            )[1]
          ];
          break;
        case "Hemoglobin":
          return [
            test,
            rezultat,
            interpretacija.referentniIntervalStandard(
              rezultat,
              jedinica,
              dref,
              gref
            )[0],
            jedinica,
            dref.replace("-", "") + " - " + gref.replace("-", ""),
            interpretacija.referentniIntervalStandard(
              rezultat,
              jedinica,
              dref,
              gref
            )[1]
          ];
          break;
        case "MCV":
          return [
            test,
            rezultat,
            interpretacija.referentniIntervalStandard(
              rezultat,
              jedinica,
              dref,
              gref
            )[0],
            jedinica,
            dref.replace("-", "") + " - " + gref.replace("-", ""),
            interpretacija.referentniIntervalStandard(
              rezultat,
              jedinica,
              dref,
              gref
            )[1]
          ];
          break;
        case "MCH":
          return [
            test,
            rezultat,
            interpretacija.referentniIntervalStandard(
              rezultat,
              jedinica,
              dref,
              gref
            )[0],
            jedinica,
            dref.replace("-", "") + " - " + gref.replace("-", ""),
            interpretacija.referentniIntervalStandard(
              rezultat,
              jedinica,
              dref,
              gref
            )[1]
          ];
          break;
        case "MCHC":
          return [
            test,
            rezultat,
            interpretacija.referentniIntervalStandard(
              rezultat,
              jedinica,
              dref,
              gref
            )[0],
            jedinica,
            dref.replace("-", "") + " - " + gref.replace("-", ""),
            interpretacija.referentniIntervalStandard(
              rezultat,
              jedinica,
              dref,
              gref
            )[1]
          ];
          break;
        case "Hematokrit":
          return [
            test,
            rezultat,
            interpretacija.referentniIntervalStandard(
              rezultat,
              jedinica,
              dref,
              gref
            )[0],
            jedinica,
            dref.replace("-", "") + " - " + gref.replace("-", ""),
            interpretacija.referentniIntervalStandard(
              rezultat,
              jedinica,
              dref,
              gref
            )[1]
          ];
          break;
        case "RDW":
          return [
            test,
            rezultat,
            interpretacija.referentniIntervalStandard(
              rezultat,
              jedinica,
              dref,
              gref
            )[0],
            jedinica,
            dref.replace("-", "") + " - " + gref.replace("-", ""),
            interpretacija.referentniIntervalStandard(
              rezultat,
              jedinica,
              dref,
              gref
            )[1]
          ];
          break;
        case "Trombociti":
          return [
            test,
            rezultat,
            interpretacija.referentniIntervalStandard(
              rezultat,
              jedinica,
              dref,
              gref
            )[0],
            jedinica,
            dref.replace("-", "") + " - " + gref.replace("-", ""),
            interpretacija.referentniIntervalStandard(
              rezultat,
              jedinica,
              dref,
              gref
            )[1]
          ];
          break;
        case "MPV":
          return [
            test,
            rezultat,
            interpretacija.referentniIntervalStandard(
              rezultat,
              jedinica,
              dref,
              gref
            )[0],
            jedinica,
            dref.replace("-", "") + " - " + gref.replace("-", ""),
            interpretacija.referentniIntervalStandard(
              rezultat,
              jedinica,
              dref,
              gref
            )[1]
          ];
          break;
        case "PDW":
          return [
            test,
            rezultat,
            interpretacija.referentniIntervalStandard(
              rezultat,
              jedinica,
              dref,
              gref
            )[0],
            jedinica,
            dref.replace("-", "") + " - " + gref.replace("-", ""),
            interpretacija.referentniIntervalStandard(
              rezultat,
              jedinica,
              dref,
              gref
            )[1]
          ];
          break;
        case "PCT":
          return [
            test,
            rezultat,
            interpretacija.referentniIntervalStandard(
              rezultat,
              jedinica,
              dref,
              gref
            )[0],
            jedinica,
            dref.replace("-", "") + " - " + gref.replace("-", ""),
            interpretacija.referentniIntervalStandard(
              rezultat,
              jedinica,
              dref,
              gref
            )[1]
          ];
          break;
      }
    } else if (izbor === "Retikulociti") {
      switch (test) {
        case "Retikulociti":
          return [
            test,
            rezultat,
            interpretacija.referentniIntervalStandard(
              rezultat,
              jedinica,
              dref,
              gref
            )[0],
            jedinica,
            dref.replace("-", "") + " - " + gref.replace("-", ""),
            interpretacija.referentniIntervalStandard(
              rezultat,
              jedinica,
              dref,
              gref
            )[1]
          ];
          break;
        case "%Retikulociti":
          return [
            test,
            rezultat,
            interpretacija.referentniIntervalStandard(
              rezultat,
              jedinica,
              dref,
              gref
            )[0],
            jedinica,
            dref.replace("-", "") + " - " + gref.replace("-", ""),
            interpretacija.referentniIntervalStandard(
              rezultat,
              jedinica,
              dref,
              gref
            )[1]
          ];
          break;
      }
    } else if (izbor === "Opšti pregled urina") {
      switch (test) {
        case "Izgled":
          return [
            test,
            rezultat,
            interpretacija.nijeBrojStandard(rezultat, jedinica, dref, gref)[0],
            jedinica,
            "Bistar",
            interpretacija.nijeBrojStandard(rezultat, jedinica, dref, gref)[1]
          ];
          break;
        case "Boja":
          return [
            test,
            rezultat,
            interpretacija.nijeBrojStandard(rezultat, jedinica, dref, gref)[0],
            jedinica,
            "Žut",
            interpretacija.nijeBrojStandard(rezultat, jedinica, dref, gref)[1]
          ];
          break;
        case "pH":
          return [
            test,
            rezultat,
            interpretacija.referentniIntervalStandard(
              rezultat,
              jedinica,
              dref,
              gref
            )[0],
            jedinica,
            dref.replace("-", "") + " - " + gref.replace("-", ""),
            interpretacija.referentniIntervalStandard(
              rezultat,
              jedinica,
              dref,
              gref
            )[1]
          ];
          break;
        case "Specifična težina":
          return [
            test,
            rezultat,
            interpretacija.referentniIntervalStandard(
              rezultat,
              jedinica,
              dref,
              gref
            )[0],
            jedinica,
            dref.replace("-", "") + " - " + gref.replace("-", ""),
            interpretacija.referentniIntervalStandard(
              rezultat,
              jedinica,
              dref,
              gref
            )[1]
          ];
          break;
        case "Proteini":
          return [
            test,
            rezultat,
            interpretacija.nijeBrojStandard(rezultat, jedinica, dref, gref)[0],
            jedinica,
            "Neg.",
            interpretacija.nijeBrojStandard(rezultat, jedinica, dref, gref)[1]
          ];
          break;
        case "Glukoza":
          return [
            test,
            rezultat,
            interpretacija.nijeBrojStandard(rezultat, jedinica, dref, gref)[0],
            jedinica,
            "Neg.",
            interpretacija.nijeBrojStandard(rezultat, jedinica, dref, gref)[1]
          ];
          break;
        case "Ketoni":
          return [
            test,
            rezultat,
            interpretacija.nijeBrojStandard(rezultat, jedinica, dref, gref)[0],
            jedinica,
            "Neg.",
            interpretacija.nijeBrojStandard(rezultat, jedinica, dref, gref)[1]
          ];
          break;
        case "Bilirubin":
          return [
            test,
            rezultat,
            interpretacija.nijeBrojStandard(rezultat, jedinica, dref, gref)[0],
            jedinica,
            "Neg.",
            interpretacija.nijeBrojStandard(rezultat, jedinica, dref, gref)[1]
          ];
          break;
        case "Urobilinogen":
          return [
            test,
            rezultat,
            interpretacija.referentniIntervalStandard(
              rezultat,
              jedinica,
              dref,
              gref
            )[0],
            jedinica,
            dref.replace("-", "") + " - " + gref.replace("-", ""),
            interpretacija.referentniIntervalStandard(
              rezultat,
              jedinica,
              dref,
              gref
            )[1]
          ];
          break;
        case "Erc/Hb":
          return [
            test,
            rezultat,
            interpretacija.nijeBrojStandard(rezultat, jedinica, dref, gref)[0],
            jedinica,
            "Neg.",
            interpretacija.nijeBrojStandard(rezultat, jedinica, dref, gref)[1]
          ];
          break;
        case "Nitriti":
          return [
            test,
            rezultat,
            interpretacija.nijeBrojStandard(rezultat, jedinica, dref, gref)[0],
            jedinica,
            "Neg.",
            interpretacija.nijeBrojStandard(rezultat, jedinica, dref, gref)[1]
          ];
          break;
        case "Leukociti":
          return [
            test,
            rezultat,
            interpretacija.nijeBrojStandard(rezultat, jedinica, dref, gref)[0],
            jedinica,
            "Neg.",
            interpretacija.nijeBrojStandard(rezultat, jedinica, dref, gref)[1]
          ];
          break;
        case "Vitamin C":
          return [
            test,
            rezultat,
            interpretacija.nijeBrojStandard(rezultat, jedinica, dref, gref)[0],
            jedinica,
            "Neg.",
            interpretacija.nijeBrojStandard(rezultat, jedinica, dref, gref)[1]
          ];
          break;
      }
    } else if (izbor === "Sediment urina") {
      switch (test) {
        case "Leukociti":
          return [
            test,
            rezultat,
            interpretacija.referentniIntervalStandard(
              rezultat,
              jedinica,
              dref,
              gref
            )[0],
            jedinica,
            dref.replace("-", "") + " - " + gref.replace("-", ""),
            interpretacija.referentniIntervalStandard(
              rezultat,
              jedinica,
              dref,
              gref
            )[1]
          ];
          break;
        case "Eritrociti":
          return [
            test,
            rezultat,
            interpretacija.referentniIntervalStandard(
              rezultat,
              jedinica,
              dref,
              gref
            )[0],
            jedinica,
            dref.replace("-", "") + " - " + gref.replace("-", ""),
            interpretacija.referentniIntervalStandard(
              rezultat,
              jedinica,
              dref,
              gref
            )[1]
          ];
          break;
        case "Epitelne ćelije - pločaste":
          return [
            test,
            rezultat,
            interpretacija.referentniIntervalStandard(
              rezultat,
              jedinica,
              dref,
              gref
            )[0],
            jedinica,
            dref.replace("-", "") + " - " + gref.replace("-", ""),
            interpretacija.referentniIntervalStandard(
              rezultat,
              jedinica,
              dref,
              gref
            )[1]
          ];
          break;
        case "Male epitelne ćelije":
          return [
            test,
            rezultat,
            interpretacija.referentniIntervalStandard(
              rezultat,
              jedinica,
              dref,
              gref
            )[0],
            jedinica,
            dref.replace("-", "") + " - " + gref.replace("-", ""),
            interpretacija.referentniIntervalStandard(
              rezultat,
              jedinica,
              dref,
              gref
            )[1]
          ];
          break;
        case "Hijalini - cilindri":
          return [
            test,
            rezultat,
            interpretacija.referentniIntervalStandard(
              rezultat,
              jedinica,
              dref,
              gref
            )[0],
            jedinica,
            dref.replace("-", "") + " - " + gref.replace("-", ""),
            interpretacija.referentniIntervalStandard(
              rezultat,
              jedinica,
              dref,
              gref
            )[1]
          ];
          break;
        case "Ostali cilindri":
          return [
            test,
            rezultat,
            interpretacija.nijeBrojStandard(rezultat, jedinica, dref, gref)[0],
            jedinica,
            "Neg.",
            interpretacija.nijeBrojStandard(rezultat, jedinica, dref, gref)[1]
          ];
          break;
        case "Bakterije":
          return [
            test,
            rezultat,
            interpretacija.nijeBrojException(rezultat, jedinica, dref, gref)[0],
            jedinica,
            "Neg.",
            interpretacija.nijeBrojException(rezultat, jedinica, dref, gref)[1]
          ];
          // return [test, rezultat, interpretacija.nijeBrojStandard(rezultat, jedinica, dref, gref)[0], jedinica, 'Neg.', interpretacija.nijeBrojStandard(rezultat, jedinica, dref, gref)[1]]
          break;
        case "Gljivice":
          return [
            test,
            rezultat,
            interpretacija.nijeBrojStandard(rezultat, jedinica, dref, gref)[0],
            jedinica,
            "Neg.",
            interpretacija.nijeBrojStandard(rezultat, jedinica, dref, gref)[1]
          ];
          break;
        case "Paraziti":
          return [
            test,
            rezultat,
            interpretacija.nijeBrojStandard(rezultat, jedinica, dref, gref)[0],
            jedinica,
            "Neg.",
            interpretacija.nijeBrojStandard(rezultat, jedinica, dref, gref)[1]
          ];
          break;
        case "Ostalo":
          return [
            test,
            rezultat,
            interpretacija.nijeBrojStandard(rezultat, jedinica, dref, gref)[0],
            jedinica,
            "n/a",
            interpretacija.nijeBrojStandard(rezultat, jedinica, dref, gref)[1]
          ];
          break;
        case "Kristali":
          return [
            test,
            rezultat,
            interpretacija.nijeBrojStandard(rezultat, jedinica, dref, gref)[0],
            jedinica,
            "n/a",
            interpretacija.nijeBrojStandard(rezultat, jedinica, dref, gref)[1]
          ];
          break;
      }
    } else if (izbor === "Double test") {
      switch (test) {
        case "Free beta HCG, serum":
          return [test, rezultat, " ", jedinica, " ", "NaN"];
          break;
        case "PAPP - A, serum":
          return [test, rezultat, " ", jedinica, " ", "NaN"];
          break;
      }
    } else if (izbor === "Triple test") {
      switch (test) {
        case "AFP, serum":
          return [test, rezultat, " ", jedinica, " ", "NaN"];
          break;
        case "HCG, serum":
          return [test, rezultat, " ", jedinica, " ", "NaN"];
          break;
        case "Estriol nekonjugirani, serum":
          return [test, rezultat, " ", jedinica, " ", "NaN"];
          break;
      }
    }

    // Panel ANTIBIOTICI a 10
    // Panel ATOPIJSKI a 20
    // Panel ATOPIJSKI a 30
    // Panel HRANA
    // Panel PEDIJATRIJSKI
    // Panel INHALATORNI - standardni
    // Panel INHALATORNI - mediteranski
    // Test intolerancije na hranu
  }
};
