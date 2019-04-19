<template>
  <div class="row">
    <div class="col-md-12">
      <vuestic-widget class="no-h-padding" headerText="Unos kontrole">
        <vuestic-wizard id="wizzard" v-if="show" v-on:uzorakUnesen="refreshWizard()" :steps="hrSteps" wizard-type="simple">
          <!-- Korak 1 -->
          <div slot="page1" class="form-wizard-tab-content">
            <div class="col-md-3"></div>
            <div class="col-md-8">
              <vuestic-simple-select class="form-group with-icon-right" :class="{'has-error': errors.has('aparat'), 'valid': isFormFieldValid('aparat')}" label="Izaberite aparat" v-model="aparat" v-validate="'required'" name="aparat" required title=" " ref="aparatSelect"
                v-bind:options="aparati">
              </vuestic-simple-select>
            </div>
          </div>
          <!-- Korak 2 -->
          <div slot="page2" class="form-wizard-tab-content">
            <div class="col-md-3"></div>
            <div class="col-md-8">
              <vuestic-simple-select class="form-group with-icon-right" :class="{'has-error': errors.has('tip'), 'valid': isFormFieldValid('tip')}" label="Izaberite tip kontrole" v-model="tip" v-validate="'required'" name="tip" required title=" " ref="tip" v-bind:options="tipovi">
              </vuestic-simple-select>
              <vuestic-simple-select class="form-group with-icon-right" :class="{'has-error': errors.has('kontrola'), 'valid': isFormFieldValid('kontrola')}" label="Izaberite kontrolu" v-model="kontrola" v-validate="'required'" name="kontrola" required title=" " ref="kontrola"
                v-bind:options="kontrole">
              </vuestic-simple-select>
              <vuestic-simple-select class="form-group with-icon-right" :class="{'has-error': errors.has('lot'), 'valid': isFormFieldValid('lot')}" label="Izaberite lot kontrole" v-model="lot" v-validate="'required'" name="lot" required title=" " ref="lot" v-bind:options="lotovi">
              </vuestic-simple-select>
            </div>
          </div>
          <!-- Korak 3 -->
          <div slot="page3" class="form-wizard-tab-content">
            <div style="text-align:center;" class="testoviDiv">
              <h4 v-bind:style="{ color: activeColorStyle}">{{placeholder}}</h4>
              <div v-for="test in testovi" class='btn btn-primary btn-micro' @click="izbaciTest($event)" :name="test.anaassay">
                {{test.ime_testa }}
              </div>
              <hr style="border-color:#4ab2e3">
            </div>
            <div>
              <div style="text-align:center;" v-for="index in Math.ceil(sviTestovi.length/100) " class="table">
                <div @click="dodajTest($event)" :title="test.anaassay.test.analit" v-for="test in (sviTestovi.slice((index-1)*100,index*100))" :class="{'btn btn-primary btn-micro' : !test.manual, 'btn btn-secondary btn-micro' : test.manual}" align="middle" :id="test.anaassay._id">
                  {{ test.anaassay.test.naziv }}
                </div>
              </div>
            </div>
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
  import {http} from '../../../../config/config.js'
  import VueBarcode from '@xkeshi/vue-barcode'
  
  export default {
  
    name: 'form-wizard',
  
    mounted() {
  
      http.get('postavke/aparat/mount/list?token=' + this.$store.state.token + '&site=' + this.$store.state.site, {})
        .then(res => {
          if (res.data.success === false) {
            this.aparati.push('GREŠKA - DB Connection')
          } else {
            this.aparati = []
  
            res.data.obj.aparat.forEach(element => {
              if (!element.ime.toUpperCase().includes('MANUAL')) {
                http.post('postavke/aptest/list', {
                    email: this.$store.state.userId,
                    aparat: element.ime,
                    token: this.$store.state.token,
                    site: this.$store.state.site
                  })
                  .then(res => {
                    this.brojtestova = 0
                    res.data.aptests.forEach(element => {
                      if (!element.test.calculated && !element.test.multi) {
                        this.brojtestova++
                      }
                    })
                  }).then(res => {
                    if (this.brojtestova > 0) {
                      this.aparati.push(element.ime)
                    }
                  })
              }
            })
          }
        })
    },
    components: {
      'barcode': VueBarcode
    },
    props: ['value'],
  
    computed: {
      hrSteps() {
        return [{
            label: 'Korak 1. Aparat',
            slot: 'page1',
            onNext: () => {
              this.validateFormField('aparat')
              this.naPromjenuAparata()
              this.setujAparat()
            },
            isValid: () => {
              return (this.isFormFieldValid('aparat'))
            }
          },
          {
            label: 'Korak 2. Kontrola',
            slot: 'page2',
            onNext: () => {
              this.validateFormField('tip')
              this.validateFormField('kontrola')
              this.validateFormField('lot')
              this.reinicijalizirajSviTestovi()
            },
            isValid: () => {
              return (this.isFormFieldValid('tip') && this.isFormFieldValid('kontrola') && this.isFormFieldValid('lot') && this.kontrola != 'NEMA PODATAKA' && this.lot != 'NEMA PODATAKA')
            }
          },
          {
            label: 'Korak 3. Testovi',
            slot: 'page3',
            onNext: () => {
  
              if (!(this.testovi.length === 0)) {
                http.post('kontrole/uzorci/save', {
                    aparat: this.aparat,
                    tip: this.tip,
                    kontrola: this.kontrola,
                    lot: this.lot,
                    testovi: this.testovi,
                    user: this.$store.state.userId,
                    token: this.$store.state.token,
                    site: this.$store.state.site
                  })
                  .then(res => {
                    this.id = res.data.data.uzorak.id
                    this.bar = true
                    this.barcodeUrl = res.data.data.link
                  })
              }
            },
            isValid: () => {
              if (this.testovi.length <= 0) {
                this.showAlertDialog()
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
              return (this.isFormFieldValid('id'))
            }
          }
        ]
      }
    },
    data() {
      return {
        aparat: '',
        aparati: [],
        aparat_id: {},
        tip: '',
        tipovi: ['POJEDINAČNA', 'MULTI'],
        kontrola: '',
        kontrole: [],
        sviTestovi: [],
        sekcija: [],
        test: '',
        sviTestovi: [],
        testovi: [],
        lot: '',
        lotovi: [],
        hrCountry: '',
        token: '',
        id: '',
        bar: false,
        show: true,
        barcodeUrl: '',
        placeholder: 'Izaberite testove',
        text: '',
        desc: '',
        activeColorStyle: '#4ab2e3',
        tempKontrole: {},
        toastText: '',
        toastIcon: '',
        toastPosition: '',
        toastDuration: 2500,
        isToastFullWidth: false,
        className: '',
        brojtestova: 0
      }
    },
    watch: {
      aparat: function() {
        this.kontrole = []
        this.lotovi = []     
      },
      tip: function() {
        this.kontrole = []
        this.lotovi = []
        this.kontrola = ''
        this.lot = ''
        this.testovi = []
        this.placeholder = 'Izaberite testove'
  
        http.post('kontrole/tip/aparat/list', {
            aparat: this.aparat,
            tip: this.tip,
            token: this.$store.state.token,
            site: this.$store.state.site,
          })
          .then(res => {
            this.tempKontrole = res.data.kontrole
            res.data.kontrole.forEach(element => {
              if (!this.kontrole.filter(kontrola => kontrola === element.ime).length > 0) {
                this.kontrole.push(element.ime)
              }
            })
          }).then(res => {
             if (this.kontrole.length < 1 && this.tip != '') {
                this.kontrole.push('NEMA PODATAKA')
              }
            
          })
      },
      kontrola: function() {
        this.lot = ''
        this.lotovi = []
        this.testovi = []
        this.placeholder = 'Izaberite testove'
        http.post('kontrole/aparat/testovi/list', {
            aparat: this.aparat,
            kontrola: this.kontrola,
            tip: this.tip,
            token: this.$store.state.token,
            site: this.$store.state.site,
          })
          .then(res => {
            this.tempKontrole.forEach(element => {
              if (this.kontrola === element.ime) {
                this.lotovi.push(element.lot)
              }
            });
            if (res.data.kontrole != null) {
              this.sviTestovi = res.data.kontrole.reference
            }
  
          }).then(res => {
             if (this.lotovi.length < 1 && this.tip != '' && this.kontrola != '') {
                this.lotovi.push('NEMA PODATAKA')
              }
            
          })
      }
    },
    methods: {
      reinicijalizirajSviTestovi() {
        this.sviTestovi = []
  
        http.post('kontrole/aparat/testovi/list', {
            aparat: this.aparat,
            kontrola: this.kontrola,
            tip: this.tip,
            token: this.$store.state.token,
            site: this.$store.state.site,
          })
          .then(res => {
  
            if (res.data.kontrole != null) {
              this.sviTestovi = res.data.kontrole.reference
            }
          })
      },
      setujAparat() {
        this.tmpAparat = this.aparat
      },
      naPromjenuAparata() {        
        if (this.aparat != this.tmpAparat) {
          this.kontrole = []
          this.kontrola = ''
          this.lot = ''
          this.tip = ''
          this.testovi = []
  
          http.post('kontrole/tip/aparat/list', {
              aparat: this.aparat,
              tip: this.tip,
              token: this.$store.state.token,
              site: this.$store.state.site,
            })
            .then(res => {
              if(res.data.kontrole){
                res.data.kontrole.forEach(element => {
                  this.kontrole.push(element.ime)
                })
              }
              
            })
        } else {
  
        }
      },
      showAlertDialog() {
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
      dodajTest(event) {
        if (this.testovi.length < 1) {
          this.placeholder = ''
        }
        var manual = false
        var calculated = false
        var kalkuliraniTestovi = []
  
        if (!this.testovi.filter(test => test.anaassay === event.target.id).length > 0) {
          this.testovi.push({
            anaassay: event.target.id,
            ime_testa: event.target.innerText
          })
          document.getElementById(event.target.id).className = 'btn btn-info btn-micro'
        }
      },
      izbaciTest(event) {
        var izbaciti = event.target.getAttribute('name')
        if (this.testovi.length < 2) {
          this.placeholder = 'Izaberite testove'
        }
        this.test = event.target.innerText
        for (var i = 0; i < this.testovi.length; i++) {
          if (this.testovi[i].anaassay === event.target.getAttribute('name')) {
            this.testovi.splice(i, 1);
            break;
          }
        }
        document.getElementById(event.target.getAttribute('name')).className = 'btn btn-primary btn-micro'
      },
      // printajBarcode() {
      //   var barUrl = this.barcodeUrl
  
      //   BrowserPrint.getDefaultDevice('printer', function(device) {
      //     var selectedDevice = device
      //     selectedDevice.sendUrl(barUrl, undefined)
      //   }, (error) => {
      //     // alert('error')
      //     this.toastText = 'Greška prilikom printanja!'
      //     this.toastIcon = 'fa-remove'
      //     this.toastPosition = 'top-right'
      //     this.className = 'vuestic-toast-danger'
  
      //     this.showToast(this.toastText, {
      //       icon: this.toastIcon,
      //       position: this.toastPosition,
      //       duration: this.toastDuration,
      //       fullWidth: this.isToastFullWidth,
      //       className: this.className,
      //     })
      //   })
      // },
      refreshWizard() {
        
      },
    }
  }
</script>

<style lang="scss">
  @import "../../../sass/_variables.scss";
  @import '../../../sass/toasts';
  @import "../../../../node_modules/bootstrap/scss/functions";
  @import "../../../../node_modules/bootstrap/scss/variables";
  @import "../../../../node_modules/bootstrap/scss/mixins/breakpoints";
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
</style>

