<template>
  <div class="vuestic-modal">
    <transition name="modal" :duration="duration">
      <div v-show="showPlus" class="modal-container">
        <div class="modal" @click.self="clickMask">
          <div class="modal-dialog" :class="modalClass">
            <div class="modal-content">
              <!--Header-->
              <div class="modal-header">
                <slot name="header">
                  <div class="modal-title">
                    <slot name="title"></slot>
                  </div>

                  <i
                    class="ion ion-md-close close-modal"
                    v-if="closeIconShown"
                    @click.prevent="cancel"
                  />
                </slot>
              </div>
              <!--Container-->
              <div class="modal-body">
                <slot></slot>
                <!-- {{sid}} -->
                <div v-show="ruler" class="col-md-12">
                  <div style="text-align:center;" class="testoviDiv">
                    <div
                      v-for="test in testovi"
                      :class="{
                      'btn btn-primary btn-micro' : ((!test.disable || test.disable === undefined) && klasaTesta(test.analit, test.manual, test.calculated)[0] === 'Lab'), 
                      'btn btn-warning btn-micro' : ((!test.disable || test.disable === undefined) && klasaTesta(test.analit, test.manual, test.calculated)[0] === 'Calc'), 
                      'btn btn-secondary btn-micro' : ((!test.disable || test.disable === undefined) && klasaTesta(test.analit, test.manual, test.calculated)[0] === 'Man'),
                      'disabled btn btn-primary btn-micro' : ((test.disable) && klasaTesta(test.analit, test.manual, test.calculated)[0] === 'Lab'), 
                      'disabled btn btn-warning btn-micro' : ((test.disable ) && klasaTesta(test.analit, test.manual, test.calculated)[0] === 'Calc'), 
                      'disabled btn btn-secondary btn-micro' : ((test.disable) && klasaTesta(test.analit, test.manual, test.calculated)[0] === 'Man')}"
                      @click="izbaciTest($event, test.disable)"
                      :name="test.labassay"
                    >{{test.ime_testa }}</div>&nbsp&nbsp
                    <hr>
                  </div>
                  <div>
                    <div
                      style="text-align:center;"
                      v-for="index in Math.ceil(sviTestovi.length/100) "
                      class="table"
                    >
                      <div
                        v-show="showTest($store.state.site, test.analit, ukGodina, spol, drstanje, menopauza, test.manual, test.calculated)[2] && !test.disabled"
                        @click="dodajTest($event, test)"
                        :title="test.analit"
                        v-for="test in (sviTestovi.slice((index-1)*100,index*100))"
                        :class="{'btn btn-primary btn-micro' : klasaTesta(test.analit, test.manual, test.calculated)[0] === 'Lab', 'btn btn-warning btn-micro' : klasaTesta(test.analit, test.manual, test.calculated)[0] === 'Calc', 'btn btn-secondary btn-micro' : klasaTesta(test.analit, test.manual, test.calculated)[0] === 'Man'}"
                        align="middle"
                        :id="test.labassay"
                      >{{test.ime_testa}}</div>
                    </div>
                  </div>
                  <div v-show="false">
                    <div
                      style="text-align:center;"
                      v-for="index in Math.ceil(basSviTestovi.length/100) "
                      class="table"
                    >
                      <div
                        @click="dodajTest($event, test)"
                        :title="test.analit"
                        v-for="test in (basSviTestovi.slice((index-1)*100,index*100))"
                        :class="{'btn btn-primary btn-micro' : klasaTesta(test.analit, test.manual, test.calculated)[0] === 'Lab', 'btn btn-warning btn-micro' : klasaTesta(test.analit, test.manual, test.calculated)[0] === 'Calc', 'btn btn-secondary btn-micro' : klasaTesta(test.analit, test.manual, test.calculated)[0] === 'Man'}"
                        align="middle"
                        :id="test.labassay"
                      >{{test.ime_testa}}</div>
                    </div>
                  </div>
                </div>
              </div>
              <!--Footer-->
              <div class="modal-footer">
                <slot name="footer">
                  <button
                    type="button"
                    v-if="!noButtons"
                    :class="cancelClass"
                    @click="cancel"
                    :disabled="cancelDisabled"
                  >{{ cancelText }}</button>
                  <button
                    type="button"
                    v-if="!noButtons"
                    :class="okClass"
                    @click="ok"
                    :disabled="okDisabled"
                  >{{ okText }}</button>
                </slot>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-backdrop"></div>
      </div>
    </transition>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import router from "../../../router";
import { http } from "../../../../config/config.js";
import { server } from "../../../../config/config.js";
import { bus } from "../../../main";
import { sampleSelection } from "../../funkcije/shared/samples.js";

