// BIH MEDICINSKI LABORATORIJ (Sarajevo - Stup), $store.state.site: 5c69f68c338fe912f99f833b

let data = {
  // Opšti pregled urina
  o01: ["", "bistar", "lagano zamućen", "krvav", "mutan"],
  o02: ["", "žut", "svjetlo žut", "tamno žut", "smeđ"],
  o05: ["", "negativan", "pozitivan"],
  o06: ["", "negativan", "pozitivan"],
  o07: ["", "negativan", "pozitivan", "jako pozitivan"],
  o08: ["", "negativan", "pozitivan", "jako pozitivan"],
  o09: ["", "negativan", "pozitivan", "jako pozitivan"],
  o10: ["", "negativan", "pozitivan", "jako pozitivan"],
  o11: ["", "negativan", "pozitivan", "jako pozitivan"],
  o12: ["", "negativan", "1:70", "1:140", "1:200"],

  // Sediment urina
  s04: ["", "nešto", "dosta", "masa"],
  s05: ["", "nešto", "dosta", "masa"],
  s06: ["", "nešto", "dosta", "masa"],
  s07: ["", "nešto", "dosta", "masa"],
  s08: ["", "nešto", "nešto am. fosfata", "nešto am. urata", "dosta", "dosta am. fosfata", "dosta am. urata",, "masa"]
};

let rez = {
  a_HAV: ["", "negativan", "graničan", "pozitivan"], // Hepatitis A virus IgG antitijela
  HBeAg: ["", "negativan", "graničan", "pozitivan"], // Hbe - Antigen
  anti_HCV: ["", "negativan", "graničan", "pozitivan"] // Hepatitis C virus antitijela

  // Heliko_S: ["", "negativan", "pozitivan"], // Helicobacter pylori
  // Okultno: ["", "negativan", "pozitivan"], // Okultno krvarenje
  // EOS_N: ["", "negativan", "pozitivan"] // Eozinofili u nosnom sek.
};

export default {
  data,
  rez
};
