<template>
  <div class="form-elements">
    <div class="row">
      <div class="col-md-12">
        <vuestic-widget headerText="Promjena šifre">
  
          <vuestic-alert v-if="ok" type="success" :withCloseBtn="true">
            <span class="badge badge-pill badge-success">{{'OK'}}</span> {{poruka}}
            <i class="fa fa-close alert-close"></i>
          </vuestic-alert>
          <vuestic-alert v-if="info" type="info" :withCloseBtn="true">
            <span class="badge badge-pill badge-info">{{'INFO'}}</span> {{poruka}}
          </vuestic-alert>
  
          <form>
  
            <div class="row">
  
  
              <div class="col-md-3">
  
              </div>
  
              <div class="col-md-6">
                <fieldset>
                  <div class="form-group with-icon-left">
                    <div class="input-group">
                      <input id="input-icon-left" v-model="staraSifra" name="input-icon-left" required/>
                      <i class="fa fa-key icon-left input-icon"></i>
                      <label class="control-label" for="input-icon-left">{{'Unesite trenutnu šifru'}}</label><i class="bar"></i>
                    </div>
                  </div>
                  <div class="form-group with-icon-left">
                    <div class="input-group">
                      <input id="input-icon-left" v-model="novaSifra" name="input-icon-left" required/>
                      <i class="fa fa-key icon-left input-icon"></i>
                      <label class="control-label" for="input-icon-left">{{'Unesite novu šifru'}}</label><i class="bar"></i>
                    </div>
                  </div>
                  <div class="form-group with-icon-left">
                    <div class="input-group">
                      <input id="input-icon-left" v-model="potvrdaSifra" name="input-icon-left" required/>
                      <i class="fa fa-key icon-left input-icon"></i>
                      <label class="control-label" for="input-icon-left">{{'Potvrdite novu šifru'}}</label><i class="bar"></i>
                    </div>
  
                  </div>
                  <button class="btn btn-primary" @click.prevent="izmjeniSifru">IZMJENI</button>
                </fieldset>
  
              </div>
              <div class="col-md-3">
  
              </div>
  
            </div>
          </form>
  
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
        staraSifra: '',
        novaSifra: '',
        potvrdaSifra: '',
        ok: false,
        info: false,
        poruka: ''
      }
    },
    name: 'chpwd',
    methods: {
      izmjeniSifru: function() {
  
        if (this.novaSifra.length < 6) {
  
          this.info = true
          this.poruka = "Šifra mora sadržavati minimalno 6 karaktera."
          setTimeout(() => {
            this.info = false
          }, 3000)
          return
        }
  
        if (this.novaSifra === this.potvrdaSifra) {
          http.post('users/sifra', {
              email: this.$store.state.userId,
              password: this.staraSifra,
              novaSifra: this.novaSifra,
              potvrdaSifra: this.potvrdaSifra,
              token: this.$store.state.token,
              site: this.$store.state.site
            })
            .then(res => {
              // console.log(res.data)
              if (res.data.message === "Info") {
                this.info = true
                this.poruka = res.data.data
                setTimeout(() => {
                  this.info = false
                }, 3000)  
              }
  
              if (res.data.message === "Ok") {
                this.ok = true
                this.poruka = res.data.data
                setTimeout(() => {
                  this.ok = false
                  this.$router.push('/dashboard?token=' + this.$store.state.token)
                }, 3000) 
              }  
            })  
  
        } else {
          this.info = true
          this.poruka = "Nova šifra nije validirana."
          setTimeout(() => {
            this.info = false  
          }, 3000)
        }
      }
    }
  }
</script>

<style lang="scss">
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
