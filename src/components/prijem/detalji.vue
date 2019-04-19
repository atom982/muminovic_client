<template>
  <div class="row">
    <div class="col-md-12">
      <vuestic-widget :headerText="header">
        <div class="table-responsive">
          <table class="table table-striped first-td-padding">
            <thead>
              <tr>
                <td>{{'pacijenti.pregled.detalji.trnslr001' | translate}}</td> <!-- Jmbg -->
                <td>{{'pacijenti.pregled.detalji.trnslr002' | translate}}</td> <!-- Ime -->
                <td>{{'pacijenti.pregled.detalji.trnslr003' | translate}}</td> <!-- Prezime -->
                <td>{{'pacijenti.pregled.detalji.trnslr004' | translate}}</td> <!-- Spol -->
                <td>{{'pacijenti.pregled.detalji.trnslr028' | translate}}</td> <!-- Mjesto stanovanja -->
                <td>{{'pacijenti.pregled.detalji.trnslr005' | translate}}</td> <!-- Pušač -->
                <td>{{'pacijenti.pregled.detalji.trnslr006' | translate}}</td> <!-- Dijabetes -->
                <td>{{'pacijenti.pregled.detalji.trnslr007' | translate}}</td> <!-- Telefon -->
                <td>{{'pacijenti.pregled.detalji.trnslr008' | translate}}</td> <!-- Email -->
                <td>{{'pacijenti.pregled.detalji.trnslr009' | translate}}</td> <!-- Uredi -->
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div v-show="edit === false">
                    <label><strong>{{jmbg}}</strong></label>
                  </div>
                  <input class="table-info" style="width:100%" v-show="edit === true" v-model="jmbg">
                </td>
                <td>
                  <div v-show="edit === false">
                    <label><strong>{{ime}}</strong></label>
                  </div>
                  <input class="table-info" style="width:100%" v-show="edit === true" v-model="ime">
                </td>
                <td>
                  <div v-show="edit === false">
                    <label><strong>{{prezime}}</strong></label>
                  </div>
                  <input class="table-info" style="width:100%" v-show="edit === true" v-model="prezime">
                </td>
                <td>
                  <div v-show="edit === false">
                    <label><strong>{{spol}}</strong></label>
                  </div>
                  <select class="table-info" style="width:100%" v-show="edit === true" v-model="spol">
                    <option value="MUŠKI">{{'pacijenti.pregled.detalji.trnslr010' | translate}}</option> <!-- MUŠKI -->
                    <option value="ŽENSKI">{{'pacijenti.pregled.detalji.trnslr011' | translate}}</option> <!-- ŽENSKI -->                          
                  </select>
                </td>
                <td>
                  <div v-show="edit === false">
                    <label><strong>{{adresa}}</strong></label>
                  </div>
                  <select class="table-info" style="width:100%" v-show="edit === true" v-model="adresa">
                      <option v-for="city in citiesList" v-bind:value="city">{{city}}</option>                        
                  </select>
                </td>
                <td>
                  <div v-show="edit === false">
                    <label><strong>{{duhan}}</strong></label>
                  </div>
                  <select class="table-info" style="width:100%" v-show="edit === true" v-model="duhan">                    
                    <option value="NE">NE</option>   
                    <option value="NEPOZNATO">NEPOZNATO</option> 
                    <option value="DA">DA</option>                                           
                  </select>
                </td>
                <td>
                  <div v-show="edit === false">
                    <label><strong>{{dijabetes}}</strong></label>
                  </div>
                  <select class="table-info" style="width:100%" v-show="edit === true" v-model="dijabetes">                    
                    <option value="NE">NE</option>
                    <option value="NEPOZNATO">NEPOZNATO</option>
                    <option value="DA">DA</option>
                  </select>
                </td>
                <td>
                  <div v-show="edit === false">
                    <label><strong>{{telefon}}</strong></label>
                  </div>
                  <input class="table-info" style="width:100%" v-show="edit === true" v-model="telefon">
                </td>
                <td>
                  <div v-show="edit === false">
                    <label><strong>{{email}}</strong></label>
                  </div>
                  <input class="table-info" style="width:100%" v-show="edit === true" v-model="email">
                </td>
                <td>
                  <button v-if="uredi" :title="'pacijenti.pregled.detalji.trnslr014' | translate" class="btn btn-micro btn-info" @click.prevent="Edit"> <!-- Uredite podatke o pacijentu -->
                    <span class="glyphicon glyphicon-edit"></span>{{''}}
                  </button> 
                  <button v-if="!uredi" :title="'pacijenti.pregled.detalji.trnslr015' | translate" class="btn btn-micro btn-secondary" @click.prevent="sacuvaj"> <!-- Sačuvajte izmjene -->
                    <span class="fa fa-save"></span>{{''}}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <hr>
        <div class="row">
          <div class="col-md-3"></div>
          <div class="col-md-6">
            <div class="btn-container">
              <button :disabled="edit" class="btn btn-secondary wizard-back pull-left" @click.prevent="vratiPregled">
                <span class="fa fa-step-backward"></span>
                &nbsp{{'pacijenti.pregled.detalji.trnslr016' | translate}} <!-- Nazad -->
              </button>
            </div>
          </div>
        </div>
      </vuestic-widget>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import BadgeColumn from './BadgeColumn.vue'
  import FieldsDef from './fields-definition'  
  import ItemsPerPageDef from './items-per-page-definition'
  import {http} from '../../../config/config.js'
  import {bus} from '../../../src/main.js'
  import {apiUrlPatient} from '../../../config/config.js'
  import axios from 'axios'
  import router from '../../router'
  
  Vue.component('badge-column', BadgeColumn)
  
  export default {
    name: 'pacijenti',
  
    data() {
      return {
        apiUrl: apiUrlPatient,
        apiMode: true,
        tableFields: FieldsDef.tableFields,
        itemsPerPage: ItemsPerPageDef.itemsPerPage,
        sortFunctions: FieldsDef.sortFunctions,
        citiesList: [],
        paginationPath: '',
        header: '',
        id: '',
        jmbg: '',
        ime: '',
        prezime: '',
        spol: '',
        telefon: '',
        adresa: '',
        email: '',
        duhan: '',
        dijabetes: '',
        tmpJmbg: '',
        tmpIme: '',
        tmpPrezime: '',
        tmpSpol: '',
        tmpAdresa: '',
        tmpTelefon: '',
        tmpEmail: '',
        tmpDuhan: '',
        tmpDijabetes: '',
        edit: false,
        uslovispunjen: true,
        jmbgTmp: '',
        uredi: true,
        refresh_yes: true,
  
        toastText: '',
        toastIcon: '',
        toastPosition: '',
        toastDuration: 2500,
        isToastFullWidth: false,
        className: ''
      }
    },

    beforeRouteEnter(to, from, next) {
      next(vm => {  
      })
    },
    beforeRouteLeave(to, from, next) {
      this.refresh_yes = false,
      next()
    },

    created() {      
      http.get('pacijenti/detalji/' + this.$route.params.id + '?token=' + this.$store.state.token + '&site=' + this.$store.state.site, {
  
        })
        .then(res => {   
          // console.log(res.data)                 
          if(res.data.pacijent.jmbg != undefined){
            // Pregled detalja za pacijenta:
            this.header = 'Pregled detalja za pacijenta' + " " + res.data.pacijent.jmbg 
            
            this.id = res.data.pacijent._id
            this.jmbg = res.data.pacijent.jmbg
            this.jmbgTmp = res.data.pacijent.jmbg
            this.ime = res.data.pacijent.ime
            this.prezime = res.data.pacijent.prezime
            this.adresa = res.data.pacijent.adresa
            this.spol = res.data.pacijent.spol
            this.duhan = res.data.pacijent.duhan
            this.dijabetes = res.data.pacijent.dijabetes
            this.telefon = res.data.pacijent.telefon
            this.email = res.data.pacijent.email
    
            this.tmpJmbg = res.data.pacijent.jmbg
            this.tmpIme = res.data.pacijent.ime
            this.tmpPrezime = res.data.pacijent.prezime
            this.tmpSpol = res.data.pacijent.spol
            this.tmpAdresa = res.data.pacijent.adresa
            this.tmpTelefon = res.data.pacijent.telefon
            this.tmpEmail = res.data.pacijent.email
            this.tmpDuhan = res.data.pacijent.duhan
            this.tmpDijabetes = res.data.pacijent.dijabetes
          }          
        })
    },
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
              this.citiesList = res.data.sajt.mjesta.sort(function(a, b) {
                return a.toLowerCase() == b.toLowerCase() ? 0 : +(a.toLowerCase() > b.toLowerCase()) || -1;
              })
            }
            
          }).then(res => {            
          })
      },
      Edit() {
        this.edit = true
        this.uredi = false  
      },      
      refresh() {
        if(this.refresh_yes){
          http.get('pacijenti/detalji/' + this.$route.params.id + '?token=' + this.$store.state.token + '&site=' + this.$store.state.site, {
  
          })
          .then(res => {
            if(res.data.pacijent.jmbg != undefined){
              // Pregled detalja za pacijenta:
              this.header = this.$t('pacijenti.pregled.detalji.trnslr017') + " " + res.data.pacijent.jmbg

              this.id = res.data.pacijent._id
              this.jmbg = res.data.pacijent.jmbg
              this.jmbgTmp = res.data.pacijent.jmbg
              this.ime = res.data.pacijent.ime
              this.prezime = res.data.pacijent.prezime
              this.adresa = res.data.pacijent.adresa
              this.spol = res.data.pacijent.spol
              this.duhan = res.data.pacijent.duhan
              this.dijabetes = res.data.pacijent.dijabetes
              this.telefon = res.data.pacijent.telefon
              this.email = res.data.pacijent.email
    
              this.tmpJmbg = res.data.pacijent.jmbg
              this.tmpIme = res.data.pacijent.ime
              this.tmpPrezime = res.data.pacijent.prezime
              this.tmpSpol = res.data.pacijent.spol
              this.tmpAdresa = res.data.pacijent.adresa
              this.tmpTelefon = res.data.pacijent.telefon
              this.tmpEmail = res.data.pacijent.email
              this.tmpDuhan = res.data.pacijent.duhan
              this.tmpDijabetes = res.data.pacijent.dijabetes
            }            
          })
        }        
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
      vratiPregled: function() {
        router.push('/prijem/')
      },
      jmbgValidate(jmbg) {
        return /^\d{4}[9,0]{1}\d{8}$/.test(String(jmbg)) || /^\d{4}[9,0]{1}\d{7}[P]{1}$/.test(String(jmbg));
      },
      sacuvaj() {
  
        this.uslovispunjen = true
        var item = true
  
        if ((this.jmbg.trim() === this.tmpJmbg) && (this.adresa.trim() === this.tmpAdresa) && (this.ime.trim() === this.tmpIme) && (this.prezime.trim() === this.tmpPrezime) && (this.spol.trim() === this.tmpSpol) && (this.telefon.trim() === this.tmpTelefon) && (this.email.trim() === this.tmpEmail) && (this.duhan.trim() === this.tmpDuhan) && (this.dijabetes.trim() === this.tmpDijabetes)) {
          item = false
          this.uredi = true
          this.edit = false
          setTimeout(() => {
            this.refresh()
          }, 3000)
        } else
  
        if ((this.jmbg.trim() === '') || (this.ime.trim() === '') || (this.prezime.trim() === '') || (this.spol.trim() === '')) {
          item = false
          this.toastText = this.$t('pacijenti.pregled.detalji.trnslr018') // Vrijednost polja je obavezna!
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
          setTimeout(() => {
            this.refresh()
          }, 3000)
        } else if (!this.jmbgValidate(this.jmbg)) {
          item = false
          this.toastText = this.$t('pacijenti.pregled.detalji.trnslr019') // JMBG mora biti validan 13 cifreni broj!
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
          setTimeout(() => {
            this.refresh()
          }, 3000)
        } else if ((this.email.trim() != '') && (this.email.trim() != 'NEPOZNATO') && (!this.validateEmail(this.email))) {
          item = false
          this.toastText = this.$t('pacijenti.pregled.detalji.trnslr020') // Email adresa nije validna!
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
          setTimeout(() => {
            this.refresh()
          }, 3000)
        } else if ((this.telefon.trim() != '') && (this.telefon.trim() != 'NEPOZNATO') && (!this.validatePhone(this.telefon))) {
          item = false
          this.toastText = this.$t('pacijenti.pregled.detalji.trnslr021') // Telefonski broj nije validan!
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
          setTimeout(() => {
            this.refresh()
          }, 3000)
        } else if ((this.spol.toUpperCase().trim() != 'MUŠKI') && (this.spol.toUpperCase().trim() != 'ŽENSKI')) {
          item = false
          this.toastText = this.$t('pacijenti.pregled.detalji.trnslr022') // Spol može biti MUŠKI ili ŽENSKI!
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
          setTimeout(() => {
            this.refresh()
          }, 3000)
        } else if ((this.duhan.trim() != '') && (this.duhan.trim() != 'NEPOZNATO')) {
          if ((this.duhan.toUpperCase().trim() != 'DA') && (this.duhan.toUpperCase().trim() != 'NE')) {
            item = false
            this.toastText = this.$t('pacijenti.pregled.detalji.trnslr023') // Vrijednost polja PUŠAČ može biti DA ili NE!
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
            setTimeout(() => {
              this.refresh()
            }, 3000)
          }
        }
  
        if ((this.dijabetes.trim() != '') && (this.dijabetes.trim() != 'NEPOZNATO')) {
          if ((this.dijabetes.toUpperCase().trim() != 'DA') && (this.dijabetes.toUpperCase().trim() != 'NE')) {
            item = false
            this.toastText = this.$t('pacijenti.pregled.detalji.trnslr024') // Vrijednost polja DIJABETES može biti DA ili NE!
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
            setTimeout(() => {
              this.refresh()
            }, 3000)
          }
        }
  
        if (item) {
  
          http.post('pacijenti/unos/find', {
              jmbg: this.jmbg,
              token: this.$store.state.token,
              site: this.$store.state.site
            })
            .then(res => {
              if (this.jmbgTmp != this.jmbg) {
                if (res.data.message === 'Pacijent postoji') {
                  this.toastText = this.$t('pacijenti.pregled.detalji.trnslr025') // Pacijent sa unesenim JMBG, već postoji u sistemu!
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
                  this.uslovispunjen = false
                  setTimeout(() => {
                    this.refresh()
                  }, 3000)
                } else {}
              }
            }).then(res => {
  
              if (this.duhan.trim() === '') {
                this.duhan = 'NEPOZNATO'
              }
              if (this.dijabetes.trim() === '') {
                this.dijabetes = 'NEPOZNATO'
              }
              if (this.telefon.trim() === '') {
                this.telefon = 'NEPOZNATO'
              }
              if (this.email.trim() === '') {
                this.email = 'NEPOZNATO'
              }
  
              if (this.uslovispunjen) {
                http.post('pacijenti/detalji/update/' + this.$route.params.id, {
                    id: this.id.trim(),
                    jmbg: this.jmbg.trim(),
                    ime: this.ime.toUpperCase().trim(),
                    prezime: this.prezime.toUpperCase().trim(),
                    spol: this.spol.toUpperCase().trim(),
                    adresa: this.adresa.trim(),
                    duhan: this.duhan.toUpperCase().trim(),
                    dijabetes: this.dijabetes.toUpperCase().trim(),
                    telefon: this.telefon.trim(),
                    email: this.email.trim(),
                    token: this.$store.state.token,
                    site: this.$store.state.site,
                  })
                  .then(res => {
                    if (res.data.success === false) {
                      this.toastText = this.$t('pacijenti.pregled.detalji.trnslr026') // Greška prilikom upisa!
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
                      this.toastText = this.$t('pacijenti.pregled.detalji.trnslr027') // Unos uspješno obavljen!
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
                        this.refresh()
                      }, 3000)
  
                      this.uredi = true
                      this.edit = false
                    }
                  })
              }
            })
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../sass/variables';
  @import '../../sass/toasts';
  
  .color-icon-label-table {
    td:first-child {
      width: 1rem;
    }
  }
  
  .circle {
    width: .400rem;
    height: .400rem;
    border-radius: 50%;
    display: inline-block;
  }
  
  .minHeight3 {
    min-height: 350px;
  }
  
  .dugme {
    height: auto;
    width: auto;
  }
</style>
