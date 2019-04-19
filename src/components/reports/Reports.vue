<template>
  <div class="form-elements">
    <div v-show="!report_pdf" class="row">
      <div class="col-md-12">
        <vuestic-widget headerText="Izvještaji">
          <div class="row">
            <div class="col-md-4">
              <fieldset>
                <div class="tree-view-advanced-preview">
                  <vuestic-tree-root ref="treeView">
                    <vuestic-tree-category isOpen label="Izbornik">
                      <vuestic-tree-node>
                        <a
                          href="#"
                          :class="{'clicked': izbor === 'Knjiga protokola', 'lnk': izbor != 'Knjiga protokola'}"
                        >
                          <div @click="doSomethingOnClick('Knjiga protokola')">Knjiga protokola</div>
                        </a>
                        <a
                          href="#"
                          :class="{'clicked': izbor === 'Potrošnja', 'lnk': izbor != 'Potrošnja'}"
                        >
                          <div @click="doSomethingOnClick('Potrošnja')">Broj urađenih analiza</div>
                        </a>
                        <a
                          href="#"
                          :class="{'clicked': izbor === 'Pacijenti po mjestu', 'lnk': izbor != 'Pacijenti po mjestu'}"
                        >
                          <div @click="doSomethingOnClick('Pacijenti po mjestu')">Pacijenti po mjestu</div>
                        </a>
                      </vuestic-tree-node>
                      <vuestic-tree-category
                        v-if="$store.state.userId != 'amina'"
                        isOpen
                        label="Finansijski izvještaji"
                      >
                        <vuestic-tree-node>
                          <a
                            href="#"
                            :class="{'clicked': izbor === 'Po danu', 'lnk': izbor != 'Po danu'}"
                          >
                            <div @click="doSomethingOnClick('Po danu')">Po danu</div>
                          </a>
                        </vuestic-tree-node>
                      </vuestic-tree-category>
                    </vuestic-tree-category>
                  </vuestic-tree-root>
                  <div>
                    <br>
                  </div>
                </div>
              </fieldset>
            </div>
            <div class="col-md-4">
              <fieldset>
                <div class="form-group">
                  <div class="input-group" v-show="report_selected">
                    <vuestic-date-picker
                      id="date-picker-range"
                      :config="config"
                      v-model="datepicker.range"
                      @on-change="doSomethingOnChangeDateRange"
                    />
                    <label
                      class="control-label"
                      for="date-picker-range"
                    >{{ 'Unesite opseg datuma' }}</label>
                    <i class="bar"></i>
                  </div>
                </div>
              </fieldset>
            </div>
            <div class="col-md-4">
              <div
                class="d-flex flex-column align-items-center justify-content-between down-container"
              >
                <button
                  :disabled="!date_picked"
                  class="btn btn-secondary btn-sm"
                  @click.prevent="Akcija()"
                >
                  <span class="fa fa-file-text"></span>
                  {{' Izvještaj'}}
                </button>
                <!-- <button disabled class="btn btn-secondary btn-sm"><span class="fa fa-file-text"></span>{{' Izvještaj'}}</button> -->
              </div>
            </div>
          </div>
        </vuestic-widget>
      </div>
    </div>

    <div v-show="report_pdf" class="row">
      <div class="col-md-12">
        <div class="btn-container">
          <button class="btn btn-secondary btn-sm" @click.prevent="Nazad">
            <span class="fa fa-step-backward"></span>
            {{ ' NAZAD'}}
          </button>
          <span class="blockquote">{{ izborText }}</span>
        </div>
        <hr>

        <div id="pdf-container"></div>
       <!--  <div class="d-flex flex-column align-items-center justify-content-between down-container">
          <embed
            src
            id="pdf"
            style="width: 100%;height: 800px; visibility:hidden"
            type="application/pdf"
          >
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { http } from "../../../config/config.js";
import router from "../../router";
import { parseDate } from "../funkcije/shared/flatpickr.js";
import { parseTime } from "../funkcije/shared/flatpickr.js";
import PDFObject from "pdfobject";
import flatPickr from "vue-flatpickr-component"; // https://flatpickr.js.org/
import "flatpickr/dist/flatpickr.css"; // import 'flatpickr/dist/themes/material_orange.css'
import { server } from "../../../config/config.js";

