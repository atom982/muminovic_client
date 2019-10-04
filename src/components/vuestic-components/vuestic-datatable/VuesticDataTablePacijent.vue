<template>
  <div class="table-responsive">
    <div class="row">
      <div class="col-md-12">
        <div class="col-md-3 pull-left">
          <filter-bar @filter="onFilterSet"></filter-bar>
        </div>
        <div class="col-md-6">
          <button
            title="Unos novog pacijenta"
            class="btn btn-secondary-danger btn-micro pull-right"
            @click.prevent="unosPacijenta"
          >
            <span class="fa fa-user"></span>
            {{ ' Novi pacijent'}}
          </button>
        </div>
      </div>

      <vuestic-modal-patient
        :show.sync="show"
        v-bind:medium="true"
        ref="largeModalPatient"
        :okText="potvrdi"
        :cancelText="odustani"
      >
        <div slot="title">{{'Unos pacijenta'}}</div>
        <div class="form-elements">
          <div class="row">
            <div class="col-md-12"></div>
          </div>
        </div>
      </vuestic-modal-patient>
    </div>

    <div class="row">
      <div class="col-md-8">
        <vuetable
          ref="vuetable"
          :apiUrl="apiUrl"
          :apiMode="apiMode"
          :fields="tableFields"
          :data="tableData"
          :dataTotal="dataCount"
          :dataManager="dataManager"
          :css="css.table"
          data-path="data"
          v-bind:paginationPath="paginationPath"
          :appendParams="moreParams"
          :perPage="brStr"
          :datum="perPage"
          :token="token"
          :site="site"
          v-on:vuetable:cell-clicked="(...args)=>this.prikaziDetaljeM([args])"
          @vuetable:pagination-data="onPaginationData"
        ></vuetable>

        <div class="d-flex justify-content-center mb-4">
          <vuetable-pagination
            ref="pagination"
            :css="css.pagination"
            :onEachSide="onEachSide"
            @vuetable-pagination:change-page="onChangePage"
          ></vuetable-pagination>
        </div>
      </div>
      <div class="col-md-4">
        <div v-if="prikazi" class="row">
          <div class="col-md-12">
            <h5>
              {{header}}
              <span style="color: #e34a4a;">{{ime}} {{prezime}}</span>
            </h5>
            <br />

            <fieldset>
              <div class="row">
                <div class="col-md-12">
                  <div class="form-group with-icon-left">
                    <div class="input-group">
                      <input
                        id="input-icon-left"
                        title=" "
                        v-model="jmbg"
                        name="input-icon-left"
                        required
                      />
                      <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                      <label class="control-label" for="input-icon-left">{{'JMBG pacijenta'}}</label>
                      <i class="bar"></i>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-5">
                  <div class="form-group with-icon-left">
                    <div class="input-group">
                      <input
                        id="input-icon-left"
                        title=" "
                        v-model="ime"
                        name="input-icon-left"
                        required
                      />
                      <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                      <label class="control-label" for="input-icon-left">{{'Ime pacijenta'}}</label>
                      <i class="bar"></i>
                    </div>
                  </div>
                </div>
                <div class="col-md-7">
                  <div class="form-group with-icon-left">
                    <div class="input-group">
                      <input
                        id="input-icon-left"
                        title=" "
                        v-model="prezime"
                        name="input-icon-left"
                        required
                      />
                      <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                      <label class="control-label" for="input-icon-left">{{'Prezime pacijenta'}}</label>
                      <i class="bar"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-5">
                  <vuestic-simple-select
                    label="Spol pacijenta"
                    v-model="spol"
                    name="spol"
                    :required="true"
                    title=" "
                    ref="spolSelect"
                    v-bind:options="spolovi"
                  ></vuestic-simple-select>
                </div>
                <div class="col-md-7">
                  <!-- <vuestic-input-select
                    label="Mjesto stanovanja"
                    v-model="adresa"
                    v-bind:options="citiesList"
                  />-->
                  <vuestic-simple-select
                    label="Mjesto stanovanja"
                    v-model="adresa"
                    name="adresa"
                    :required="true"
                    title=" "
                    ref="adresaSelect"
                    v-bind:options="citiesList"
                  ></vuestic-simple-select>
                </div>
              </div>

              <!-- Konzumira duhan -->
              <!-- Dijabetes -->
              <div class="row">
                <div class="col-md-5">
                  <vuestic-simple-select
                    label="Konzumira duhan"
                    v-model="duhan"
                    name="duhan"
                    title=" "
                    ref="duhanSelect"
                    v-bind:options="duhani"
                  ></vuestic-simple-select>
                </div>
                <div class="col-md-7">
                  <vuestic-simple-select
                    label="Dijabetes"
                    v-model="dijabetes"
                    name="dijabetes"
                    title=" "
                    ref="dijabetesSelect"
                    v-bind:options="dijabetesi"
                  ></vuestic-simple-select>
                </div>
              </div>

              <div class="row">
                <div class="col-md-5">
                  <div class="form-group with-icon-left">
                    <div class="input-group">
                      <input
                        id="input-icon-left"
                        title=" "
                        v-model="telefon"
                        name="input-icon-left"
                        required
                      />
                      <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                      <label class="control-label" for="input-icon-left">{{'Kontakt telefon'}}</label>
                      <i class="bar"></i>
                    </div>
                  </div>
                </div>
                <div class="col-md-7">
                  <div class="form-group with-icon-left">
                    <div class="input-group">
                      <input
                        id="input-icon-left"
                        title=" "
                        v-model="email"
                        name="input-icon-left"
                        required
                      />
                      <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                      <label class="control-label" for="input-icon-left">{{'Email adresa'}}</label>
                      <i class="bar"></i>
                    </div>
                  </div>
                </div>
              </div>

              <button :disabled="edit" class="btn btn-sm btn-primary" @click.prevent="sacuvaj">
                <span class="fa fa-save"></span>
                {{ ' Sačuvaj'}}
              </button>
            </fieldset>
          </div>
        </div>

        <div v-if="false" class="table-responsive">
          <table class="table table-striped first-td-padding">
            <tbody>
              <tr>
                <td v-if="this.$store.state.site != '5bd40c16020d6d21bbaf610c'">
                  <div v-show="edit === false">
                    <label>
                      <strong>{{duhan}}</strong>
                    </label>
                  </div>
                  <select
                    class="table-info"
                    style="width:100%"
                    v-show="edit === true"
                    v-model="duhan"
                  >
                    <option value="NE">NE</option>
                    <option value="NEPOZNATO">NEPOZNATO</option>
                    <option value="DA">DA</option>
                  </select>
                </td>
                <td v-if="this.$store.state.site != '5bd40c16020d6d21bbaf610c'">
                  <div v-show="edit === false">
                    <label>
                      <strong>{{dijabetes}}</strong>
                    </label>
                  </div>
                  <select
                    class="table-info"
                    style="width:100%"
                    v-show="edit === true"
                    v-model="dijabetes"
                  >
                    <option value="NE">NE</option>
                    <option value="NEPOZNATO">NEPOZNATO</option>
                    <option value="DA">DA</option>
                  </select>
                </td>

                <td>
                  <button
                    v-if="uredi"
                    :title="'pacijenti.pregled.detalji.trnslr014' | translate"
                    class="btn btn-micro btn-info"
                    @click.prevent="Edit"
                  >
                    <!-- Uredite podatke o pacijentu -->
                    <span class="glyphicon glyphicon-edit"></span>
                    {{''}}
                  </button>
                  <button
                    v-if="!uredi"
                    :title="'pacijenti.pregled.detalji.trnslr015' | translate"
                    class="btn btn-micro btn-secondary"
                    @click.prevent="sacuvaj"
                  >
                    <!-- Sačuvajte izmjene -->
                    <span class="fa fa-save"></span>
                    {{''}}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-if="prikazi" class="row">
          <div class="col-md-12">
            <hr />
            <a @click="prikazi = false" href="#">{{'Sakrij detalje pacijenta'}}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vuetable from "vuetable-2/src/components/Vuetable";
