<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <vuestic-widget v-show="ruler" :headerText="hid">
          <div class="col-md-12">
            <div style="text-align:center;" class="testoviDiv">
              <h4 v-if="placeholder != ''" v-bind:style="{ color: activeColorStyle}">{{placeholder}}&nbsp</h4>
              <div v-if="placeholder === ''" v-for="test in testovi" :class="{
                'btn btn-primary btn-micro' : ((!test.disable || test.disable === undefined) && klasaTesta(test.analit, test.manual, test.calculated)[0] === 'Lab'), 
                'btn btn-warning btn-micro' : ((!test.disable || test.disable === undefined) && klasaTesta(test.analit, test.manual, test.calculated)[0] === 'Calc'), 
                'btn btn-secondary btn-micro' : ((!test.disable || test.disable === undefined) && klasaTesta(test.analit, test.manual, test.calculated)[0] === 'Man'),
                'disabled btn btn-primary btn-micro' : ((test.disable) && klasaTesta(test.analit, test.manual, test.calculated)[0] === 'Lab'), 
                'disabled btn btn-warning btn-micro' : ((test.disable ) && klasaTesta(test.analit, test.manual, test.calculated)[0] === 'Calc'), 
                'disabled btn btn-secondary btn-micro' : ((test.disable) && klasaTesta(test.analit, test.manual, test.calculated)[0] === 'Man')}" @click="izbaciTest($event, test.disable)" :name="test.labassay">
                {{test.ime_testa }}
              </div>&nbsp&nbsp<span @click="togglePrice()" style="color:#d9d9d9;" v-if="ukupnaCijena > 0 && showPrice"><strong> {{ ukupnaCijena}}<sup>BAM</sup> </strong></span>
              <hr>
            </div>
            <div>
              <div style="text-align:center;" v-for="index in Math.ceil(sviTestovi.length/100) " class="table">
                <div v-show="showTest($store.state.site, test.analit, ukGodina, spol, drstanje, menopauza, test.manual, test.calculated)[2]" @click="dodajTest($event, test)" :title="test.analit" v-for="test in (sviTestovi.slice((index-1)*100,index*100))" :class="{'btn btn-primary btn-micro' : klasaTesta(test.analit, test.manual, test.calculated)[0] === 'Lab', 'btn btn-warning btn-micro' : klasaTesta(test.analit, test.manual, test.calculated)[0] === 'Calc', 'btn btn-secondary btn-micro' : klasaTesta(test.analit, test.manual, test.calculated)[0] === 'Man'}"
                  align="middle" :id="test.labassay">
                  {{test.ime_testa}}
                </div>
              </div>
              <hr>
            </div>
            <div v-show="false">
              <div style="text-align:center;" v-for="index in Math.ceil(basSviTestovi.length/100) " class="table">
                <div @click="dodajTest($event, test)" :title="test.analit" v-for="test in (basSviTestovi.slice((index-1)*100,index*100))" :class="{'btn btn-primary btn-micro' : klasaTesta(test.analit, test.manual, test.calculated)[0] === 'Lab', 'btn btn-warning btn-micro' : klasaTesta(test.analit, test.manual, test.calculated)[0] === 'Calc', 'btn btn-secondary btn-micro' : klasaTesta(test.analit, test.manual, test.calculated)[0] === 'Man'}"
                  align="middle" :id="test.labassay">
                  {{test.ime_testa}}
                </div>
              </div>
              <hr>
            </div>
          </div>
          <div class="row">
            <div class="col-md-3"></div>
            <div class="col-md-6">
              <div class="wizard-body-actions">
                <div class="btn-container">
                  <div>
                    <button class="btn btn-secondary wizard-back pull-left" @click.prevent="vratiPregled"><span class="fa fa-backward"></span>{{ ' POVRATAK'}}</button>
                  </div>
                </div>
                <div class="btn-container">
                  <button align=center class="btn btn-primary wizard-next pull-right" @click.prevent="sacuvajIzmjene"><span class="fa fa-save"></span>{{ ' SAČUVAJ'}}</button>
                </div>
              </div>
            </div>
          </div>
        </vuestic-widget>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import BadgeColumn from './BadgeColumn.vue'
  import axios from 'axios'
  import router from '../../router'
  import {http} from '../../../config/config.js'
  import {server} from '../../../config/config.js'
  import {sampleSelection} from '../funkcije/shared/samples.js'
  
  Vue.component('badge-column', BadgeColumn)
  
  export default {
    name: 'Table',
    props: ['id'],
  
    data() {
      return {
        hid: '',
        activeColorStyle: '#4ab2e3',
        placeholder: 'Izaberite testove',
        brojTestova: '',
        brojTestovaInit: '',
        ruler: false,
        ime: '',
        prezime: '',
        jmbg: '',
        spol: '',
        lokacija: '',
        drstanje: '',
        menstc: '',
        anticoag: '',
        menopauza: '',
        jmbgObj: {},
        jmbgDan: '',
        jmbgMjesec: '',
        jmbgGodina: '',
        ukGodina: '',
        ukupnaCijena: 0,
        showPrice: true,
        tip: '',
        sekcija: [],
        izabraniTestovi: [], // Testovi koji su na uzorku - mounted()
        sviTestovi: [], // Testovi koji će biti prikazani u izborniku
        basSviTestovi: [],
        testovi: [],
        testoviPrivremeni: [],
        uslovRemove: false,
        toastText: '',
        toastIcon: '',
        toastPosition: '',
        toastDuration: 2500,
        isToastFullWidth: false,
        className: ''
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
  
        if (this.testovi.length < 1) {
          router.push('/uzorci/pregled/' + '?sekcija=' + this.$route.params.sekcija)
        }
      }
    },
  
    mounted() {
      this.hid = 'Uzorak: ' + this.$route.params.id
  
      http.get('uzorci/show/' + this.$route.params.id + '?token=' + this.$store.state.token + '&site=' + this.$store.state.site, {})
        .then(res => {
          this.ime = res.data.uzorak.patient.ime
          this.prezime = res.data.uzorak.patient.prezime
          this.jmbg = res.data.uzorak.patient.jmbg
          this.spol = res.data.uzorak.patient.spol
          this.lokacija = res.data.uzorak.lokacija.lokacija
          this.drstanje = res.data.uzorak.trudnica
          this.menstc = res.data.uzorak.menstc
          this.anticoag = res.data.uzorak.anticoag
          this.menopauza = res.data.uzorak.menopauza
          this.tip = res.data.uzorak.type
          this.sekcija = res.data.uzorak.sekcija
          this.izabraniTestovi = res.data.uzorak.tests
          this.ukupnaStarost()
  
          http.post('/uzorci/sekcije/list', {
              sekcija: this.sekcija,
              token: this.$store.state.token,
              tip: this.tip,
              site: this.$store.state.site
            })
            .then(res => {
              // console.log(res.data)
              // Testovi za odabrani uzorak
              if (res.data.success === false) {
                this.sviTestovi = []
              } else {
                this.sviTestovi = []
                res.data.testovi.forEach(element => {
                  this.basSviTestovi.push({ // Testovi koji će biti prikazani u izborniku - filtrirani                    
                    labassay: element._id,
                    ime_testa: element.naziv,
                    cijena: element.price,
                    analit: element.analit,
                    sekcija: element.sekcija,
                    manual: element.manual,
                    calculated: element.calculated,
                    calculatedTests: element.calculatedTests
                  })
  
                  if (sampleSelection(this.$store.state.site, element.analit, this.ukGodina, this.spol, this.drstanje, this.menopauza)[1]) {
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
            }).then(res => {
              this.sviTestovi.forEach(element => {
                this.izabraniTestovi.forEach(izabrani => {  
                  if ((izabrani.labassay._id === element.labassay)) {  
                    this.dodajTestInit(element.labassay, element.ime_testa, izabrani.labassay.manual, izabrani.status_t)  
                  }
                })
              })  
            }).then(res => {
              this.ruler = true  
            })
        })
    },
    methods: {
      togglePrice() {
        this.showPrice = false
      },
      removeDuplicates(originalArray, prop) {
        var newArray = [];
        var lookupObject = {};
  
        for (var i in originalArray) {
          lookupObject[originalArray[i][prop]] = originalArray[i];
        }
  
        for (i in lookupObject) {
          newArray.push(lookupObject[i]);
        }
        return newArray;
      },
      vratiPregled: function() {
        router.push('/uzorci/pregled/' + '?sekcija=' + this.$route.params.sekcija)
      },
      sacuvajIzmjene: function() {
        http.post('/uzorci/update', {
            sid: this.$route.params.id,
            jmbg: this.jmbg,
            testovi: this.testovi,
            token: this.$store.state.token,
            site: this.$store.state.site,
            spol: this.spol,
            trudnica: this.drstanje,
            menstc: this.menstc,
            anticoag: this.anticoag,
            menopauza: this.menopauza,
            jmbgObj: this.jmbgObj
          })
          .then(res => {
            if (res.data.success === true) {
              this.toastText = 'Uzorak uspješno izmijenjen!'
              this.toastIcon = 'fa-check'
              this.toastPosition = 'top-right'
              this.className = 'vuestic-toast-primary'
              router.push('/uzorci/pregled/' + '?sekcija=' + this.$route.params.sekcija)
              this.showToast(this.toastText, {
                icon: this.toastIcon,
                position: this.toastPosition,
                duration: this.toastDuration,
                fullWidth: this.isToastFullWidth,
                className: this.className,
              })
            } else {
              this.toastText = 'Greška prilikom izmjene uzorka!'
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
          })
      },
      ukupnaStarost: function() {
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
      dateDiff(date) {
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
      dodajTestInit(event, ime, manual, status) {
        if (this.testovi.length < 1) {
          this.placeholder = ''
        }
        var manual = false
        var calculated = false
        var kalkuliraniTestovi = []
        var sekc = ''
        var anlit = ''
        var cost = ''
  
        if (!this.testovi.filter(test => test.labassay === event).length > 0) { // Izvrši samo ako test već nije dodan          
          this.sviTestovi.forEach(element => {
            if ((event === element.labassay)) {
              sekc = element.sekcija
              anlit = element.analit
              cost = element.cijena
            }
            if (element.manual && (event === element.labassay)) {
              manual = true
            }
            if (element.calculated && (event === element.labassay)) {
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
          if ((manual && status != 'U OBRADI') || (!manual && status != 'NA ČEKANJU')) {
            this.testovi.push({
              disable: true,
              labassay: event,
              ime_testa: ime,
              cijena: cost,
              analit: anlit,
              sekcija: sekc,
              manual: manual,
              calculated: calculated,
              calculatedTests: kalkuliraniTestovi
            })
            document.getElementById(event).className = 'btn btn-info btn-micro'
  
          } else {
            this.testovi.push({
              disable: false,
              labassay: event,
              ime_testa: ime,
              cijena: cost,
              analit: anlit,
              sekcija: sekc,
              manual: manual,
              calculated: calculated,
              calculatedTests: kalkuliraniTestovi
            })
            document.getElementById(event).className = 'btn btn-info btn-micro'
          }  
        }
      },
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
          });
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
      izbaciTest(event, disable) {
        if (disable != undefined && disable) {
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
        }  
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
</style>
