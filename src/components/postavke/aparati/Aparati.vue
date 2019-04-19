<template>
  <div class="form-elements">
    <div class="row">
      <div class="col-md-12">
        <vuestic-alert v-if="infoDanger" type="warning" :withCloseBtn="true">
          <span class="badge badge-pill badge-warning">{{'PAŽNJA'}}</span><span>{{poruka}}</span></vuestic-alert>
        <vuestic-alert v-if="infoSuccess" type="success" :withCloseBtn="false">
          <span class="badge badge-pill badge-success">{{'OK'}}</span><span>{{poruka}}</span></vuestic-alert>
        <vuestic-alert v-if="infoWarning" type="danger" :withCloseBtn="false">
          <span class="badge badge-pill badge-danger">{{'GREŠKA'}}</span><span>{{poruka}}</span></vuestic-alert>
        <vuestic-alert v-if="infoInfo" type="info" :withCloseBtn="false"><span>{{poruka}}</span></vuestic-alert>  
        <vuestic-widget v-if="ifPostavkeAparati" headerText="Postavke aparata - Aparati">  
          <form>
            <div class="row">
              <div class="col-md-3"></div>
              <div class="col-md-6">  
                <fieldset>
                  <div class="form-group with-icon-left">
                    <div class="input-group">
                      <input id="input-icon-left" title=" " v-model="ime" name="input-icon-left" required/>
                      <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                      <label class="control-label" for="input-icon-left">{{'Unesite ime aparata'}}</label><i class="bar"></i>
                    </div>
                  </div>
                  <div class="form-group with-icon-left">
                    <div class="input-group">
                      <input id="input-icon-left" title=" " v-model="sn" name="input-icon-left" required/>
                      <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                      <label class="control-label" for="input-icon-left">{{'Unesite serijski broj aparata'}}</label><i class="bar"></i>
                    </div>
                  </div>
                  <div class="form-group with-icon-left">
                    <div class="input-group">
                      <input id="input-icon-left" title=" " v-model="make" name="input-icon-left" required/>
                      <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                      <label class="control-label" for="input-icon-left">{{'Unesite proizvođača aparata'}}</label><i class="bar"></i>
                    </div>
                  </div>  
                  <vuestic-simple-select label="Izaberite tip aparata" v-model="tip" name="tip" :required="true" title=" " ref="tipSelect" v-bind:options="tipovi">
                  </vuestic-simple-select> 
                  <vuestic-simple-select label="Izaberite tehnologiju aparata" v-model="tehnologija" name="tehno" :required="true" title=" " ref="tehnoSelect" v-bind:options="tehnologije">
                  </vuestic-simple-select>  
                  <vuestic-simple-select label="Izaberite sekciju aparata" v-model="sekcija" name="tehno" :required="true" title=" " ref="tehnoSelect" v-bind:options="sekcije">
                  </vuestic-simple-select>  
                  <button class="btn btn-primary" @click.prevent="dodajPostavku"><span class="fa fa-save"></span>{{ ' SAČUVAJ'}}</button>
                </fieldset>
                <hr>
                <a @click="prikaziPostavke" href="#">{{prikaziTekst}}</a>  
              </div>
              <div class="col-md-3"></div>
            </div>
          </form>  
        </vuestic-widget>  
        <vuestic-widget v-if="ifTrenutnePostavke" headerText="Trenutne postavke - Aparati">  
          <div class="table-responsive">
            <table v-if="tabelaUslov" class="table table-striped first-td-padding">
              <thead>
                <tr>
                  <td>{{"Ime"}}</td>
                  <td>{{"SN"}}</td>
                  <td>{{"Proizvođač"}}</td>
                  <td>{{"tip"}}</td>
                  <td>{{"tehnologija"}}</td>
                  <td>{{"sekcija"}}</td>
                  <td>{{"akcija"}}</td>
                </tr>
              </thead>
              <tbody>
                <tr v-for="element in aparati">
                  <td>{{element.ime}}</td>
                  <td>{{element.sn}}</td>
                  <td>{{element.make}}</td>
                  <td>{{element.tip}}</td>
                  <td v-for=" tehno in element.tehnologija">{{tehno}}</td>
                  <td>{{element.sekcija}}</td>
                  <td><button title='Brisanje zapisa' v-bind:id="element._id" v-bind:name="element.ime" class="btn btn-danger btn-micro" @click="catchDialog($event)"><span v-bind:id="element._id" v-bind:name="element.ime" class="fa fa-trash-o"></span>{{ ' IZBRIŠI' }}</button></td>
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
        ime: '',
        sn: '',
        make: '',
        tip: '',
        tehnologija: '',
        tipovi: [],
        tehnologije: [],
        sekcija: '',
        sekcije: [],
        aparati: [],
        aparatiAll: [],
        ifButton: true,
        ifTrenutnePostavke: false,
        prikaziTekst: 'Trenutne postavke',
        infoDanger: false,
        infoSuccess: false,
        infoWarning: false,
        infoInfo: false,
        ifPostavkeAparati: true,
        dataAvailable: '',
        dataUslov: false,
        tabelaUslov: false,
        dataUslovDanger: false,        
        toastText: '',
        toastIcon: '',
        toastPosition: '',
        toastDuration: 2500,
        isToastFullWidth: false,
        className: '',
      }
    },
    name: 'aparat',
  
    created: function() {
      //this.catchAparati();
    },
    mounted() {  
      this.catchAparati();
      http.get('postavke/aparat/mount/list?token=' + this.$store.state.token+'&site='+this.$store.state.site, {})
        .then(res => {       
          if (res.data.success === false) {
            // DO NOTHING 
          } else {
            this.tipovi = res.data.obj.tip
            this.tehnologije = res.data.obj.tehnologija
            this.sekcije = res.data.obj.sekcija
  
            if (this.tipovi.length == 0) {  
              this.tipovi.push('NEMA PODATAKA')  
            }
  
            if (this.tehnologije.length == 0) {  
              this.tehnologije.push('NEMA PODATAKA')
            }
  
            if (this.sekcije.length == 0) {  
              this.sekcije.push('NEMA PODATAKA')
            }
          }
        })
    },
    methods: {
      dodajPostavku: function() {  
        var item = true
        var check = true
  
        if ((this.tip.trim() === 'GREŠKA - DB Connection') || (this.tehnologija.trim() === 'GREŠKA - DB Connection') || (this.sekcija.trim() === 'GREŠKA - DB Connection')) {
          item = false
  
          this.toastText = 'Molimo Vas da osvježite aplikaciju!'
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
        } else if ((this.ime.trim() === '') || (this.sn.trim() === '') || (this.make.trim() === '') || (this.tip.trim() === '') || (this.tehnologija.trim() === '') || (this.sekcija.trim() === '')) {
          item = false
  
          this.toastText = 'Sva polja su obavezna!'
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
        } else if (this.tip.trim() === 'NEMA PODATAKA') {  
          item = false
  
          this.toastText = 'Tip aparata nije definisan!'
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
        } else if (this.tehnologija.trim() === 'NEMA PODATAKA') {  
          item = false
  
          this.toastText = 'Tehnologija aparata nije definisana!'
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
        } else if (this.sekcija.trim() === 'NEMA PODATAKA') {          
          item = false

          this.toastText = 'Sekcije nisu definisane!'
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
          if (this.sn.trim() != '') {  
            var i
            for (i = 0; i < this.aparatiAll.length; i++) {  
              if ((this.sn.trim() === this.aparatiAll[i].sn)) {                            
                item = false
               
                this.toastText = 'Aparat sa unesenim serijskim brojem već postoji!'
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
                check = false
              }
            }
          }
  
          if (check != false) {  
            if (this.ime.trim() != '') {  
              var j
              for (j = 0; j < this.aparati.length; j++) {  
                if ((this.ime.toUpperCase().trim() === this.aparati[j].ime.toUpperCase().trim())) {
                  item = false

                  this.toastText = 'Aparat već postoji!'
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
              }
            }  
          }
        }
        if (item) {
          http.post('postavke/aparat/save', {
              email: this.$store.state.userId,
              ime: this.ime,
              sn: this.sn,
              make: this.make,
              tip: this.tip,
              tehnologija: this.tehnologija,
              sekcija: this.sekcija,
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
  
                this.ime = ''
                this.sn = ''
                this.make = ''
                this.tip = ''
                this.tehnologija = ''
                this.sekcija = ''
                this.prikaziPostavke()
                this.prikaziPostavke()  
              }
            })
        }
      },
      prikaziPostavke: function() {
        this.ime = ''
        this.sn = ''
        this.make = ''
        this.tip = ''
        this.tehnologija = ''
        this.sekcija = ''
        this.ifPostavkeAparati = !this.ifPostavkeAparati
        this.ifTrenutnePostavke = !this.ifTrenutnePostavke

        http.get('postavke/aparat/listall?token=' + this.$store.state.token+'&site='+this.$store.state.site, {})
          .then(res => {  
            if (res.data.success === false) {
              
            } else {
              this.aparatiAll = []
              this.aparatiAll = res.data.aparati
            }
          })

        http.get('postavke/aparat/list?token=' + this.$store.state.token+'&site='+this.$store.state.site, {})
          .then(res => {
            // console.log(res.data)  
            if (res.data.success === false) {
              this.dataAvailable = 'Greška prilikom čitanja iz baze.'
              this.dataUslovDanger = true
              this.dataUslov = false
              this.tabelaUslov = false
            } else {
              this.aparati = res.data.aparati
  
              if (this.aparati.length > 0) {
                this.dataAvailable = ''
                this.dataUslov = false
                this.dataUslovDanger = false
                this.tabelaUslov = true
              }
  
              if (this.aparati.length <= 0) {                
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
        this.ifPostavkeAparati = !this.ifPostavkeAparati
      },
      catchDialog: function(event) {
        this.$dialog.confirm('Jeste li sigurni da želite obrisati zapis?', {
            type: 'hard',
            html: true,
            verification: 'Da'
          })
          .then(() => {                                        
  
            http.post('postavke/aparat/delete', {
                _id: event.target.id,
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
      izbrisiAparat: function(event) {
        http.post('postavke/aparat/delete', {
            _id: event.target.id,
            token: this.$store.state.token,
            site: this.$store.state.site
          })
          .then(res => {           
            this.prikaziPostavke()
            this.prikaziPostavke()
          })
      },
      catchAparati: function() {
        http.get('postavke/aparat/list?token=' + this.$store.state.token+'&site='+this.$store.state.site, {})
          .then(res => {  
            if (res.data.success === false) {
              this.tipovi.push('GREŠKA - DB Connection')
              this.tehnologije.push('GREŠKA - DB Connection')
              this.sekcije.push('GREŠKA - DB Connection')
              this.aparati = []
            } else {
              this.aparati = res.data.aparati
            }
          })

          http.get('postavke/aparat/listall?token=' + this.$store.state.token+'&site='+this.$store.state.site, {})
          .then(res => {  
            if (res.data.success === false) {
              
            } else {
              this.aparatiAll = []
              this.aparatiAll = res.data.aparati
            }
          })
      },
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
