// PZU Muminović, $store.state.site: 5bd40c16020d6d21bbaf610c

let data = {
  // Krvna grupa i Rh faktor
  KG: ["", "A", "B", "O", "AB"], 
  RhD: ["", "negativan", "pozitivan"],

  // Opšti pregled urina
  o01: ["", "bistar", "lagano zamućen", "krvav", "mutan"], 
  o02: ["", "žut", "svjetlo žut", "tamno žut", "smeđ"],
  o10: ["", "5", "4", "6", "6.5", "7", "8", "9"],
  o13: ["", "1.020", "1.000", "1.005", "1.010", "1.015", "1.025", "1.030"],
  o09: ["", "normalan", "pozitivan", "jako pozitivan"],
  o06: ["", "negativan", "pozitivan", "jako pozitivan"],
  o04: ["", "normalan", "pozitivan", "jako pozitivan"],
  o03: ["", "negativan", "pozitivan", "jako pozitivan"],
  o07: ["", "negativan", "slabo pozitivan", "pozitivan", "jako pozitivan"],
  o08: ["", "negativan", "slabo pozitivan", "pozitivan", "jako pozitivan"],
  o12: ["", "negativan", "slabo pozitivan", "pozitivan", "jako pozitivan"],
  o11: ["", "negativan", "slabo pozitivan", "pozitivan", "jako pozitivan"],

  // Sediment urina
  s08: ["", "malo", "dosta", "masa"], 
  s07: ["", "malo", "dosta", "masa"],
  s03: ["", "malo", "dosta", "masa"],
  s09: ["", "malo", "dosta", "masa"],
  s05: ["", "malo", "dosta", "masa"],
  s10: ["", "malo", "dosta", "masa"],
  s11: ["", "malo", "dosta", "masa"],
  s12: ["", "malo", "dosta", "masa"]
};

let rez = {
  HIV: ["", "nereaktivan", "reaktivan"], // HIV
  Syphilis: ["", "nereaktivan", "reaktivan"], // Syphilis - TPH
  HBsAg: ["", "nereaktivan", "reaktivan"], // HBsAg
  Anti_HBc: ["", "nereaktivan", "reaktivan"], // Anti HBc Total
  HAVAb_IgM: ["", "nereaktivan", "reaktivan"], // Anti HAV - IgM
  HBcAb_IgM: ["", "nereaktivan", "reaktivan"], // Anti HBc - IgM
  Anti_HBs: ["", "nereaktivan", "reaktivan"], // Anti - HBs
  Anti_HCV: ["", "nereaktivan", "reaktivan"], // Anti - HCV
  IgE: ["", "nereaktivan", "reaktivan"], // IgE
  ANA: ["", "negativan", "pozitivan"], // ANA Screen
  ENA: ["", "negativan", "pozitivan"], // ENA Screen

  ANA_ENA_26 : ["", "negativan", "slabo pozitivan", "pozitivan"], // ANA/ENA 26
  ANA_ENA_9: ["", "negativan", "slabo pozitivan", "pozitivan"], // ANA/ENA 9

  // Anti_dsDNA: ["", "negativan", "pozitivan"], // Anti ds DNA Screen
  DGP_IgA: ["", "negativan", "pozitivan"], // Anti DGP IgA
  DGP_IgG: ["", "negativan", "pozitivan"], // Anti DGP IgG
  Glijadin_IgA: ["", "negativan", "pozitivan"], // Anti Gliadin IgA
  Glijadin_IgG: ["", "negativan", "pozitivan"], // Anti Gliadin IgG
  tTg_IgA: ["", "negativan", "pozitivan"], // Anti TTG IgA
  tTg_IgG: ["", "negativan", "pozitivan"], // Anti TTG IgG
  PCR_korona: ["", "negativan", "pozitivan"], // PCR korona
  COV2_Ag: ["", "negativan", "pozitivan"], // COV2_Ag

  // COV2_IgG: ["", "negativan", "pozitivan"], 
  // COV2_IgM: ["", "negativan", "pozitivan"], 

  Anti_IF: ["", "negativan", "pozitivan"], // Anti Intrinsic Factor
  Anti_MCV: ["", "negativan", "pozitivan"], // Anti - MCV IgG
  Heliko: ["", "negativan", "pozitivan"], // Helicobacter pylori
  Okultno: ["", "negativan", "pozitivan"], // Okultno krvarenje

  Uzorkovanje: ["", "nije uzorkovano", "uzorkovano"] // Usluga uzorkovanja
};

export default {
  data,
  rez
};