import VuetablePagination from "vuetable-2/src/components/VuetablePagination";
import FilterBar from "./datatable-components/FilterBar.vue";
import ItemsPerPage from "./datatable-components/ItemsPerPage.vue";
import Vue from "vue";
import LocalData from "./data/local-data";
import DataTableStyles from "../../vuestic-components/vuestic-datatable/data/data-table-styles";
import router from "../../../router";
import { http } from "../../../../config/config.js";
import { bus } from "../../../../src/main.js";
const originalData = LocalData.data;

export default {
  name: "vuestic-data-table-pacijent",

  components: {
    FilterBar,
    Vuetable,
    VuetablePagination,
    ItemsPerPage
  },
  props: {
    site: {
      type: String
    },
    token: {
      type: String
    },
    sekcija: {
      type: String
    },
    apiUrl: {
      type: String
    },
    tableFields: {
      type: Array,
      required: true
    },
    itemsPerPage: {
      type: Array,
      required: true
    },
    onEachSide: {
      type: Number,
      default() {
        return 2;
      }
    },
    apiMode: {
      type: Boolean,
      default() {
        return true;
      }
    },
    data: {
      type: Array
    },
    sortFunctions: {
      type: Object
    },
    paginationPath: {
      type: String,
      default() {
        return "";
      }
    }
  },
  data() {
    return {
      prikazi: false,
      tableData: LocalData,
      perPage: "",
      brStr: 10,
      colorClasses: {},
      moreParams: {},
      dataCount: 0,
      css: DataTableStyles,
      pacijent: {},
      imaData: true,
      show: true,
      potvrdi: "SAČUVAJ",
      odustani: "ZATVORI",
      spolovi: ["MUŠKI", "ŽENSKI"],
      duhani: ["NE", "NEPOZNATO", "DA"],

      dijabetesi: ["NE", "NEPOZNATO", "DA"],
      pacijent: "",
      citiesList: [],
      header: "",
      id: "",
      jmbg: "",
      ime: "",
      prezime: "",
      spol: "",
      telefon: "",
      adresa: "",
      email: "",
      duhan: "",
      dijabetes: "",
      tmpJmbg: "",
      tmpIme: "",
      tmpPrezime: "",
      tmpSpol: "",
      tmpAdresa: "",
      tmpTelefon: "",
      tmpEmail: "",
      tmpDuhan: "",
      tmpDijabetes: "",
      edit: false,
      uslovispunjen: true,
      jmbgTmp: "",
      uredi: true,
      refresh_yes: true,

      toastText: "",
      toastIcon: "",
      toastPosition: "",
      toastDuration: 2500,
      isToastFullWidth: false,
      className: ""
    };
  },
  mounted() {
    this.dohvatiMjesta();
    bus.$on("PatientDetails", data => {
      this.pacijent = data;
      this.getPAtient();
    });

    bus.$on("tableData", data => {
      this.imaData = false;
    });
    this.onFilterSet(this.$store.state.filter);
  },
  beforeDestroy() {
    bus.$off("tableData");
    bus.$off("PatientDetails");
  },
  watch: {},
  methods: {
    Edit() {
      this.edit = true;
      this.uredi = false;
    },
    refresh() {
      if (this.refresh_yes) {
        http
          .get(
            "pacijenti/detalji/" +
              this.pacijent +
              "?token=" +
              this.$store.state.token +
              "&site=" +
              this.$store.state.site,
            {}
          )
          .then(res => {
            if (res.data.pacijent.jmbg != undefined) {
              // Pregled detalja za pacijenta:
              this.header = "Pregled detalja pacijenta: ";

              this.id = res.data.pacijent._id;
              this.jmbg = res.data.pacijent.jmbg;
              this.jmbgTmp = res.data.pacijent.jmbg;
              this.ime = res.data.pacijent.ime;
              this.prezime = res.data.pacijent.prezime;
              this.adresa = res.data.pacijent.adresa;
              this.spol = res.data.pacijent.spol;
              this.duhan = res.data.pacijent.duhan;
              this.dijabetes = res.data.pacijent.dijabetes;
              this.telefon = res.data.pacijent.telefon;
              this.email = res.data.pacijent.email;

              this.tmpJmbg = res.data.pacijent.jmbg;
              this.tmpIme = res.data.pacijent.ime;
              this.tmpPrezime = res.data.pacijent.prezime;
              this.tmpSpol = res.data.pacijent.spol;
              this.tmpAdresa = res.data.pacijent.adresa;
              this.tmpTelefon = res.data.pacijent.telefon;
              this.tmpEmail = res.data.pacijent.email;
              this.tmpDuhan = res.data.pacijent.duhan;
              this.tmpDijabetes = res.data.pacijent.dijabetes;
            }
          });
      }
    },
    validateEmail: function(mail) {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        return true;
      } else {
        return false;
      }
    },
    validatePhone: function(telefon) {
      // if (/^\d{9}$/.test(String(telefon)) || /^\d{10}$/.test(String(telefon)) || /^[0]{2}[3]{1}[8]{1}[7]{1}\d{8}$/.test(String(telefon)) || /^[0]{2}[3]{1}[8]{1}[7]{1}\d{9}$/.test(String(telefon)) || /^[+]{1}[3]{1}[8]{1}[7]{1}\d{8}$/.test(String(telefon)) || /^[+]{1}[3]{1}[8]{1}[7]{1}\d{9}$/.test(String(telefon))) {
      //   return (true)
      // } else {
      //   return (false)
      // }
      // console.log('Validacija telefonskog broja.')
      return true;
    },
    vratiPregled: function() {
      router.push("/prijem/");
    },
    jmbgValidate(jmbg) {
      return (
        /^\d{4}[9,0]{1}\d{8}$/.test(String(jmbg)) ||
        /^\d{4}[9,0]{1}\d{7}[P]{1}$/.test(String(jmbg))
      );
    },
    sacuvaj() {
      this.uslovispunjen = true;
      var item = true;

      if (
        this.jmbg.trim() === this.tmpJmbg &&
        this.adresa.trim() === this.tmpAdresa &&
        this.ime.trim() === this.tmpIme &&
        this.prezime.trim() === this.tmpPrezime &&
        this.spol.trim() === this.tmpSpol &&
        this.telefon.trim() === this.tmpTelefon &&
        this.email.trim() === this.tmpEmail &&
        this.duhan.trim() === this.tmpDuhan &&
        this.dijabetes.trim() === this.tmpDijabetes
      ) {
        item = false;
        this.uredi = true;
        this.edit = false;
        setTimeout(() => {
          this.refresh();
        }, 3000);
      } else if (
        this.jmbg.trim() === "" ||
        this.ime.trim() === "" ||
        this.prezime.trim() === "" ||
        this.spol.trim() === ""
      ) {
        item = false;
        this.toastText = this.$t("pacijenti.pregled.detalji.trnslr018"); // Vrijednost polja je obavezna!
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
        setTimeout(() => {
          this.refresh();
        }, 3000);
      } else if (!this.jmbgValidate(this.jmbg)) {
        item = false;
        this.toastText = this.$t("pacijenti.pregled.detalji.trnslr019"); // JMBG mora biti validan 13 cifreni broj!
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
        setTimeout(() => {
          this.refresh();
        }, 3000);
      } else if (
        this.email.trim() != "" &&
        this.email.trim() != "NEPOZNATO" &&
        !this.validateEmail(this.email)
      ) {
        item = false;
        this.toastText = this.$t("pacijenti.pregled.detalji.trnslr020"); // Email adresa nije validna!
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
        setTimeout(() => {
          this.refresh();
        }, 3000);
      } else if (
        this.telefon.trim() != "" &&
        this.telefon.trim() != "NEPOZNATO" &&
        !this.validatePhone(this.telefon)
      ) {
        item = false;
        this.toastText = this.$t("pacijenti.pregled.detalji.trnslr021"); // Telefonski broj nije validan!
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
        setTimeout(() => {
          this.refresh();
        }, 3000);
      } else if (
        this.spol.toUpperCase().trim() != "MUŠKI" &&
        this.spol.toUpperCase().trim() != "ŽENSKI"
      ) {
        item = false;
        this.toastText = this.$t("pacijenti.pregled.detalji.trnslr022"); // Spol može biti MUŠKI ili ŽENSKI!
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
        setTimeout(() => {
          this.refresh();
        }, 3000);
      } else if (this.duhan.trim() != "" && this.duhan.trim() != "NEPOZNATO") {
        if (
          this.duhan.toUpperCase().trim() != "DA" &&
          this.duhan.toUpperCase().trim() != "NE"
        ) {
          item = false;
          this.toastText = this.$t("pacijenti.pregled.detalji.trnslr023"); // Vrijednost polja PUŠAČ može biti DA ili NE!
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
          setTimeout(() => {
            this.refresh();
          }, 3000);
        }
      }

      if (this.dijabetes.trim() != "" && this.dijabetes.trim() != "NEPOZNATO") {
        if (
          this.dijabetes.toUpperCase().trim() != "DA" &&
          this.dijabetes.toUpperCase().trim() != "NE"
        ) {
          item = false;
          this.toastText = this.$t("pacijenti.pregled.detalji.trnslr024"); // Vrijednost polja DIJABETES može biti DA ili NE!
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
          setTimeout(() => {
            this.refresh();
          }, 3000);
        }
      }

      if (item) {
        http
          .post("pacijenti/unos/find", {
            jmbg: this.jmbg,
            token: this.$store.state.token,
            site: this.$store.state.site
          })
          .then(res => {
            if (this.jmbgTmp != this.jmbg) {
              if (res.data.message === "Pacijent postoji") {
                this.toastText = this.$t("pacijenti.pregled.detalji.trnslr025"); // Pacijent sa unesenim JMBG, već postoji u sistemu!
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
                this.uslovispunjen = false;
                setTimeout(() => {
                  this.refresh();
                }, 3000);
              } else {
              }
            }
          })
          .then(res => {
            if (this.duhan.trim() === "") {
              this.duhan = "NEPOZNATO";
            }
            if (this.dijabetes.trim() === "") {
              this.dijabetes = "NEPOZNATO";
            }
            if (this.telefon.trim() === "") {
              this.telefon = "NEPOZNATO";
            }
            if (this.email.trim() === "") {
              this.email = "NEPOZNATO";
            }

            if (this.uslovispunjen) {
              http
                .post("pacijenti/detalji/update/" + this.pacijent, {
                  id: this.id.trim(),
                  jmbg: this.jmbg.trim(),
                  ime: this.ime.toUpperCase().trim(),
                  prezime: this.prezime.toUpperCase().trim(),
                  spol: this.spol.toUpperCase().trim(),
                  adresa: this.adresa.trim(),
                  duhan: this.duhan.toUpperCase().trim(),
                  dijabetes: this.dijabetes.toUpperCase().trim(),
                  telefon: this.telefon.trim(),
                  email: this.email.trim(),
                  token: this.$store.state.token,
                  site: this.$store.state.site
                })
                .then(res => {
                  if (res.data.success === false) {
                    this.toastText = this.$t(
                      "pacijenti.pregled.detalji.trnslr026"
                    ); // Greška prilikom upisa!
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
                  } else {
                    Vue.nextTick(() => this.$refs.vuetable.refresh());
                    // this.onFilterSet("");
                    this.toastText = "Izmjena uspješno obavljena.";
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

                    setTimeout(() => {
                      this.refresh();
                    }, 3000);

                    this.uredi = true;
                    this.edit = false;
                  }
                });
            }
          });
      }
    },
    dohvatiMjesta: function() {
      http
        .post("/postavke/sajtovi/" + this.$store.state.site, {
          token: this.$store.state.token
        })
        .then(res => {
          if (res.data.sajt.mjesta != undefined) {
            this.citiesList = res.data.sajt.mjesta.sort(function(a, b) {
              return a.toLowerCase() == b.toLowerCase()
                ? 0
                : +(a.toLowerCase() > b.toLowerCase()) || -1;
            });
          }
        })
        .then(res => {});
    },
    getPAtient() {
      http
        .get(
          "pacijenti/detalji/" +
            this.pacijent +
            "?token=" +
            this.$store.state.token +
            "&site=" +
            this.$store.state.site,
          {}
        )
        .then(res => {
          // console.log(res.data)
          if (res.data.pacijent.jmbg != undefined) {
            // Pregled detalja za pacijenta:
            this.header = "Pregled detalja pacijenta: ";

            this.id = res.data.pacijent._id;
            this.jmbg = res.data.pacijent.jmbg;
            this.jmbgTmp = res.data.pacijent.jmbg;
            this.ime = res.data.pacijent.ime;
            this.prezime = res.data.pacijent.prezime;
            this.adresa = res.data.pacijent.adresa;
            this.spol = res.data.pacijent.spol;
            this.duhan = res.data.pacijent.duhan;
            this.dijabetes = res.data.pacijent.dijabetes;
            this.telefon = res.data.pacijent.telefon;
            this.email = res.data.pacijent.email;

            this.tmpJmbg = res.data.pacijent.jmbg;
            this.tmpIme = res.data.pacijent.ime;
            this.tmpPrezime = res.data.pacijent.prezime;
            this.tmpSpol = res.data.pacijent.spol;
            this.tmpAdresa = res.data.pacijent.adresa;
            this.tmpTelefon = res.data.pacijent.telefon;
            this.tmpEmail = res.data.pacijent.email;
            this.tmpDuhan = res.data.pacijent.duhan;
            this.tmpDijabetes = res.data.pacijent.dijabetes;
            this.prikazi = true;
          }
        });
    },
    unosPacijenta() {
      this.$refs.largeModalPatient.open();
    },
    notice(type, text, desc) {
      this.$notice[type]({
        title: text,
        description: desc,
        closable: false,
        styles: {
          width: "500px",
          marginLeft: "-195px"
        },
        duration: 2.0
      });
    },
    prikaziDetalje: function(event) {
      http
        .post("pacijenti/unos/findid", {
          id: event.target.id,
          token: this.$store.state.token,
          site: this.$store.state.site
        })
        .then(res => {
          if (res.data.message === "Pacijent postoji") {
            this.pacijent = res.data.pacijent;
          } else {
          }
        })
        .then(res => {
          bus.$emit("emitime", this.pacijent);
        });
    },
    prikaziDetaljeM: function(args) {
      var niz = args[0];
      if (
        args[0][2].srcElement.cellIndex === undefined &&
        !args[0][2].srcElement.classList.contains("disabled")
      ) {
        if (niz[1].name === "akcija") {
          bus.$emit("PatientDetails", niz[0].id);

          // router.push('/pacijenti/detalji/' + niz[0].id)
        }
        if (niz[1].name === "prijem") {
          router.push("/samples/entry/" + args[0][0].id);
        }
        if (niz[1].name === "badge") {
          router.push("/samples/entry/" + args[0][0].id);
        }
      }
    },
    onFilterSet(filterText) {
      this.imaData = true;

      this.filterString = "";

      this.filterString = filterText;

      if (event != undefined && filterText.trim() != "") {
        if (event.keyCode == 13) {
          if (this.apiMode) {
            this.moreParams = {
              filter: filterText
            };
          } else {
            const txt = new RegExp(filterText, "i");
            this.tableData.data = originalData.filter(function(item) {
              return item.name.search(txt) >= 0 || item.email.search(txt) >= 0;
            });
          }

          Vue.nextTick(() => this.$refs.vuetable.refresh());
        } else {
          // console.warn("Waiting for Enter.");
        }
      } else {
        if (this.apiMode) {
          this.moreParams = {
            filter: filterText
          };
        } else {
          const txt = new RegExp(filterText, "i");
          this.tableData.data = originalData.filter(function(item) {
            return item.name.search(txt) >= 0 || item.email.search(txt) >= 0;
          });
        }
        Vue.nextTick(() => this.$refs.vuetable.refresh());
      }
    },
    onItemsPerPage(itemsPerPageValue) {
      this.imaData = true;
      this.perPage = itemsPerPageValue;
      Vue.nextTick(() => this.$refs.vuetable.refresh());
    },
    onPaginationData(paginationData) {
      this.$refs.pagination.setPaginationData(paginationData);
    },
    onChangePage(page) {
      this.$refs.vuetable.changePage(page);
    },
    dataManager(sortOrder, pagination) {
      let data = this.tableData.data;
      let sortFunctions = this.sortFunctions;

      if (sortOrder.length > 0) {
        data.sort(function(item1, item2) {
          const sortField = sortOrder[0].sortField;
          let fn = sortFunctions[sortField];
          if (fn) {
            return fn(item1[sortField], item2[sortField]);
          }
        });

        if (sortOrder[0].direction === "desc") {
          data.reverse();
        }
      }

      pagination = this.$refs.vuetable.makePagination(data.length);

      return {
        pagination: pagination,
        data: data.slice(pagination.from - 1, pagination.to)
      };
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../sass/variables";
@import "../../../sass/toasts";

@media (max-width: 1258px) {
  .pagination-link-btn:first-child,
  .pagination-link-btn:last-child {
    display: none;
  }
  .pagination-link-btn:nth-child(2) {
    border-top-left-radius: $btn-border-radius !important;
    border-bottom-left-radius: $btn-border-radius !important;
  }
  .pagination-link-btn:nth-last-child(2) {
    border-top-right-radius: $btn-border-radius !important;
    border-bottom-right-radius: $btn-border-radius !important;
  }
}

@media (max-width: 576px) {
  .hide-not-focused-btn:not(.focus) {
    display: none;
  }
}

.btn.btn-info {
  text-transform: none;
}
</style>
