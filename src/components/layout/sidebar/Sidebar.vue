<template>
  <aside class="sidebar">
    <vuestic-scrollbar>
      <ul class="sidebar-menu">
        <li
          @click="setDropdownDefaultIzbor()"
          v-for="item in menuItems"
          v-show="(
            ((item.meta.title != 'Kontrole') && (item.meta.title != 'Pacijenti')  && (item.meta.title != 'Opšte postavke')
              && (item.meta.title != 'Postavke aparata') && (item.meta.title != 'Definicija kontrola') && (item.meta.title != 'Pomoć')
              && (item.meta.title != 'Uzorci') && (item.meta.title != 'Rezultati') && (item.meta.title != 'Assays')  
              && (item.meta.title != 'Definicija testova') && ($store.state.userId != 'admin@atom.ba') && ($store.state.userId != 'prijem')
            ) 
            || ($store.state.userId === 'admin@atom.ba') 
            || ($store.state.userId === 'prijem' && item.meta.title === 'Prijem')
          )"
          :key="item.name"
        >
          <router-link
            :class="{'sidebar-link': item.meta.title != 'Mjesta', 
              'sidebar-link-warning': (item.meta.title === 'Mjesta' || item.meta.title === 'Testovi') || item.meta.title === 'Reference'}"            
            :to="item.path"
            :target="item.meta.newWindow ? '_blank' : '_self'"
            @click="toggleMenuItem(item)"
            v-if="item.path"
          >
            <i class="sidebar-menu-item-icon" v-bind:class="item.meta.iconClass"></i>
            {{item.meta.title | translate}}
          </router-link>

          <a
            href="#"
            @click.prevent="toggleMenuItem(item)"
            class="sidebar-link"
            v-bind:class="{expanded: item.meta.expanded}"
            v-else
          >
            <i class="sidebar-menu-item-icon" v-bind:class="item.meta.iconClass"></i>
            {{item.meta.title | translate}}
            <i class="expand-icon fa fa-angle-down"></i>
          </a>

          <expanding>
            <ul class="sidebar-submenu in" v-show="item.meta.expanded">
              <li
                @click="setDropdownDefaultIzbor()"
                v-for="childItem in item.children"
                v-show="(                  
                  ($store.state.userId != 'admin@atom.ba' 
                    && (!(childItem.meta.title === 'Predračun' && item.meta.title === 'Uzorci')
                      && !(childItem.meta.title === 'Pregled' && item.meta.title === 'Rezultati')                      
                      && !(childItem.meta.title === 'Unos' && item.meta.title === 'Uzorci')
                      && !(childItem.meta.title === 'Prijem' && item.meta.title === 'Pacijenti')
                      && !(childItem.meta.title === 'Verifikacija' && item.meta.title === 'Nalazi')
                    )
                  )
                  || ($store.state.userId === 'admin@atom.ba')                  
                )"
                :key="childItem.name"
              >
                <router-link
                  class="sidebar-link sidebar-submenu-link"
                  :to="childItem.path"
                  :target="childItem.meta.newWindow ? '_blank' : '_self'"
                >{{childItem.meta.title | translate}}</router-link>
              </li>
            </ul>
          </expanding>
        </li>
      </ul>
    </vuestic-scrollbar>
  </aside>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Expanding from "vue-bulma-expanding/src/Expanding";
import { http } from "../../../../config/config.js";
import Vue from "vue";

export default {
  name: "sidebar",

  components: {
    Expanding
  },
  methods: {
    ...mapActions({
      expand: "toggleExpandMenuItem"
    }),
    toggleMenuItem(item) {
      if (item.children) {
        this.expand({
          menuItem: item,
          expand: !item.meta.expanded
        });
      }
    },
    setDropdownDefaultIzbor() {
      var current = this.$router.currentRoute.path;
      // console.log("setDropdownDefaultIzbor");
      // console.log(current);
      if (current.includes("rezultati/verifikacija") || current.includes("obrada/pregled")) {
        this.$store.dispatch("dropdownChange", "RADNA LISTA");
        this.$store.dispatch("filterChange", "");
      }
      // else
      // if (current.includes("nalazi/verifikacija")) {
      //   this.$store.dispatch("dropdownChange", "RADNA LISTA");
      //   this.$store.dispatch("filterChange", "");
      // }
      else {
        this.$store.dispatch("dropdownChange", "DANAS");
        this.$store.dispatch("filterChange", "");
      }

      // if (this.$store.state.dropdown != "DANAS") {
      //   this.$store.dispatch("dropdownChange", "DANAS");
      // }
      // if (this.$store.state.filter != "") {
      //   this.$store.dispatch("filterChange", "");
      // }
    }
  },
  computed: {
    ...mapGetters({
      menuItems: "menuItems"
    })
  },
  beforeCreate: function() {
    var link = this.$store.state.userId;
    var token = this.$store.state.token;

    if (token != null) {
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
          Vue.i18n.set(res.data.user.postavke.language);
        });
    }
  },
  watch: {
    $route(route) {
      let parent = _findMatchingParentMenuItem.call(this, route.name) || {};
      this.menuItems.forEach(item => {
        this.expand({
          menuItem: item,
          expand: parent.name === item.name
        });
      });
    }
  },
  data() {
    return {
      show: false,
      isRole: ""
    };
  }
};

