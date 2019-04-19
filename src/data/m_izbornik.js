// Med Lab, $store.state.site: 5bc71402bf21a379083d6e07

let data = {
  // Krvna grupa i Rh faktor
  KG: ["", "A", "B", "O", "AB"],
  RhD: ["", "pozitivan", "negativan"],

  // Opšti pregled urina
  Izg: ["", "bistar", "lagano zamućen", "zamućen", "mutan", "jako mutan"],
  Col: ["", "žut", "svjetlo žut", "hemoragičan", "tamno crven", "tamno žut"],
  Bil: ["", "neg", "15", "35", "70"],
  Ubg: ["", "norm", "35", "70", "140", "200"],
  Ket: ["", "neg", "1.0", "2.5", "10", "30"],
  Asc: ["", "neg", "20", "40"],
  Glu: ["", "norm", "2.8", "5.6", "14", "28", "56"],
  Pro: ["", "neg", "0.15", "0.30", "1.0", "> 1", "5"],
  Ery: ["", "neg", "5-10", "50", "300"],
  Nit: ["", "neg", "pos"],
  Leu: ["", "neg", "25", "75", "500"],

  // Sediment urina
  AF: ["", "neg", "nešto", "malo", "dosta", "masa"],
  AU: ["", "neg", "nešto", "malo", "dosta", "masa"],
  Bakterije: ["", "neg", "nešto", "malo", "dosta", "masa"],
  CaO: ["", "neg", "nešto", "malo", "dosta", "masa"],
  UA: ["", "neg", "nešto", "malo", "dosta", "masa"],
  Sluz: ["", "neg", "nešto", "malo", "dosta", "masa"],
  Urati: ["", "neg", "nešto", "malo", "dosta", "masa"]
};

let rez = {
  Heliko_F: ["", "negativan", "pozitivan"], // Helicobacter pylori, F
  Heliko_S: ["", "negativan", "pozitivan"], // Helicobacter pylori, S
  Okultno: ["", "negativan", "pozitivan"], // Okultno krvarenje
  EOS_N: ["", "negativan", "pozitivan"] // Eozinofili u nosnom sekretu
};

export default {
  data,
  rez
};
