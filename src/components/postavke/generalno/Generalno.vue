<template>
  <div class="form-elements">
    <div class="row">
      <div class="col-md-12">  
        <vuestic-widget v-if="ifForm" headerText="Opšte postavke - Generalno">
          <form>
            <div class="row">
              <div class="col-md-3"></div>
              <div class="col-md-6">  
                <fieldset>
                  <div class="form-group with-icon-left">
                    <div class="input-group">
                      <vuestic-simple-select label="Izaberite postavku" v-model="postavkaSelected" name="postavkaSelect" :required="true" title=" " ref="postavkaSelect" v-bind:options="postavkaOpcije">
                      </vuestic-simple-select>
                    </div>
                  </div>  
                  <div v-if="ifTipAparata" class="form-group with-icon-left">
                    <div class="input-group">
                      <input id="input-icon-left" title=" " v-model="tipAparata" name="input-icon-left" required/>
                      <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                      <label class="control-label" for="input-icon-left">{{'Unesite tip aparata'}}</label><i class="bar"></i>
                    </div>
                  </div>  
                  <div v-if="ifTehnologijaAparata" class="form-group with-icon-left">
                    <div class="input-group">
                      <input id="input-icon-left" title=" " v-model="tehnologijaAparata" name="input-icon-left" required/>
                      <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                      <label class="control-label" for="input-icon-left">{{'Unesite tehnologiju aparata'}}</label><i class="bar"></i>
                    </div>
                  </div>  
                  <div v-if="ifGrupaTesta" class="form-group with-icon-left">
                    <div class="input-group">
                      <input id="input-icon-left" title=" " v-model="grupaTestova" name="input-icon-left" required/>
                      <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                      <label class="control-label" for="input-icon-left">{{'Unesite grupu testova'}}</label><i class="bar"></i>
                    </div>
                  </div>  
                  <div v-if="ifGrupaTesta" class="form-group with-icon-left">
                    <div class="input-group">
                      <vuestic-simple-select label="Izaberite sekciju" v-model="sekcija" name="sekcijaSelect" :required="true" title=" " ref="sekcijaSelect" v-bind:options="sekcije">
                      </vuestic-simple-select>
                    </div>
                  </div>  
                  <div v-if="ifReferentnaGrupa" class="form-group with-icon-left">
                    <div class="input-group">
                      <input id="input-icon-left" title=" " v-model="referentnaGrupa" name="input-icon-left" required/>
                      <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                      <label class="control-label" for="input-icon-left">{{'Unesite referentnu grupu'}}</label><i class="bar"></i>
                    </div>
                  </div>  
                  <div v-if="ifJedinica" class="form-group with-icon-left">
                    <div class="input-group">
                      <input id="input-icon-left" title=" " v-model="jedinica" name="input-icon-left" required/>
                      <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                      <label class="control-label" for="input-icon-left">{{'Unesite mjernu jedinicu'}}</label><i class="bar"></i>
                    </div>
                  </div>
                  <div v-if="iftipUzorka" class="form-group with-icon-left">
                    <div class="input-group">
                      <input id="input-icon-left" title=" " v-model="tipUzorka" name="input-icon-left" required/>
                      <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                      <label class="control-label" for="input-icon-left">{{'Unesite tip uzorka'}}</label><i class="bar"></i>
                    </div>
                  </div>
                  <button v-if="ifButton" class="btn btn-primary" @click.prevent="dodajPostavku"><span class="fa fa-save"></span>{{ ' SAČUVAJ'}}</button>
                </fieldset>
                <hr v-if="uslov">
                <a v-if="uslov" @click="prikaziPostavke" href="#">{{prikaziTekst}}</a>  
              </div>
              <div class="col-md-3"></div>
            </div>
          </form>  
        </vuestic-widget>  
        <vuestic-widget v-if="iftpTip" headerText="Trenutne Postavke - Tip aparata ">  
          <div class="table-responsive">
            <table v-if="tabelaUslov1" class="table table-striped first-td-padding">
              <thead>
                <tr>
                  <td>{{"Tip Aparata"}}</td>
                  <td v-if="$store.state.userId === 'admin@atom.ba'">{{"akcija"}}</td>
                </tr>
              </thead>
              <tbody>
                <tr v-for="element in trenutniTipovi">
                  <td>{{element.tipAparata}}</td>
                  <td v-if="$store.state.userId === 'admin@atom.ba'">
                    <button title='Brisanje zapisa' v-bind:id="element._id" class="btn btn-danger btn-micro" @click="catchDialog($event)"><span v-bind:id="element._id" class="fa fa-trash-o"></span>{{ ' IZBRIŠI' }}</button>
                  </td>
                </tr>
              </tbody>
            </table>
            <vuestic-alert v-if="dataUslov1" type="warning" :withCloseBtn="false"><span>{{dataAvailable1}}</span></vuestic-alert>
            <vuestic-alert v-if="dataUslovDanger" type="danger" :withCloseBtn="false"><span>{{dataAvailable}}</span></vuestic-alert>
          </div>
          <hr>
          <div class="row">
            <div class="col-md-3"></div>
            <div class="col-md-6">
              <button v-if="uslov" class="btn btn-secondary" @click.prevent="gotovoTrenutneTipAparata"><span class="fa fa-step-backward"></span>{{ ' nazad'}}</button>
              <button class="btn btn-secondary" @click.prevent="gotovo"><span class="fa fa-backward"></span>{{ ' POVRATAK'}}</button>
            </div>
          </div>
        </vuestic-widget>  
        <vuestic-widget v-if="iftpTehno" headerText="Trenutne Postavke - Tehnologija aparata ">  
          <div class="table-responsive">
            <table v-if="tabelaUslov2" class="table table-striped first-td-padding">
              <thead>
                <tr>
                  <td>{{"Tehnologija Aparata"}}</td>
                  <td v-if="$store.state.userId === 'admin@atom.ba'">{{"akcija"}}</td>
                </tr>
              </thead>
              <tbody>
                <tr v-for="element in trenutneTehnologije">
                  <td>{{element.tehnologijaAparata}}</td>
                  <td v-if="$store.state.userId === 'admin@atom.ba'">
                    <button title='Brisanje zapisa' v-bind:id="element._id" class="btn btn-danger btn-micro" @click="catchDialog($event)"><span v-bind:id="element._id" class="fa fa-trash-o"></span>{{ ' IZBRIŠI' }}</button>
                  </td>
                </tr>
              </tbody>
            </table>
            <vuestic-alert v-if="dataUslov2" type="warning" :withCloseBtn="false"><span>{{dataAvailable2}}</span></vuestic-alert>
            <vuestic-alert v-if="dataUslovDanger" type="danger" :withCloseBtn="false"><span>{{dataAvailable}}</span></vuestic-alert>
          </div>
          <hr>
          <div class="row">
            <div class="col-md-3"></div>
            <div class="col-md-6">
              <button v-if="uslov" class="btn btn-secondary" @click.prevent="gotovoTrenutneTehnoAparata"><span class="fa fa-step-backward"></span>{{ ' nazad'}}</button>
              <button class="btn btn-secondary" @click.prevent="gotovo"><span class="fa fa-backward"></span>{{ ' POVRATAK'}}</button>
            </div>
          </div>
        </vuestic-widget>  
        <vuestic-widget v-if="iftpGrupeT" headerText="Trenutne Postavke - Grupe testova ">  
          <div class="table-responsive">
            <table v-if="tabelaUslov3" class="table table-striped first-td-padding">
              <thead>
                <tr>
                  <td>{{"Grupa Testa"}}</td>
                  <td>{{"Sekcija"}}</td>
                  <td v-if="$store.state.userId === 'admin@atom.ba'">{{"akcija"}}</td>
                </tr>
              </thead>
              <tbody>
                <tr v-for="element in trenutneGrupeT">
                  <td>{{element.grupa}}</td>
                  <td>{{element.sekcija.sekcija}}</td>
                  <td v-if="$store.state.userId === 'admin@atom.ba'">
                    <button title='Brisanje zapisa' v-bind:id="element._id" class="btn btn-danger btn-micro" @click="catchDialog($event)"><span v-bind:id="element._id" class="fa fa-trash-o"></span>{{ ' IZBRIŠI' }}</button>
                  </td>
                </tr>
              </tbody>
            </table>
            <vuestic-alert v-if="dataUslov3" type="warning" :withCloseBtn="false"><span>{{dataAvailable3}}</span></vuestic-alert>
            <vuestic-alert v-if="dataUslovDanger" type="danger" :withCloseBtn="false"><span>{{dataAvailable}}</span></vuestic-alert>
          </div>
          <hr>
          <div class="row">
            <div class="col-md-3"></div>
            <div class="col-md-6">
              <button v-if="uslov" class="btn btn-secondary" @click.prevent="gotovoTrenutneGrupe"><span class="fa fa-step-backward"></span>{{ ' nazad'}}</button>
              <button class="btn btn-secondary" @click.prevent="gotovo"><span class="fa fa-backward"></span>{{ ' POVRATAK'}}</button>
            </div>
          </div>
        </vuestic-widget>  
        <vuestic-widget v-if="iftpRefGrupe" headerText="Trenutne Postavke - Referentne grupe ">  
          <div class="table-responsive">
            <table v-if="tabelaUslov4" class="table table-striped first-td-padding">
              <thead>
                <tr>
                  <td>{{"Referentna Grupa"}}</td>
                  <td v-if="$store.state.userId === 'admin@atom.ba'">{{"akcija"}}</td>
                </tr>
              </thead>
              <tbody>
                <tr v-for="element in trenutneRefGrupe">
                  <td>{{element.grupa}}</td>
                  <td v-if="$store.state.userId === 'admin@atom.ba'">
                    <button title='Brisanje zapisa' v-bind:id="element._id" class="btn btn-danger btn-micro" @click="catchDialog($event)"><span v-bind:id="element._id" class="fa fa-trash-o"></span>{{ ' IZBRIŠI' }}</button>
                  </td>
                </tr>
              </tbody>
            </table>
            <vuestic-alert v-if="dataUslov4" type="warning" :withCloseBtn="false"><span>{{dataAvailable4}}</span></vuestic-alert>
            <vuestic-alert v-if="dataUslovDanger" type="danger" :withCloseBtn="false"><span>{{dataAvailable}}</span></vuestic-alert>
          </div>
          <hr>
          <div class="row">
            <div class="col-md-3"></div>
            <div class="col-md-6">
              <button v-if="uslov" class="btn btn-secondary" @click.prevent="gotovoTrenutneRef"><span class="fa fa-step-backward"></span>{{ ' nazad'}}</button>
              <button class="btn btn-secondary" @click.prevent="gotovo"><span class="fa fa-backward"></span>{{ ' POVRATAK'}}</button>
            </div>
          </div>
        </vuestic-widget>  
        <vuestic-widget v-if="iftpJedinice" headerText="Trenutne Postavke - Mjerne jedinice ">  
          <div class="table-responsive">
            <table v-if="tabelaUslov5" class="table table-striped first-td-padding">
              <thead>
                <tr>
                  <td>{{"Jedinica"}}</td>
                  <td v-if="$store.state.userId === 'admin@atom.ba'">{{"akcija"}}</td>
                </tr>
              </thead>
              <tbody>
                <tr v-for="element in trenutneJedinice">
                  <td>{{element.jedinica}}</td>
                  <td v-if="$store.state.userId === 'admin@atom.ba'">
                    <button title='Brisanje zapisa' v-bind:id="element._id" class="btn btn-danger btn-micro" @click="catchDialog($event)"><span v-bind:id="element._id" class="fa fa-trash-o"></span>{{ ' IZBRIŠI' }}</button>
                  </td>
                </tr>
              </tbody>
            </table>
            <vuestic-alert v-if="dataUslov5" type="warning" :withCloseBtn="false"><span>{{dataAvailable5}}</span></vuestic-alert>
            <vuestic-alert v-if="dataUslovDanger" type="danger" :withCloseBtn="false"><span>{{dataAvailable}}</span></vuestic-alert>
          </div>
          <hr>
          <div class="row">
            <div class="col-md-3"></div>
            <div class="col-md-6">
              <button v-if="uslov" class="btn btn-secondary" @click.prevent="gotovoTrenutneUnit"><span class="fa fa-step-backward"></span>{{ ' nazad'}}</button>
              <button class="btn btn-secondary" @click.prevent="gotovo"><span class="fa fa-backward"></span>{{ ' POVRATAK'}}</button>
            </div>
          </div>
        </vuestic-widget>  
        <vuestic-widget v-if="iftptipUzorka" headerText="Trenutne Postavke - Tipovi uzorka ">  
          <div class="table-responsive">
            <table v-if="tabelaUslov6" class="table table-striped first-td-padding">
              <thead>
                <tr>
                  <td>{{"Tip Uzorka"}}</td>
                  <td v-if="$store.state.userId === 'admin@atom.ba'">{{"akcija"}}</td>
                </tr>
              </thead>
              <tbody>
                <tr v-for="element in trenutnitipUzorka">
                  <td>{{element.tip}}</td>
                  <td v-if="$store.state.userId === 'admin@atom.ba'">
                    <button title='Brisanje zapisa' v-bind:id="element._id" class="btn btn-danger btn-micro" @click="catchDialog($event)"><span v-bind:id="element._id" class="fa fa-trash-o"></span>{{ ' IZBRIŠI' }}</button>
                  </td>
                </tr>
              </tbody>
            </table>
            <vuestic-alert v-if="dataUslov6" type="warning" :withCloseBtn="false"><span>{{dataAvailable6}}</span></vuestic-alert>
            <vuestic-alert v-if="dataUslovDanger" type="danger" :withCloseBtn="false"><span>{{dataAvailable}}</span></vuestic-alert>
          </div>
          <hr>
          <div class="row">
            <div class="col-md-3"></div>
            <div class="col-md-6">
              <button v-if="uslov" class="btn btn-secondary" @click.prevent="gotovoTrenutneTipUzorka"><span class="fa fa-step-backward"></span>{{ ' nazad'}}</button>
              <button class="btn btn-secondary" @click.prevent="gotovo"><span class="fa fa-backward"></span>{{ ' POVRATAK'}}</button>
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
        postavkaSelected: '',
        postavkaOpcije: [],
        ifTipAparata: false,
        ifTehnologijaAparata: false,
        ifGrupaTesta: false,
        ifReferentnaGrupa: false,
        ifJedinica: false,
        iftipUzorka: false,
        tipAparata: '',
        tehnologijaAparata: '',
        grupaTestova: '',
        referentnaGrupa: '',
        jedinica: '',
        tipUzorka: '',
        sekcija: '',
        sekcije: [],
        ifButton: false,
        ifTrenutnePostavke: false,
        ifForm: true,
        prikaziTekst: 'Trenutne postavke',
        uslov: false,
        trenutniTipovi: '',
        trenutneTehnologije: '',
        trenutneGrupeT: '',
        trenutneRefGrupe: '',
        trenutneJedinice: '',
        trenutnitipUzorka: '',
        show: true,
        iftpTip: false,
        iftpTehno: false,
        iftpGrupeT: false,
        iftpRefGrupe: false,
        iftpJedinice: false,
        iftptipUzorka: false,
        dataAvailable1: '',
        dataAvailable2: '',
        dataAvailable3: '',
        dataAvailable4: '',
        dataAvailable5: '',
        dataAvailable6: '',
        dataUslov1: false,
        dataUslov2: false,
        dataUslov3: false,
        dataUslov4: false,
        dataUslov5: false,
        dataUslov6: false,
        infoDanger: false,
        infoSuccess: false,
        infoWarning: false,
        infoInfo: false,
        tabelaUslov1: false,
        tabelaUslov2: false,
        tabelaUslov3: false,
        tabelaUslov4: false,
        tabelaUslov5: false,
        tabelaUslov6: false,
        dataUslovDanger: false,
        defaultGrupa: 'SVI',
        nemaRef: false,
  
        toastText: '',
        toastIcon: '',
        toastPosition: '',
        toastDuration: 2500,
        isToastFullWidth: false,
        className: ''
      }
    },
    name: 'chpwd',
  
    created: function() {
      this.catchData()
    },
    mounted() {
      http.post('postavke/generalno', {
          ok: "Post za tip postavke",
          token: this.$store.state.token,
          site: this.$store.state.site
        })
        .then(res => {
          this.postavkaOpcije = res.data.obj.data
          this.sekcije = res.data.obj.sekcije
          if (this.sekcije.length == 0) {
            this.sekcije.push('NEMA PODATAKA')
          }
        })
  
      http.get('postavke/list?token=' + this.$store.state.token+ '&site=' + this.$store.state.site, {})
        .then(res => {
          if (res.data.success === false) {} else {
            this.trenutneRefGrupe = res.data.data.refgrupa
          }
        }).then(res => {
          var i = 0
          this.trenutneRefGrupe.forEach(element => {
            if (element.grupa.toUpperCase().trim() === this.defaultGrupa) {
              i++
            }
          })
  
        }).then(res => {
  
          if (this.nemaRef) {
  
            http.post('postavke/save', {
                email: this.$store.state.userId,
                tipAparata: '',
                tehnologijaAparata: '',
                grupa: '',
                sekcija: '',
                referentnaGrupa: this.defaultGrupa,
                jedinica: '',
                tipUzorka: '',
                token: this.$store.state.token,
                site: this.$store.state.site
              })
              .then(res => {
                if (res.data.success === false) {} else {
                  this.catchData()
                }
              })
          }
        })
    },
    watch: {
      postavkaSelected: function() {
  
        if (new String(this.postavkaSelected).valueOf() === new String("TIP APARATA").valueOf()) {
          this.ifTipAparata = true
          this.ifTehnologijaAparata = false
          this.ifGrupaTesta = false
          this.ifReferentnaGrupa = false
          this.ifJedinica = false
          this.iftipUzorka = false
          this.ifButton = true
          this.uslov = true
          this.tipAparata = ''
          this.tehnologijaAparata = ''
          this.grupaTestova = ''
          this.sekcija = ''
          this.referentnaGrupa = ''
          this.jedinica = ''
          this.tipUzorka = ''
        }
  
        if (new String(this.postavkaSelected).valueOf() === new String("TEHNOLOGIJA APARATA").valueOf()) {
          this.ifTipAparata = false
          this.ifTehnologijaAparata = true
          this.ifGrupaTesta = false
          this.ifReferentnaGrupa = false
          this.ifJedinica = false
          this.iftipUzorka = false
          this.ifButton = true
          this.uslov = true
          this.tipAparata = ''
          this.grupaTestova = ''
          this.sekcija = ''
          this.referentnaGrupa = ''
          this.jedinica = ''
          this.tipUzorka = ''
        }
  
        if (new String(this.postavkaSelected).valueOf() === new String("GRUPE TESTOVA").valueOf()) {
          this.ifTipAparata = false
          this.ifTehnologijaAparata = false
          this.ifGrupaTesta = true
          this.ifReferentnaGrupa = false
          this.ifJedinica = false
          this.iftipUzorka = false
          this.ifButton = true
          this.uslov = true
          this.tipAparata = ''
          this.tehnologijaAparata = ''
          this.referentnaGrupa = ''
          this.jedinica = ''
          this.tipUzorka = ''
        }
  
        if (new String(this.postavkaSelected).valueOf() === new String("REFERENTNE GRUPE").valueOf()) {
          this.ifTipAparata = false
          this.ifTehnologijaAparata = false
          this.ifGrupaTesta = false
          this.ifReferentnaGrupa = true
          this.ifJedinica = false
          this.iftipUzorka = false
          this.ifButton = true
          this.uslov = true
          this.tipAparata = ''
          this.tehnologijaAparata = ''
          this.grupaTestova = ''
          this.sekcija = ''
          this.jedinica = ''
          this.tipUzorka = ''
        }
  
        if (new String(this.postavkaSelected).valueOf() === new String("MJERNE JEDINICE").valueOf()) {
          this.ifTipAparata = false
          this.ifTehnologijaAparata = false
          this.ifGrupaTesta = false
          this.ifReferentnaGrupa = false
          this.ifJedinica = true
          this.iftipUzorka = false
          this.ifButton = true
          this.uslov = true
          this.tipAparata = ''
          this.tehnologijaAparata = ''
          this.grupaTestova = ''
          this.sekcija = ''
          this.referentnaGrupa = ''
          this.tipUzorka = ''
        }
        if (new String(this.postavkaSelected).valueOf() === new String("TIPOVI UZORKA").valueOf()) {
          this.ifTipAparata = false
          this.ifTehnologijaAparata = false
          this.ifGrupaTesta = false
          this.ifReferentnaGrupa = false
          this.ifJedinica = false
          this.iftipUzorka = true
          this.ifButton = true
          this.uslov = true
          this.tipAparata = ''
          this.tehnologijaAparata = ''
          this.grupaTestova = ''
          this.sekcija = ''
          this.referentnaGrupa = ''
          this.jedinica = ''
        }
  
        if (new String(this.postavkaSelected).valueOf() === new String("GREŠKA - DB Connection").valueOf()) {
          
        }
      }
    },
    methods: {
      dodajPostavku: function() {
        var item = true
  
        if ((this.postavkaSelected === "TIP APARATA") && (this.tipAparata.toUpperCase().trim() === '')) {
          item = false
          this.toastText = 'Unesite tip aparata!'
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
        if ((this.postavkaSelected === "TEHNOLOGIJA APARATA") && (this.tehnologijaAparata.toUpperCase().trim() === '')) {
          item = false
          this.toastText = 'Unesite tehnologiju aparata!'
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
  
        if ((this.postavkaSelected === "GRUPE TESTOVA") && ((this.grupaTestova.toUpperCase().trim() === '') || (this.sekcija.toUpperCase().trim() === ''))) {
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
        } else if ((this.postavkaSelected === "GRUPE TESTOVA") && (this.sekcija.toUpperCase().trim() === 'NEMA PODATAKA')) {
          item = false          
        }
        if ((this.postavkaSelected === "REFERENTNE GRUPE") && (this.referentnaGrupa.toUpperCase().trim() === '')) {
          item = false
          this.toastText = 'Unesite referentnu grupu!'
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
  
        if ((this.postavkaSelected === "MJERNE JEDINICE") && (this.jedinica.toUpperCase().trim() === '')) {
          item = false
          this.toastText = 'Unesite mjernu jedinicu!'
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
  
        if ((this.postavkaSelected === "TIPOVI UZORKA") && (this.tipUzorka.trim() === '')) {
          item = false
          this.toastText = 'Unesite tip uzorka!'
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
  
        if ((this.postavkaSelected === "TIP APARATA") && (this.tipAparata.toUpperCase().trim() != '')) {
  
          var i = 0
          for (i = 0; i < this.trenutniTipovi.length; i++) {  
            if ((this.tipAparata.toUpperCase().trim() === this.trenutniTipovi[i].tipAparata)) {
              item = false
              this.toastText = 'Tip aparata već postoji!'
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
  
        if ((this.postavkaSelected === "TEHNOLOGIJA APARATA") && (this.tehnologijaAparata.toUpperCase().trim() != '')) {  
          var i = 0
          for (i = 0; i < this.trenutneTehnologije.length; i++) {  
            if ((this.tehnologijaAparata.toUpperCase().trim() === this.trenutneTehnologije[i].tehnologijaAparata)) {
              item = false
              this.toastText = 'Tehnologija aparata već postoji!'
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
  
        if ((this.postavkaSelected === "GRUPE TESTOVA") && (this.grupaTestova.toUpperCase().trim() != '')) {
  
          var i = 0
          for (i = 0; i < this.trenutneGrupeT.length; i++) {
  
            if ((this.grupaTestova.toUpperCase().trim() === this.trenutneGrupeT[i].grupa)) {
              item = false
              this.toastText = 'Grupa testa već postoji!'
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
  
        if ((this.postavkaSelected === "REFERENTNE GRUPE") && (this.referentnaGrupa.toUpperCase().trim() != '')) {
  
          var i = 0
          for (i = 0; i < this.trenutneRefGrupe.length; i++) {
  
            if ((this.referentnaGrupa.toUpperCase().trim() === this.trenutneRefGrupe[i].grupa)) {
              item = false
              this.toastText = 'Referentna grupa već postoji!'
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
  
        if ((this.postavkaSelected === "MJERNE JEDINICE") && (this.jedinica.toUpperCase().trim() != '')) {
  
          var i = 0
          for (i = 0; i < this.trenutneJedinice.length; i++) {
  
            if ((this.jedinica.trim() === this.trenutneJedinice[i].jedinica)) {
              item = false
              this.toastText = 'Mjerna jedinica već postoji!'
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
  
        if ((this.postavkaSelected === "TIPOVI UZORKA") && (this.tipUzorka.trim() != '')) {
  
          var i = 0
          for (i = 0; i < this.trenutnitipUzorka.length; i++) {
  
            if ((this.tipUzorka.trim() === this.trenutnitipUzorka[i].tip)) {
              item = false
              this.toastText = 'Tip uzorka već postoji!'
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
  
        if (item) {
  
          http.post('postavke/save', {
              email: this.$store.state.userId,
              tipAparata: this.tipAparata.toUpperCase().trim(),
              tehnologijaAparata: this.tehnologijaAparata.toUpperCase().trim(),
              grupa: this.grupaTestova.toUpperCase().trim(),
              sekcija: this.sekcija.toUpperCase().trim(),
              referentnaGrupa: this.referentnaGrupa.toUpperCase().trim(),
              jedinica: this.jedinica.trim(),
              tipUzorka: this.tipUzorka.trim(),
              token: this.$store.state.token,
              site:this.$store.state.site
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
  
                this.tipAparata = ''
                this.tehnologijaAparata = ''
                this.grupaTestova = ''
                this.sekcija = ''
                this.referentnaGrupa = ''
                this.jedinica = ''
                this.tipUzorka = ''
                this.catchData()
              }
            })
        }
      },
      prikaziPostavke: function() {
        http.get('postavke/list?token=' + this.$store.state.token+ '&site=' + this.$store.state.site, {})
          .then(res => {
  
            if (res.data.success === false) {
              this.dataAvailable = 'Greška prilikom čitanja iz baze.'
              this.dataUslovDanger = true
              this.dataUslov1 = false
              this.tabelaUslov1 = false
              this.dataUslov2 = false
              this.tabelaUslov2 = false
              this.dataUslov3 = false
              this.tabelaUslov3 = false
              this.dataUslov4 = false
              this.tabelaUslov4 = false
              this.dataUslov5 = false
              this.tabelaUslov5 = false
              this.dataUslov6 = false
              this.tabelaUslov6 = false
            } else {
  
              this.trenutniTipovi = res.data.data.tip
              this.trenutneTehnologije = res.data.data.tehno
              this.trenutneGrupeT = res.data.data.grupa
              this.trenutneRefGrupe = res.data.data.refgrupa
              this.trenutneJedinice = res.data.data.jedinice
              this.trenutnitipUzorka = res.data.data.tipUzorka
  
              if (this.trenutniTipovi.length > 0) {
                this.dataAvailable1 = ''
                this.dataUslov1 = false
                this.tabelaUslov1 = true
                this.dataUslovDanger = false
              }
  
              if (this.trenutniTipovi.length <= 0) {
                this.dataAvailable1 = 'Nema dostupnih podataka.'
                this.dataUslov1 = true
                this.tabelaUslov1 = false
                this.dataUslovDanger = false
              }
  
              if (this.trenutneTehnologije.length > 0) {
                this.dataAvailable2 = ''
                this.dataUslov2 = false
                this.tabelaUslov2 = true
                this.dataUslovDanger = false
              }
  
              if (this.trenutneTehnologije.length <= 0) {
                this.dataAvailable2 = 'Nema dostupnih podataka.'
                this.dataUslov2 = true
                this.tabelaUslov2 = false
                this.dataUslovDanger = false
              }
  
              if (this.trenutneGrupeT.length) {
                this.dataAvailable3 = ''
                this.dataUslov3 = false
                this.tabelaUslov3 = true
                this.dataUslovDanger = false
              }
  
              if (!this.trenutneGrupeT.length) {                
                this.dataAvailable3 = 'Nema dostupnih podataka.'
                this.dataUslov3 = true
                this.tabelaUslov3 = false
                this.dataUslovDanger = false
              }
  
              if (this.trenutneRefGrupe.length > 0) {
                this.dataAvailable4 = ''
                this.dataUslov4 = false
                this.tabelaUslov4 = true
                this.dataUslovDanger = false
              }
  
              if (this.trenutneRefGrupe.length <= 0) {
                this.dataAvailable4 = 'Nema dostupnih podataka.'
                this.dataUslov4 = true
                this.tabelaUslov4 = false
                this.dataUslovDanger = false
              }
  
              if (this.trenutneJedinice.length > 0) {
                this.dataAvailable5 = ''
                this.dataUslov5 = false
                this.tabelaUslov5 = true
                this.dataUslovDanger = false
              }
  
              if (this.trenutneJedinice.length <= 0) {
                this.dataAvailable5 = 'Nema dostupnih podataka.'
                this.dataUslov5 = true
                this.tabelaUslov5 = false
                this.dataUslovDanger = false
              }
  
              if (this.trenutnitipUzorka.length > 0) {
                this.dataAvailable6 = ''
                this.dataUslov6 = false
                this.tabelaUslov6 = true
                this.dataUslovDanger = false
              }
  
              if (this.trenutnitipUzorka.length <= 0) {
                this.dataAvailable6 = 'Nema dostupnih podataka.'
                this.dataUslov6 = true
                this.tabelaUslov6 = false
                this.dataUslovDanger = false
              }
            }
          })
  
        if (this.ifTipAparata) {
          this.ifForm = false
          this.iftpTip = true
        }
  
        if (this.ifTehnologijaAparata) {
          this.ifForm = false
          this.iftpTehno = true
        }
  
        if (this.ifGrupaTesta) {
          this.ifForm = false
          this.iftpGrupeT = true
        }
  
        if (this.ifReferentnaGrupa) {
          this.ifForm = false
          this.iftpRefGrupe = true
        }
  
        if (this.ifJedinica) {
          this.ifForm = false
          this.iftpJedinice = true
        }
  
        if (this.iftipUzorka) {
          this.ifForm = false
          this.iftptipUzorka = true
        }
      },
      izbrisiTest: function(event) {
        http.post('postavke/delete', {
            email: this.$store.state.userId,
            postavkaSelected: this.postavkaSelected,
            postavkaId: event.target.id,
            token: this.$store.state.token,
            site: this.$store.state.site
          })
          .then(res => {          
            this.trenutniTipovi = res.data.tip
            this.trenutneTehnologije = res.data.tehno
            this.trenutneGrupeT = res.data.grupaT
            this.trenutneRefGrupe = res.data.refgrupa
            this.trenutneJedinice = res.data.jedinice
            this.prikaziPostavke()
            this.prikaziPostavke()
          })
      },
      catchDialog: function(event) {
        this.$dialog.confirm('Jeste li sigurni da želite obrisati zapis?', {
            type: 'hard',
            html: true,
            verification: 'Da'
          })
          .then(() => {
  
            http.post('postavke/delete', {
                email: this.$store.state.userId,
                postavkaSelected: this.postavkaSelected,
                postavkaId: event.target.id,
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
                  this.trenutniTipovi = res.data.tip
                  this.trenutneTehnologije = res.data.tehno
                  this.trenutneGrupeT = res.data.grupaT
                  this.trenutneRefGrupe = res.data.refgrupa
                  this.trenutneJedinice = res.data.jedinice
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
      gotovo: function() {
        this.uslov = false
        this.ifButton = false
  
        this.ifForm = true
        this.iftpTip = false
        this.iftpTehno = false
        this.iftpGrupeT = false
        this.iftptipUzorka = false
        this.iftipUzorka = false
        this.iftpRefGrupe = false
        this.iftpJedinice = false
        this.ifTipAparata = false
        this.ifTehnologijaAparata = false
        this.ifGrupaTesta = false
        this.ifReferentnaGrupa = false
        this.ifJedinica = false
        this.tipAparata = ''
        this.tehnologijaAparata = ''
        this.grupaTestova = ''
        this.sekcija = ''
        this.referentnaGrupa = ''
        this.jedinica = ''
        this.postavkaSelected = ''
        this.tipUzorka = ''
      },
  
      catchData: function() {
        http.get('postavke/list?token=' + this.$store.state.token+ '&site=' + this.$store.state.site, {})
          .then(res => {   
            if (res.data.success === false) {
              this.postavkaOpcije.push('GREŠKA - DB Connection')
              this.sekcije.push('GREŠKA - DB Connection')
            } else {
              
              this.trenutniTipovi = res.data.data.tip
              this.trenutneTehnologije = res.data.data.tehno
              this.trenutneGrupeT = res.data.data.grupa
              this.trenutneRefGrupe = res.data.data.refgrupa
              this.trenutneJedinice = res.data.data.jedinice
              this.trenutnitipUzorka = res.data.data.tipUzorka              
            }  
          })
      },
      gotovoTrenutneTipAparata() {  
        this.ifForm = true
        this.iftpTip = false
        this.tipAparata = ''  
      },
      gotovoTrenutneTehnoAparata() {  
        this.ifForm = true
        this.iftpTehno = false
        this.tehnologijaAparata = ''  
      },
      gotovoTrenutneGrupe() {  
        this.ifForm = true
        this.iftpGrupeT = false
        this.grupaTestova = ''
        this.sekcija = ''  
      },
      gotovoTrenutneRef() {  
        this.ifForm = true
        this.iftpRefGrupe = false
        this.referentnaGrupa = ''  
      },
      gotovoTrenutneUnit() {  
        this.ifForm = true
        this.iftpJedinice = false
        this.jedinica = ''  
      },
      gotovoTrenutneTipUzorka() {  
        this.ifForm = true
        this.iftptipUzorka = false
        this.tipUzorka = ''  
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
