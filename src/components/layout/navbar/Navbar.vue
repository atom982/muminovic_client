<template>
  <nav class="navbar app-navbar navbar-toggleable-md">
    <div class="navbar-brand-container d-flex align-items-center justify-content-start">
      <atom-spinner :animation-duration="1000" :size="40" :color="'#4ae387'"/>
      <a class="navbar-brand">
        <i class="i-vuestic"></i>
      </a>
      <span style="color: #333; font-size: 12px">
        <sup>{{'Build'}} 9.12.019</sup>
      </span>
    </div>

    <div class="row navbar-container">
      <div
        class="menu-icon-container d-flex align-items-center justify-content-center justify-content-lg-start col"
      >
        <a
          class="menu-icon i-menu-expanded"
          href="#"
          @click.prevent="toggleSidebar(false)"
          v-if="sidebarOpened"
        ></a>
        <a class="menu-icon i-menu-collapsed" href="#" @click.prevent="toggleSidebar(true)" v-else></a>
      </div>

      <div class="offset-lg-6"></div>

      <site-dropdown style="flex-direction: row; display: flex; white-space:nowrap;"/>

      <div
        class="col nav-item dropdown navbar-dropdown d-flex align-items-center justify-content-center"
      >
        <a class="nav-link dropdown-toggle d-flex align-items-center justify-content">
          <span class="i-nav-messages" ref="zatvori"></span>
        </a>
      </div>

      <div
        v-if="false"
        class="col nav-item dropdown navbar-dropdown d-flex align-items-center justify-content-center"
        v-dropdown
      >
        <a
          class="nav-link dropdown-toggle d-flex align-items-center justify-content"
          href="#"
          @click.prevent="closeMenu"
        >
          <span v-if="$store.state.notify" class="i-nav-messages notify" ref="zatvori"></span>
          <span v-if="!$store.state.notify" class="i-nav-messages" ref="zatvori"></span>
        </a>
        <div class="dropdown-menu">
          <div class="dropdown-menu-content">
            <a
              v-for="poruka in (($store.state.alarms.length > 2) ? $store.state.alarms.slice($store.state.alarms.length-3, $store.state.alarms.length) : $store.state.alarms)"
              class="dropdown-item"
              :id="poruka"
              @click="pregledOdobrenih($event)"
            >
              <span :id="poruka" class="ellipsis">{{poruka[0]}} {{'odobren'}}</span>
            </a>
          </div>
        </div>
      </div>

      <!-- <div class="col nav-item dropdown navbar-dropdown d-flex align-items-center justify-content-center" v-dropdown> -->
      <div
        class="col nav-item dropdown navbar-dropdown d-flex align-items-center justify-content-center"
      >
        <!-- <a class="nav-link dropdown-toggle d-flex align-items-center justify-content" href="#" @click.prevent="closeMenu"> -->
        <a class="nav-link dropdown-toggle d-flex align-items-center justify-content" href="#">
          <!-- <span v-if="$store.state.notifym" class="i-nav-notification notify" ref="zatvori2"></span> -->
          <span v-if="true" class="i-nav-notification" ref="zatvori2"></span>
        </a>
        <div v-if="false" class="dropdown-menu">
          <div class="dropdown-menu-content">
            <a
              v-for="poruka in (($store.state.messages.length > 2) ? $store.state.messages.slice($store.state.messages.length-3, $store.state.messages.length) : $store.state.messages)"
              class="dropdown-item"
              :id="poruka"
              @click="pregledRealizovanih($event)"
            >
              <span :id="poruka" class="ellipsis">{{poruka[0]}} {{'realizovan'}}</span>
            </a>
          </div>
        </div>
      </div>

      <div
        class="col nav-item dropdown navbar-dropdown d-flex align-items-center justify-content-center"
        v-dropdown
      >
        <a
          class="nav-link dropdown-toggle d-flex align-items-center justify-content"
          href="#"
          @click.prevent="closeMenu"
        >
          <span v-if="reload" class="avatar-container" ref="close">
            <img :src="userImage+'?'+ new Date().getTime()">
          </span>
        </a>
        <div class="dropdown-menu last">
          <div class="dropdown-menu-content">
            <div class="dropdown-item plain-link-item">
              <a class="plain-link" @click="promjeniSifru" href="#">{{'Promjena šifre'}}</a>
            </div>
            <div
              v-if="$store.state.userId === 'admin@atom.ba'"
              class="dropdown-item plain-link-item"
            >
              <a class="plain-link" @click="avatarChange" href="#">{{'Dodajte sliku'}}</a>
            </div>
            <div
              v-if="$store.state.userId === 'admin@atom.ba'"
              class="dropdown-item plain-link-item"
            >
              <a class="plain-link" @click="signUp" href="#">{{'Dodajte korisnika'}}</a>
            </div>
            <div
              v-if="$store.state.userId === 'admin@atom.ba'"
              class="dropdown-item plain-link-item"
            >
              <a class="plain-link" @click="editUser" href="#">{{'Uredite korisnike'}}</a>
            </div>
            <div
              v-if="$store.state.userId === 'admin@atom.ba'"
              class="dropdown-item plain-link-item"
            >
              <a class="plain-link" @click="mojePostavke" href="#">{{'Moje postavke'}}</a>
            </div>
            <div class="dropdown-item plain-link-item">
              <a class="plain-link" @click="onLogout" href="#">{{' Odjava'}}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";
