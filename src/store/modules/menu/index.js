import * as types from "../../mutation-types";
import dashboard from "./dashboard";
import prijem from "./prijem";
import pacijenti from "./pacijenti";
import uzorci from "./uzorci";
import rezultati from "./rezultati";
import obrada from "./obrada";
import nalazi from "./nalazi";
import postavke from "./postavke";
// import kontrole from './kontrole'
import mjesta from "./mjesta";
import postavke_testova from "./postavke_testova";
import postavke_aparata from "./postavke_aparata";
import analize from "./analize";
import labassays from "./labassays";
import assays from "./assays";
// import postavke_kontrola from './postavke_kontrola'
// import help from './help'
import reports from "./reports";

const state = {
  items: [
    dashboard,
    prijem,
    pacijenti,
    uzorci,
    rezultati,
    obrada,
    nalazi,
    // kontrole,
    reports,
    postavke,
    
    assays,
    postavke_testova,
    postavke_aparata,
    
    labassays,
    analize,
    mjesta
    // postavke_kontrola,
    // help
  ]
};

const mutations = {
  [types.TOGGLE_EXPAND_MENU_ITEM](state, payload) {
    let menuItem = payload.menuItem;
    let expand = payload.expand;
    if (menuItem.children && menuItem.meta) {
      menuItem.meta.expanded = expand;
    }
  }
};

const actions = {
  toggleExpandMenuItem({ commit }, payload) {
    commit(types.TOGGLE_EXPAND_MENU_ITEM, payload);
  }
};

export default {
  state,
  mutations,
  actions
};
