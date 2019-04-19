<template>
  <div class="row">
    <div class="col-md-12">
      <vuestic-widget class="no-h-padding" headerText="Unos uzorka">
        <vuestic-wizard id="wizzard" v-if="show" v-on:uzorakUnesen="refreshWizard()" :steps="hrSteps" :sekcija="sekcija" wizard-type="simple">
          <!-- Korak 1 -->
          <div slot="page1" class="form-wizard-tab-content">
            <div class="col-md-3"></div>
            <div class="col-md-8">
              <div class="form-group with-icon-right" :class="{'has-error': errors.has('jmbg'), 'valid': isFormFieldValid('jmbg')}">
                <div class="input-group">
                  <input name="jmbg" data-vv-as="JMBG" v-model="jmbg" v-validate="'required|numeric'" required title=" " />
                  <i class="fa fa-exclamation-triangle error-icon icon-right input-icon"></i>
                  <i class="fa fa-check valid-icon icon-right input-icon"></i>
                  <label class="control-label">{{'Unesite JMBG pacijenta'}}</label><i class="bar"></i>
                  <small v-show="errors.has('jmbg')" class="help text-danger">{{ errors.first('jmbg') }}</small>
                </div>
              </div>
              <div class="form-group with-icon-right" :class="{'has-error': errors.has('ime'), 'valid': isFormFieldValid('ime')}">
                <div class="input-group">
                  <input name="ime" data-vv-as="Ime" v-model="ime" v-validate="'required'" required title=" " />
                  <i class="fa fa-exclamation-triangle error-icon icon-right input-icon"></i>
                  <i class="fa fa-check valid-icon icon-right input-icon"></i>
                  <label class="control-label">{{'Unesite ime pacijenta'}}</label><i class="bar"></i>
                  <small v-show="errors.has('ime')" class="help text-danger">{{ errors.first('ime') }}</small>
                </div>
              </div>
              <div class="form-group with-icon-right" :class="{'has-error': errors.has('prezime'), 'valid': isFormFieldValid('prezime')}">
                <div class="input-group">
                  <input name="prezime" data-vv-as="Prezime" v-model="prezime" v-validate="'required'" required title=" " />
                  <i class="fa fa-exclamation-triangle error-icon icon-right input-icon"></i>
                  <i class="fa fa-check valid-icon icon-right input-icon"></i>
                  <label class="control-label">{{'Unesite prezime pacijenta'}}</label><i class="bar"></i>
                  <small v-show="errors.has('prezime')" class="help text-danger">{{ errors.first('prezime') }}</small>
                </div>
              </div>
              <vuestic-simple-select class="form-group with-icon-right" :class="{'has-error': errors.has('spol'), 'valid': isFormFieldValid('spol')}" label="Izaberite spol pacijenta" v-model="spol" v-validate="'required'" name="spol" required title=" " ref="spolSelect"
                v-bind:options="spolovi">
              </vuestic-simple-select>
              <vuestic-simple-select class="form-group with-icon-right" :class="{'has-error': errors.has('lokacija'), 'valid': isFormFieldValid('lokacija')}" label="Izaberite lokaciju" v-model="lokacija" v-validate="'required'" name="lokacija" required title=" " ref="lokacijaSelect"
                v-bind:options="lokacije">
              </vuestic-simple-select>
              <a v-if="prikazivise" @click.prevent="viseUnos()" href="#">{{'Unesite više detalja'}}</a>
              <a v-if="sakrij" @click="manje" href="#">{{'Sakrij detalje'}}</a>
              <vuestic-modal :show.sync="show" v-bind:large="true" ref="largeModal" :okText="potvrdi" :cancelText="odustani">
                <div slot="title">{{"VIŠE DETALJA"}}</div>
                <div>
                  <div class="form-group">
                    <div class="col-md-12 info-widget-inner">
                      <div class="col-md-12">
                        <div class="col-md-12">
                          <vuestic-simple-select class="form-group with-icon-right" label="Antikoagulantna terapija" v-model="anticoag" v-validate="'required'" name="anticoag" required title=" " ref="anticoagSelect" v-bind:options="anticoagi">
                          </vuestic-simple-select>
                          <vuestic-simple-select v-if="this.spol === 'ŽENSKI'" class="form-group with-icon-right" label="Drugo Stanje" v-model="drstanje" v-validate="'required'" name="drstanje" required title=" " ref="drstanjeSelect" v-bind:options="drstanja">
                          </vuestic-simple-select>
                          <vuestic-simple-select v-if="this.spol === 'ŽENSKI'" class="form-group with-icon-right" label="Menstrualni ciklus" v-model="menstc" v-validate="'required'" name="menstc" required title=" " ref="menstcSelect" v-bind:options="menstci">
                          </vuestic-simple-select>
                          <vuestic-simple-select v-if="this.spol === 'ŽENSKI'" class="form-group with-icon-right" label="Menopauza" v-model="menopauza" v-validate="'required'" name="menopauza" required title=" " ref="menopauzaSelect" v-bind:options="menopauze">
                          </vuestic-simple-select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </vuestic-modal>
            </div>
          </div>
          <!-- Korak 2 -->
          <div slot="page2" class="form-wizard-tab-content">
            <div class="col-md-3"></div>
            <div class="col-md-8">
              <vuestic-simple-select class="form-group with-icon-right" :class="{'has-error': errors.has('tip'), 'valid': isFormFieldValid('tip')}" label="Izaberite tip uzorka" v-model="tip" v-validate="'required'" name="tip" required title=" " ref="tip" v-bind:options="tipovi">
              </vuestic-simple-select>
  
              <div class="form-group with-icon-right" :class="{'has-error': errors.has('datum_uzimanja'), 'valid': isFormFieldValid('datum_uzimanja')}">
                <div class="input-group">
                  <input name="datum_uzimanja" data-vv-as="Datum uzimanja" v-model="datum_uzimanja" id="datum_uzimanja" v-validate="'required'" required title=" " />
                  <i class="fa fa-exclamation-triangle error-icon icon-right input-icon"></i>
                  <i class="fa fa-check valid-icon icon-right input-icon"></i>
                  <label class="control-label">{{"Datum uzimanja"}}</label><i class="bar"></i>
                  <small v-show="errors.has('datum_uzimanja')" class="help text-danger">{{ errors.first('datum_uzimanja') }}</small>
                </div>
              </div>
              <div class="form-group with-icon-right" :class="{'has-error': errors.has('vrijeme_uzimanja'), 'valid': isFormFieldValid('vrijeme_uzimanja')}">
                <div class="input-group">
                  <input name="vrijeme_uzimanja" data-vv-as="Vrijeme uzimanja" v-model="vrijeme_uzimanja" id="vrijeme_uzimanja" v-validate="'required'" required title=" " />
                  <i class="fa fa-exclamation-triangle error-icon icon-right input-icon"></i>
                  <i class="fa fa-check valid-icon icon-right input-icon"></i>
                  <label class="control-label">{{'Vrijeme uzimanja'}}</label><i class="bar"></i>
                  <small v-show="errors.has('vrijeme_uzimanja')" class="help text-danger">{{ errors.first('vrijeme_uzimanja') }}</small>
                </div>
              </div>
              <vuestic-simple-select class="form-group with-icon-right" :class="{'has-error': errors.has('prioritet'), 'valid': isFormFieldValid('prioritet')}" label="Izaberite prioritet" v-model="prioritet" required title=" " name="prioritet" ref="prioritet" v-validate="'required'"
                v-bind:options="prioriteti">
              </vuestic-simple-select>
              <vuestic-simple-select v-show="$store.state.site != '5bd40c16020d6d21bbaf610c'" class="form-group with-icon-right" :class="{'has-error': errors.has('doktor'), 'valid': isFormFieldValid('doktor')}" label="Izaberite doktora" v-model="doktor" name="doktor"
                required title=" " ref="doktor" v-validate="'required'" v-bind:options="doktori">
              </vuestic-simple-select>
              <a @click="komentarUnos()" href="#">{{'Unesite komentar'}}</a>
            </div>
            <vuestic-modal :show.sync="show" v-bind:large="true" ref="largeModalKomentar" :okText="potvrdi" :cancelText="odustani">
              <div slot="title">{{"KOMENTAR"}}</div>
              <div>
                <div class="form-group">
                  <div class="col-md-12 info-widget-inner">
                    <div class="col-md-12">
                      <div class="col-md-12">
                        <div class="input-group">
                          <textarea style="height:153px;" type="text" id="simple-textarea" v-model="komentar" required></textarea>
                          <label class="control-label" for="simple-textarea">{{'Unesite komentar'}}</label><i class="bar"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </vuestic-modal>
          </div>
          <div v-show="false" style="text-align:center;" v-for="index in Math.ceil(basSviTestovi.length/100) " class="table">
            <div @click="dodajTest($event)" :title="test.analit" v-for="test in (basSviTestovi.slice((index-1)*100,index*100))" :class="{'btn btn-primary btn-micro' : klasaTesta(test.analit, test.manual, test.calculated)[0] === 'Lab', 'btn btn-warning btn-micro' : klasaTesta(test.analit, test.manual, test.calculated)[0] === 'Calc', 'btn btn-secondary btn-micro' : klasaTesta(test.analit, test.manual, test.calculated)[0] === 'Man'}"
              align="middle" :id="test.labassay">
              {{test.ime_testa}}
            </div>
          </div>
          <!-- Korak 3 -->
          <div slot="page3" class="form-wizard-tab-content">
            <div style="text-align:center;" class="testoviDiv">
              <h4 v-bind:style="{ color: activeColorStyle}">{{placeholder}}</h4>
              <div v-for="test in testovi" :class="{'btn btn-primary btn-micro' : klasaTesta(test.analit, test.manual, test.calculated)[0] === 'Lab', 'btn btn-warning btn-micro' : klasaTesta(test.analit, test.manual, test.calculated)[0] === 'Calc', 'btn btn-secondary btn-micro' : klasaTesta(test.analit, test.manual, test.calculated)[0] === 'Man'}"
                @click="izbaciTest($event)" :name="test.labassay">
                {{test.ime_testa}}
              </div>&nbsp&nbsp<span @click="togglePrice()" style="color:#d9d9d9;" v-if="ukupnaCijena > 0 && showPrice"><strong> {{ ukupnaCijena}}<sup>BAM</sup> </strong></span>
              <hr>
            </div>
            <div class="row container">
              <vuestic-simple-select v-if="sveSekcije.length > 2 && !prikaziPanele" label="Izaberite sekciju testova" v-model="trenutnaSekcija" name="sekcija" :required="true" title=" " ref="sekcijaSelect" v-bind:options="sveSekcije">
              </vuestic-simple-select>
              <div v-if="sveSekcije.length < 3 && !prikaziPanele" class="form-group ">
                <div class="input-group">
                  <input disabled id="input-icon-left" title=" " required/>
                  <label class="control-label" for="sajt">{{sveSekcije[1]}}</label><i class="bar"></i>
                </div>
              </div>
            </div>
            <div>
              <div v-if="this.sviTestovi.length < 1 && !prikaziPanele" style="text-align:center;" class="table">
                <div>
                  {{'Nema dostupnih podataka.'}}
                </div>
              </div>
              <div v-show="prikaziTestove" style="text-align:center;" v-for="index in Math.ceil(sviTestovi.length/100) " class="table">
                <div v-show="showTest($store.state.site, test.analit, ukGodina, spol, drstanje, menopauza, test.manual, test.calculated)[2] && 
                  trenutnaSekcija === test.sekcija || 
                  showTest($store.state.site, test.analit, ukGodina, spol, drstanje, menopauza, test.manual, test.calculated)[2] && 
                  trenutnaSekcija === 'SVE SEKCIJE'" @click="dodajTest($event)" :title="test.analit" v-for="test in (sviTestovi.slice((index-1)*100,index*100))"
                  :class="{'btn btn-primary btn-micro' : klasaTesta(test.analit, test.manual, test.calculated)[0] === 'Lab', 'btn btn-warning btn-micro' : klasaTesta(test.analit, test.manual, test.calculated)[0] === 'Calc', 'btn btn-secondary btn-micro' : klasaTesta(test.analit, test.manual, test.calculated)[0] === 'Man'}"
                  align="middle" :id="test.labassay">
                  {{test.ime_testa}}
                </div>
              </div>
              <div v-show="prikaziPanele" style="text-align:center;">
                <h4 v-if="prikaziPanele && placeholderPaneli != ''" style=" color: #e34a4a">{{placeholderPaneli}}</h4>
                <div v-for="item in paneli" v-bind:id="item.sifra" :title="item.opis" @click="dodajPanel($event, item.sifra)" :class="{'btn btn-secondary btn-micro' : true}" align="middle" :id="item.sifra">
                  {{item.naziv}}
                </div>
              </div>
              <hr>
              <div style="text-align:center;">
                <a v-bind:style="{ color: activeColorStyle}" v-if="prikaziTestove" @click="prikPanele" href="#">{{'Paneli laboratorijskih analiza'}}</a>
                <a v-bind:style="{ color: activeColorStyle}" v-if="prikaziPanele" @click="prikTestove" href="#">{{'Laboratorijske analize'}}</a> <span>{{'|'}}</span>
                <a v-bind:style="{ color: activeColorStyle}" @click="prikaziDetalje()" href="#">{{'Detalji'}}</a></div>
            </div>
            <vuestic-modal :show.sync="show" v-bind:large="true" ref="largeModalDetalji" :okText="potvrdi" :cancelText="odustani">
              <div slot="title">{{"DETALJI"}}</div>
              <div>
                <div class="form-group">
                  <div class="col-md-12 info-widget-inner">
                    <div class="col-md-12">
                      <div class="col-md-12">
                        <vuestic-simple-select class="form-group with-icon-right" label="Antikoagulantna terapija" v-model="anticoag" v-validate="'required'" name="anticoag" required title=" " ref="anticoagSelect" v-bind:options="anticoagi">
                        </vuestic-simple-select>
                        <vuestic-simple-select v-if="this.spol === 'ŽENSKI'" class="form-group with-icon-right" label="Drugo Stanje" v-model="drstanje" v-validate="'required'" name="drstanje" required title=" " ref="drstanjeSelect" v-bind:options="drstanja">
                        </vuestic-simple-select>
                        <vuestic-simple-select v-if="this.spol === 'ŽENSKI'" class="form-group with-icon-right" label="Menstrualni ciklus" v-model="menstc" v-validate="'required'" name="menstc" required title=" " ref="menstcSelect" v-bind:options="menstci">
                        </vuestic-simple-select>
                        <vuestic-simple-select v-if="this.spol === 'ŽENSKI'" class="form-group with-icon-right" label="Menopauza" v-model="menopauza" v-validate="'required'" name="menopauza" required title=" " ref="menopauzaSelect" v-bind:options="menopauze">
                        </vuestic-simple-select>
                        <a v-if="komentar.trim() != ''" :title="komentar" href="#">{{'Komentar je unesen'}}</a>
                        <a style='color: #f7cc36' v-if="komentar.trim() === ''" href="#">{{'Komentar nije unesen'}}</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </vuestic-modal>
          </div>
          <!-- Korak 4 -->
          <div slot="page4" class="form-wizard-tab-content">
            <h4 style="color: #4ab2e3;">{{'Printanje barkoda'}}</h4>
            <barcode id="barcode" v-if="bar" v-bind:value="id" :options="{ displayValue: true , width: 1.25, fontSize: 20, textPosition: 'bottom',}"></barcode>
            <button class="btn btn-info" @click="printajBarcode()"><span class="glyphicon glyphicon-print"></span>{{ ' Print'}}&nbsp</button>
          </div>
        </vuestic-wizard>
      </vuestic-widget>
    </div>
  </div>
