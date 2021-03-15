<template>
  <div class="login">
    <div v-if="true">
      <h2>{{'Poliklinika Muminović'}}</h2> <!-- Dobrodošli! -->
      <form @submit.prevent='onSubmit' name="login">
        <div class="form-group">
          <div class="input-group">
            <input v-if="locale === 'ba'" type="text" title=" " id="email" v-model="email" required="required" oninvalid="this.setCustomValidity('Unesite korisničko ime.')" oninput="setCustomValidity('')" />
            <input v-if="locale === 'en'" type="text" title=" " id="email" v-model="email" required="required" oninvalid="this.setCustomValidity('Enter an email.')" oninput="setCustomValidity('')" />
            <input v-if="locale === 'hr'" type="text" title=" " id="email" v-model="email" required="required" oninvalid="this.setCustomValidity('Unesite korisničko ime.')" oninput="setCustomValidity('')" />
            <input v-if="locale === 'rs'" type="text" title=" " id="email" v-model="email" required="required" oninvalid="this.setCustomValidity('Унесите корисничко име.')" oninput="setCustomValidity('')" />  
            <label class="control-label" for="email">{{'auth.login.Login.trnslr003' | translate}}</label><i class="bar"></i> <!-- Korisničko ime -->
          </div>
        </div>  
        <div class="form-group">
          <div class="input-group">
            <input v-if="locale === 'ba'" type="password" title=" " id="password" v-model="password" required="required" oninvalid="this.setCustomValidity('Unesite šifru.')" oninput="setCustomValidity('')" />
            <input v-if="locale === 'en'" type="password" title=" " id="password" v-model="password" required="required" oninvalid="this.setCustomValidity('Enter a password.')" oninput="setCustomValidity('')" />
            <input v-if="locale === 'hr'" type="password" title=" " id="password" v-model="password" required="required" oninvalid="this.setCustomValidity('Unesite lozinku.')" oninput="setCustomValidity('')" />
            <input v-if="locale === 'rs'" type="password" title=" " id="password" v-model="password" required="required" oninvalid="this.setCustomValidity('Унесите шифру.')" oninput="setCustomValidity('')" />  
            <label class="control-label" for="password">{{'auth.login.Login.trnslr004' | translate}}</label><i class="bar"></i> <!-- Šifra -->
          </div>
        </div>
        <div class="d-flex flex-column align-items-center justify-content-between down-container">
          <button class="btn btn-primary" type="submit">
            <span class="vuestic-icon vuestic-icon-auth"></span>
            &nbsp{{'auth.login.Login.trnslr002' | translate}}</button> <!-- Prijava -->
        </div>
      </form>
    </div>
    <!-- <div v-if="false">
        <h2>{{'Preuzmite i instalirajte Google Chrome!'}}</h2>
        <div class="d-flex flex-column align-items-center justify-content-between down-container">
          <button class="btn btn-primary" @click="download()"><span class="fa fa-chrome"></span>{{' Preuzimanje'}}</button>
        </div>
      </div> -->
  </div>
</template>

<script>
  import Vue from 'vue'
  import {bus} from '../../../main'
  import {http} from '../../../../config/config.js'  
  
  export default {
    data() {
      return {
        locale: 'ba',
        email: '',
        password: '',
        browser: 'Chrome',

        toastText: '',
        toastIcon: '',
        toastPosition: '',
        toastDuration: 2500,
        isToastFullWidth: false,
        className: ''
      }
    },
  
    mounted() {
      
      // this.browserDetect()

      this.locale = Vue.i18n.locale()

      bus.$on('UserLoginDB', (data) => {
        this.toastText = this.$t('auth.login.Login.trnslr005') // Greška prilikom konekcije na DB!
        this.toastIcon = 'fa-remove'
        this.toastPosition = 'top-right'
        this.className = 'vuestic-toast-danger'
  
        this.showToast(this.toastText, {
          icon: this.toastIcon,
          position: this.toastPosition,
          duration: this.toastDuration,
          fullWidth: this.isToastFullWidth,
          className: this.className,
        })
      })

      bus.$on('UserLoginFind', (data) => {
        this.toastText = this.$t('auth.login.Login.trnslr006') // Korisnik nije pronađen!
        this.toastIcon = 'fa-warning'
        this.toastPosition = 'top-right'
        this.className = 'vuestic-toast-warning'
  
        this.showToast(this.toastText, {
          icon: this.toastIcon,
          position: this.toastPosition,
          duration: 2500,
          fullWidth: this.false,
          className: this.className,
        })
      })

      bus.$on('UserLoginPass', (data) => {
        this.toastText = this.$t('auth.login.Login.trnslr007') // Unijeli ste pogrešnu šifru!
        this.toastIcon = 'fa-warning'
        this.toastPosition = 'top-right'
        this.className = 'vuestic-toast-warning'
  
        this.showToast(this.toastText, {
          icon: this.toastIcon,
          position: this.toastPosition,
          duration: 2500,
          fullWidth: this.false,
          className: this.className,
        })
      })
    },
    beforeDestroy() {
      bus.$off('UserLoginFind')
      bus.$off('UserLoginDB')
      bus.$off('UserLoginPass')
    },

    methods: {
      browserDetect() {
        var ba = ["Chrome", "Firefox", "Safari", "Opera", "MSIE", "Trident", "Edge"]
        var b, ua = navigator.userAgent
        for (var i = 0; i < ba.length; i++) {
          if (ua.indexOf(ba[i]) > -1) {
            b = ba[i]
            this.browser = b
            break;
          }
        }
        if (b == "MSIE" || b == "Trident" || b == "Edge") {
          b = "Internet Explorer"
        }
  
        // console.log(JSON.stringify({
        //   isAndroid: /Android/.test(navigator.userAgent),
        //   isCordova: !!window.cordova,
        //   isEdge: /Edge/.test(navigator.userAgent),
        //   isFirefox: /Firefox/.test(navigator.userAgent),
        //   isChrome: /Google Inc/.test(navigator.vendor),
        //   isChromeIOS: /CriOS/.test(navigator.userAgent),
        //   isChromiumBased: !!window.chrome && !/Edge/.test(navigator.userAgent),
        //   isIE: /Trident/.test(navigator.userAgent),
        //   isIOS: /(iPhone|iPad|iPod)/.test(navigator.platform),
        //   isOpera: /OPR/.test(navigator.userAgent),
        //   isSafari: /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent),
        //   isTouchScreen: ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch,
        //   isWebComponentsSupported: 'registerElement' in document && 'import' in document.createElement('link') && 'content' in document.createElement('template')
        // }, null, '  '))
      },
      onSubmit() {
        const formData = {
          email: this.email,
          password: this.password
        }
        this.$store.dispatch('login', {
          email: formData.email,
          password: formData.password
        })
      },
      download() {
        var win = window.open('https://www.google.com/chrome/', '_blank')
        win.focus()
      }
    }
  }
</script>

<style lang="scss">
  @import '../../../sass/variables';
  @import '../../../sass/toasts';
  @import '../../../../node_modules/bootstrap/scss/mixins/breakpoints';
  @import "../../../../node_modules/bootstrap/scss/functions";
  @import '../../../../node_modules/bootstrap/scss/variables';
  
  .login {
    @include media-breakpoint-down(md) {
      width: 100%;
      padding-right: 2rem;
      padding-left: 2rem;
      .down-container {
        .link {
          margin-top: 2rem;
        }
      }
    }
    .centar {
      margin: 0 auto;
    }
    h2 {
      text-align: center;
    }
    width: 21.375rem;
    .down-container {
      margin-top: 3.125rem;
    }
  }
</style>