export default {
  name: "vuestic-modal-plus",
  props: {
    transition: {
      type: String,
      default: "modal"
    },
    small: {
      type: Boolean,
      default: false
    },
    large: {
      type: Boolean,
      default: true
    },
    force: {
      type: Boolean,
      default: false
    },
    okText: {
      type: String,
      default: "SAČUVAJ"
    },
    cancelText: {
      type: String,
      default: "ZATVORI"
    },
    okClass: {
      type: String,
      default: "btn btn-primary btn-sm"
    },
    cancelClass: {
      type: String,
      default: "btn btn-warning btn-sm"
    },
    closeIconShown: {
      type: Boolean,
      default: false
    },
    okDisabled: {
      type: Boolean,
      default: false
    },
    cancelDisabled: {
      type: Boolean,
      default: false
    },
    noButtons: {
      type: Boolean,
      default: false
    },
    sid: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      showPlus: false,
      duration: 500,

      ime: "",
      prezime: "",
      jmbg: "",
      spol: "",
      lokacija: "",
      drstanje: "",
      menstc: "",
      anticoag: "",
      menopauza: "",
      jmbgObj: {},
      jmbgDan: "",
      jmbgMjesec: "",
      jmbgGodina: "",
      ukGodina: "",
      tip: "",
      ruler: false,
      sekcija: [],
      izabraniTestovi: [],
      sviTestovi: [],
      sviRezultati:[],
      basSviTestovi: [],
      testovi: [],

      toastText: "",
      toastIcon: "",
      toastPosition: "",
      toastDuration: 2500,
      isToastFullWidth: false,
      className: ""
    };
  },
  computed: {
    modalClass() {
      return {
        "modal-lg": this.large,
        "modal-sm": this.small
      };
    }
  },
  created() {
    if (this.showPlus) {
      document.body.className += " modal-open";
    }
  },
  beforeDestroy() {
    document.body.className = document.body.className.replace(
      /\s?modal-open/,
      ""
    );
  },
  watch: {
    showPlus(value) {
      if (value) {
        document.body.className += " modal-open";
      } else {
        window.setTimeout(() => {
          document.body.className = document.body.className.replace(
            /\s?modal-open/,
            ""
          );
        }, this.duration);
      }
    }
  },
  methods: {
    listenKeyUp(event) {
      if (event.key === "Escape") {
        this.cancel();
      }
    },
    ok() {
      this.$emit("ok");
      this.sacuvajIzmjene();
      // this.showPlus = false
      window.removeEventListener("keyup", this.listenKeyUp);
    },
    cancel() {
      this.$emit("cancel");
      this.showPlus = false;
      window.removeEventListener("keyup", this.listenKeyUp);
    },
    clickMask() {
      if (!this.force) {
        this.cancel();
      }
    },
    open() {
      this.showPlus = true;
      window.addEventListener("keyup", this.listenKeyUp);

      this.ruler = false;
      this.izabraniTestovi = [];
      this.sviTestovi = [];
      this.basSviTestovi = [];
      this.testovi = [];

      http
        .get(
          "uzorci/show/" +
            this.sid +
            "?token=" +
            this.$store.state.token +
            "&site=" +
            this.$store.state.site,
          {}
        )
        .then(res => {
          this.ime = res.data.uzorak.patient.ime;
          this.prezime = res.data.uzorak.patient.prezime;
          this.jmbg = res.data.uzorak.patient.jmbg;
          this.spol = res.data.uzorak.patient.spol;
          
          this.lokacija = res.data.uzorak.lokacija.lokacija;
          this.drstanje = res.data.uzorak.trudnica;
          this.menstc = res.data.uzorak.menstc;
          this.anticoag = res.data.uzorak.anticoag;
          this.menopauza = res.data.uzorak.menopauza;
          this.tip = res.data.uzorak.type;
          this.sekcija = res.data.uzorak.sekcija;
          this.izabraniTestovi = res.data.uzorak.tests;
          this.sviRezultati = res.data.rezultat.rezultati
          this.ukupnaStarost();

          http
            .post("/uzorci/sekcije/list", {
              sekcija: this.sekcija,
              token: this.$store.state.token,
              tip: this.tip,
              site: this.$store.state.site
            })
            .then(res => {
              if (res.data.success === false) {
                this.sviTestovi = [];
              } else {
                this.sviTestovi = [];

                res.data.testovi.forEach(element => {
                  this.basSviTestovi.push({
                    labassay: element._id,
                    ime_testa: element.naziv,
                    cijena: element.price,
                    analit: element.analit,
                    sekcija: element.sekcija,
                    manual: element.manual,
                    calculated: element.calculated,
                    calculatedTests: element.calculatedTests
                  });

                  

                  if (
                    sampleSelection(
                      this.$store.state.site,
                      element.analit,
                      this.ukGodina,
                      this.spol,
                      this.drstanje,
                      this.menopauza
                    )[1] 
                  ) {
                    this.sviTestovi.push({
                      disabled: element.disabled,
                      labassay: element._id,
                      ime_testa: element.naziv,
                      cijena: element.price,
                      analit: element.analit,
                      sekcija: element.sekcija,
                      manual: element.manual,
                      calculated: element.calculated,
                      calculatedTests: element.calculatedTests
                    });
                  }
                });
              }
            })
            .then(res => {
              var editable = true
              this.sviTestovi.forEach(element => {
                this.izabraniTestovi.forEach(izabrani => {
                  if (izabrani.labassay._id === element.labassay) {

                    editable = false

                    this.sviRezultati.forEach(rez => {  
                      
                        if (rez.labassay._id  === element.labassay) {                          
                            // console.log(element.analit)
                            // console.log(rez.rezultat[rez.rezultat.length - 1].rezultat_f)
                            if (rez.rezultat[rez.rezultat.length - 1].rezultat_f != '') {    
                              editable = true   
                                                
                           
                            }
                            // console.log(editable) 
                        }
                      })

                    this.dodajTestInit(
                      element.labassay,
                      element.ime_testa,
                      izabrani.labassay.manual,
                      izabrani.status_t,
                      editable

                    );
                  }
                });
              });

              for (var i = this.sviTestovi.length - 1; i >= 0; i--) {
                for (var j = 0; j < this.izabraniTestovi.length; j++) {
                  if (
                    this.sviTestovi[i] &&
                    this.sviTestovi[i].labassay ===
                      this.izabraniTestovi[j].labassay._id
                  ) {
                    this.sviTestovi.splice(i, 1);
                  }
                }
              }
            })
            .then(res => {
              this.ruler = true;
            });
        });
    },
    close() {
      this.showPlus = false;
      window.removeEventListener("keyup", this.listenKeyUp);
    },

    // ------------------------------------

    removeDuplicates(originalArray, prop) {
      var newArray = [];
      var lookupObject = {};

      for (var i in originalArray) {
        lookupObject[originalArray[i][prop]] = originalArray[i];
      }

      for (i in lookupObject) {
        newArray.push(lookupObject[i]);
      }
      return newArray;
    },

    sacuvajIzmjene: function() {
      http
        .post("/uzorci/update", {
          sid: this.sid,
          jmbg: this.jmbg,
          testovi: this.testovi,
          token: this.$store.state.token,
          site: this.$store.state.site,
          spol: this.spol,
          trudnica: this.drstanje,
          menstc: this.menstc,
          anticoag: this.anticoag,
          menopauza: this.menopauza,
          jmbgObj: this.jmbgObj
        })
        .then(res => {
          if (res.data.success === true) {
            this.toastText = "Uzorak uspješno izmijenjen!";
            this.toastIcon = "fa-check";
            this.toastPosition = "top-right";
            this.className = "vuestic-toast-primary";

            this.showToast(this.toastText, {
              icon: this.toastIcon,
              position: this.toastPosition,
              duration: this.toastDuration,
              fullWidth: this.isToastFullWidth,
              className: this.className
            });

            this.showPlus = false;
            bus.$emit("showPlusRefresh");
          } else {
            this.toastText = "Greška prilikom izmjene uzorka!";
            this.toastIcon = "fa-remove";
            this.toastPosition = "top-right";
            this.className = "vuestic-toast-danger";

            this.showToast(this.toastText, {
              icon: this.toastIcon,
              position: this.toastPosition,
              duration: this.toastDuration,
              fullWidth: this.isToastFullWidth,
              className: this.className
            });
          }
        });
    },

    ukupnaStarost: function() {
      var str = "";
      var tmp = "";
      this.jmbgDan = this.jmbg.slice(0, 2);
      this.jmbgMjesec = this.jmbg.slice(2, 4);
      this.jmbgGodina = this.jmbg.slice(4, 7);

      if (this.jmbgGodina[0] === "9") {
        str = "1";
        tmp = this.jmbgGodina;
        this.jmbgGodina = str.concat(tmp);
      } else if (this.jmbgGodina[0] === "0") {
        str = "2";
        tmp = this.jmbgGodina;
        this.jmbgGodina = str.concat(tmp);
      } else {
      }

      var date = this.jmbgGodina + "-" + this.jmbgMjesec + "-" + this.jmbgDan;
      this.jmbgObj = this.dateDiff(date);
      this.ukGodina = this.jmbgObj.years + 1;
    },

    dateDiff(date) {
      date = date.split("-");
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

      days = Math.floor(
        (today.getTime() -
          new Date(yy + years, mm + months - 1, dd).getTime()) /
          (24 * 60 * 60 * 1000)
      );

      return {
        years: years,
        months: months,
        days: days
      };
    },
    dodajTestInit(event, ime, manual, status, editable) {
      // console.log(editable)
      if (this.testovi.length < 1) {
        this.placeholder = "";
      }

      var manual = false;
      var calculated = false;
      var kalkuliraniTestovi = [];
      var sekc = "";
      var anlit = "";
      var cost = "";

      if (!this.testovi.filter(test => test.labassay === event).length > 0) {
        this.sviTestovi.forEach(element => {
          if (event === element.labassay) {
            sekc = element.sekcija;
            anlit = element.analit;
            cost = element.cijena;
          }

          if (element.manual && event === element.labassay) {
            manual = true;
          }

          if (element.calculated && event === element.labassay) {
            calculated = true;

            element.calculatedTests.forEach(kalk => {
              kalk.sekcija = element.sekcija;
              kalk.calculated = false;
              kalk.calculatedTests = [];
              kalk.cijena = "0";
              kalk.disable = true;

              this.basSviTestovi.forEach(bastest => {
                if (bastest.labassay === kalk.labassay) {
                  kalk.cijena = bastest.cijena;
                  kalk.analit = bastest.analit;
                }
              });

              if (
                !this.testovi.filter(test => test.labassay === kalk.labassay)
                  .length > 0
              ) {
                this.testovi.push(kalk);
              }

              kalkuliraniTestovi.push(kalk);
              // document.getElementById(kalk.labassay).className = 'btn btn-info btn-micro'
            });
          }
        });

        this.testovi.push({
          disable: editable,
          labassay: event,
          ime_testa: ime,
          cijena: cost,
          analit: anlit,
          sekcija: sekc,
          manual: manual,
          calculated: calculated,
          calculatedTests: kalkuliraniTestovi
        });

        //document.getElementById(event).className = 'btn btn-info btn-micro'
      }
    },

    dodajTest(event) {
      if (this.testovi.length < 1) {
        this.placeholder = "";
      }
      var manual = false;
      var calculated = false;
      var kalkuliraniTestovi = [];
      var sekc = "";
      var anlit = "";
      var cost = "";

      if (
        !this.testovi.filter(test => test.labassay === event.target.id).length >
        0
      ) {
        this.sviTestovi.forEach(element => {
          if (event.target.id === element.labassay) {
            sekc = element.sekcija;
            anlit = element.analit;
            cost = element.cijena;
          }
          if (element.manual && event.target.id === element.labassay) {
            manual = true;
          }
          if (element.calculated && event.target.id === element.labassay) {
            calculated = true;

            element.calculatedTests.forEach(kalk => {
              kalk.sekcija = element.sekcija;
              kalk.calculated = false;
              kalk.calculatedTests = [];
              kalk.cijena = "0";

              this.basSviTestovi.forEach(bastest => {
                if (bastest.labassay === kalk.labassay) {
                  kalk.cijena = bastest.cijena;
                  kalk.analit = bastest.analit;
                }
              });

              if (
                !this.testovi.filter(test => test.labassay === kalk.labassay)
                  .length > 0
              ) {
                this.testovi.push(kalk);
              }

              kalkuliraniTestovi.push(kalk);
              document.getElementById(kalk.labassay).className =
                "btn btn-info btn-micro";
            });
          }
        });

        this.testovi.push({
          labassay: event.target.id,
          ime_testa: event.target.innerText,
          cijena: cost,
          analit: anlit,
          sekcija: sekc,
          manual: manual,
          calculated: calculated,
          calculatedTests: kalkuliraniTestovi
        });

        document.getElementById(event.target.id).className =
          "btn btn-info btn-micro";
      }
    },
    izbaciTest(event, disable) {

      if (disable != undefined && disable) {
        this.toastText = "Test nije moguće ukloniti!";
        this.toastIcon = "fa-warning";
        this.toastPosition = "top-right";
        this.className = "vuestic-toast-warning";

        this.showToast(this.toastText, {
          icon: this.toastIcon,
          position: this.toastPosition,
          duration: this.toastDuration,
          fullWidth: this.isToastFullWidth,
          className: this.className
        });
      }
      
      else{

        if (this.testovi.length < 2) {
        // console.warn('Jeste li sigurni da želite obrisati uzorak?')
        this.toastText = "Test nije moguće ukloniti! Zatvorite prozor i obrišite uzorak.";
        this.toastIcon = "fa-warning";
        this.toastPosition = "top-right";
        this.className = "vuestic-toast-warning";

        this.showToast(this.toastText, {
          icon: this.toastIcon,
          position: this.toastPosition,
          duration: this.toastDuration,
          fullWidth: this.isToastFullWidth,
          className: this.className
        });
        
      }

         else {
        var alert = false;
        var izbaciti = event.target.getAttribute("name");
        var count = 0;

        this.testovi.forEach(element => {
          if (element.calculated) {
            element.calculatedTests.forEach(kalk => {
              if (izbaciti === kalk.labassay) {
                count++;
              }
            });
          }
        });

        if (count > 0) {
          alert = false;
          this.toastText = "Test nije moguće ukloniti!";
          this.toastIcon = "fa-warning";
          this.toastPosition = "top-right";
          this.className = "vuestic-toast-warning";

          this.showToast(this.toastText, {
            icon: this.toastIcon,
            position: this.toastPosition,
            duration: this.toastDuration,
            fullWidth: this.isToastFullWidth,
            className: this.className
          });
        } else {
          alert = true;
        }

        if (alert) {
          if (this.testovi.length < 2) {
            this.placeholder = "Izaberite testove";
          }
          this.test = event.target.innerText;
          for (var i = 0; i < this.testovi.length; i++) {
            if (
              this.testovi[i].labassay === event.target.getAttribute("name")
            ) {
              this.testovi.splice(i, 1);
              break;
            }
          }
          if (event.target.className === "btn btn-primary btn-micro") {
            document.getElementById(
              event.target.getAttribute("name")
            ).className = "btn btn-primary btn-micro";
          }
          if (event.target.className === "btn btn-secondary btn-micro") {
            document.getElementById(
              event.target.getAttribute("name")
            ).className = "btn btn-secondary btn-micro";
          }
          if (event.target.className === "btn btn-warning btn-micro") {
            document.getElementById(
              event.target.getAttribute("name")
            ).className = "btn btn-warning btn-micro";
          }
        }
      }


      }


      
    },
    klasaTesta: function(naziv, manual, calculated) {
      return sampleSelection(
        this.$store.state.site,
        naziv,
        "",
        "",
        "",
        "",
        manual,
        calculated
      );
    },
    showTest: function(
      site,
      analit,
      godina,
      spol,
      drstanje,
      menopauza,
      manual,
      calculated
    ) {
      return sampleSelection(
        site,
        analit,
        godina,
        spol,
        drstanje,
        menopauza,
        manual,
        calculated
      );
    }
  }
};
</script>

