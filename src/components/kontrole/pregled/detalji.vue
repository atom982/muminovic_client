<template>
  <div>
    <div v-show="!report_pdf" class="row">
      <div class="col-md-12">
        <vuestic-widget :headerText="hid">
          <div class="col-md-12 widget-body">
            <div class="col-md-6 col-xl-6">
              <vuestic-widget class="info-widget brand-warning">
                <div class="info-widget-inner">
                  <div class="info-widget-inner has-chart">
                    <div class="stats">
                      <div class="stats-number">
                        <i class="ion ion-arrow-up-c text-primary stats-icon"></i> {{'Tip kontrole: ' + tip}}
                      </div>
                      <div class="stats-number">
                        <i class="ion ion-arrow-up-c text-primary stats-icon"></i> {{'Lot broj: ' + lot}}
                      </div>
                      <div class="stats-title">{{datum + ' | ' + vrijeme}}</div>
                    </div>
                    <!-- <div class="form-group form-group-w-btn" style="float:right;padding-right: 10px;">
                      <div class="btn btn-primary btn-with-icon btn-micro rounded-icon" title="Osvježi stranicu" @click='refreshAll(sid)'>
                        <div class="btn-with-icon-content">
                          <i class="fa fa-refresh"></i>
                        </div>
                      </div>
                    </div> -->
                  </div>
                </div>
              </vuestic-widget>
            </div>
            <div class="table-responsive">
              <table class="table table-striped first-td-padding">
                <thead>
                  <tr>
                    <td>NAZIV TESTA</td>
                    <td>REZULTAT</td>
                    <td>KONTROLA</td>
                    <td>JEDINICA</td>
                    <td>REFERENTNI INTERVAL</td>
                    <td>STATUS</td>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="element in testoviTmp">
                    <!-- NAZIV TESTA -->
                    <td v-if="isLow(element.result, element.refd, element.refg) || isHigh(element.result, element.refd, element.refg)"><strong>{{element.labassay.naziv}}</strong></td>
                    <td v-if="!isLow(element.result, element.refd, element.refg) && !isHigh(element.result, element.refd, element.refg)">{{element.labassay.naziv}}</td>  
                    <!-- REZULTAT -->
                    <td v-if="(element.result === 'Čekam...') && !element.manual">{{element.result}}</td>
  
                    <td v-if="(!(element.result === 'Čekam...') && !element.manual) && (isLow(element.result, element.refd, element.refg) || isHigh(element.result, element.refd, element.refg))">
                      <div v-show="element.edit == false">
                        <label @dblclick="element.edit = true">
                                    <strong>{{element.result}}</strong>
                                    </label>
                      </div>
                      <input v-show="element.edit == true" v-model="element.result" @keyup.enter="element.edit=false; $emit('update', element.labassay.naziv, 'enter',element.result, sid, element.rezultat,element._id, element.manual)">
                    </td>
  
                    <td v-if="(!(element.result === 'Čekam...') && !element.manual) && (!isLow(element.result, element.refd, element.refg) && !isHigh(element.result, element.refd, element.refg))">
                      <div v-show="element.edit == false">
                        <label @dblclick="element.edit = true">
                                    {{element.result}}
                                    </label>
                      </div>
                      <input v-show="element.edit == true" v-model="element.result" @keyup.enter="element.edit=false; $emit('update', element.labassay.naziv, 'enter',element.result, sid, element.rezultat,element._id, element.manual)">
                    </td>  
                    <!-- KONTROLA -->
                    <td v-if="isLow(element.result, element.refd, element.refg)"><strong>{{'L'}}</strong></td>
                    <td v-if="isHigh(element.result, element.refd, element.refg)"><strong>{{'H'}}</strong></td>
                    <td v-if="!isLow(element.result, element.refd, element.refg) && !isHigh(element.result, element.refd, element.refg)">{{''}}</td>
                    <!-- JEDINICA -->
                    <td v-if="isLow(element.result, element.refd, element.refg) || isHigh(element.result, element.refd, element.refg)"><strong>{{element.labassay.jedinica}}</strong></td>
                    <td v-if="!isLow(element.result, element.refd, element.refg) && !isHigh(element.result, element.refd, element.refg)">{{element.labassay.jedinica}}</td>
                    <!-- REFERENTNI INTERVAL -->
                    <td v-if="isLow(element.result, element.refd, element.refg) || isHigh(element.result, element.refd, element.refg)"><strong>{{element.refd.replace('-', '') + ' - ' + element.refg.replace('-', '')}}</strong></td>
                    <td v-if="!isLow(element.result, element.refd, element.refg) && !isHigh(element.result, element.refd, element.refg)">{{element.refd.replace('-', '') + ' - ' + element.refg.replace('-', '')}}</td>
                    <!-- STATUS -->
                    <td v-if="isLow(element.result, element.refd, element.refg) || isHigh(element.result, element.refd, element.refg)"><strong>{{element.status}}</strong></td>
                    <td v-if="!isLow(element.result, element.refd, element.refg) && !isHigh(element.result, element.refd, element.refg)">{{element.status}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="form-group">
              <div class="input-group">
                <textarea type="text" id="simple-textarea" v-model="napomena" required></textarea>
                <label class="control-label" for="simple-textarea">{{'Unesite napomenu'}}</label><i class="bar"></i>
              </div>
            </div>
            <div class="row">
              <div class="col-md-3"></div>
              <div class="col-md-6">
                <div class="btn-container">
                  <button class="btn btn-secondary wizard-back pull-left" @click.prevent="vratiPregled"><span class="fa fa-backward"></span>{{ ' POVRATAK'}}</button>
                </div>
                <div class="btn-container">                  
                  <button v-if="$store.state.userId != 'admin@atom.ba'" :disabled="!uslovRealizovanoSvePrint" class="btn btn-secondary-info wizard-next pull-right" @click.prevent="Akcija()"><span class="glyphicon glyphicon-print"></span>{{' Kontrola'}}</button>
                  <button v-if="$store.state.userId === 'admin@atom.ba'" class="btn btn-secondary-info wizard-next pull-right" @click.prevent="Akcija()"><span class="glyphicon glyphicon-print"></span>{{' Kontrola'}}</button>
                </div>
              </div>
            </div>
          </div>
        </vuestic-widget>
      </div>
    </div>

    <div v-show="report_pdf" class="row">
      <div class="col-md-12">
        <div class="btn-container">
          <button class="btn btn-secondary btn-sm" @click.prevent="Nazad"><span class="fa fa-step-backward"></span>{{ ' NAZAD'}}</button>
          <span class="blockquote">{{ hid }}</span>
        </div>
        <hr>
        <div class="d-flex flex-column align-items-center justify-content-between down-container">
          <embed src="" id="pdf" style="width: 100%;height: 800px; visibility:hidden" type='application/pdf'>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import Vue from 'vue'
  import BadgeColumn from './BadgeColumn.vue'
  import axios from 'axios'
  import router from '../../../router'
  import {http} from '../../../../config/config.js'
  import {server} from '../../../../config/config.js'
  import printJS from 'print-js'
  import pdfMake from 'pdfmake/build/pdfmake'
  import vfsFonts from 'pdfmake/build/vfs_fonts'
  
  Vue.component('badge-column', BadgeColumn)
  
  export default {
  
    name: 'ControlDetail',
    props: ['id'],
  
    data() {
      return {
        hid: '',
        bc: '',
        sid: '',
        tipUzorka: '',
        datum: '',
        vrijeme: '',
        dtUnosa: '',
        lot: '',
        tip: '',
        uslovRealizovanoSvePrint: false,
        report_pdf: false,
        timestamp: '',
        testoviTmp: [],
        napomena: '',
        toastText: '',
        toastIcon: '',
        toastPosition: '',
        toastDuration: 2500,
        isToastFullWidth: false,
        className: '',        
      }
    },
  
    created() {
      this.hid = 'Kontrolni uzorak: ' + this.$route.params.id
      // this.bc = server + 'images/barcodes/' + this.$route.params.id + '.png'
      this.sid = this.$route.params.id
      this.timestamp = new Date().getTime().toString()
      
      http.post('kontrole/pregled/' + this.$route.params.id + '?token=' + this.$store.state.token, {
        site: this.$store.state.site,
        napomena: this.napomena,
        timestamp: this.timestamp  
      }).then(res => {        
        this.testovi = res.data.kontrola.tests
        this.lot = res.data.kontrola.kontrola.lot
        this.tip = res.data.kontrola.kontrola.tip
        this.dtUnosa = res.data.datumKreiranja
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
        this.testoviTmp = []
  
        this.testovi.forEach(test => {
          res.data.kontrola.kontrola.reference.forEach(element => {
            if (element.anaassay === test.anaassay._id) {
              test.lot = res.data.kontrola.kontrola.lot
              test.refd = element.refd
              test.refg = element.refg
              test.edit = false
              if ((test.rezultat.length < 1) && (!test.labassay.manual)) {
                test.result = 'Čekam...'
                test.rezultat = 'Čekam...'
              } else if ((test.rezultat.length < 1) && (test.labassay.manual)) {
                test.result = 'Unesi'
                test.rezultat = 'Unesi'
              } else {
                test.result = test.rezultat[test.rezultat.length - 1].rezultat_f
                test.rezultat = test.rezultat[test.rezultat.length - 1].rezultat_f
              }
            }
          })
          test.manual = test.labassay.manual
          this.testoviTmp.push(test)
        })
  
        this.uslovRealizovanoSvePrint = true
  
        this.testoviTmp.forEach(element => {
          if ((isNaN(element.result.replace("<", "").replace(">", "")))) {
            this.uslovRealizovanoSvePrint = false
          }
        })
      })
    },
  
    mounted() {
      this.$on('update', function(edited, method, result, sid, rezultat, id, manual) {
        if ((isNaN(result.replace("<", "").replace(">", ""))) || result.trim() === '') {
          this.toastText = 'Vrijednost rezultata nije validna!'
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
          this.refreshAll(sid)
        } else {
          if ((method === "enter")) {
            if (result != rezultat) {
              this.editControlResult(result, sid, rezultat, id, manual)
            }
          }
        }
      })
    },
  
    beforeDestroy() {
      this.$off('update')
    },
  
    methods: {
      editControlResult(result, sid, rezultat, id, manual) {
        if (manual) {
          http.post('/kontrole/manual/create/' + this.$route.params.id, {
            id: id,
            result: result,
            token: this.$store.state.token,
            site: this.$store.state.site
          }).then(res => {
            // this.refreshAll(sid)
          })
        } else {
          http.post('kontrole/rezultat/update/' + this.$route.params.id, {
            id: id,
            result: result,
            token: this.$store.state.token,
            site: this.$store.state.site
          }).then(res => {
            // this.refreshAll(sid)
          })
        }
      },     
      refreshAll(sid) {
        http.post('kontrole/pregled/' + this.sid + '?token=' + this.$store.state.token, {
          napomena: this.napomena,
          timestamp: this.timestamp,
          site: this.$store.state.site
        }).then(res => {
          this.testovi = res.data.kontrola.tests
          this.lot = res.data.kontrola.kontrola.lot
          this.tip = res.data.kontrola.kontrola.tip  
          this.testoviTmp = []
  
          this.testovi.forEach(test => {
            res.data.kontrola.kontrola.reference.forEach(element => {
              if (element.anaassay === test.anaassay._id) {
                test.lot = res.data.kontrola.kontrola.lot
                test.refd = element.refd
                test.refg = element.refg
                test.edit = false
  
                if ((test.rezultat.length < 1) && (!test.labassay.manual)) {
                  test.result = 'Čekam...'
                  test.rezultat = 'Čekam...'
                } else if ((test.rezultat.length < 1) && (test.labassay.manual)) {
                  test.result = 'Unesi'
                  test.rezultat = 'Unesi'
                } else {
                  test.result = test.rezultat[test.rezultat.length - 1].rezultat_f
                  test.rezultat = test.rezultat[test.rezultat.length - 1].rezultat_f
                }
              }
            })
            test.manual = test.labassay.manual
            this.testoviTmp.push(test)
          })
          this.uslovRealizovanoSvePrint = true
          this.testoviTmp.forEach(element => {
            if ((isNaN(element.result.replace("<", "").replace(">", "")))) {
              this.uslovRealizovanoSvePrint = false
            }
          })
        })
      },
      vratiPregled: function() {
        router.push('/kontrole/pregled')
      },
      isLow: function(data, d, g) {
        if ((Number(data) < Number(d))) {
          return true
        }
        return false
      },
      isHigh: function(data, d, g) {
        if ((Number(data) > Number(g))) {
          return true
        }
        return false
      },
      Akcija() {
        http.post('kontrole/pregled/' + this.sid + '?token=' + this.$store.state.token, {
            napomena: this.napomena,
            timestamp: this.timestamp,
            site: this.$store.state.site
          })
          .then(res => { 
            if (res.data.success) {
              this.report_pdf = true
              document.getElementById("pdf").style.visibility = "visible"
              document.getElementById("pdf").src = server + "kontrole/" + this.timestamp + ".pdf"  
            } else {
              this.report_pdf = false              
            }
          })
      },
      Nazad: function() {  
        this.report_pdf = false  
      },
    }
  }
</script>

<style lang="scss">
  @import "../../../sass/_variables.scss";
  @import '../../../sass/toasts';

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
    &.brand-warning {
      border-top-color: $brand-warning;
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
