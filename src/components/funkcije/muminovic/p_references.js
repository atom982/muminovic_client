// PZU Muminović, $store.state.site: 5bd40c16020d6d21bbaf610c

var interpretacija = require("../shared/interpretacija");

module.exports = {
  muminovicAnalitNe: function(test, rezultat, jedinica, dref, gref, site) {
    var tmp_naziv;

    if (test.includes("]")) {
      tmp_naziv = test.split("]")[1].trim();
    } else {
      tmp_naziv = test;
    }

    switch (tmp_naziv) {
      case "HIV": // Nije broj
        return [
          test,
          rezultat,
          interpretacija.nijeBrojNereaktivan(rezultat, jedinica, dref, gref)[0],
          jedinica,
          "nereaktivan",
          interpretacija.nijeBrojNereaktivan(rezultat, jedinica, dref, gref)[1]
        ];
        break;
      case "Syphilis - TPH": // Nije broj
        return [
          test,
          rezultat,
          interpretacija.nijeBrojNereaktivan(rezultat, jedinica, dref, gref)[0],
          jedinica,
          "nereaktivan",
          interpretacija.nijeBrojNereaktivan(rezultat, jedinica, dref, gref)[1]
        ];
        break;
      case 'Anti SARS-CoV2-IgG': // Nije broj
        return [test, rezultat, interpretacija.CoV2IgG(rezultat, jedinica, dref, gref)[0], jedinica, '< 1.4 - negativan', interpretacija.CoV2IgG(rezultat, jedinica, dref, gref)[1]]
        break;
      case 'Anti SARS-CoV2-IgM': // Nije broj
        return [test, rezultat, interpretacija.CoV2IgM(rezultat, jedinica, dref, gref)[0], jedinica, '< 1.0 - negativan', interpretacija.CoV2IgM(rezultat, jedinica, dref, gref)[1]]
        break;
      case "HBsAg": // Nije broj
        return [
          test,
          rezultat,
          interpretacija.nijeBrojNereaktivan(rezultat, jedinica, dref, gref)[0],
          jedinica,
          "nereaktivan",
          interpretacija.nijeBrojNereaktivan(rezultat, jedinica, dref, gref)[1]
        ];
        break;
      case "Anti HBc Total": // Nije broj
        return [
          test,
          rezultat,
          interpretacija.nijeBrojNereaktivan(rezultat, jedinica, dref, gref)[0],
          jedinica,
          "nereaktivan",
          interpretacija.nijeBrojNereaktivan(rezultat, jedinica, dref, gref)[1]
        ];
        break;
      case "Anti HAV - IgM": // Nije broj
        return [
          test,
          rezultat,
          interpretacija.nijeBrojNereaktivan(rezultat, jedinica, dref, gref)[0],
          jedinica,
          "nereaktivan",
          interpretacija.nijeBrojNereaktivan(rezultat, jedinica, dref, gref)[1]
        ];
        break;
      case "Anti HBc - IgM": // Nije broj
        return [
          test,
          rezultat,
          interpretacija.nijeBrojNereaktivan(rezultat, jedinica, dref, gref)[0],
          jedinica,
          "nereaktivan",
          interpretacija.nijeBrojNereaktivan(rezultat, jedinica, dref, gref)[1]
        ];
        break;
      case "Anti - HBs": // Nije broj
        return [
          test,
          rezultat,
          interpretacija.nijeBrojNereaktivan(rezultat, jedinica, dref, gref)[0],
          jedinica,
          "nereaktivan",
          interpretacija.nijeBrojNereaktivan(rezultat, jedinica, dref, gref)[1]
        ];
        break;
      case "Anti - HCV": // Nije broj
        return [
          test,
          rezultat,
          interpretacija.nijeBrojNereaktivan(rezultat, jedinica, dref, gref)[0],
          jedinica,
          "nereaktivan",
          interpretacija.nijeBrojNereaktivan(rezultat, jedinica, dref, gref)[1]
        ];
        break;
      case "IgE": // Nije broj
        return [
          test,
          rezultat,
          interpretacija.nijeBrojNereaktivan(rezultat, jedinica, dref, gref)[0],
          jedinica,
          "nereaktivan",
          interpretacija.nijeBrojNereaktivan(rezultat, jedinica, dref, gref)[1]
        ];
        break;

      case "ANA Screen": // Nije broj
        return [
          test,
          rezultat,
          interpretacija.nijeBrojNegativan(rezultat, jedinica, dref, gref)[0],
          jedinica,
          "negativan",
          interpretacija.nijeBrojNegativan(rezultat, jedinica, dref, gref)[1]
        ];
        break;
      case "ENA Screen": // Nije broj
        return [
          test,
          rezultat,
          interpretacija.nijeBrojNegativan(rezultat, jedinica, dref, gref)[0],
          jedinica,
          "negativan",
          interpretacija.nijeBrojNegativan(rezultat, jedinica, dref, gref)[1]
        ];
        break;
      case "Anti ds DNA Screen": // Nije broj
        return [
          test,
          rezultat,
          interpretacija.nijeBrojNegativan(rezultat, jedinica, dref, gref)[0],
          jedinica,
          "negativan",
          interpretacija.nijeBrojNegativan(rezultat, jedinica, dref, gref)[1]
        ];
        break;
      case "Anti DGP IgA": // Nije broj
        return [
          test,
          rezultat,
          interpretacija.nijeBrojNegativan(rezultat, jedinica, dref, gref)[0],
          jedinica,
          "negativan",
          interpretacija.nijeBrojNegativan(rezultat, jedinica, dref, gref)[1]
        ];
        break;
      case "Anti DGP IgG": // Nije broj
        return [
          test,
          rezultat,
          interpretacija.nijeBrojNegativan(rezultat, jedinica, dref, gref)[0],
          jedinica,
          "negativan",
          interpretacija.nijeBrojNegativan(rezultat, jedinica, dref, gref)[1]
        ];
        break;
      case "Anti Gliadin IgA": // Nije broj
        return [
          test,
          rezultat,
          interpretacija.nijeBrojNegativan(rezultat, jedinica, dref, gref)[0],
          jedinica,
          "negativan",
          interpretacija.nijeBrojNegativan(rezultat, jedinica, dref, gref)[1]
        ];
        break;
      case "Anti Gliadin IgG": // Nije broj
        return [
          test,
          rezultat,
          interpretacija.nijeBrojNegativan(rezultat, jedinica, dref, gref)[0],
          jedinica,
          "negativan",
          interpretacija.nijeBrojNegativan(rezultat, jedinica, dref, gref)[1]
        ];
        break;
      case "Anti TTG IgA": // Nije broj
        return [
          test,
          rezultat,
          interpretacija.nijeBrojNegativan(rezultat, jedinica, dref, gref)[0],
          jedinica,
          "negativan",
          interpretacija.nijeBrojNegativan(rezultat, jedinica, dref, gref)[1]
        ];
        break;
      case "Anti TTG IgG": // Nije broj
        return [
          test,
          rezultat,
          interpretacija.nijeBrojNegativan(rezultat, jedinica, dref, gref)[0],
          jedinica,
          "negativan",
          interpretacija.nijeBrojNegativan(rezultat, jedinica, dref, gref)[1]
        ];
        break;
      case "Anti Intrinsic Factor": // Nije broj
        return [
          test,
          rezultat,
          interpretacija.nijeBrojNegativan(rezultat, jedinica, dref, gref)[0],
          jedinica,
          "negativan",
          interpretacija.nijeBrojNegativan(rezultat, jedinica, dref, gref)[1]
        ];
        break;
      case "Anti - MCV IgG": // Nije broj
        return [
          test,
          rezultat,
          interpretacija.nijeBrojNegativan(rezultat, jedinica, dref, gref)[0],
          jedinica,
          "negativan",
          interpretacija.nijeBrojNegativan(rezultat, jedinica, dref, gref)[1]
        ];
        break;
      case "Helicobacter pylori": // Nije broj
        return [
          test,
          rezultat,
          interpretacija.nijeBrojNegativan(rezultat, jedinica, dref, gref)[0],
          jedinica,
          "negativan",
          interpretacija.nijeBrojNegativan(rezultat, jedinica, dref, gref)[1]
        ];
        break;
      case "Okultno krvarenje": // Nije broj
        return [
          test,
          rezultat,
          interpretacija.nijeBrojNegativan(rezultat, jedinica, dref, gref)[0],
          jedinica,
          "negativan",
          interpretacija.nijeBrojNegativan(rezultat, jedinica, dref, gref)[1]
        ];
        break;
      case "HDL kolesterol": // Granični interval
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
        case "PSA ratio": // Granični interval
        return [
          test,
          rezultat,
          interpretacija.granicniIntervalGreater(
            rezultat,
            jedinica,
            dref,
            gref
          )[0],
          jedinica,
          " > " + gref.replace("-", ""),
          interpretacija.granicniIntervalGreater(
            rezultat,
            jedinica,
            dref,
            gref
          )[1]
        ];
        break;
      case "LH": // *
        return [test, rezultat, "", jedinica, "*", "No Class"];
        break;
      case "FSH": // *
        return [test, rezultat, "", jedinica, "*", "No Class"];
        break;
      case "Estradiol": // *
        return [test, rezultat, "", jedinica, "*", "No Class"];
        break;
      case "Progesteron": // *
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

  muminovicAnalitDa: function(
    izbor,
    test,
    rezultat,
    jedinica,
    dref,
    gref,
    site
  ) {
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
      izbor === "Krvna slika" ||
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
        case "Ketoni":
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
        default:
          return [test, rezultat, "", jedinica, "", "No Class"];
          break;
      }
    } else if (izbor === "Sediment urina") {
      switch (test) {
        case "Leukociti":
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
        case "Eritrociti":
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
        case "Bakterije":
          return [
            test,
            rezultat,
            interpretacija.SedimentMaloDostaMasa(
              rezultat,
              jedinica,
              dref,
              gref
            )[0],
            jedinica,
            "0",
            interpretacija.SedimentMaloDostaMasa(
              rezultat,
              jedinica,
              dref,
              gref
            )[1]
          ];
          break;
        case "Pločasti epitel":
          return [
            test,
            rezultat,
            interpretacija.SedimentMaloDostaMasa(
              rezultat,
              jedinica,
              dref,
              gref
            )[0],
            jedinica,
            "pokoji",
            interpretacija.SedimentMaloDostaMasa(
              rezultat,
              jedinica,
              dref,
              gref
            )[1]
          ];
          break;
        case "Epitelne stanice":
          return [
            test,
            rezultat,
            interpretacija.SedimentMaloDostaMasa(
              rezultat,
              jedinica,
              dref,
              gref
            )[0],
            jedinica,
            "pokoji",
            interpretacija.SedimentMaloDostaMasa(
              rezultat,
              jedinica,
              dref,
              gref
            )[1]
          ];
          break;
        case "Sluz":
          return [
            test,
            rezultat,
            interpretacija.SedimentMaloDostaMasa(
              rezultat,
              jedinica,
              dref,
              gref
            )[0],
            jedinica,
            "0",
            interpretacija.SedimentMaloDostaMasa(
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
            interpretacija.SedimentSveOsimNula(
              rezultat,
              jedinica,
              dref,
              gref
            )[0],
            jedinica,
            "0",
            interpretacija.SedimentSveOsimNula(
              rezultat,
              jedinica,
              dref,
              gref
            )[1]
          ];
          break;
        case "Gljivice":
          return [
            test,
            rezultat,
            interpretacija.SedimentMaloDostaMasa(
              rezultat,
              jedinica,
              dref,
              gref
            )[0],
            jedinica,
            "negativan",
            interpretacija.SedimentMaloDostaMasa(
              rezultat,
              jedinica,
              dref,
              gref
            )[1]
          ];
          break;
        case "Kristali":
          return [
            test,
            rezultat,
            interpretacija.SedimentSveOsimNula(
              rezultat,
              jedinica,
              dref,
              gref
            )[0],
            jedinica,
            "0",
            interpretacija.SedimentSveOsimNula(
              rezultat,
              jedinica,
              dref,
              gref
            )[1]
          ];
          break;
        case "Cilindri":
          return [
            test,
            rezultat,
            interpretacija.SedimentSveOsimNula(
              rezultat,
              jedinica,
              dref,
              gref
            )[0],
            jedinica,
            "0",
            interpretacija.SedimentSveOsimNula(
              rezultat,
              jedinica,
              dref,
              gref
            )[1]
          ];
          break;
        case "Paraziti":
          return [
            test,
            rezultat,
            interpretacija.SedimentMaloDostaMasa(
              rezultat,
              jedinica,
              dref,
              gref
            )[0],
            jedinica,
            "negativan",
            interpretacija.SedimentMaloDostaMasa(
              rezultat,
              jedinica,
              dref,
              gref
            )[1]
          ];
          break;
        case "Spermatozoidi":
          return [
            test,
            rezultat,
            interpretacija.SedimentMaloDostaMasa(
              rezultat,
              jedinica,
              dref,
              gref
            )[0],
            jedinica,
            "negativan",
            interpretacija.SedimentMaloDostaMasa(
              rezultat,
              jedinica,
              dref,
              gref
            )[1]
          ];
          break;
        case "Trichomonas vaginalis":
          return [
            test,
            rezultat,
            interpretacija.SedimentMaloDostaMasa(
              rezultat,
              jedinica,
              dref,
              gref
            )[0],
            jedinica,
            "negativan",
            interpretacija.SedimentMaloDostaMasa(
              rezultat,
              jedinica,
              dref,
              gref
            )[1]
          ];
          break;
        default:
          return [test, rezultat, "", jedinica, "", "No Class"];
          break;
      }
    } else if (izbor === "Inzulinska rezistencija - HOMA INDEX") {
      switch (test) {
        case "Aktivnost beta stanica gušterače-%B":
          return [
            test,
            rezultat,
            interpretacija.nijeBrojHOMAi(rezultat, jedinica, dref, gref)[0],
            jedinica,
            "(100)",
            interpretacija.nijeBrojHOMAi(rezultat, jedinica, dref, gref)[1]
          ];
          break;
        case "Periferna osjetljivost na inzulin-%S":
          return [
            test,
            rezultat,
            interpretacija.nijeBrojHOMAi(rezultat, jedinica, dref, gref)[0],
            jedinica,
            "(100)",
            interpretacija.nijeBrojHOMAi(rezultat, jedinica, dref, gref)[1]
          ];
          break;
        case "Inzulinska rezistencija-IR":
          return [
            test,
            rezultat,
            interpretacija.nijeBrojHOMAi(rezultat, jedinica, dref, gref)[0],
            jedinica,
            "(do 1.4)",
            interpretacija.nijeBrojHOMAi(rezultat, jedinica, dref, gref)[1]
          ];
          break;
      }
    }
  }
};
