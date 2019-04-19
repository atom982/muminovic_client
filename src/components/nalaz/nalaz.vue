<template>
  <div>
    <div class="row">
      <div class="col-md-12">  
        <vuestic-widget :headerText="headerText">
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
                        {{imeIprezime}}
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
                    <div class="info-widget-inner">
                      <div class="stats">
                        <div class="stats-number">
                          <i class="ion ion-arrow-up-c text-primary stats-icon"></i> {{'Doktor: ' + doktor}}
                        </div>
                        <div class="stats-number">
                          {{' Lokacija: ' + lokacija}}
                        </div>
                        <div class="stats-title">{{datum + ' | ' + vrijeme}}</div>
                      </div>  
                    </div>
                  </div>
                </vuestic-widget>
              </div>
            </div>
          </div>
  
          <!-- REZULTATI -->
          <div class="col-md-12">
            <div v-if="glavniScreen" class="table-responsive">  
              <table class="table table-striped first-td-padding">  
                <thead>
                  <tr>
                    <td></td>
                    <td>Naziv testa</td>
                    <td>Rezultat</td>
                    <td>Kontrola</td>
                    <td>Jedinica</td>
                    <td>Referentni interval</td>
                  </tr>
                </thead>  
                <tbody>  
                  <tr v-for="test in rezultati">  
                    <td v-if="test.off"><span class="circle badge-danger"></span></td>
                    <td v-if="!test.off"><span class="circle badge-primary"></span></td>
  
                    <td v-if="rezultat && !test.multidata && testBezAnalita(test.analit, test.rezultat, test.unit, test.dRef, test.gRef, $store.state.site)[5] === 'Red'"><strong>{{test.ime}}</strong></td>
                    <td v-if="rezultat && !test.multidata && testBezAnalita(test.analit, test.rezultat, test.unit, test.dRef, test.gRef, $store.state.site)[5] != 'Red'">{{test.ime}}</td>
                    <td v-if="rezultat && test.multidata">{{test.ime}}</td>
  
                    <td v-if="rezultat && !test.multidata && testBezAnalita(test.analit, test.rezultat, test.unit, test.dRef, test.gRef, $store.state.site)[5] === 'Red'"><strong>{{testBezAnalita(test.analit, test.rezultat, test.unit, test.dRef, test.gRef, $store.state.site)[1]}}</strong></td>
                    <td v-if="rezultat && !test.multidata && testBezAnalita(test.analit, test.rezultat, test.unit, test.dRef, test.gRef, $store.state.site)[5] != 'Red'">{{testBezAnalita(test.analit, test.rezultat, test.unit, test.dRef, test.gRef, $store.state.site)[1]}}</td>
                    <td v-if="test.multidata"><button :id="test.laIDE" title='Pregled rezultata za analite' class="btn btn-primary btn-micro" @click.prevent="prikazAnalita($event, test.ime, test.analit)"><span :id="test.laIDE" @click.prevent="prikazAnalita($event, test.ime, test.analit)" class="glyphicon glyphicon-search"></span> Analiti</button></td>
    
                    <td v-if="rezultat && !test.multidata && testBezAnalita(test.analit, test.rezultat, test.unit, test.dRef, test.gRef, $store.state.site)[5] === 'Red'"><strong>{{testBezAnalita(test.analit, test.rezultat, test.unit, test.dRef, test.gRef, $store.state.site)[2]}}</strong></td>
                    <td v-if="rezultat && !test.multidata && testBezAnalita(test.analit, test.rezultat, test.unit, test.dRef, test.gRef, $store.state.site)[5] != 'Red'">{{testBezAnalita(test.analit, test.rezultat, test.unit, test.dRef, test.gRef, $store.state.site)[2]}}</td>
                    <td v-if="rezultat && test.multidata">{{''}}</td>

                    <td v-if="rezultat && !test.multidata && testBezAnalita(test.analit, test.rezultat, test.unit, test.dRef, test.gRef, $store.state.site)[5] === 'Red'"><strong>{{testBezAnalita(test.analit, test.rezultat, test.unit, test.dRef, test.gRef, $store.state.site)[3]}}</strong></td>
                    <td v-if="rezultat && !test.multidata && testBezAnalita(test.analit, test.rezultat, test.unit, test.dRef, test.gRef, $store.state.site)[5] != 'Red'">{{testBezAnalita(test.analit, test.rezultat, test.unit, test.dRef, test.gRef, $store.state.site)[3]}}</td>
                    <td v-if="rezultat && test.multidata">{{''}}</td>

                    <td v-if="rezultat && !test.multidata && testBezAnalita(test.analit, test.rezultat, test.unit, test.dRef, test.gRef, $store.state.site)[5] === 'Red'"><strong>{{testBezAnalita(test.analit, test.rezultat, test.unit, test.dRef, test.gRef, $store.state.site)[4]}}</strong></td>
                    <td v-if="rezultat && !test.multidata && testBezAnalita(test.analit, test.rezultat, test.unit, test.dRef, test.gRef, $store.state.site)[5] != 'Red'">{{testBezAnalita(test.analit, test.rezultat, test.unit, test.dRef, test.gRef, $store.state.site)[4]}}</td>
                    <td v-if="rezultat && test.multidata">{{''}}</td>
                  </tr>
                </tbody>  
              </table>  
            </div>
  
            <div v-if="prikaziAnalit" class="table-responsive">
  
              <table class="table table-striped first-td-padding">  
                <thead>                  
                  <tr v-if="!tinh"> <!-- Ako nije Test intolerancije na hranu   -->                    
                    <td v-if="kod">Kod</td> <!-- Ako je Panel   -->
                    <td>Naziv analita</td>
                    <td>Rezultat</td>                    
                    <td v-if="!kod">Kontrola</td> <!-- Ako nije Panel   -->
                    <td>Jedinica</td>
                    <td v-if="kod">Klasa</td> <!-- Ako je Panel   --> 
                    <td v-if="!kod">Referentni interval</td> <!-- Ako nije Panel   -->
                    <td v-if="kod">objašnjenje</td> <!-- Ako je Panel   -->
                  </tr>                   
                  <tr v-if="tinh"> <!-- Ako je Test intolerancije na hranu   -->   
                    <td>Naziv analita</td>
                    <td>Rezultat</td>
                    <td>objašnjenje</td>  
                  </tr>  
                </thead>  
                <tbody>
                  <tr v-if="!tinh" v-for="test in analiti"> <!-- Ako nije Test intolerancije na hranu   --> 
                    <td v-if="kod">{{test.kod}}</td> <!-- Ako je Panel   --> 
                    
                    <td v-if="kod">{{test.opis}}</td> <!-- Ako je Panel   -->   
                    <td v-if="rezultat && !kod && testSaAnalitima(trenutniAnalit, test.opis, test.rezultat, test.jedinica, test.refd, test.refg, $store.state.site)[5] === 'Red'"><strong>{{test.naziv}}</strong></td> <!-- Ako nije Panel   -->
                    <td v-if="rezultat && !kod && testSaAnalitima(trenutniAnalit, test.opis, test.rezultat, test.jedinica, test.refd, test.refg, $store.state.site)[5] != 'Red'">{{test.naziv}}</td> <!-- Ako nije Panel   -->
                    
                    <td v-if="kod">{{test.rezultat}}</td> <!-- Ako je Panel   -->
                    <td v-if="rezultat && !kod && testSaAnalitima(trenutniAnalit, test.opis, test.rezultat, test.jedinica, test.refd, test.refg, $store.state.site)[5] === 'Red'"><strong>{{testSaAnalitima(trenutniAnalit, test.opis, test.rezultat, test.jedinica, test.refd, test.refg, $store.state.site)[1]}}</strong></td> <!-- Ako nije Panel   -->
                    <td v-if="rezultat && !kod && testSaAnalitima(trenutniAnalit, test.opis, test.rezultat, test.jedinica, test.refd, test.refg, $store.state.site)[5] != 'Red'">{{testSaAnalitima(trenutniAnalit, test.opis, test.rezultat, test.jedinica, test.refd, test.refg, $store.state.site)[1]}}</td> <!-- Ako nije Panel   -->
                    
                    <td v-if="rezultat && !kod && testSaAnalitima(trenutniAnalit, test.opis, test.rezultat, test.jedinica, test.refd, test.refg, $store.state.site)[5] === 'Red'"><strong>{{testSaAnalitima(trenutniAnalit, test.opis, test.rezultat, test.jedinica, test.refd, test.refg, $store.state.site)[2]}}</strong></td> <!-- Ako nije Panel   -->
                    <td v-if="rezultat && !kod && testSaAnalitima(trenutniAnalit, test.opis, test.rezultat, test.jedinica, test.refd, test.refg, $store.state.site)[5] != 'Red'">{{testSaAnalitima(trenutniAnalit, test.opis, test.rezultat, test.jedinica, test.refd, test.refg, $store.state.site)[2]}}</td> <!-- Ako nije Panel   -->
                                     
                    <td v-if="kod" title="IgE koncentracija">{{test.jedinica}}</td> <!-- Ako je Panel   -->
                    <td v-if="rezultat && !kod && testSaAnalitima(trenutniAnalit, test.opis, test.rezultat, test.jedinica, test.refd, test.refg, $store.state.site)[5] === 'Red'"><strong>{{testSaAnalitima(trenutniAnalit, test.opis, test.rezultat, test.jedinica, test.refd, test.refg, $store.state.site)[3]}}</strong></td> <!-- Ako nije Panel   -->
                    <td v-if="rezultat && !kod && testSaAnalitima(trenutniAnalit, test.opis, test.rezultat, test.jedinica, test.refd, test.refg, $store.state.site)[5] != 'Red'">{{testSaAnalitima(trenutniAnalit, test.opis, test.rezultat, test.jedinica, test.refd, test.refg, $store.state.site)[3]}}</td> <!-- Ako nije Panel   -->
                  
  
                    <td v-if="kod && kClass0(test.rezultat, test.refd, test.refg)">{{'0'}}</td>  <!-- Ako je Panel   --> 
                    <td v-if="kod && kClass1(test.rezultat, test.refd, test.refg)">{{'1'}}</td>  <!-- Ako je Panel   --> 
                    <td v-if="kod && kClass2(test.rezultat, test.refd, test.refg)">{{'2'}}</td>  <!-- Ako je Panel   --> 
                    <td v-if="kod && kClass3(test.rezultat, test.refd, test.refg)">{{'3'}}</td>  <!-- Ako je Panel   --> 
                    <td v-if="kod && kClass4(test.rezultat, test.refd, test.refg)">{{'4'}}</td>  <!-- Ako je Panel   --> 
                    <td v-if="kod && kClass5(test.rezultat, test.refd, test.refg)">{{'5'}}</td>  <!-- Ako je Panel   --> 
                    <td v-if="kod && kClass6(test.rezultat, test.refd, test.refg)">{{'6'}}</td>  <!-- Ako je Panel   --> 
  
                    <td v-if="rezultat && !kod && testSaAnalitima(trenutniAnalit, test.opis, test.rezultat, test.jedinica, test.refd, test.refg, $store.state.site)[5] === 'Red'"><strong>{{testSaAnalitima(trenutniAnalit, test.opis, test.rezultat, test.jedinica, test.refd, test.refg, $store.state.site)[4]}}</strong></td> <!-- Ako nije Panel   -->
                    <td v-if="rezultat && !kod && testSaAnalitima(trenutniAnalit, test.opis, test.rezultat, test.jedinica, test.refd, test.refg, $store.state.site)[5] != 'Red'">{{testSaAnalitima(trenutniAnalit, test.opis, test.rezultat, test.jedinica, test.refd, test.refg, $store.state.site)[4]}}</td> <!-- Ako nije Panel   -->
                  
                    <td v-if="kod && kClass0(test.rezultat, test.refd, test.refg)">{{'Nisu detektovana specifična antitijela'}}</td> <!-- Ako je Panel   -->
                    <td v-if="kod && kClass1(test.rezultat, test.refd, test.refg)">{{'Vrlo slaba koncentracija antitijela'}}</td> <!-- Ako je Panel   -->
                    <td v-if="kod && kClass2(test.rezultat, test.refd, test.refg)">{{'Slaba koncentracija antitijela'}}</td> <!-- Ako je Panel   -->
                    <td v-if="kod && kClass3(test.rezultat, test.refd, test.refg)">{{'Jasna koncentracija antitijela'}}</td> <!-- Ako je Panel   -->
                    <td v-if="kod && kClass4(test.rezultat, test.refd, test.refg)">{{'Snažna koncentracija antitijela'}}</td> <!-- Ako je Panel   -->
                    <td v-if="kod && kClass5(test.rezultat, test.refd, test.refg)">{{'Vrlo jaka koncentracija antitijela'}}</td> <!-- Ako je Panel   -->
                    <td v-if="kod && kClass6(test.rezultat, test.refd, test.refg)">{{'Izrazito visoka koncentracija antitijela'}}</td> <!-- Ako je Panel   -->  
                  </tr>

                  <tr v-if="tinh" v-for="test in analiti"> <!-- Ako je Test intolerancije na hranu   -->
                    <td>{{test.opis}}</td>
                    <td v-if="tinh1(test.rezultat, test.refd, test.refg)"><button class="btn btn-primary btn-micro">&nbsp&nbsp&nbsp</button></td>
                    <td v-if="tinh2(test.rezultat, test.refd, test.refg)"><button class="btn btn-warning btn-micro">&nbsp&nbsp&nbsp</button><button class="btn btn-warning btn-micro">&nbsp&nbsp&nbsp</button></td>
                    <td v-if="tinh3(test.rezultat, test.refd, test.refg)"><button class="btn btn-danger btn-micro">&nbsp&nbsp&nbsp</button><button class="btn btn-danger btn-micro">&nbsp&nbsp&nbsp</button><button class="btn btn-danger btn-micro">&nbsp&nbsp&nbsp</button></td>  
                    <td v-if="tinh1(test.rezultat, test.refd, test.refg)">{{'Dozvoljeno'}}</td>
                    <td v-if="tinh2(test.rezultat, test.refd, test.refg)">{{'Nije preporučljivo'}}</td>
                    <td v-if="tinh3(test.rezultat, test.refd, test.refg)">{{'Nije dozvoljeno'}}</td>
                  </tr>
                </tbody>  
              </table>  
            </div>
          </div>
          <!-- END OF REZULTATI -->
          
          <!-- Horizontal Ruler -->
          <div class="col-md-12 info-widget-inner">
            <div class="col-md-12">
              <div class="col-md-12">
                <hr>
              </div>
            </div>
          </div>
          <!-- END OF Horizontal Ruler -->
  
          <!-- KONTROLNA DUGMAD -->
          <div class="row">
            <div class="col-md-3"></div>
            <div class="col-md-6">
              <div class="btn-container">
                <button v-if="glavniScreen" class="btn btn-secondary wizard-back pull-left" @click.prevent="vratiPregled"><span class="fa fa-backward"></span>{{ ' POVRATAK'}}</button>
                <button v-if="prikaziAnalit" class="btn btn-secondary wizard-back pull-left" @click.prevent="vratiPregled2"><span class="fa fa-backward"></span>{{ ' POVRATAK'}}</button>
              </div>
            </div>
          </div>
          <!-- END OF KONTROLNA DUGMAD -->

        </vuestic-widget>  
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import axios from 'axios'
  import router from '../../router'
  import {http} from '../../../config/config.js'
  import {server} from '../../../config/config.js'
  import printJS from 'print-js'
  import {bus} from '../../main'
  import pdfMake from 'pdfmake/build/pdfmake'
  import vfsFonts from 'pdfmake/build/vfs_fonts'
  import {ispisAnalitNe} from '../funkcije/shared/references.js'
  import {ispisAnalitDa} from '../funkcije/shared/references.js'
  
  export default {
    name: 'Nalaz',
    props: ['id'],

    data() {
      return {
        headerText: '',
        barcodeImage: '',
        sid: '',
        imeIprezime: '',
        anatestovi: [],
        prikaziAnalit: false,
        glavniScreen: true,
        analitiprikaz: [],
        analiti: [],
        JMBG: '',
        spol: '',
        jmbgObj: {},
        jmbgDan: '',
        jmbgMjesec: '',
        jmbgGodina: '',
        tipUzorka: '',
        doktor: '',
        lokacija: '',
        dtUnosa: '',
        datum: '',
        vrijeme: '',
        rezultat: false,
        testovi: [],
        rezultati: [],
        nedostaju: [],
        staraRuta: '',
        novaRuta: '',
        slika: '',
        napomena: '',
        duhan: '',
        pusac: false,
        dijabetes: '',
        bolest: false,
        patient_id: '',
        kod: false,
        tinh: false,
        trenutniTest: '',
        trenutniAnalit: ''  
      }
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {        
        bus.$emit('staraRutad', from.path)  
        next()
      })
    },
    created() {
      this.headerText = 'Uzorak: ' + this.$route.params.id
      this.sid = this.$route.params.id

      bus.$on('staraRutad', (data) => {
        this.staraRuta = data
       
        if (this.staraRuta.includes('/rezultati/pregled/')) {
          this.novaRuta = 'pregled'         
        }
  
        if (this.staraRuta.includes('/rezultati/verifikacija/')) {
          this.novaRuta = 'verifikacija'         
        }
  
        if (this.staraRuta.length > 24) {
          this.novaRuta = 'detalji'
        }
      })
       
      http.get('rezultati/show/' + this.sid + '?token=' + this.$store.state.token + '&site=' + this.$store.state.site, {
  
        })
        .then(res => {          
          this.JMBG = res.data.jmbg
          this.spol = res.data.spol
         
          if (res.data.data.length) {
            this.testovi = res.data.data
            this.rezultat = true
            var test = {}
            this.analitiprikaz = res.data.multidata
  
            res.data.data.forEach(element => {                 
  
              test = {}
              test.ime = element.testovi.labassay.naziv
  
              var i = 0
              element.testovi.rezultat.forEach(rezultat => {
                i++  
  
                if (element.testovi.rezultat.length === i) {  
                  test.rezultat = rezultat.rezultat_f  
                  
                  if (rezultat.rezultat_i === "off") {
                    test.off = true
                  } else {
                    test.off = false
                  }
                  test.unit = rezultat.jedinice_f
                  test.refSet = element.testovi.grupa
                  test.dRef = element.testovi.refd
                  test.gRef = element.testovi.refg
                  test.ime = element.testovi.labassay.naziv 
                  test.test = element.testovi.labassay.sifra 
                  test.analit = element.testovi.labassay.analit
                  test.edit = false
                  test.IDE = element.testovi._id
                  test.laIDE = element.testovi.labassay._id
                  test.calculated = element.testovi.labassay.calculated
                  test.multidata = element.testovi.labassay.multi
                }
              })
  
              if (test.rezultat != "" && test.rezultat != "Unesi" && !test.rezultat.includes('-')) {
                this.rezultati.push(test)
              }  
            })            
          }
          this.imeIprezime = res.data.ime + ' ' + res.data.prezime
          this.nedostaju = res.data.nodata
          this.patient_id = res.data.id  
        })
  
      http.get('uzorci/show/' + this.sid + '?token=' + this.$store.state.token + '&site=' + this.$store.state.site, {})
        .then(res => {
          // console.log(res.data.base64)
          this.slika = res.data.base64  
          this.imeIprezime = res.data.uzorak.patient.ime + ' ' + res.data.uzorak.patient.prezime
          this.JMBG = res.data.uzorak.patient.jmbg
          this.spol = res.data.uzorak.patient.spol
          this.duhan = res.data.uzorak.patient.duhan
          this.dijabetes = res.data.uzorak.patient.dijabetes
          this.tipUzorka = res.data.uzorak.type  
          this.doktor = res.data.uzorak.doktor
          this.lokacija = res.data.uzorak.lokacija.lokacija
  
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
  
          this.dtUnosa = res.data.uzorak.datum
          var godina = this.dtUnosa.substring(11, 15)
          var mjesec = this.dtUnosa.substring(4, 7)
  
          switch (mjesec) {
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
    methods: {
      testBezAnalita: function(test, rezultat, jedinica, dRef, gRef, site) {        
        return ispisAnalitNe(test, rezultat, jedinica, dRef, gRef, site)
      },
      testSaAnalitima: function(izbor, test, rezultat, jedinica, dRef, gRef, site) {        
        return ispisAnalitDa(izbor, test, rezultat, jedinica, dRef, gRef, site)
      },
      prikazAnalita: function(event, naziv, analit, rezultat, ide) {
        this.kod = false
        this.headerText = 'Uzorak: ' + this.$route.params.id + ' / Pregled analita testa: ' + naziv + ' (' + analit + ')'
        this.trenutniTest = naziv
        this.trenutniAnalit = analit
  
        this.multiHeader = 'Verifikacija rezultata testa: ' + naziv + ' (' + analit + ')'
        this.analiti = []
        var single = {}
        
        this.analitiprikaz.forEach(element => {          
          single = {}
          if (event.target.id === element.labassay._id) {
            element.rezultat.forEach(analit => {              
              single.refd = analit.refd
              single.refg = analit.refg
              single.grupa = analit.grupa
              single.naziv = analit.rezultat[0].sn
              single.opis = analit.rezultat[0].dilucija
              single.jedinica = analit.rezultat[0].jedinice_f
              single.rezultat = analit.rezultat[0].rezultat_f
              single.kod = analit.rezultat[0].module_sn
              single.manual = element.labassay.manual
              single.edit = false
              single.analit = analit.rezultat[0].anaassay
              if (single.rezultat != "" && single.rezultat != "Unesi") {
                this.analiti.push(single)
              }
              if (naziv.includes("Panel")) {                
                this.kod = true
                this.tinh = false
              }
              if (naziv.includes("TINH")) {               
                this.tinh = true
                this.kod = false
              }
              single = {}
            })  
          }
        })

        this.prikaziAnalit = true
        this.glavniScreen = false
      },
      vratiPregled2: function() {
        this.headerText = 'Uzorak: ' + this.$route.params.id  
        this.glavniScreen = !this.glavniScreen
        this.prikaziAnalit = !this.prikaziAnalit
      },
      toNalazi: function() {        
        router.push('/nalazi/verifikacija/' + this.patient_id + '?token=' + this.$store.state.token)
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

      vratiPregled: function() {  
        if (this.novaRuta === 'pregled') {
          router.push('/rezultati/pregled/' + '?sekcija=' + this.$route.params.sekcija)
        } else if (this.novaRuta === 'verifikacija') {
          router.push('/rezultati/verifikacija/' + '?sekcija=' + this.$route.params.sekcija)
        } else {
          history.back()
        }  
      },
      kClass0: function(data, d, g) {
        if (data < 0.35) {
          return true
        } else {
          return false
        }  
      },
      kClass1: function(data, d, g) {
        if ((data >= 0.35) && (0.7 > data)) {
          return true
        } else {
          return false
        }
      },
      kClass2: function(data, d, g) {
        if ((data >= 0.7) && (3.50 > data)) {
          return true
        } else {
          return false
        }
      },
      kClass3: function(data, d, g) {
        if ((data >= 3.50) && (17.50 > data)) {
          return true
        } else {
          return false
        }
      },
      kClass4: function(data, d, g) {
        if ((data >= 17.50) && (50 > data)) {
          return true
        } else {
          return false
        }
      },
      kClass5: function(data, d, g) {
        if ((data >= 50) && (100 > data)) {
          return true
        } else {
          return false
        }
      },
      kClass6: function(data, d, g) {
        if ((data >= 100)) {
          return true
        } else {
          return false
        }
      },
      tinh1: function(data, d, g) {
        if ((data > 0) && (1 >= data)) {
          return true
        } else {
          return false
        }
      },
      tinh2: function(data, d, g) {
        if ((data > 1) && (2 >= data)) {
          return true
        } else {
          return false
        }
      },
      tinh3: function(data, d, g) {
        if ((data > 2) && (3 >= data)) {
          return true
        } else {
          return false
        }
      },
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../sass/_variables.scss";
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
  
  .circle {
    width: .400rem;
    height: .400rem;
    border-radius: 50%;
    display: inline-block;
  }
</style>
