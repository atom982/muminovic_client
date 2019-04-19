<template>
  <div class="form-elements">
    <div class="row">
      <div class="col-md-12">
        <vuestic-widget v-if="ifPostavkesajtovi" headerText="Opšte postavke - Sites">
          <form>
            <div class="row">
              <div class="col-md-3"></div>
              <div class="col-md-6">
                <fieldset>
                  <vuestic-simple-select label="Izaberite šifru" v-model="sifra" name="sifra" :required="true" title=" " ref="sifraSelect" v-bind:options="sifre">
                  </vuestic-simple-select>
                  <div class="form-group with-icon-left">
                    <div class="input-group">
                      <input id="input-icon-left" title=" " v-model="naziv" name="input-icon-left" required/>
                      <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                      <label class="control-label" for="input-icon-left">{{'Unesite naziv'}}</label><i class="bar"></i>
                    </div>
                  </div>
                  <div class="form-group with-icon-left">
                    <div class="input-group">
                      <input id="input-icon-left" title=" " v-model="opis" name="input-icon-left" required/>
                      <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                      <label class="control-label" for="input-icon-left">{{'Unesite opis'}}</label><i class="bar"></i>
                    </div>
                  </div>
                  <div class="form-group with-icon-left">
                    <div class="input-group">
                      <input id="input-icon-left" title=" " v-model="adresa" name="input-icon-left" required/>
                      <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                      <label class="control-label" for="input-icon-left">{{'Unesite adresu'}}</label><i class="bar"></i>
                    </div>
                  </div>
                  <div class="form-group with-icon-left">
                    <div class="input-group">
                      <input id="input-icon-left" title=" " v-model="odgovornoLice" name="input-icon-left" required/>
                      <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                      <label class="control-label" for="input-icon-left">{{'Unesite odgovornu osobu'}}</label><i class="bar"></i>
                    </div>
                  </div>
                  <div class="form-group with-icon-left">
                    <div class="input-group">
                      <input id="input-icon-left" title=" " v-model="telefon" name="input-icon-left" required/>
                      <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                      <label class="control-label" for="input-icon-left">{{'Unesite kontakt telefon'}}</label><i class="bar"></i>
                    </div>
                  </div>
                  <div class="form-group with-icon-left">
                    <div class="input-group">
                      <input id="input-icon-left" title=" " v-model="email" name="input-icon-left" required/>
                      <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                      <label class="control-label" for="input-icon-left">{{'Unesite email'}}</label><i class="bar"></i>
                    </div>
                  </div>
                  <div class="form-group with-icon-left">
                    <div class="input-group">
                      <input id="input-icon-left" title=" " v-model="web" name="input-icon-left" required/>
                      <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                      <label class="control-label" for="input-icon-left">{{'Unesite web adresu'}}</label><i class="bar"></i>
                    </div>
                  </div>
                  <div class="form-group with-icon-left">
                    <div class="input-group">
                      <input style="display:none" type="file" accept="image/*" @change="setLogo($event)" id="logo" ref="fileInput">
                      <button v-if="changed" @click.prevent="$refs.fileInput.click()" title="Dodaj sliku" class="btn btn-micro btn-secondary-info"><span class="glyphicon glyphicon-picture"></span>{{' IZABERITE SLIKU'}}</button>
                      <button v-if="!changed" @click.prevent="$refs.fileInput.click()" title="Promijeni sliku" class="btn btn-micro btn-primary-info"><span class="glyphicon glyphicon-picture"></span>{{' IZABERITE SLIKU'}}</button>
                      <span @click.prevent="removeImg" style="color:#4ab2e3">{{imgdata.name}}</span>
                    </div>
                  </div>  
                  <button class="btn btn-primary" @click.prevent="dodajPostavku"><span class="fa fa-save"></span>{{ ' SAČUVAJ'}}</button>
                </fieldset>
                <hr>
                <a @click="prikaziPostavke" href="#">{{prikaziTekst}}</a>
              </div>
              <div class="col-md-3"></div>
            </div>
          </form>
        </vuestic-widget>
        <vuestic-widget v-if="ifTrenutnePostavke" headerText="Trenutne postavke - Sites">
          <div class="table-responsive">
            <table v-if="tabelaUslov" class="table table-striped first-td-padding">
              <thead>
                <tr>
                  <td>{{"šifra"}}</td>
                  <td>{{"naziv"}}</td>
                  <td>{{"opis"}}</td>
                  <td>{{"adresa"}}</td>
                  <td>{{"odgovoran"}}</td>
                  <td>{{"telefon"}}</td>
                  <td>email</td>
                  <td>web</td>
                  <td>Uredi</td>
                  <td>{{"Akcija"}}</td>
                </tr>
              </thead>
              <tbody>
                <tr v-for="element in sajtovi">
                  <td><strong>{{element.sifra}}</strong></td>
                  <td>{{element.naziv}}</td>
                  <td v-if="tmpID != element._id">{{element.opis}}</td>
                  <td v-if="tmpID === element._id">
                    <div v-show="edit === false">
                      <label>{{element.opis}}</label>
                    </div>
                    <input class="table-info" style="width:100%" v-show="edit === true" v-model="element.opis">
                  </td>
                  <td v-if="tmpID != element._id">{{element.adresa}}</td>
                  <td v-if="tmpID === element._id">
                    <div v-show="edit === false">
                      <label>{{element.adresa}}</label>
                    </div>
                    <input class="table-info" style="width:100%" v-show="edit === true" v-model="element.adresa">
                  </td>
                  <td v-if="tmpID != element._id">{{element.odgovornoLice}}</td>
                  <td v-if="tmpID === element._id">
                    <div v-show="edit === false">
                      <label>{{element.odgovornoLice}}</label>
                    </div>
                    <input class="table-info" style="width:100%" v-show="edit === true" v-model="element.odgovornoLice">
                  </td>
                  <td v-if="tmpID != element._id">{{element.telefon}}</td>
                  <td v-if="tmpID === element._id">
                    <div v-show="edit === false">
                      <label>{{element.telefon}}</label>
                    </div>
                    <input class="table-info" style="width:100%" v-show="edit === true" v-model="element.telefon">
                  </td>
                  <td v-if="tmpID != element._id">{{element.email}}</td>
                  <td v-if="tmpID === element._id">
                    <div v-show="edit === false">
                      <label>{{element.email}}</label>
                    </div>
                    <input class="table-info" style="width:100%" v-show="edit === true" v-model="element.email">
                  </td>
  
                  <td v-if="tmpID != element._id">{{element.web}}</td>
                  <td v-if="tmpID === element._id">
                    <div v-show="edit === false">
                      <label>{{element.web}}</label>
                    </div>
                    <input class="table-info" style="width:100%" v-show="edit === true" v-model="element.web">
                  </td>
                  <td>
                    <button :disabled="edit" v-if="tmpID != element._id" @click.prevent="editUnit($event, element.opis, element.adresa, element.odgovornoLice, element.telefon, element.email, element.web)" title="Uredite podatke" v-bind:id="element._id" class="btn btn-micro btn-info"><span v-bind:id="element._id" class="glyphicon glyphicon-edit"></span>{{''}}</button>
                    <button :disabled="edit" v-if="uredi && tmpID === element._id" @click.prevent="editUnit($event, element.opis, element.adresa, element.odgovornoLice, element.telefon, element.email, element.web)" title="Uredite podatke" v-bind:id="element._id" class="btn btn-micro btn-info"><span v-bind:id="element._id" class="glyphicon glyphicon-edit"></span>{{''}}</button>
                    <button v-if="!uredi && tmpID === element._id" @click.prevent="saveData($event, element.opis, element.adresa, element.odgovornoLice, element.telefon, element.email, element.web)" title="Sačuvajte izmjene" v-bind:id="element._id" class="btn btn-micro btn-secondary"><span v-bind:id="element._id" class="fa fa-save"></span>{{''}}</button>
                  </td>
                  <td><button :disabled="edit" title='Brisanje zapisa' v-bind:id="element.naziv" class="btn btn-danger btn-micro" @click="catchDialog($event)"><span v-bind:id="element.naziv" class="fa fa-trash-o"></span> {{ 'IZBRIŠI' }}</button></td>
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
              <button :disabled="edit" class="btn btn-secondary" @click.prevent="povratak"><span class="fa fa-backward"></span>{{ ' POVRATAK'}}</button>
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
        naziv: '',
        opis: '',
        adresa: '',
        odgovornoLice: '',
        telefon: '',
        email: '',
        web: '',
        sajtovi: [],
        sifra: '',
        sifre: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
        privremeneSifre: [],
        ifButton: true,
        ifTrenutnePostavke: false,
        ifPostavkesajtovi: true,
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
        className: '',
  
        uredi: true,
        edit: false,
        tmpID: '',
        tmpOpis: '',
        tmpAdresa: '',
        tmpOdgovornoLice: '',
        tmpTelefon: '',
        imgdata: '',
        tmpImgdata: '',
        tmpWeb: '',
        tmpEmail: '',
        changed: true
      }
    },
    name: 'site',
  
    created: function() {
      this.catchSection()
    },
    methods: {
      validateURL(url) {
        var pattern = /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;
        if (pattern.test(url)) {
          return true;
        }
        return false;
      },
      removeImg(url) {
        this.changed = true
        this.imgdata = ''
      },
      setLogo(event) {
        this.imgdata = event.target.files[0]  
        if (this.imgdata.name != this.tmpImgdata) {          
          this.changed = false
        }  
        this.tmpImgdata = this.imgdata.name
      },
      editUnit(event, opis, adresa, odgovornoLice, telefon, email, web) {
        this.edit = true
        this.uredi = false
        this.tmpID = event.target.id
        this.tmpOpis = opis
        this.tmpAdresa = adresa
        this.tmpOdgovornoLice = odgovornoLice
        this.tmpTelefon = telefon
        this.tmpWeb = web
        this.tmpEmail = email
      },
      saveData(event, opis, adresa, odgovornoLice, telefon, email, web) {
        var item = true
        this.edit = false
        this.uredi = true
        this.tmpID = event.target.id
  
        if ((this.tmpEmail === email) && (this.tmpWeb === web) && (this.tmpOpis === opis) && (this.tmpAdresa === adresa) && (this.tmpOdgovornoLice === odgovornoLice) && (this.tmpTelefon === telefon)) {
          item = false
        } else if ((email.trim() === '') || (web.trim() === '') || (opis.trim() === '') || (adresa.trim() === '') || (odgovornoLice.trim() === '') || (telefon.trim() === '')) {
          item = false
          this.edit = true
          this.uredi = false
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
        } else if ((!this.validatePhone(telefon))) {
          item = false
          this.edit = true
          this.uredi = false
          this.toastText = 'Telefonski broj nije validan!'
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
        } else if ((!this.validateEmail(email))) {
          item = false
          this.edit = true
          this.uredi = false
          this.toastText = 'Email adresa nije validna!'
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
        const fd = new FormData();
        fd.append('logo', this.imgdata, this.imgdata.name);
        if (item) {
          http.post('postavke/sajtovi/update', {
              email: this.$store.state.userId,
              token: this.$store.state.token,
              site: this.$store.state.site,
              _id: event.target.id,
              opis: opis,
              adresa: adresa,
              odgovornoLice: odgovornoLice,
              telefon: telefon,
              emailadr: email,
              web: web,
              fd: fd
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
                this.toastText = 'Izmjena uspješno obavljena!'
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
                this.catchSection()
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
      catchDialog: function(event) {
        this.$dialog.confirm('Jeste li sigurni da želite obrisati zapis?', {
            type: 'hard',
            html: true,
            verification: 'Da'
          })
          .then(() => {
  
            http.post('postavke/sajtovi/delete', {
                naziv: event.target.id,
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
      validateEmail: function(mail) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
          return (true)
        }
        return (false)
      },
      dodajPostavku: function() {
        var item = true
        if ((this.imgdata === '') || (this.web.toUpperCase().trim() === '') || (this.email.toUpperCase().trim() === '') || (this.naziv.toUpperCase().trim() === '') || (this.sifra.toUpperCase().trim() === '') || (this.opis.toUpperCase().trim() === '') || (this.adresa.toUpperCase().trim() === '') || (this.odgovornoLice.toUpperCase().trim() === '') || (this.telefon.toUpperCase().trim() === '')) {
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
        } else if ((this.telefon.trim() != '') && (!this.validatePhone(this.telefon))) {
          item = false
          this.toastText = 'Telefonski broj nije validan!'
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
        } else if ((this.email.trim() != '') && (!this.validateEmail(this.email))) {
          item = false
          this.toastText = 'Email adresa nije validna!'
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
          if (this.sajtovi != undefined) {
            this.sajtovi.forEach(element => {
              if (element.naziv == this.naziv) {
                item = false
                this.toastText = 'Site već postoji!'
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
        }
        const fd = new FormData();
        fd.append('file', this.imgdata, this.sifra);
        fd.append('filename', this.imgdata.name)
        fd.append('token', this.$store.state.token)
        fd.append('email', this.email)
        fd.append('odgovornoLice', this.odgovornoLice)
        fd.append('telefon', this.telefon)
        fd.append('adresa', this.adresa)
        fd.append('opis', this.opis)
        fd.append('naziv', this.naziv)
        fd.append('sifra', this.sifra)
        fd.append('web', this.web)
        if (item) {
          http.post('postavke/sajtovi/save?token=' + this.$store.state.token + '&site=' + this.$store.state.site, fd)
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
  
                this.naziv = ''
                this.opis = ''
                this.adresa = ''
                this.odgovornoLice = ''
                this.telefon = ''
                this.sifra = ''
                this.email = ''
                this.web = ''
                this.imgdata = ''
                this.changed = true
                this.$refs.fileInput.value = '';
                this.prikaziPostavke()
                this.prikaziPostavke()
                this.catchSection()
              }
            })
        }
      },
      prikaziPostavke: function() {
        this.naziv = ''
        this.ifPostavkesajtovi = !this.ifPostavkesajtovi
        this.ifTrenutnePostavke = !this.ifTrenutnePostavke
        http.get('postavke/sajtovi/list?token=' + this.$store.state.token + '&site=' + this.$store.state.site, {})
          .then(res => {
            if (res.data.success === false) {
              this.dataAvailable = 'Greška prilikom čitanja iz baze.'
              this.dataUslovDanger = true
              this.dataUslov = false
              this.tabelaUslov = false
            } else {
              if (res.data.sajtovi != undefined) {
                this.sajtovi = res.data.sajtovi
                if (this.sajtovi.length > 0) {
                  this.dataAvailable = ''
                  this.dataUslov = false
                  this.dataUslovDanger = false
                  this.tabelaUslov = true
                }
                if (this.sajtovi.length <= 0) {
                  this.dataAvailable = 'Nema dostupnih podataka.'
                  this.dataUslovDanger = false
                  this.dataUslov = true
                  this.tabelaUslov = false
                }
              } else {
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
        this.ifPostavkesajtovi = !this.ifPostavkesajtovi
        this.naziv = ''
        this.opis = ''
        this.adresa = ''
        this.odgovornoLice = ''
        this.telefon = ''
        this.sifra = ''
        this.email = ''
        this.web = ''
        this.imgdata = ''
        this.changed = true
        this.$refs.fileInput.value = '';
        this.catchSection()
      },
      catchSection: function() {
        http.get('postavke/sajtovi/list?token=' + this.$store.state.token + '&site=' + this.$store.state.site, {})
          .then(res => {
            this.nazivovi = res.data.naziv
            this.sajtovi = res.data.sajtovi
            this.privremeneSifre = []
  
            if (this.sajtovi != undefined) {
              this.sajtovi.forEach(element => {
                this.privremeneSifre.push(element.sifra)
              })
  
              this.privremeneSifre.forEach(element => {
                for (var i = 0; i < this.sifre.length; i++) {
                  if (this.sifre[i] === element) {
                    this.sifre.splice(i, 1);
                    break
                  }
                }
              })
            }
          })
      },
      izbrisiSekciju: function(event) {
        http.post('postavke/sajtovi/delete', {
            naziv: event.target.id,
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