import Dropdown from "directives/Dropdown";
import { AtomSpinner } from "epic-spinners";
import router from "../../../router";
import { http } from "../../../../config/config.js";
import VueSocketIO from "vue-socket.io";
import { bus } from "../../../main";
import SiteDropdown from "../../vuestic-components/vuestic-site/SiteDropdown.vue";

export default {
  data() {
    return {
      userImage: "",
      isRole: "",
      socketConnected: false,
      socketMessage: [],
      socketAlarm: [],
      notify: this.$store.state.notify,
      reload: true
    };
  },
  name: "navbar",

  directives: {
    dropdown: Dropdown
  },

  computed: {
    ...mapGetters(["sidebarOpened", "toggleWithoutAnimation"]),
    currentLanguage() {
      // return Vue.i18n.locale() === 'en' ? 'English' : 'Spanish'
    }
  },
  components: {
    AtomSpinner,
    SiteDropdown
  },

  methods: {
    ...mapActions(["closeMenu", "toggleSidebar", "isToggleWithoutAnimation"]),
    onLogout() {
      this.$store.dispatch("logout");
    },
    setSite(site) {
      this.$refs.languageModal.cancel();
    },
    signUp: function() {
      this.$refs.close.click();
      this.$router.push("/postavke/newuser");
    },
    avatarChange: function() {
      this.$refs.close.click();
      this.$router.push("/postavke/avatar");
    },
    promjeniSifru: function() {
      this.$refs.close.click();
      router.push("/postavke/chpwd");
    },
    editUser: function() {
      this.$refs.close.click();
      router.push("/postavke/edit");
    },
    mojePostavke: function() {
      this.$refs.close.click();
      router.push("/postavke/settings");
    },
    pregledOdobrenih: function(event) {
      http
        .get(
          "rezultati/sekcija/" +
            this.$route.params.id +
            "?token=" +
            this.$store.state.token +
            "&site=" +
            this.$store.state.site,
          {}
        )
        .then(res => {
          var sekcija = res.data.sekcija;
          this.$store.state.alarms.forEach(element => {
            if (event.target.id.split(",")[0] === element[0]) {
              var ruta =
                "/rezultati/pregled/" +
                element[1] +
                "/" +
                event.target.id.split(",")[0];
              if (event.target.id.split(",")[0].toString().length < 11) {
                router.push(ruta);
                this.$store.dispatch("izbaciElement", element);
              }
            }
          });
          this.$refs.zatvori.click();
        });
    },
    pregledRealizovanih: function(event) {
      http
        .get(
          "rezultati/sekcija/" +
            this.$route.params.id +
            "?token=" +
            this.$store.state.token +
            "&site=" +
            this.$store.state.site,
          {}
        )
        .then(res => {
          var sekcija = res.data.sekcija;
          this.$store.state.messages.forEach(element => {
            if (event.target.id.split(",")[0] === element[0]) {
              var ruta =
                "/rezultati/verifikacija/" +
                element[1] +
                "/" +
                event.target.id.split(",")[0];
              if (event.target.id.split(",")[0].toString().length < 11) {
                router.push(ruta);
                this.$store.dispatch("izbaciElement2", element);
              }
            }
          });
          this.$refs.zatvori2.click();
        });
    }
  },
  mounted: function() {
    bus.$on("noviAvatar", (data, role) => {
      this.userImage = data;
      this.isRole = role;
      this.reload = false;
      this.reload = true;
    });

    this.socketMessage = this.$store.state.alarms;
    this.notify = this.$store.state.notify;
    var link = this.$store.state.userId;
    var token = this.$store.state.token;

    if (token === null) {
    } else {
      if (!this.$store.state.userId.includes("@")) {
        link = link + "@";
      }
      var index = link.indexOf("@");
      link = link.substring(0, index);

      http
        .post("users/" + link, {
          email: this.$store.state.userId,
          token: this.$store.state.token,
          site: this.$store.state.site
        })
        .then(res => {
          this.userImage = res.data.data.link;
          this.isRole = res.data.data.role;
        });
    }
  },
  watch: {
    notify: function() {
      this.notify = this.$store.state.notify;
    },
    socketMessage: function() {
      this.socketMessage = this.$store.state.alarms;
    }
  }
};
</script>

