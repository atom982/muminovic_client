<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <vuestic-widget v-if="mainScreen" :headerText="hid">
          <div class="col-md-12 widget-body">
            <div class="row dashboard-info-widgets">
              <div v-if="spol === 'MUŠKI'" class="col-md-6 col-xl-6">
                <vuestic-widget class="info-widget brand-info">
                  <div class="info-widget-inner">
                    <div class="stats">
                      <div class="stats-number">
                        <i class="ion ion-arrow-up-c text-primary stats-icon"></i> {{imeIprezime}}
                      </div>
                      <div class="stats-number">
                        <i class="ion ion-arrow-up-c text-primary stats-icon"></i> {{JMBG}}
                      </div>
                      <div class="row">
                        <div class="stats-title">{{'Tip uzorka : ' + tipUzorka}}</div>
                        <div v-if="pusac" class="stats-title">&nbsp{{'| Pušač : ' + duhan}}</div>
                        <div v-if="bolest" class="stats-title">&nbsp{{'| Dijabetes : ' + dijabetes}}</div>
                      </div>
                    </div>
                  </div>
                </vuestic-widget>
              </div>
              <div v-if="spol === 'ŽENSKI'" class="col-md-6 col-xl-6">
                <vuestic-widget class="info-widget brand-danger">
                  <div class="info-widget-inner">
                    <div class="stats">
                      <div class="stats-number">
                        <i class="ion ion-arrow-up-c text-primary stats-icon"></i> {{imeIprezime}}
                      </div>
                      <div class="stats-number">
                        <i class="ion ion-arrow-up-c text-primary stats-icon"></i> {{JMBG}}
                      </div>
                      <div class="row">
                        <div class="stats-title">{{'Tip uzorka : ' + tipUzorka}}</div>
                        <div v-if="pusac" class="stats-title">&nbsp{{'| Pušač : ' + duhan}}</div>
                        <div v-if="bolest" class="stats-title">&nbsp{{'| Dijabetes : ' + dijabetes}}</div>
                      </div>
                    </div>
                  </div>
                </vuestic-widget>
              </div>
              <div class="col-md-6 col-xl-6">
                <vuestic-widget class="info-widget">
                  <div class="info-widget-inner">
                    <div class="info-widget-inner has-chart">
                      <div class="stats">
                        <div class="stats-number">
                          <i class="ion ion-arrow-up-c text-primary stats-icon"></i> {{'Doktor: ' + doktor}}
                        </div>
                        <div class="stats-number">
                          <i class="ion ion-arrow-up-c text-primary stats-icon"></i> {{'Lokacija: ' + lokacija}}
                        </div>
                        <div class="stats-title">{{datum + ' | ' + vrijeme}}</div>
                      </div>
                      <div v-show="false" class="chart-container">
                        <div class="btn btn-primary btn-with-icon btn-micro rounded-icon" title="Osvježi stranicu" @click='refreshAll(sid)'>
                          <div class="btn-with-icon-content">
                            <i class="fa fa-refresh"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </vuestic-widget>
              </div>
            </div>
          </div>
          <br>
  
          <div class="col-md-12">
            <div class="table-responsive">
              <table class="table table-striped first-td-padding">
                <thead>
                  <tr>
                    <td>ime testa</td>
                    <td>šifra testa</td>
                    <td>analiti</td>
                    <td>sekcija</td>
                    <td>status</td>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="$route.params.sekcija === test.labassay.sekcija || $route.params.sekcija ==='SVE'" v-for="test in testovi">
                    <td :title="test.labassay.analit">{{test.labassay.naziv}}</td>
                    <td>{{test.labassay.sifra}}</td>
                    <td>
                      <button v-if="test.labassay.multi" title='Test sadrži analite' @click="prikaziAnalite(test._id, test.labassay.naziv, test.labassay.analit, test.labassay.multiparam)" class='btn btn-primary btn-micro'><span class='glyphicon glyphicon-ok-circle'></span> Da</button>
                      <button v-if="!test.labassay.multi" title='Test ne sadrži analite' @click="sakrijAnalite" class='btn btn-pale btn-micro' focus><span class='glyphicon glyphicon-ban-circle'></span> Ne</button>
                    </td>
                    <td>{{test.labassay.sekcija}}</td>
                    <td>{{test.status_t}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
  
          <div v-if="sekcije.length > 1" class="col-md-12">
            <hr style="border-color:#4ab2e3">
            <div class="row container">
              <div v-for="sekcija in sekcije" class="square">
                <button v-if="$route.params.sekcija === sekcija" class="btn btn-primary-info btn-micro"><span class="fa fa-flask"></span>{{ ' ' + sekcija}}</button> &nbsp
                <button v-if="$route.params.sekcija != sekcija" :id="sekcija" class="btn btn-secondary-info btn-micro" @click.prevent="goToSekcija($event)"><span :id="sekcija" @click.prevent="goToSekcija($event)" class="fa fa-flask"></span>{{ ' ' + sekcija}}</button>              &nbsp
              </div>
            </div>
          </div>
          <div class="col-md-12">
            <hr>
          </div>
          <div class="row">
            <div class="col-md-3"></div>
            <div class="col-md-6">
              <button class="btn btn-secondary" @click.prevent="vratiPregled"><span class="fa fa-backward"></span>{{ ' POVRATAK'}}</button>
            </div>
          </div>
        </vuestic-widget>
        <!-- card_view = true -->
        <vuestic-widget v-if="multi && card_view" :headerText="multiHeader">
          <div class="row dashboard-info-widgets">
            <div v-for="test in analiti" class="col-md-6 col-xl-2">
              <vuestic-widget class="info-widget">
                <div class="info-widget-inner">
                  <div class="stats">
                    <div :title="test.opis" class="stats-number">
                      <i class="ion ion-arrow-up-c text-primary stats-icon"></i> {{test.naziv}}
                    </div>
                    <div v-if="test.jedinica === 'n/a'" class="stats-title">&nbsp</div>
                    <div v-if="test.jedinica != 'n/a'" class="stats-title">{{test.jedinica}}</div>
                  </div>
                </div>
              </vuestic-widget>
            </div>
          </div>
          <hr>
          <div class="row">
            <div class="col-md-3"></div>
            <div class="col-md-6">
              <button class="btn btn-secondary" @click.prevent="vratiPregled2"><span class="fa fa-backward"></span>{{ ' POVRATAK'}}</button>
            </div>
          </div>
        </vuestic-widget>
        <!-- card_view = false -->
        <vuestic-widget v-if="multi && !card_view" :headerText="multiHeader">
  
          <div class="row">
            <div class="col-md-12">
              <div class="table-responsive">
                <table class="table table-striped first-td-padding">
                  <thead>
                    <tr>
                      <td>analit</td>  
                      <td v-if="!multiHeader.includes('TINH')">jedinica</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="test in analiti">
                      <td v-if="multiHeader.includes('TINH') || multiHeader.includes('Panel') ">{{test.opis}}</td>                      
                      <td v-if="!multiHeader.includes('Panel') && !multiHeader.includes('TINH')" :title="test.opis">{{test.naziv}}</td>  
                      <td v-if="!multiHeader.includes('TINH') && test.jedinica === 'n/a'" class="stats-title">&nbsp</td>
                      <td v-if="!multiHeader.includes('TINH') && test.jedinica != 'n/a'" class="stats-title">{{test.jedinica}}</td>  
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <hr>
          <div class="row">
            <div class="col-md-3"></div>
            <div class="col-md-6">
              <button class="btn btn-secondary" @click.prevent="vratiPregled2"><span class="fa fa-backward"></span>{{ ' POVRATAK'}}</button>
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
  import {
    http
  } from '../../../config/config.js'
  import {
    server
  } from '../../../config/config.js'
  Vue.component('badge-column', BadgeColumn)
  
  export default {
    name: 'Table',
    props: ['id'],
    data() {
      return {
        uzorakId: '',
        testovi: [],
        imeIprezime: '',
        JMBG: '',
        spol: '',
        hid: '',
        bc: '',
        tipUzorka: '',
        sekcija: [],
        dtUnosa: '',
        doktor: '',
        lokacija: '',
        sid: '',
        datum: '',
        vrijeme: '',
        multi: false,
        multiHeader: 'Analiti testa: {{ ime_testa }}',
        show: true,
        pusac: false,
        duhan: '',
        bolest: false,
        dijabetes: '',
        analiti: [],
        mainScreen: true,
        detailScreen: false,
        sekcije: [],
        card_view: false,
  
        toastText: '',
        toastIcon: '',
        toastPosition: '',
        toastDuration: 2500,
        isToastFullWidth: false,
        className: '',
      }
    },
  
    beforeCreate() {
      http.post('users/' + this.$store.state.userId, {
          email: this.$store.state.userId,
          site: this.$store.state.site,
          token: this.$store.state.token
        })
        .then(res => {
          if (res.data.user != undefined) {
            this.card_view = res.data.user.postavke.card_view
          }
        })
    },
  
    created() {
      this.hid = 'Uzorak: ' + this.$route.params.id
      this.sid = this.$route.params.id
  
      http.get('uzorci/show/' + this.$route.params.id + '?token=' + this.$store.state.token + '&site=' + this.$store.state.site, {})
        .then(res => {
          if (res.data.uzorak != undefined) {
            this.testovi = res.data.uzorak.tests
            this.testovi.forEach(uzorak => {
              if (!this.sekcije.filter(test => test === uzorak.labassay.sekcija).length > 0) {
                this.sekcije.push(uzorak.labassay.sekcija)
              }
              res.data.rezultat.rezultati.forEach(rezultat => {
                if (uzorak.sifra === rezultat.labassay.sifra) {
                  uzorak.status = rezultat.status
                }
              })
            })
            this.imeIprezime = res.data.uzorak.patient.ime + ' ' + res.data.uzorak.patient.prezime
            this.JMBG = res.data.uzorak.patient.jmbg
            this.spol = res.data.uzorak.patient.spol
            this.duhan = res.data.uzorak.patient.duhan
            this.dijabetes = res.data.uzorak.patient.dijabetes
  
            if (this.duhan === 'DA') {
              this.pusac = true
            } else {
              this.pusac = false
            }
            if (this.dijabetes === 'DA') {
              this.bolest = true
            } else {
              this.bolest = false
            }
  
            this.tipUzorka = res.data.uzorak.type
            this.sekcija = res.data.uzorak.sekcija
            this.doktor = res.data.uzorak.doktor
            this.lokacija = res.data.uzorak.lokacija.lokacija
            this.dtUnosa = res.data.uzorak.datum
            var godina = this.dtUnosa.substring(11, 15)
            var mjesec = this.dtUnosa.substring(4, 7)
  
            switch (mjesec.toString()) {
              case 'Jan':
                mjesec = '01'
                break;
              case 'Feb':
                mjesec = '02'
                break;
              case 'Mar':
                mjesec = '03'
                break;
              case 'Apr':
                mjesec = '04'
                break;
              case 'May':
                mjesec = '05'
                break;
              case 'Jun':
                mjesec = '06'
                break;
              case 'Jul':
                mjesec = '07'
                break;
              case 'Aug':
                mjesec = '08'
                break;
              case 'Sep':
                mjesec = '09'
                break;
              case 'Oct':
                mjesec = '10'
                break;
              case 'Nov':
                mjesec = '11'
                break;
              case 'Dec':
                mjesec = '12'
                break;
              default:
                mjesec = '00'
                break;
            }
            var dan = this.dtUnosa.substring(8, 10)
            this.datum = dan + '.' + mjesec + '.' + godina
            var sat = this.dtUnosa.substring(16, 18)
            var min = this.dtUnosa.substring(19, 21)
            this.vrijeme = sat + ':' + min
          }
        })
    },
  
    mounted() {
  
    },
    methods: {
      goToSekcija(event) {
        router.push('/uzorci/pregled/' + event.target.id + '/' + this.$route.params.id)
        this.toastText = event.target.id
        this.toastIcon = 'fa-flask'
        this.toastPosition = 'top-right'
        this.className = 'vuestic-toast-warning'
  
        this.showToast(this.toastText, {
          icon: this.toastIcon,
          position: this.toastPosition,
          duration: this.toastDuration,
          fullWidth: this.isToastFullWidth,
          className: this.className,
        })
      },
      refreshAll(sid) {
        this.multi = false
        http.get('uzorci/show/' + sid + '?token=' + this.$store.state.token + '&site=' + this.$store.state.site, {})
          .then(res => {
            this.testovi = res.data.uzorak.tests
            this.testovi.forEach(uzorak => {
              if (!this.sekcije.filter(test => test === uzorak.labassay.sekcija).length > 0) {
  
                this.sekcije.push(uzorak.labassay.sekcija)
              }
              res.data.rezultat.rezultati.forEach(rezultat => {
                if (uzorak.sifra === rezultat.labassay.sifra) {
                  uzorak.status = rezultat.status
                }
              });
            })
            this.imeIprezime = res.data.uzorak.patient.ime + ' ' + res.data.uzorak.patient.prezime
            this.JMBG = res.data.uzorak.patient.jmbg
            this.spol = res.data.uzorak.patient.spol
            this.duhan = res.data.uzorak.patient.duhan
            this.dijabetes = res.data.uzorak.patient.dijabetes
  
            if (this.duhan === 'DA') {
              this.pusac = true
            } else {
              this.pusac = false
            }
            if (this.dijabetes === 'DA') {
              this.bolest = true
            } else {
              this.bolest = false
            }
            this.tipUzorka = res.data.uzorak.type
            this.sekcija = res.data.uzorak.sekcija
            this.doktor = res.data.uzorak.doktor
            this.lokacija = res.data.uzorak.lokacija.lokacija
            this.dtUnosa = res.data.uzorak.datum
            var godina = this.dtUnosa.substring(11, 15)
            var mjesec = this.dtUnosa.substring(4, 7)
  
            switch (mjesec.toString()) {
              case 'Jan':
                mjesec = '01'
                break;
              case 'Feb':
                mjesec = '02'
                break;
              case 'Mar':
                mjesec = '03'
                break;
              case 'Apr':
                mjesec = '04'
                break;
              case 'May':
                mjesec = '05'
                break;
              case 'Jun':
                mjesec = '06'
                break;
              case 'Jul':
                mjesec = '07'
                break;
              case 'Aug':
                mjesec = '08'
                break;
              case 'Sep':
                mjesec = '09'
                break;
              case 'Oct':
                mjesec = '10'
                break;
              case 'Nov':
                mjesec = '11'
                break;
              case 'Dec':
                mjesec = '12'
                break;
              default:
                mjesec = '00'
                break;
            }
            var dan = this.dtUnosa.substring(8, 10)
            this.datum = dan + '.' + mjesec + '.' + godina
            var sat = this.dtUnosa.substring(16, 18)
            var min = this.dtUnosa.substring(19, 21)
            this.vrijeme = sat + ':' + min
          })
  
      },
      prikaziAnalite: function(id, naziv, analit, testovi) {
        if (!this.multi) {
          this.multi = true
        }
        this.multiHeader = 'Analiti testa: ' + naziv + ' (' + analit + ')'
        this.analiti = []
        testovi.forEach(element => {
          this.analiti.push(element)
        });
        this.mainScreen = false
        this.detailScreen = true
      },
      sakrijAnalite: function() {
        if (this.multi) {
          this.multi = false
        }
      },
      vratiPregled: function() {
        router.push('/uzorci/pregled/' + '?sekcija=' + this.$route.params.sekcija)
      },
      vratiPregled2: function() {
        this.mainScreen = true
        this.multi = false
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../sass/_variables.scss";
  @import '../../sass/toasts';
  .stats-number,
  .stats-title {
    line-height: 1;
  }
  
  .info-widget-inner {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 100%;
    &.has-chart {
      justify-content: space-between;
    }
    .stats {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100%;
    }
  }
  
  .stats-number {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    font-size: 1.7rem;
    margin-bottom: 0.5rem;
    .stats-icon {
      font-size: 1.5625rem;
      position: absolute;
      top: 0.625rem;
      left: -1.25rem;
      &.icon-wide {
        left: -1.875rem;
      }
    }
  }
  
  .color-icon-label-table {
    td:first-child {
      width: 1rem;
    }
  }
  
  .brand-danger {
    background-color: #db76df;
    color: $white;
    box-shadow: $widget-danger-shadow;
  }
  
  .info-widget {
    border-top: $info-widget-border;
    &.brand-info {
      border-top-color: $brand-info;
    }
    &.brand-danger {
      border-top-color: #db76df;
    }
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
