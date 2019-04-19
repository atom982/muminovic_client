<template>
  <div class="form-elements">
    <div class="row">
      <div class="col-md-12">
        <vuestic-widget :headerText="naslov">
          <div class="row">
  
            <div class="col-md-4">
              <form style="background-color: #333333">
                <br>
                <br>
                <div id="preview">
                  <img style="border: 2px solid white;" v-if="url" :src="url" />
                </div>
                <br>
                <div style="height: 30px; color:white;align-items: center; display: flex; justify-content: center; text-align: center">&nbsp
                  <span v-if="naslov != tmpNaslov" @click.prevent="removeImg" style="color:#4ae387">{{imgdata.name}}</span>
                  <span v-if="naslov === tmpNaslov" @click.prevent="removeImg" style="color:#f7cc36">{{imgdata.name}}</span>
                </div>
                <br>
              </form>
            </div>
  
            <div class="col-md-4">
              <div style="text-align: center">
                <br>
                <input style="display:none" type="file" accept="image/*" @change="setLogo($event)" id="logo" ref="fileInput">
                <button v-if="naslov === tmpNaslov" @click.prevent="$refs.fileInput.click()" title="Dodaj sliku" class="btn btn-warning btn-sm ">
                  <span class="glyphicon glyphicon-picture"></span>
                  &nbsp{{'postavke.user.avatar.trnslr003' | translate}} <!-- Izaberi -->
                </button>
                <button v-if="naslov != tmpNaslov" @click.prevent="$refs.fileInput.click()" title="Promijeni sliku" class="btn btn-primary btn-sm ">
                  <span class="glyphicon glyphicon-picture"></span>
                  &nbsp{{'postavke.user.avatar.trnslr003' | translate}} <!-- Izaberi -->
                </button>
                <br><br>
                <button v-if="naslov === tmpNaslov && spasi" @click.prevent="dodajPostavku" title="Spasi sliku" class="btn btn-warning btn-sm ">
                  <span class="fa fa-save"></span>
                  &nbsp{{'postavke.user.avatar.trnslr004' | translate}} <!-- Sačuvaj -->
                </button>
                <button v-if="naslov != tmpNaslov && spasi" @click.prevent="dodajPostavku" title="Spasi sliku" class="btn btn-primary btn-sm ">
                  <span class="fa fa-save"></span>
                  &nbsp{{'postavke.user.avatar.trnslr004' | translate}} <!-- Sačuvaj -->
                </button>
                <button disabled v-if="naslov === tmpNaslov && !spasi" title="Spasi sliku" class="btn btn-warning btn-sm ">
                  <span class="fa fa-save"></span>
                  &nbsp{{'postavke.user.avatar.trnslr004' | translate}} <!-- Sačuvaj -->
                </button>
                <button disabled v-if="naslov != tmpNaslov  && !spasi" title="Spasi sliku" class="btn btn-primary btn-sm ">
                  <span class="fa fa-save"></span>
                  &nbsp{{'postavke.user.avatar.trnslr004' | translate}} <!-- Sačuvaj -->
                </button>
              </div>
            </div>
  
          </div>
        </vuestic-widget>  
      </div>
    </div>
  </div>
</template>

<script>
  import {http} from '../../../../config/config.js'
  import {server} from '../../../../config/config.js'
  import {bus} from '../../../main'
  
  export default {
    data() {
      return {
        naslov: this.$t('postavke.user.avatar.trnslr001'), // Izmjena slike
        tmpNaslov: this.$t('postavke.user.avatar.trnslr002'), // Dodavanje slike
        url: null,
        userImage: '',
        trenutniUser: '',
        spasi: false,
        item: true,
        imgdata: '',
        tmpImgdata: '',
        changed: true,
        korisnik: '',      
  
        toastText: '',
        toastIcon: '',
        toastPosition: '',
        toastDuration: 2500,
        isToastFullWidth: false,
        className: ''
      }
    },
    name: 'avatar',
  
    mounted: function() {
      this.onLoadGet()
    },
  
    methods: {
      onLoadGet() {
        this.trenutniUser = this.$store.state.userId
        var link = this.$store.state.userId
        var token = this.$store.state.token
        var index = link.indexOf("@")
        link = link.substring(0, index)
        this.korisnik = link
  
        http.post('users/' + this.korisnik, {
            email: this.$store.state.userId,
            token: this.$store.state.token,
            site: this.$store.state.site
          })
          .then(res => {
            this.url = null
            this.url = res.data.data.link + '?t=' + new Date().getTime()
            if (res.data.data.link.includes('/default')) {
              this.naslov = this.$t('postavke.user.avatar.trnslr002') // Dodavanje slike
            } else {
              this.naslov = this.$t('postavke.user.avatar.trnslr001') // Izmjena slike
            }
          })
      },
      removeImg(url) {
        this.changed = true
        this.imgdata = ''
        this.spasi = false
        this.onLoadGet()
  
        http.post('users/' + this.korisnik, {
            email: this.$store.state.userId,
            token: this.$store.state.token,
            site: this.$store.state.site
          })
          .then(res => {
            this.url = null
            this.url = res.data.data.link + '?t=' + new Date().getTime()
            if (res.data.data.link.includes('/default')) {
              this.naslov = this.$t('postavke.user.avatar.trnslr002') // Dodavanje slike
            } else {
              this.naslov = this.$t('postavke.user.avatar.trnslr001') // Izmjena slike
            }
          })
  
      },
      setLogo(event) {
        this.imgdata = event.target.files[0]
        this.spasi = true
        this.url = URL.createObjectURL(this.imgdata);
        if (this.imgdata.name != this.tmpImgdata) {
          this.changed = false
        }
        this.tmpImgdata = this.imgdata.name
      },
      dodajPostavku: function() {
        const fd = new FormData()
        fd.append('file', this.imgdata, this.korisnik)
        fd.append('filename', this.imgdata.name)
        fd.append('token', this.$store.state.token)
        fd.append('user', this.korisnik)
  
        http.post('image/upload2?token=' + this.$store.state.token + '&site=' + this.$store.state.site, fd)
          .then(res => {
            if (res.data.success === false) {
              this.toastText = this.$t('postavke.user.avatar.trnslr005') // Greška prilikom izmjene!
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
              this.spasi = false
              this.toastText = this.$t('postavke.user.avatar.trnslr006') // Izmjena uspješno obavljena!
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
              this.imgdata = ''
              this.changed = true
              this.$refs.fileInput.value = ''
            }
          }).then(res => {
  
            http.post('users/' + this.korisnik, {
                email: this.$store.state.userId,
                token: this.$store.state.token,
                site: this.$store.state.site
              })
              .then(res => {
                this.userImage = res.data.data.link
                this.isRole = res.data.data.role
                bus.$emit('noviAvatar', this.userImage, this.isRole)
                if (res.data.data.link.includes('/default')) {
                  this.naslov = this.$t('postavke.user.avatar.trnslr002') // Dodavanje slike
                } else {
                  this.naslov = this.$t('postavke.user.avatar.trnslr001') // Izmjena slike
                }
  
              })
          })
      }
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
  
  body {
    background-color: #e2e2e2;
  }
  
  #app {
    padding: 20px;
  }
  
  #preview {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  #preview img {
    max-width: 250px;
    max-height: 250px;
  }
  
  img {
    object-fit: cover;
    border-radius: 50%;
    width: 150px;
    height: 150px;
  }
</style>
