<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <div>
          <div class="btn-container">
            <button v-if="ifPdf" class="btn btn-secondary btn-sm" @click.prevent="vratiPregled">
              <span class="fa fa-step-backward"></span>
              {{ ' NAZAD'}}
            </button>
            <!-- <button v-if="ifPdf" class="btn btn-secondary btn-sm pull-right" @click.prevent="sendMail(email)"><span class="glyphicon glyphicon-send"></span>{{ ' pošalji'}}</button> -->
            <div v-if="ifPdf" class="form-group with-icon-left pull-right">
              <div class="input-group">
                <input
                  size="40"
                  id="input-icon-left"
                  name="input-icon-left"
                  v-model="email"
                  title=" "
                  required
                >
                <i class="fa fa-envelope-o icon-left input-icon"></i>
                <label class="control-label" for="input-icon-left">{{'Email adresa'}}</label>
                <i class="bar"></i>
              </div>
            </div>
          </div>
          <hr v-if="ifPdf">
          <div id="pdf-container"></div>
          <!-- <embed
            src
            id="pdf"
            style="width: 100%;height: 800px; visibility:hidden"
            type="application/pdf"
          >-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import BadgeColumn from "./BadgeColumn.vue";
import axios from "axios";
import router from "../../../router";
import { http } from "../../../../config/config.js";
import pdfMake from "pdfmake/build/pdfmake";
import vfsFonts from "pdfmake/build/vfs_fonts";
import { server } from "../../../../config/config.js";
import PDFObject from "pdfobject";
import { bus } from "../../../main";

Vue.component("badge-column", BadgeColumn);

