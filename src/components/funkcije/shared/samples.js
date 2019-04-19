var c_samples = require("../carovac/c_samples")
var m_samples = require("../medlab/m_samples")
var p_samples = require("../muminovic/p_samples")
var bhs_samples = require("../bihlab/bhs_samples")

module.exports = {
  sampleSelection: function (site, test, godina, spol, drstanje, menopauza, manual, calculated) {

    switch (site) {
      case '5b6caf696a0f4166f4da989b': // Čarovac Lab, $store.state.site: 5b6caf696a0f4166f4da989b
        return c_samples.carovaclab(test, godina, spol, drstanje, menopauza, manual, calculated)
        break;

      case '5bc71402bf21a379083d6e07': // Med Lab, $store.state.site: 5bc71402bf21a379083d6e07
        return m_samples.medlab(test, godina, spol, drstanje, menopauza, manual, calculated)
        break;

      case '5bd40c16020d6d21bbaf610c': // PZU Muminović, $store.state.site: 5bd40c16020d6d21bbaf610c
        return p_samples.muminovic(test, godina, spol, drstanje, menopauza, manual, calculated)
        break;  

      case '5c69f68c338fe912f99f833b': // BIH MEDICINSKI LABORATORIJ (Sarajevo - Stup), $store.state.site: 5c69f68c338fe912f99f833b
        return bhs_samples.bihlab(test, godina, spol, drstanje, menopauza, manual, calculated)
        break;  
    }
    
  }
}
