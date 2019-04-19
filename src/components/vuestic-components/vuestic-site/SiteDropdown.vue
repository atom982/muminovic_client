<template>
  <div class="language-dropdown dropdown navbar-dropdown">
    <div v-if="allSitesID.length  > 1" v-dropdown>
      <a class="language-dropdown-button dropdown-toggle" href="#">
        <span ref="close" class="flag-icon flag-icon-large" :class="sitePickClass(currentSite())">{{izbor === '' ? initSiteName : izborPrikaz}}</span>
      </a>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <a v-if="izbor === ''" class="dropdown-item" :class="{ 'active': option.sifra === initSite[0].sifra }" v-for="(option, id) in options" :key="id" @click="setSite(option.sifra)">
          <span class="flag-icon flag-icon-small" :class="sitePickClass(option.sifra)"></span>
          <span class="dropdown-item__text ellipsis">
            {{option.name}}
          </span>
        </a>
        <a v-if="izbor != ''" class="dropdown-item" :class="{ 'active': option.id === izabraniSiteId }" v-for="(option, id) in options" :key="id" @click="setSite(option.sifra)">
          <span class="flag-icon flag-icon-small" :class="sitePickClass(option.sifra)"></span>
          <span class="dropdown-item__text ellipsis">
            {{option.name}}
          </span>
        </a>
      </div>
    </div>
    <div v-if="allSitesID.length < 2">
      <a class="language-dropdown-button dropdown-toggle" href="#">
        <span ref="close" class="flag-icon flag-icon-large" :class="sitePickClass(currentSite())">{{initSiteName}}</span>
      </a>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <a v-if="izbor === ''" class="dropdown-item" :class="{ 'active': option.sifra === initSite[0].sifra }" v-for="(option, id) in options" :key="id">
          <span class="flag-icon flag-icon-small" :class="sitePickClass(option.sifra)"></span>
          <span class="dropdown-item__text ellipsis">
            {{option.name}}
          </span>
        </a>
        <a v-if="izbor != ''" class="dropdown-item" :class="{ 'active': option.sifra === currentSite() }" v-for="(option, id) in options" :key="id">
          <span class="flag-icon flag-icon-small" :class="sitePickClass(option.sifra)"></span>
          <span class="dropdown-item__text ellipsis">
            {{option.name}}
          </span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import router from '../../../router'
  import {http} from '../../../../config/config.js'
  import {bus} from '../../../main'
  
  export default {
    data() {
      return {
        izbor: '',
        izborPrikaz: '',
        izborPrikazTmpSifra: '',
        izborPrikazTmpIme: '',
        izabraniSiteId: '',
        initSiteName: '',
        initSiteNameTmpSifra: '',
        initSiteNameTmpIme: '',
        initSite: [],
        rawSites: [],
        currentSiteID: '',
        allSitesID: [],        
        window: {
          width: 0,
          height: 0
        },
        tmpSiteIzbor: ''
      }
    },
    name: 'site-dropdown',
  
    props: {
      options: {
        type: Array,
        default: () => []
      }
    },
    created: function() {
      window.addEventListener('resize', this.handleResize)
      this.handleResize()
  
      this.currentSiteID = this.$store.state.site
      http.post('users/' + this.$store.state.userId, {
          email: this.$store.state.userId,
          token: this.$store.state.token,
          site: this.$store.state.site
        })
        .then(res => {
          if (res.data.message != undefined && res.data.message === 'Niste autorizirani') {
            router.push('/auth/login')
          }
  
          if (res.data.user != undefined) {
            this.allSitesID = res.data.user.sites            
            this.catchSection()
          }
        })
    },
    destroyed() {
      window.removeEventListener('resize', this.handleResize)
    },
    methods: {
      handleResize() {
        this.window.width = window.innerWidth
        this.window.height = window.innerHeight  
        
        if (this.window.width > 1000) {          
          bus.$emit('version', true)
        }else{
          bus.$emit('version', false)
        }

        if (this.window.width > 600) {          
          this.izborPrikaz = this.izborPrikazTmpIme
          this.initSiteName = this.initSiteNameTmpIme
        } else if ((this.window.width <= 600)) {
          this.izborPrikaz = this.izborPrikazTmpSifra
          this.initSiteName = this.initSiteNameTmpSifra
        }
      },
      isPortrait() {      
        if (window.screen.width < window.screen.height) {          
          return true
        } else { 
          return false
        }
      },
      setSite(locale) {
        this.izbor = locale
        this.options.forEach(element => {
          if (element.sifra === locale) {
            if (this.isPortrait()) {
              this.izborPrikaz = element.sifra
              this.izabraniSiteId = element.id
              this.izborPrikazTmpSifra = element.sifra
              this.izborPrikazTmpIme = element.name
            } else {
              this.izborPrikaz = element.name
              this.izabraniSiteId = element.id
              this.izborPrikazTmpSifra = element.sifra
              this.izborPrikazTmpIme = element.name
            }
          }
        })
        this.handleResize()
  
        this.$store.dispatch('siteChange', this.izabraniSiteId)
        this.$store.dispatch('siteClear')
        var current = this.$router.currentRoute.path
  
        if (current.includes('rezultati/verifikacija')) {
          router.push('/rezultati/verifikacija/' + '?site=' + this.$store.state.site)                
          this.$refs.close.click()
        } else if (current.includes('rezultati/pregled')) {
          router.push('/rezultati/pregled/' + '?site=' + this.$store.state.site)          
          this.$refs.close.click()
        } else if (current.includes('nalazi/verifikacija')) {
          router.push('/nalazi/verifikacija/' + '?site=' + this.$store.state.site)          
          this.$refs.close.click()
        } else if (current.includes('nalazi/pregled')) {
          router.push('/nalazi/pregled/' + '?site=' + this.$store.state.site)         
          this.$refs.close.click()
        } else if (current.includes('nalazi/outbox')) {
          router.push('/nalazi/outbox/' + '?site=' + this.$store.state.site)         
          this.$refs.close.click()
        } else if (current.includes('kontrole/pregled')) {
          router.push('/kontrole/pregled/' + '?site=' + this.$store.state.site)         
          this.$refs.close.click()
        } else if (current.includes('kontrole/unos')) {
          router.push('/kontrole/unos/' + '?site=' + this.$store.state.site)         
          this.$refs.close.click()
        }  else if (current.includes('kontrole/levey')) {
          router.push('/kontrole/levey/' + '?site=' + this.$store.state.site)         
          this.$refs.close.click()
        } else if (current.includes('pacijenti/pregled') || current.includes('pacijenti/detalji')) {
          router.push('/pacijenti/pregled/' + '?site=' + this.$store.state.site)         
          this.$refs.close.click()
        } else {
          router.push(current + '?site=' + this.$store.state.site)        
          this.$refs.close.click()
        }
      },
      currentSite() {
        return Vue.i18n.locale()
      },
      sitePickClass(sifra) {
        return `flag-icon-${name}`
      },
      catchSection: function() {
        http.get('postavke/sajtovi/list?token=' + this.$store.state.token + '&site=' + this.$store.state.site, {})
          .then(res => {
            this.rawSites = res.data.sajtovi
            var tmp = {}
            var tmpAll = {}
            if (this.rawSites != undefined) {
              // ...
            }
  
            this.rawSites.forEach(element => {
              this.allSitesID.forEach(asite => {
                if (element._id === asite) {
                  tmpAll.sifra = element.sifra
                  tmpAll.name = element.naziv
                  tmpAll.id = element._id
                  this.options.push(tmpAll)
                  tmpAll = {}
                }
              })
  
              if (element._id === this.currentSiteID) {
                tmp.sifra = element.sifra
                tmp.name = element.naziv
                tmp.id = element._id
                if (this.isPortrait()) {
                  this.initSiteName = element.sifra
                  this.initSiteNameTmpSifra = element.sifra
                  this.initSiteNameTmpIme = element.naziv
                } else {
                  this.initSiteName = element.naziv
                  this.initSiteNameTmpSifra = element.sifra
                  this.initSiteNameTmpIme = element.naziv
                }
                this.initSite.push(tmp)
              }
            })
            this.handleResize()
          })
  
      }
    }
  }