function _findMatchingParentMenuItem(itemName) {
  let parentItem;
  this.menuItems.forEach(item => {
    parentItem =
      item.children && item.children.find(child => child.name === itemName)
        ? item
        : parentItem;
  });
  return parentItem;
}
</script>

<style lang="scss">
@import "../../../sass/_variables.scss";
@import "../../../../node_modules/bootstrap/scss/mixins/breakpoints";
@import "../../../../node_modules/bootstrap/scss/functions";
@import "../../../../node_modules/bootstrap/scss/variables";

.sidebar {
  @include media-breakpoint-down(md) {
    top: $sidebar-mobile-top;
    left: $sidebar-mobile-left;
    width: $sidebar-mobile-width;
    z-index: $sidebar-mobile-z-index;
  }
  height: $sidebar-viewport-height;
  .vuestic-scrollbar {
    height: 100%;
    .scrollbar-wrapper {
      box-shadow: $sidebar-box-shadow;
    }
    .scrollbar-content {
      background: $sidebar-bg;
    }
  }
  position: absolute;
  width: $sidebar-width;
  top: $sidebar-top;
  left: $sidebar-left;
  transition: all 0.2s ease;
  opacity: 1;
  .sidebar-hidden_without-animation & {
    transition: none;
  }
  .sidebar-hidden & {
    @include media-breakpoint-down(md) {
      top: $sidebar-hidden-top-mobile;
      opacity: 0;
      z-index: $sidebar-mobile-z-index;
      height: $sidebar-hidden-height-mobile;
    }
    top: $sidebar-hidden-top;
    opacity: 0;
    z-index: $min-z-index;
  }
  .sidebar-link {
    position: relative;
    height: $sidebar-link-height;
    padding-left: $sidebar-link-pl;
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
    text-decoration: none;
    &.router-link-active,
    &:hover {
      color: $white;
      background-color: $sidebar-link-active-bg;
      .sidebar-menu-item-icon,
      .expand-icon {
        color: $white;
      }
    }
    .expand-icon {
      position: absolute;
      right: $sidebar-arrow-right;
      top: calc(50% - #{$font-size-root}/ 2);
      font-weight: bold;
      transition: transform 0.3s ease;
    }
    &.expanded {
      .expand-icon {
        transform: rotate(180deg);
      }
    }
    .sidebar-menu-item-icon {
      font-size: $sidebar-menu-item-icon-size;
      color: $vue-green;
      margin-right: 14px;
      &.fa-dashboard {
        /* Temp fix */
        position: relative;
        top: -2px;
      }
    }
  }
  .sidebar-submenu-link {
    height: $sidebar-submenu-link-height;
  }
  .sidebar-menu,
  .sidebar-submenu {
    list-style: none;
    padding-left: 0;
    li {
      display: block;
      padding-left: 0;
    }
  }
  .sidebar-submenu {
    .sidebar-link {
      padding-left: $sidebar-submenu-link-pl;
      font-size: $font-size-smaller;
    }
  }
  .sidebar-link-warning {
    position: relative;
    height: $sidebar-link-height;
    padding-left: $sidebar-link-pl;
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
    text-decoration: none;
    &.router-link-active,
    &:hover {
      color: $white;
      background-color: $sidebar-link-active-bg;
      .sidebar-menu-item-icon,
      .expand-icon {
        color: $white;
      }
    }
    
    .expand-icon {
      position: absolute;
      right: $sidebar-arrow-right;
      top: calc(50% - #{$font-size-root}/ 2);
      font-weight: bold;
      transition: transform 0.3s ease;
    }
    &.expanded {
      .expand-icon {
        transform: rotate(180deg);
      }
    }
    .sidebar-menu-item-icon {
      font-size: $sidebar-menu-item-icon-size;
      color: $brand-info;
      margin-right: 14px;
      &.fa-dashboard {
        /* Temp fix */
        position: relative;
        top: -2px;
      }
    }
  }
  .sidebar-menu {
    max-height: 100%;
    margin-bottom: 0;
  }
  .expand-icon {
    color: $vue-green;
  }
  a {
    color: $white;
    text-decoration: none;
  }
}
</style>
