<template>
  <div class="form-elements">
    <div class="row">
      <div class="col-md-12">
        <vuestic-widget :headerText="'pomoc.Pomoc.trnslr001' | translate"> <!-- Pomoć pri korištenju aplikacije -->
          <div class="row">
  
            <div class="col-md-4">
              <fieldset>
                <div class="tree-view-advanced-preview">
                  <vuestic-tree-root ref="treeView">
                    <vuestic-tree-category isOpen :label="'pomoc.Pomoc.trnslr036' | translate"> <!-- Izbornik -->
                      <vuestic-tree-node>
                        <!-- Prijava incidenta -->
                        <a href="#" :class="{'clicked': izbor === $t('pomoc.Pomoc.trnslr002'), 'lnk': izbor != $t('pomoc.Pomoc.trnslr002')}">
                          <div @click="doSomethingOnClick($t('pomoc.Pomoc.trnslr002'))">{{'pomoc.Pomoc.trnslr002' | translate}}</div>
                        </a>
                      </vuestic-tree-node>
                      <vuestic-tree-node>
                        <!-- Pregled incidenata -->
                        <a href="#" :class="{'clicked': izbor === $t('pomoc.Pomoc.trnslr003'), 'lnk': izbor != $t('pomoc.Pomoc.trnslr003')}">
                          <div @click="doSomethingOnClick($t('pomoc.Pomoc.trnslr003'))">{{'pomoc.Pomoc.trnslr003' | translate}}</div>
                        </a>
                      </vuestic-tree-node>
                      <vuestic-tree-node>
                        <!-- Zahtjev za nadogradnjom -->
                        <a href="#" :class="{'clicked': izbor === $t('pomoc.Pomoc.trnslr004'), 'lnk': izbor != $t('pomoc.Pomoc.trnslr004')}">
                          <div @click="doSomethingOnClick($t('pomoc.Pomoc.trnslr004'))">{{'pomoc.Pomoc.trnslr004' | translate}}</div>
                        </a>
                      </vuestic-tree-node>
                      <vuestic-tree-node>
                        <!-- Pregled zahtjeva -->
                        <a href="#" :class="{'clicked': izbor === $t('pomoc.Pomoc.trnslr005'), 'lnk': izbor != $t('pomoc.Pomoc.trnslr005')}">
                          <div @click="doSomethingOnClick($t('pomoc.Pomoc.trnslr005'))">{{'pomoc.Pomoc.trnslr005' | translate}}</div>
                        </a>
                      </vuestic-tree-node>
                      <vuestic-tree-node>
                        <!-- Kontakt -->
                        <a href="#" :class="{'clicked': izbor === $t('pomoc.Pomoc.trnslr006'), 'lnk': izbor != $t('pomoc.Pomoc.trnslr006')}">
                          <div @click="doSomethingOnClick($t('pomoc.Pomoc.trnslr006'))">{{'pomoc.Pomoc.trnslr006' | translate}}</div>
                        </a>
                      </vuestic-tree-node>
                    </vuestic-tree-category>
                  </vuestic-tree-root>
                  <div>
                    <br>
                  </div>
                </div>
              </fieldset>
            </div>
  
            <div v-if="izbor === $t('pomoc.Pomoc.trnslr002')" class="col-md-8"> <!-- Prijava incidenta -->
              <h3>{{'pomoc.Pomoc.trnslr002' | translate}}</h3>
              <br>
              <form>
                <div class="row">
                  <div class="col-md-6">
                    <fieldset>
                      <div class="form-group">
                        <div class="input-group">
                          <input id="simple-input" v-model="korisnik" required/>
                          <label class="control-label" for="simple-input">{{'pomoc.Pomoc.trnslr007' | translate}}</label><i class="bar"></i> <!-- Korisnik -->
                        </div>
                      </div>
                    </fieldset>
                  </div>
                  <div class="col-md-6">
                    <fieldset>
                      <div class="form-group">
                        <div class="input-group">
                          <input id="simple-input" v-model="vrijeme" required/>
                          <label class="control-label" for="simple-input">{{'pomoc.Pomoc.trnslr008' | translate}}</label><i class="bar"></i> <!-- Vrijeme -->
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <fieldset>
                      <div class="form-group">
                        <div class="input-group">
                          <input id="simple-input" v-model="subject" required/>
                          <label class="control-label" for="simple-input">{{'pomoc.Pomoc.trnslr009' | translate}}</label><i class="bar"></i> <!-- Unesite naziv -->
                        </div>
                      </div>
                    </fieldset>
                  </div>
                  <div class="col-md-6">
                    <fieldset>
                      <!-- Izaberite prioritet -->
                      <vuestic-simple-select class="form-group with-icon-right" :label="'pomoc.Pomoc.trnslr010'  | translate" v-model="prioritet" required title=" " name="prioritet" ref="prioritet" v-bind:options="prioriteti">
                      </vuestic-simple-select>
                    </fieldset>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12">
                    <fieldset>
                      <div class="form-group">
                        <div class="input-group">
                          <textarea type="text" id="simple-textarea" v-model="incident" required></textarea>
                          <!-- Opišite incident -->
                          <label class="control-label" for="simple-textarea">{{'pomoc.Pomoc.trnslr011' | translate}}</label><i class="bar"></i>
                        </div>
                      </div>
                      <button class="btn btn-primary" @click.prevent="incidentSave"> 
                        <span class="fa fa-save"></span>
                        &nbsp{{'pomoc.Pomoc.trnslr038' | translate}} <!-- Sačuvaj -->
                      </button>
                    </fieldset>
                  </div>
                </div>
              </form>
            </div>
  
            <div v-if="izbor === $t('pomoc.Pomoc.trnslr003')" class="col-md-8"> <!-- Pregled incidenata -->
              <h3>{{'pomoc.Pomoc.trnslr003' | translate}}</h3>
              <br>
              <form>
                <div v-if="$store.state.userId === 'admin@atom.ba'" class="row">
                  <div class="col-md-6">
                    <fieldset v-if="uredi">
                      <!-- Izaberite lokaciju -->
                      <vuestic-simple-select class="form-group with-icon-right" :label="'pomoc.Pomoc.trnslr012' | translate" v-model="lokacija" required title=" " name="prioritet" ref="prioritet" v-bind:options="sites">
                      </vuestic-simple-select>
                    </fieldset>
                    <div v-if="!uredi" class="form-group ">
                      <div class="input-group">
                        <input disabled id="input-icon-left" title=" " required/>
                        <label class="control-label">{{lokacija}}</label><i class="bar"></i>
                      </div>
                    </div>
  
                  </div>
                  <div class="col-md-6">
                    <fieldset v-if="uredi">
                      <!-- Izaberite status -->
                      <vuestic-simple-select class="form-group with-icon-right" :label="'pomoc.Pomoc.trnslr013' | translate" v-model="status" required title=" " name="prioritet" ref="prioritet" v-bind:options="statusi">
                      </vuestic-simple-select>
                    </fieldset>
                    <div v-if="!uredi" class="form-group ">
                      <div class="input-group">
                        <input disabled id="input-icon-left" title=" " required/>
                        <label class="control-label">{{status}}</label><i class="bar"></i>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="sviIncidenti.length" class="row">
                  <div class="col-md-12">
                    <div class="table-responsive">
                      <table class="table table-striped first-td-padding">
                        <thead>
                          <tr>
                            <td>{{'pomoc.Pomoc.trnslr014' | translate}}</td> <!-- Naziv -->
                            <td v-if="$store.state.userId === 'admin@atom.ba'">{{'pomoc.Pomoc.trnslr007' | translate}}</td> <!-- Korisnik -->
                            <td>{{'pomoc.Pomoc.trnslr015' | translate}}</td> <!-- Prioritet -->
                            <td>{{'pomoc.Pomoc.trnslr016' | translate}}</td> <!-- Status -->
                            <td v-if="$store.state.userId === 'admin@atom.ba'">{{'pomoc.Pomoc.trnslr041' | translate}}</td> <!-- Uredi --> 
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="inc in sviIncidenti" v-bind:class="{'table-danger': inc.status === 'NOVI', 
                            'table-success': inc.status === 'ZATVOREN', 
                            'table-warning': inc.status === 'U OBRADI', 
                            'table-info': inc.status === 'NA ČEKANJU'}">
  
                            <td>{{inc.subject}}</td>
                            <td v-if="$store.state.userId === 'admin@atom.ba'">{{inc.email}}</td>
                            <td>{{inc.priority}}</td>
                            <td v-if="tmpID != inc._id">{{inc.status}}</td>
                            <td v-if="tmpID === inc._id">
                              <div v-show="edit === false">
                                <label>{{inc.status}}</label>
                              </div>
                              <select v-show="edit === true" v-model="inc.status">
                                <option v-for="option in statusiEdit" >
                                  {{ option }}
                                </option>
                              </select>
                            </td>
                            <td v-if="$store.state.userId === 'admin@atom.ba'">
                              <button :disabled="edit" v-if="tmpID != inc._id" @click.prevent="editIncident($event, inc.status)" :title="'pomoc.Pomoc.trnslr031' | translate" v-bind:id="inc._id" class="btn btn-micro btn-info"><span v-bind:id="inc._id" class="glyphicon glyphicon-edit"></span>{{''}}</button> <!-- Uredite podatke -->
                              <button :disabled="edit" v-if="uredi && tmpID === inc._id" @click.prevent="editIncident($event, inc.status)" :title="'pomoc.Pomoc.trnslr031' | translate" v-bind:id="inc._id" class="btn btn-micro btn-info"><span v-bind:id="inc._id" class="glyphicon glyphicon-edit"></span>{{''}}</button> <!-- Uredite podatke -->
                              <!-- Sačuvajte izmjene -->
                              <button v-if="!uredi && tmpID === inc._id" @click.prevent="saveIncident($event, inc.status)" :title="'pomoc.Pomoc.trnslr037' | translate" v-bind:id="inc._id" class="btn btn-micro btn-secondary"><span v-bind:id="inc._id" class="fa fa-save"></span>{{''}}</button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div v-if="!sviIncidenti.length" class="row">
                  <div class="col-md-12">
                    <fieldset>
                      <div class="form-group">
                        <div class="input-group">
                          <span>{{'pomoc.Pomoc.trnslr017' | translate}}</span> <!-- Nema dostupnih podataka. -->
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </div>
              </form>
            </div>
  
            <div v-if="izbor === $t('pomoc.Pomoc.trnslr004')" class="col-md-8"> <!-- Zahtjev za nadogradnjom -->
              <h3>{{'pomoc.Pomoc.trnslr004' | translate}}</h3>
              <br>
              <form>
                <div class="row">
                  <div class="col-md-6">
                    <fieldset>
                      <div class="form-group">
                        <div class="input-group">
                          <input id="simple-input" v-model="korisnik" required/>
                          <label class="control-label" for="simple-input">{{'pomoc.Pomoc.trnslr007' | translate}}</label><i class="bar"></i> <!-- Korisnik -->
                        </div>
                      </div>
                    </fieldset>
                  </div>
                  <div class="col-md-6">
                    <fieldset>
                      <div class="form-group">
                        <div class="input-group">
                          <input id="simple-input" v-model="vrijeme" required/>
                          <label class="control-label" for="simple-input">{{'pomoc.Pomoc.trnslr008' | translate}}</label><i class="bar"></i> <!-- Vrijeme -->
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <fieldset>
                      <div class="form-group">
                        <div class="input-group">
                          <input id="simple-input" v-model="subject" required/>
                          <label class="control-label" for="simple-input">{{'pomoc.Pomoc.trnslr009' | translate}}</label><i class="bar"></i> <!-- Unesite naziv -->
                        </div>
                      </div>
                    </fieldset>
                  </div>
                  <div class="col-md-6">
                    <fieldset>
                      <!-- Izaberite prioritet -->
                      <vuestic-simple-select class="form-group with-icon-right" :label="'pomoc.Pomoc.trnslr010' | translate" v-model="prioritet" required title=" " name="prioritet" ref="prioritet" v-bind:options="prioriteti">
                      </vuestic-simple-select>
                    </fieldset>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12">
                    <fieldset>
                      <div class="form-group">
                        <div class="input-group">
                          <textarea type="text" id="simple-textarea" v-model="request" required></textarea>
                          <!-- Unesite zahtjev -->
                          <label class="control-label" for="simple-textarea">{{'pomoc.Pomoc.trnslr018' | translate}}</label><i class="bar"></i>
                        </div>
                      </div>
                      <button class="btn btn-primary" @click.prevent="requestSave"> 
                        <span class="fa fa-save"></span>
                        &nbsp{{'pomoc.Pomoc.trnslr038' | translate}} <!-- Sačuvaj -->
                      </button>
                    </fieldset>
                  </div>
                </div>
              </form>
            </div>
  
            <div v-if="izbor === $t('pomoc.Pomoc.trnslr005')" class="col-md-8"> <!-- Pregled zahtjeva -->
              <h3>{{'pomoc.Pomoc.trnslr005' | translate}}</h3>
              <br>
              <form>
                <div v-if="$store.state.userId === 'admin@atom.ba'" class="row">
                  <div class="col-md-6">
                    <fieldset v-if="uredi">
                      <!-- Izaberite lokaciju -->
                      <vuestic-simple-select class="form-group with-icon-right" :label="'pomoc.Pomoc.trnslr012' | translate" v-model="lokacija" required title=" " name="prioritet" ref="prioritet" v-bind:options="sites">
                      </vuestic-simple-select>
                    </fieldset>
                    <div v-if="!uredi" class="form-group ">
                      <div class="input-group">
                        <input disabled id="input-icon-left" title=" " required/>
                        <label class="control-label">{{lokacija}}</label><i class="bar"></i>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <fieldset v-if="uredi">
                      <!-- Izaberite status -->
                      <vuestic-simple-select class="form-group with-icon-right" :label="'pomoc.Pomoc.trnslr013' | translate" v-model="status" required title=" " name="prioritet" ref="prioritet" v-bind:options="statusi">
                      </vuestic-simple-select>
                    </fieldset>
                    <div v-if="!uredi" class="form-group ">
                      <div class="input-group">
                        <input disabled id="input-icon-left" title=" " required/>
                        <label class="control-label">{{lokacija}}</label><i class="bar"></i>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="sviZahtjevi.length" class="row">
                  <div class="col-md-12">
                    <div class="table-responsive">
                      <table class="table table-striped first-td-padding">
                        <thead>
                          <tr>
                            <td>{{'pomoc.Pomoc.trnslr014' | translate}}</td> <!-- Naziv -->
                            <td v-if="$store.state.userId === 'admin@atom.ba'">{{'pomoc.Pomoc.trnslr007' | translate}}</td> <!-- Korisnik -->
                            <td>{{'pomoc.Pomoc.trnslr015' | translate}}</td> <!-- Prioritet -->
                            <td>{{'pomoc.Pomoc.trnslr016' | translate}}</td> <!-- Status -->
                            <td v-if="$store.state.userId === 'admin@atom.ba'">{{'pomoc.Pomoc.trnslr041' | translate}}</td> <!-- Uredi -->  
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="zahtjev in sviZahtjevi" v-bind:class="{'table-danger': zahtjev.status === 'NOVI', 
                            'table-success': zahtjev.status === 'ZATVOREN', 
                            'table-warning': zahtjev.status === 'U OBRADI', 
                            'table-info': zahtjev.status === 'NA ČEKANJU'}">
  
                            <td>{{zahtjev.subject}}</td>
                            <td v-if="$store.state.userId === 'admin@atom.ba'">{{zahtjev.email}}</td>
                            <td>{{zahtjev.priority}}</td>
                            <td v-if="tmpID != zahtjev._id">{{zahtjev.status}}</td>
                            <td v-if="tmpID === zahtjev._id">
                              <div v-show="edit === false">
                                <label>{{zahtjev.status}}</label>
                              </div>
                              <select v-show="edit === true" v-model="zahtjev.status">
                                <option v-for="option in statusiEdit" >
                                  {{ option }}
                                </option>
                              </select>
                            </td>
                            <td v-if="$store.state.userId === 'admin@atom.ba'">
                              <button :disabled="edit" v-if="tmpID != zahtjev._id" @click.prevent="editRequest($event, zahtjev.status)" :title="'pomoc.Pomoc.trnslr031' | translate" v-bind:id="zahtjev._id" class="btn btn-micro btn-info"><span v-bind:id="zahtjev._id" class="glyphicon glyphicon-edit"></span>{{''}}</button> <!-- Uredite podatke -->
                              <button :disabled="edit" v-if="uredi && tmpID === zahtjev._id" @click.prevent="editRequest($event, zahtjev.status)" :title="'pomoc.Pomoc.trnslr031' | translate" v-bind:id="zahtjev._id" class="btn btn-micro btn-info"><span v-bind:id="zahtjev._id" class="glyphicon glyphicon-edit"></span>{{''}}</button> <!-- Uredite podatke -->
                              <!-- Sačuvajte izmjene -->
                              <button v-if="!uredi && tmpID === zahtjev._id" @click.prevent="saveRequest($event, zahtjev.status)" :title="'pomoc.Pomoc.trnslr037' | translate" v-bind:id="zahtjev._id" class="btn btn-micro btn-secondary"><span v-bind:id="zahtjev._id" class="fa fa-save"></span>{{''}}</button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div v-if="!sviZahtjevi.length" class="row">
                  <div class="col-md-12">
                    <fieldset>
                      <div class="form-group">
                        <div class="input-group">
                          <span>{{'pomoc.Pomoc.trnslr017' | translate}}</span> <!-- Nema dostupnih podataka. -->
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </div>
              </form>
            </div>
  
            <div v-if="izbor === $t('pomoc.Pomoc.trnslr006')" class="col-md-8"> <!-- Kontakt -->
              <h3>{{'pomoc.Pomoc.trnslr019' | translate}}</h3> <!-- Kontaktirajte nas -->
              <br>
              <form>
                <div class="row">
                  <div class="col-md-6">
                    <fieldset>
                      <div class="form-group">
                        <div class="input-group">
                          <input id="simple-input" v-model="korisnik" required/>
                          <label class="control-label" for="simple-input">{{'pomoc.Pomoc.trnslr007' | translate}}</label><i class="bar"></i> <!-- Korisnik -->
                        </div>
                      </div>
                    </fieldset>
                  </div>
                  <div class="col-md-6">
                    <fieldset>
                      <div class="form-group">
                        <div class="input-group">
                          <input id="simple-input" v-model="primalac" required/>
                          <!-- Primalac -->
                          <label class="control-label" for="simple-input">{{'pomoc.Pomoc.trnslr020' | translate}}</label><i class="bar"></i>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <fieldset>
                      <div class="form-group">
                        <div class="input-group">
                          <input id="simple-input" v-model="subject" required/>
                          <label class="control-label" for="simple-input">{{'pomoc.Pomoc.trnslr009' | translate}}</label><i class="bar"></i> <!-- Unesite naziv -->
                        </div>
                      </div>
                    </fieldset>
                  </div>
                  <div class="col-md-6">
                    <fieldset>
                      <div class="form-group">
                        <div class="input-group">
                          <input id="simple-input" v-model="telefon" required/>
                          <!-- Unesite kontakt telefon -->
                          <label class="control-label" for="simple-input">{{'pomoc.Pomoc.trnslr021' | translate}}</label><i class="bar"></i>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12">
                    <fieldset>
                      <div class="form-group">
                        <div class="input-group">
                          <textarea type="text" id="simple-textarea" v-model="poruka" required></textarea>
                          <!-- Unesite poruku -->
                          <label class="control-label" for="simple-textarea">{{'pomoc.Pomoc.trnslr022' | translate}}</label><i class="bar"></i>
                        </div>
                      </div>
                      <button class="btn btn-primary" @click.prevent="messageSave"> 
                        <span class="glyphicon glyphicon-send"></span>
                        &nbsp{{'pomoc.Pomoc.trnslr039' | translate}} <!-- Pošalji --> 
                      </button>
                    </fieldset>
                  </div>
                </div>
              </form>
            </div>
  
          </div>
        </vuestic-widget>
      </div>
    </div>
  </div>