</script>

<style lang="scss">
  @import '../../../sass/variables';
  .language-dropdown {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-basis: 0;
    flex-grow: 1;
    max-width: 100%;
    height: 100%;
    padding: 0;
    .language-dropdown-button {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .flag-icon-large {
      width: 31px;
      height: 23px;
    }
    .flag-icon-small {
      min-width: 22px;
      height: 17px;
    }
    .dropdown-toggle {
      padding: 0;
      &:after {
        display: none;
      }
    }
    &.show {
      &:after {
        position: absolute;
        right: calc(50% - 10px);
        bottom: -2rem;
        display: block;
        width: 0;
        height: 0;
        content: '';
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 10px solid $darkest-gray;
        z-index: 2;
      }
      .dropdown-menu {
        left: auto;
        margin-top: 2rem;
        &.last {
          right: 0;
        }
      }
    }
    .dropdown-menu {
      min-width: 11rem;
      max-width: 11rem;
      margin-top: $dropdown-show-b;
      padding: 0;
      background-color: $dropdown-background;
      box-shadow: $dropdown-box-shadow;
      .dropdown-item {
        display: flex;
        align-items: center;
        height: 38px;
        padding: 9px 12px;
        .dropdown-item__text {
          padding-left: 0px;
          font-size: $font-size-base;
          line-height: 1.25;
        }
        &.active {
          color: $vue-green;
          background-color: $darkest-gray;
        }
        &:hover {
          background-color: $almost-black;
        }
        &:last-child {
          padding-top: 8px;
          padding-bottom: 10px;
        }
      }
    }
  }
</style>
