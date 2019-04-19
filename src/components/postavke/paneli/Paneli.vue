<template>
  <div class="form-elements">
    <div class="row">
      <div class="col-md-12">
        <vuestic-widget v-if="opste" headerText="Opšte postavke - Paneli laboratorijskih analiza">
          <div v-if="korak1" class="row">
            <div class="col-md-3"></div>
            <div class="col-md-6">
              <fieldset>
                <div class="form-group with-icon-left">
                  <div class="input-group">
                    <input id="input-icon-left" title=" " v-model="sifraPanela" name="input-icon-left" required/>
                    <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                    <label class="control-label" for="input-icon-left">{{'Unesite šifru panela'}}</label><i class="bar"></i>
                  </div>
                </div>
                <div class="form-group with-icon-left">
                  <div class="input-group">
                    <input id="input-icon-left" title=" " v-model="imePanela" name="input-icon-left" required/>
                    <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                    <label class="control-label" for="input-icon-left">{{'Unesite naziv panela'}}</label><i class="bar"></i>
                  </div>
                </div>
                <div class="form-group with-icon-left">
                  <div class="input-group">
                    <input id="input-icon-left" title=" " v-model="opisPanela" name="input-icon-left" required/>
                    <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                    <label class="control-label" for="input-icon-left">{{'Unesite opis panela'}}</label><i class="bar"></i>
                  </div>
                </div>
                <button class="btn btn-secondary" @click.prevent="goNaprijed"><span class="fa fa-step-forward"></span>{{ ' Naprijed'}}</button>
              </fieldset>
              <hr>
              <a @click="trenutneGo" href="#">{{'Trenutne postavke'}}</a>
            </div>
          </div>
          <div v-if="korak2" class="row">
            <div class="col-md-12">
              <fieldset>
                <div class="col-md-12">
                  <div v-if="testovi.length < 1" style="text-align:center;" class="testoviDiv">
                    <h4 style="color:#4ab2e3">{{'Dodajte testove'}}</h4>
                    <hr style="border-color:#4ab2e3">
                  </div>
                  <div v-if="testovi.length > 0" style="text-align:center;" class="testoviDiv">
                    <span v-for="test in testovi" class="btn btn-primary btn-micro" @click="izbaciTest($event)" :name="test.labassay">
                            {{test.ime_testa}}                
                          </span>
                    <hr style="border-color:#4ae387">
                  </div>
                  <vuestic-simple-select label="Izaberite sekciju testova" v-model="sekcija" name="sekcija" :required="true" title=" " ref="sekcijaSelect" v-bind:options="sekcije">
                  </vuestic-simple-select>
                  <div>
                    <div v-if="this.sviTestovi.length < 1 && loaded" style="text-align:center;" class="testoviDiv">
                      <div>&nbsp</div>
                      <div> {{'Nema dostupnih podataka.'}}</div>
                    </div>
                    <div style="text-align:center;" v-for="index in Math.ceil(sviTestovi.length/100)" class="table">
                      <br>
                      <div @click="dodajTest($event)" :title="test.analit" v-for="test in (sviTestovi.slice((index-1)*100,index*100))" class="btn btn-primary btn-micro" align="middle" :id="test.labassay">
                        {{ test.ime_testa }}
                      </div>
                    </div>
                    <div v-show="false" style="text-align:center;" v-for="index in Math.ceil(basSviTestovi.length/100)" class="table">
                      <br>
                      <div @click="dodajTest($event)" :title="test.analit" v-for="test in (basSviTestovi.slice((index-1)*100,index*100))" class="btn btn-primary btn-micro" align="middle" :id="test.labassay">
                        {{ test.ime_testa }}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-12">
                  <hr>
                </div>
                <div class="row">
                  <div class="col-md-3"></div>
                  <div class="col-md-6">
                    <button class="btn btn-secondary" @click.prevent="goNazad"><span class="fa fa-step-backward"></span>{{ ' nazad'}}</button>
                    <button class="btn btn-primary" @click.prevent="sacuvajPanel"><span class="fa fa-save"></span>{{ ' SAČUVAJ'}}</button>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </vuestic-widget>
        <vuestic-widget v-if="trenutne" headerText="Trenutne postavke - Paneli laboratorijskih analiza">
          <div class="table-responsive">
            <table class="table table-striped first-td-padding">
              <thead>
                <tr>
                  <td>{{"Šifra"}}</td>
                  <td>{{"Naziv"}}</td>
                  <td>{{"Opis"}}</td>
                  <td>{{"Testovi"}}</td>
                  <td v-if="$store.state.userId === 'admin@atom.ba'">{{"Akcija"}}</td>
                </tr>
              </thead>
              <tbody>
                <tr v-for="element in sviPaneli">
                  <td><strong>{{element.sifra}}</strong></td>
                  <td>{{element.naziv}}</td>
                  <td>{{element.opis}}</td>
                  <td>
                    <button title='Pregled testova' @click.prevent="testoviPanela(element.testovi, element.opis)" class="btn btn-primary btn-micro"><span class="fa fa-file-text-o"></span> VIŠE</button>
                  </td>
                  <td v-if="$store.state.userId === 'admin@atom.ba'">
                    <button title='Brisanje zapisa' v-bind:id="element.sifra" class="btn btn-danger btn-micro" @click="izbrisiPanel($event)"><span v-bind:id="element.sifra" class="fa fa-trash-o"></span> {{ 'IZBRIŠI' }}</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <hr>
          <div class="row">
            <div class="col-md-3"></div>
            <div class="col-md-6">
              <button class="btn btn-secondary" @click.prevent="povratakNaOpste"><span class="fa fa-backward"></span>{{ ' POVRATAK'}}</button>
            </div>
          </div>
          <vuestic-modal-m :show.sync="show" ref="mediumModal" :okText="potvrdi" :cancelText="odustani">
            <div slot="title"><strong>{{this.rezName}}</strong> </div>
            <div style="text-align:center;" class="testoviDiv">
              <div style="text-align:center;" v-for="test in rezAn" class='btn btn-secondary-warning btn-micro'>
                {{test}}
              </div>
            </div>
          </vuestic-modal-m>
        </vuestic-widget>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    http
  } from '../../../../config/config.js'
  import index from 'axios';
  
  export default {
    data() {
      return {
        sifraPanela: '',
        imePanela: '',
        opisPanela: '',
        sekcija: 'SVE SEKCIJE',
        sekcije: [],
        sviTestovi: [],
        basSviTestovi: [],
        testovi: [],
        sviPaneli: [],
        testoviFiltered: [],
        sviMoguciTestovi: [],
        korak1: true,
        korak2: false,
        opste: true,
        trenutne: false,
        rezAn: [],
        rezName: '',
        show: true,
        potvrdi: "POTVRDI",
        odustani: "ZATVORI",  
        toastText: '',
        toastIcon: '',
        toastPosition: '',
        toastDuration: 2500,
        isToastFullWidth: false,
        className: '',
        loaded: false,
      }
    },
    name: 'paneli',
  
    mounted() {
      http.get('/postavke/sekcija/list?token=' + this.$store.state.token + '&site=' + this.$store.state.site, {})
        .then(res => {
          this.sekcije.push('SVE SEKCIJE')
          res.data.sekcija.forEach(element => {
            this.sekcije.push(element.sekcija)
          })
        })
  
      http.get('/postavke/paneli/list?token=' + this.$store.state.token + '&site=' + this.$store.state.site, {})
        .then(res => {
          this.sviPaneli = res.data.paneli
        })
  
      http.post('/uzorci/sekcije/testovi', {
          token: this.$store.state.token,
          site: this.$store.state.site
        })
        .then(res => {
          this.sviTestovi = []
          res.data.testovi.forEach(element => {
            this.sviTestovi.push({
              labassay: element._id,
              ime_testa: element.naziv,
              cijena: element.price,
              analit: element.analit,
              sekcija: element.sekcija,
              manual: element.manual,
              calculated: element.calculated,
              calculatedTests: element.calculatedTests
            })
          })
  
          this.sviTestovi.forEach(element => {
            if (!this.basSviTestovi.filter(test => test.labassay === element.labassay).length > 0) {
              this.basSviTestovi.push(element)
            }
          })
          this.loaded = true
        })
    },
  
    watch: {
      sekcija: function() {
        http.post('/uzorci/sekcije/testovi', {
            sekcija: this.sekcija,
            token: this.$store.state.token,
            site: this.$store.state.site
          })
          .then(res => {
            this.sviTestovi = []
            if (this.sekcija === 'SVE SEKCIJE') {
              res.data.testovi.forEach(element => {
                this.sviTestovi.push({
                  labassay: element._id,
                  ime_testa: element.naziv,
                  cijena: element.price,
                  analit: element.analit,
                  sekcija: element.sekcija,
                  manual: element.manual,
                  calculated: element.calculated,
                  calculatedTests: element.calculatedTests
                })
              })
            } else {
              res.data.testovi.forEach(element => {
                if (element.sekcija === this.sekcija) {
                  this.sviTestovi.push({
                    labassay: element._id,
                    ime_testa: element.naziv,
                    cijena: element.price,
                    analit: element.analit,
                    sekcija: element.sekcija,
                    manual: element.manual,
                    calculated: element.calculated,
                    calculatedTests: element.calculatedTests
                  })
                }
              })
            }
          })
      }
    },
    methods: {
      goNaprijed() {
        var item = true
  
        if ((this.sifraPanela.trim() === '') || (this.imePanela.trim() === '') || (this.opisPanela.trim() === '')) {
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
        } else {
          if (this.sviPaneli != undefined) {
            this.sviPaneli.forEach(element => {
              if (element.sifra === this.sifraPanela) {
                item = false
                this.toastText = 'Šifra već postoji!'
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
        if (item) {
          this.korak1 = false
          this.korak2 = true
        }
      },
      povratakNaOpste() {
        this.opste = true
        this.trenutne = false
      },
      testoviPanela: function(data, naziv) {
        this.rezAn = []
        this.rezName = naziv
  
        data.forEach(element => {
          this.rezAn.push(element.ime_testa)
        });
        this.$refs.mediumModal.open()
      },
      trenutneGo() {
        this.sifraPanela = ''
        this.opisPanela = ''
        this.imePanela = ''
        this.dohvatiPanele()
        this.opste = false
        this.trenutne = true
      },
      goNazad() {
        this.korak1 = true
        this.korak2 = false
      },
      izbrisi(type, text, desc) {
        this.testovi = []
      },
      dohvatiPanele() {
        this.sviPaneli = []
        http.get('/postavke/paneli/list?token=' + this.$store.state.token + '&site=' + this.$store.state.site, {})
          .then(res => {
            this.sviPaneli = res.data.paneli
          })
      },
      dodajTest(event) {
        var manual = false
        var calculated = false
        var kalkuliraniTestovi = []
        var sekc = ''
        var anlit = ''
        var cost = ''
  
        if (!this.testovi.filter(test => test.labassay === event.target.id).length > 0) {
          this.sviTestovi.forEach(element => {
            if ((event.target.id === element.labassay)) {
              sekc = element.sekcija
              anlit = element.analit
              cost = element.cijena
            }
            if (element.manual && (event.target.id === element.labassay)) {
              manual = true
            }
            if (element.calculated && (event.target.id === element.labassay)) {
              calculated = true
              element.calculatedTests.forEach(kalk => {
                kalk.sekcija = element.sekcija
                kalk.calculated = false
                kalk.calculatedTests = []
                kalk.cijena = '0'
  
                this.basSviTestovi.forEach(bastest => {
                  if (bastest.labassay === kalk.labassay) {
                    kalk.cijena = bastest.cijena
                    kalk.analit = bastest.analit                    
                  }
                })
  
                if (!this.testovi.filter(test => test.labassay === kalk.labassay).length > 0) {
                  this.testovi.push(kalk)
                }
                kalkuliraniTestovi.push(kalk)
              })
            }
          })          
          this.testovi.push({
            labassay: event.target.id,
            ime_testa: event.target.innerText,
            cijena: cost,
            analit: anlit,
            sekcija: sekc,
            manual: manual,
            calculated: calculated,
            calculatedTests: kalkuliraniTestovi
          })
        }
      },
      izbaciTest(event) {
        var alert = false
        var izbaciti = event.target.getAttribute('name')
        var count = 0
  
        this.testovi.forEach(element => {
          if (element.calculated) {
            element.calculatedTests.forEach(kalk => {
              if (izbaciti === kalk.labassay) {
                count++
              }
            })
          }
        })
  
        if (count > 0) {
          alert = false
          this.toastText = 'Test nije moguće ukloniti!'
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
          alert = true
        }
  
        if (alert) {
          if (this.testovi.length < 2) {
            this.placeholder = 'Izaberite testove'
          }
          this.test = event.target.innerText
          for (var i = 0; i < this.testovi.length; i++) {
            if (this.testovi[i].labassay === event.target.getAttribute('name')) {
              this.testovi.splice(i, 1);
              break;
            }
          }
          if (event.target.className === 'btn btn-primary btn-micro') {
            document.getElementById(event.target.getAttribute('name')).className = 'btn btn-primary btn-micro'
          }
          if (event.target.className === 'btn btn-secondary btn-micro') {
            document.getElementById(event.target.getAttribute('name')).className = 'btn btn-secondary btn-micro'
          }
          if (event.target.className === 'btn btn-warning btn-micro') {
            document.getElementById(event.target.getAttribute('name')).className = 'btn btn-warning btn-micro'
          }
        }
      },
      sacuvajPanel() {
        var item = true
  
        if ((this.sifraPanela.trim() === '') || (this.imePanela.trim() === '') || (this.opisPanela.trim() === '')) {
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
        } else if (this.testovi.length < 1) {
          item = false
          this.toastText = 'Testovi nisu definisani!'
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
          if (this.sviPaneli != undefined) {
            this.sviPaneli.forEach(element => {
              if (element.sifra === this.sifraPanela) {
                item = false
                this.toastText = 'Šifra već postoji!'
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
  
        if (item) {
          http.post('/postavke/paneli/save', {
              testovi: this.testovi,
              sifra: this.sifraPanela,
              naziv: this.imePanela,
              opis: this.opisPanela,
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
                this.testovi = []
                this.sekcija = 'SVE SEKCIJE'
                this.sifraPanela = ''
                this.opisPanela = ''
                this.imePanela = ''
                this.dohvatiPanele()
                this.korak1 = true
                this.korak2 = false
              }
            })
        }
      },
      izbrisiPanel: function(event) {
        this.$dialog.confirm('Jeste li sigurni da želite obrisati zapis?', {
            type: 'hard',
            html: true,
            verification: 'Da'
          })
          .then(() => {
            http.post('postavke/paneli/delete', {
                sifra: event.target.id,
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
                  this.dohvatiPanele()
                  this.dohvatiPanele()
                }
              })
          })
          .catch(function() {
  
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
  
  .testoviDiv {
    margin: 0 auto;
  }
</style>