export default {
  data() {
    return {
      izbor: "Knjiga protokola",
      izborText: "Knjiga protokola",
      datepicker: {
        range: null
      },
      config: {
        mode: "range",
        maxDate: new Date(),
        altFormat: "F j, Y",
        dateFormat: "Y-m-d",
        locale: {
          firstDayOfWeek: 1,
          rangeSeparator: " do ",
          weekdays: {
            shorthand: ["Ne", "Po", "Ut", "Sr", "Če", "Pe", "Su"],
            longhand: [
              "Nedjelja",
              "Ponedjeljak",
              "Utorak",
              "Srijeda",
              "Četvrtak",
              "Petak",
              "Subota"
            ]
          },
          months: {
            shorthand: [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "Maj",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Okt",
              "Nov",
              "Dec"
            ],
            longhand: [
              "Januar‎",
              "Februar‎",
              "Mart‎",
              "April‎",
              "Maj‎",
              "Juni‎",
              "Juli‎",
              "August‎",
              "Septembar‎",
              "Oktobar‎",
              "Novembar‎",
              "Decembar‎"
            ]
          }
        }
      },
      date_picked: false,
      report_selected: true,
      report_pdf: false,
      timestamp: "",

      toastText: "",
      toastIcon: "",
      toastPosition: "",
      toastDuration: 2500,
      isToastFullWidth: false,
      className: ""
    };
  },
  name: "reports",

  mounted() {
    this.$refs.treeView.expand();
    this.timestamp = new Date().getTime().toString();
  },

  methods: {
    Akcija() {
      switch (this.izbor) {
        case "Knjiga protokola":
          http
            .post("/reports/kprotokola", {
              timestamp: this.timestamp,
              range: this.datepicker.range,
              token: this.$store.state.token,
              site: this.$store.state.site
            })
            .then(res => {
              // console.log(res.data)
              if (
                res.data.success &&
                res.data.message != "Nema dostupnih podataka."
              ) {
                this.report_pdf = true;

                var options = {
                  width: "100%",
                  height: "800px"
                };

                var url = server + "reports/protokol/" + this.timestamp + ".pdf";

                PDFObject.embed(url, "#pdf-container", options);

                // document.getElementById("pdf").style.visibility = "visible";
                // document.getElementById("pdf").src =
                //   server + "reports/protokol/" + this.timestamp + ".pdf";
              } else {
                this.toastText = "Nema dostupnih podataka!";
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
                this.$refs.treeView.expand();
                this.report_pdf = false;
                this.datepicker.range = null;
                this.date_picked = false;
              }
            });
          break;
        case "Po danu":
          http
            .post("/reports/fpodanu", {
              timestamp: this.timestamp,
              range: this.datepicker.range,
              token: this.$store.state.token,
              site: this.$store.state.site
            })
            .then(res => {
              // console.log(res.data)
              if (
                res.data.success &&
                res.data.message != "Nema dostupnih podataka."
              ) {
                this.report_pdf = true;

                var options = {
                  width: "100%",
                  height: "800px"
                };

                var url = server + "reports/fpodanu/" + this.timestamp + ".pdf";

                PDFObject.embed(url, "#pdf-container", options);

                // document.getElementById("pdf").style.visibility = "visible";
                // document.getElementById("pdf").src =
                //   server + "reports/fpodanu/" + this.timestamp + ".pdf";
              } else {
                this.toastText = "Nema dostupnih podataka!";
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
                this.$refs.treeView.expand();
                this.report_pdf = false;
                this.datepicker.range = null;
                this.date_picked = false;
              }
            });
          break;
        case "Potrošnja":
          http
            .post("/reports/ppodanu", {
              timestamp: this.timestamp,
              range: this.datepicker.range,
              token: this.$store.state.token,
              site: this.$store.state.site
            })
            .then(res => {
              // console.log(res.data)
              if (
                res.data.success &&
                res.data.message != "Nema dostupnih podataka."
              ) {
                this.report_pdf = true;

                var options = {
                  width: "100%",
                  height: "800px"
                };

                var url = server + "reports/ppodanu/" + this.timestamp + ".pdf";

                PDFObject.embed(url, "#pdf-container", options);
                
                // document.getElementById("pdf").style.visibility = "visible";
                // document.getElementById("pdf").src =
                //   server + "reports/ppodanu/" + this.timestamp + ".pdf";
              } else {
                this.toastText = "Nema dostupnih podataka!";
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
                this.$refs.treeView.expand();
                this.report_pdf = false;
                this.datepicker.range = null;
                this.date_picked = false;
              }
            });
          break;
        case "Pacijenti po mjestu":
          http
            .post("/reports/ppomjestu", {
              timestamp: this.timestamp,
              range: this.datepicker.range,
              token: this.$store.state.token,
              site: this.$store.state.site
            })
            .then(res => {
              // console.log(res.data)
              if (
                res.data.success &&
                res.data.message != "Nema dostupnih podataka."
              ) {
                this.report_pdf = true;

                var options = {
                  width: "100%",
                  height: "800px"
                };

                var url = server + "reports/ppodanu/" + this.timestamp + ".pdf";

                PDFObject.embed(url, "#pdf-container", options);
                
                // document.getElementById("pdf").style.visibility = "visible";
                // document.getElementById("pdf").src =
                //   server + "reports/ppodanu/" + this.timestamp + ".pdf";
              } else {
                this.toastText = "Nema dostupnih podataka!";
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
                this.$refs.treeView.expand();
                this.report_pdf = false;
                this.datepicker.range = null;
                this.date_picked = false;
              }
            });
          break;
        default:
          break;
      }
    },
    doSomethingOnClick(input) {
      this.datepicker.range = null;
      this.date_picked = false;
      this.report_selected = true;
      this.report_pdf = false;
      if (input === "Po danu") {
        this.izbor = input;
        this.izborText = "Finansijski izvještaj | " + input;
      } else if (input === "Potrošnja") {
        this.izbor = input;
        this.izborText = "Broj urađenih analiza";
      }else if (input === "Pacijenti po mjestu") {
        this.izbor = input;
        this.izborText = "Pacijenti po mjestu";
      } else {
        this.izbor = input;
        this.izborText = input;
      }
    },
    doSomethingOnChangeDateRange(input) {//
      if (input[1] != undefined) {
        this.date_picked = true;
      }
    },
    Nazad: function() {
      this.$refs.treeView.expand();
      this.report_pdf = false;
      this.datepicker.range = null;
      this.date_picked = false;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../sass/variables";
@import "../../sass/toasts";
.abc-checkbox,
.abc-radio {
  display: flex !important;
  justify-content: flex-start;
}

input[type="checkbox"]:disabled + label,
input[type="radio"]:disabled + label,
input[type="checkbox"]:disabled,
input[type="radio"]:disabled {
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
