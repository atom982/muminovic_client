<template>
  <div class="form-elements">
    <div class="row">
      <div class="col-md-12">
        <vuestic-widget v-if="ifKontrolaBasic" headerText="Definicija kontrola">
          <form>
            <div class="row">
              <div class="col-md-3"></div>
              <div class="col-md-6">
                <fieldset>
                  <vuestic-simple-select label="Izaberite aparat" v-model="aparat" name="aparat" :required="true" title=" " ref="aparatSelect" v-bind:options="aparati">
                  </vuestic-simple-select>
                  <vuestic-simple-select label="Izaberite tip kontrole" v-model="tip" name="tip" :required="true" title=" " ref="tipSelect" v-bind:options="tipovi">
                  </vuestic-simple-select>
                  <div class="form-group with-icon-left">
                    <div class="input-group">
                      <input id="input-icon-left" title=" " v-model="ime" name="input-icon-left" required/>
                      <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                      <label class="control-label" for="input-icon-left">{{'Unesite naziv kontrole'}}</label><i class="bar"></i>
                    </div>
                  </div>
                  <div class="form-group with-icon-left">
                    <div class="input-group">
                      <input id="input-icon-left" title=" " v-model="lot" name="input-icon-left" required/>
                      <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                      <label class="control-label" for="input-icon-left">{{'Unesite lot kontrole'}}</label><i class="bar"></i>
                    </div>
                  </div>
                  <div class="form-group with-icon-left">
                    <div class="input-group">
                      <input id="input-icon-left" title=" " v-model="rok" name="input-icon-left" required/>
                      <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                      <label class="control-label" for="input-icon-left">{{'Unesite rok važenja kontrole'}}</label><i class="bar"></i>
                    </div>
                  </div>
                  <button class="btn btn-secondary" @click.prevent="dodajVrijednosti"><span class="fa fa-step-forward"></span>{{ ' Naprijed'}}</button>
                </fieldset>
                <hr v-if="aparatIzabran">
                <a v-if="aparatIzabran" @click="prikaziPostavke" href="#">{{prikaziTekst}}</a>
              </div>
            </div>
          </form>
        </vuestic-widget>
        <vuestic-widget v-if="ifVrijednosti" :headerText="info">
          <div style="text-align:center;" v-for="index in Math.ceil(sviTestovi.length/100)" class="table">
            <div @click="dodajTest($event)" :title="test.test.analit" v-for="test in (sviTestovi.slice((index-1)*100,index*100))" class="btn btn-primary btn-micro" align="middle" :id="test._id">
              {{ test.test.naziv }}
            </div>
          </div>
          <hr v-if="kontroleTestova.length < 1" style="border-color:#4ab2e3">
  
          <h4 style="text-align:center;" v-if="!prazanSviTestovi && (kontroleTestova.length < 1) && vise" v-bind:style="{ color: activeColorStyle}">{{placeholder1}}</h4>
          <h4 style="text-align:center;" v-if="!prazanSviTestovi && (kontroleTestova.length < 1) && !vise" v-bind:style="{ color: activeColorStyle}">{{placeholder2}}</h4>
          <div class="table-responsive">
            <table v-if="kontroleTestova.length > 0" class="table table-striped first-td-padding">
              <thead>
                <tr>
                  <td>{{"naziv kontrole"}}</td>
                  <td>{{"TEST"}}</td>
                  <td>{{"JEDINICA"}}</td>
                  <td>{{"DREF"}}</td>
                  <td>{{"GREF"}}</td>
                </tr>
              </thead>
              <tbody>
                <tr v-for="element in kontroleTestova">
                  <td>{{ime}}</td>
                  <td>{{element.test.naziv}}</td>
                  <td>{{element.test.jedinica}}</td>
                  <td>
                    <div v-show="element.edit == false">
                      <label @dblclick="element.edit = true">
                                      <strong>{{element.refd}}</strong> 
                                    </label>
                    </div>
                    <input type="number" min="0" step="any" v-show="element.edit == true" v-model="element.refd" @keyup.enter="element.edit=false; $emit('update', element._id, 'enter',element.refd)">
                  </td>
                  <td>
                    <div v-show="element.edit == false">
                      <label @dblclick="element.edit = true">
                                      <strong>{{element.refg}}</strong> 
                                    </label>
                    </div>
                    <input type="number" min="0" step="any" v-show="element.edit == true" v-model="element.refg" @keyup.enter="element.edit=false; $emit('update', element._id, 'enter',element.refg)">
                  </td>
                </tr>
              </tbody>
            </table>
            <vuestic-alert v-if="prazanSviTestovi" type="warning" :withCloseBtn="false"><span>{{'Za odabrani aparat, nema dostupnih testova.'}}</span></vuestic-alert>
          </div>
          <hr>
          <div class="row">
            <div class="col-md-3"></div>
            <div class="col-md-6">
              <button v-if="!prazanSviTestovi" class="btn btn-primary" @click.prevent="sacuvajVrijednosti"><span class="fa fa-save"></span>{{ ' SAČUVAJ'}}</button>
              <hr v-if="!prazanSviTestovi">
              <button class="btn btn-secondary " @click.prevent="gotovo"><span class="fa fa-step-backward"></span>{{ ' nazad'}}</button>
              <button v-if="!prazanSviTestovi" :disabled="prazanSviTestovi || kontroleTestova.length < 1" class="btn btn-secondary-warning" @click.prevent="obrisiSve"><span class="fa fa-trash-o"></span>{{ ' poništi'}}</button>
            </div>
          </div>
        </vuestic-widget>
        <vuestic-widget v-if="ifTrenutnePostavke" :headerText="naziv">
          <div class="table-responsive">
            <table v-if="tabelaUslov1" class="table table-striped first-td-padding">
              <thead>
                <tr>
                  <td>{{"naziv kontrole"}}</td>
                  <td>{{"tip"}}</td>
                  <td>{{"lot"}}</td>
                  <td>{{"rok važenja"}}</td>
                  <td>{{"detalji"}}</td>
                  <td>{{"akcija"}}</td>
                </tr>
              </thead>
              <tbody>
                <tr v-for="element in sveKontrole">
                  <td>{{element.ime}}</td>
                  <td>{{element.tip}}</td>
                  <td>{{element.lot}}</td>
                  <td>{{element.rok}}</td>
                  <td><button title='Detaljan pregled kontrole' :id="element._id" :name="element.ime" class="btn btn-secondary-warning btn-micro" @click="detaljiKontrole($event, element.ime)"><span :id="element._id"  :name="element.ime" class="fa fa-flask"></span>{{ ' pregled'}}</button></td>
                  <td><button title='Brisanje zapisa' :id="element._id" class="btn btn-danger btn-micro" @click="catchDialog($event)"><span :id="element._id" class="fa fa-trash-o"></span>{{ ' IZBRIŠI' }}</button></td>
                </tr>
              </tbody>
            </table>
            <vuestic-alert v-if="dataUslov1" type="warning" :withCloseBtn="false"><span>{{dataAvailable1}}</span></vuestic-alert>
          </div>
          <hr>
          <div class="row">
            <div class="col-md-3"></div>
            <div class="col-md-6">
              <button class="btn btn-secondary" @click.prevent="povratakNazad"><span class="fa fa-backward"></span>{{ ' POVRATAK'}}</button>
            </div>
          </div>
        </vuestic-widget>
        <vuestic-widget v-if="ifDetaljiKontrole" :headerText="tmpNaziv">
          <div class="table-responsive">
            <table class="table table-striped first-td-padding">
              <thead>
                <tr>
                  <td>{{"test"}}</td>
                  <td>{{"jedinica"}}</td>
                  <td>{{"DREF"}}</td>
                  <td>{{"GREF"}}</td>
                </tr>
              </thead>
              <tbody>
                <tr v-for="n in odabranaKontrolaDetalji">
                  <td>{{n.anaassay}}</td>
                  <td>{{n.jedinica}}</td>
                  <td>{{n.refd}}</td>
                  <td>{{n.refg}}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <hr>
          <div class="row">
            <div class="col-md-3"></div>
            <div class="col-md-6">
              <button class="btn btn-secondary" @click.prevent="povratakNazadDetaljno"><span class="fa fa-step-backward"></span>{{ ' nazad'}}</button>
              <button class="btn btn-secondary" @click.prevent="povratakDetaljno"><span class="fa fa-backward"></span>{{ ' POVRATAK'}}</button>
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
        ifKontrolaBasic: true,
        ifVrijednosti: false,
        ifTrenutnePostavke: false,
        ifDetaljiKontrole: false,
        tabelaUslov: false,
        prikaziTekst: 'Trenutne postavke',
        aparat: '',
        aparati: [],
        tip: '',
        tipovi: ['POJEDINAČNA', 'MULTI'],
        sviTestovi: [],
        prazanSviTestovi: false,
        kontroleTestova: [],
        ime: '',
        lot: '',
        rok: '',
        info: '',
        placeholder1: 'Izaberite testove',
        placeholder2: 'Izaberite test',
        text: '',
        desc: '',
        activeColorStyle: '#4ab2e3',
        vise: false,
        noviRok: '',
        noviDatum: '',
        aparatIzabran: false,
        sveKontrole: [],
        odabranaKontrola: [],
        odabranaKontrolaDetalji: [],
        naziv: '',
        tabelaUslov1: true,
        dataUslov1: false,
        dataAvailable: '',
        tmpNaziv: 'Trenutne referentne vrijednosti za kontrolu: ',
        imeK: '',
        greska: '',
        toastText: '',
        toastIcon: '',
        toastPosition: '',
        toastDuration: 2500,
        isToastFullWidth: false,
        className: '',
        brojtestova: 0
      }
    },
    name: 'kontrole',
  
    mounted() {
      http.get('postavke/aparat/mount/list?token=' + this.$store.state.token + '&site=' + this.$store.state.site, {
  
        })
        .then(res => {
          if (res.data.success === false) {
            this.aparati.push('GREŠKA - DB Connection')
          } else {
            this.aparati = []
            res.data.obj.aparat.forEach(element => {
              if (!element.ime.toUpperCase().includes('MANUAL')) {
                http.post('postavke/aptest/list', {
                    email: this.$store.state.userId,
                    aparat: element.ime,
                    token: this.$store.state.token,
                    site: this.$store.state.site
                  })
                  .then(res => {
                    var aPar = ''
                    this.forEach(res.data.aptests, function(test, index, arr) {
                      if (!test.test.calculated && !test.test.multi) {                        
                        aPar = element.ime
                        throw arr
                      }
                    })
                    if (aPar != '') {
                      if (!this.aparati.filter(aparat => aparat === aPar).length > 0) {
                        this.aparati.push(aPar)
                      }
                    }
                  })
              }
            })
          }
        })
  
      this.$on('update', function(edited, method, refd) {
        if (method === "blur") {
  
        }
      })
    },
    watch: {
      aparat: function() {
        this.tip = ''
        this.ime = ''
        this.lot = ''
        this.rok = ''
        this.sviTestovi = []
        this.sveKontrole = []
        this.aparatIzabran = false
        http.post('postavke/aptest/list', {
            email: this.$store.state.userId,
            aparat: this.aparat,
            token: this.$store.state.token,
            site: this.$store.state.site
          })
          .then(res => {
            res.data.aptests.forEach(element => {
              if (!element.test.calculated && !element.test.multi) {
                element.edit = true
                element.refd = ''
                element.refg = ''
                this.sviTestovi.push(element)
              }
            })
            if (this.sviTestovi.length < 1) {
              this.prazanSviTestovi = true
            } else {
              this.prazanSviTestovi = false
            }
          }).then(res => {
            if (this.aparat === '') {
              this.aparatIzabran = false
            } else {
              this.aparatIzabran = true
            }
          })
  
        http.post('/kontrole/aparat/list', { // DEFINISANE KONTROLE ZA IZABRANI APARAT
            email: this.$store.state.userId,
            aparat: this.aparat,
            token: this.$store.state.token,
            site: this.$store.state.site
          })
          .then(res => {
            this.naziv = "Trenutne postavke - Kontrole testova za aparat: " + this.aparat
            if (res.data.kontrole != undefined) {
              res.data.kontrole.forEach(element => {
                var dtroka = element.rok
                var dan = dtroka.substring(8, 10)
                var mjesec = dtroka.substring(5, 7)
                var godina = dtroka.substring(0, 4)
                element.rok = dan + '.' + mjesec + '.' + godina
                this.sveKontrole.push(element)
              })
            }
          })
      },
      lot: function() {
  
        if (this.lot != '') {
          var d = new Date()
          var mjesec = d.getMonth() + 1
          if (mjesec < 10) {
            mjesec = '0' + mjesec
          }
          var dan = d.getUTCDate()
          if (dan < 10) {
            dan = '0' + dan
          }
          var godina = d.getFullYear()
          this.rok = dan + '/' + mjesec + '/' + godina
          var niz = this.rok.split("/")
          this.noviRok = new Date(niz[2], niz[1] - 1, niz[0], '00', '00')
        } else {
          this.rok = ''
        }
      }
    },
    methods: {
      obrisiSve() {
        this.kontroleTestova = []
        this.sviTestovi.forEach(element => {
          element.edit = true
          element.refd = ''
          element.refg = ''
  
        })
      },
      refresh() {
        this.sviTestovi = []
        this.sveKontrole = []
        this.aparatIzabran = false
        http.post('postavke/aptest/list', {
            email: this.$store.state.userId,
            aparat: this.aparat,
            token: this.$store.state.token,
            site: this.$store.state.site
          })
          .then(res => {
            res.data.aptests.forEach(element => {
              if (!element.test.calculated && !element.test.multi) {
                element.edit = true
                element.refd = ''
                element.refg = ''
                this.sviTestovi.push(element)
              }
            })
            if (this.sviTestovi.length < 1) {
              this.prazanSviTestovi = true
            } else {
              this.prazanSviTestovi = false
            }
          }).then(res => {
            if (this.aparat === '') {
              this.aparatIzabran = false
            } else {
              this.aparatIzabran = true
            }
          })
  
        http.post('/kontrole/aparat/list', { // DEFINISANE KONTROLE ZA IZABRANI APARAT
            email: this.$store.state.userId,
            aparat: this.aparat,
            token: this.$store.state.token,
            site: this.$store.state.site
          })
          .then(res => {
            this.naziv = "Trenutne postavke - Kontrole testova za aparat: " + this.aparat
            res.data.kontrole.forEach(element => {
              var dtroka = element.rok
              var dan = dtroka.substring(8, 10)
              var mjesec = dtroka.substring(5, 7)
              var godina = dtroka.substring(0, 4)
              element.rok = dan + '.' + mjesec + '.' + godina
              this.sveKontrole.push(element)
            })
          })
      },
      dodajTest(event) {
        var postoji = false
        this.sviTestovi.forEach(element => {
          if (event.target.id === element._id) {
            if (this.tip === "MULTI") {
              this.kontroleTestova.forEach(test => {
                if (test._id === event.target.id) {
                  postoji = true
                }
              });
              if (!postoji) {
                this.kontroleTestova.push(element)
              }
              this.tabelaUslov = true
            } else {
              if (this.kontroleTestova.length < 1) {
                this.kontroleTestova.push(element)
                this.tabelaUslov = true
              }
            }
          }
        })
      },
      dodajVrijednosti() {
        var kontr = true
  
        if ((this.aparat.trim() === '') || (this.tip.trim() === '') || (this.ime.trim() === '') || (this.lot.trim() === '') || (this.rok.trim() === '')) {
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
        } else if ((this.aparat.trim() != '') && (this.tip.trim() != '') && (this.ime.trim() != '') && (this.lot.trim() != '') && (this.rok.trim() != '')) {
          this.sveKontrole.forEach(kontrola => {
            if (kontr) {
              if (kontrola.ime.trim() === this.ime.trim()) {
                this.toastText = 'Kontrola već postoji!'
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
                kontr = false
              }
            }
          })
  
          if (kontr) {
            var kon = true
  
            this.sveKontrole.forEach(kontrola => {
              if (kon) {
                if (kontrola.lot.trim() === this.lot.trim()) {
                  this.toastText = 'Lot je već definisan!'
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
                  kon = false
                }
              }
            })
          }
        }
  
        if (kontr && kon) {
          if (/^[0-3][0-9]\/[0-1][0-9]\/\d{4}$/.test(this.rok)) {
            var zin = this.rok.split("/")
            this.noviDatum = new Date(zin[2], zin[1] - 1, zin[0], '00', '00')
  
            if (this.noviDatum > this.noviRok) {
              if (this.tip === "MULTI") {
                this.vise = true
              } else {
                this.vise = false
              }
              this.ifKontrolaBasic = !this.ifKontrolaBasic
              this.ifVrijednosti = !this.ifVrijednosti
              this.info = "Vrijednosti kontrole: " + this.aparat + ' | ' + this.tip + ' | ' + this.ime + ' | ' + this.lot
            } else {
              this.toastText = 'Rok važenja kontrole nije validan!'
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
          } else {
            this.toastText = 'Datum nije validan!'
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
      },
      gotovo() {
        this.ifKontrolaBasic = true
        this.ifVrijednosti = false
        this.kontroleTestova = []
        this.sviTestovi.forEach(element => {
          element.edit = true
          element.refd = ''
          element.refg = ''
        })
      },
      sacuvajVrijednosti() {
  
        if (this.prazanSviTestovi || this.kontroleTestova.length < 1) {
          this.toastText = 'Izaberite testove!'
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
  
          var item = true
          var count = 0
          var count2 = 0
  
          this.kontroleTestova.forEach(element => {
            if (isNaN(element.refd) || element.refd.trim() === '') {
              count++
            }
            if (isNaN(element.refg) || element.refg.trim() === '') {
              count++
            }
            if (!isNaN(element.refd) && !isNaN(element.refg)) {
              if (parseFloat(element.refd) >= parseFloat(element.refg)) {
                count++
                count2++
                this.greska = 'Gornja ref. vrijednost mora biti veća od donje ref. vrijednosti.'
              }
            }
          })
  
          if (count > 0) {
            item = false
            if (count2 > 0) {
              this.greska = 'Gornja ref. vrijednost mora biti veća od donje ref. vrijednosti.'
            } else {
              this.greska = 'Referentne vrijednosti moraju biti iz skupa realnih brojeva.'
            }
  
          } else {
            item = true
          }
  
          if (item) {
            http.post('postavke/kontrole/save', {
                email: this.$store.state.userId,
                aparat: this.aparat,
                tip: this.tip,
                ime: this.ime,
                lot: this.lot,
                rok: this.noviDatum,
                reference: this.kontroleTestova,
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
                  this.aparat = ''
                  this.tip = ''
                  this.ime = ''
                  this.lot = ''
                  this.rok = ''
                  this.aparatIzabran = false
                  this.kontroleTestova = []
                  this.ifKontrolaBasic = !this.ifKontrolaBasic
                  this.ifVrijednosti = !this.ifVrijednosti
                }
              })
          } else {
            this.toastText = 'Referentna vrijednost nije validna!'
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
  
      },
      validateDate: function(date) {
        if (/^[0-3][0-9]\/[0-1][0-9]\/\d{4}$/.test(date)) {
          return (true)
        } else {
          this.toastText = 'Datum nije validan!'
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
          return (false)
        }
      },
      povratakNazad: function() {
        this.aparat = ''
        this.tip = ''
        this.ime = ''
        this.lot = ''
        this.rok = ''
        this.aparatIzabran = false
        this.ifTrenutnePostavke = !this.ifTrenutnePostavke
        this.ifKontrolaBasic = !this.ifKontrolaBasic
      },
      prikaziPostavke() {        
        if (this.sveKontrole.length < 1) {
          this.tabelaUslov1 = false
          this.dataUslov1 = true
          this.dataAvailable1 = 'Nema dostupnih podataka.'
        } else if (this.sveKontrole.length > 0) {
          this.tabelaUslov1 = true
          this.dataUslov1 = false
          this.dataAvailable1 = ''
        }
        this.ifTrenutnePostavke = !this.ifTrenutnePostavke
        this.ifKontrolaBasic = !this.ifKontrolaBasic
      },
      prikaziPostavkeRefresh() {
        if (this.sveKontrole.length < 1) {
          this.tabelaUslov1 = false
          this.dataUslov1 = true
          this.dataAvailable1 = 'Nema dostupnih podataka.'
        } else if (this.sveKontrole.length > 0) {
          this.tabelaUslov1 = true
          this.dataUslov1 = false
          this.dataAvailable1 = ''
        }
        this.ifTrenutnePostavke = !this.ifTrenutnePostavke
        this.ifTrenutnePostavke = !this.ifTrenutnePostavke
  
      },
      detaljiKontrole(event, ime) {
        this.odabranaKontrola = []
        this.odabranaKontrolaDetalji = []
        this.imeK = ime
        this.tmpNaziv = 'Trenutne referentne vrijednosti za kontrolu: ' + this.imeK + ' | Aparat: ' + this.aparat
        http.post('postavke/kontrole/detalji', {
            email: this.$store.state.userId,
            _id: event.target.id,
            token: this.$store.state.token,
            site: this.$store.state.site  
          })
          .then(res => {
            res.data.kontrola.reference.forEach(element => {
              this.odabranaKontrolaDetalji.push({
                anaassay: element.anaassay.test.naziv,
                refd: element.refd,
                refg: element.refg,
                jedinica: element.jedinica
              })
            })
          })
  
        this.ifKontrolaBasic = false
        this.ifVrijednosti = false
        this.ifTrenutnePostavke = false
        this.ifDetaljiKontrole = true
      },
      povratakNazadDetaljno() {
        this.ifKontrolaBasic = false
        this.ifVrijednosti = false
        this.ifTrenutnePostavke = true
        this.ifDetaljiKontrole = false
      },
      povratakDetaljno() {
        this.ifKontrolaBasic = true // Vrati me skroz na početak i sve inicijaliziraj na početno stanje
        this.ifVrijednosti = false
        this.ifTrenutnePostavke = false
        this.ifDetaljiKontrole = false
        this.aparat = ''
        this.tip = ''
        this.ime = ''
        this.lot = ''
        this.rok = ''
        this.aparatIzabran = false
      },
      catchDialog: function(event) { // BRISANJE KONTROLE     
        this.$dialog.confirm('Jeste li sigurni da želite obrisati zapis?', {
            type: 'hard',
            html: true,
            verification: 'Da'
          })
          .then(() => {
            http.post('kontrole/uzorci/delete/', {
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
                  this.refresh()
                }
              })
          })
          .catch(function() {
  
          })
      },
      forEach: function(arr, fn, thisObj) {
        // Try-catch surrounds the loop to allow throwing the array as an equivalent
        // for breaking out of the loop.
        try {
          for (var i = 0, len = arr.length; i < len; i++) {
            fn.call(thisObj, arr[i], i, arr);
          }
        } catch (e) {
          // If the error thrown was not the array, allow the error to continue up the
          // stack.
          if (e !== arr) {
            throw e;
          }
        }
        // Return a reference to the array to all for further manipulation.
        return arr;
      }
    }
  }
</script>

<style lang="scss">
  @import "../../../sass/_variables.scss";
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
