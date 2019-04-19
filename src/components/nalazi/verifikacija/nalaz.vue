<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <!--    <vuestic-widget :headerText="hid" v-if="ifOdabir">
          <div class="table-responsive">
            <table class="table table-striped first-td-padding">
              <thead>
                <tr>
                  <td>izbor</td>
                  <td>datum</td>
                  <td>vrijeme</td>
                  <td>SID</td>
                  <td>prioritet</td>
                  <td></td>
                </tr>
              </thead>
              <tbody>
                <tr v-for="rezultat in results">
                  <td>
                    <div
                      v-if="danas === (rezultat.updated_at.slice(8,10) + '.' + rezultat.updated_at.slice(5,7)  + '.' + rezultat.updated_at.slice(0,4))"
                      class="form-check abc-checkbox abc-checkbox-primary"
                      @click="enablePrint"
                    >
                      <input class="form-check-input" :id="rezultat._id" type="checkbox" checked>
                      <label class="form-check-label" :for="rezultat._id">
                        <span class="abc-label-text">Uključi u nalaz</span>
                      </label>
                    </div>
                    <div
                      v-if="danas != (rezultat.updated_at.slice(8,10) + '.' + rezultat.updated_at.slice(5,7)  + '.' + rezultat.updated_at.slice(0,4))"
                      class="form-check abc-checkbox abc-checkbox-primary"
                      @click="enablePrint"
                    >
                      <input class="form-check-input" :id="rezultat._id" type="checkbox">
                      <label class="form-check-label" :for="rezultat._id">
                        <span class="abc-label-text">Uključi u nalaz</span>
                      </label>
                    </div>
                  </td>

                  <td
                    v-if="danas === (rezultat.updated_at.slice(8,10) + '.' + rezultat.updated_at.slice(5,7)  + '.' + rezultat.updated_at.slice(0,4))"
                  >
                    <strong>{{rezultat.updated_at.slice(8,10) + '.' + rezultat.updated_at.slice(5,7) + '.' + rezultat.updated_at.slice(0,4)}}</strong>
                  </td>
                  <td
                    v-if="danas != (rezultat.updated_at.slice(8,10) + '.' + rezultat.updated_at.slice(5,7)  + '.' + rezultat.updated_at.slice(0,4))"
                  >{{rezultat.updated_at.slice(8,10) + '.' + rezultat.updated_at.slice(5,7) + '.' + rezultat.updated_at.slice(0,4)}}</td>
                  <td>{{Test(rezultat.updated_at)}}</td>
                  <td>{{rezultat.id}}</td>
                  <td
                    v-if="!rezultat.sample.prioritet.includes('HITAN')"
                  >{{rezultat.sample.prioritet}}</td>
                  <td v-if="rezultat.sample.prioritet.includes('HITAN')">
                    <strong>{{rezultat.sample.prioritet}}</strong>
                  </td>

                  <td align="middle" class="valid">
                    <i :class="{"fa fa-check success-icon icon-right input-icon": false}"></i>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <hr>
          <div class="row">
            <div class="col-md-3"></div>
            <div class="col-md-6">
              <div class="btn-container">
                <button class="btn btn-secondary pull-left" @click.prevent="vratiPregled">
                  <span class="fa fa-step-backward"></span>
                  {{ ' NAZAD'}}
                </button>
              </div>

              <div class="btn-container">
                <button
                  :disabled="odobriPrint"
                  class="btn btn-info pull-right"
                  @click="pushPdfToFront"
                >
                  <span class="fa fa-file-text"></span>
                  {{ ' Nalaz'}}
                </button>
              </div>
            </div>
          </div>
        </vuestic-widget>-->
        <!--    <vuestic-widget :headerText="hid" v-if="ifNalaz">
          <div class="col-md-12 widget-body">
            <div class="row dashboard-info-widgets">
              <div class="col-md-6 col-xl-4">
                <img :src="labImage" alt style="height: 100%; width: 100%;">
              </div>

              <div v-if="spol === 'MUŠKI'" class="col-md-6 col-xl-4">
                <vuestic-widget class="info-widget brand-info">
                  <div class="info-widget-inner">
                    <div class="stats">
                      <div class="stats-number">
                        <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
                        {{ime + ' ' + prezime}}
                      </div>
                      <div class="stats-number">
                        <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
                        {{JMBG}}
                      </div>
                      <div class="row">
                        <div v-if="pusac && !bolest" class="stats-title">&nbsp{{'Pušač : ' + duhan}}</div>
                        <div
                          v-if="bolest && !pusac"
                          class="stats-title"
                        >&nbsp{{'Dijabetes : ' + dijabetes}}</div>
                        <div
                          v-if="pusac && bolest"
                          class="stats-title"
                        >&nbsp{{'Pušač : ' + duhan + ' | Dijabetes : ' + dijabetes}}</div>
                      </div>
                    </div>
                  </div>
                </vuestic-widget>
              </div>

              <div v-if="spol === 'ŽENSKI'" class="col-md-6 col-xl-4">
                <vuestic-widget class="info-widget brand-danger">
                  <div class="info-widget-inner">
                    <div class="stats">
                      <div class="stats-number">{{ime + ' ' + prezime}}</div>
                      <div class="stats-number">
                        <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
                        {{JMBG}}
                      </div>
                      <div class="row">
                        <div v-if="pusac && !bolest" class="stats-title">&nbsp{{'Pušač : ' + duhan}}</div>
                        <div
                          v-if="bolest && !pusac"
                          class="stats-title"
                        >&nbsp{{'Dijabetes : ' + dijabetes}}</div>
                        <div
                          v-if="pusac && bolest"
                          class="stats-title"
                        >&nbsp{{'Pušač : ' + duhan + ' | Dijabetes : ' + dijabetes}}</div>
                      </div>
                    </div>
                  </div>
                </vuestic-widget>
              </div>

              <div class="col-md-6 col-xl-4">
                <vuestic-widget class="info-widget">
                  <div class="info-widget-inner">
                    <div class="info-widget-inner">
                      <div class="stats">
                        <div class="stats-number">
                          <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
                          {{datum}}
                        </div>
                        <div class="stats-number">{{vrijeme}}</div>
                        <div v-if="bolest || pusac" class="stats-title">&nbsp</div>
                      </div>
                    </div>
                  </div>
                </vuestic-widget>
              </div>
            </div>
          </div>

          <div class="form-group">
            <div class="col-md-12 info-widget-inner">
              <div class="col-md-12">
                <div class="col-md-12">
                  <div class="input-group">
                    <textarea style="height:153px;" type="text" id="simple-textarea" v-model="napomena" required></textarea>
                    <label class="control-label" for="simple-textarea">{{'Nalaz i mišljenje ljekara specijaliste'}}</label><i class="bar"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-12 info-widget-inner">
            <div class="col-md-12">
              <div class="col-md-12">
                <hr>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-3"></div>
            <div class="col-md-6">
              <div class="btn-container">
                <button
                  class="btn btn-secondary wizard-back pull-left"
                  @click.prevent="vratiOdabir2"
                >
                  <span class="fa fa-step-backward"></span>
                  {{ ' NAZAD'}}
                </button>
              </div>
              <div class="btn-container">
                <button class="btn btn-info wizard-next pull-right" @click.prevent="pushPdfToFront">
                  <span class="glyphicon glyphicon-print"></span>
                  {{ ' PRINTAJ'}}
                </button>
              </div>
            </div>
          </div>
        </vuestic-widget>-->
        <vuestic-modal
          :show.sync="show"
          v-bind:large="true"
          ref="largeModalComment"
          :okText="potvrdi"
          :cancelText="odustani"
        >
          <div slot="title">{{"KOMENTAR"}}</div>
          <div>
            <div class="form-group">
              <div class="col-md-12 info-widget-inner">
                <div class="col-md-12">
                  <div class="col-md-12">
                    <div class="input-group">
                      <textarea style="height:153px;" type="text" v-model="napomena" required></textarea>
                      <label class="control-label">{{'Nalaz i mišljenje ljekara specijaliste'}}</label>
                      <i class="bar"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </vuestic-modal>

        <div>
          <div class="btn-container">
            <button v-if="ifPdf" class="btn btn-secondary btn-sm" @click.prevent="vratiPregled">
              <span class="fa fa-step-backward"></span>
              {{ ' NAZAD'}}
            </button>
            <button
              :disabled="isOdobren"
              v-if="ifPdf"
              class="btn btn-warning btn-sm"
              @click.prevent="komentarUnos"
            >{{ 'KOMENTAR'}}</button>
            
            <button
              :disabled="!isOdobren"
              v-if="ifPdf"
              class="btn btn-secondary btn-sm pull-right"
              @click.prevent="sendMail(email)"
            >
              <span class="glyphicon glyphicon-send"></span>
              {{ ' pošalji'}}
            </button>

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
          <div v-if="ifPdf" style="width:141%">
            <fieldset>
              <vuestic-switch v-model="isOdobren">
                <span
                  v-if="isOdobren"
                  id="Odobri"
                  style="width:100%; text-align:center;"
                  slot="trueTitle"
                >{{'Nalaz verificiran'}}</span>
                <span
                  v-if="!isOdobren"
                  id="Odobri"
                  style="width:100%; text-align:center;"
                  slot="trueTitle"
                >{{'Verificiraj nalaz'}}</span>
                
                <span
                  id="Odbaci"
                  style="width:100%; text-align:center;"
                  slot="falseTitle"
                >{{'Odbaci'}}</span>
              </vuestic-switch>
            </fieldset>
          </div>
          <embed
            src
            id="pdf"
            style="width: 100%;height: 800px; visibility:hidden"
            type="application/pdf"
          >
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
import { bus } from "../../../main";

