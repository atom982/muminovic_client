// BIH MEDICINSKI LABORATORIJ (Sarajevo - Stup), $store.state.site: 5c69f68c338fe912f99f833b

var interpretacija = require("../shared/interpretacija");

module.exports = {
  bihlabAnalitNe: function(test, rezultat, jedinica, dref, gref, site) {
    var tmp_naziv;

    if (test.includes("]")) {
      tmp_naziv = test.split("]")[1].trim();
    } else {
      tmp_naziv = test;
    }

    switch (tmp_naziv) {
      case "Sedimentacija":
        return [
          test,
          rezultat,
          interpretacija.Sedimentacija(rezultat, jedinica, dref, gref)[0],
          jedinica,
          " < " + gref.replace("-", ""),
          interpretacija.Sedimentacija(rezultat, jedinica, dref, gref)[1]
        ];
        break;

      case "Kreatinin klirens":
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
          " > " + gref.replace("-", ""),
          interpretacija.granicniIntervalVeceOd(
            rezultat,
            jedinica,
            dref,
            gref
          )[1]
        ];
        break;

      case "Hepatitis A virus IgG AT":
        return [
          test,
          rezultat,
          interpretacija.nijeBrojNegativanPozGr(
            rezultat,
            jedinica,
            dref,
            gref
          )[0],
          jedinica,
          "negativan",
          interpretacija.nijeBrojNegativanPozGr(
            rezultat,
            jedinica,
            dref,
            gref
          )[1]
        ];
        break;
      case "Hbe - Ag":
        return [
          test,
          rezultat,
          interpretacija.nijeBrojNegativanPozGr(
            rezultat,
            jedinica,
            dref,
            gref
          )[0],
          jedinica,
          "negativan",
          interpretacija.nijeBrojNegativanPozGr(
            rezultat,
            jedinica,
            dref,
            gref
          )[1]
        ];
        break;
      case "Hepatitis C virus AT":
        return [
          test,
          rezultat,
          interpretacija.nijeBrojNegativanPozGr(
            rezultat,
            jedinica,
            dref,
            gref
          )[0],
          jedinica,
          "negativan",
          interpretacija.nijeBrojNegativanPozGr(
            rezultat,
            jedinica,
            dref,
            gref
          )[1]
        ];
        break;

      case "Anti HBc - IgG AT":
        return [
          test,
          rezultat,
          interpretacija.granicniIntervalNegGrPoz(
            rezultat,
            jedinica,
            dref,
            gref
          )[0],
          jedinica,
          dref.replace("-", "") + " - " + gref.replace("-", ""),
          interpretacija.granicniIntervalNegGrPoz(
            rezultat,
            jedinica,
            dref,
            gref
          )[1]
        ];
        break;
      case "anti Hbe AT":
        return [
          test,
          rezultat,
          interpretacija.granicniIntervalNegGrPoz(
            rezultat,
            jedinica,
            dref,
            gref
          )[0],
          jedinica,
          dref.replace("-", "") + " - " + gref.replace("-", ""),
          interpretacija.granicniIntervalNegGrPoz(
            rezultat,
            jedinica,
            dref,
            gref
          )[1]
        ];
        break;
      case "anti Hbs AT":
        return [
          test,
          rezultat,
          interpretacija.granicniIntervalNegGrPoz(
            rezultat,
            jedinica,
            dref,
            gref
          )[0],
          jedinica,
          dref.replace("-", "") + " - " + gref.replace("-", ""),
          interpretacija.granicniIntervalNegGrPoz(
            rezultat,
            jedinica,
            dref,
            gref
          )[1]
        ];
        break;
      case "Anticardiolipin AT IgM":
        return [
          test,
          rezultat,
          interpretacija.granicniIntervalNegGrPoz(
            rezultat,
            jedinica,
            dref,
            gref
          )[0],
          jedinica,
          dref.replace("-", "") + " - " + gref.replace("-", ""),
          interpretacija.granicniIntervalNegGrPoz(
            rezultat,
            jedinica,
            dref,
            gref
          )[1]
        ];
        break;
      case "Borrelia Burgdorferi IgG AT":
        return [
          test,
          rezultat,
          interpretacija.granicniIntervalNegGrPoz(
            rezultat,
            jedinica,
            dref,
            gref
          )[0],
          jedinica,
          dref.replace("-", "") + " - " + gref.replace("-", ""),
          interpretacija.granicniIntervalNegGrPoz(
            rezultat,
            jedinica,
            dref,
            gref
          )[1]
        ];
        break;
      case "Borrelia Burgdorferi IgM AT":
        return [
          test,
          rezultat,
          interpretacija.granicniIntervalNegGrPoz(
            rezultat,
            jedinica,
            dref,
            gref
          )[0],
          jedinica,
          dref.replace("-", "") + " - " + gref.replace("-", ""),
          interpretacija.granicniIntervalNegGrPoz(
            rezultat,
            jedinica,
            dref,
            gref
          )[1]
        ];
        break;
      case "Bordetella pertussis IgG AT":
        return [
          test,
          rezultat,
          interpretacija.granicniIntervalNegGrPoz(
            rezultat,
            jedinica,
            dref,
            gref
          )[0],
          jedinica,
          dref.replace("-", "") + " - " + gref.replace("-", ""),
          interpretacija.granicniIntervalNegGrPoz(
            rezultat,
            jedinica,
            dref,
            gref
          )[1]
        ];
        break;
      case "Cytomegalie IgG AT":
        return [
          test,
          rezultat,
          interpretacija.granicniIntervalNegGrPoz(
            rezultat,
            jedinica,
            dref,
            gref
          )[0],
          jedinica,
          dref.replace("-", "") + " - " + gref.replace("-", ""),
          interpretacija.granicniIntervalNegGrPoz(
            rezultat,
            jedinica,
            dref,
            gref
          )[1]
        ];
        break;
      case "Cytomegalie IgM AT":
        return [
          test,
          rezultat,
          interpretacija.granicniIntervalNegGrPoz(
            rezultat,
            jedinica,
            dref,
            gref
          )[0],
          jedinica,
          dref.replace("-", "") + " - " + gref.replace("-", ""),
          interpretacija.granicniIntervalNegGrPoz(
            rezultat,
            jedinica,
            dref,
            gref
          )[1]
        ];
        break;
      case "Anti ds-DNA IgG":
        return [
          test,
          rezultat,
          interpretacija.granicniIntervalNegGrPoz(
            rezultat,
            jedinica,
            dref,
            gref
          )[0],
          jedinica,
          dref.replace("-", "") + " - " + gref.replace("-", ""),
          interpretacija.granicniIntervalNegGrPoz(
            rezultat,
            jedinica,
            dref,
            gref
          )[1]
        ];
        break;
      case "Epstein-Barr-Nuclear Ag":
        return [
          test,
          rezultat,
          interpretacija.granicniIntervalNegGrPoz(
            rezultat,
            jedinica,
            dref,
            gref
          )[0],
          jedinica,
          dref.replace("-", "") + " - " + gref.replace("-", ""),
          interpretacija.granicniIntervalNegGrPoz(
            rezultat,
            jedinica,
            dref,
            gref
          )[1]
        ];
        break;
      case "Epstein-Barr-virus IgM AT":
        return [
          test,
          rezultat,
          interpretacija.granicniIntervalNegGrPoz(
            rezultat,
            jedinica,
            dref,
            gref
          )[0],
          jedinica,
          dref.replace("-", "") + " - " + gref.replace("-", ""),
          interpretacija.granicniIntervalNegGrPoz(
            rezultat,
            jedinica,
            dref,
            gref
          )[1]
        ];
        break;
      case "Anti HAV-IgM":
        return [
          test,
          rezultat,
          interpretacija.granicniIntervalNegGrPoz(
            rezultat,
            jedinica,
            dref,
            gref
          )[0],
          jedinica,
          dref.replace("-", "") + " - " + gref.replace("-", ""),
          interpretacija.granicniIntervalNegGrPoz(
            rezultat,
            jedinica,
            dref,
            gref
          )[1]
        ];
        break;
      case "Anti HBc IgM":
        return [
          test,
          rezultat,
          interpretacija.granicniIntervalNegGrPoz(
            rezultat,
            jedinica,
            dref,
            gref
          )[0],
          jedinica,
          dref.replace("-", "") + " - " + gref.replace("-", ""),
          interpretacija.granicniIntervalNegGrPoz(
            rezultat,
            jedinica,
            dref,
            gref
          )[1]
        ];
        break;
      case "Hepatitis B virus Ag":
        return [
          test,
          rezultat,
          interpretacija.granicniIntervalNegGrPoz(
            rezultat,
            jedinica,
            dref,
            gref
          )[0],
          jedinica,
          dref.replace("-", "") + " - " + gref.replace("-", ""),
          interpretacija.granicniIntervalNegGrPoz(
            rezultat,
            jedinica,
            dref,
            gref
          )[1]
        ];
        break;
      case "Herpes simplex virus IgG AT":
        return [
          test,
          rezultat,
          interpretacija.granicniIntervalNegGrPoz(
            rezultat,
            jedinica,
            dref,
            gref
          )[0],
          jedinica,
          dref.replace("-", "") + " - " + gref.replace("-", ""),
          interpretacija.granicniIntervalNegGrPoz(
            rezultat,
            jedinica,
            dref,
            gref
          )[1]
        ];
        break;
      case "Herpes simplex virus IgM AT":
        return [
          test,
          rezultat,
          interpretacija.granicniIntervalNegGrPoz(
            rezultat,
            jedinica,
            dref,
            gref
          )[0],
          jedinica,
          dref.replace("-", "") + " - " + gref.replace("-", ""),
          interpretacija.granicniIntervalNegGrPoz(
            rezultat,
            jedinica,
            dref,
            gref
          )[1]
        ];
        break;
      case "Parvo B-19 virus IgG AT":
        return [
          test,
          rezultat,
          interpretacija.granicniIntervalNegGrPoz(
            rezultat,
            jedinica,
            dref,
            gref
          )[0],
          jedinica,
          dref.replace("-", "") + " - " + gref.replace("-", ""),
          interpretacija.granicniIntervalNegGrPoz(
            rezultat,
            jedinica,
            dref,
            gref
          )[1]
        ];
        break;
      case "Parvo B-19 virus IgM AT":
        return [
          test,
          rezultat,
          interpretacija.granicniIntervalNegGrPoz(
            rezultat,
            jedinica,
            dref,
            gref
          )[0],
          jedinica,
          dref.replace("-", "") + " - " + gref.replace("-", ""),
          interpretacija.granicniIntervalNegGrPoz(
            rezultat,
            jedinica,
            dref,
            gref
          )[1]
        ];
        break;
      case "Rubeola virus IgM AT":
        return [
          test,
          rezultat,
          interpretacija.granicniIntervalNegGrPoz(
            rezultat,
            jedinica,
            dref,
            gref
          )[0],
          jedinica,
          dref.replace("-", "") + " - " + gref.replace("-", ""),
          interpretacija.granicniIntervalNegGrPoz(
            rezultat,
            jedinica,
            dref,
            gref
          )[1]
        ];
        break;
      case "Rubeola virus IgG AT":
        return [
          test,
          rezultat,
          interpretacija.granicniIntervalNegGrPoz(
            rezultat,
            jedinica,
            dref,
            gref
          )[0],
          jedinica,
          dref.replace("-", "") + " - " + gref.replace("-", ""),
          interpretacija.granicniIntervalNegGrPoz(
            rezultat,
            jedinica,
            dref,
            gref
          )[1]
        ];
        break;
      case "Toxoplasma Gondii IgM AT":
        return [
          test,
          rezultat,
          interpretacija.granicniIntervalNegGrPoz(
            rezultat,
            jedinica,
            dref,
            gref
          )[0],
          jedinica,
          dref.replace("-", "") + " - " + gref.replace("-", ""),
          interpretacija.granicniIntervalNegGrPoz(
            rezultat,
            jedinica,
            dref,
            gref
          )[1]
        ];
        break;
      case "Toxoplasma Gondii IgG AT":
        return [
          test,
          rezultat,
          interpretacija.granicniIntervalNegGrPoz(
            rezultat,
            jedinica,
            dref,
            gref
          )[0],
          jedinica,
          dref.replace("-", "") + " - " + gref.replace("-", ""),
          interpretacija.granicniIntervalNegGrPoz(
            rezultat,
            jedinica,
            dref,
            gref
          )[1]
        ];
        break;
      case "Epstein-Barr-virus IgG AT":
        return [
          test,
          rezultat,
          interpretacija.granicniIntervalNegGrPoz(
            rezultat,
            jedinica,
            dref,
            gref
          )[0],
          jedinica,
          dref.replace("-", "") + " - " + gref.replace("-", ""),
          interpretacija.granicniIntervalNegGrPoz(
            rezultat,
            jedinica,
            dref,
            gref
          )[1]
        ];
        break;
      case "Varizella zoster virus IgG AT":
        return [
          test,
          rezultat,
          interpretacija.granicniIntervalNegGrPoz(
            rezultat,
            jedinica,
            dref,
            gref
          )[0],
          jedinica,
          dref.replace("-", "") + " - " + gref.replace("-", ""),
          interpretacija.granicniIntervalNegGrPoz(
            rezultat,
            jedinica,
            dref,
            gref
          )[1]
        ];
        break;
      case "Varizella zoster virus IgM AT":
        return [
          test,
          rezultat,
          interpretacija.granicniIntervalNegGrPoz(
            rezultat,
            jedinica,
            dref,
            gref
          )[0],
          jedinica,
          dref.replace("-", "") + " - " + gref.replace("-", ""),
          interpretacija.granicniIntervalNegGrPoz(
            rezultat,
            jedinica,
            dref,
            gref
          )[1]
        ];
        break;
      case "Antiglijadinska AT IgG":
        return [
          test,
          rezultat,
          interpretacija.granicniIntervalNegGrPoz(
            rezultat,
            jedinica,
            dref,
            gref
          )[0],
          jedinica,
          dref.replace("-", "") + " - " + gref.replace("-", ""),
          interpretacija.granicniIntervalNegGrPoz(
            rezultat,
            jedinica,
            dref,
            gref
          )[1]
        ];
        break;
      case "Antiglijadinska AT IgA":
        return [
          test,
          rezultat,
          interpretacija.granicniIntervalNegGrPoz(
            rezultat,
            jedinica,
            dref,
            gref
          )[0],
          jedinica,
          dref.replace("-", "") + " - " + gref.replace("-", ""),
          interpretacija.granicniIntervalNegGrPoz(
            rezultat,
            jedinica,
            dref,
            gref
          )[1]
        ];
        break;
      case "Helicobacter Pylori IgG AT":
        return [
          test,
          rezultat,
          interpretacija.granicniIntervalNegGrPoz(
            rezultat,
            jedinica,
            dref,
            gref
          )[0],
          jedinica,
          dref.replace("-", "") + " - " + gref.replace("-", ""),
          interpretacija.granicniIntervalNegGrPoz(
            rezultat,
            jedinica,
            dref,
            gref
          )[1]
        ];
        break;
      case "Helicobacter Pylori IgA AT":
        return [
          test,
          rezultat,
          interpretacija.granicniIntervalNegGrPoz(
            rezultat,
            jedinica,
            dref,
            gref
          )[0],
          jedinica,
          dref.replace("-", "") + " - " + gref.replace("-", ""),
          interpretacija.granicniIntervalNegGrPoz(
            rezultat,
            jedinica,
            dref,
            gref
          )[1]
        ];
        break;

      case "Calprotectin u stolici":
        return [
          test,
          rezultat,
          interpretacija.granicniIntervalCALPRO(
            rezultat,
            jedinica,
            dref,
            gref
          )[0],
          jedinica,
          dref.replace("-", "") + " - " + gref.replace("-", ""),
          interpretacija.granicniIntervalCALPRO(
            rezultat,
            jedinica,
            dref,
            gref
          )[1]
        ];
        break;

      case "Cytomegalie IgG AT Aviditet":
        return [
          test,
          rezultat,
          interpretacija.granicniIntervalInfekcija(
            rezultat,
            jedinica,
            dref,
            gref
          )[0],
          jedinica,
          dref.replace("-", "") + " - " + gref.replace("-", ""),
          interpretacija.granicniIntervalInfekcija(
            rezultat,
            jedinica,
            dref,
            gref
          )[1]
        ];
        break;
      case "Toxoplasma aviditet":
        return [
          test,
          rezultat,
          interpretacija.granicniIntervalInfekcija(
            rezultat,
            jedinica,
            dref,
            gref
          )[0],
          jedinica,
          dref.replace("-", "") + " - " + gref.replace("-", ""),
          interpretacija.granicniIntervalInfekcija(
            rezultat,
            jedinica,
            dref,
            gref
          )[1]
        ];
        break;
      case "Toxoplasma Gondii IgG aviditet":
        return [
          test,
          rezultat,
          interpretacija.granicniIntervalInfekcija(
            rezultat,
            jedinica,
            dref,
            gref
          )[0],
          jedinica,
          dref.replace("-", "") + " - " + gref.replace("-", ""),
          interpretacija.granicniIntervalInfekcija(
            rezultat,
            jedinica,
            dref,
            gref
          )[1]
        ];
        break;

      case "Tireostimulirajući hormon":
        return [
          test,
          rezultat,
          interpretacija.granicniIntervalTSH(rezultat, jedinica, dref, gref)[0],
          jedinica,
          dref.replace("-", "") + " - " + gref.replace("-", ""),
          interpretacija.granicniIntervalTSH(rezultat, jedinica, dref, gref)[1]
        ];
        break;

      case "fPSA-Ratio":
        return [
          test,
          rezultat,
          interpretacija.granicniIntervalfPSA(
            rezultat,
            jedinica,
            dref,
            gref
          )[0],
          jedinica,
          dref.replace("-", "") + " - " + gref.replace("-", ""),
          interpretacija.granicniIntervalfPSA(rezultat, jedinica, dref, gref)[1]
        ];
        break;

      // BT 1500

      case "HDL holesterol":
        return [
          test,
          rezultat,
          interpretacija.granicniIntervalBiHLabHDL(
            rezultat,
            jedinica,
            dref,
            gref
          )[0],
          jedinica,
          dref.replace("-", "") + " - " + gref.replace("-", ""),
          interpretacija.granicniIntervalBiHLabHDL(
            rezultat,
            jedinica,
            dref,
            gref
          )[1]
        ];
        break;

      case "LDL Holesterol":
        return [
          test,
          rezultat,
          interpretacija.granicniIntervalBiHLabLDL(
            rezultat,
            jedinica,
            dref,
            gref
          )[0],
          jedinica,
          dref.replace("-", "") + " - " + gref.replace("-", ""),
          interpretacija.granicniIntervalBiHLabLDL(
            rezultat,
            jedinica,
            dref,
            gref
          )[1]
        ];
        break;
      case "Holesterol":
        return [
          test,
          rezultat,
          interpretacija.granicniIntervalBiHLabLDL(
            rezultat,
            jedinica,
            dref,
            gref
          )[0],
          jedinica,
          dref.replace("-", "") + " - " + gref.replace("-", ""),
          interpretacija.granicniIntervalBiHLabLDL(
            rezultat,
            jedinica,
            dref,
            gref
          )[1]
        ];
        break;
      case "Trigliceridi":
        return [
          test,
          rezultat,
          interpretacija.granicniIntervalBiHLabLDL(
            rezultat,
            jedinica,
            dref,
            gref
          )[0],
          jedinica,
          dref.replace("-", "") + " - " + gref.replace("-", ""),
          interpretacija.granicniIntervalBiHLabLDL(
            rezultat,
            jedinica,
            dref,
            gref
          )[1]
        ];
        break;

      // End of BT 1500

      // Specifične analize

      case "Aldosteron":
        return [test, rezultat, "", jedinica, "*", "No Class"];
        break;
      case "CA 125 tumorski marker":
        return [test, rezultat, "", jedinica, "*", "No Class"];
        break;
      case "Karcinoembrionalni Ag":
        return [test, rezultat, "", jedinica, "*", "No Class"];
        break;
      case "Cortisol":
        return [test, rezultat, "", jedinica, "*", "No Class"];
        break;
      case "Estradiol":
        return [test, rezultat, "", jedinica, "*", "No Class"];
        break;
      case "Folikulostimulirajući hormon":
        return [test, rezultat, "", jedinica, "*", "No Class"];
        break;
      case "Luteinizirajući hormon":
        return [test, rezultat, "", jedinica, "*", "No Class"];
        break;
      case "Progesteron":
        return [test, rezultat, "", jedinica, "*", "No Class"];
        break;
      case "Renin":
        return [test, rezultat, "", jedinica, "*", "No Class"];
        break;
      case "Humani horionski gonadotropin":
        return [test, rezultat, "", jedinica, "*", "No Class"];
        break;
      case "Humani epididimis protein 4":
        return [test, rezultat, "", jedinica, "*", "No Class"];
        break;
      case "Roma rizik":
        return [test, rezultat, "", jedinica, "*", "No Class"];
        break;

      case "Litium":
        return [
          test,
          rezultat,
          "",
          jedinica,
          "Terapijski opseg: 1.0-1.2 ",
          "No Class"
        ];
        break;

      case "Treponema pallidum AT":
        return [test, rezultat, "", jedinica, "*", "No Class"]; // Bez referentnog intervala
        break;
      case "Troponin I":
        return [test, rezultat, "", jedinica, "*", "No Class"]; // Bez referentnog intervala
        break;
      case "Slobodni PSA":
        return [test, rezultat, "", jedinica, "*", "No Class"]; // Bez referentnog intervala
        break;
      case "Chlamydia Trachomatis IgG":
        return [test, rezultat, "", jedinica, "*", "No Class"]; // Bez referentnog intervala
        break;
      case "Chlamydia Trachomatis IgA":
        return [test, rezultat, "", jedinica, "*", "No Class"]; // Bez referentnog intervala
        break;
      case "Candida AT IgG":
        return [test, rezultat, "", jedinica, "*", "No Class"]; // Bez referentnog intervala
        break;
      case "Candida AT IgA":
        return [test, rezultat, "", jedinica, "*", "No Class"]; // Bez referentnog intervala
        break;
      case "Dehidroepiandrosteron":
        return [test, rezultat, "", jedinica, "*", "No Class"]; // Bez referentnog intervala
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

  bihlabAnalitDa: function(izbor, test, rezultat, jedinica, dref, gref, site) {
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

    if (izbor === "Kompletna krvna slika, 3 diff" || izbor === "Retikulociti") {
      switch (test) {
        case "Limfociti":
          return [
            test,
            rezultat,
            interpretacija.opisniRezultat(rezultat, jedinica, dref, gref)[0],
            jedinica,
            "/",
            interpretacija.opisniRezultat(rezultat, jedinica, dref, gref)[1]
          ];
          break;
        case "Monociti":
          return [
            test,
            rezultat,
            interpretacija.opisniRezultat(rezultat, jedinica, dref, gref)[0],
            jedinica,
            "/",
            interpretacija.opisniRezultat(rezultat, jedinica, dref, gref)[1]
          ];
          break;

        case "Neutrofili":
          return [
            test,
            rezultat,
            interpretacija.opisniRezultat(rezultat, jedinica, dref, gref)[0],
            jedinica,
            "/",
            interpretacija.opisniRezultat(rezultat, jedinica, dref, gref)[1]
          ];
          break;

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
    } else if (izbor === "DKS - mikroskopski") {
      switch (test) {
        case "Blasti":
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
            gref,
            interpretacija.referentniIntervalStandard(
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
            interpretacija.nijeBrojNegativan(rezultat, jedinica, dref, gref)[0],
            jedinica,
            "negativan",
            interpretacija.nijeBrojNegativan(rezultat, jedinica, dref, gref)[1]
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

        case "Glukoza":
          return [
            test,
            rezultat,
            interpretacija.nijeBrojNegativan(rezultat, jedinica, dref, gref)[0],
            jedinica,
            "normalan",
            interpretacija.nijeBrojNegativan(rezultat, jedinica, dref, gref)[1]
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

        case "Urobilinogen":
          return [
            test,
            rezultat,
            interpretacija.nijeBrojNegativan(rezultat, jedinica, dref, gref)[0],
            jedinica,
            "normalan",
            interpretacija.nijeBrojNegativan(rezultat, jedinica, dref, gref)[1]
          ];
          break;
      }
    } else if (izbor === "Sediment urina") {
      switch (test) {
        case "Eritrociti":
          return [
            test,
            rezultat,
            interpretacija.SedimentLeukocitiEritrocitiMedLab(
              rezultat,
              jedinica,
              dref,
              gref
            )[0],
            jedinica,
            dref.replace("-", "") + " - " + gref.replace("-", ""),
            interpretacija.SedimentLeukocitiEritrocitiMedLab(
              rezultat,
              jedinica,
              dref,
              gref
            )[1]
          ];
          break;

        case "Leukociti":
          return [
            test,
            rezultat,
            interpretacija.SedimentLeukocitiEritrocitiMedLab(
              rezultat,
              jedinica,
              dref,
              gref
            )[0],
            jedinica,
            dref.replace("-", "") + " - " + gref.replace("-", ""),
            interpretacija.SedimentLeukocitiEritrocitiMedLab(
              rezultat,
              jedinica,
              dref,
              gref
            )[1]
          ];
          break;

        case "Epitelne ćelije":
          return [test, rezultat, "", jedinica, "", "No Class"];
          break;

        case "Kristali":
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
            "negativan",
            interpretacija.SedimentMaloDostaMasa(
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
        case "Sluzne niti":
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
        case "Soli":
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
      }
    }
  }
};
