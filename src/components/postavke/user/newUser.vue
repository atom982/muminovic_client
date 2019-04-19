<template>
  <div class="form-elements">
    <div class="row">
      <div class="col-md-12">
        <vuestic-widget :headerText="'postavke.user.newUser.trnslr001' | translate"> <!-- Dodavanje korisnika -->
          <form>
            <div class="row">
              <div class="col-md-3"></div>
              <div class="col-md-6">
                <fieldset>
                  <div class="form-group with-icon-left">
                    <div class="input-group">
                      <input id="input-icon-left" title=" " v-model="ime" required/>
                      <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                      <!-- Unesite ime -->
                      <label class="control-label" for="ime">{{'postavke.user.newUser.trnslr002' | translate}}</label><i class="bar"></i>
                    </div>
                  </div>
                  <div class="form-group with-icon-left">
                    <div class="input-group">
                      <input id="input-icon-left" title=" " v-model="prezime" required/>
                      <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                      <!-- Unesite prezime -->
                      <label class="control-label" for="prezime">{{'postavke.user.newUser.trnslr003' | translate}}</label><i class="bar"></i>
                    </div>
                  </div>
                  <div class="form-group with-icon-left">
                    <div class="input-group">
                      <input id="input-icon-left" title=" " v-model="email" required/>
                      <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                      <!-- Unesite korisničko ime -->
                      <label class="control-label" for="email">{{'postavke.user.newUser.trnslr004' | translate}}</label><i class="bar"></i>
                    </div>
                  </div>
                  <div class="form-group with-icon-left">
                    <div class="input-group">
                      <input id="input-icon-left" title=" " v-model="password" required/>
                      <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                      <!-- Unesite šifru -->
                      <label class="control-label" for="password">{{'postavke.user.newUser.trnslr005' | translate}}</label><i class="bar"></i>
                    </div>
                  </div>
                  <!-- Vrsta korisničkog računa -->
                  <vuestic-simple-select :label="'postavke.user.newUser.trnslr006' | translate" v-model="multi" name="multi" :required="true" title=" " ref="multiSelect" v-bind:options="multiOpts">
                  </vuestic-simple-select>
                  <!-- Izaberite sajtove -->
                  <vuestic-multi-select :label="'postavke.user.newUser.trnslr007' | translate" v-model="multiSelectSajtovi" title=" " v-bind:options="sajtovi">
                  </vuestic-multi-select>
                  <div v-if="sajtoviTmp.length">
                    <!-- Sajt korisnika -->
                    <vuestic-simple-select :label="'postavke.user.newUser.trnslr008' | translate" v-model="site" name="sajt" :required="true" title=" " ref="multiSajt" v-bind:options="sajtoviTmp">
                    </vuestic-simple-select>
                  </div>
                  <div v-if="!sajtoviTmp.length">
                    <div class="form-group ">
                      <div class="input-group">
                        <input disabled id="input-icon-left" title=" " v-model="site" required/>
                        <!-- Sajt korisnika -->
                        <label class="control-label" for="sajt">{{'postavke.user.newUser.trnslr008' | translate}}</label><i class="bar"></i>
                      </div>
                    </div>
                  </div>
                  <button class="btn btn-secondary" @click.prevent="signUp">
                    <span class="fa fa-save"></span>
                    &nbsp{{'postavke.user.newUser.trnslr009' | translate}} <!-- Sačuvaj -->
                  </button>
                </fieldset>
              </div>
              <div class="col-md-3"></div>
            </div>
          </form>
        </vuestic-widget>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    http
  } from '../../../../config/config.js'
  
  export default {
    data() {
      return {
        email: '',
        password: '',
        ime: '',
        prezime: '',
        poruka: '',
        infoDanger: false,
        infoSuccess: false,
        infoWarning: false,
        infoInfo: false,
        multi: '',
        multiOpts: ['Administrator', 'Koordinator', 'Tehničar', 'Biohemičar'],
        role: '',
        text: '',
        desc: '',
        site: '',
        multiSelectSajtovi: [],
        multiSelectSajtoviID: [],
        sajtovi: [],
        sajtoviTmp: [],
        resData: [],
        siteID: '',
  
        toastText: '',
        toastIcon: '',
        toastPosition: '',
        toastDuration: 2500,
        isToastFullWidth: false,
        className: ''
      }
    },
    name: 'newuser',
  
    mounted() {
      http.get('postavke/user/sajtovi/list?token=' + this.$store.state.token + '&site=' + this.$store.state.site, {})
        .then(res => {
          this.resData = res.data.sajtovi
          if (res.data.sajtovi != undefined) {
            res.data.sajtovi.forEach(element => {
              this.sajtovi.push(element.naziv)
              this.multiSelectSajtoviID.push(element)
            })
          }
        })
    },
    watch: {
      multiSelectSajtovi: function() {
        this.sajtoviTmp = this.multiSelectSajtovi
        if (!this.multiSelectSajtovi.includes(this.site)) {
          this.site = ''
        }
        if (this.multiSelectSajtovi.length < 1) {
          this.site = ''
        }
      }
    },
    methods: {
      validateEmail: function(mail) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
          return (true)
        }
        return (false)
      },
      signUp() {
        var item = true
        if ((this.email.trim() != '') && (!this.validateEmail(this.email))) {
          item = false
          this.toastText = this.$t('postavke.user.newUser.trnslr010') // Korisničko ime nije validno!
          this.toastIcon = 'fa-warning'
          this.toastPosition = 'top-right'
          this.className = 'vuestic-toast-warning'
  
          this.showToast(this.toastText, {
            icon: this.toastIcon,
            position: this.toastPosition,
            duration: this.toastDuration,
            fullWidth: this.isToastFullWidth,
            className: this.className,
          })
        } else if ((this.multiSelectSajtovi.length < 1) || (this.site.trim() === '') || (this.email.trim() === '') || (this.password.trim() === '') || (this.multi.trim() === '') || (this.ime.trim() === '') || (this.prezime.trim() === '')) {
          item = false
          this.toastText = this.$t('postavke.user.newUser.trnslr011') // Sva polja su obavezna!
          this.toastIcon = 'fa-warning'
          this.toastPosition = 'top-right'
          this.className = 'vuestic-toast-warning'
  
          this.showToast(this.toastText, {
            icon: this.toastIcon,
            position: this.toastPosition,
            duration: this.toastDuration,
            fullWidth: this.isToastFullWidth,
            className: this.className,
          })
        } else if (this.email.length < 3) {
          item = false
          this.toastText = this.$t('postavke.user.newUser.trnslr010') // Korisničko ime nije validno!
          this.toastIcon = 'fa-warning'
          this.toastPosition = 'top-right'
          this.className = 'vuestic-toast-warning'
  
          this.showToast(this.toastText, {
            icon: this.toastIcon,
            position: this.toastPosition,
            duration: this.toastDuration,
            fullWidth: this.isToastFullWidth,
            className: this.className,
          })
          return
        } else if (this.password.length < 6) {
          item = false
          this.toastText = this.$t('postavke.user.newUser.trnslr012') // Šifra nije validna!
          this.toastIcon = 'fa-warning'
          this.toastPosition = 'top-right'
          this.className = 'vuestic-toast-warning'
  
          this.showToast(this.toastText, {
            icon: this.toastIcon,
            position: this.toastPosition,
            duration: this.toastDuration,
            fullWidth: this.isToastFullWidth,
            className: this.className,
          })
          return
        }
  
        if (item) {
          this.resData.forEach(element => {
            if (element.naziv === this.site) {
              this.siteID = element._id
            }
          })
  
          var siteIDs = []
          this.multiSelectSajtoviID.forEach(element => {
            this.multiSelectSajtovi.forEach(site => {
              if (site === element.naziv)
                siteIDs.push(element._id)
            })
          })
  
          http.post('signup', {
              ime: this.ime.toUpperCase().trim(),
              prezime: this.prezime.toUpperCase().trim(),
              email: this.email,
              password: this.password,
              role: this.multi,
              token: this.$store.state.token,
              site: this.siteID,
              sites: siteIDs
            })
            .then(res => {
              if (res.data.message === 'Greška na mongodb.') {
                this.toastText = this.$t('postavke.user.newUser.trnslr013') // Greška prilikom upisa!
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
              }
  
              if (res.data.message === 'Account created successfully') {
                this.email = ''
                this.password = ''
                this.multi = ''
                this.ime = ''
                this.prezime = ''
                this.site = ''
                this.multiSelectSajtovi = []
  
                this.toastText = this.$t('postavke.user.newUser.trnslr014') // Unos uspješno obavljen!
                this.toastIcon = 'fa-check'
                this.toastPosition = 'top-right'
                this.className = 'vuestic-toast-primary'
  
                this.showToast(this.toastText, {
                  icon: this.toastIcon,
                  position: this.toastPosition,
                  duration: this.toastDuration,
                  fullWidth: this.isToastFullWidth,
                  className: this.className,
                })
                setTimeout(() => {
                  this.$router.push('/dashboard?token=' + this.$store.state.token)
                }, 3000)
              }
  
              if (res.data.message === 'Username already exists.') {
                this.toastText = this.$t('postavke.user.newUser.trnslr015') // Korisnik već postoji!
                this.toastIcon = 'fa-warning'
                this.toastPosition = 'top-right'
                this.className = 'vuestic-toast-warning'
  
                this.showToast(this.toastText, {
                  icon: this.toastIcon,
                  position: this.toastPosition,
                  duration: this.toastDuration,
                  fullWidth: this.isToastFullWidth,
                  className: this.className,
                })
              }
            })
        }
      }
    }
  }
</script>

<style lang="scss">
  @import '../../../sass/variables';
  @import '../../../sass/toasts';
  
  .abc-checkbox,
  .abc-radio {
    display: flex !important;
    justify-content: flex-start;
  }
  
  input[type=checkbox]:disabled+label,
  input[type=radio]:disabled+label,
  input[type=checkbox]:disabled,
  input[type=radio]:disabled {
    cursor: not-allowed;
  }
</style>
