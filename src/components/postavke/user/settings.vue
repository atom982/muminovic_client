<template>
  <div class="form-elements">
    <div v-if="show_settings" class="row">
      <div class="col-md-12">
        <vuestic-widget :headerText="'postavke.user.settings.trnslr001' | translate"> <!-- Postavke prikaza -->
          <form>
            <div class="row">
              <div class="col-md-6">
                <fieldset>
                  <!-- Kartični prikaz rezultata testova -->
                  <vuestic-checkbox :label="'postavke.user.settings.trnslr002' | translate" :id="'card_view'" v-model="card_view" />
                  <!-- <vuestic-checkbox label="checkbox1" :id="'checkbox1'" :disabled="true" v-model="checkbox1" /> -->
                </fieldset>
              </div>              
            </div>
          </form>
        </vuestic-widget>

        <vuestic-widget :headerText="'postavke.user.settings.trnslr003' | translate"> <!-- Postavke jezika -->
          <form>
            <div class="row">              
              <div v-show="true" class="col-md-6">
                <div class="col-md-2"></div>
                <div class="col-md-10">
                <fieldset v-if="$store.state.userId === 'admin@atom.ba'">
                  <!-- Bosanski jezik -->
                  <vuestic-radio-button :label="'postavke.user.settings.trnslr004' | translate" :id="'ba'" :value="'ba'" :name="'radio'" v-model="radioModel" />
                  <!-- Hrvatski jezik -->
                  <vuestic-radio-button :label="'postavke.user.settings.trnslr005' | translate" :id="'hr'" :value="'hr'" :name="'disabled-radio'" :disabled="true" v-model="radioModel" />
                  <!-- Srpski jezik -->
                  <vuestic-radio-button :label="'postavke.user.settings.trnslr006' | translate" :id="'rs'" :value="'rs'" :name="'disabled-radio'" v-model="radioModel" />
                  <!-- Engleski jezik -->
                  <vuestic-radio-button :label="'postavke.user.settings.trnslr007' | translate" :id="'en'" :value="'en'" :name="'disabled-radio'" :disabled="true" v-model="radioModel" />
                </fieldset>
                <fieldset v-if="$store.state.userId != 'admin@atom.ba'">
                  <!-- Bosanski jezik -->
                  <vuestic-radio-button :label="'postavke.user.settings.trnslr004' | translate" :id="'ba'" :value="'ba'" :name="'radio'" v-model="radioModel" />
                  <!-- Hrvatski jezik -->
                  <vuestic-radio-button :label="'postavke.user.settings.trnslr005' | translate" :id="'hr'" :value="'hr'" :name="'disabled-radio'" :disabled="true" v-model="radioModel" />
                  <!-- Srpski jezik -->
                  <vuestic-radio-button :label="'postavke.user.settings.trnslr006' | translate" :id="'rs'" :value="'rs'" :name="'disabled-radio'" :disabled="true" v-model="radioModel" />
                  <!-- Engleski jezik -->
                  <vuestic-radio-button :label="'postavke.user.settings.trnslr007' | translate" :id="'en'" :value="'en'" :name="'disabled-radio'" :disabled="true" v-model="radioModel" />
                </fieldset>
                </div>
              </div>
            </div>
          </form>
        </vuestic-widget>

        <vuestic-widget :headerText="'postavke.user.settings.trnslr014' | translate"> <!-- Automatska odjava u slučaju neaktivnosti -->
          <form>
            <div class="row">              
              <div v-show="true" class="col-md-6">
                <div class="col-md-2"></div>
                <div class="col-md-10">                
                <fieldset >
                  <!-- Nakon 10 minuta -->
                  <vuestic-radio-button :label="'postavke.user.settings.trnslr010' | translate" :id="'600000'" :value="'600000'" :name="'radio'" v-model="idleTime" />
                  <!-- Nakon 30 minuta -->
                  <vuestic-radio-button :label="'postavke.user.settings.trnslr011' | translate" :id="'1800000'" :value="'1800000'" :name="'radio'" v-model="idleTime" />
                  <!-- Nakon 120 minuta -->
                  <vuestic-radio-button :label="'postavke.user.settings.trnslr012' | translate" :id="'7200000'" :value="'7200000'" :name="'radio'" v-model="idleTime" />
                  <!-- Nakon 480 minuta -->
                  <vuestic-radio-button :label="'postavke.user.settings.trnslr013' | translate" :id="'28800000'" :value="'28800000'" :name="'radio'" v-model="idleTime" />
                </fieldset>
                </div>
              </div>
            </div>
          </form>
        </vuestic-widget>
        
      </div>
    </div>
  </div>
