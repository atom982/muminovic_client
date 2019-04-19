<template>
  <div class="vuestic-modal">
    <transition name="modal" :duration="duration">
      <div v-show="show" class="modal-container">
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
                <div v-show="ruler" class="col-md-12">
                  <div style="text-align:center;" class="testoviDiv">
                    <div
                      v-for="test in testovi"
                      :key="test.labassay"
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
                      v-for="index in Math.ceil(sviTestovi.length/100)"
                      :key="index"
                      class="table"
                    >
                      <div
                        v-show="showTest($store.state.site, test.analit, ukGodina, spol, drstanje, menopauza, test.manual, test.calculated)[2] && !test.disabled"
                        @click="dodajTest($event, test)"
                        :title="test.analit"
                        v-for="test in (sviTestovi.slice((index-1)*100,index*100))"
                        :key="test.labassay"
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
                      :key="index"
                      class="table"
                    >
                      <div
                        @click="dodajTest($event, test)"
                        :title="test.analit"
                        :key="test.labassay"
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
import { http } from "../../../config/config.js";
import { sampleSelection } from "../funkcije/shared/samples.js";
import { bus } from "../../main";

export default {
  name: "vuestic-modal-edit",
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
      default: true 
    },
    okText: {
      type: String,
      default: "CONFIRM"
    },
    cancelText: {
      type: String,
      default: "CANCEL"
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
    }
  },
  data() {
    return {
      show: false,
      ruler: false,
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

      sekcija: [],
      izabraniTestovi: [],
      sviTestovi: [],
      sviRezultati: [],
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
    if (this.show) {
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
    show(value) {
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
      this.EditSample();
      // this.show = false;
      window.removeEventListener("keyup", this.listenKeyUp);
    },
    cancel() {
      this.$emit("cancel");
      this.show = false;
      window.removeEventListener("keyup", this.listenKeyUp);
    },
    clickMask() {
      if (!this.force) {
        this.cancel();
      }
    },
    open() {
      this.GetSample();
      window.addEventListener("keyup", this.listenKeyUp);
    },
    close() {
      this.show = false;
      window.removeEventListener("keyup", this.listenKeyUp);
    },
    EditSample() {

    },
    GetSample() {

      this.ruler = false;
      this.izabraniTestovi = [];
      this.sviTestovi = [];
      this.basSviTestovi = [];
      this.testovi = [];

      http
        .get(
          "uzorci/show/" +
            this.$store.state.sid +
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
          this.sviRezultati = res.data.rezultat.rezultati;
          this.ukupnaStarost();

          // console.log(res.data.rezultat.rezultati[0].labassay.tip)

          http
            .post("/uzorci/labassay/tip", {
              sekcija: this.sekcija,
              token: this.$store.state.token,
              tip: res.data.rezultat.rezultati[0].labassay.tip,
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
              var editable = true;
              this.sviTestovi.forEach(element => {
                this.izabraniTestovi.forEach(izabrani => {
                  if (izabrani.labassay._id === element.labassay) {
                    editable = false;

                    this.sviRezultati.forEach(rez => {
                      if (rez.labassay._id === element.labassay) {
                        // console.log(element.analit)
                        // console.log(rez.rezultat[rez.rezultat.length - 1].rezultat_f)
                        if (
                          rez.rezultat[rez.rezultat.length - 1].rezultat_f != ""
                        ) {
                          editable = true;
                        }
                        // console.log(editable)
                      }
                    });

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
              this.show = true;
            });
        });
    },
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
    EditSample: function() {
      http
        .post("/uzorci/update", {
          sid: this.$store.state.sid,
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

            this.show = false;
            bus.$emit("Edited", this.$store.state.sid);
      
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
      } else {
        if (this.testovi.length < 2) {
          // console.warn('Jeste li sigurni da želite obrisati uzorak?')
          this.toastText =
            "Test nije moguće ukloniti! Zatvorite prozor i obrišite uzorak.";
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
@import "../../sass/_variables.scss";

//Modals
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

.vuestic-modal {
  height: 0;
  width: 0;

  // For Transitioning
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

  //Modal styles

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
  //   box-shadow: $modal-content-box-shadow-sm-up;
  // }
}
</style>
