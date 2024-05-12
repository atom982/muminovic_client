<template>
  <div class="collapse-page">
    <div v-if="show" class="flex md12">
      <!-- Prikaz nalaza -->
      <div v-show="!main && pdf">
        <div class="btn-container">
          <button v-show="verificiran" class="btn btn-secondary btn-sm" @click.prevent="Nazad()">
            <span class="fa fa-step-backward"></span>
            {{ ' NAZAD'}}
          </button>
          <button
            v-show="!verificiran"
            class="btn btn-secondary-danger btn-sm"
            @click.prevent="Nazad()"
          >
            <span class="fa fa-step-backward"></span>
            {{ ' NAZAD'}}
          </button>
          <button
            v-show="verificiran"
            class="btn btn-secondary btn-sm pull-right"
            :disabled="!Email(email)"
            @click.prevent="MailDialog()"
          >
            <span class="glyphicon glyphicon-send"></span>
            {{ ' Pošalji'}}
          </button>

          <div v-show="verificiran" class="form-group with-icon-left pull-right">
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
        <hr>
        <!-- PDFObject -->
        <div id="pdf-container"></div>
      </div>

      <!-- Prikaz rezultata (Main screen) -->

      <vuestic-widget
        v-show="main"
        :headerText="header"
        :pagination="pagination"
        :main="main"
        :data_pid="Number(data_pid)"
        :data_length="Number(data_length)"
        :rezultati_length="Results.length"
        :spol="data_spol"
        :data_min="Number(data_min)"
        :datum="query_date"
        :today="today_date"
        :forward_disabled="forward_disabled"
        :backward_disabled="backward_disabled"
      >
        <vuestic-accordion-obrada>
          <vuestic-collapse-obrada
            v-for="uzorak in uzorci"
            v-show="!uzorak.removed"
            :id="uzorak.sid"
            :key="uzorak.sid"
            :sample="uzorak"
          >
            <span :id="uzorak.sid" slot="header">{{uzorak.sid}}</span>
            <div slot="body">
              <div style="line-height: 10px;">&nbsp</div>
              <div class="va-row">
                <div v-show="show_table" class="table-responsive">
                  <table class="table table-striped first-td-padding">
                    <thead>
                      <tr align="middle">
                        <td>{{'ANALIZA'}}</td>
                        <td>{{'REZULTAT'}}</td>
                        <td>{{'JEDINICA'}}</td>
                        <td>{{'REFERENCE'}}</td>
                        <td
                          v-if="uzorak.status != 'ODOBREN' &&  uzorak.status != 'VERIFICIRAN' && calculated"
                        >{{'AKCIJA'}}</td>
                        <td
                          v-if="uzorak.status != 'ODOBREN' &&  uzorak.status != 'VERIFICIRAN'"
                        >{{'PONOVI'}}</td>
                        <td></td>
                      </tr>
                    </thead>
                    <!-- Table Body -->
                    <tbody>
                      <tr
                        align="middle"
                        v-for="test in rezultati"
                        :key="test.labassay_id"
                        v-bind:class="{
                          'table-danger': Single(test.analit, test.rezultat, test.unit, test.dRef, test.gRef, $store.state.site)[5] === 'Red' && !test.multidata, 
                          'table-success': Single(test.analit, test.rezultat, test.unit, test.dRef, test.gRef, $store.state.site)[5] === 'Green' && !test.multidata,
                          'table-warning': Single(test.analit, test.rezultat, test.unit, test.dRef, test.gRef, $store.state.site)[5] === 'Yellow' && !test.multidata
                        }"
                      >
                        <!-- ANALIZA -->
                        <td :title="test.analit">{{test.ime}}</td>

                        <!-- REZULTAT -->
                        <td v-if="!test.multidata">
                          <div
                            v-show="test.edit == false"
                            style="display:inline; font-size: 14px; line-height: 4.5px;"
                          >
                            <label>
                              <strong>{{ test.rezultat }}</strong>
                            </label>
                          </div>
                          <div v-show="test.edit == true" style="display:inline; line-height: 5px;">
                            <select
                              v-if="test.select_options != undefined"
                              style="width:110px"
                              v-model="test.rezultat"
                            >
                              <option
                                v-for="option in test.select_options"
                                :key="option"
                              >{{ option }}</option>
                            </select>
                          </div>
                          <div v-show="test.edit == true" style="display:inline;">
                            <input
                              v-if="test.select_options === undefined"
                              v-model="test.rezultat"
                              style="width:110px;font-size: 12px; line-height: 7px;"
                            >
                          </div>
                        </td>

                        <td v-if="test.multidata && test.realizovan">
                          <button
                            :id="test.labassay_id"
                            class="btn btn-primary btn-micro"
                            @click.prevent="MultiGet($event, test.ime, test.analit, test.rezultat, test.odobren)"
                          >
                            <span
                              :id="test.labassay_id"
                              @click.prevent="MultiGet($event, test.ime, test.analit, test.rezultat, test.odobren)"
                              class="glyphicon glyphicon-search"
                            ></span>
                            {{'VIŠE'}}
                          </button>
                        </td>
                        <td v-if="test.multidata && !test.realizovan">
                          <button
                            :id="test.labassay_id"
                            class="btn btn-warning btn-micro"
                            @click.prevent="MultiGet($event, test.ime, test.analit, test.rezultat, test.odobren)"
                          >
                            <span
                              :id="test.labassay_id"
                              @click.prevent="MultiGet($event, test.ime, test.analit, test.rezultat, test.odobren)"
                              class="glyphicon glyphicon-search"
                            ></span>
                            {{'VIŠE'}}
                          </button>
                        </td>

                        <!-- JEDINICA -->
                        <td>{{test.unit}}</td>
                        <!-- REFERENCE -->
                        <td
                          v-if="!test.multidata"
                        >{{Single(test.analit, test.rezultat, test.unit, test.dRef, test.gRef, $store.state.site)[4]}}</td>
                        <td v-if="test.multidata">{{'/'}}</td>
                        <!-- AKCIJA -->
                        <td
                          v-if="uzorak.status != 'ODOBREN' &&  uzorak.status != 'VERIFICIRAN' && calculated && !test.calculated"
                        >
                          <button class="btn btn-pale btn-micro">
                            <span class="glyphicon glyphicon-ban-circle"></span>
                          </button>
                        </td>
                        <td
                          v-if="uzorak.status != 'ODOBREN' &&  uzorak.status != 'VERIFICIRAN' && calculated && test.calculated"
                        >
                          <button
                            @click.prevent="Calculate($event, test.labassay_id, test.ime, test.id)"
                            :id="test.test"
                            class="btn btn-primary btn-micro"
                          >
                            <span :id="test.test" class="fa fa-calculator"></span>
                          </button>
                        </td>

                        <!-- PONOVI -->
                        <td
                          v-if="uzorak.status != 'ODOBREN' &&  uzorak.status != 'VERIFICIRAN' 
                          && (test.rezultat === '' || test.manual || test.calculated)"
                        >
                          <button class="btn btn-pale btn-micro">
                            <span class="glyphicon glyphicon-ban-circle"></span>
                          </button>
                        </td>

                        <td
                          v-if="uzorak.status != 'ODOBREN' &&  uzorak.status != 'VERIFICIRAN' 
                          && test.rezultat != '' && !test.manual && !test.calculated"
                        >
                          <button
                            v-if="!test.retest"
                            :id="test.test"
                            class="btn btn-primary btn-micro"
                            @click.prevent="RetestEnable($event)"
                          >
                            <span :id="test.test" class="fa fa-refresh"></span>
                          </button>
                          <button
                            v-if="test.retest"
                            :id="test.test"
                            class="btn btn-info btn-micro"
                            @click.prevent="RetestDisable($event)"
                          >
                            <span :id="test.test" class="glyphicon glyphicon-duplicate"></span>
                          </button>
                        </td>
                        <!--  -->
                        <td>
                          <i
                            v-bind:class="{'fa fa-exclamation-triangle icon-right input-icon error-icon' : Single(test.analit, test.rezultat, test.unit, test.dRef, test.gRef, $store.state.site)[5] === 'Red' && !test.multidata}"
                          ></i>
                          <i
                            v-bind:class="{'fa fa-check success-icon icon-right input-icon' : Single(test.analit, test.rezultat, test.unit, test.dRef, test.gRef, $store.state.site)[5] === 'Green' && !test.multidata}"
                          ></i>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </vuestic-collapse-obrada>
        </vuestic-accordion-obrada>

        <div style="min-height: 10px;"></div>
        <!-- Nalaz -->
        <div v-if="verificiran" class="va-row">
          <div class="flex md12">
            <vuestic-collapse-nalaz
              :id="lokacija.email"
              :final="verificiran"
              :final_pdf="final_pdf"
              :samples="samples"
              :lokacija="lokacija"
              :pdf="link"
              :pacijent="ime + ' ' + prezime"
            >
              <span slot="header">Nalaz</span>
              <div slot="body">
                <div class="va-row"></div>
              </div>
            </vuestic-collapse-nalaz>
          </div>
        </div>

        <div>
          <hr>
        </div>

        <div class="row">
          <div class="col-md-3"></div>
          <div class="col-md-6">
            <div class="btn-container">
              <button
                class="btn btn-secondary btn-sm wizard-back pull-left"
                @click.prevent="Povratak()"
              >
                <span class="fa fa-backward"></span>
                {{ ' POVRATAK'}}
              </button>
            </div>
          </div>
        </div>
      </vuestic-widget>

      <!-- Modals -->
      <!-- Prikaz Analita za Multi Testove -->
      <vuestic-modal-multi
        :show.sync="show"
        :sample="sample"
        ref="largeModalMulti"
        cancelText="ODUSTANI"
        okText="POTVRDI"
      >
        <div slot="title">{{naslov}}</div>
        <div class="table-responsive">
          <table class="table table-striped first-td-padding">
            <thead>
              <tr align="middle">
                <td width="10%"></td>
                <td width="20%">{{'ANALIT'}}</td>
                <td width="30%">{{'REZULTAT'}}</td>
                <td width="10%">{{'JEDINICA'}}</td>
                <td width="20%">{{'REFERENCE'}}</td>
                <td width="10%"></td>
              </tr>
            </thead>
            <tbody>
              <tr
                align="middle"
                v-for="test in analiti"
                :key="test.labID"
                v-bind:class="{
                    'table-danger': DisplayMulti(test.izbor, test.opis, test.rezultat, test.jedinica, test.refd, test.refg, $store.state.site )[5] === 'Red', 
                    'table-success': DisplayMulti(test.izbor, test.opis, test.rezultat, test.jedinica, test.refd, test.refg, $store.state.site )[5] === 'Green', 
                    'table-warning': DisplayMulti(test.izbor, test.opis, test.rezultat, test.jedinica, test.refd, test.refg, $store.state.site )[5] === 'Yellow'                         
                  }"
              >
                <td v-if="test.flag != ''">{{test.flag}}</td>
                <td v-if="test.flag === ''">&nbsp</td>
                <td :title="test.opis">{{test.naziv}}</td>
                <td :id="test.analit">
                  <div v-show="test.edit == false">
                    <label>
                      <strong>{{ test.rezultat }}</strong>
                    </label>
                  </div>
                  <select
                    v-if="test.select_options != undefined"
                    style="width:150px;"
                    v-show="test.edit == true"
                    v-model="test.rezultat"
                  >
                    <option v-for="option in test.select_options">{{ option }}</option>
                  </select>
                  <input
                    v-if="test.select_options === undefined"
                    style="width:150px;"
                    v-show="test.edit == true"
                    v-model="test.rezultat"
                  >
                </td>
                <td>{{DisplayMulti(test.izbor, test.opis, test.rezultat, test.jedinica, test.refd, test.refg, $store.state.site)[3]}}</td>
                <td>{{DisplayMulti(test.izbor, test.opis, test.rezultat, test.jedinica, test.refd, test.refg, $store.state.site)[4]}}</td>
                <td>
                  <i
                    v-bind:class="{'fa fa-exclamation-triangle icon-right input-icon error-icon' : DisplayMulti(test.izbor, test.opis, test.rezultat, test.jedinica, test.refd, test.refg, $store.state.site )[5] === 'Red'}"
                  ></i>
                  <i
                    v-bind:class="{'fa fa-check success-icon icon-right input-icon' : DisplayMulti(test.izbor, test.opis, test.rezultat, test.jedinica, test.refd, test.refg, $store.state.site )[5] === 'Green'}"
                  ></i>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </vuestic-modal-multi>
      <!-- Brisanje uzorka -->
      <vuestic-modal-delete
        :show.sync="show"
        ref="staticModalDeleteSample"
        cancelText="ODUSTANI"
        okText="POTVRDI"
      >
        <div slot="title">{{ 'Brisanje uzorka: ' + sid }}</div>
        <div>
          <h5>{{ 'Jeste li sigurni da želite obrisati uzorak?'}}</h5>
        </div>
      </vuestic-modal-delete>
      <!-- Unos komentara -->
      <vuestic-modal-comment
        :show.sync="show"
        ref="staticModalComment"
        cancelText="ODUSTANI"
        okText="POTVRDI"
      >
        <div slot="title">{{ 'Unos komentara za uzorak: ' + sid }}</div>
        <div>
          <h5></h5>
        </div>
      </vuestic-modal-comment>
      <!-- Uređivanje uzorka -->
      <vuestic-modal-edit
        :show.sync="show"
        :sample="sid"
        action="Edit"
        ref="staticModalEditSample"
        cancelText="ODUSTANI"
        okText="POTVRDI"
      >
        <div slot="title">{{ 'Uređivanje uzorka: ' + sid }}</div>
        <div>
          <h5></h5>
        </div>
      </vuestic-modal-edit>
      <!-- Email Send -->
      <vuestic-modal-mail
        :show.sync="show"
        ref="staticModalSendMail"
        cancelText="ODUSTANI"
        okText="POTVRDI"
      >
        <div slot="title">
          {{'Slanje nalaza na adresu: '}}
          <span style="color: #4ae387;">{{email}}</span>
        </div>
        <div style="text-align: center;">
          <h5 v-if="IgE" style="color: #e34a4a;">
            <i :class="{'fa fa-exclamation-triangle icon-right input-icon error-icon' : true}"></i>
            {{' IgE na nalazu!'}}
          </h5>
          <h5>{{'Jeste li sigurni da želite poslati nalaz?'}}</h5>
        </div>
      </vuestic-modal-mail>
      <vuestic-modal-error
        :show.sync="show"
        ref="staticModalError"
        cancelText="ODUSTANI"
        okText="POTVRDI"
      >
        <div slot="title">
          {{''}}
          <span style="color: #e34a4a;">{{'404: Not Found'}}</span>
        </div>
        <div>
          <h5>{{'Greška prilikom čitanja nalaza!'}}</h5>
        </div>
      </vuestic-modal-error>

      <vuestic-modal-find
        :show.sync="show"
        :data_pid="Number(data_pid)"
        :data_length="Number(data_length)"
        ref="staticModalFind"
        cancelText="ODUSTANI"
        okText="POTVRDI"
      >
        <div slot="title">
          {{''}}
          <span style="color: #e34a4a;">{{'Unesite redni broj pacijenta'}}</span>
        </div>
        <div>
          <h5></h5>
        </div>
      </vuestic-modal-find>
    </div>

    <div class="row">
      <div class="col-md-12">
        <div class="col-md-6">
          <loading
            :active.sync="isLoading"
            :can-cancel="false"
            :on-cancel="onCancel"
            color="#4ae387"
            :is-full-page="fullPage"
          ></loading>
        </div>
        <div class="col-md-6">
          <button v-if="false" @click.prevent="Test">{{'Loading...'}}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import router from "../../router";
