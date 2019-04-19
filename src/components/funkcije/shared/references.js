var c_references = require("../carovac/c_references")
var m_references = require("../medlab/m_references")
var p_references = require("../muminovic/p_references")
var bhs_references = require("../bihlab/bhs_references")

module.exports = {
  ispisAnalitNe: function (test, rezultat, jedinica, dref, gref, site) {

    switch (site) {
      case '5b6caf696a0f4166f4da989b': // Čarovac Lab, $store.state.site: 5b6caf696a0f4166f4da989b
        return c_references.carovaclabAnalitNe(test, rezultat, jedinica, dref, gref, site)
        break;

      case '5bc71402bf21a379083d6e07': // Med Lab, $store.state.site: 5bc71402bf21a379083d6e07
        return m_references.medlabAnalitNe(test, rezultat, jedinica, dref, gref, site)
        break;

      case '5bd40c16020d6d21bbaf610c': // PZU Muminović, $store.state.site: 5bd40c16020d6d21bbaf610c
        return p_references.muminovicAnalitNe(test, rezultat, jedinica, dref, gref, site)
        break;    
        
      // BIH MEDICINSKI LABORATORIJ (Sarajevo - Stup), $store.state.site: 5c69f68c338fe912f99f833b
      case '5c69f68c338fe912f99f833b': 
      return bhs_references.bihlabAnalitNe(test, rezultat, jedinica, dref, gref, site)
      break; 
    }
  },

  ispisAnalitDa: function (izbor, test, rezultat, jedinica, dref, gref, site) {

    switch (site) {
      case '5b6caf696a0f4166f4da989b': // Čarovac Lab, $store.state.site: 5b6caf696a0f4166f4da989b
        return c_references.carovaclabAnalitDa(izbor, test, rezultat, jedinica, dref, gref, site)
        break;

      case '5bc71402bf21a379083d6e07': // Med Lab, $store.state.site: 5bc71402bf21a379083d6e07
        return m_references.medlabAnalitDa(izbor, test, rezultat, jedinica, dref, gref, site)
        break;

      case '5bd40c16020d6d21bbaf610c': // PZU Muminović, $store.state.site: 5bd40c16020d6d21bbaf610c
        return p_references.muminovicAnalitDa(izbor, test, rezultat, jedinica, dref, gref, site)
        break;    
        
      // BIH MEDICINSKI LABORATORIJ (Sarajevo - Stup), $store.state.site: 5c69f68c338fe912f99f833b
      case '5c69f68c338fe912f99f833b': 
        return bhs_references.bihlabAnalitDa(izbor, test, rezultat, jedinica, dref, gref, site)
        break; 
    }

  }
}