Vue.component("badge-column", BadgeColumn);

export default {
  name: "Table",
  props: ["id"],
  data() {
    return {
      rezultatNiz: [],
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
      ifPdf: false,
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
      patientID: "",
      pdfLink: "",
      toastText: "",
      toastIcon: "",
      toastPosition: "",
      toastDuration: 2500,
      isToastFullWidth: false,
      className: "",
      count: 1,
      chars: 75,
      totalLines: 0,
      oldnapomena: "",
      newnapomena: ""
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {});
  },
  // beforeRouteLeave(to, from, next) {
  //   if (!this.isOdobren && !this.ifOdabir) {
  //     var temp = to.path.substring(0, 20);

  //     if (to.path.includes("/login")) {
  //       next();
  //     } else {
  //       this.$dialog
  //         .confirm("Nalaz nije odobren, jeste li sigurni da želite nastaviti?")
  //         .then(() => {
  //           http
  //             .post("nalazi/delete", {
  //               token: this.$store.state.token,
  //               site: this.$store.state.site,
  //               status: this.isOdobren,
  //               idNalaza: this.idNalaza,
  //               rezultati: this.rezultatNiz,
  //               flag: false
  //             })
  //             .then(res => {
  //               next();
  //             });
  //         })
  //         .catch(function() {
  //           router.push(from.path);
  //         });
  //     }
  //   } else {
  //     next();
  //   }
  // },
  watch: {
    napomena: function() {},
    email: function() {
      if (this.email.trim() != this.oldMail.trim()) {
        this.mailChanged = true;
      }
    }
  },
  mounted() {
    bus.$on("odobren", () => {
      // console.log('Odobri' + this.rezultatNiz)
      http
        .post("nalazi/odobri", {
          token: this.$store.state.token,
          status: this.isOdobren,
          idNalaza: this.idNalaza,
          site: this.$store.state.site,
          lokacija: this.results[0].sample.lokacija,
          rezultati: this.rezultatNiz
        })
        .then(res => {
          document.getElementById("pdf").src = this.pdfLink;
          this.isOdobren = true;
          // console.log(res.data.lokacija)
          if (res.data.lokacija.sendEmail) {
            this.sendMail(res.data.lokacija.email);
          }
        });
    });
    bus.$on("neodobren", () => {
      // console.log('Odbaci' + this.rezultatNiz)
      this.isOdobren = false;
      http
        .post("nalazi/odobri", {
          token: this.$store.state.token,
          status: this.isOdobren,
          idNalaza: this.idNalaza,
          site: this.$store.state.site,
          rezultati: this.rezultatNiz
        })
        .then(res => {
          document.getElementById("pdf").src =
            this.pdfLink + "#toolbar=0&navpanes=0&scrollbar=0";
        });
    });
    bus.$on("yes", () => {
      // console.log("triger funkcije yes clicked")
      // console.log(this.samplesFinal)
      http
        .post("nalazi/create", {
          samples: this.samplesFinal,
          napomena: this.napomena, // .replace(/(\n)/gm,"\n\r"),
          token: this.$store.state.token,
          status: this.isOdobren,
          idNalaza: this.idNalaza,
          site: this.$store.state.site
        })
        .then(res => {
          this.ifPdf = true;
          document.getElementById("pdf").style.visibility = "visible";
          document.getElementById("pdf").onload = function() {};
          document.getElementById("pdf").src =
            server +
            "/nalazi/" +
            res.data.id +
            ".pdf" +
            "#toolbar=0&navpanes=0&scrollbar=0";
          this.pdfLink = server + "/nalazi/" + res.data.id + ".pdf";
          this.pdfDoc = res.data.id + ".pdf";
          // console.log(res.data)
          this.idNalaza = res.data.id;
        });
    });
    bus.$on("no", () => {
      this.napomena = "";
    });
  },
  beforeDestroy() {
    bus.$off("odobren");
    bus.$off("neodobren");
    bus.$off("yes");
    bus.$off("no");
  },
  created() {
    http
      .get(
        "pacijenti/detalji/" +
          this.$route.params.id +
          "?token=" +
          this.$store.state.token +
          "&site=" +
          this.$store.state.site,
        {}
      )
      .then(res => {
        this.idP = res.data.pacijent._id;
        this.jmbgP = res.data.pacijent.jmbg;
        this.imeP = res.data.pacijent.ime;
        this.prezimeP = res.data.pacijent.prezime;
        this.spolP = res.data.pacijent.spol;
        this.duhanP = res.data.pacijent.duhan;
        this.dijabetesP = res.data.pacijent.dijabetes;
        this.telefonP = res.data.pacijent.telefon;
        this.email = res.data.pacijent.email.trim();
        this.patientID = res.data.pacijent._id;

        this.oldMail = res.data.pacijent.email.trim();

        if (!this.validateEmail(res.data.pacijent.email)) {
          this.email = "";
          this.oldMail = "";
        }
        this.pacijent = res.data.pacijent.ime + " " + res.data.pacijent.prezime;
      });

    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth() + 1;
    var day = today.getDate();
    if (day < 10) {
      day = "0" + day;
    }
    if (month < 10) {
      month = "0" + month;
    }
    this.danas = day + "." + month + "." + year;

    this.id = this.$route.params.id;
    this.labImage = server + "images/img_sample.jpg";

    http
      .get(
        "nalazi/verifikacija/" +
          this.$route.params.id +
          "?token=" +
          this.$store.state.token +
          "&site=" +
          this.$store.state.site,
        {}
      )
      .then(res => {
        this.results = res.data;

        this.results.forEach(element => {
          this.rezultatNiz.push(element.id);
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

        if (res.data.length > 1) {
          this.hid =
            "Nalazi za pacijenta: " +
            res.data[0].patient.ime +
            " " +
            res.data[0].patient.prezime;
        } else {
          this.hid =
            "Nalaz za pacijenta: " +
            res.data[0].patient.ime +
            " " +
            res.data[0].patient.prezime;
        }
        var samples = this.$route.query.uzorci.split(",");
        this.samplesFinal = samples;
        http
          .post("nalazi/create", {
            samples: samples,
            napomena: "",
            token: this.$store.state.token,
            status: false,
            idNalaza: "",
            site: this.$store.state.site
          })
          .then(res => {
            this.ifPdf = true;
            document.getElementById("pdf").style.visibility = "visible";
            document.getElementById("pdf").onload = function() {};
            document.getElementById("pdf").src =
              server +
              "/nalazi/" +
              res.data.id +
              ".pdf" +
              "#toolbar=0&navpanes=0&scrollbar=0";
            this.pdfLink = server + "/nalazi/" + res.data.id + ".pdf";
            this.pdfDoc = res.data.id + ".pdf";

            this.idNalaza = res.data.id;
          });
        this.ifNalaz = false;
        this.ifOdabir = false;
      });
  },
  methods: {
    komentarUnos() {
      this.$refs.largeModalComment.open();
    },
    sendMail(mail) {
      if (mail === "") {
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
            'Slanje nalaza | <span style="color: #4ae387;">' + mail + "</span>",
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
                  email: mail,
                  idNalaza: this.idNalaza,
                  site: this.$store.state.site,
                  idPacijenta: this.patientID
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
                  .post("pacijenti/detalji/update/" + this.$route.params.id, {
                    id: this.idP.trim(),
                    jmbg: this.jmbgP.trim(),
                    ime: this.imeP.toUpperCase().trim(),
                    prezime: this.prezimeP.toUpperCase().trim(),
                    spol: this.spolP.toUpperCase().trim(),
                    duhan: this.duhanP.toUpperCase().trim(),
                    dijabetes: this.dijabetesP.toUpperCase().trim(),
                    telefon: this.telefonP.trim(),
                    email: this.email.trim(),
                    token: this.$store.state.token,
                    site: this.$store.state.site
                  })
                  .then(res => {
                    // console.log(res.data)
                  });
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
          status: this.isOdobren,
          idNalaza: this.idNalaza,
          site: this.$store.state.site
        })
        .then(res => {
          this.ifPdf = true;
          document.getElementById("pdf").style.visibility = "visible";
          document.getElementById("pdf").onload = function() {};
          document.getElementById("pdf").src =
            server +
            "/nalazi/" +
            res.data.id +
            ".pdf" +
            "#toolbar=0&navpanes=0&scrollbar=0";
          this.pdfLink = server + "/nalazi/" + res.data.id + ".pdf";
          this.pdfDoc = res.data.id + ".pdf";

          this.idNalaza = res.data.id;
        });
      this.ifNalaz = false;
      this.ifOdabir = false;
    },
    isLow: function(data, d, g) {
      if (d === "0" && g === "0") {
        return false;
      } else if (g < 0) {
        return false;
      } else {
        if (Number(data) < Number(d)) {
          return true;
        }
        return false;
      }
    },
    isHigh: function(data, d, g) {
      if (d === "0" && g === "0") {
        return false;
      } else if (g < 0) {
        return false;
      } else {
        if (Number(data) > Number(g)) {
          return true;
        }
        return false;
      }
    },
    isGr: function(data, d, g) {
      if (d === "0" && g === "0") {
        return false;
      } else if (g < 0) {
        return false;
      } else {
        if (Number(d) <= Number(data) && Number(g) >= Number(data)) {
          return true;
        }
        return false;
      }
    },
    IntG: function(data, d, g) {
      if (d === "0" && g === "0") {
        return false;
      } else if (g < 0) {
        if (
          Number(Math.abs(d)) <= Number(data) &&
          Number(Math.abs(g)) >= Number(data)
        ) {
          return true;
        }
        return false;
      } else {
        return false;
      }
    },
    IntN: function(data, d, g) {
      if (d === "0" && g === "0") {
        return false;
      } else if (g < 0) {
        if (Number(data) < Number(Math.abs(d))) {
          return true;
        }
        return false;
      } else {
        return false;
      }
    },
    IntP: function(data, d, g) {
      if (d === "0" && g === "0") {
        return false;
      } else if (g < 0) {
        if (Number(data) > Number(Math.abs(g))) {
          return true;
        }
        return false;
      } else {
        return false;
      }
    },
    isNana: function(data, d, g) {
      if (d === "0" && g === "0") {
        return true;
      } else {
        return false;
      }
    },
    isLoaded: function() {
      document.getElementById("pdf").contentWindow.print();
    },
    vratiPregled: function() {
      router.push("/nalazi/verifikacija");
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
      document.getElementById("pdf").style.visibility = "hidden";
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
      document.getElementById("pdf").style.visibility = "hidden";
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
    },
    formatirajKomentar: function(str, l) {
      // str = str.trim().replace(/[\s\r\n]+/, ' ')
      var strs = [];
      while (str.length > l) {
        var pos = str.substring(0, l).lastIndexOf(" ");
        pos = pos <= 0 ? l : pos;
        strs.push(str.substring(0, pos));
        var i = str.indexOf(" ", pos) + 1;
        if (i < pos || i > pos + l) i = pos;
        str = str.substring(i);
      }
      strs.push(str);
      return strs;
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