<style lang="scss">
@import "../../../sass/_variables.scss";
@import "../../../../node_modules/bootstrap/scss/mixins/breakpoints";
@import "../../../../node_modules/bootstrap/scss/functions";
@import "../../../../node_modules/bootstrap/scss/variables";

.navbar.app-navbar {
  .navbar-container {
    width: 100%;
    height: 100%;
    margin: 0;
  }
  height: $top-nav-height;
  padding-left: $nav-padding-left;
  padding-right: $nav-padding-right;
  background-color: $top-nav-bg;
  .avatar-container {
    display: inline-block;
    width: 50px;
    height: 50px;
    background-color: white;
    border-radius: 50%;
    border: 2px solid $lighter-gray;
    overflow: hidden;
    img {
      height: 100%;
      width: 100%;
    }
  }
  .menu-icon-container {
    padding: 0;
    font-size: $font-size-base;
  }
  .navbar-brand-container {
    position: absolute;
    z-index: 3;
    height: 100%;
    left: $navbar-brand-container-left;
    top: 0;
  }
  .nav-item {
    padding: 0;
    height: 100%;
  }
  .dropdown.navbar-dropdown {
    .dropdown-toggle {
      padding: 0;
      &:after {
        display: none;
      }
    }
    &.show {
      @include media-breakpoint-up(lg) {
        .dropdown-menu {
          left: auto;
          right: 0;
        }
      }
      &:after {
        position: absolute;
        bottom: -$dropdown-show-b;
        right: calc(50% - 10px);
        width: 0;
        height: 0;
        display: block;
        content: "";
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 10px solid $darkest-gray;
      }
    }
    .dropdown-menu {
      min-width: 10rem;
      max-width: 15rem;
      margin-top: $dropdown-show-b;
      padding-top: 0;
      width: 100%;
    }
    .dropdown-item {
      height: $navbar-dd-item-height;
      cursor: pointer;
      font-size: $font-size-base;
      &:hover,
      &:active,
      &:focus,
      &.active {
        outline: none;
      }
      &.plain-link-item {
        color: $brand-primary;
        &:hover,
        &:active,
        &:focus {
          background: $dropdown-background;
        }
        .plain-link {
          text-decoration: none;
        }
      }
    }
  }
  .notify {
    position: relative;
    &::after {
      content: "";
      position: absolute;
      right: -6px;
      top: -6px;
      background-color: $brand-primary;
      height: 12px;
      width: 12px;
      border-radius: 50%;
    }
  }
  .i-nav-notification.notify::after {
    right: -4px;
    top: 0;
  }
  @include media-breakpoint-down(md) {
    height: $top-mobile-nav-height;
    padding: $nav-mobile-pt $nav-mobile-padding-h $nav-mobile-pb
      $nav-mobile-padding-h;
    .navbar-brand-container {
      width: $nav-mobile-brand-width;
      top: $nav-mobile-brand-top;
      left: $nav-mobile-brand-left;
      height: auto;
      .navbar-brand {
        height: $font-size-smaller;
        padding: 0;
        font-size: $font-size-smaller;
      }
    }
    .dropdown.navbar-dropdown {
      &.show {
        display: flex;
        &:after {
          bottom: -$dropdown-mobile-show-b;
          z-index: 2;
        }
        .dropdown-menu {
          margin-top: $dropdown-mobile-show-b;
          left: auto;
          &.last {
            right: 0;
          }
        }
      }
    }
  }
}
</style>
