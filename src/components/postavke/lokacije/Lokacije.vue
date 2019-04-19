<template>
  <div class="form-elements">
    <div class="row">
      <div class="col-md-12">
        <vuestic-widget v-if="ifPostavkeLokacije" headerText="Opšte postavke - Lokacije">
          <form>
            <div class="row">
              <div class="col-md-3"></div>
              <div class="col-md-6">
                <fieldset>
                  <div class="form-group with-icon-left">
                    <div class="input-group">
                      <input id="input-icon-left" title=" " v-model="lokacija" name="input-icon-left" required/>
                      <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                      <label class="control-label" for="input-icon-left">{{'Unesite lokaciju'}}</label><i class="bar"></i>
                    </div>
                  </div>
                  <button class="btn btn-primary" @click.prevent="dodajPostavku"> <span class="fa fa-save"></span>{{ ' SAČUVAJ'}}</button>
                </fieldset>
                <hr>
                <a @click="prikaziPostavke" href="#">{{prikaziTekst}}</a>
              </div>
              <div class="col-md-3"></div>
            </div>
          </form>
        </vuestic-widget>
        <vuestic-widget v-if="ifTrenutnePostavke" headerText="Trenutne postavke - Lokacije">
          <div class="table-responsive">
            <table v-if="tabelaUslov" class="table table-striped first-td-padding">
              <thead>
                <tr>
                  <td>{{"Lokacija"}}</td>
                  <td v-if="$store.state.userId === 'admin@atom.ba'">{{"Akcija"}}</td>
                </tr>
              </thead>
              <tbody>
                <tr v-for="element in lokacije">
                  <td>{{element}}</td>
                  <td v-if="$store.state.userId === 'admin@atom.ba'">
                    <button title='Brisanje zapisa' v-bind:id="element" class="btn btn-danger btn-micro" @click="catchDialog($event)"><span v-bind:id="element" class="fa fa-trash-o"></span> {{ 'IZBRIŠI' }}</button>
                  </td>
                </tr>
              </tbody>
            </table>
            <vuestic-alert v-if="dataUslov" type="warning" :withCloseBtn="false"><span>{{dataAvailable}}</span></vuestic-alert>
            <vuestic-alert v-if="dataUslovDanger" type="danger" :withCloseBtn="false"><span>{{dataAvailable}}</span></vuestic-alert>
          </div>
          <hr>
          <div class="row">
            <div class="col-md-3"></div>
            <div class="col-md-6">
              <button class="btn btn-secondary" @click.prevent="povratak"><span class="fa fa-backward"></span>{{ ' POVRATAK'}}</button>
            </div>
          </div>
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
        lokacija: '',
        lokacije: [],
        ifButton: true,
        ifTrenutnePostavke: false,
        ifPostavkeLokacije: true,
        prikaziTekst: 'Trenutne postavke',
        dataAvailable: '',
        dataUslov: false,
        dataUslovDanger: false,
        tabelaUslov: false,  
        toastText: '',
        toastIcon: '',
        toastPosition: '',
        toastDuration: 2500,
        isToastFullWidth: false,
        className: ''
      }
    },
    name: 'lokacija',
  
    created: function() {
      this.catchLocations()
    },
    methods: {
      catchDialog: function(event) {
        this.$dialog.confirm('Jeste li sigurni da želite obrisati zapis?', {
            type: 'hard',
            html: true,
            verification: 'Da'
          })
          .then(() => {
            http.post('postavke/lokacija/delete', {
                lokacija: event.target.id,
                token: this.$store.state.token,
                site: this.$store.state.site
              })
              .then(res => {
                if (res.data.success === false) {
                  this.toastText = 'Greška prilikom brisanja!'
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
                  this.toastText = 'Zapis uspješno obrisan!'
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
                  this.prikaziPostavke()
                  this.prikaziPostavke()
                }
              })
          })
          .catch(function() {
  
          })
      },
      dodajPostavku: function() {
        var item = true
        if (this.lokacija.toUpperCase().trim() === '') {
          item = false
          this.toastText = 'Unesite lokaciju!'
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
  
        if (this.lokacije != undefined) {
          this.lokacije.forEach(element => {
            if (element == this.lokacija.toUpperCase().trim()) {
              item = false
              this.toastText = 'Lokacija već postoji!'
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
          })
        }
  
        if (item) {
          http.post('postavke/lokacija/save', {
              email: this.$store.state.userId,
              lokacija: this.lokacija,
              token: this.$store.state.token,
              site: this.$store.state.site
            })
            .then(res => {
              if (res.data.success === false) {
                this.toastText = 'Greška prilikom upisa!'
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
                this.toastText = 'Unos uspješno obavljen!'
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
                this.prikaziPostavke()
                this.prikaziPostavke()
              }
            })
        }
      },
      prikaziPostavke: function() {
        this.lokacija = ''
        this.ifPostavkeLokacije = !this.ifPostavkeLokacije
        this.ifTrenutnePostavke = !this.ifTrenutnePostavke
        http.get('postavke/lokacija/list?token=' + this.$store.state.token + '&site=' + this.$store.state.site, {})
          .then(res => {
            if (res.data.success === false) {
              this.dataAvailable = 'Greška prilikom čitanja iz baze.'
              this.dataUslovDanger = true
              this.dataUslov = false
              this.tabelaUslov = false
            } else {
              this.lokacije = res.data.lokacija
  
              if (this.lokacije.length > 0) {
                this.dataAvailable = ''
                this.dataUslov = false
                this.dataUslovDanger = false
                this.tabelaUslov = true
              }
  
              if (this.lokacije.length <= 0) {
                this.dataAvailable = 'Nema dostupnih podataka.'
                this.dataUslovDanger = false
                this.dataUslov = true
                this.tabelaUslov = false
              }
            }
          })
      },
      povratak: function() {
        this.ifTrenutnePostavke = !this.ifTrenutnePostavke
        this.ifPostavkeLokacije = !this.ifPostavkeLokacije
      },
      catchLocations: function() {
        http.get('postavke/lokacija/list?token=' + this.$store.state.token + '&site=' + this.$store.state.site, {})
          .then(res => {
            this.lokacije = res.data.lokacija            
          })
      },
      izbrisiLokaciju: function(event) {
        http.post('postavke/lokacija/delete', {
            lokacija: event.target.id,
            token: this.$store.state.token,
            site: this.$store.state.site
          })
          .then(res => {
            this.prikaziPostavke()
            this.prikaziPostavke()
          })
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