export default {
  name: "Table",
  props: ["id"],

  data() {
    return {
      hid: "",
      results: [],
      ifOdabir: true,
      ifNalaz: false,
      odobriPrint: true,
      uzorakId: "",
      testovi: [],
      ime: "",
      prezime: "",
      JMBG: "",
      spol: "",
      jmbgObj: {},
      jmbgDan: "",
      jmbgMjesec: "",
      jmbgGodina: "",
      tipUzorka: "",
      doktor: "",
      lokacija: "",
      dtUnosa: "",
      datum: "",
      vrijeme: "",
      rezultati: [],
      labImage: "",
      ifPdf: true,
      pdfsource: "",
      slika: "",
      napomena: "",
      samplesFinal: [],
      pusac: false,
      duhan: "",
      bolest: false,
      dijabetes: "",
      danas: "",
      email: "",
      oldMail: "",
      mailChanged: false,
      pacijent: "",
      pdfDoc: "",
      idP: "",
      jmbgP: "",
      imeP: "",
      prezimeP: "",
      spolP: "",
      duhanP: "",
      dijabetesP: "",
      telefonP: "",
      isOdobren: false,
      show: true,
      potvrdi: "POTVRDI",
      odustani: "ODUSTANI",
      idNalaza: "",
      trenutnaRuta: "",

      toastText: "",
      toastIcon: "",
      toastPosition: "",
      toastDuration: 2500,
      isToastFullWidth: false,
      className: ""
    };
  },
  watch: {
    email: function() {
      this.email = this.oldMail;
    }
  },
  mounted() {
    var options = {
      width: "100%",
      height: "800px"
    };

    var url = server + "nalazi/emails/" + this.$route.params.id + ".pdf";

    PDFObject.embed(url, "#pdf-container", options);

    // document.getElementById("pdf").style.visibility = "visible";
    // document.getElementById("pdf").src =
    //   server + "nalazi/emails/" + this.$route.params.id + ".pdf";
    this.pdfDoc = this.$route.params.id + ".pdf";
    this.idNalaza = this.$route.params.id;
    this.id = this.$route.params.id;

    http
      .get(
        "nalazi/pregled/" +
          this.$route.params.id +
          "?token=" +
          this.$store.state.token +
          "&site=" +
          this.$store.state.site,
        {}
      )
      .then(res => {
        this.idP = res.data.nalaz.patient._id;
      });

    http
      .get(
        "nalazi/outbox/" +
          this.$route.params.id +
          "?token=" +
          this.$store.state.token +
          "&site=" +
          this.$store.state.site,
        {}
      )
      .then(res => {
        // console.log(res.data)
        this.email = res.data.nalaz.to.trim();
        this.oldMail = res.data.nalaz.to.trim();
        if (!this.validateEmail(res.data.nalaz.to.trim())) {
          this.email = "";
          this.oldMail = "";
        }
      });
  },
  methods: {
    komentarUnos() {
      this.$refs.largeModal.open();
    },
    sendMail(mail) {
      if (this.email === "") {
        this.toastText = "Email adresa nije definisana!";
        this.toastIcon = "fa-warning";
        this.toastPosition = "top-right";
        this.className = "vuestic-toast-warning";

        this.showToast(this.toastText, {
          icon: this.toastIcon,
          position: this.toastPosition,
          duration: 2500,
          fullWidth: this.false,
          className: this.className
        });
      } else if (!this.validateEmail(mail)) {
        this.toastText = "Email adresa nije validna!";
        this.toastIcon = "fa-warning";
        this.toastPosition = "top-right";
        this.className = "vuestic-toast-warning";

        this.showToast(this.toastText, {
          icon: this.toastIcon,
          position: this.toastPosition,
          duration: 2500,
          fullWidth: this.false,
          className: this.className
        });
      } else {
        this.$dialog
          .confirm(
            'Slanje nalaza | <span style="color: #4ae387;">' +
              this.email +
              "</span>",
            {
              type: "hard",
              html: true,
              verification: "Da"
            }
          )
          .then(() => {
            if (this.validateEmail(mail)) {
              http
                .post("nalazi/email", {
                  token: this.$store.state.token,
                  email: this.email,
                  idNalaza: this.idNalaza,
                  site: this.$store.state.site
                })
                .then(res => {
                  // console.log(res.data)
                  if (res.data.success) {
                    this.toastText = "Nalaz uspješno poslan!";
                    this.toastIcon = "fa-check";
                    this.toastPosition = "top-right";
                    this.className = "vuestic-toast-primary";

                    this.showToast(this.toastText, {
                      icon: this.toastIcon,
                      position: this.toastPosition,
                      duration: 2500,
                      fullWidth: this.false,
                      className: this.className
                    });
                  } else {
                    this.toastText = "Greška prilikom slanja nalaza!";
                    this.toastIcon = "fa-remove";
                    this.toastPosition = "top-right";
                    this.className = "vuestic-toast-danger";

                    this.showToast(this.toastText, {
                      icon: this.toastIcon,
                      position: this.toastPosition,
                      duration: 2500,
                      fullWidth: this.false,
                      className: this.className
                    });
                  }
                });
              if (this.mailChanged) {
                http
                  .post("pacijenti/detalji/update/" + this.idP, {
                    email: this.email.trim(),
                    token: this.$store.state.token,
                    site: this.$store.state.site
                  })
                  .then(res => {});
              }
            }
          })
          .catch(function() {});
      }
    },
    validateEmail: function(mail) {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        return true;
      } else {
        return false;
      }
    },
    convertUTCDateToLocalDate(date) {
      var newDate = new Date(
        date.getTime() + date.getTimezoneOffset() * 60 * 1000
      );
      var offset = date.getTimezoneOffset() / 60;
      var hours = date.getHours();

      if (hours < 10) {
        hours = "0" + hours;
      }
      var minutes = date.getMinutes();

      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      var sec = date.getSeconds();

      if (sec < 10) {
        sec = "0" + sec;
      }

      newDate.setHours(hours - offset);

      return hours + ":" + minutes + ":" + sec;
    },
    Test(date) {
      var datum = this.convertUTCDateToLocalDate(new Date(date));
      return datum;
    },
    dateDiff(date) {
      // Takes one string parameter -- date in YYYY-MM-DD
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
    pushPdfToFront: function() {
      this.printajNalaz();
      http
        .post("nalazi/create", {
          samples: this.samplesFinal,
          napomena: this.napomena,
          token: this.$store.state.token,
          site: this.$store.state.site,
          status: this.isOdobren,
          idNalaza: this.idNalaza
        })
        .then(res => {
          this.ifPdf = true;

          var options = {
            width: "100%",
            height: "800px"
          };

          var url = server + "/email/" + res.data.id + ".pdf";

          PDFObject.embed(url, "#pdf-container", options);

          // document.getElementById("pdf").style.visibility = "visible";

          // document.getElementById("pdf").onload = function() {};

          // document.getElementById("pdf").src =
          //   server + "/email/" + res.data.id + ".pdf";
          this.pdfDoc = res.data.id + ".pdf";
          this.idNalaza = res.data.id;
        });

      this.ifNalaz = false;
      this.ifOdabir = false;
    },
    vratiPregled: function() {
      router.push("/nalazi/outbox");
    },
    printajNalaz: function() {
      this.napomena = "";
      this.ime = this.results[0].patient.ime;
      this.prezime = this.results[0].patient.prezime;
      this.JMBG = this.results[0].patient.jmbg;
      this.spol = this.results[0].patient.spol;
      this.duhan = this.results[0].patient.duhan;
      this.dijabetes = this.results[0].patient.dijabetes;

      if (this.duhan === "DA") {
        this.pusac = true;
      } else {
        this.pusac = false;
      }

      if (this.dijabetes === "DA") {
        this.bolest = true;
      } else {
        this.bolest = false;
      }
      this.datum = this.results[0].updated_at.substring(0, 10);
      var dan = this.results[0].updated_at.substring(8, 10);
      var mjesec = this.results[0].updated_at.substring(5, 7);
      var godina = this.results[0].updated_at.substring(0, 4);
      this.datum = dan + "." + mjesec + "." + godina;

      this.vrijeme = this.Test(new Date(Date.now()));

      this.rezultati = [];
      var test = {};
      var samples = [];

      this.results.forEach(element => {
        if (document.getElementById(element._id).checked) {
          samples.push(element._id);
          test.sekcija = element.sample.sekcija;
          element.rezultati.forEach(rezultat => {
            test.naziv = rezultat.labassay.naziv;
            test.refGrupa = rezultat.refGrupa;
            test.refd = rezultat.refd;
            test.refg = rezultat.refg;
            rezultat.rezultat.forEach(rez => {
              if (rez.odobren) {
                test.rezultat = rez.rezultat_f;
                test.jedinica = rez.jedinice_f;
                this.rezultati.push(test);
                test = {};
              }
            });
          });
        }
      });

      this.ifNalaz = true;
      this.ifOdabir = false;
      this.samplesFinal = samples;
    },
    vratiOdabir: function() {
      this.ifNalaz = true;
      this.ifOdabir = false;
      this.odobriPrint = true;
      this.results.forEach(element => {
        if (
          this.danas ===
          element.updated_at.slice(8, 10) +
            "." +
            element.updated_at.slice(5, 7) +
            "." +
            element.updated_at.slice(0, 4)
        ) {
          this.odobriPrint = false;
        }
      });

      this.ifPdf = false;
      this.napomena = "";
      // document.getElementById("pdf").style.visibility = "hidden";
    },
    vratiOdabir2: function() {
      this.ifNalaz = false;
      this.ifOdabir = true;
      this.odobriPrint = true;
      this.results.forEach(element => {
        if (
          this.danas ===
          element.updated_at.slice(8, 10) +
            "." +
            element.updated_at.slice(5, 7) +
            "." +
            element.updated_at.slice(0, 4)
        ) {
          this.odobriPrint = false;
        }
      });

      this.ifPdf = false;
      this.napomena = "";
      // document.getElementById("pdf").style.visibility = "hidden";
    },
    enablePrint: function() {
      this.odobriPrint = false;
      var nijedno = 0;
      this.results.forEach(element => {
        if (document.getElementById(element._id).checked) {
          nijedno++;
        }
      });
      if (!nijedno) {
        this.odobriPrint = true;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../sass/_variables.scss";
@import "../../../sass/_toasts";
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
}
</style>