import { http } from "../../../config/config.js";
import { barcode } from "../../../config/config.js";
import { bus } from "../../main";
import { server } from "../../../config/config.js";
import PDFObject from "pdfobject";

import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

import { ispisAnalitNe } from "../funkcije/shared/references.js";
import { ispisAnalitDa } from "../funkcije/shared/references.js";

import c_izbornik from "../../data/c_izbornik";
import m_izbornik from "../../data/m_izbornik";
import p_izbornik from "../../data/p_izbornik";
import bhs_izbornik from "../../data/bhs_izbornik";

export default {
  name: "collapse-obrada",

  data() {
    return {
      main: false,
      show: true,
      pdf: false,
      header: "",
      lokacija: {},
      timestamp: "",
      pacijent: "",
      ime: "",
      prezime: "",
      jmbg: "",
      pid: "",
      sid: "",
      email: "",
      email_tmp: "",
      verificiran: false,
      email_button: false,
      final_pdf: false,
      odobren: false,
      approved: 0,
      count: 0,
      nalaz: {},
      report: {},
      path: "",
      url: "",
      uzorci: [],
      samples: [],
      check: "",
      link: "",
      testovi: [],
      rezultati: [],
      analitiprikaz: [],
      analiti: [],
      naslov: "",
      calculated: false,
      show_table: false,
      sample: {},
      resdata: {},
      email_changed: false,
      Previous: { pid: null },
      Next: { pid: null },
      Results: [],
      Datum: { today: null, query: null, next: null, previous: null },
      pagination: false,
      forward_disabled: false,
      backward_disabled: false,
      data_length: 0,
      data_min: 1,
      data_pid: 0,
      data_spol: "",
      query_date: "",
      today_date: "",
      IgE: false,
      // Toasts
      toastText: "",
      toastIcon: "",
      toastPosition: "",
      toastDuration: 2500,
      isToastFullWidth: false,
      className: "",
      isLoading: false,
      fullPage: true
    };
  },
  components: {
    Loading
  },
  watch: {
    email: function() {
      if (this.email.trim() != this.email_tmp.trim()) {
        this.email_changed = true;
      }
    }
  },
  mounted() {
    bus.$on("trash", data => {
      this.sid = data.sid;
      this.$refs.staticModalDeleteSample.open();
    });
    bus.$on("edit", data => {
      this.sid = data.sid;
      this.$refs.staticModalEditSample.open();
    });
    bus.$on("comment", data => {
      this.sid = data.sid;
      this.$refs.staticModalComment.open();
    });
    bus.$on("barcode", data => {
      this.BarcodePrint(data);
    });
    bus.$on("save", data => {
      this.SaveResults(this.rezultati, "save");
    });

    bus.$on("check", data => {
      this.Approve(this.rezultati);
    });
    bus.$on("verify", data => {
      this.Verify(data, "verify");
    });
    bus.$on("undo", data => {
      this.Disapprove(this.rezultati, "undo");
    });
    bus.$on("unlock", data => {
      this.UnVerify(data, "unlock");
    });

    bus.$on("Nalaz", data => {
      if (!data.final_pdf) {
        // console.log(data);
        this.$refs.staticModalError.open();
      } else {
        this.path = this.timestamp + ".pdf";

        this.url = server + "nalazi/" + this.path;

        var options = {
          width: "100%",
          height: "800px"
        };
        PDFObject.embed(this.url, "#pdf-container", options);

        this.email_button = true;
        this.main = false;
        this.pdf = true;
      }
    });
    bus.$on("pdf", data => {
      if (!data.pdf_exists) {
        // console.log(data.sid);
        this.$refs.staticModalError.open();
      } else {
        this.path = "samples/" + data.sid + ".pdf";

        this.url = server + "nalazi/samples/" + data.sid + ".pdf";

        var options = {
          width: "100%",
          height: "800px"
        };
        PDFObject.embed(this.url, "#pdf-container", options);

        this.main = false;
        this.pdf = true;
      }
    });
    bus.$on("Sample", data => {
      this.$store.dispatch("SetSample", data.sid);
      this.GetSingleSample(data);
    });
    bus.$on("Deleted", data => {
      this.DeletedSample(data);
    });
    bus.$on("Edited", data => {
      this.EditSample(data);
    });
    bus.$on("SaveMulti", data => {
      this.SaveMultiResults(this.analiti, data);
    });
    bus.$on("Mail", () => {
      this.SendMail(this.email);
    });
    bus.$on("Error", () => {
      console.warn("Greška prilikom čitanja nalaza.");
      // Generate new Report
    });
    bus.$on("Sljedeci", () => {
      this.Sljedeci();
    });
    bus.$on("Prethodni", () => {
      this.Prethodni();
    });
    bus.$on("Search", () => {
      this.$refs.staticModalFind.open();
    });
    bus.$on("Push", data => {
      if (this.$route.params.id != data) {
        this.Results.forEach(element => {
          if (element.pid == data) {
            router.push(
              "/rezultati/obrada/" +
                element.patient +
                "/" +
                element.pid +
                "?date=" +
                element.date
            );
          }
        });
      } else {
        // console.warn("No change required.");
      }
    });
  },

  beforeDestroy() {
    bus.$off("trash");
    bus.$off("edit");
    bus.$off("comment");
    bus.$off("barcode");
    bus.$off("save");
    bus.$off("check");
    bus.$off("verify");
    bus.$off("undo");
    bus.$off("unlock");
    bus.$off("Nalaz");
    bus.$off("pdf");
    bus.$off("Sample");
    bus.$off("Deleted");
    bus.$off("Edited");
    bus.$off("SaveMulti");
    bus.$off("Mail");
    bus.$off("Error");
    bus.$off("Sljedeci");
    bus.$off("Prethodni");
    bus.$off("Search");
    bus.$off("Push");
  },

  created() {
    this.Created();

    this.Previous.pid = Number(this.$route.params.id) - 1;
    this.Next.pid = Number(this.$route.params.id) + 1;
    this.query_date =
      this.$route.query.date.substring(8, 10) +
      "." +
      this.$route.query.date.substring(5, 7) +
      "." +
      this.$route.query.date.substring(0, 4);

    this.Datum.today = new Date(
      JSON.stringify(
        new Date(new Date().setDate(new Date().getDate()))
      ).substring(1, 11) + "T00:00:00"
    );

    this.today_date =
      JSON.stringify(new Date(new Date().setDate(new Date().getDate())))
        .substring(1, 11)
        .substring(8, 10) +
      "." +
      JSON.stringify(new Date(new Date().setDate(new Date().getDate())))
        .substring(1, 11)
        .substring(5, 7) +
      "." +
      JSON.stringify(new Date(new Date().setDate(new Date().getDate())))
        .substring(1, 11)
        .substring(0, 4);

    this.Datum.query = new Date(
      this.$route.query.date.substring(0, 10) + "T00:00:00"
    );

    this.Datum.next = new Date(
      new Date(this.$route.query.date.substring(0, 10) + "T00:00:00").setDate(
        this.Datum.query.getDate() + 1
      )
    );

    this.Datum.previous = new Date(
      new Date(this.$route.query.date.substring(0, 10) + "T00:00:00").setDate(
        this.Datum.query.getDate() - 1
      )
    );

    // console.log(this.Datum)

    if (new Date(this.Datum.today) > new Date(this.Datum.query)) {
      // this.pagination = false;
    } else if (new Date(this.Datum.today) < new Date(this.Datum.query)) {
      // this.pagination = false;
    } else {
      // this.pagination = true;
    }
  },

  methods: {
    Test() {
      this.isLoading = true;

      setTimeout(() => {
        this.isLoading = false;
      }, 2000);
    },
    onCancel() {
      // console.log("User cancelled the loader.");
    },

    Lokacija() {
      http
        .post("rezultati/nalazi/lokacija", {
          token: this.$store.state.token,
          site: this.$store.state.site,
          timestamp: this.timestamp,
          location: "/",
          naziv: this.timestamp,
          status: true
        })
        .then(res => {
          if (res.data.success) {
            this.IgE = res.data.nalaz.IgE;
            this.main = true;
            // console.log("Nalaz pronađen.");
            // console.log("IgE: " + this.IgE);
          } else {
            this.main = true;
            // console.log("Nalaz nije pronađen.");
          }
        });
    },

    Prethodni() {
      this.pagination = false;

      var check = 0;
      var found = false;
      this.Results.forEach(element => {
        check++;
        if (element.pid == this.Previous.pid) {
          found = true;
          router.push(
            "/rezultati/obrada/" +
              element.patient +
              "/" +
              element.pid +
              "?date=" +
              element.date
          );
        }
      });

      if (check === this.Results.length) {
        if (found) {
          http
            .get(
              "/rezultati/pagination" +
                "?token=" +
                this.$store.state.token +
                "&site=" +
                this.$store.state.site +
                "&pid=" +
                this.Previous.pid.toString() +
                "&date=" +
                this.$route.query.date,
              {}
            )
            .then(res => {
              res.data.rezultati = res.data.rezultati.sort(function(a, b) {
                return a.pid.localeCompare(b.pid, undefined, {
                  numeric: true,
                  sensitivity: "base"
                });
              });

              this.data_length =
                res.data.rezultati[res.data.rezultati.length - 1].pid;
              this.data_min = res.data.rezultati[0].pid;
              if (Object.getOwnPropertyNames(res.data).length === 0) {
                console.warn("No data.");
                this.pagination = true;
                this.backward_disabled = true;
              } else {
                this.data_pid = res.data.data.pid;
                this.Results = res.data.rezultati;
                router.push(
                  "/rezultati/obrada/" +
                    res.data.data.patient +
                    "/" +
                    res.data.data.pid +
                    "?date=" +
                    res.data.data.date
                );
              }
            });
        } else {
          this.Previous.pid = this.Previous.pid - 1;
          if (this.Previous.pid > 0) {
            this.Prethodni();
          } else {
          }
        }
      } else {
      }
    },
    Sljedeci() {
      this.pagination = false;

      var check = 0;
      var found = false;
      this.Results.forEach(element => {
        check++;
        if (element.pid == this.Next.pid) {
          found = true;
          router.push(
            "/rezultati/obrada/" +
              element.patient +
              "/" +
              element.pid +
              "?date=" +
              element.date
          );
        }
      });

      if (check === this.Results.length) {
        if (found) {
          http
            .get(
              "/rezultati/pagination" +
                "?token=" +
                this.$store.state.token +
                "&site=" +
                this.$store.state.site +
                "&pid=" +
                this.Next.pid.toString() +
                "&date=" +
                this.$route.query.date,
              {}
            )
            .then(res => {
              res.data.rezultati = res.data.rezultati.sort(function(a, b) {
                return a.pid.localeCompare(b.pid, undefined, {
                  numeric: true,
                  sensitivity: "base"
                });
              });

              this.data_length =
                res.data.rezultati[res.data.rezultati.length - 1].pid;
              this.data_min = res.data.rezultati[0].pid;
              if (Object.getOwnPropertyNames(res.data).length === 0) {
                console.warn("No data.");
                this.pagination = true;
                this.forward_disabled = true;
              } else {
                this.data_pid = res.data.data.pid;
                this.Results = res.data.rezultati;
                router.push(
                  "/rezultati/obrada/" +
                    res.data.data.patient +
                    "/" +
                    res.data.data.pid +
                    "?date=" +
                    res.data.data.date
                );
              }
            });
        } else {
          this.Next.pid = this.Next.pid + 1;
          this.Sljedeci();
        }
      } else {
      }
    },

    Created() {
      // console.log("Created() {...");
      http
        .get(
          "rezultati/odobravanje/samples/" +
            this.$route.params.patient +
            "/" +
            this.$route.params.id +
            "?token=" +
            this.$store.state.token +
            "&site=" +
            this.$store.state.site +
            "&date=" +
            this.$route.query.date,
          {}
        )
        .then(res => {
          this.header =
            // "Obrada rezultata za pacijenta: " +
            res.data.results[0].patient.ime +
            " " +
            res.data.results[0].patient.prezime;
          this.lokacija = res.data.lokacija;
          this.final_pdf = res.data.final_pdf;

          // console.log(this.lokacija);

          this.timestamp = res.data.results[0].timestamp;

          this.pacijent = res.data.results[0].patient._id;
          this.ime = res.data.results[0].patient.ime;
          this.prezime = res.data.results[0].patient.prezime;
          this.data_spol = res.data.results[0].patient.spol;
          this.jmbg = res.data.results[0].patient.jmbg;
          this.pid = res.data.results[0].sample.pid;

          if (this.lokacija.sendEmail) {            
            this.email = this.lokacija.email;
          } else {
            this.email = res.data.results[0].patient.email.trim();
          }

          this.email_tmp = res.data.results[0].patient.email.trim();
          this.smsData=res.data.results[0].patient;

          if (!this.Email(this.email)) {
            this.email = "";
            this.email_tmp = "";
          }

          this.count = res.data.results.length;
          this.approved = 0;

          this.odobren = true;
          this.verificiran = true;

          res.data.results.forEach(element => {
            if (
              element.status === "ODOBREN" ||
              element.status === "VERIFICIRAN"
            ) {
              this.approved++;
            }
            if (
              element.status != "ODOBREN" &&
              element.status != "VERIFICIRAN"
            ) {
              this.odobren = false;
            }
            if (!element.verificiran) {
              this.verificiran = false;
            }
          });

          this.uzorci = [];

          this.nalaz.patient = res.data.results[0].patient._id;
          this.nalaz.samples = [];

          res.data.results.forEach(element => {
            var check = 0;
            var zaprimljen = 0;
            var realizovan = 0;

            if (element.verificiran) {
              var status_uzorka = "VERIFICIRAN";
            } else {
              var status_uzorka = element.status;
            }

            this.nalaz.samples.push(element._id);

            element.rezultati.forEach(test => {
              check++;

              if (test.rezultat[test.rezultat.length - 1].rezultat_f === "") {
                zaprimljen++;
              }

              if (test.rezultat[test.rezultat.length - 1].rezultat_f != "") {
                realizovan++;
              }

              if (check === element.rezultati.length) {
                if (status_uzorka === "VERIFICIRAN") {
                  this.uzorci.push({
                    sid: element.id,
                    status: "VERIFICIRAN",
                    pdf_exists: element.pdf_exists,
                    _id: element._id,
                    removed: false
                  });
                } else if (status_uzorka === "ODOBREN") {
                  this.uzorci.push({
                    sid: element.id,
                    status: "ODOBREN",
                    pdf_exists: element.pdf_exists,
                    _id: element._id,
                    removed: false
                  });
                } else if (zaprimljen < 1) {
                  this.uzorci.push({
                    sid: element.id,
                    status: "REALIZOVAN",
                    pdf_exists: element.pdf_exists,
                    _id: element._id,
                    removed: false
                  });
                } else if (realizovan < 1) {
                  this.uzorci.push({
                    sid: element.id,
                    status: "ZAPRIMLJEN",
                    pdf_exists: element.pdf_exists,
                    _id: element._id,
                    removed: false
                  });
                } else {
                  this.uzorci.push({
                    sid: element.id,
                    status: "U OBRADI",
                    pdf_exists: element.pdf_exists,
                    _id: element._id,
                    removed: false
                  });
                }
              }
            });
          });

          this.uzorci = this.uzorci.sort(function(a, b) {
            return a.sid.localeCompare(b.sid, undefined, {
              numeric: true,
              sensitivity: "base"
            });
          });

          // console.log(this.uzorci)
          
          this.pagination = true;

          http
            .get(
              "/rezultati/pagination" +
                "?token=" +
                this.$store.state.token +
                "&site=" +
                this.$store.state.site +
                "&pid=" +
                this.$route.params.id +
                "&date=" +
                this.$route.query.date,
              {}
            )
            .then(res => {
              res.data.rezultati = res.data.rezultati.sort(function(a, b) {
                return a.pid.localeCompare(b.pid, undefined, {
                  numeric: true,
                  sensitivity: "base"
                });
              });

              this.data_length =
                res.data.rezultati[res.data.rezultati.length - 1].pid;
              this.data_min = res.data.rezultati[0].pid;
              if (Object.getOwnPropertyNames(res.data).length === 0) {
                console.warn("No data.");
                this.pagination = true;
                this.forward_disabled = true;
              } else {
                this.data_pid = res.data.data.pid;
                this.Results = res.data.rezultati;
              }
            });
        })
        .then(() => {
          this.Lokacija();
        });
    },
    Povratak() {
      router.push("/obrada/pregled/" + "?sekcija=" + "SVE");
    },
    Nazad() {
      this.email_button = false;
      this.main = true;
      this.pdf = false;
    },
    Email: function(email) {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        return true;
      } else {
        return false;
      }
    },
    GetSingleSample(data) {
      this.testovi = [];
      this.rezultati = [];
      this.analitiprikaz = [];
      this.calculated = false;

      var topcije = null;

      switch (this.$store.state.site) {
        case "5bc71402bf21a379083d6e07": // Med Lab, $store.state.site: 5bc71402bf21a379083d6e07
          topcije = m_izbornik.rez;
          break;
        case "5bd40c16020d6d21bbaf610c": // PZU Muminović, $store.state.site: 5bd40c16020d6d21bbaf610c
          topcije = p_izbornik.rez;
          break;
      }

      this.show_table = false;

      http
        .get(
          "rezultati/showsingle/" +
            data.sid +
            "?token=" +
            this.$store.state.token +
            "&site=" +
            this.$store.state.site,
          {}
        )
        .then(res => {
          var test = {};

          if (res.data.data.length) {
            res.data.data.sort(function(a, b) {
              return a.testovi.labassay.grupa + a.testovi.labassay.grouporder ==
                b.testovi.labassay.grupa + b.testovi.labassay.grouporder
                ? 0
                : +(
                    a.testovi.labassay.grupa + a.testovi.labassay.grouporder >
                    b.testovi.labassay.grupa + b.testovi.labassay.grouporder
                  ) || -1;
            });

            this.testovi = res.data.data;
            this.analitiprikaz = res.data.multidata;

            res.data.data.forEach(element => {
              test = {};
              test.realizovan = false;

              test.ime = element.testovi.labassay.naziv;
              test.test = element.testovi.labassay.sifra;
              test.analit = element.testovi.labassay.analit;
              test.IDE = element.testovi._id;
              test.labassay_id = element.testovi.labassay._id;
              test.calculated = element.testovi.labassay.calculated;
              test.manual = element.testovi.labassay.manual;

              test.select_options = eval(
                "topcije." +
                  element.testovi.labassay.naziv
                    .replace("%", "_")
                    .replace("/", "_")
                    .replace(" ", "_")
                    .replace(/-/g, "_")
                    .replace("#", "_")
                    .replace(/^\d+/, "")
              );

              element.testovi.rezultat.forEach(rezultat => {
                test.sekcija = rezultat.anaassay.sekcija;
                test.rezultat = rezultat.rezultat_f;

                if (rezultat.rezultat_f != "") {
                  test.realizovan = true;
                }

                test.unit = rezultat.jedinice_f;

                if (res.data.verificiran || res.data.status === "ODOBREN") {
                  test.odobren = "ODOBREN";
                  test.edit = false;
                } else {
                  test.odobren != "ODOBREN";
                  test.edit = true;
                }

                test.jedinica = rezultat.jedinice_f;
                test.id = rezultat._id;
                test.multidata = element.testovi.labassay.multi;
                test.refSet = element.testovi.grupa;
                test.dRef = element.testovi.refd;
                test.gRef = element.testovi.refg;
                test.retest = element.testovi.retest;
              });

              if (
                test.select_options != undefined &&
                !test.select_options.includes(test.rezultat)
              ) {
                test.select_options.unshift(test.rezultat);
              }
              this.rezultati.push(test);
            });

            this.rezultati.forEach(element => {
              if (element.calculated) {
                this.calculated = true;
              }
            });

            this.sample = data;
            this.show_table = true;
          }
        })
        .then(() => {
          // console.log(data.sid)
          bus.$emit("SetClientHeight", data.sid);
        });
    },
    BarcodePrint(data) {
      var link = barcode + data.sid + ".png";

      http
        .get(
          "uzorci/barcode/" +
            data.sid +
            "?token=" +
            this.$store.state.token +
            "&site=" +
            this.$store.state.site,
          {}
        )
        .then(res => {
          printEPL(
            res.data.name + " " + res.data.surname,
            this.sid,
            res.data.pacijentRBr,
            res.data.godiste,
            res.data.datum,
            link,
            res.data.code,
            this.$store.state.site,
            res.data.jmbg,
          );
        });
    },
    SaveResults(rezultati, from) {
      rezultati.forEach(element => {
        element.rezultat = element.rezultat.replace(/,/g, ".");
      });

      // Vue Loading Overlay Component
      this.isLoading = true;
      // console.log("Loading Overlay: " + true);

      http
        .post("/rezultati/odobravanje/sacuvaj/" + this.$store.state.sid, {
          email: this.$store.state.userId,
          token: this.$store.state.token,
          site: this.$store.state.site,
          rezultati: rezultati
        })
        .then(res => {
          http
            .get(
              "rezultati/odobravanje/samples/" +
                this.$route.params.patient +
                "/" +
                this.$route.params.id +
                "?token=" +
                this.$store.state.token +
                "&site=" +
                this.$store.state.site +
                "&date=" +
                this.$route.query.date,
              {}
            )
            .then(res => {
              this.uzorci = [];

              res.data.results.forEach(element => {
                var check = 0;
                var zaprimljen = 0;
                var realizovan = 0;

                if (element.verificiran) {
                  var status_uzorka = "VERIFICIRAN";
                } else {
                  var status_uzorka = element.status;
                }

                element.rezultati.forEach(test => {
                  check++;

                  if (
                    test.rezultat[test.rezultat.length - 1].rezultat_f === ""
                  ) {
                    zaprimljen++;
                  }

                  if (
                    test.rezultat[test.rezultat.length - 1].rezultat_f != ""
                  ) {
                    realizovan++;
                  }

                  if (check === element.rezultati.length) {
                    if (status_uzorka === "VERIFICIRAN") {
                      this.uzorci.push({
                        sid: element.id,
                        status: "VERIFICIRAN",
                        pdf_exists: element.pdf_exists,
                        _id: element._id,
                        removed: false
                      });
                    } else if (status_uzorka === "ODOBREN") {
                      this.uzorci.push({
                        sid: element.id,
                        status: "ODOBREN",
                        pdf_exists: element.pdf_exists,
                        _id: element._id,
                        removed: false
                      });
                    } else if (zaprimljen < 1) {
                      this.uzorci.push({
                        sid: element.id,
                        status: "REALIZOVAN",
                        pdf_exists: element.pdf_exists,
                        _id: element._id,
                        removed: false
                      });
                    } else if (realizovan < 1) {
                      this.uzorci.push({
                        sid: element.id,
                        status: "ZAPRIMLJEN",
                        pdf_exists: element.pdf_exists,
                        _id: element._id,
                        removed: false
                      });
                    } else {
                      this.uzorci.push({
                        sid: element.id,
                        status: "U OBRADI",
                        pdf_exists: element.pdf_exists,
                        _id: element._id,
                        removed: false
                      });
                    }
                  }
                });
              });

              this.uzorci = this.uzorci.sort(function(a, b) {
                return a.sid.localeCompare(b.sid, undefined, {
                  numeric: true,
                  sensitivity: "base"
                });
              });

              // Vue Loading Overlay Component
              this.isLoading = false;
              // console.log("Loading Overlay: " + false);
            });
        });
    },

    DeletedSample(data) {
      this.uzorci.forEach(element => {
        if (element.sid === data) {
          element.removed = false;
        }
      });

      for (var i = 0; i < this.uzorci.length; i++) {
        if (this.uzorci[i].sid === data) {
          this.uzorci.splice(i, 1);
          break;
        }
      }

      if (this.uzorci.length) {
        this.show = false;
        this.main = false;

        http
          .get(
            "rezultati/odobravanje/samples/" +
              this.$route.params.patient +
              "/" +
              this.$route.params.id +
              "?token=" +
              this.$store.state.token +
              "&site=" +
              this.$store.state.site +
              "&date=" +
              this.$route.query.date,
            {}
          )
          .then(res => {
            this.count = res.data.results.length;
            this.approved = 0;

            this.odobren = true;
            this.verificiran = true;

            this.resdata = {};

            this.resdata = res.data.results;

            res.data.results.forEach(element => {
              if (
                element.status === "ODOBREN" ||
                element.status === "VERIFICIRAN"
              ) {
                this.approved++;
              }
              if (
                element.status != "ODOBREN" &&
                element.status != "VERIFICIRAN"
              ) {
                this.odobren = false;
              }
              if (!element.verificiran) {
                this.verificiran = false;
              }
            });

            if (this.count == this.approved) {
              var report = [];

              this.uzorci.forEach(element => {
                report.push(element._id);
              });

              http
                .post("nalazi/create", {
                  token: this.$store.state.token,
                  site: this.$store.state.site,
                  type: "multi",
                  uzorci: this.uzorci,
                  samples: report,
                  timestamp: this.timestamp,
                  napomena: "",
                  status: false,
                  idNalaza: "",

                  location: "/",
                  naziv: this.timestamp
                })
                .then(res => {
                  if (res.data.success) {
                    http
                      .post("nalazi/memo", {
                        token: this.$store.state.token,
                        site: this.$store.state.site,
                        timestamp: this.timestamp,
                        height: res.data.memo,
                        location: "/",
                        naziv: this.timestamp
                      })
                      .then(res => {
                        this.final_pdf = true;

                        this.uzorci = [];

                        this.resdata.forEach(element => {
                          var check = 0;
                          var zaprimljen = 0;
                          var realizovan = 0;

                          if (element.verificiran) {
                            var status_uzorka = "VERIFICIRAN";
                          } else {
                            var status_uzorka = element.status;
                          }

                          element.rezultati.forEach(test => {
                            check++;

                            if (
                              test.rezultat[test.rezultat.length - 1]
                                .rezultat_f === ""
                            ) {
                              zaprimljen++;
                            }

                            if (
                              test.rezultat[test.rezultat.length - 1]
                                .rezultat_f != ""
                            ) {
                              realizovan++;
                            }

                            if (check === element.rezultati.length) {
                              if (status_uzorka === "VERIFICIRAN") {
                                this.uzorci.push({
                                  sid: element.id,
                                  status: "VERIFICIRAN",
                                  pdf_exists: element.pdf_exists,
                                  _id: element._id,
                                  removed: false
                                });
                              } else if (status_uzorka === "ODOBREN") {
                                this.uzorci.push({
                                  sid: element.id,
                                  status: "ODOBREN",
                                  pdf_exists: element.pdf_exists,
                                  _id: element._id,
                                  removed: false
                                });
                              } else if (zaprimljen < 1) {
                                this.uzorci.push({
                                  sid: element.id,
                                  status: "REALIZOVAN",
                                  pdf_exists: element.pdf_exists,
                                  _id: element._id,
                                  removed: false
                                });
                              } else if (realizovan < 1) {
                                this.uzorci.push({
                                  sid: element.id,
                                  status: "ZAPRIMLJEN",
                                  pdf_exists: element.pdf_exists,
                                  _id: element._id,
                                  removed: false
                                });
                              } else {
                                this.uzorci.push({
                                  sid: element.id,
                                  status: "U OBRADI",
                                  pdf_exists: element.pdf_exists,
                                  _id: element._id,
                                  removed: false
                                });
                              }
                            }
                          });
                        });

                        this.uzorci = this.uzorci.sort(function(a, b) {
                          return a.sid.localeCompare(b.sid, undefined, {
                            numeric: true,
                            sensitivity: "base"
                          });
                        });

                        this.main = true;
                        this.show = true;
                      });
                  }
                });
            } else {
              this.uzorci = [];

              res.data.results.forEach(element => {
                var check = 0;
                var zaprimljen = 0;
                var realizovan = 0;

                if (element.verificiran) {
                  var status_uzorka = "VERIFICIRAN";
                } else {
                  var status_uzorka = element.status;
                }

                element.rezultati.forEach(test => {
                  check++;

                  if (
                    test.rezultat[test.rezultat.length - 1].rezultat_f === ""
                  ) {
                    zaprimljen++;
                  }

                  if (
                    test.rezultat[test.rezultat.length - 1].rezultat_f != ""
                  ) {
                    realizovan++;
                  }

                  if (check === element.rezultati.length) {
                    if (status_uzorka === "VERIFICIRAN") {
                      this.uzorci.push({
                        sid: element.id,
                        status: "VERIFICIRAN",
                        pdf_exists: element.pdf_exists,
                        _id: element._id,
                        removed: false
                      });
                    } else if (status_uzorka === "ODOBREN") {
                      this.uzorci.push({
                        sid: element.id,
                        status: "ODOBREN",
                        pdf_exists: element.pdf_exists,
                        _id: element._id,
                        removed: false
                      });
                    } else if (zaprimljen < 1) {
                      this.uzorci.push({
                        sid: element.id,
                        status: "REALIZOVAN",
                        pdf_exists: element.pdf_exists,
                        _id: element._id,
                        removed: false
                      });
                    } else if (realizovan < 1) {
                      this.uzorci.push({
                        sid: element.id,
                        status: "ZAPRIMLJEN",
                        pdf_exists: element.pdf_exists,
                        _id: element._id,
                        removed: false
                      });
                    } else {
                      this.uzorci.push({
                        sid: element.id,
                        status: "U OBRADI",
                        pdf_exists: element.pdf_exists,
                        _id: element._id,
                        removed: false
                      });
                    }
                  }
                });
              });

              this.uzorci = this.uzorci.sort(function(a, b) {
                return a.sid.localeCompare(b.sid, undefined, {
                  numeric: true,
                  sensitivity: "base"
                });
              });

              this.main = true;
              this.show = true;
            }
          });
      } else {
        router.push("/obrada/pregled");
      }
    },
    EditSample(data) {
      document.getElementById(data).click();

      http
        .get(
          "rezultati/odobravanje/samples/" +
            this.$route.params.patient +
            "/" +
            this.$route.params.id +
            "?token=" +
            this.$store.state.token +
            "&site=" +
            this.$store.state.site +
            "&date=" +
            this.$route.query.date,
          {}
        )
        .then(res => {
          this.uzorci = [];

          res.data.results.forEach(element => {
            var check = 0;
            var zaprimljen = 0;
            var realizovan = 0;

            if (element.verificiran) {
              var status_uzorka = "VERIFICIRAN";
            } else {
              var status_uzorka = element.status;
            }

            element.rezultati.forEach(test => {
              check++;

              if (test.rezultat[test.rezultat.length - 1].rezultat_f === "") {
                zaprimljen++;
              }

              if (test.rezultat[test.rezultat.length - 1].rezultat_f != "") {
                realizovan++;
              }

              if (check === element.rezultati.length) {
                if (status_uzorka === "VERIFICIRAN") {
                  this.uzorci.push({
                    sid: element.id,
                    status: "VERIFICIRAN",
                    pdf_exists: element.pdf_exists,
                    _id: element._id,
                    removed: false
                  });
                } else if (status_uzorka === "ODOBREN") {
                  this.uzorci.push({
                    sid: element.id,
                    status: "ODOBREN",
                    pdf_exists: element.pdf_exists,
                    _id: element._id,
                    removed: false
                  });
                } else if (zaprimljen < 1) {
                  this.uzorci.push({
                    sid: element.id,
                    status: "REALIZOVAN",
                    pdf_exists: element.pdf_exists,
                    _id: element._id,
                    removed: false
                  });
                } else if (realizovan < 1) {
                  this.uzorci.push({
                    sid: element.id,
                    status: "ZAPRIMLJEN",
                    pdf_exists: element.pdf_exists,
                    _id: element._id,
                    removed: false
                  });
                } else {
                  this.uzorci.push({
                    sid: element.id,
                    status: "U OBRADI",
                    pdf_exists: element.pdf_exists,
                    _id: element._id,
                    removed: false
                  });
                }
              }
            });
          });

          this.uzorci = this.uzorci.sort(function(a, b) {
            return a.sid.localeCompare(b.sid, undefined, {
              numeric: true,
              sensitivity: "base"
            });
          });
        })
        .then(() => {
          document.getElementById(this.$store.state.sid).click();
        });
    },
    RetestEnable: function(event) {
      http
        .post("rezultati/odobravanje/retest/da/", {
          id_u: this.$store.state.sid,
          id_t: event.target.id,
          site: this.$store.state.site,
          token: this.$store.state.token
        })
        .then(res => {
          if (true) {
            this.rezultati.forEach(element => {
              if (element.test === event.target.id) {
                element.retest = true;
              }
            });
          }
        });
    },
    RetestDisable: function(event) {
      http
        .post("rezultati/odobravanje/retest/ne/", {
          id_u: this.$store.state.sid,
          id_t: event.target.id,
          site: this.$store.state.site,
          token: this.$store.state.token
        })
        .then(res => {
          if (true) {
            this.rezultati.forEach(element => {
              if (element.test === event.target.id) {
                element.retest = false;
              }
            });
          }
        });
    },

    MultiGet: function(event, naziv, ana, rezultat, odobren) {
      this.naslov = "Rezultati testa: " + naziv + " (" + ana + ")";
      this.analiti = [];
      var single = {};
      var i = 0;
      var kontrola = false;

      this.uzorci.forEach(element => {
        if (element.sid === this.$store.state.sid) {
          this.check = element.status;
        }
      });

      this.analitiprikaz.forEach(element => {
        i++;
        single = {};

        var opcije = null;

        var noResult = true;

        if (event.target.id === element.labassay._id) {
          element.rezultat.forEach(analit => {
            if (analit.rezultat[0].rezultat_f.trim() != "") {
              noResult = false;
            }
          });
        }

        switch (this.$store.state.site) {
          case "5bc71402bf21a379083d6e07": // Med Lab, $store.state.site: 5bc71402bf21a379083d6e07
            opcije = m_izbornik.data;
            break;
          case "5bd40c16020d6d21bbaf610c": // PZU Muminović, $store.state.site: 5bd40c16020d6d21bbaf610c
            opcije = p_izbornik.data;
            break;
        }

        if (event.target.id === element.labassay._id) {
          element.rezultat.forEach(analit => {
            single.kod = analit.rezultat[0].module_sn;
            single.select_options = eval(
              "opcije." +
                analit.rezultat[0].module_sn
                  .replace("%", "_")
                  .replace("/", "_")
                  .replace(" ", "_")
                  .replace(/-/g, "_")
                  .replace("#", "_")
                  // .replace(/[0-9]/g, "_")
                  .replace(/^\d+/, "")
            );

            var tmpOptionsAna = [];
            if (single.select_options != undefined) {
              tmpOptionsAna = single.select_options.slice();
              single.select_options = tmpOptionsAna.slice();
            }

            if (
              analit.rezultat[0].rezultat_f.trim() != "" &&
              single.select_options != undefined &&
              !single.select_options.includes(analit.rezultat[0].rezultat_f)
            ) {
              single.select_options.unshift(analit.rezultat[0].rezultat_f);
            }

            single.refd = analit.refd;
            single.labID = event.target.id;
            single.refg = analit.refg;
            single.nazivTesta = naziv;
            single.grupa = analit.grupa;
            single.naziv = analit.rezultat[0].sn;
            single.opis = analit.rezultat[0].dilucija;
            single.jedinica = analit.rezultat[0].jedinice_f;
            single.rezultat = analit.rezultat[0].rezultat_f;
            single.flag = analit.rezultat[0].rezultat_i;
            single.manual = element.labassay.manual;
            single.odobren = odobren;

            if (this.check === "ODOBREN" || this.check === "VERIFICIRAN") {
              single.edit = false;
            } else {
              single.edit = true;
            }

            if (
              ana === "Opšti pregled urina" &&
              this.$store.state.site === "5bd40c16020d6d21bbaf610c" &&
              this.check != "ODOBREN" &&
              this.check != "VERIFICIRAN"
            ) {
              if (
                analit.rezultat[0].rezultat_f === "" &&
                single.select_options != undefined
              ) {
                if (noResult) {
                  single.rezultat = single.select_options[1];
                }
              }
            }

            single.analit = analit.rezultat[0].anaassay;
            single.izbor = ana;

            this.analiti.push(single);

            single = {};
          });
        }

        if (i === this.analitiprikaz.length) {
          kontrola = true;
        }
      });

      if (kontrola) {
        this.$refs.largeModalMulti.open();
      }
    },
    Single: function(test, rezultat, jedinica, dRef, gRef, site) {
      if (rezultat === null) {
        rezultat = "";
      }
      return ispisAnalitNe(test, rezultat, jedinica, dRef, gRef, site);
    },
    DisplayMulti: function(izbor, test, rezultat, jedinica, dRef, gRef, site) {
      if (rezultat === null) {
        rezultat = "";
      }
      return ispisAnalitDa(izbor, test, rezultat, jedinica, dRef, gRef, site);
    },
    MailDialog() {
      this.$refs.staticModalSendMail.open();
    },
    SendMail(email) {
      // Vue Loading Overlay Component

      if(this.path.includes("samples/")){

        var a = this.path.substring(8, 18)
        var b = "samples/"

      }else{

        var a = this.timestamp
        var b = "/"

      }

      this.isLoading = true;

      http
        .post("nalazi/mail", {
          token: this.$store.state.token,
          site: this.$store.state.site,
          email: email,
          timestamp: a,
          location: b,
          naziv: a
        })
        .then(res => {
          // Vue Loading Overlay Component
          this.isLoading = false;

          if (res.data.success) {
            this.toastText = "Nalaz uspješno poslan.";
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

            /* if (this.email_changed) {
              console.log('Update email address.')
              http
                .post("pacijenti/detalji/update/" + this.pacijent, {
                  email: email.trim(),
                  token: this.$store.state.token,
                  site: this.$store.state.site
                })
                .then(res => {});
            } */
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
    },
    SaveMultiResults(analiti, data) {
      analiti.forEach(analit => {
        analit.rezultat = analit.rezultat.replace(/,/g, ".");
      });

      // Vue Loading Overlay Component
      this.isLoading = true;

      http
        .post("/rezultati/odobravanje/analiti/" + this.$store.state.sid, {
          analiti: analiti,
          site: this.$store.state.site,
          token: this.$store.state.token
        })
        .then(res => {
          http
            .get(
              "rezultati/odobravanje/samples/" +
                this.$route.params.patient +
                "/" +
                this.$route.params.id +
                "?token=" +
                this.$store.state.token +
                "&site=" +
                this.$store.state.site +
                "&date=" +
                this.$route.query.date,
              {}
            )
            .then(res => {
              this.uzorci = [];

              res.data.results.forEach(element => {
                var check = 0;
                var zaprimljen = 0;
                var realizovan = 0;

                if (element.verificiran) {
                  var status_uzorka = "VERIFICIRAN";
                } else {
                  var status_uzorka = element.status;
                }

                element.rezultati.forEach(test => {
                  check++;

                  if (
                    test.rezultat[test.rezultat.length - 1].rezultat_f === ""
                  ) {
                    zaprimljen++;
                  }

                  if (
                    test.rezultat[test.rezultat.length - 1].rezultat_f != ""
                  ) {
                    realizovan++;
                  }

                  if (check === element.rezultati.length) {
                    if (status_uzorka === "VERIFICIRAN") {
                      this.uzorci.push({
                        sid: element.id,
                        status: "VERIFICIRAN",
                        pdf_exists: element.pdf_exists,
                        _id: element._id,
                        removed: false
                      });
                    } else if (status_uzorka === "ODOBREN") {
                      this.uzorci.push({
                        sid: element.id,
                        status: "ODOBREN",
                        pdf_exists: element.pdf_exists,
                        _id: element._id,
                        removed: false
                      });
                    } else if (zaprimljen < 1) {
                      this.uzorci.push({
                        sid: element.id,
                        status: "REALIZOVAN",
                        pdf_exists: element.pdf_exists,
                        _id: element._id,
                        removed: false
                      });
                    } else if (realizovan < 1) {
                      this.uzorci.push({
                        sid: element.id,
                        status: "ZAPRIMLJEN",
                        pdf_exists: element.pdf_exists,
                        _id: element._id,
                        removed: false
                      });
                    } else {
                      this.uzorci.push({
                        sid: element.id,
                        status: "U OBRADI",
                        pdf_exists: element.pdf_exists,
                        _id: element._id,
                        removed: false
                      });
                    }
                  }
                });
              });

              this.uzorci = this.uzorci.sort(function(a, b) {
                return a.sid.localeCompare(b.sid, undefined, {
                  numeric: true,
                  sensitivity: "base"
                });
              });

              // Vue Loading Overlay Component
              this.isLoading = false;
            });
        })
        .then(res => {
          var data = {};

          this.uzorci.forEach(element => {
            if (element.sid === this.$store.state.sid) {
              data = element;
            }
          });

          this.testovi = [];
          this.rezultati = [];
          this.analitiprikaz = [];
          this.calculated = false;

          var topcije = null;

          switch (this.$store.state.site) {
            case "5bc71402bf21a379083d6e07": // Med Lab, $store.state.site: 5bc71402bf21a379083d6e07
              topcije = m_izbornik.rez;
              break;
            case "5bd40c16020d6d21bbaf610c": // PZU Muminović, $store.state.site: 5bd40c16020d6d21bbaf610c
              topcije = p_izbornik.rez;
              break;
          }

          this.show_table = false;

          http
            .get(
              "rezultati/showsingle/" +
                data.sid +
                "?token=" +
                this.$store.state.token +
                "&site=" +
                this.$store.state.site,
              {}
            )
            .then(res => {
              var test = {};

              if (res.data.data.length) {
                res.data.data.sort(function(a, b) {
                  return a.testovi.labassay.grupa +
                    a.testovi.labassay.grouporder ==
                    b.testovi.labassay.grupa + b.testovi.labassay.grouporder
                    ? 0
                    : +(
                        a.testovi.labassay.grupa +
                          a.testovi.labassay.grouporder >
                        b.testovi.labassay.grupa + b.testovi.labassay.grouporder
                      ) || -1;
                });

                this.testovi = res.data.data;
                this.analitiprikaz = res.data.multidata;

                res.data.data.forEach(element => {
                  test = {};
                  test.realizovan = false;

                  test.ime = element.testovi.labassay.naziv;
                  test.test = element.testovi.labassay.sifra;
                  test.analit = element.testovi.labassay.analit;
                  test.IDE = element.testovi._id;
                  test.labassay_id = element.testovi.labassay._id;
                  test.calculated = element.testovi.labassay.calculated;
                  test.manual = element.testovi.labassay.manual;

                  test.select_options = eval(
                    "topcije." +
                      element.testovi.labassay.naziv
                        .replace("%", "_")
                        .replace("/", "_")
                        .replace(" ", "_")
                        .replace(/-/g, "_")
                        .replace("#", "_")
                        .replace(/^\d+/, "")
                  );

                  element.testovi.rezultat.forEach(rezultat => {
                    test.sekcija = rezultat.anaassay.sekcija;
                    test.rezultat = rezultat.rezultat_f;

                    if (rezultat.rezultat_f != "") {
                      test.realizovan = true;
                    }

                    test.unit = rezultat.jedinice_f;

                    if (res.data.verificiran || res.data.status === "ODOBREN") {
                      test.odobren = "ODOBREN";
                      test.edit = false;
                    } else {
                      test.odobren != "ODOBREN";
                      test.edit = true;
                    }

                    test.jedinica = rezultat.jedinice_f;
                    test.id = rezultat._id;
                    test.multidata = element.testovi.labassay.multi;
                    test.refSet = element.testovi.grupa;
                    test.dRef = element.testovi.refd;
                    test.gRef = element.testovi.refg;
                    test.retest = element.testovi.retest;
                  });

                  if (
                    test.select_options != undefined &&
                    !test.select_options.includes(test.rezultat)
                  ) {
                    test.select_options.unshift(test.rezultat);
                  }
                  this.rezultati.push(test);
                });

                this.rezultati.forEach(element => {
                  if (element.calculated) {
                    this.calculated = true;
                  }
                });

                this.sample = data;
                this.show_table = true;
              }
            });
        });
    },

    Calculate: function(event, id, ime, edited) {
      http
        .post("/rezultati/odobravanje/calculate/" + this.$store.state.sid, {
          _id: id,
          token: this.$store.state.token,
          site: this.$store.state.site,
          ime: ime,
          pid: this.pid
        })
        .then(res => {
          http
            .get(
              "rezultati/odobravanje/samples/" +
                this.$route.params.patient +
                "/" +
                this.$route.params.id +
                "?token=" +
                this.$store.state.token +
                "&site=" +
                this.$store.state.site +
                "&date=" +
                this.$route.query.date,
              {}
            )
            .then(res => {
              this.uzorci = [];

              res.data.results.forEach(element => {
                var check = 0;
                var zaprimljen = 0;
                var realizovan = 0;

                if (element.verificiran) {
                  var status_uzorka = "VERIFICIRAN";
                } else {
                  var status_uzorka = element.status;
                }

                element.rezultati.forEach(test => {
                  check++;

                  if (
                    test.rezultat[test.rezultat.length - 1].rezultat_f === ""
                  ) {
                    zaprimljen++;
                  }

                  if (
                    test.rezultat[test.rezultat.length - 1].rezultat_f != ""
                  ) {
                    realizovan++;
                  }

                  if (check === element.rezultati.length) {
                    if (status_uzorka === "VERIFICIRAN") {
                      this.uzorci.push({
                        sid: element.id,
                        status: "VERIFICIRAN",
                        pdf_exists: element.pdf_exists,
                        _id: element._id,
                        removed: false
                      });
                    } else if (status_uzorka === "ODOBREN") {
                      this.uzorci.push({
                        sid: element.id,
                        status: "ODOBREN",
                        pdf_exists: element.pdf_exists,
                        _id: element._id,
                        removed: false
                      });
                    } else if (zaprimljen < 1) {
                      this.uzorci.push({
                        sid: element.id,
                        status: "REALIZOVAN",
                        pdf_exists: element.pdf_exists,
                        _id: element._id,
                        removed: false
                      });
                    } else if (realizovan < 1) {
                      this.uzorci.push({
                        sid: element.id,
                        status: "ZAPRIMLJEN",
                        pdf_exists: element.pdf_exists,
                        _id: element._id,
                        removed: false
                      });
                    } else {
                      this.uzorci.push({
                        sid: element.id,
                        status: "U OBRADI",
                        pdf_exists: element.pdf_exists,
                        _id: element._id,
                        removed: false
                      });
                    }
                  }
                });
              });

              this.uzorci = this.uzorci.sort(function(a, b) {
                return a.sid.localeCompare(b.sid, undefined, {
                  numeric: true,
                  sensitivity: "base"
                });
              });
            });
        })
        .then(res => {
          var data = {};

          this.uzorci.forEach(element => {
            if (element.sid === this.$store.state.sid) {
              data = element;
            }
          });

          this.testovi = [];
          this.rezultati = [];
          this.analitiprikaz = [];
          this.calculated = false;

          var topcije = null;

          switch (this.$store.state.site) {
            case "5bc71402bf21a379083d6e07": // Med Lab, $store.state.site: 5bc71402bf21a379083d6e07
              topcije = m_izbornik.rez;
              break;
            case "5bd40c16020d6d21bbaf610c": // PZU Muminović, $store.state.site: 5bd40c16020d6d21bbaf610c
              topcije = p_izbornik.rez;
              break;
          }

          http
            .get(
              "rezultati/showsingle/" +
                data.sid +
                "?token=" +
                this.$store.state.token +
                "&site=" +
                this.$store.state.site,
              {}
            )
            .then(res => {
              var test = {};

              if (res.data.data.length) {
                res.data.data.sort(function(a, b) {
                  return a.testovi.labassay.grupa +
                    a.testovi.labassay.grouporder ==
                    b.testovi.labassay.grupa + b.testovi.labassay.grouporder
                    ? 0
                    : +(
                        a.testovi.labassay.grupa +
                          a.testovi.labassay.grouporder >
                        b.testovi.labassay.grupa + b.testovi.labassay.grouporder
                      ) || -1;
                });

                this.testovi = res.data.data;
                this.analitiprikaz = res.data.multidata;

                res.data.data.forEach(element => {
                  test = {};
                  test.realizovan = false;

                  test.ime = element.testovi.labassay.naziv;
                  test.test = element.testovi.labassay.sifra;
                  test.analit = element.testovi.labassay.analit;
                  test.IDE = element.testovi._id;
                  test.labassay_id = element.testovi.labassay._id;
                  test.calculated = element.testovi.labassay.calculated;
                  test.manual = element.testovi.labassay.manual;

                  test.select_options = eval(
                    "topcije." +
                      element.testovi.labassay.naziv
                        .replace("%", "_")
                        .replace("/", "_")
                        .replace(" ", "_")
                        .replace(/-/g, "_")
                        .replace("#", "_")
                        .replace(/^\d+/, "")
                  );

                  element.testovi.rezultat.forEach(rezultat => {
                    test.sekcija = rezultat.anaassay.sekcija;
                    test.rezultat = rezultat.rezultat_f;

                    if (rezultat.rezultat_f != "") {
                      test.realizovan = true;
                    }

                    test.unit = rezultat.jedinice_f;

                    if (res.data.verificiran || res.data.status === "ODOBREN") {
                      test.odobren = "ODOBREN";
                      test.edit = false;
                    } else {
                      test.odobren != "ODOBREN";
                      test.edit = true;
                    }

                    test.jedinica = rezultat.jedinice_f;
                    test.id = rezultat._id;
                    test.multidata = element.testovi.labassay.multi;
                    test.refSet = element.testovi.grupa;
                    test.dRef = element.testovi.refd;
                    test.gRef = element.testovi.refg;
                    test.retest = element.testovi.retest;
                  });

                  if (
                    test.select_options != undefined &&
                    !test.select_options.includes(test.rezultat)
                  ) {
                    test.select_options.unshift(test.rezultat);
                  }
                  this.rezultati.push(test);
                });

                this.rezultati.forEach(element => {
                  if (element.calculated) {
                    this.calculated = true;
                  }
                });

                this.sample = data;
              }
            });
        });
    },

    Approve(rezultati) {
      this.rezultati.forEach(element => {
        element.edit = false;
      });

      this.calculated = false;

      rezultati.forEach(element => {
        element.rezultat = element.rezultat.replace(/,/g, ".");
      });

      var DE = false

      if((rezultati[0].labassay_id == "5f5a2f47c0508983dac17334" || rezultati[0].labassay_id == "5ec412c9074f54d3e2d5a130" || rezultati[0].labassay_id == "5fb649241373ce50902236bd")){
        console.log("COV2 IgG, Anti SARS-CoV2-IgG || COV2 IgM, Anti SARS-CoV2-IgM || SARS-CoV2 Antigen")
        
        DE = true
      }

      http
        .post("/rezultati/odobravanje/sacuvaj/" + this.$store.state.sid, {
          email: this.$store.state.userId,
          token: this.$store.state.token,
          site: this.$store.state.site,
          rezultati: rezultati
        })
        .then(res => {
          // Vue Loading Overlay Component
          this.isLoading = true;
          // console.log("Loading Overlay: " + true);

          http
            .post("/rezultati/odobravanje/odobri/" + this.$store.state.sid, {
              testovi: rezultati,
              site: this.$store.state.site,
              token: this.$store.state.token
            })
            .then(res => {
              this.report = {};

              this.uzorci.forEach(element => {
                if (element.sid === this.$store.state.sid) {
                  this.report = element;
                }
              });

              var sample = [];
              sample.push(this.report._id);

              

              
              http
                .post("nalazi/create", {
                  token: this.$store.state.token,
                  site: this.$store.state.site,
                  type: "single",
                  uzorci: this.uzorci,
                  samples: sample,
                  timestamp: this.timestamp,
                  napomena: "",
                  status: false,
                  idNalaza: "",
                  location: "/samples",
                  naziv: this.report.sid,
                  de: DE
                })
                .then(res => {
                  http
                    .get(
                      "rezultati/odobravanje/samples/" +
                        this.$route.params.patient +
                        "/" +
                        this.$route.params.id +
                        "?token=" +
                        this.$store.state.token +
                        "&site=" +
                        this.$store.state.site +
                        "&date=" +
                        this.$route.query.date,
                      {}
                    )
                    .then(res => {
                      this.final_pdf = res.data.final_pdf;

                      this.count = res.data.results.length;
                      this.approved = 0;

                      this.odobren = true;
                      this.verificiran = true;

                      res.data.results.forEach(element => {
                        if (
                          element.status === "ODOBREN" ||
                          element.status === "VERIFICIRAN"
                        ) {
                          this.approved++;
                        }
                        if (
                          element.status != "ODOBREN" &&
                          element.status != "VERIFICIRAN"
                        ) {
                          this.odobren = false;
                        }
                        if (!element.verificiran) {
                          this.verificiran = false;
                        }
                      });

                      var response = res.data.results;

                      if (this.count == this.approved) {
                        console.warn("Generate new Report.");

                        var report = [];

                        this.uzorci.forEach(element => {
                          report.push(element._id);
                        });

                        http
                          .post("nalazi/create", {
                            token: this.$store.state.token,
                            site: this.$store.state.site,
                            type: "multi",
                            uzorci: this.uzorci,
                            samples: report,
                            timestamp: this.timestamp,
                            napomena: "",
                            status: false,
                            idNalaza: "",

                            location: "/",
                            naziv: this.timestamp
                          })
                          .then(res => {
                            if (res.data.success) {
                              http
                                .post("nalazi/memo", {
                                  token: this.$store.state.token,
                                  site: this.$store.state.site,
                                  timestamp: this.timestamp,
                                  height: res.data.memo,
                                  location: "/",
                                  naziv: this.timestamp
                                })
                                .then(res => {
                                  this.uzorci = [];

                                  response.forEach(element => {
                                    var check = 0;
                                    var zaprimljen = 0;
                                    var realizovan = 0;

                                    if (element.verificiran) {
                                      var status_uzorka = "VERIFICIRAN";
                                    } else {
                                      var status_uzorka = element.status;
                                    }

                                    element.rezultati.forEach(test => {
                                      check++;

                                      if (
                                        test.rezultat[test.rezultat.length - 1]
                                          .rezultat_f === ""
                                      ) {
                                        zaprimljen++;
                                      }

                                      if (
                                        test.rezultat[test.rezultat.length - 1]
                                          .rezultat_f != ""
                                      ) {
                                        realizovan++;
                                      }

                                      if (check === element.rezultati.length) {
                                        if (status_uzorka === "VERIFICIRAN") {
                                          this.uzorci.push({
                                            sid: element.id,
                                            status: "VERIFICIRAN",
                                            pdf_exists: element.pdf_exists,
                                            _id: element._id,
                                            removed: false
                                          });
                                        } else if (
                                          status_uzorka === "ODOBREN"
                                        ) {
                                          this.uzorci.push({
                                            sid: element.id,
                                            status: "ODOBREN",
                                            pdf_exists: element.pdf_exists,
                                            _id: element._id,
                                            removed: false
                                          });
                                        } else if (zaprimljen < 1) {
                                          this.uzorci.push({
                                            sid: element.id,
                                            status: "REALIZOVAN",
                                            pdf_exists: element.pdf_exists,
                                            _id: element._id,
                                            removed: false
                                          });
                                        } else if (realizovan < 1) {
                                          this.uzorci.push({
                                            sid: element.id,
                                            status: "ZAPRIMLJEN",
                                            pdf_exists: element.pdf_exists,
                                            _id: element._id,
                                            removed: false
                                          });
                                        } else {
                                          this.uzorci.push({
                                            sid: element.id,
                                            status: "U OBRADI",
                                            pdf_exists: element.pdf_exists,
                                            _id: element._id,
                                            removed: false
                                          });
                                        }
                                      }
                                    });
                                  });

                                  this.uzorci = this.uzorci.sort(function(
                                    a,
                                    b
                                  ) {
                                    return a.sid.localeCompare(
                                      b.sid,
                                      undefined,
                                      {
                                        numeric: true,
                                        sensitivity: "base"
                                      }
                                    );
                                  });

                                  this.main = true;

                                  // Vue Loading Overlay Component
                                  this.isLoading = false;
                                  // console.log("Loading Overlay: " + false);
                                });
                            }
                          });
                      } else {
                        this.uzorci = [];

                        res.data.results.forEach(element => {
                          var check = 0;
                          var zaprimljen = 0;
                          var realizovan = 0;

                          if (element.verificiran) {
                            var status_uzorka = "VERIFICIRAN";
                          } else {
                            var status_uzorka = element.status;
                          }

                          element.rezultati.forEach(test => {
                            check++;

                            if (
                              test.rezultat[test.rezultat.length - 1]
                                .rezultat_f === ""
                            ) {
                              zaprimljen++;
                            }

                            if (
                              test.rezultat[test.rezultat.length - 1]
                                .rezultat_f != ""
                            ) {
                              realizovan++;
                            }

                            if (check === element.rezultati.length) {
                              if (status_uzorka === "VERIFICIRAN") {
                                this.uzorci.push({
                                  sid: element.id,
                                  status: "VERIFICIRAN",
                                  pdf_exists: element.pdf_exists,
                                  _id: element._id,
                                  removed: false
                                });
                              } else if (status_uzorka === "ODOBREN") {
                                this.uzorci.push({
                                  sid: element.id,
                                  status: "ODOBREN",
                                  pdf_exists: element.pdf_exists,
                                  _id: element._id,
                                  removed: false
                                });
                              } else if (zaprimljen < 1) {
                                this.uzorci.push({
                                  sid: element.id,
                                  status: "REALIZOVAN",
                                  pdf_exists: element.pdf_exists,
                                  _id: element._id,
                                  removed: false
                                });
                              } else if (realizovan < 1) {
                                this.uzorci.push({
                                  sid: element.id,
                                  status: "ZAPRIMLJEN",
                                  pdf_exists: element.pdf_exists,
                                  _id: element._id,
                                  removed: false
                                });
                              } else {
                                this.uzorci.push({
                                  sid: element.id,
                                  status: "U OBRADI",
                                  pdf_exists: element.pdf_exists,
                                  _id: element._id,
                                  removed: false
                                });
                              }
                            }
                          });
                        });

                        this.uzorci = this.uzorci.sort(function(a, b) {
                          return a.sid.localeCompare(b.sid, undefined, {
                            numeric: true,
                            sensitivity: "base"
                          });
                        });

                        this.main = true;

                        // Vue Loading Overlay Component
                        this.isLoading = false;
                        // console.log("Loading Overlay: " + false);
                      }
                    })
                    .then(res => {});
                });
            });
        });
    },

    Disapprove(rezultati, from) {
      this.rezultati.forEach(element => {
        if (element.calculated) {
          this.calculated = true;
        }
      });

      http
        .post("/rezultati/odobravanje/ukloni/" + this.$store.state.sid, {
          testovi: rezultati,
          site: this.$store.state.site,
          token: this.$store.state.token
        })
        .then(res => {
          http
            .get(
              "rezultati/odobravanje/samples/" +
                this.$route.params.patient +
                "/" +
                this.$route.params.id +
                "?token=" +
                this.$store.state.token +
                "&site=" +
                this.$store.state.site +
                "&date=" +
                this.$route.query.date,
              {}
            )
            .then(res => {
              this.final_pdf = res.data.final_pdf;

              this.count = res.data.results.length;
              this.approved = 0;

              this.odobren = true;
              this.verificiran = true;

              res.data.results.forEach(element => {
                if (
                  element.status === "ODOBREN" ||
                  element.status === "VERIFICIRAN"
                ) {
                  this.approved++;
                }
                if (
                  element.status != "ODOBREN" &&
                  element.status != "VERIFICIRAN"
                ) {
                  this.odobren = false;
                }
                if (!element.verificiran) {
                  this.verificiran = false;
                }
              });

              this.uzorci = [];

              res.data.results.forEach(element => {
                var check = 0;
                var zaprimljen = 0;
                var realizovan = 0;

                if (element.verificiran) {
                  var status_uzorka = "VERIFICIRAN";
                } else {
                  var status_uzorka = element.status;
                }

                element.rezultati.forEach(test => {
                  check++;

                  if (
                    test.rezultat[test.rezultat.length - 1].rezultat_f === ""
                  ) {
                    zaprimljen++;
                  }

                  if (
                    test.rezultat[test.rezultat.length - 1].rezultat_f != ""
                  ) {
                    realizovan++;
                  }

                  if (check === element.rezultati.length) {
                    if (status_uzorka === "VERIFICIRAN") {
                      this.uzorci.push({
                        sid: element.id,
                        status: "VERIFICIRAN",
                        pdf_exists: element.pdf_exists,
                        _id: element._id,
                        removed: false
                      });
                    } else if (status_uzorka === "ODOBREN") {
                      this.uzorci.push({
                        sid: element.id,
                        status: "ODOBREN",
                        pdf_exists: element.pdf_exists,
                        _id: element._id,
                        removed: false
                      });
                    } else if (zaprimljen < 1) {
                      this.uzorci.push({
                        sid: element.id,
                        status: "REALIZOVAN",
                        pdf_exists: element.pdf_exists,
                        _id: element._id,
                        removed: false
                      });
                    } else if (realizovan < 1) {
                      this.uzorci.push({
                        sid: element.id,
                        status: "ZAPRIMLJEN",
                        pdf_exists: element.pdf_exists,
                        _id: element._id,
                        removed: false
                      });
                    } else {
                      this.uzorci.push({
                        sid: element.id,
                        status: "U OBRADI",
                        pdf_exists: element.pdf_exists,
                        _id: element._id,
                        removed: false
                      });
                    }
                  }
                });
              });

              this.uzorci = this.uzorci.sort(function(a, b) {
                return a.sid.localeCompare(b.sid, undefined, {
                  numeric: true,
                  sensitivity: "base"
                });
              });

              this.main = true;
            });

          this.rezultati.forEach(element => {
            element.edit = true;
          });
        });
    },

    Verify(data) {
      http
        .post("/rezultati/obrada/verifikacija/" + this.$store.state.sid, {
          site: this.$store.state.site,
          token: this.$store.state.token,
          verify: true
        })
        .then(res => {
          http
            .get(
              "rezultati/odobravanje/samples/" +
                this.$route.params.patient +
                "/" +
                this.$route.params.id +
                "?token=" +
                this.$store.state.token +
                "&site=" +
                this.$store.state.site +
                "&date=" +
                this.$route.query.date,
              {}
            )
            .then(res => {
              this.final_pdf = res.data.final_pdf;

              this.count = res.data.results.length;
              this.approved = 0;

              this.odobren = true;
              this.verificiran = true;

              res.data.results.forEach(element => {
                if (
                  element.status === "ODOBREN" ||
                  element.status === "VERIFICIRAN"
                ) {
                  this.approved++;
                }
                if (
                  element.status != "ODOBREN" &&
                  element.status != "VERIFICIRAN"
                ) {
                  this.odobren = false;
                }
                if (!element.verificiran) {
                  this.verificiran = false;
                }
              });

              this.uzorci = [];

              res.data.results.forEach(element => {
                var check = 0;
                var zaprimljen = 0;
                var realizovan = 0;

                if (element.verificiran) {
                  var status_uzorka = "VERIFICIRAN";
                } else {
                  var status_uzorka = element.status;
                }

                element.rezultati.forEach(test => {
                  check++;

                  if (
                    test.rezultat[test.rezultat.length - 1].rezultat_f === ""
                  ) {
                    zaprimljen++;
                  }

                  if (
                    test.rezultat[test.rezultat.length - 1].rezultat_f != ""
                  ) {
                    realizovan++;
                  }

                  if (check === element.rezultati.length) {
                    if (status_uzorka === "VERIFICIRAN") {
                      this.uzorci.push({
                        sid: element.id,
                        status: "VERIFICIRAN",
                        pdf_exists: element.pdf_exists,
                        _id: element._id,
                        removed: false
                      });
                    } else if (status_uzorka === "ODOBREN") {
                      this.uzorci.push({
                        sid: element.id,
                        status: "ODOBREN",
                        pdf_exists: element.pdf_exists,
                        _id: element._id,
                        removed: false
                      });
                    } else if (zaprimljen < 1) {
                      this.uzorci.push({
                        sid: element.id,
                        status: "REALIZOVAN",
                        pdf_exists: element.pdf_exists,
                        _id: element._id,
                        removed: false
                      });
                    } else if (realizovan < 1) {
                      this.uzorci.push({
                        sid: element.id,
                        status: "ZAPRIMLJEN",
                        pdf_exists: element.pdf_exists,
                        _id: element._id,
                        removed: false
                      });
                    } else {
                      this.uzorci.push({
                        sid: element.id,
                        status: "U OBRADI",
                        pdf_exists: element.pdf_exists,
                        _id: element._id,
                        removed: false
                      });
                    }
                  }
                });
              });

              this.uzorci = this.uzorci.sort(function(a, b) {
                return a.sid.localeCompare(b.sid, undefined, {
                  numeric: true,
                  sensitivity: "base"
                });
              });

              if (this.verificiran) {
                // console.log('Set Report Status: ' + true)
                http
                  .post("rezultati/nalazi/status", {
                    token: this.$store.state.token,
                    site: this.$store.state.site,
                    timestamp: this.timestamp,
                    location: "/",
                    naziv: this.timestamp,
                    status: true
                  })
                  .then(res => {
                    this.main = true;
                    this.IgE = res.data.IgE;
                    // console.log("Nalaz verificiran.");
                    // console.log("IgE: " + this.IgE);
                    this.email = this.lokacija.email;

                    if (this.lokacija.sendEmail) {
                      document.getElementById(this.lokacija.email).click();
                    }
                    if (this.lokacija.sendSMS) {
                      //pozovi viber ruta u odobravanje.js medlaba i kopirati oboravanje kontroel funkciju sendSMS

                    http
                    .post("nalazi/viber", {
                      token: this.$store.state.token,
                      site: this.$store.state.site,
                      timestamp: this.timestamp,
                      smsData: this.smsData,
                      location: "/",
                    })
                    .then((response) => {
                      // console.log(response);
                      if (response.data.success) {
                        // Success
                      } else {
                        // Greška
                      }
                    });

                    }
                    // if (this.lokacija.sendEmail && !res.data.IgE) {
                    //   // console.log('Auto Mail Sender: ' + true)
                    //   http
                    //     .post("nalazi/mail", {
                    //       token: this.$store.state.token,
                    //       site: this.$store.state.site,
                    //       email: this.lokacija.email,
                    //       timestamp: this.timestamp,
                    //       location: "/",
                    //       naziv: this.timestamp
                    //     })
                    //     .then(res => {
                    //       if (res.data.success) {
                    //         // console.log('Email sent successfully.')
                    //         this.toastText = "Nalaz uspješno poslan.";
                    //         this.toastIcon = "fa-check";
                    //         this.toastPosition = "top-right";
                    //         this.className = "vuestic-toast-primary";

                    //         this.showToast(this.toastText, {
                    //           icon: this.toastIcon,
                    //           position: this.toastPosition,
                    //           duration: 2500,
                    //           fullWidth: this.false,
                    //           className: this.className
                    //         });
                    //       } else {
                    //         this.toastText = "Greška prilikom slanja nalaza!";
                    //         this.toastIcon = "fa-remove";
                    //         this.toastPosition = "top-right";
                    //         this.className = "vuestic-toast-danger";

                    //         this.showToast(this.toastText, {
                    //           icon: this.toastIcon,
                    //           position: this.toastPosition,
                    //           duration: 2500,
                    //           fullWidth: this.false,
                    //           className: this.className
                    //         });
                    //       }
                    //     });
                    // } else if (res.data.IgE) {
                    //   // console.warn("IgE: " + res.data.IgE);
                    //   this.toastText = "IgE na nalazu.";
                    //   this.toastIcon = "fa-warning";
                    //   this.toastPosition = "top-right";
                    //   this.className = "vuestic-toast-warning";

                    //   this.showToast(this.toastText, {
                    //     icon: this.toastIcon,
                    //     position: this.toastPosition,
                    //     duration: 2500,
                    //     fullWidth: this.false,
                    //     className: this.className
                    //   });
                    // } else {
                    //   // console.log('Auto Mail Sender: ' + false)
                    // }
                  });
              } else {
                this.main = true;
              }
            });
        });
    },

    UnVerify(data) {
      this.verificiran = false;
      this.sid = data.sid;

      http
        .post("/rezultati/obrada/verifikacija/" + data.sid, {
          site: this.$store.state.site,
          token: this.$store.state.token,
          verify: false
        })
        .then(res => {
          http
            .get(
              "rezultati/odobravanje/samples/" +
                this.$route.params.patient +
                "/" +
                this.$route.params.id +
                "?token=" +
                this.$store.state.token +
                "&site=" +
                this.$store.state.site +
                "&date=" +
                this.$route.query.date,
              {}
            )
            .then(res => {
              this.final_pdf = res.data.final_pdf;

              this.count = res.data.results.length;
              this.approved = 0;

              this.odobren = true;
              this.verificiran = true;

              res.data.results.forEach(element => {
                if (
                  element.status === "ODOBREN" ||
                  element.status === "VERIFICIRAN"
                ) {
                  this.approved++;
                }
                if (
                  element.status != "ODOBREN" &&
                  element.status != "VERIFICIRAN"
                ) {
                  this.odobren = false;
                }
                if (!element.verificiran) {
                  this.verificiran = false;
                }
              });

              this.uzorci = [];

              res.data.results.forEach(element => {
                var check = 0;
                var zaprimljen = 0;
                var realizovan = 0;

                if (element.verificiran) {
                  var status_uzorka = "VERIFICIRAN";
                } else {
                  var status_uzorka = element.status;
                }

                element.rezultati.forEach(test => {
                  check++;

                  if (
                    test.rezultat[test.rezultat.length - 1].rezultat_f === ""
                  ) {
                    zaprimljen++;
                  }

                  if (
                    test.rezultat[test.rezultat.length - 1].rezultat_f != ""
                  ) {
                    realizovan++;
                  }

                  if (check === element.rezultati.length) {
                    if (status_uzorka === "VERIFICIRAN") {
                      this.uzorci.push({
                        sid: element.id,
                        status: "VERIFICIRAN",
                        pdf_exists: element.pdf_exists,
                        _id: element._id,
                        removed: false
                      });
                    } else if (status_uzorka === "ODOBREN") {
                      this.uzorci.push({
                        sid: element.id,
                        status: "ODOBREN",
                        pdf_exists: element.pdf_exists,
                        _id: element._id,
                        removed: false
                      });
                    } else if (zaprimljen < 1) {
                      this.uzorci.push({
                        sid: element.id,
                        status: "REALIZOVAN",
                        pdf_exists: element.pdf_exists,
                        _id: element._id,
                        removed: false
                      });
                    } else if (realizovan < 1) {
                      this.uzorci.push({
                        sid: element.id,
                        status: "ZAPRIMLJEN",
                        pdf_exists: element.pdf_exists,
                        _id: element._id,
                        removed: false
                      });
                    } else {
                      this.uzorci.push({
                        sid: element.id,
                        status: "U OBRADI",
                        pdf_exists: element.pdf_exists,
                        _id: element._id,
                        removed: false
                      });
                    }
                  }
                });
              });

              this.uzorci = this.uzorci.sort(function(a, b) {
                return a.sid.localeCompare(b.sid, undefined, {
                  numeric: true,
                  sensitivity: "base"
                });
              });

              if (!this.verificiran) {
                // console.log('Set Report Status: ' + false)
                http
                  .post("rezultati/nalazi/status", {
                    token: this.$store.state.token,
                    site: this.$store.state.site,
                    timestamp: this.timestamp,
                    location: "/",
                    naziv: this.timestamp,
                    status: false
                  })
                  .then(res => {
                    this.main = true;
                  });
              } else {
                this.main = true;
              }
            });
        });
    }
  }
};
</script>

<style lang="scss">
.collapse-page {
  &__content {
    padding: 2rem;
    &__title {
      font-size: 1.375rem;
      font-weight: bold;
    }
    &__description {
    }
  }
}

.icon-bar a {
  color: #fff;
  text-decoration: none;
}

.icon-bar a:hover {
  color: #4ae387;
}
</style>
