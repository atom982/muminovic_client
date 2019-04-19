// Med Lab, $store.state.site: 5bc71402bf21a379083d6e07

var interpretacija = require("../shared/interpretacija");

module.exports = {
  medlabAnalitNe: function(test, rezultat, jedinica, dref, gref, site) {
    switch (test) {
      case "INR":
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
          "0.8-1.2 | AT: 2-3",
          interpretacija.referentniIntervalStandard(
            rezultat,
            jedinica,
            dref,
            gref
          )[1]
        ];
        break;
      case "PV po Quicku":
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
          "70-120 | AT: 25-40",
          interpretacija.referentniIntervalStandard(
            rezultat,
            jedinica,
            dref,
            gref
          )[1]
        ];
        break;
      case "Okultno krvarenje":
        return [
          test,
          rezultat,
          interpretacija.nijeBrojNegativan(rezultat, jedinica, dref, gref)[0],
          jedinica,
          "negativan",
          interpretacija.nijeBrojNegativan(rezultat, jedinica, dref, gref)[1]
        ];
        break;
      case "Eozinofili u nos. sekretu":
        return [
          test,
          rezultat,
          interpretacija.nijeBrojNegativan(rezultat, jedinica, dref, gref)[0],
          jedinica,
          "negativan",
          interpretacija.nijeBrojNegativan(rezultat, jedinica, dref, gref)[1]
        ];
        break;
      case "Helicobacter pylori, f":
        return [
          test,
          rezultat,
          interpretacija.nijeBrojNegativan(rezultat, jedinica, dref, gref)[0],
          jedinica,
          "negativan",
          interpretacija.nijeBrojNegativan(rezultat, jedinica, dref, gref)[1]
        ];
        break;
      case "Helicobacter pylori, s":
        return [
          test,
          rezultat,
          interpretacija.nijeBrojNegativan(rezultat, jedinica, dref, gref)[0],
          jedinica,
          "negativan",
          interpretacija.nijeBrojNegativan(rezultat, jedinica, dref, gref)[1]
        ];
        break;
      case "PSA ratio":
        return [
          test,
          rezultat,
          interpretacija.granicniIntervalVeceOd(
            rezultat,
            jedinica,
            dref,
            gref
          )[0],
          jedinica,
          " ≥ " + gref.replace("-", ""),
          interpretacija.granicniIntervalVeceOd(
            rezultat,
            jedinica,
            dref,
            gref
          )[1]
        ];
        break;
      case "LH":
        return [test, rezultat, "", jedinica, "*", "No Class"];
        break;
      case "FSH":
        return [test, rezultat, "", jedinica, "*", "No Class"];
        break;
      case "Estradiol":
        return [test, rezultat, "", jedinica, "*", "No Class"];
        break;
      case "Progesteron":
        return [test, rezultat, "", jedinica, "*", "No Class"];
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
            "/",
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
            interpretacija.granicniIntervalManjeOd(
              rezultat,
              jedinica,
              dref,
              gref
            )[0],
            jedinica,
            " < " + gref.replace("-", ""),
            interpretacija.granicniIntervalManjeOd(
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

  medlabAnalitDa: function(izbor, test, rezultat, jedinica, dref, gref, site) {
    if (test === null) {
      test = "";
    } else {
      test = test.trim();
    }

    if (izbor === null) {
      izbor = "";
    } else {
      izbor = izbor.trim();
    }

    if (
      izbor === "Kompletna krvna slika, 3 diff" ||
      izbor === "Retikulociti" ||
      izbor === "DKS - mikroskopski"
    ) {
      switch (test) {
        case "Reaktivni limfociti":
          return [
            test,
            rezultat,
            interpretacija.referentniIntervalPrisutno(
              rezultat,
              jedinica,
              dref,
              gref
            )[0],
            jedinica,
            "0",
            interpretacija.referentniIntervalPrisutno(
              rezultat,
              jedinica,
              dref,
              gref
            )[1]
          ];
          break;
        default:
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
    } else if (izbor === "Krvna grupa i Rh faktor") {
      switch (test) {
        case "Krvna grupa":
          return [
            test,
            rezultat,
            interpretacija.nijeBrojKrvnaGrupa(
              rezultat,
              jedinica,
              dref,
              gref
            )[0],
            jedinica,
            "/",
            interpretacija.nijeBrojKrvnaGrupa(rezultat, jedinica, dref, gref)[1]
          ];
          break;
        case "Rh faktor":
          return [
            test,
            rezultat,
            interpretacija.nijeBrojRhFaktor(rezultat, jedinica, dref, gref)[0],
            jedinica,
            "/",
            interpretacija.nijeBrojRhFaktor(rezultat, jedinica, dref, gref)[1]
          ];
          break;
      }
    } else if (izbor === "Opšti pregled urina") {
      switch (test) {
        case "Izgled":
          return [
            test,
            rezultat,
            interpretacija.OPUrinIzgled(rezultat, jedinica, dref, gref)[0],
            jedinica,
            "bistar",
            interpretacija.OPUrinIzgled(rezultat, jedinica, dref, gref)[1]
          ];
          break;
        case "Boja":
          return [
            test,
            rezultat,
            interpretacija.OPUrinBoja(rezultat, jedinica, dref, gref)[0],
            jedinica,
            "žut",
            interpretacija.OPUrinBoja(rezultat, jedinica, dref, gref)[1]
          ];
          break;
        case "Bilirubin":
          return [
            test,
            rezultat,
            interpretacija.nijeBrojNegativan(rezultat, jedinica, dref, gref)[0],
            jedinica,
            "negativan",
            interpretacija.nijeBrojNegativan(rezultat, jedinica, dref, gref)[1]
          ];
          break;
        case "Urobilinogen":
          return [
            test,
            rezultat,
            interpretacija.nijeBrojNormalan(rezultat, jedinica, dref, gref)[0],
            jedinica,
            "normalan",
            interpretacija.nijeBrojNormalan(rezultat, jedinica, dref, gref)[1]
          ];
          break;
        case "Ketonski spojevi":
          return [
            test,
            rezultat,
            interpretacija.nijeBrojNegativan(rezultat, jedinica, dref, gref)[0],
            jedinica,
            "negativan",
            interpretacija.nijeBrojNegativan(rezultat, jedinica, dref, gref)[1]
          ];
          break;
        case "Askorbinska kiselina":
          return [
            test,
            rezultat,
            interpretacija.nijeBrojNegativan(rezultat, jedinica, dref, gref)[0],
            jedinica,
            "negativan",
            interpretacija.nijeBrojNegativan(rezultat, jedinica, dref, gref)[1]
          ];
          break;
        case "Glukoza":
          return [
            test,
            rezultat,
            interpretacija.nijeBrojNormalan(rezultat, jedinica, dref, gref)[0],
            jedinica,
            "normalan",
            interpretacija.nijeBrojNormalan(rezultat, jedinica, dref, gref)[1]
          ];
          break;
        case "Proteini":
          return [
            test,
            rezultat,
            interpretacija.nijeBrojNegativan(rezultat, jedinica, dref, gref)[0],
            jedinica,
            "negativan",
            interpretacija.nijeBrojNegativan(rezultat, jedinica, dref, gref)[1]
          ];
          break;
        case "Eritrociti":
          return [
            test,
            rezultat,
            interpretacija.nijeBrojNegativan(rezultat, jedinica, dref, gref)[0],
            jedinica,
            "negativan",
            interpretacija.nijeBrojNegativan(rezultat, jedinica, dref, gref)[1]
          ];
          break;
        case "Ph":
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
        case "Nitriti":
          return [
            test,
            rezultat,
            interpretacija.nijeBrojNegativan(rezultat, jedinica, dref, gref)[0],
            jedinica,
            "negativan",
            interpretacija.nijeBrojNegativan(rezultat, jedinica, dref, gref)[1]
          ];
          break;
        case "Leukociti":
          return [
            test,
            rezultat,
            interpretacija.nijeBrojNegativan(rezultat, jedinica, dref, gref)[0],
            jedinica,
            "negativan",
            interpretacija.nijeBrojNegativan(rezultat, jedinica, dref, gref)[1]
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
      }
    } else if (izbor === "Sediment urina") {
      switch (test) {
        case "Leukocita":
          return [
            test,
            rezultat,
            interpretacija.SedimentLeukocitiEritrocitiMedLabDosta(
              rezultat,
              jedinica,
              dref,
              gref
            )[0],
            jedinica,
            dref.replace("-", "") + " - " + gref.replace("-", ""),
            interpretacija.SedimentLeukocitiEritrocitiMedLabDosta(
              rezultat,
              jedinica,
              dref,
              gref
            )[1]
          ];
          break;
        case "Eritrocita":
          return [
            test,
            rezultat,
            interpretacija.SedimentLeukocitiEritrocitiMedLabDosta(
              rezultat,
              jedinica,
              dref,
              gref
            )[0],
            jedinica,
            dref.replace("-", "") + " - " + gref.replace("-", ""),
            interpretacija.SedimentLeukocitiEritrocitiMedLabDosta(
              rezultat,
              jedinica,
              dref,
              gref
            )[1]
          ];
          break;
        case "Epitel pločasti":
          return [
            test,
            rezultat,
            interpretacija.SedimentLeukocitiEritrocitiMedLabDosta(
              rezultat,
              jedinica,
              dref,
              gref
            )[0],
            jedinica,
            dref.replace("-", "") + " - " + gref.replace("-", ""),
            interpretacija.SedimentLeukocitiEritrocitiMedLabDosta(
              rezultat,
              jedinica,
              dref,
              gref
            )[1]
          ];
          break;
        case "Epitel okrugli":
          return [
            test,
            rezultat,
            interpretacija.SedimentLeukocitiEritrocitiMedLabDosta(
              rezultat,
              jedinica,
              dref,
              gref
            )[0],
            jedinica,
            dref.replace("-", "") + " - " + gref.replace("-", ""),
            interpretacija.SedimentLeukocitiEritrocitiMedLabDosta(
              rezultat,
              jedinica,
              dref,
              gref
            )[1]
          ];
          break;
        case "Amorfni fosfati":
          return [
            test,
            rezultat,
            interpretacija.nijeBrojNegativan(rezultat, jedinica, dref, gref)[0],
            jedinica,
            "negativan",
            interpretacija.nijeBrojNegativan(rezultat, jedinica, dref, gref)[1]
          ];
          break;
        case "Amorfni urati":
          return [
            test,
            rezultat,
            interpretacija.nijeBrojNegativan(rezultat, jedinica, dref, gref)[0],
            jedinica,
            "negativan",
            interpretacija.nijeBrojNegativan(rezultat, jedinica, dref, gref)[1]
          ];
          break;
        case "Bakterija":
          return [
            test,
            rezultat,
            interpretacija.nijeBrojNegativan(rezultat, jedinica, dref, gref)[0],
            jedinica,
            "negativan",
            interpretacija.nijeBrojNegativan(rezultat, jedinica, dref, gref)[1]
          ];
          break;
        case "Ca - oxalati":
          return [
            test,
            rezultat,
            interpretacija.nijeBrojNegativan(rezultat, jedinica, dref, gref)[0],
            jedinica,
            "negativan",
            interpretacija.nijeBrojNegativan(rezultat, jedinica, dref, gref)[1]
          ];
          break;
        case "Mokraćna kiselina":
          return [
            test,
            rezultat,
            interpretacija.nijeBrojNegativan(rezultat, jedinica, dref, gref)[0],
            jedinica,
            "negativan",
            interpretacija.nijeBrojNegativan(rezultat, jedinica, dref, gref)[1]
          ];
          break;
        case "Sluz":
          return [
            test,
            rezultat,
            interpretacija.nijeBrojNegativan(rezultat, jedinica, dref, gref)[0],
            jedinica,
            "negativan",
            interpretacija.nijeBrojNegativan(rezultat, jedinica, dref, gref)[1]
          ];
          break;
        case "Urati":
          return [
            test,
            rezultat,
            interpretacija.nijeBrojNegativan(rezultat, jedinica, dref, gref)[0],
            jedinica,
            "negativan",
            interpretacija.nijeBrojNegativan(rezultat, jedinica, dref, gref)[1]
          ];
          break;
        case "Gljivica":
          return [
            test,
            rezultat,
            interpretacija.referentniIntervalPrisutnoGljivice(
              rezultat,
              jedinica,
              dref,
              gref
            )[0],
            jedinica,
            "0",
            interpretacija.referentniIntervalPrisutnoGljivice(
              rezultat,
              jedinica,
              dref,
              gref
            )[1]
          ];
          break;
        case "Soli":
          return [
            test,
            rezultat,
            interpretacija.referentniIntervalPrisutno(
              rezultat,
              jedinica,
              dref,
              gref
            )[0],
            jedinica,
            "0",
            interpretacija.referentniIntervalPrisutno(
              rezultat,
              jedinica,
              dref,
              gref
            )[1]
          ];
          break;
        case "Cilindara":
          return [
            test,
            rezultat,
            interpretacija.referentniIntervalPrisutno(
              rezultat,
              jedinica,
              dref,
              gref
            )[0],
            jedinica,
            "0",
            interpretacija.referentniIntervalPrisutno(
              rezultat,
              jedinica,
              dref,
              gref
            )[1]
          ];
          break;
        case "Ćelijski cilindri":
          return [
            test,
            rezultat,
            interpretacija.referentniIntervalPrisutno(
              rezultat,
              jedinica,
              dref,
              gref
            )[0],
            jedinica,
            "0",
            interpretacija.referentniIntervalPrisutno(
              rezultat,
              jedinica,
              dref,
              gref
            )[1]
          ];
          break;
        case "Spermatozoida":
          return [
            test,
            rezultat,
            interpretacija.referentniIntervalPrisutno(
              rezultat,
              jedinica,
              dref,
              gref
            )[0],
            jedinica,
            "0",
            interpretacija.referentniIntervalPrisutno(
              rezultat,
              jedinica,
              dref,
              gref
            )[1]
          ];
          break;
      }
    }
  }
};
