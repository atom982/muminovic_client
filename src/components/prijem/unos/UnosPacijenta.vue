<template>
  <div class="form-elements">
    <div class="row">
      <div class="col-md-12">
        <vuestic-widget 
          :headerText="'pacijenti.unos.UnosPacijenta.trnslr001' | translate"> <!-- Unos pacijenata -->
          <form>
            <div class="row">
              <div class="col-md-3"></div>
              <div class="col-md-6">
                <fieldset>
                  <div class="form-group with-icon-left">
                    <div class="input-group">
                      <input id="input-icon-left" title=" " v-model="jmbg" name="input-icon-left" required/>
                      <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                      <!-- Unesite JMBG pacijenta -->
                      <label class="control-label" for="input-icon-left">{{'pacijenti.unos.UnosPacijenta.trnslr002' | translate}}</label><i class="bar"></i>
                    </div>
                  </div>
                  <div class="form-group with-icon-left">
                    <div class="input-group">
                      <input id="input-icon-left" title=" " v-model="ime" name="input-icon-left" required/>
                      <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                      <!-- Unesite ime pacijenta -->
                      <label class="control-label" for="input-icon-left">{{'pacijenti.unos.UnosPacijenta.trnslr003' | translate}}</label><i class="bar"></i>
                    </div>
                  </div>
                  <div class="form-group with-icon-left">
                    <div class="input-group">
                      <input id="input-icon-left" title=" " v-model="prezime" name="input-icon-left" required/>
                      <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                      <!-- Unesite prezime pacijenta -->
                      <label class="control-label" for="input-icon-left">{{'pacijenti.unos.UnosPacijenta.trnslr004' | translate}}</label><i class="bar"></i>
                    </div>
                  </div>     
                  <!-- Izaberite spol pacijenta -->                              
                  <vuestic-simple-select :label="'pacijenti.unos.UnosPacijenta.trnslr005' | translate" v-model="spol" name="spol" :required="true" title=" " ref="spolSelect" v-bind:options="spolovi">
                  </vuestic-simple-select>
                  <!-- Mjesto stanovanja pacijenta -->
                  <vuestic-input-select
                    :label="'pacijenti.unos.UnosPacijenta.trnslr018' | translate" 
                    v-model="chosenAdress"
                    v-bind:options="citiesList"
                  /> 
                  <!-- Konzumira duhan -->
                  <vuestic-simple-select :label="'pacijenti.unos.UnosPacijenta.trnslr006' | translate" v-model="duhan" name="duhan" title=" " ref="duhanSelect" v-bind:options="duhani">
                  </vuestic-simple-select>
                  <!-- Dijabetes -->
                  <vuestic-simple-select :label="'pacijenti.unos.UnosPacijenta.trnslr007' | translate" v-model="dijabetes" name="dijabetes" title=" " ref="dijabetesSelect" v-bind:options="dijabetesi">
                  </vuestic-simple-select>
                  <div class="form-group with-icon-left">
                    <div class="input-group">
                      <input id="input-icon-left" title=" " v-model="telefon" name="input-icon-left" required/>
                      <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                      <!-- Unesite kontakt telefon -->
                      <label class="control-label" for="input-icon-left">{{'pacijenti.unos.UnosPacijenta.trnslr008' | translate}}</label><i class="bar"></i>
                    </div>
                  </div>
                  <div class="form-group with-icon-left">
                    <div class="input-group">
                      <input id="input-icon-left" title=" " v-model="email" name="input-icon-left" required/>
                      <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                      <!-- Unesite Email adresu -->
                      <label class="control-label" for="input-icon-left">{{'pacijenti.unos.UnosPacijenta.trnslr009' | translate}}</label><i class="bar"></i>
                    </div>
                  </div>
                  <button class="btn btn-primary" @click.prevent="dodajPacijenta">
                    <span class="fa fa-save"></span>
                    &nbsp{{'pacijenti.unos.UnosPacijenta.trnslr010' | translate}} <!-- Sačuvaj -->
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
  import {http} from '../../../../config/config.js'  
  
  export default {
    data() {
      return {
        jmbg: '',
        ime: '',
        prezime: '',
        spol: '',
        spolovi: ['MUŠKI', 'ŽENSKI'],
        duhan: '',
        duhani: ['NE', 'DA'],
        dijabetes: '',
        dijabetesi: ['NE', 'DA'],
        telefon: '',
        email: '',
        citiesList: [],
        chosenAdress: '',
        chosenAdressTmp: '',
  
        toastText: '',
        toastIcon: '',
        toastPosition: '',
        toastDuration: 2500,
        isToastFullWidth: false,
        className: ''
      }
    },
    name: 'unos-pacijenta',

    mounted() {
      this.dohvatiMjesta()
    },
  
    methods: {
      dohvatiMjesta: function() {
        http.post('/postavke/sajtovi/' + this.$store.state.site, {
            token: this.$store.state.token
          })
          .then(res => {
            if(res.data.sajt.mjesta != undefined){
              res.data.sajt.mjesta.forEach(element => {
                if(element != 'NEPOZNATO'){
                  this.citiesList.push(element)
                }                
              })              
            }            
          }).then(res => {
            this.citiesList.sort(function(a, b) {
                return a.toLowerCase() == b.toLowerCase() ? 0 : +(a.toLowerCase() > b.toLowerCase()) || -1;
              })
          })
      },
      validateEmail: function(mail) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
          return (true)
        } else {
          return (false)
        }
      },
      validatePhone: function(telefon) {
        if (/^\d{9}$/.test(String(telefon)) || /^\d{10}$/.test(String(telefon)) || /^[0]{2}[3]{1}[8]{1}[7]{1}\d{8}$/.test(String(telefon)) || /^[0]{2}[3]{1}[8]{1}[7]{1}\d{9}$/.test(String(telefon)) || /^[+]{1}[3]{1}[8]{1}[7]{1}\d{8}$/.test(String(telefon)) || /^[+]{1}[3]{1}[8]{1}[7]{1}\d{9}$/.test(String(telefon))) {
          return (true)
        } else {
          return (false)
        }
      },
      dodajPacijenta() {
        var item = true
  
        if ((this.jmbg.trim() === '') || (this.ime.trim() === '') || (this.prezime.trim() === '') || (this.spol.trim() === '')) {
          item = false
          this.toastText = this.$t('pacijenti.unos.UnosPacijenta.trnslr011') // Polja JMBG, Ime, Prezime i Spol su obavezna!
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
        } else if (!this.jmbgValidate(this.jmbg)) {
          item = false
          this.toastText = this.$t('pacijenti.unos.UnosPacijenta.trnslr012') // JMBG mora biti validan 13 cifreni broj!
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
        } else if ((this.email.trim() != '') && (!this.validateEmail(this.email))) {
          item = false
          this.toastText = this.$t('pacijenti.unos.UnosPacijenta.trnslr013') // Email adresa nije validna!
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
        } else if ((this.telefon.trim() != '') && (!this.validatePhone(this.telefon))) {
          item = false
          this.toastText = this.$t('pacijenti.unos.UnosPacijenta.trnslr014') // Telefonski broj nije validan!
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
        } else {
  
          http.post('pacijenti/unos/find', {
              jmbg: this.jmbg,
              token: this.$store.state.token,
              site: this.$store.state.site
            })
            .then(res => {
  
              if (res.data.message === 'Pacijent postoji') {
                item = false
                this.toastText = this.$t('pacijenti.unos.UnosPacijenta.trnslr015') // Pacijent već postoji!
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
              } else {
  
              }
  
            }).then(res => {
  
              if (item) {
  
                if (this.duhan === '') {
                  this.duhan = 'NEPOZNATO'
                }
                if (this.dijabetes === '') {
                  this.dijabetes = 'NEPOZNATO'
                }
                if (this.telefon === '') {
                  this.telefon = 'NEPOZNATO'
                }
                if (this.email === '') {
                  this.email = 'NEPOZNATO'
                }
                if(this.chosenAdress === '') {
                  this.chosenAdressTmp = 'NEPOZNATO'
                } else {
                  this.chosenAdressTmp = this.chosenAdress
                }
                
  
                http.post('pacijenti/unos/save', {
                    jmbg: this.jmbg,
                    ime: this.ime.toUpperCase().trim(),
                    prezime: this.prezime.toUpperCase().trim(),
                    spol: this.spol,
                    duhan: this.duhan,
                    dijabetes: this.dijabetes,
                    telefon: this.telefon,
                    adresa: this.chosenAdressTmp,
                    email: this.email,
                    token: this.$store.state.token,
                    site: this.$store.state.site
                  })
                  .then(res => {
                    if (res.data.success === false) {
                      this.toastText = this.$t('pacijenti.unos.UnosPacijenta.trnslr016') // Greška prilikom upisa!
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
                      this.toastText = this.$t('pacijenti.unos.UnosPacijenta.trnslr017') // Unos uspješno obavljen!
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
  
                      this.jmbg = ''
                      this.ime = ''
                      this.prezime = ''
                      this.spol = ''
                      this.duhan = ''
                      this.dijabetes = ''
                      this.telefon = ''
                      this.email = ''
                      this.chosenAdress = ''
  
                      setTimeout(() => {
                        this.$router.push('/pacijenti/pregled?token=' + this.$store.state.token)
                      }, 1000)
  
                    }
                  })
              }
            })
        }
      },
      jmbgValidate(jmbg) {
        return /^\d{4}[9,0]{1}\d{8}$/.test(String(jmbg)) || /^\d{4}[9,0]{1}\d{7}[P]{1}$/.test(String(jmbg));
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