<style lang="scss">
@import "../../../sass/_variables.scss";
@import "../../../sass/toasts";

// Colors //
$gray-light: #acb5be !default;
$light-gray: #eeeeee;
$lighter-gray: #dddddd;
$charcoal: #555555;
$darkest-gray: #333333;
$almost-black: #161616;
$hover-black: #222222;
$vue-green: #4ae387;
$vue-light-green: #dbf9e8;
$light-green: #c8f9c5;
$lighter-green: #e9fde8;
$light-blue: #dcf1ff;
$light-yellow: #fff1c8;
$light-pink: #ffcece;
$vue-darkest-blue: #34495e;
$vue-turquoise: #dbf9e7;
$white: #ffffff;
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
$text-gray: #b4b4b4;
$colors-map: (
  brand-danger: $brand-danger,
  brand-primary: $brand-primary,
  brand-info: $brand-info,
  brand-success: $brand-success,
  brand-warning: $brand-warning,
  black: black,
  white: white,
  lighter-gray: $lighter-gray
);
$theme-colors: (
  "primary": $brand-primary,
  "secondary": $white,
  "success": $light-green,
  "info": $brand-info,
  "warning": $brand-warning,
  "danger": $brand-danger,
  "light": $light-gray2,
  "dark": $almost-black,
  "pale": $theme-pale
);
// Layout //
$body-bg: $light-gray;
$top-nav-bg: $darkest-gray;
$body-color: $vue-darkest-blue !default;
$layout-padding: 24px;
$layout-padding-right: 44px;
$top-nav-height: 72px;
$nav-padding-left: $layout-padding;
$nav-padding-right: $layout-padding-right;
$navbar-brand-container-left: 75px;
$sidebar-bg: $darkest-gray;
$sidebar-width: 225px;
$sidebar-top: calc(#{$top-nav-height} + #{$layout-padding});
$sidebar-left: $layout-padding;
$content-wrap-ml: calc(#{$sidebar-left} + #{$sidebar-width} + 35px);
$content-wrap-pr: $layout-padding-right;
$content-wrap-pt: $layout-padding;
$content-wrap-pb: $layout-padding;
$made-by-footer-pb: 27px;
$greeny-box-shadow: 0 4px 9.6px 0.4px rgba($vue-green, 0.5);
$min-z-index: -1000;
// Auth
$auth-wallpaper-ivuestic-h: 2.625rem;
$auth-wallpaper-oblique-line: $dark-gray;
// Mobile Layout
$top-mobile-nav-height: 6.5rem;
$layout-mobile-padding: 0.1875rem;
$layout-mobile-padding-right: 0.375rem;
$sidebar-mobile-width: calc(100% - #{$layout-mobile-padding-right});
$sidebar-mobile-top: $top-mobile-nav-height + $layout-mobile-padding;
$sidebar-mobile-left: $layout-mobile-padding;
$content-mobile-wrap-margin: 1.125rem;
$sidebar-mobile-z-index: 1000;
$content-mobile-wrap-pl: 1rem;
$content-mobile-wrap-pr: 1rem;
$content-mobile-wrap-pt: 2rem;
$content-mobile-wrap-pt-fixed-layout: 7rem;
$content-mobile-wrap-pb: $layout-padding;
$content-mobile-wrap: $content-mobile-wrap-pt $content-mobile-wrap-pr
  $content-mobile-wrap-pb $content-mobile-wrap-pl;
$content-mobile-wrap-fixed-layout: $content-mobile-wrap-pt-fixed-layout
  $content-mobile-wrap-pr $content-mobile-wrap-pb $content-mobile-wrap-pl;
$content-mobile-wrap-sb-top: calc(#{$top-nav-height} + #{$layout-padding+20}) -
  20 px;
$nav-mobile-padding-h: 0.875rem;
$nav-mobile-pt: 1.75rem;
$nav-mobile-pb: 0.5rem;
$nav-mobile-brand-width: 4rem;
$nav-mobile-brand-top: 0.875rem;
$nav-mobile-brand-left: calc(50% - #{$nav-mobile-brand-width});
$droppdown-mobile-mp: 1.9375rem;
$dropdown-mobile-show-b: 2rem;
// Auth mobile
$auth-mobile-nav-ivuestic-h: 1.5rem;
$auth-mobile-main-h: calc(100% - #{$top-mobile-nav-height});
$auth-content-padding-t: 2.875rem;
// Typography
// -------------------------
// $text-color:            $gray !default;
$font-family-sans-serif: "Source Sans Pro", sans-serif !default;
$font-size-root: 16px;
$font-size-base: 1rem !default;
$font-size-larger: 1.2rem;
$font-size-large: 1.5rem;
$font-size-mini: 0.8rem;
$font-weight-bold: 700 !default;
$font-weight-semi-bold: 600 !default;
$font-weight-normal: 400 !default;
$font-weight-thin: 300 !default;
$font-weight-base: $font-weight-thin !default;
$font-size-smaller: 85% !default;
$font-size-h1: 2.625rem !default;
$font-size-h2: 2.25rem !default;
$font-size-h3: 1.75rem !default;
$font-size-h4: 1.375rem !default;
$headings-line-height: 1 !default;
$blockquote-border-color: $vue-green;
$blockquote-small-color: $gray-light;
$blockquote-border-width: 0.375rem;
$blockquote-font-size: 1.5rem;
// Navbar
$navbar-dd-item-height: 48px;
// Breadcrumbs
$breadcrumbs-height: 54px;
$breadcrumbs-arrow-font: 0.7rem;
$breadcrumbs-arrow-content: "\f054";
// Sidebar
$sidebar-link-height: 64px;
$sidebar-submenu-link-height: 48px;
$sidebar-link-pl: 25px;
$sidebar-submenu-link-pl: 74px;
$sidebar-link-active-bg: $almost-black;
$sidebar-arrow-right: 16px;
$sidebar-menu-item-icon-size: 19px;
$sidebar-viewport-height: calc(
  100vh - #{$top-nav-height} - #{$content-wrap-pt} - #{$content-wrap-pb}
);
$sidebar-hidden-top: -150px;
$sidebar-hidden-top-mobile: $sidebar-mobile-top;
$sidebar-hidden-height-mobile: 0;
$sidebar-box-shadow: 0px 8px 14.72px 1.28px rgba(#65a977, 0.3);
// Widgets
$widget-bg: $white;
$widget-padding: 1.5625rem;
$widget-larger-padding: 45px;
$widget-box-shadow: 0px 4px 70px -18px rgba(112, 112, 112, 1);
$widget-danger-shadow: 0px 4px 70px -16px $brand-danger;
$widget-info-shadow: 0px 4px 70px -16px $brand-info;
$widget-viewport-height: $sidebar-viewport-height;
$widget-header-border: 2px solid $light-gray;
$widget-header-height: 55px;
$widget-body-no-header-height: 100%;
$widget-body-with-header-height: calc(100% - #{$widget-header-height});
$widget-mb: 1.875rem;
$info-widget-border: 0.5rem solid $brand-primary;
// Links
$link-color: $brand-primary;
$link-hover-color: lighten($link-color, 10%);
$link-hover-decoration: none;
// Buttons
$input-btn-border-width: 0px;
$btn-line-height: 1.25;
$btn-line-height-sm: $btn-line-height;
$btn-padding-x: 3.9rem;
$btn-padding-y: 1.1rem;
$btn-padding-y-sm: 0.7rem;
$btn-padding-x-sm: 2.5rem;
$btn-padding-y-micro: 0.625rem;
$btn-padding-x-micro: 1.8rem;
$btn-with-icon-text-margin: 1.875rem;
$btn-with-icon-padding-x: 2.8125rem;
$btn-with-icon-rounded-size: 3.5rem;
$btn-with-icon-rounded-size-micro: 2.25rem;
$btn-with-icon-rounded-font-micro: 1.5rem;
$btn-with-icon-rounded-position-top: 0.4rem;
$btn-with-icon-rounded-position-left: 0.46rem;
$btn-with-icon-icon-top: 0.75rem;
$btn-with-icon-rounded-icon-left: 1.23rem;
$btn-with-icon-icon-size: 2rem;
$btn-group-button-padding-x: 1.53rem;
$btn-box-shadow: $greeny-box-shadow;
$btn-box-danger-shadow: 0px 4px 70px -16px $brand-danger;
$btn-box-warning-shadow: 0px 4px 70px -16px $brand-warning;
$btn-box-success-shadow: $greeny-box-shadow;
$btn-box-info-shadow: 0px 4px 70px -16px $brand-info;
$btn-box-pale-shadow: 0px 4px 70px -16px $theme-pale;
$btn-box-dark-shadow: 0px 4px 70px -16px $almost-black;
$btn-border-radius: 1.875rem;
$btn-dark-color: $white;
$btn-dark-bg: $darkest-gray;
$btn-dark-border: $darkest-gray;
$btn-pale-bg: $theme-pale;
$btn-pale-color: $white;
$btn-dd-arrow-size: 1rem;
$btn-border: none;
$btn-secondary-theme-border: 2px solid $brand-primary;
// Dropdowns
$dropdown-link-color: $white;
$dropdown-box-shadow: $greeny-box-shadow;
$dropdown-background: $darkest-gray;
$dropdown-link-color: $white;
$dropdown-link-hover-color: $white;
$dropdown-link-hover-bg: $almost-black;
$dropdown-link-active-color: $white;
$dropdown-link-active-bg: $almost-black;
$dropdown-item-padding-x: 25px;
$dropdown-item-padding-y: 0;
$dropdown-item-height: 40px;
$dropdown-menu-padding-y: 10px;
$dropdown-menu-padding-x: 0;
$dropdown-min-width: 15rem;
$dropdown-simple-visible-items: 4;
$dropdown-multi-visible-items: 4;
$dropdown-show-b: 1.125rem;
// Modals
$modal-header-padding-x: $widget-padding;
$modal-header-padding-y: 0;
$modal-header-height: $widget-header-height;
$modal-header-border: $widget-header-border;
$modal-content-border-width: 0;
$modal-content-border-radius: 0;
$modal-inner-padding: 25px;
$modal-footer-btns-padding-bottom: 20px;
$modal-footer-btns-margin-x: 10px;
$modal-md: 650px;
$modal-lg: 850px;
// Forms
$input-border-color: $lighter-gray;
$input-bg-disabled: $white;
$vuestic-switch-bg: $brand-primary;
$vuestic-switch-padding: 0.313rem 2.375rem;
$vuestic-switch-border-size: 0.125rem;
// Progress Bars
$progress-bar-value-font-size: 0.6875rem;
$progress-bar-circle-diameter: 3.125rem;
$progress-bar-circle-bw: 0.0678rem;
$progress-bar-circle-overlay-diameter: calc(
  #{$progress-bar-circle-diameter} - 2 * #{$progress-bar-circle-bw}
);
$progress-bar-vertical-height: 5.75rem;
$progress-bar-width-thin: 0.125rem;
$progress-bar-width-basic: 0.5rem;
$progress-bar-width-thick: 1.5rem;
$vertical-progress-bar-width-thick: 2rem;
// Tables
$table-bg-accent: $white;
$table-border-width: 0;
$table-border-color: #eceeef;
$striped-row-odd: $white;
$striped-row: $light-gray2;
$state-success-bg: #c8fac6;
$state-danger-bg: #ffcece;
$state-warning-bg: #fff1c8;
$state-info-bg: #dcf1ff;
$table-hover-bg: rgba($vue-green, 0.5);
$table-active-bg: $table-hover-bg;
// Badges
$badge-padding-y: 0.28rem;
$badge-min-width: 5rem;
$badge-font-size: 0.7rem;
$badge-success-bg: $brand-success;
$badge-warning-bg: $theme-orange;
$badge-danger-bg: $theme-red;
$badge-info-bg: $theme-blue;
// Alerts
$alert-padding-x: 1.25rem !default;
$alert-padding-y: 0.75rem !default;
$alert-margin-bottom: $widget-mb;
$with-close-pr: 3.125rem;
$alert-border-radius: 0;
$alert-border-width: 0;
$alert-success-bg: $light-green;
$alert-success-text: $body-color;
$alert-success-border: transparent;
$alert-success-shadow: 0px 4px 9.6px 0.4px rgba(79, 206, 145, 0.5);
$alert-info-bg: $light-blue;
$alert-info-text: $body-color;
$alert-info-border: transparent;
$alert-info-shadow: 0px 4px 9.6px 0.4px rgba(79, 142, 206, 0.5);
$alert-warning-bg: $light-yellow;
$alert-warning-text: $body-color;
$alert-warning-border: transparent;
$alert-warning-shadow: 0px 4px 9.6px 0.4px rgba(206, 178, 79, 0.5);
$alert-danger-bg: $light-pink;
$alert-danger-text: $body-color;
$alert-danger-border: transparent;
$alert-danger-shadow: 0px 4px 9.6px 0.4px rgba(206, 79, 79, 0.5);
// Icons
$bootstrap-sass-asset-helper: false;
$icon-font-name: "glyphicons-halflings-regular";
$icon-font-svg-id: "glyphicons_halflingsregular";
$icon-font-path: "./fonts/";
// Tabs
$tab-content-pt: 3.125rem;
$tab-content-pb: 1.5rem;
// PreLoader
$vuestic-preloader-left: calc(50% - 140px / 2);
$vuestic-preloader-top: calc(50% - 104px / 2);
// Medium Editor
$medium-editor-button-size: $btn-padding-y * 2 + $font-size-base *
  $btn-line-height;
// tooltips
$tooltip-font-size: $font-size-base;
$tooltip-box-shadow: $greeny-box-shadow;
$tooltip-max-width: 200px;
$tooltip-color: $white;
$tooltip-bg: $darkest-gray;
$tooltip-border-radius: $font-size-base * 0.5;
$tooltip-opacity: 0.9;
$tooltip-padding-y: 0.5rem;
$tooltip-padding-x: 0.75rem;
$tooltip-margin: 0;
$tooltip-line-height: 1.13;
$tooltip-font-weight: 300;
$tooltip-arrow-width: 0.8rem;
$tooltip-arrow-height: 0.4rem;
$tooltip-arrow-color: $tooltip-bg;
// Popovers
$popover-font-size: $font-size-base;
$popover-line-height: $tooltip-line-height;
$popover-box-shadow: $tooltip-box-shadow;
$popover-bg: $tooltip-bg;
$popover-max-width: 400px;
$popover-border-width: 0;
$popover-border-color: transparent;
$popover-border-radius: $tooltip-border-radius;
$popover-box-shadow: $greeny-box-shadow;
$popover-opacity: $tooltip-opacity;
$popover-header-bg: $tooltip-bg;
$popover-header-color: $white;
$popover-header-padding-y: 0;
$popover-header-padding-x: 0.75rem;
$popover-header-no-icon-padding-x: 0;
$popover-header-font-weight: bold;
$popover-body-color: $white;
$popover-body-padding-y: $popover-header-padding-y;
$popover-body-padding-x: $popover-header-padding-x;
$popover-body-no-icon-padding-x: $popover-header-no-icon-padding-x;
$popover-icon-size: 1.35rem;
$popover-icon-color: $brand-primary;
$popover-arrow-width: 1rem;
$popover-arrow-height: 1rem;
$popover-arrow-color: transparent;
$popover-arrow-outer-color: fade-in($popover-border-color, 0.05);
// Toasts
$toast-font-size: $popover-font-size;
$toast-line-height: $popover-line-height;
$toast-font-weight: normal;
$toast-min-height: 3.25rem;
$toast-box-shadow: $popover-box-shadow;
$toast-bg: $popover-bg;
$toast-border-radius: $popover-border-radius;
$toast-color: $popover-body-color;
$toast-opacity: $popover-opacity;
$toast-padding-x: 1.15rem;
$toast-padding-y: 0.5rem;
$toast-icon-size: $popover-icon-size;
$toast-icon-color: $popover-icon-color;
$toast-icon-ml: 0;
$toast-icon-mr: 0.625rem;
.vuestic-modal {
  height: 0;
  width: 0; // For Transitioning
  .modal {
    display: block;
  }
  .modal-dialog,
  .modal-backdrop {
    transition: all 0.5s ease;
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
  // Modal styles
  .modal-header {
    height: $modal-header-height;
    padding: $modal-header-padding-y $modal-header-padding-x;
    border-bottom: $modal-header-border;
    font-size: $font-size-larger;
    display: flex;
    align-items: center;
  }
  .close-modal {
    margin-left: 1rem;
    font-size: $font-size-large;
    line-height: $font-size-large;
    cursor: pointer;
  }
  .modal-content {
    border-radius: $modal-content-border-radius;
  }
  .modal-footer {
    justify-content: center;
    padding: 0 $modal-inner-padding;
    padding-bottom: calc(
      #{$modal-inner-padding} - #{$modal-footer-btns-padding-bottom}
    );
    flex-wrap: wrap;
    .btn {
      margin: 0 $modal-footer-btns-margin-x $modal-footer-btns-padding-bottom
        $modal-footer-btns-margin-x;
    }
  }
  // .modal-dialog {
  // box-shadow: $modal-content-box-shadow-sm-up;
}
</style>