</template>

<script>
  import {http} from '../../../config/config.js'
  import {parseBoth} from '../funkcije/shared/flatpickr.js'
  
  export default {
    data() {
      return {
        izbor: this.$t('pomoc.Pomoc.trnslr006'), // Kontakt
        incident: '',
        request: '',
        poruka: '',
        subject: '',
        korisnik: '',
        telefon: '',
        primalac: this.$t('pomoc.Pomoc.trnslr023'), // AP Solutions d.o.o. 
        vrijeme: '',
        prioritet: 'NORMALAN',
        prioriteti: ['NORMALAN', 'HITAN'],
        toastText: '',
        toastIcon: '',
        toastPosition: '',
        toastDuration: 2500,
        isToastFullWidth: false,
        className: '',
        sviIncidenti: [],
        sviZahtjevi: [],
        lokacija: 'SVE LOKACIJE',
        lokacijaID: '',
        sites: [],
        sitesExtended: [],
        status: 'SVI STATUSI',
        statusi: ['NOVI', 'NA ČEKANJU', 'U OBRADI', 'ZATVOREN', 'SVI STATUSI'],
        statusiEdit: ['NOVI', 'NA ČEKANJU', 'U OBRADI', 'ZATVOREN'],
        tmpID: '',
        tmpStatus: '',
        edit: false,
        uredi: true
      }
    },
    name: 'help',
  
    watch: {
      korisnik: function() {
        this.korisnik = this.$store.state.userId
      },
      primalac: function() {
        this.primalac = this.$t('pomoc.Pomoc.trnslr023') // AP Solutions d.o.o.
      },
      vrijeme: function() {
        this.vrijeme = parseBoth(Date(Date.now()))
      },
      lokacija: function() {
        this.lokacijaID = ''
        this.sitesExtended.forEach(element => {
          if (this.lokacija === element.naziv) {
            this.lokacijaID = element._id
            this.dohvatiZahtjeveIncidente()
          }
        })
      },
      status: function() {
        this.dohvatiZahtjeveIncidente()
      }
    },
  
    created() {
      this.dohvatiZahtjeveIncidente()
  
      if (this.$store.state.userId === 'admin@atom.ba') {
        http.get('postavke/sajtovi/list?token=' + this.$store.state.token + '&site=' + this.$store.state.site, {})
          .then(res => {
            this.sites = []
            this.sitesExtended = res.data.sajtovi
            res.data.sajtovi.forEach(element => {
              this.sites.push(element.naziv)
            })
          }).then(res => {
            this.sites.push('SVE LOKACIJE')
          })
      }
    },
  
    mounted() {
      this.$refs.treeView.expand()
      this.korisnik = this.$store.state.userId
      this.vrijeme = parseBoth(Date(Date.now()))
    },
  
    methods: {
      editRequest(event, status) {
        this.edit = true
        this.uredi = false
        this.tmpID = event.target.id
        this.tmpStatus = status
      },
      editIncident(event, status) {
        this.edit = true
        this.uredi = false
        this.tmpID = event.target.id
        this.tmpStatus = status
      },
      saveRequest(event, status) {
        if (this.tmpStatus === status) {
          this.edit = false
          this.uredi = true
        } else {
          this.edit = false
          this.uredi = true
          this.tmpID = event.target.id
  
          http.post('pomoc/requests/edit', {
              _id: event.target.id,
              status: status,
              site: this.$store.state.site,
              user: this.$store.state.userId,
              token: this.$store.state.token,
            })
            .then(res => {
              // console.log(res.data)
            })
  
        }
      },
      saveIncident(event, status) {
        if (this.tmpStatus === status) {
          this.edit = false
          this.uredi = true
        } else {
          this.edit = false
          this.uredi = true
          this.tmpID = event.target.id
  
          http.post('pomoc/incidents/edit', {
              _id: event.target.id,
              status: status,
              site: this.$store.state.site,
              user: this.$store.state.userId,
              token: this.$store.state.token,
            })
            .then(res => {
              // console.log(res.data)
            })
        }
      },
      dohvatiZahtjeveIncidente() {
        http.post('pomoc/incidents/list', {
            lokacija: this.lokacijaID,
            status: this.status,
            site: this.$store.state.site,
            user: this.$store.state.userId,
            token: this.$store.state.token,
          })
          .then(res => {
            this.sviIncidenti = res.data.incident
            this.sviIncidenti.sort(function(a, b) {
              return Date.parse(a.created_at) == Date.parse(b.created_at) ? 0 : +(Date.parse(a.created_at) < Date.parse(b.created_at)) || -1;
            })
          })
        http.post('pomoc/requests/list', {
            lokacija: this.lokacijaID,
            status: this.status,
            site: this.$store.state.site,
            user: this.$store.state.userId,
            token: this.$store.state.token,
          })
          .then(res => {
            this.sviZahtjevi = res.data.request
            this.sviZahtjevi.sort(function(a, b) {
              return Date.parse(a.created_at) == Date.parse(b.created_at) ? 0 : +(Date.parse(a.created_at) < Date.parse(b.created_at)) || -1;
            })
          })
      },
      doSomethingOnClick(input) {
        if (this.uredi) {
          this.incident = ''
          this.request = ''
          this.poruka = ''
          this.telefon = ''
          this.subject = ''
          this.izbor = input
          this.vrijeme = parseBoth(Date(Date.now()))
          this.prioritet = 'NORMALAN'
          this.lokacija = 'SVE LOKACIJE'
          this.lokacijaID = ''
          this.status = 'SVI STATUSI'
          this.tmpID = ''
          this.tmpStatus = ''
          if (input.includes('Pregled')) {
            this.dohvatiZahtjeveIncidente()
          }
        }
      },
      incidentSave() {
        var item = true
  
        if (this.incident.trim() === '') {
          item = false
          this.toastText = this.$t('pomoc.Pomoc.trnslr024') // Opišite incident!
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
        } else if (this.subject.trim() === '') {
          item = false
          this.toastText = this.$t('pomoc.Pomoc.trnslr025') // Unesite naziv!
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
  
        if (item) {
          http.post('pomoc/incident/save', {
              email: this.$store.state.userId,
              priority: this.prioritet,
              subject: this.subject,
              message: this.incident,
              status: 'NOVI',
              created_at: Date.now(),
              site: this.$store.state.site,
              token: this.$store.state.token
            })
            .then(res => {
              if (res.data.success === false) {
                this.toastText = this.$t('pomoc.Pomoc.trnslr026') // Greška prilikom upisa!
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
                this.toastText = this.$t('pomoc.Pomoc.trnslr027') // Unos uspješno obavljen!
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
                this.request = ''
                this.incident = ''
                this.subject = ''
                this.poruka = ''
                this.telefon = ''
                this.prioritet = 'NORMALAN'
                this.$refs.treeView.expand()
                this.dohvatiZahtjeveIncidente()
              }
            })
        }
      },
      requestSave() {
        var item = true
  
        if (this.request.trim() === '') {
          item = false
          this.toastText = this.$t('pomoc.Pomoc.trnslr028') // Unesite zahtjev!
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
        } else if (this.subject.trim() === '') {
          item = false
          this.toastText = this.$t('pomoc.Pomoc.trnslr025') // Unesite naziv!
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
  
        if (item) {
          http.post('pomoc/request/save', {
              email: this.$store.state.userId,
              priority: this.prioritet,
              subject: this.subject,
              message: this.request,
              status: 'NOVI',
              created_at: Date.now(),
              site: this.$store.state.site,
              token: this.$store.state.token
            })
            .then(res => {
              if (res.data.success === false) {
                this.toastText = this.$t('pomoc.Pomoc.trnslr026') // Greška prilikom upisa!
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
                this.toastText = this.$t('pomoc.Pomoc.trnslr027') // Unos uspješno obavljen!
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
                this.request = ''
                this.incident = ''
                this.subject = ''
                this.poruka = ''
                this.telefon = ''
                this.prioritet = 'NORMALAN'
                this.$refs.treeView.expand()
                this.dohvatiZahtjeveIncidente()
              }
            })
        }
      },
      messageSave() {
        var item = true
  
        if (this.poruka.trim() === '') {
          item = false
          this.toastText = this.$t('pomoc.Pomoc.trnslr040') // Unesite poruku!
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
        } else if (this.subject.trim() === '') {
          item = false
  
          this.toastText = this.$t('pomoc.Pomoc.trnslr025') // Unesite naziv!
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
        } else if (this.telefon.trim() === '') {
          item = false
          this.toastText = this.$t('pomoc.Pomoc.trnslr032') // Unesite telefonski broj!
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
        } else if (!this.validatePhone(this.telefon)) {
          item = false
          this.toastText = this.$t('pomoc.Pomoc.trnslr033') //Telefonski broj nije validan!
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
  
        if (item) {
          http.post('pomoc/message/send', {
              email: this.$store.state.userId,
              subject: this.subject,
              telefon: this.telefon,
              message: this.poruka,
              created_at: Date.now(),
              site: this.$store.state.site,
              token: this.$store.state.token
            })
            .then(res => {
              if (res.data.success === false) {
                this.toastText = this.$t('pomoc.Pomoc.trnslr034') // Greška prilikom slanja poruke!
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
                this.toastText = this.$t('pomoc.Pomoc.trnslr035') // Poruka uspješno poslana!
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
                this.request = ''
                this.incident = ''
                this.subject = ''
                this.poruka = ''
                this.telefon = ''
                this.prioritet = 'NORMALAN'
                this.$refs.treeView.expand()
              }
            })
        }
      },
      validatePhone: function(telefon) {
        if (/^\d{9}$/.test(String(telefon)) || /^\d{10}$/.test(String(telefon)) || /^[0]{2}[3]{1}[8]{1}[7]{1}\d{8}$/.test(String(telefon)) || /^[0]{2}[3]{1}[8]{1}[7]{1}\d{9}$/.test(String(telefon)) || /^[+]{1}[3]{1}[8]{1}[7]{1}\d{8}$/.test(String(telefon)) || /^[+]{1}[3]{1}[8]{1}[7]{1}\d{9}$/.test(String(telefon))) {
          return (true)
        } else {
          return (false)
        }
      },
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../sass/variables';
  @import '../../sass/toasts';
  
  // Colors //
  $gray-light: #acb5be !default;
  $light-gray: #eee;
  $lighter-gray: #ddd;
  $charcoal: #555;
  $darkest-gray: #333;
  $almost-black: #161616;
  $vue-green: #4ae387;
  $light-green: #c8f9c5;
  $light-blue: #dcf1ff;
  $light-yellow: #fff1c8;
  $light-pink: #ffcece;
  $vue-darkest-blue: #34495e;
  $vue-turquoise: #dbf9e7;
  $white: #fff;
  $theme-red: #e34a4a;
  $theme-orange: #f7cc36;
  $theme-blue: #4ab2e3;
  $theme-violet: #db76df;
  $theme-pale: #d9d9d9;
  $brand-primary: $vue-green !default;
  $brand-danger: $theme-red;
  $brand-warning: $theme-orange;
  $brand-info: $theme-blue;
  $brand-success: $vue-green;
  $light-gray2: #eff4f5;
  $dark-gray: #282828;
  $gray: #adb3b9;
  $violet: #db76df;
  $dark-blue: #0045b6;

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
  
  .lnk {
    color: $dark-gray;
    text-decoration: none;
  }
  
  a:hover {
    color: $vue-green;
  }
  
  .clicked {
    color: $vue-green;
    text-transform: uppercase;
  }
</style>