</template>
 
<script>
  import axios from 'axios'
  import {http} from '../../../config/config.js'
  import {bus} from '../../main'
  import VueBarcode from '@xkeshi/vue-barcode'
  import {sampleSelection} from '../funkcije/shared/samples.js'
  import {parseDate} from '../funkcije/shared/flatpickr.js'
  import {parseTime} from '../funkcije/shared/flatpickr.js'
  import flatPickr from 'vue-flatpickr-component' // https://flatpickr.js.org/
  import 'flatpickr/dist/flatpickr.css' // import 'flatpickr/dist/themes/material_orange.css'
  
  export default {
    name: 'form-wizard',
  
    mounted() {
      if (this.$route.query.jmbg != undefined) {
        this.jmbg = this.$route.query.jmbg
      }
  
      http.get('/uzorci/lokacije/list?token=' + this.$store.state.token + '&site=' + this.$store.state.site, {}) // Korak 1 - Izaberite lokaciju
        .then(res => {
          if (res.data.success === false) {
            this.lokacije = []
            this.lokacije.push('GREŠKA - DB Connection')
          } else {
            if (res.data.lokacije.length != 0) {
              this.locations = res.data.lokacije
              this.lokacije = []
              res.data.lokacije.forEach(element => {
                this.lokacije.push(element.lokacija)
              })
            } else {
              this.lokacije = []
              this.lokacije.push('NEMA PODATAKA')
            }
          }
        })
      http.get('postavke/list?token=' + this.$store.state.token + '&site=' + this.$store.state.site, {}) // Korak 2 - Izaberite tip uzorka
        .then(res => {
          if (res.data.success === false) {
            this.tipovi = []
            this.tipovi.push('GREŠKA - DB Connection')
          } else {
            if (res.data.data.tipUzorka != 0) {
              this.tipovi = []
              res.data.data.tipUzorka.forEach(element => {
                this.tipovi.push(element.tip)
              });
            } else {
              this.tipovi = []
              this.tipovi.push('NEMA PODATAKA')
            }
          }
        })
      http.get('postavke/doktor/list?token=' + this.$store.state.token + '&site=' + this.$store.state.site, {}) // Korak 2 - Izaberite doktora
        .then(res => {
          if (res.data.success === false) {
            this.doktori = []
            this.doktori.push('GREŠKA - DB Connection')
          } else {
            if (res.data.doktor != 0) {
  
              if (this.$store.state.site === '5bd40c16020d6d21bbaf610c') {
                this.doktori = []
                this.doctors = res.data.doktor
                res.data.doktor.forEach(element => {
                  this.doktori.push(element.doktorIme + ' ' + element.doktorPrezime)
                })
                this.doktor = 'John Doe'
                this.doctor = this.doktor
  
              } else {
                this.doktori = []
                this.doctors = res.data.doktor
                res.data.doktor.forEach(element => {
                  this.doktori.push(element.doktorIme + ' ' + element.doktorPrezime)
                })
              }
  
            } else {
              this.doktori = []
              this.doktori.push('NEMA PODATAKA')
            }
          }
        })
      http.get('postavke/sekcija/list?token=' + this.$store.state.token + '&site=' + this.$store.state.site, {}) // Sve sekcije iz DB
        .then(res => {
          if (res.data.success === false) {
            this.sekcije = []
            this.sekcije.push('GREŠKA - DB Connection')
          } else {
            if (res.data.sekcija != undefined) {
              this.sekcije = []
              res.data.sekcija.forEach(element => {
                this.sekcije.push(element.sekcija)
              });
            } else {
              this.sekcije = []
              this.sekcije.push('NEMA PODATAKA')
            }
          }
        })
  
      http.get('/postavke/paneli/list?token=' + this.$store.state.token + '&site=' + this.$store.state.site, {}) // Svi paneli iz DB
        .then(res => {
          if (res.data.paneli != undefined) {
            this.sviPaneli = res.data.paneli
          } else {
            this.sviPaneli = []
          }
        })
  
      bus.$on('viseNo', () => {
        // this.anticoag = ""
        // this.drstanje = ""
        // this.menstc = ""
        // this.menopauza = ""
      })
      bus.$on('viseKo', () => {
        // this.komentar = ""
      })
    },
    components: {
      'barcode': VueBarcode,
      flatPickr: flatPickr
    },
    props: ['value'],
    computed: {
      hrSteps() {
        return [{
            label: "Korak 1. Pacijent",
            slot: 'page1',
            onNext: () => {
              this.validateFormField('ime')
              this.validateFormField('prezime')
              this.validateFormField('jmbg')
              this.validateFormField('lokacija')
              this.validateFormField('spol')
            },
            isValid: () => {
              return (this.isFormFieldValid('ime') && this.isFormFieldValid('prezime') && this.isFormFieldValid('jmbg') && this.isFormFieldValid('lokacija') && this.isFormFieldValid('spol') && this.mojaValidacija1(this.lokacija) && this.mojaValidacija1a(this.lokacija))
            }
          },
          {
            label: "Korak 2. Uzorak",
            slot: 'page2',
            onNext: () => {
              if (this.$store.state.site === '5bd40c16020d6d21bbaf610c') {
                this.doktor = 'John Doe'
                this.doctor = this.doktor
              }
              this.validateFormField('tip')
              this.validateFormField('datum_uzimanja')
              this.validateFormField('vrijeme_uzimanja')
              this.validateFormField('doktor')
              this.validateFormField('prioritet')
            },
            isValid: () => {
              return (this.validateDate(this.datum_uzimanja) && this.validateTime(this.vrijeme_uzimanja) && this.isFormFieldValid('datum_uzimanja') && this.isFormFieldValid('tip') && this.isFormFieldValid('vrijeme_uzimanja') && this.isFormFieldValid('doktor') && this.mojaValidacija2(this.tip, this.doktor) && this.mojaValidacija2a(this.tip, this.doktor))
            }
          },
          {
            label: "Korak 3. Testovi",
            slot: 'page3',
            onNext: () => {
              var str = ''
              var tmp = ''
              this.jmbgDan = this.jmbg.slice(0, 2)
              this.jmbgMjesec = this.jmbg.slice(2, 4)
              this.jmbgGodina = this.jmbg.slice(4, 7)
              if (this.jmbgGodina[0] === '9') {
                str = '1'
                tmp = this.jmbgGodina
                this.jmbgGodina = str.concat(tmp)
              } else if (this.jmbgGodina[0] === '0') {
                str = '2'
                tmp = this.jmbgGodina
                this.jmbgGodina = str.concat(tmp)
              } else {
  
              }
              var date = this.jmbgGodina + '-' + this.jmbgMjesec + '-' + this.jmbgDan
              this.jmbgObj = this.dateDiff(date)
  
              if (!(this.testovi.length === 0)) {
                if (this.drstanje === "") {
                  this.drstanje = "NE"
                }
  
                if (this.menstc === "") {
                  this.menstc = "NE"
                }
                if (this.menopauza === "") {
                  this.menopauza = "NE"
                }
                if (this.anticoag === "") {
                  this.anticoag = "NE"
                }
  
                http.post('uzorci/save', {
                    jmbg: this.jmbg,
                    ime: this.ime.toUpperCase().trim(),
                    prezime: this.prezime.toUpperCase().trim(),
                    spol: this.spol,
                    lokacija: this.location,
                    type: this.tip,
                    datum: this.datum_uzimanja,
                    doktor: this.doctor,
                    vrijeme: this.vrijeme_uzimanja,
                    sekcija: this.sekcija,
                    trudnica: this.drstanje,
                    menstc: this.menstc,
                    anticoag: this.anticoag,
                    menopauza: this.menopauza,
                    testovi: this.testovi,
                    user: this.$store.state.userId,
                    token: this.$store.state.token,
                    jmbgObj: this.jmbgObj,
                    site: this.$store.state.site,
                    siteSifra: this.sajtSifra,
                    prioritet: this.prioritet,
                    komentar: this.komentar
                  })
                  .then(res => {
                    this.id = res.data.data.uzorak.id
                    this.bar = true
                    this.barcodeUrl = res.data.data.link
                    this.testovi = []
                    this.placeholder = 'Izaberite testove'
                    if (this.drstanje === 'NE') {
                      this.drstanje = ''
                    }
                    if (this.menstc === 'NE') {
                      this.menstc = ''
                    }
                    if (this.anticoag === 'NE') {
                      this.anticoag = ''
                    }
                    if (this.menopauza === 'NE') {
                      this.menopauza = ''
                    }
                    if (this.prioritet === 'HITAN') {
                      this.prioritet = 'NORMALAN'
                    }
                    this.komentar = ''
                    this.tip = ''
                  })
              }
            },
            isValid: () => {
              if (this.testovi.length <= 0) {
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
                return false
              } else {
                return true
              }
            }
          },
          {
            label: "Korak 4. Barkod",
            slot: 'page4',
            isValid: () => {
              return (this.isFormFieldValid('uzorakid'))
            }
          }
        ]
      }
    },
    data() {
      return {
        ime: '',
        prezime: '',
        jmbg: '',
        spol: '',
        lokacija: '',
        drstanje: '',
        menstc: '',
        anticoag: '', // Antikoagulantna terapija
        menopauza: '',
        menstci: ['Folikularana faza', 'Ovulaciona faza', 'Lutealna faza'],
        anticoagi: ['Standardna terapija', 'Intenzivna terapija'],
        menopauze: ['Premenopauza', 'Menopauza', 'Postmenopauza'],
        drstanja: ['Prvo tromjesečje', 'Drugo tromjesečje', 'Treće tromjesečje'],
        lokacije: [],
        location: '',
        locations: [],
        tip: '',
        tipovi: [],
        datum_uzimanja: '',
        vrijeme_uzimanja: '',
        prioritet: '',
        prioriteti: ['NORMALAN', 'HITAN'],
        sekcija: '',
        doktor: '',
        doktori: [],
        doctor: '',
        doctors: [],
        test: '',
        sviTestovi: [],
        basSviTestovi: [],
        testovi: [],
        panelRejected: [],
        clicked: '',
        hrCountry: '',
        email: '',
        token: '',
        spolovi: ['MUŠKI', 'ŽENSKI'],
        id: '',
        bar: false,
        show: true,
        barcodeUrl: '',
        placeholder: 'Izaberite testove',
        placeholderPaneli: '',
        text: '',
        desc: '',
        activeColorStyle: '#4ab2e3',
        jmbgDan: '',
        jmbgMjesec: '',
        jmbgGodina: '',
        jmbgObj: {},
        prikazivise: true,
        sakrij: false,
        detalji: false,
        jmbgObj: {},
        jmbgDan: '',
        jmbgMjesec: '',
        jmbgGodina: '',
        ukGodina: '',
        prikaziPanele: false,
        prikaziTestove: true,
        sviPaneli: [],
        izbaceniPanel: [],
        tmpPanel: [],
        ubaceniPanel: [],
        paneli: [],
        sajtSifra: '',
        komentar: '',
        prikazikomentar: true,
        sakrijkomentar: false,
        potvrdi: "POTVRDI",
        odustani: "ODUSTANI",
        sveSekcije: [],
        trenutnaSekcija: 'SVE SEKCIJE',
        sviTestoviZaSekc: [],
        ukupnaCijena: 0,
        toastText: '',
        toastIcon: '',
        toastPosition: '',
        toastDuration: 2500,
        isToastFullWidth: false,
        className: '',
        showPrice: true,
        date: null,
        datepicker: {
          simple: ''
        },
        config: {
          locale: {
            firstDayOfWeek: 1,
            weekdays: {
              shorthand: ['Ne', 'Po', 'Ut', 'Sr', 'Če', 'Pe', 'Su'],
              longhand: ['Nedjelja', 'Ponedjeljak', 'Utorak', 'Srijeda', 'Četvrtak', 'Petak', 'Subota'],
            },
            months: {
              shorthand: ['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'],
              longhand: ['Januar‎', 'Februar‎', 'Mart‎', 'April‎', 'Maj‎', 'Juni‎', 'Juli‎', 'August‎', 'Septembar‎', 'Oktobar‎', 'Novembar‎', 'Decembar‎'],
            },
          },
        },
      }
    },
    watch: {
      testovi: function() {
        this.showPrice = true
        this.ukupnaCijena = 0
        this.testovi.forEach(element => {
          if (!element.calculated) {
            this.ukupnaCijena = this.ukupnaCijena + (+element.cijena)
          }
        })
  
      },
      lokacija: function() {
        this.locations.forEach(element => {
          if (element.lokacija === this.lokacija) {
            this.location = element._id
          }
        });
      },
      doktor: function() {
        this.doctor = this.doktor
        http.post('/postavke/sajtovi/' + this.$store.state.site, {
            token: this.$store.state.token
          })
          .then(res => {
            this.sajtSifra = res.data.sajt.sifra
          })
      },
      spol: function() {
        this.drstanje = ""
        this.menstc = ""
        this.menopauza = ""
        this.anticoag = ""
        this.detalji = false
        this.prikazivise = true
        this.sekcija = ""
      },
      menopauza: function() {
        this.sekcija = ""
      },
      drstanje: function() {
        this.sekcija = ""
      },
      jmbg: function() {
        this.sekcija = ''
        http.post('/uzorci/patient', {
            jmbg: this.jmbg,
            token: this.$store.state.token,
            site: this.$store.state.site
          })
          .then(res => {
            if (res.data.success) {
              this.ime = res.data.pacijent.ime
              this.prezime = res.data.pacijent.prezime
              this.spol = res.data.pacijent.spol
            } else {
              this.ime = ''
              this.prezime = ''
              this.spol = ''
            }
          })
  
        var str = ''
        var tmp = ''
        this.jmbgDan = this.jmbg.slice(0, 2)
        this.jmbgMjesec = this.jmbg.slice(2, 4)
        this.jmbgGodina = this.jmbg.slice(4, 7)
        if (this.jmbgGodina[0] === '9') {
          str = '1'
          tmp = this.jmbgGodina
          this.jmbgGodina = str.concat(tmp)
        } else if (this.jmbgGodina[0] === '0') {
          str = '2'
          tmp = this.jmbgGodina
          this.jmbgGodina = str.concat(tmp)
        } else {
  
        }
        var date = this.jmbgGodina + '-' + this.jmbgMjesec + '-' + this.jmbgDan
        this.jmbgObj = this.dateDiff(date)
        this.ukGodina = this.jmbgObj.years + 1
      },
      tip: function() {
        this.prioritet = 'NORMALAN'
        var d = new Date()
        this.sveSekcije = []
        this.sveSekcije.push('SVE SEKCIJE')
  
        var mjesec = d.getMonth() + 1
        if (mjesec < 10) {
          mjesec = '0' + mjesec
        }
  
        var dan = d.getUTCDate()
        if (dan < 10) {
          dan = '0' + dan
        }
        var godina = d.getFullYear()
        this.datum_uzimanja = dan + '/' + mjesec + '/' + godina
        document.getElementById('datum_uzimanja').value = this.datum_uzimanja
  
        var min = d.getMinutes()
        if (min < 10) {
          min = '0' + min
        }
  
        var sat = d.getHours()
        if (sat < 10) {
          sat = '0' + sat
        }
        this.vrijeme_uzimanja = sat + ':' + min
  
        document.getElementById('vrijeme_uzimanja').value = this.vrijeme_uzimanja
  
        http.post('/uzorci/sekcije/list', { // Dohvati testove, na promjenu tipa
            tip: this.tip,
            token: this.$store.state.token,
            site: this.$store.state.site
          })
          .then(res => {
            this.testovi = []
            this.paneli = []
            this.placeholder = 'Izaberite testove'
            if (res.data.success === false) {
              this.sviTestovi = []
              this.sviTestoviZaSekc = []
            } else {
              this.sviTestovi = []
              this.sviTestoviZaSekc = []
              
              res.data.testovi.forEach(element => {
               
                    // console.log(element.naziv)
                
                this.basSviTestovi.push({
                  labassay: element._id,
                  ime_testa: element.naziv,
                  cijena: element.price,
                  analit: element.analit,
                  sekcija: element.sekcija,
                  manual: element.manual,
                  calculated: element.calculated,
                  calculatedTests: element.calculatedTests
                })
                
                if (this.$store.state.site === element.site) {
                  if (!this.sveSekcije.filter(test => test === element.sekcija).length > 0) {                      
                    this.sveSekcije.push(element.sekcija)
                  }
                }
  
                if (sampleSelection(this.$store.state.site, element.analit, this.ukGodina, this.spol, this.drstanje, this.menopauza)[1]) {
                  this.sviTestoviZaSekc.push({ // Korak 3 - Testovi u izborniku
                    labassay: element._id,
                    ime_testa: element.naziv,
                    cijena: element.price,
                    analit: element.analit,
                    sekcija: element.sekcija,
                    manual: element.manual,
                    calculated: element.calculated,
                    calculatedTests: element.calculatedTests
                  })
  
                  this.sviTestovi.push({ // Korak 3 - Testovi u izborniku
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
          }).then(res => {
            this.sviPaneli.forEach(element => {
              this.paneli.push(element)
            })
            if (this.paneli.length < 1) {
              this.placeholderPaneli = 'Nema definisanih panela'
              this.prikaziPanele = false
              this.prikaziTestove = true
            } else {
              this.placeholderPaneli = ''
            }
          })
      }
    },
    beforeDestroy() {
      bus.$off('viseNo')
      bus.$off('viseKo')
    },
    methods: {
      doSomethingOnChange(input) {
        // console.log('input', input)
      },
      togglePrice() {
        this.showPrice = false
      },
      dateDiff(date) { // Takes one string parameter -- date in YYYY-MM-DD 
        date = date.split('-');
        var today = new Date();
        var year = today.getFullYear();
        var month = today.getMonth() + 1;
        var day = today.getDate();
        var yy = parseInt(date[0]);
        var mm = parseInt(date[1]);
        var dd = parseInt(date[2]);
        var years, months, days;
  
        months = month - mm;
        if (day < dd) {
          months = months - 1;
        }
        years = year - yy;
        if (month * 100 + day < mm * 100 + dd) {
          years = years - 1;
          months = months + 12;
        }
        days = Math.floor((today.getTime() - (new Date(yy + years, mm + months - 1, dd)).getTime()) / (24 * 60 * 60 * 1000));
  
        return {
          years: years,
          months: months,
          days: days
        }
      },
      prikPanele() {
        this.prikaziPanele = true
        this.prikaziTestove = false
        this.trenutnaSekcija = this.sveSekcije[0]
      },
      prikTestove() {
        this.prikaziPanele = false
        this.prikaziTestove = true
      },
      mojaValidacija1(data) {
        if (data === 'NEMA PODATAKA') {
          this.toastText = 'Lokacije nisu definisane!'
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
          return false
        } else {
          return true
        }
      },
      mojaValidacija1a(data) {
        if (data === 'GREŠKA - DB Connection') {
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
          return false
        } else {
          return true
        }
      },
      mojaValidacija2(data1, data2, data3) {
        if ((data1 === 'NEMA PODATAKA') || (data2[0] === 'NEMA PODATAKA') || (data3 === 'NEMA PODATAKA')) {
          this.toastText = 'Sva potrebna polja nisu definisana!'
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
          return false
        } else {
          return true
        }
      },
      mojaValidacija2a(data1, data2, data3) {
        if ((data1 === 'GREŠKA - DB Connection') || (data2 === 'GREŠKA - DB Connection') || (data3 === 'GREŠKA - DB Connection')) {
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
          return false
        } else {
          return true
        }
      },
      mojaValidacija3(data1, data2, data3) {
        if ((data1.trim() === '') || (data2.length === 0) || (data3.trim() === '')) {
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
          return false
        } else {
          return true
        }
      },
      isFormFieldValid(field) {
        let isValid = false
        if (this.formFields[field]) {
          isValid = this.formFields[field].validated && this.formFields[field].valid
        }
        return isValid
      },
      validateFormField(fieldName) {
        this.$validator.validate(fieldName, this[fieldName])
      },
      vise() {
        this.detalji = true
        this.prikazivise = false
  
      },
      viseUnos() {
        this.$refs.largeModal.open()
      },
      komentarUnos() {
        this.$refs.largeModalKomentar.open()
      },
      prikaziDetalje() {
        this.$refs.largeModalDetalji.open()
      },
      // Korak 3 - DODAVANJE TESTOVA  
      dodajTest(event) {
  
        if (this.testovi.length < 1) {
          this.placeholder = ''
        }
        var manual = false
        var calculated = false
        var kalkuliraniTestovi = []
        var sekc = ''
        var anlit = ''
        var cost = ''
  
        if (!this.testovi.filter(test => test.labassay === event.target.id).length > 0) { // Izvrši samo ako test već nije dodan          
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
                document.getElementById(kalk.labassay).className = 'btn btn-info btn-micro'
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
          document.getElementById(event.target.id).className = 'btn btn-info btn-micro'
        }
      },
      dodajPanel(event, sifra) {
        this.paneli.forEach(element => {
          if (element.sifra === sifra) {
            this.tmpPanel = []
            this.ubaceniPanel = []
            this.izbaceniPanel = []
            element.testovi.forEach(ptest => { // svi testovi unutar panela
              this.tmpPanel.push(ptest)
              this.sviTestovi.forEach(alltest => { // filtracija po izabranom tipu
                if (alltest.labassay === ptest.labassay) {
                  this.ubaceniPanel.push(ptest)
                  var manual = false
                  var calculated = false
                  var kalkuliraniTestovi = []
                  var sekc = ''
                  var anlit = ''
  
                  if (!this.testovi.filter(test => test.labassay === ptest.labassay).length > 0) {
                    this.sviTestovi.forEach(element => {
                      if ((event.target.id === element.labassay)) {
                        sekc = element.sekcija
                        anlit = element.analit
                      }
                      if (element.manual && (ptest.labassay === element.labassay)) {
                        manual = true
                      }
                      if (element.calculated && (ptest.labassay === element.labassay)) {
                        calculated = true
                        element.calculatedTests.forEach(kalk => {
                          if (!this.testovi.filter(test => test.labassay === kalk.labassay).length > 0) {
                            kalk.sekcija = element.sekcija
                            kalk.calculated = false
                            kalk.calculatedTests = []
                            this.testovi.push(kalk)
                            kalkuliraniTestovi.push(kalk)
                            document.getElementById(kalk.labassay).className = 'btn btn-info btn-micro'
                          }
                        })
                      }
                    });
                    this.testovi.push(ptest)
                    document.getElementById(ptest.labassay).className = 'btn btn-info btn-micro'
                  } else {
  
                  }
                }
              })
            })
          }
        })
        if (this.testovi.length > 0) {
          this.placeholder = ''
        }
  
        this.tmpPanel.forEach(tmp => {
          var uslov = true
          var i = 0
          this.ubaceniPanel.forEach(ubaceni => {
            i++
            if (tmp.labassay === ubaceni.labassay) {
              uslov = false
            }
          });
          if (uslov && i === this.ubaceniPanel.length) {
            if (!this.izbaceniPanel.filter(test => test === tmp.ime_testa).length > 0) {
              this.izbaceniPanel.push(tmp.ime_testa)
            }
          }
        })
        if (this.izbaceniPanel.length > 0) {
          this.toastText = 'Neki testovi nisu dozvoljeni!'
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
        // console.log(this.izbaceniPanel)
      },
      // End of DODAVANJE TESTOVA
  
      // UKLANJANJE TESTA IZ NIZA 
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
      // End of UKLANJANJE TESTA IZ NIZA 
  
      printajBarcode() {
        
      http.get('uzorci/barcode/' + this.id + '?token=' + this.$store.state.token + '&site=' + this.$store.state.site, {
  
        }).then(res => {

          printEPL(this.ime + ' ' + this.prezime, this.id, res.data.pacijentRBr, res.data.godiste,res.data.datum,this.barcodeUrl,res.data.code,this.$store.state.site)
  
        })
      },
      refreshWizard() {
  
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
      validateTime: function(time) {
        if (/^[0-2][0-9]:\d{2}$/.test(time)) {
          return (true)
        }
        this.toastText = 'Vrijeme nije validno!'
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
      },
      klasaTesta: function(naziv, manual, calculated) {
        return sampleSelection(this.$store.state.site, naziv, '', '', '', '', manual, calculated)
      },      
      showTest: function(site, analit, godina, spol, drstanje, menopauza , manual, calculated) {
        return sampleSelection(site, analit, godina, spol, drstanje, menopauza , manual, calculated)
      }
    }
  }
</script>

<style lang="scss">
  @import "../../sass/_variables.scss";
  @import '../../sass/toasts';
  @import "../../../node_modules/bootstrap/scss/functions";
  @import "../../../node_modules/bootstrap/scss/variables";
  @import "../../../node_modules/bootstrap/scss/mixins/breakpoints";
  .widget.simple-vertical-wizard-widget {
    .widget-body {
      padding: 0 $widget-padding;
      @include media-breakpoint-down(sm) {
        padding: $widget-padding 0;
      }
    }
  }
  
  .form-wizard-page {
    .form-group {
      min-width: 200px;
      max-width: 360px;
      width: 80%;
    }
  }
  
  .testoviDiv {
    margin: 0 auto;
  }
  
  .square {
    text-align: left;
    display: inline-block;
  }
  
  .container {
    text-align: center;
    display: inline-block;
  }
</style>

