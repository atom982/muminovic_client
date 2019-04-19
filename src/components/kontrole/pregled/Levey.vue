<template>
  <div class="form-elements">
    <div class="row">
      <div class="col-md-12">
        <vuestic-widget v-if="uslovIzborAparata" headerText="Levey-Jennings crteži - Izbor aparata">
          <div class="row">
            <div class="col-md-3"></div>
            <div class="col-md-6">
              <vuestic-simple-select label="Izaberite aparat" v-model="tpAparat" name="aparat" :required="true" ref="aparatSelect" v-bind:options="aparati">
              </vuestic-simple-select>
            </div>
          </div>
        </vuestic-widget>
        <vuestic-widget v-if="uslovIzborTestova" :headerText="headerText">
          <vuestic-widget v-if="testIzabran" class="chart-widget" :headerText="izbor">
            <vuestic-chart v-bind:data="bubbleChartData" type="bubble" :options="bubbleOptions"></vuestic-chart>
          </vuestic-widget>
          <vuestic-widget style="text-align:center; height: auto;" v-show="!testIzabran" headerText="Izbor testa">
            <div style="text-align:center;">
              <div :id="element._id" v-for="element in testovi" class="btn btn-primary btn-micro" @click="izaberiTest($event)" :name="element.test.naziv" :title="element.test.analit">
                {{element.test.naziv }}
              </div>
            </div>
          </vuestic-widget>
          <hr v-if="1 == 1">
          <div class="row">
            <div class="col-md-3"></div>
            <div class="col-md-6">
              <div class="btn-container">
                <button class="btn btn-secondary wizard-back pull-left" @click.prevent="gotovo"><span class="fa fa-backward"></span>{{ ' POVRATAK'}}</button>
              </div>
              <div class="btn-container">
                <button v-if="testIzabran" class="btn btn-secondary wizard-next pull-right" @click.prevent="gotovoIzbor"><span class="fa fa-mouse-pointer"></span>{{ ' Testovi'}}</button>
              </div>
            </div>
          </div>
        </vuestic-widget>
        <vuestic-widget v-if="dataUslov1" :headerText="headerText">
          <vuestic-alert v-if="dataUslov1" type="warning" :withCloseBtn="false"><span>{{dataAvailable1}}</span></vuestic-alert>
          <hr v-if="1 == 1">
          <div class="row">
            <div class="col-md-3"></div>
            <div class="col-md-6">
              <button v-if="1 == 1" class="btn btn-secondary" @click.prevent="gotovo"><span class="fa fa-backward"></span>{{ ' POVRATAK'}}</button>
            </div>
          </div>
        </vuestic-widget>
        <transition name="modal" :duration="duration">
          <div v-show="show" class="modal-container">
            <div class="modal" @click.self="clickMask">
              <div class="modal-dialog" :class="modalClass">
                <div class="modal-content">
                  <!--Header-->
                  <div class="modal-header">
                    <slot name="header">
                      <div class="modal-title">
                        Izbor kontrole
                      </div>
                    </slot>
                  </div>
                  <!--Container-->
                  <div class="modal-body">
                    <vuestic-simple-select label="Izaberite lot" v-model="lot" name="lot" :required="true" ref="lot" v-bind:options="lotovi">
                    </vuestic-simple-select>
                    <vuestic-simple-select label="Izaberite mjesec" v-model="mjesec" name="mjesec" :required="true" ref="mjesec" v-bind:options="mjeseci">
                    </vuestic-simple-select>
                  </div>
                  <!--Footer-->
                  <div class="modal-footer">
                    <slot name="footer">
                      <button class="btn btn-secondary" @click="ok"><span class='fa'></span> POTVRDI</button>
                    </slot>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-backdrop"></div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
  import router from '../../../router'
  import {
    http
  } from '../../../../config/config.js'
  import VueCharts from 'vue-chartjs'
  import BubbleChart from '../../vuestic-components/vuestic-chart/chart-types/BubbleChart'
  import store from 'vuex-store'
  import utils from 'services/utils'
  
  export default {
    data() {
      return {
        headerText: '',
        uslovIzborAparata: true,
        uslovIzborTestova: false,
        testIzabran: false,
        testovi: [],
        lot: '',
        anaassay: '',
        lotovi: [],
        aparati: [],
        tpAparat: '',
        izbor: '',
        show: false,
        duration: 500,
        dataAvailable1: '',
        dataUslov1: false,
        transition: 'modal',
        small: true,
        large: false,
        force: false,
        okText: "POTVRDI",
        cancelText: 'CANCEL',
        okClass: 'btn btn-primary',
        cancelClass: 'btn btn-secondary',
        modalClass: 'modal-sm',
        bubbleChartData: [],
        mjesec: '',
        godina: '',
        dan: '',
        mjeseci: [],
        godina0: '',
        godina1: '',
        godina2: '',
        mjesec0: '',
        mjesec1: '',
        mjesec2: '',
        dan0: '',
        dan1: '',
        dan2: '',
        bubbleOptions: {},
        minValue: 0,
        maxValue: 100,
  
        toastText: '',
        toastIcon: '',
        toastPosition: '',
        toastDuration: 2500,
        isToastFullWidth: false,
        className: '',
      }
    },
    name: 'aptest',
    components: {
      BubbleChart,
    },
    created() {
      if (this.show) {
        document.body.className += ' modal-open'
      }
      this.generateDataForQuery()
    },
    beforeDestroy() {
      document.body.className = document.body.className.replace(/\s?modal-open/, '')
    },
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
                    var aPar = ''
                    this.forEach(res.data.aptests, function(test, index, arr) {
                      if (!test.test.calculated && !test.test.multi) {                        
                        aPar = element.ime
                        throw arr
                      }
                    })
                    if (aPar != '') {
                      if (!this.aparati.filter(aparat => aparat === aPar).length > 0) {
                        this.aparati.push(aPar)
                      }
                    }
                  })
              }
            })
          }
        })
    },
    watch: {
      tpAparat: function() {
        this.testovi = []
  
        if (this.tpAparat != '') {
          this.headerText = "Kontrole testova za aparat: " + this.tpAparat
  
  
          http.post('postavke/aptest/list', {
              email: this.$store.state.userId,
              aparat: this.tpAparat,
              token: this.$store.state.token,
              site: this.$store.state.site
            })
            .then(res => {
              if (res.data.success === false) {
  
              } else {
                res.data.aptests.forEach(element => {
                  if (!element.test.calculated && !element.test.multi) {
                    this.testovi.push(element)
                  }
                })
              }
            })
            .then(res => {
              this.uslovIzborAparata = false
              this.uslovIzborTestova = true
            })
        }
      },
      show(value) {
        if (value) {
          document.body.className += ' modal-open'
        } else {
          window.setTimeout(() => {
            document.body.className = document.body.className.replace(/\s?modal-open/, '')
          }, this.duration)
        }
      }
    },
  
    methods: {
      generateDataForQuery() {
        const now = new Date()
        var nowYear = now.getFullYear()
        var nowMonth = now.getMonth()
        var nowDay = now.getUTCDate()
  
        this.godina0 = nowYear
        this.godina1 = nowYear
        this.godina2 = nowYear
        this.mjesec0 = nowMonth + 1
        this.mjesec1 = this.mjesec0 - 1
        this.mjesec2 = this.mjesec1 - 1
  
        if (this.mjesec1 < 1) {
          this.mjesec1 = 12
          this.mjesec2 = this.mjesec1 - 1
          this.godina1 = this.godina0 - 1
          this.godina2 = this.godina0 - 1
        } else if (this.mjesec2 < 1) {
          this.mjesec2 = 12
          this.godina2 = this.godina0 - 1
        }
  
        if (this.mjesec0 < 10) {
          this.mjesec0 = '0' + this.mjesec0
        }
        if (this.mjesec1 < 10) {
          this.mjesec1 = '0' + this.mjesec1
        }
        if (this.mjesec2 < 10) {
          this.mjesec2 = '0' + this.mjesec2
        }    
  
        switch (this.mjesec0.toString()) {
          case '01':
            this.mjesec0 = 'JANUAR'
            this.dan0 = 31
            break;
          case '02':
            this.mjesec0 = 'FEBRUAR'
            if (this.isLeapYear(this.godina0)) {
              this.dan0 = 29
            } else {
              this.dan0 = 28
            }
            break;
          case '03':
            this.mjesec0 = 'MART'
            this.dan0 = 31
            break;
          case '04':
            this.mjesec0 = 'APRIL'
            this.dan0 = 30
            break;
          case '05':
            this.mjesec0 = 'MAJ'
            this.dan0 = 31
            break;
          case '06':
            this.mjesec0 = 'JUNI'
            this.dan0 = 30
            break;
          case '07':
            this.mjesec0 = 'JULI'
            this.dan0 = 31
            break;
          case '08':
            this.mjesec0 = 'AVGUST'
            this.dan0 = 31
            break;
          case '09':
            this.mjesec0 = 'SEPTEMBAR'
            this.dan0 = 30
            break;
          case '10':
            this.mjesec0 = 'OKTOBAR'
            this.dan0 = 31
            break;
          case '11':
            this.mjesec0 = 'NOVEMBAR'
            this.dan0 = 30
            break;
          case '12':
            this.mjesec0 = 'DECEMBAR'
            this.dan0 = 31
            break;
        }
  
        switch (this.mjesec1.toString()) {
          case '01':
            this.mjesec1 = 'JANUAR'
            this.dan1 = 31
            break;
          case '02':
            this.mjesec1 = 'FEBRUAR'
            if (this.isLeapYear(this.godina0)) {
              this.dan1 = 29
            } else {
              this.dan1 = 28
            }
            break;
          case '03':
            this.mjesec1 = 'MART'
            this.dan1 = 31
            break;
          case '04':
            this.mjesec1 = 'APRIL'
            this.dan1 = 30
            break;
          case '05':
            this.mjesec1 = 'MAJ'
            this.dan1 = 31
            break;
          case '06':
            this.mjesec1 = 'JUNI'
            this.dan1 = 30
            break;
          case '07':
            this.mjesec1 = 'JULI'
            this.dan1 = 31
            break;
          case '08':
            this.mjesec1 = 'AVGUST'
            this.dan1 = 31
            break;
          case '09':
            this.mjesec1 = 'SEPTEMBAR'
            this.dan1 = 30
            break;
          case '10':
            this.mjesec1 = 'OKTOBAR'
            this.dan1 = 31
            break;
          case '11':
            this.mjesec1 = 'NOVEMBAR'
            this.dan1 = 30
            break;
          case '12':
            this.mjesec1 = 'DECEMBAR'
            this.dan1 = 31
            break;
        }
  
        switch (this.mjesec2.toString()) {
          case '01':
            this.mjesec2 = 'JANUAR'
            this.dan2 = 31
            break;
          case '02':
            this.mjesec2 = 'FEBRUAR'
            if (this.isLeapYear(this.godina0)) {
              this.dan2 = 29
            } else {
              this.dan2 = 28
            }
            break;
          case '03':
            this.mjesec2 = 'MART'
            this.dan2 = 31
            break;
          case '04':
            this.mjesec2 = 'APRIL'
            this.dan2 = 30
            break;
          case '05':
            this.mjesec2 = 'MAJ'
            this.dan2 = 31
            break;
          case '06':
            this.mjesec2 = 'JUNI'
            this.dan2 = 30
            break;
          case '07':
            this.mjesec2 = 'JULI'
            this.dan2 = 31
            break;
          case '08':
            this.mjesec2 = 'AVGUST'
            this.dan2 = 31
            break;
          case '09':
            this.mjesec2 = 'SEPTEMBAR'
            this.dan2 = 30
            break;
          case '10':
            this.mjesec2 = 'OKTOBAR'
            this.dan2 = 31
            break;
          case '11':
            this.mjesec2 = 'NOVEMBAR'
            this.dan2 = 30
            break;
          case '12':
            this.mjesec2 = 'DECEMBAR'
            this.dan2 = 31
            break;
        }
  
        this.mjeseci.push(this.mjesec0)
        this.mjeseci.push(this.mjesec1)
        this.mjeseci.push(this.mjesec2)    
  
      },
      isLeapYear(year) {
        return new Date(year, 1, 29).getDate() === 29
      },
      gotovo: function() {
        this.tpAparat = ''
        this.uslovIzborAparata = true
        this.uslovIzborTestova = false
        this.testIzabran = false
        this.dataAvailable1 = ''
        this.dataUslov1 = false
      },
      showBasicDialog() {
        this.toastText = 'Ne postoji definisan lot!'
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
      izaberiTest: function(event) {
        this.lotovi = []
        this.lot = ''
        this.mjesec = ''
  
        this.anaassay = event.target.id
        http.post('kontrole/pregled/lotovi', {
            email: this.$store.state.userId,
            anaassay: event.target.id,
            token: this.$store.state.token,
            site: this.$store.state.site,
          })
          .then(res => {
            res.data.kontrole.forEach(element => {
              this.lotovi.push(element.lot)
            });
            this.izbor = 'Kontrola za test: ' + event.target.innerText
  
            if (this.lotovi.length > 0) {
              this.show = true
            }
            if (this.lotovi.length < 1) {
              this.showBasicDialog()
            }
          })
      },
      gotovoIzbor: function() {
        this.izbor = ''
        this.testIzabran = false
      },
      ok() {
        var triSDd = []
        var triSDg = []
        var dvaSDd = []
        var dvaSDg = []
        var jedanSDd = []
        var jedanSDg = []
        var refd = '0'
        var refg = '0'
        var kontrole = []
        var minmax = []
        var sd = 0
        var sv = 0
        var i = 0
        var item = true
  
        if (this.mjesec === this.mjeseci[0]) {
          this.mjesec = this.mjesec0
          this.godina = this.godina0
          this.dan = this.dan0
        }
        if (this.mjesec === this.mjeseci[1]) {
          this.mjesec = this.mjesec1
          this.godina = this.godina1
          this.dan = this.dan1
        }
        if (this.mjesec === this.mjeseci[2]) {
          this.mjesec = this.mjesec2
          this.godina = this.godina2
          this.dan = this.dan2
        }
  
        if (this.lot === '' && this.mjesec === '') {
          item = false
          this.toastText = 'Izaberite lot i mjesec!'
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
        } else if (this.lot === '') {
          item = false
          this.toastText = 'Izaberite lot!'
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
        } else if (this.mjesec === '') {
          item = false
          this.toastText = 'Izaberite mjesec!'
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
          http.post('kontrole/pregled/levey', {
              email: this.$store.state.userId,
              anaassay: this.anaassay,
              lot: this.lot,
              mjesec: this.mjesec,
              godina: this.godina,
              dan: this.dan,
              token: this.$store.state.token,
              site: this.$store.state.site,
            })
            .then(res => {
              if (res.data.tests.length > 0) {
                let palette = store.getters.palette
  
                res.data.tests.forEach(test => {
                  test.tests.forEach(element => {
                    i++
  
                    if (element.rezultat.length && (element.anaassay._id === this.anaassay)) {
                      kontrole.push({
                        x: test.created_at.toString().slice(8, 10),
                        y: element.rezultat[element.rezultat.length - 1].rezultat_f,
                        r: 10
                      })
                      minmax.push(element.rezultat[element.rezultat.length - 1].rezultat_f)
                    }
                  })
                  test.kontrola.reference.forEach(element => {
                    if (element.anaassay === this.anaassay) {
                      refd = element.refd
                      refg = element.refg
                      sd = (+refg - +refd) / 6
                      sv = (+refd + +refg) / 2
                    }
                  })
                  triSDd.push({
                    x: test.created_at.toString().slice(8, 10),
                    y: refd,
                    r: 2
                  })
                  dvaSDd.push({
                    x: test.created_at.toString().slice(8, 10),
                    y: +refd + +sd,
                    r: 2
                  })
                  jedanSDd.push({
                    x: test.created_at.toString().slice(8, 10),
                    y: +sv - +sd,
                    r: 2
                  })
                  jedanSDg.push({
                    x: test.created_at.toString().slice(8, 10),
                    y: +sv + +sd,
                    r: 2
                  })
                  dvaSDg.push({
                    x: test.created_at.toString().slice(8, 10),
                    y: +refg - +sd,
                    r: 2
                  })
                  triSDg.push({
                    x: test.created_at.toString().slice(8, 10),
                    y: refg,
                    r: 2
                  })
                })
  
                this.minValue = Math.floor(Math.min(...minmax))
                this.maxValue = Math.ceil(Math.max(...minmax))
  
                var A = minmax
  
                function diff(ary) {
                  var newA = [];
                  for (var i = 1; i < ary.length; i++) newA.push(Math.abs((A[i] - ary[i - 1]).toFixed(2)))
                  return newA;
                }
  
                Array.prototype.sum = Array.prototype.sum || function() {
                  return this.reduce(function(sum, a) {
                    return sum + Number(a)
                  }, 0);
                }
  
                Array.prototype.average = Array.prototype.average || function() {
                  return this.sum() / (this.length || 1);
                }
  
                var data = {
                  datasets: [{
                      label: '+3SD',
                      backgroundColor: utils.hex2rgb(palette.danger, 0.9).css,
                      borderColor: palette.transparent,
                      data: triSDg
                    },
                    {
                      label: '+2SD',
                      backgroundColor: utils.hex2rgb(palette.warning, 0.9).css,
                      borderColor: palette.transparent,
                      data: dvaSDg
                    },
                    {
                      label: '+1SD',
                      backgroundColor: utils.hex2rgb(palette.primary, 0.9).css,
                      borderColor: palette.transparent,
                      data: jedanSDd
                    },
                    {
                      label: '-1SD',
                      backgroundColor: utils.hex2rgb(palette.primary, 0.9).css,
                      borderColor: palette.transparent,
                      data: jedanSDg
                    },
                    {
                      label: '-2SD',
                      backgroundColor: utils.hex2rgb(palette.warning, 0.9).css,
                      borderColor: palette.transparent,
                      data: dvaSDd
                    },
                    {
                      label: '-3SD',
                      backgroundColor: utils.hex2rgb(palette.danger, 0.9).css,
                      borderColor: palette.transparent,
                      data: triSDd
                    },
                    {
                      label: 'Kontrola',
                      backgroundColor: utils.hex2rgb(palette.info, 0.9).css,
                      borderColor: palette.transparent,
                      data: kontrole
                    },
                  ]
                }
                this.bubbleChartData = data
  
                this.testIzabran = true
                this.show = false
  
                this.bubbleOptions = {
                  responsive: true,
                  title: {
                    display: true,
                    text: 'Pregled za mjesec ' + this.mjesec + ', ' + this.godina + '. godine'
                  },
                  scales: {
                    xAxes: [{
                      gridLines: {
                        display: true
                      },
                      ticks: {
                        min: 1,
                        max: this.dan,
                        stepSize: 1
                      }
                    }],
                    yAxes: [{
                      gridLines: {
                        display: true
                      },
                      ticks: {}
                    }],
                  }
                }
              } else {
                this.toastText = 'Nema rezultata!'
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
            })
        }
      },
      cancel() {
        this.$emit('cancel')
  
        this.show = false
      },
      clickMask() {
        if (!this.force) {
          this.cancel()
        }
      },
      open() {
        this.show = true
      },
      forEach: function(arr, fn, thisObj) {
        // Try-catch surrounds the loop to allow throwing the array as an equivalent
        // for breaking out of the loop.
        try {
          for (var i = 0, len = arr.length; i < len; i++) {
            fn.call(thisObj, arr[i], i, arr);
          }
        } catch (e) {
          // If the error thrown was not the array, allow the error to continue up the
          // stack.
          if (e !== arr) {
            throw e;
          }
        }
        // Return a reference to the array to all for further manipulation.
        return arr;
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../sass/_variables.scss";
  @import '../../../sass/toasts';
  @import "../../../../node_modules/bootstrap/scss/functions";
  @import "../../../../node_modules/bootstrap/scss/variables";
  .modal {
    display: block;
  }
  
  .modal-dialog,
  .modal-backdrop {
    transition: all .5s ease;
  }
  
  .modal-enter .modal-dialog,
  .modal-leave-active .modal-dialog {
    opacity: 0;
    transform: translateY(-30%);
  }
  
  .modal-enter .modal-backdrop,
  .modal-leave-active .modal-backdrop {
    opacity: 0;
  }
  
  .modal-backdrop {
    opacity: 0.5;
  }
  
  //Modal styles
  .modal-header {
    height: $modal-header-height;
    padding: $modal-header-padding-y $modal-header-padding-x;
    border-bottom: $modal-header-border;
    font-size: $font-size-larger;
    display: flex;
    align-items: center;
  }
  
  .modal-content {
    border-radius: $modal-content-border-radius;
  }
  
  .modal-footer {
    justify-content: center;
    padding: 0 $modal-inner-padding;
    padding-bottom: calc(#{$modal-inner-padding} - #{$modal-footer-btns-padding-bottom});
    flex-wrap: wrap;
    .btn {
      margin: 0 $modal-footer-btns-margin-x $modal-footer-btns-padding-bottom $modal-footer-btns-margin-x;
    }
  }
  
  .modal-dialog {
    box-shadow: $modal-content-box-shadow-sm-up;
  }
  
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
  
  .testoviDiv {
    margin: 0 auto;
  }
  
  .testDiv {
    display: inline-block;
    color: #444;
    border: 1px solid #CCC;
    background: #DDD;
    box-shadow: 0 0 5px -1px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    vertical-align: middle;
    max-width: 150px;
    padding: 5px;
    text-align: center;
    background-color: #C8F9C5;
    border-radius: 10px;
    margin-right: 5px;
  }
  
  .divi {
    height: 200px;
    line-height: 200px;
    text-align: center;
  }
</style>