</template>

<script>
  import {http} from '../../../../config/config.js'
  import {server} from '../../../../config/config.js'
  import Vue from 'vue'
  
  export default {
    data() {
      return {
        show_settings: false,
        card_view: false,
        // checkbox1: false,
        item: false,
        radioModel: 'ba',
        idleTime: '600000',
  
        toastText: '',
        toastIcon: '',
        toastPosition: '',
        toastDuration: 2500,
        isToastFullWidth: false,
        className: ''
      }
    },
    name: 'edit',
  
    beforeCreate() {
      http.post('users/' + this.$store.state.userId, {
          email: this.$store.state.userId,
          site: this.$store.state.site,
          token: this.$store.state.token
        })
        .then(res => {
          if (res.data.user != undefined) {
            this.card_view = res.data.user.postavke.card_view
            this.radioModel = res.data.user.postavke.language
            this.idleTime = this.$store.state.idleTime.toString()
          }
        }).then(res => {
            // setTimeout(() => {}, 3000)          
            this.item = true
            this.show_settings = true
        })
    },
  
    mounted() {
  
    },
  
    watch: {
      card_view: function() {        
        if (this.item) {  
          http.post('korisnik/private', {
              email: this.$store.state.userId,
              site: this.$store.state.site,
              card_view: this.card_view,
              language: this.radioModel,
              idleTime: Number(this.idleTime),
              token: this.$store.state.token
            })
            .then(res => {
              if (res.data.success === false) {
                this.toastText = this.$t('postavke.user.settings.trnslr008') // Greška prilikom upisa!
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
              } else {
                this.toastText = this.$t('postavke.user.settings.trnslr009') // Izmjena uspješno obavljena!
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
              }
            })
        }
      },
      radioModel: function() {  
        if (this.item) {
          http.post('korisnik/private', {
              email: this.$store.state.userId,
              site: this.$store.state.site,
              card_view: this.card_view,
              language: this.radioModel,
              idleTime: Number(this.idleTime),
              token: this.$store.state.token
            })
            .then(res => {
              if (res.data.success === false) {
                this.toastText = this.$t('postavke.user.settings.trnslr008') // Greška prilikom upisa!
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
              } else {
                Vue.i18n.set(this.radioModel)
                localStorage.setItem('language', this.radioModel) 
                this.$store.dispatch('languageChange', this.radioModel)                
                this.toastText = this.$t('postavke.user.settings.trnslr009') // Izmjena uspješno obavljena!
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
              }
            })
        }
      },
      idleTime: function() {  
        if (this.item) {
          http.post('korisnik/private', {
              email: this.$store.state.userId,
              site: this.$store.state.site,
              card_view: this.card_view,
              language: this.radioModel,
              idleTime: Number(this.idleTime),
              token: this.$store.state.token
            })
            .then(res => {
              if (res.data.success === false) {
                this.toastText = this.$t('postavke.user.settings.trnslr008') // Greška prilikom upisa!
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
              } else {
                Vue.i18n.set(this.radioModel)
                localStorage.setItem('idleTime', Number(this.idleTime))
                this.$store.dispatch('idleTimeChange', Number(this.idleTime))                
                this.toastText = this.$t('postavke.user.settings.trnslr009') // Izmjena uspješno obavljena!
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
              }
            })
        }
      }
    },
    methods: {
      Save() {
        // Save
      },
    }
  }
</script>

<style lang="scss" scoped>
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
