<template>
  <div class="form-elements">
    <div class="row">
      <div class="col-md-12">
        <vuestic-widget :headerText="'postavke.user.edit.trnslr001' | translate"> <!-- Uređivanje korisnika -->
          <div class="table-responsive">
            <table class="table table-striped first-td-padding">
              <thead>
                <tr>
                  <td>{{'postavke.user.edit.trnslr002' | translate}}</td> <!-- Ime -->
                  <td>{{'postavke.user.edit.trnslr003' | translate}}</td> <!-- Prezime -->
                  <td>{{'postavke.user.edit.trnslr004' | translate}}</td> <!-- Email -->
                  <td>{{'postavke.user.edit.trnslr005' | translate}}</td> <!-- Uloga -->
                  <td>{{'postavke.user.edit.trnslr006' | translate}}</td> <!-- Uredi -->
                  <td>{{'postavke.user.edit.trnslr007' | translate}}</td> <!-- Akcija -->
                </tr>
              </thead>
              <tbody>
                <tr v-for="element in users" v-bind:class="{'table-danger': trenutniUser === element.email.substring(0, trenutniUser.length)}">
                  <td>{{element.ime}}</td>
                  <td>{{element.prezime}}</td>
                  <td>{{element.email}}</td>
                  <td v-if="tmpID != element.id">{{element.role}}</td>
                  <td v-if="tmpID === element.id">
                    <div v-show="edit === false">
                      <label>{{element.role}}</label>
                    </div>
                    <select v-show="edit === true" v-model="element.role">
                        <option value="Administrator">Administrator</option>
                        <option value="Koordinator">Koordinator</option>
                        <option value="Tehničar">Tehničar</option>
                        <option value="Biohemičar">Biohemičar</option>
                      </select>
                  </td>
                  <td v-if="trenutniUser === element.email">
                  </td>
                  <td v-if="trenutniUser != element.email">
                    <button :disabled="edit" v-if="tmpID != element.id" @click.prevent="editUser($event, element.role)" :title="'postavke.user.edit.trnslr008' | translate" v-bind:id="element.id" class="btn btn-micro btn-info"><span v-bind:id="element.id" class="glyphicon glyphicon-edit"></span>{{''}}</button> <!-- Uredite podatke -->
                    <button :disabled="edit" v-if="uredi && tmpID === element.id" @click.prevent="editUser($event, element.role)" :title="'postavke.user.edit.trnslr008' | translate" v-bind:id="element.id" class="btn btn-micro btn-info"><span v-bind:id="element.id" class="glyphicon glyphicon-edit"></span>{{''}}</button> <!-- Uredite podatke -->
                    <button v-if="!uredi && tmpID === element.id" @click.prevent="saveUser($event, element.role)" :title="'postavke.user.edit.trnslr009' | translate" v-bind:id="element.id" class="btn btn-micro btn-secondary"><span v-bind:id="element.id" class="fa fa-save"></span>{{''}}</button> <!-- Sačuvajte izmjene -->
                  </td>
                  <td v-if="trenutniUser === element.email">
                  </td>
                  <td v-if="trenutniUser != element.email"><button :disabled="edit" :title="'postavke.user.edit.trnslr016' | translate" v-bind:id="element.id" class="btn btn-danger btn-micro" @click="catchDialog($event)"> <!-- Brisanje zapisa -->
                    <span v-bind:id="element.id" class="fa fa-trash-o"></span>
                    &nbsp {{'postavke.user.edit.trnslr017' | translate}} <!-- Izbriši -->
                  </button></td>
                </tr>
              </tbody>
            </table>
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
  import {
    server
  } from '../../../../config/config.js'
  
  export default {
    data() {
      return {
        text: '',
        desc: '',
        users: [],
        trenutniUser: '',
        uredi: true,
        edit: false,
        tmpID: '',
        tmpRole: '',
  
        toastText: '',
        toastIcon: '',
        toastPosition: '',
        toastDuration: 2500,
        isToastFullWidth: false,
        className: ''
      }
    },
    name: 'edit',
  
    mounted() {
      this.trenutniUser = this.$store.state.userId,
        this.catchUsers()
    },
    methods: {
      editUser(event, role) {
        this.edit = true
        this.uredi = false
        this.tmpID = event.target.id
        this.tmpRole = role
      },
      saveUser(event, role) {
        this.edit = false
        this.uredi = true
        var item = true
  
        if (this.tmpRole === role) {
          item = false
        }
  
        if (item) {
          http.post('korisnik/role', {
              email: this.$store.state.userId,
              _id: event.target.id,
              role: role,
              token: this.$store.state.token,
              site: this.$store.state.site
            })
            .then(res => {
              if (res.data.success === false) {
                this.toastText = this.$t('postavke.user.edit.trnslr010') // Greška prilikom upisa!
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
                this.toastText = this.$t('postavke.user.edit.trnslr011') // Izmjena uspješno obavljena!
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
              }
            })
        }
      },
      catchUsers() {
        this.users = []
        var korisnik = {}
        http.get('users/list?token=' + this.$store.state.token + '&site=' + this.$store.state.site, {})
          .then(res => {
            res.data.user.forEach(element => {
              if (element.email != "admin@atom.ba") {
                korisnik = {}
                korisnik.id = element._id
                korisnik.ime = element.ime
                korisnik.prezime = element.prezime
                korisnik.email = element.email
                korisnik.role = element.role
                var index = element.email.indexOf("@")
                var link = element.email.substring(0, index)
                korisnik.slika = server + 'images/users/' + link + '.jpeg'
                this.users.push(korisnik)
              }
            })
          })
      },
      catchDialog: function(event) {
        this.$dialog.confirm(this.$t('postavke.user.edit.trnslr012'), { // Jeste li sigurni da želite obrisati zapis?
            type: 'hard',
            html: true,
            okText: this.$t('postavke.user.edit.trnslr020'), // Nastavi
            cancelText: this.$t('postavke.user.edit.trnslr019'), // Odustani
            verification: this.$t('postavke.user.edit.trnslr013'), // Da
            verificationHelp: this.$t('postavke.user.edit.trnslr018'), // Unesite \"Da\" za nastavak
          })
          .then(() => {
            this.userDelete(event)
          }).catch(function() {
            
          })
      },
      userDelete(event) {
        http.post('korisnik/brisanje', {
            email: this.$store.state.userId,
            _id: event.target.id,
            token: this.$store.state.token,
            site: this.$store.state.site
          })
          .then(res => {
            if (res.data.success === false) {
              this.toastText = this.$t('postavke.user.edit.trnslr014') // Greška prilikom brisanja!
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
              this.toastText = this.$t('postavke.user.edit.trnslr015') // Zapis uspješno obrisan!
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
              this.users = []
              var korisnik = {}
              http.get('users/list?token=' + this.$store.state.token + '&site=' + this.$store.state.site, {})
                .then(res => {
                  res.data.user.forEach(element => {
  
                    if (element.email != "admin@atom.ba") {
                      korisnik = {}
                      korisnik.id = element._id
                      korisnik.ime = element.ime
                      korisnik.prezime = element.prezime
                      korisnik.email = element.email
                      korisnik.role = element.role
                      var index = element.email.indexOf("@")
                      var link = element.email.substring(0, index)
                      korisnik.slika = server + 'images/users/' + link + '.jpeg'
                      this.users.push(korisnik)
                    }
                  });
                })
            }
          })
      },
    }
  }
</script>

<style lang="scss" scoped>
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
