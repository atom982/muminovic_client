// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import VeeValidate from "vee-validate";
import App from "./App";
import store from "./store";
import router from "./router";
import { sync } from "vuex-router-sync";
import VuesticPlugin from "src/components/vuestic-components/vuestic-components-plugin";
import "./i18n";
import VueCookie from "vue-cookie";
import IdleVue from "idle-vue";
import VuejsDialog from "vuejs-dialog";
import LiquorTree from "liquor-tree";
import CripNotice from "crip-vue-notice";
import socketio from "socket.io-client";
import VueSocketio from "vue-socket.io";
import { serverSocket } from "../config/config.js";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import Spinner from "vue-spinkit";
import VueLodash from "vue-lodash";
import Chat from "vue-beautiful-chat";
import Multiselect from "vue-multiselect";

Vue.use(VueSocketio, socketio(serverSocket), store);

Vue.use(CripNotice);
Vue.use(VuejsDialog);
Vue.use(VuesticPlugin);
Vue.use(VueCookie);
Vue.use(LiquorTree);

Vue.use(flatPickr);

const options = {
  name: "lodash"
};

Vue.use(VueLodash, options);

Vue.component("multiselect", Multiselect);
Vue.component("Spinner", Spinner);

export const bus = new Vue({}); //event bus
// NOTE: workaround for VeeValidate + vuetable-2
Vue.use(VeeValidate, { fieldsBagName: "formFields" });

const eventsHub = new Vue();

Vue.use(IdleVue, {
  eventEmitter: eventsHub,
  idleTime: 28800000 // 480 minuta
});

Vue.use(Chat);

sync(store, router);

let mediaHandler = () => {
  if (window.matchMedia(store.getters.config.windowMatchSizeLg).matches) {
    store.dispatch("toggleSidebar", true);
  } else {
    store.dispatch("toggleSidebar", false);
  }
};

router.beforeEach((to, from, next) => {
  store.commit("setLoading", true);
  next();
});

router.afterEach((to, from) => {
  mediaHandler();
  store.commit("setLoading", false);
});

new Vue({
  el: "#app",
  router,
  store,
  template: "<App/>",
  components: { App }
});
