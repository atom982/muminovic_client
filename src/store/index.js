import Vue from "vue";
import Vuex from "vuex";
import VuexI18n from "vuex-i18n";
import app from "./modules/app";
import menu from "./modules/menu";
import { http } from "../../config/config.js";
import router from "../router";
import { bus } from "../main";
import * as getters from "./getters";

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: true, // process.env.NODE_ENV !== 'production'
  getters,
  modules: {
    app,
    menu
  },
  state: {
    userId: null,
    language: null,
    token: null,
    site: null,
    idleTime: null,
    displayItems: null,
    pid_bcode: null,

    connect: false,
    notify: false,
    notifym: false,

    alarms: [["Nema pristiglih odobrenja.", "Test"]],
    messages: [["Nema kompletiranih rezultata.", "Test"]],

    korisnici: 0,
    socketid: "",
    dropdown: "RADNA LISTA",
    filter: "",
    odobriSID: "",
    sid: ""
  },
  mutations: {
    changeSid(state, noviSID) {
      state.odobriSID = noviSID;      
    },
    SID(state, sid) {
      state.sid = sid;
      // console.log('Inside Store: ' + state.sid)
    },
    authUser(state, userData) {
      state.userId = userData.userId;
      state.language = userData.language;
      state.token = userData.token;
      state.site = userData.site;
      state.idleTime = userData.idleTime;
      state.displayItems = userData.displayItems;
      state.pid_bcode = userData.pid_bcode;

      if (state.alarms[0][0].toString().length > 10) {
        if (state.language === "rs") {
          state.alarms = [["Нема пристиглих одобрења.", "Test"]];
        } else if (state.language === "en") {
          state.alarms = [["There are no approved results.", "Test"]];
        } else {
          state.alarms = [["Nema pristiglih odobrenja.", "Test"]];
        }
      }

      if (state.messages[0][0].toString().length > 10) {
        if (state.language === "rs") {
          state.messages = [["Нема комплетираних резултата.", "Test"]];
        } else if (state.language === "en") {
          state.messages = [["There are no completed results.", "Test"]];
        } else {
          state.messages = [["Nema kompletiranih rezultata.", "Test"]];
        }
      }
    },
    clearAuthData(state) {
      // state.userId = null
      // state.language = null
      // state.token = null
      // state.site = null
      // state.idleTime = null
    },
    changeSite(state, site) {
      state.site = site;
    },
    changeDropdown(state, dropdown) {
      state.dropdown = dropdown;
    },
    changeFilter(state, filter) {
      state.filter = filter;
      if (filter != "") {
      }
    },
    resetSite(state) {
      state.alarms = [];
      state.messages = [];

      if (state.language === "rs") {
        state.alarms = [["Нема пристиглих одобрења.", "Test"]];
        state.messages = [["Нема комплетираних резултата.", "Test"]];
      } else if (state.language === "en") {
        state.alarms = [["There are no approved results.", "Test"]];
        state.messages = [["There are no completed results.", "Test"]];
      } else {
        state.alarms = [["Nema pristiglih odobrenja.", "Test"]];
        state.messages = [["Nema kompletiranih rezultata.", "Test"]];
      }

      state.notify = false;
      state.notifym = false;
    },
    resetLanguage(state, lng) {
      state.language = lng;

      if (state.alarms[0][0].toString().length > 10) {
        if (state.language === "rs") {
          state.alarms = [["Нема пристиглих одобрења.", "Test"]];
        } else if (state.language === "en") {
          state.alarms = [["There are no approved results.", "Test"]];
        } else {
          state.alarms = [["Nema pristiglih odobrenja.", "Test"]];
        }
      }

      if (state.messages[0][0].toString().length > 10) {
        if (state.language === "rs") {
          state.messages = [["Нема комплетираних резултата.", "Test"]];
        } else if (state.language === "en") {
          state.messages = [["There are no completed results.", "Test"]];
        } else {
          state.messages = [["Nema kompletiranih rezultata.", "Test"]];
        }
      }
    },
    resetidleTime(state, tm) {
      state.idleTime = tm;
    },
    SOCKET_CONNECT: (state, status) => {
      state.connect = true;
    },
    SOCKET_ODOBREN(state, alarm) {
      if (alarm[1] === localStorage.getItem("site")) {
        var uslov = true;

        if (state.alarms[0][0].toString().length > 10) {
          state.alarms = [];
        }

        state.notify = true;
        var niz = [];

        state.alarms.forEach(member => {
          if (member[0] === alarm[0]) {
            uslov = false;
          }
        });

        if (uslov) {
          niz.push(alarm[0]);
          niz.push(alarm[2]);
          if (alarm[1] === localStorage.getItem("site")) {
            state.alarms.push(niz);
          } else {
            state.notify = false;
          }
        }
      }
    },
    SOCKET_KOMPLETIRAN(state, message) {
      if (message[1] === localStorage.getItem("site")) {
        var usl = true;

        if (state.messages[0][0].toString().length > 10) {
          state.messages = [];
        }

        state.notifym = true;
        var niz = [];

        state.messages.forEach(clan => {
          if (clan[0] === message[0]) {
            usl = false;
          }
        });

        if (usl) {
          niz.push(message[0]);
          niz.push(message[2]);

          if (message[1] === localStorage.getItem("site")) {
            state.messages.push(niz);
          } else {
            state.notifym = false;
          }
        }
      }
    },
    setujAlarme(state, element) {
      var niz = [];

      state.alarms.forEach(member => {
        if (member[0] != element[0]) {
          niz.push(member);
        }
      });

      state.alarms = niz;
      if (!niz.length) {
        state.notify = false;
        if (state.language === "rs") {
          var a = ["Нема пристиглих одобрења.", "Test"];
        } else if (state.language === "en") {
          var a = ["There are no approved results.", "Test"];
        } else {
          var a = ["Nema pristiglih odobrenja.", "Test"];
        }

        state.alarms.push(a);
      }
    },
    setujMessage(state, element) {
      var niz = [];

      state.messages.forEach(member => {
        if (member[0] != element[0]) {
          niz.push(member);
        }
      });

      state.messages = niz;
      if (!niz.length) {
        state.notifym = false;
        if (state.language === "rs") {
          var b = ["Нема комплетираних резултата.", "Test"];
        } else if (state.language === "en") {
          var b = ["There are no completed results.", "Test"];
        } else {
          var b = ["Nema kompletiranih rezultata.", "Test"];
        }

        state.messages.push(b);
      }
    },
    SOCKET_GET(state, korisnici) {
      state.korisnici = korisnici;
    }
  },
  actions: {
    setSID({ commit, dispatch }, element) {
      commit("changeSid", element);
    },
    SetSample({ commit, dispatch }, element) {
      commit("SID", element);
    },
    dohvatiKorisnike({ commit, dispatch }) {
      this.emit("dohvati");
    },
    izbaciElement({ commit, dispatch }, element) {
      commit("setujAlarme", element);
    },
    izbaciElement2({ commit, dispatch }, element) {
      commit("setujMessage", element);
    },
    setLogoutTimer({ commit }, expirationTime) {
      setTimeout(() => {
        commit("clearAuthData");
        http
          .post("logout/users", {
            user: localStorage.getItem("userId"),
            language: localStorage.getItem("language"),
            token: localStorage.getItem("token"),
            site: localStorage.getItem("site"),
            idleTime: localStorage.getItem("idleTime"),
            type: "automatic"
          })
          .then(res => {
            // localStorage.removeItem('userId')
            // localStorage.removeItem('language')
            // localStorage.removeItem('token')
            // localStorage.removeItem('site')
            // localStorage.removeItem('idleTime')
            router.push("/auth/login");
          });
      }, expirationTime * 1000);
    },
    login({ commit, dispatch }, authData) {
      http
        .post("login/users", {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true
        })
        .then(res => {
          if (res.data.success === true) {
            Vue.i18n.set(res.data.data.language);
            localStorage.setItem("userId", res.data.data.localId);
            localStorage.setItem("language", res.data.data.language);
            localStorage.setItem("token", res.data.data.idToken);
            localStorage.setItem("site", res.data.data.site);
            localStorage.setItem("idleTime", res.data.data.idleTime);
            commit("authUser", {
              userId: res.data.data.localId,
              language: res.data.data.language,
              token: res.data.data.idToken,
              site: res.data.data.site,
              idleTime: res.data.data.idleTime,
              displayItems: res.data.data.displayItems,
              pid_bcode: res.data.data.pid_bcode
            });

            if(res.data.data.localId === "prijem"){
              router.push("/prijem");

            }else{
              router.push("/");

            }
            
          } else {
            if (res.data.message === "Greška prilikom konekcije na DB.") {
              bus.$emit("UserLoginDB", res.data.message);
            }
            if (res.data.message === "Korisnik nije pronađen.") {
              bus.$emit("UserLoginFind", res.data.message);
            }
            if (res.data.message === "Pogrešna šifra.") {
              bus.$emit("UserLoginPass", res.data.message);
            }
          }
        })
        .catch(error => console.log(error));
    },
    autoLogin({ commit }) {
      const userId = localStorage.getItem("userId");
      const language = localStorage.getItem("language");
      const site = localStorage.getItem("site");
      const idleTime = localStorage.getItem("idleTime");
      const token = localStorage.getItem("token");

      if (!token) {
        return;
      }

      if(userId === "prijem"){
        router.push("/prijem");

      }else{
        router.push("/");

      }

      commit("authUser", {
        userId: userId,
        language: language,
        token: token,
        site: site,
        idleTime: idleTime
      });
    },
    logout({ commit }, state) {
      commit("clearAuthData");

      http
        .post("logout/users", {
          user: localStorage.getItem("userId"),
          language: localStorage.getItem("language"),
          token: localStorage.getItem("token"),
          site: localStorage.getItem("site"),
          idleTime: localStorage.getItem("idleTime"),
          type: "manual"
        })
        .then(res => {
          // localStorage.removeItem('userId')
          // localStorage.removeItem('language')
          // localStorage.removeItem('token')
          // localStorage.removeItem('site')
          // localStorage.removeItem('idleTime')
          router.replace("/auth/login");
        });
    },
    siteChange({ commit, dispatch }, site) {
      localStorage.setItem("site", site);
      commit("changeSite", site);
    },
    dropdownChange({ commit, dispatch }, dropdown) {
      commit("changeDropdown", dropdown);
    },
    filterChange({ commit, dispatch }, filter) {
      commit("changeFilter", filter);
    },
    siteClear({ commit, dispatch }, site) {
      commit("resetSite");
    },
    languageChange({ commit, dispatch }, lng) {
      commit("resetLanguage", lng);
    },
    idleTimeChange({ commit, dispatch }, tm) {
      commit("resetidleTime", tm);
    }
  }
});

Vue.use(VuexI18n.plugin, store);

export default store;
