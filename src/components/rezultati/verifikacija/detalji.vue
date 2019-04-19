<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <!-- Rezultat za uzorak: U001C81114 -->
        <vuestic-widget v-if="main" :headerText="header">
          <vuestic-accordion>
            <vuestic-collapse
              v-for="uzorak in uzorci"
              :key="uzorak.sid"
              :id="uzorak.sid"
              :ide="uzorak._id"
            >
              <span slot="header" :id="uzorak.status">{{ uzorak.sid }}</span>
              <div v-if="loaded" slot="body">
                <div v-if="false" class="row">
                  <div class="col-md-3"></div>
                  <div class="col-md-3"></div>
                  <div class="col-md-6">
                    <div style="line-height: 10px;">&nbsp</div>

                    <div class="btn-container">
                      <button
                        v-if="!verificiran"
                        class="btn btn-info btn-sm sq wizard-back pull-left"
                        @click.prevent="odobriRezultate(rezultati)"
                      >
                        <span class="fa fa-check-square-o"></span>
                        {{ 'ODOBRITE' }}
                      </button>
                      
                      <button
                        v-if="verificiran"
                        class="btn btn-primary btn-sm sq wizard-back pull-left"
                        @click.prevent="ukloniOdobrenje(rezultati)"
                      >
                        <span class="fa fa-undo"></span>
                        {{ ' ODOBREN '}}
                      </button>
                      
                      <button
                        v-if="!odobren"
                        class="btn btn-primary sq btn-sm wizard-back pull-right"
                        @click.prevent="sacuvajRezultate(rezultati)"
                      >
                        <span class="fa fa-save"></span>
                        {{ ' SACUVAJ'}}
                      </button>
                    </div>

                    <div style="line-height: 10px;">&nbsp</div>
                  </div>
                </div>

                <div style="line-height: 10px;">&nbsp</div>
                <div class="table-responsive">
                  <table class="table table-striped first-td-padding">
                    <thead>
                      <tr align="middle">
                        <td v-if="$store.state.userId === 'admin@atom.ba'"></td>
                        <td>ANALIZA</td>
                        <td>REZULTAT</td>
                        <td>JEDINICA</td>
                        <td>REFERENCE</td>
                        <td v-if="!verificiran && calculated">AKCIJA</td>
                        <td v-if="!verificiran">PONOVI</td>
                        <td></td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        align="middle"
                        v-for="test in rezultati"
                        v-bind:class="{
                          'table-danger': testBezAnalita(test.analit, test.rezultat, test.unit, test.dRef, test.gRef, $store.state.site)[5] === 'Red' && !test.multidata, 
                          'table-success': testBezAnalita(test.analit, test.rezultat, test.unit, test.dRef, test.gRef, $store.state.site)[5] === 'Green' && !test.multidata,
                          'table-warning': testBezAnalita(test.analit, test.rezultat, test.unit, test.dRef, test.gRef, $store.state.site)[5] === 'Yellow' && !test.multidata
                        }"
                      >
                        <td v-if="$store.state.userId === 'admin@atom.ba' && test.calculated">
                          <strong>{{'c'}}</strong>
                        </td>
                        <td v-if="$store.state.userId === 'admin@atom.ba' && test.manual">
                          <strong>{{'m'}}</strong>
                        </td>
                        <td
                          v-if="$store.state.userId === 'admin@atom.ba' && !test.calculated && !test.manual"
                        >
                          <strong>{{'a'}}</strong>
                        </td>
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
                              <option v-for="option in test.select_options">{{ option }}</option>
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
                            title="Pregled rezultata"
                            class="btn btn-primary btn-micro sq"
                            @click.prevent="prikazAnalita($event, test.ime, test.analit, test.rezultat, sid, test.odobren)"
                          >
                            <span
                              :id="test.labassay_id"
                              @click.prevent="prikazAnalita($event, test.ime, test.analit, test.rezultat, id, test.odobren)"
                              class="glyphicon glyphicon-search"
                            ></span> VIŠE
                          </button>
                        </td>
                        <td v-if="test.multidata && !test.realizovan">
                          <button
                            :id="test.labassay_id"
                            title="Pregled rezultata"
                            class="btn btn-warning btn-micro sq"
                            @click.prevent="prikazAnalita($event, test.ime, test.analit, test.rezultat, sid, test.odobren)"
                          >
                            <span
                              :id="test.labassay_id"
                              @click.prevent="prikazAnalita($event, test.ime, test.analit, test.rezultat, id, test.odobren)"
                              class="glyphicon glyphicon-search"
                            ></span> VIŠE
                          </button>
                        </td>

                        <!-- JEDINICA -->
                        <td>{{test.unit}}</td>
                        <!-- REFERENCE -->
                        <td
                          v-if="!test.multidata"
                        >{{testBezAnalita(test.analit, test.rezultat, test.unit, test.dRef, test.gRef, $store.state.site)[4]}}</td>
                        <td v-if="test.multidata">{{'/'}}</td>
                        <!-- AKCIJA -->
                        <td v-if="!verificiran && calculated && !test.calculated">
                          <button title="Operacija nije dozvoljena" class="btn btn-pale btn-micro">
                            <span class="glyphicon glyphicon-ban-circle"></span>
                          </button>
                        </td>
                        <td v-if="!verificiran && calculated && test.calculated">
                          <button
                            @click.prevent="calculate($event, sid, test.labassay_id, test.ime, test.id)"
                            title="Izračunaj rezultat"
                            :id="test.test"
                            class="btn btn-primary btn-micro"
                          >
                            <span :id="test.test" class="fa fa-calculator"></span>
                          </button>
                        </td>

                        <!-- PONOVI -->
                        <td
                          v-if="!test.multidata && !verificiran && !test.manual && !test.calculated && test.rezultat != ''"
                        >
                          <button
                            v-if="!test.retest"
                            title="Aktiviraj ponovno analiziranje"
                            :id="test.test"
                            class="btn btn-primary btn-micro"
                            @click.prevent="retestDa($event, id)"
                          >
                            <span :id="test.test" class="fa fa-refresh"></span>
                          </button>
                          <button
                            v-if="test.retest"
                            title="Deaktiviraj ponovno analiziranje"
                            :id="test.test"
                            class="btn btn-info btn-micro"
                            @click.prevent="retestNe($event, id)"
                          >
                            <span :id="test.test" class="glyphicon glyphicon-duplicate"></span>
                          </button>
                        </td>
                        <td
                          v-if="!test.multidata && !verificiran && !test.manual && !test.calculated && test.rezultat === ''"
                        >
                          <button title="Operacija nije dozvoljena" class="btn btn-pale btn-micro">
                            <span class="glyphicon glyphicon-ban-circle"></span>
                          </button>
                        </td>
                        <td
                          v-if="test.multidata && !verificiran && !test.manual && !test.calculated && test.realizovan"
                        >
                          <button
                            v-if="!test.retest"
                            title="Aktiviraj ponovno analiziranje"
                            :id="test.test"
                            class="btn btn-primary btn-micro"
                            @click.prevent="retestDa($event, id)"
                          >
                            <span :id="test.test" class="fa fa-refresh"></span>
                          </button>
                          <button
                            v-if="test.retest"
                            title="Deaktiviraj ponovno analiziranje"
                            :id="test.test"
                            class="btn btn-info btn-micro"
                            @click.prevent="retestNe($event, id)"
                          >
                            <span :id="test.test" class="glyphicon glyphicon-duplicate"></span>
                          </button>
                        </td>
                        <td
                          v-if="test.multidata && !verificiran && !test.manual && !test.calculated && !test.realizovan"
                        >
                          <button title="Operacija nije dozvoljena" class="btn btn-pale btn-micro">
                            <span class="glyphicon glyphicon-ban-circle"></span>
                          </button>
                        </td>
                        <td v-if="!verificiran && (test.calculated || test.manual)">
                          <button title="Operacija nije dozvoljena" class="btn btn-pale btn-micro">
                            <span class="glyphicon glyphicon-ban-circle"></span>
                          </button>
                        </td>
                        <!--  -->
                        <td>
                          <i
                            v-bind:class="{'fa fa-exclamation-triangle icon-right input-icon error-icon' : testBezAnalita(test.analit, test.rezultat, test.unit, test.dRef, test.gRef, $store.state.site)[5] === 'Red' && !test.multidata}"
                          ></i>
                          <i
                            v-bind:class="{'fa fa-check success-icon icon-right input-icon' : testBezAnalita(test.analit, test.rezultat, test.unit, test.dRef, test.gRef, $store.state.site)[5] === 'Green' && !test.multidata}"
                          ></i>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </vuestic-collapse>
          </vuestic-accordion>
          <vuestic-alert
            v-if="alertNalaz"
            type="warning"
            :withCloseBtn="true"
            style="margin-top: 25px;"
          >
            <!-- style="color: #4ab2e3;"  -->
            <button class="btn btn-warning btn-sm" @click="nalazPrint($event)">
              <span class="fa fa-file-pdf-o fa-lg"></span>
              {{'Nalaz'}}
            </button>
            
            <sup></sup>
            <strong>&nbsp&nbsp&nbsp{{'NALAZ SPREMAN ZA VERIFIKACIJU'}}</strong>
          </vuestic-alert>

          <div>
            <hr>
          </div>

          <div class="row">
            <div class="col-md-3"></div>
            <div class="col-md-6">
              <div class="btn-container">
                <button
                  class="btn btn-secondary btn-sm wizard-back pull-left"
                  @click.prevent="vratiPregled"
                >
                  <span class="fa fa-backward"></span>
                  {{ ' POVRATAK'}}
                </button>
              </div>
            </div>
          </div>
        </vuestic-widget>
        <!-- End of Rezultat za uzorak: U001C81114 -->
        <!-- Prikaz analita -->
        <vuestic-modal
          :show.sync="show"
          v-bind:large="true"
          ref="largeModalPrikazAnalita"
          :okText="potvrdi"
          :cancelText="odustani"
        >
          <div slot="title">{{naslov}}</div>
          <div class="table-responsive">
            <table class="table table-striped first-td-padding">
              <thead>
                <tr align="middle">
                  <td></td>
                  <td>ANALIT</td>
                  <td>REZULTAT</td>
                  <td>JEDINICA</td>
                  <td>REFERENCE</td>
                  <td></td>
                </tr>
              </thead>
              <tbody>
                <tr
                  align="middle"
                  v-for="test in analiti"
                  v-bind:class="{
                    'table-danger': testSaAnalitima(test.izbor, test.opis, test.rezultat, test.jedinica, test.refd, test.refg, $store.state.site )[5] === 'Red', 
                    'table-success': testSaAnalitima(test.izbor, test.opis, test.rezultat, test.jedinica, test.refd, test.refg, $store.state.site )[5] === 'Green', 
                    'table-warning': testSaAnalitima(test.izbor, test.opis, test.rezultat, test.jedinica, test.refd, test.refg, $store.state.site )[5] === 'Yellow'                         
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
                      style="width:120px;"
                      v-show="test.edit == true"
                      v-model="test.rezultat"
                    >
                      <option v-for="option in test.select_options">{{ option }}</option>
                    </select>
                    <input
                      v-if="test.select_options === undefined"
                      style="width:120px;"
                      v-show="test.edit == true"
                      v-model="test.rezultat"
                    >
                  </td>
                  <td>{{testSaAnalitima(test.izbor, test.opis, test.rezultat, test.jedinica, test.refd, test.refg, $store.state.site)[3]}}</td>
                  <td>{{testSaAnalitima(test.izbor, test.opis, test.rezultat, test.jedinica, test.refd, test.refg, $store.state.site)[4]}}</td>
                  <td>
                    <i
                      v-bind:class="{'fa fa-exclamation-triangle icon-right input-icon error-icon' : testSaAnalitima(test.izbor, test.opis, test.rezultat, test.jedinica, test.refd, test.refg, $store.state.site )[5] === 'Red'}"
                    ></i>
                    <i
                      v-bind:class="{'fa fa-check success-icon icon-right input-icon' : testSaAnalitima(test.izbor, test.opis, test.rezultat, test.jedinica, test.refd, test.refg, $store.state.site )[5] === 'Green'}"
                    ></i>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </vuestic-modal>
        <!-- End of Prikaz analita -->
        <!-- vuestic-modal-barcode -->
        <vuestic-modal-barcode
          :show.sync="showBarcode"
          :sid="sid"
          v-bind:small="false"
          v-bind:force="true"
          ref="staticModalBarcode"
          cancelText="ZATVORI"
          okText="ISPIS"
        >
          <div slot="title">{{ 'Printanje naljepnice za uzorak: ' + sid }}</div>
          <div>
            <!-- {{'Opcija trenutno nije dostupna.'}} -->
          </div>
        </vuestic-modal-barcode>

        <!-- vuestic-modal-trash -->
        <vuestic-modal-trash
          :show.sync="showTrash"
          :sid="sid"
          v-bind:small="false"
          v-bind:force="true"
          ref="staticModalTrash"
          cancelText="ODUSTANI"
          okText="POTVRDI"
        >
          <div slot="title">{{'Brisanje uzorka: ' + sid }}</div>
          <div>
            <!-- {{'Opcija trenutno nije dostupna.'}} -->
            <div id="AlertDiv">
              <h5>Jeste li sigurni da želite obrisati uzorak?</h5>
            </div>
          </div>
        </vuestic-modal-trash>

        <!-- <vuestic-modal-trash v-if="$store.state.userId != 'admin@atom.ba'" :show.sync="showTrash" :sid="sid" v-bind:small="false" v-bind:force="true" ref="staticModalTrash" :cancelClass="'none'" okText="ZATVORI">
  

        </vuestic-modal-trash>
        -->
        <!-- vuestic-modal-commenting -->
        <vuestic-modal-commenting
          :show.sync="showCommenting"
          :sid="sid"
          v-bind:small="false"
          v-bind:force="true"
          ref="staticModalCommenting"
          cancelText="ZATVORI"
          okText="SAČUVAJ"
        >
          <div slot="title">{{ 'Unos komentara za uzorak: ' + sid }}</div>
        </vuestic-modal-commenting>

        <!-- vuestic-modal-plus -->
        <vuestic-modal-plus
          :show.sync="showPlus"
          :sid="sid"
          v-bind:small="false"
          v-bind:force="true"
          ref="staticModalPlus"
          cancelText="ZATVORI"
          okText="SAČUVAJ"
        >
          <div slot="title">{{'Uređivanje uzorka: ' + sid }}</div>
          <div>
            <!-- {{'Opcija trenutno nije dostupna.'}} -->
          </div>
        </vuestic-modal-plus>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import router from "../../../router";
import { http } from "../../../../config/config.js";
import { barcode } from "../../../../config/config.js";
import { bus } from "../../../main";
import { ispisAnalitNe } from "../../funkcije/shared/references.js";
import { ispisAnalitDa } from "../../funkcije/shared/references.js";
import c_izbornik from "../../../data/c_izbornik";
import m_izbornik from "../../../data/m_izbornik";
import p_izbornik from "../../../data/p_izbornik";
import bhs_izbornik from "../../../data/bhs_izbornik";

export default {
  name: "Table",

  data() {
    return {
      show: true,
      showPlus: true,
      showCommenting: true,
      showBarcode: true,
      showTrash: true,
      main: false,
      potvrdi: "!SHOW", // Do not Change
      odustani: "ZATVORI",
      loaded: false,
      tempAnalit: "",
      testovi: [],
      pacijent: "",
      rezultati: [],
      naslov: "",
      header: "",
      verificiran: true,
      odobren: false,
      analitiprikaz: [],
      analiti: [],
      calculated: false,
      pid: "",
      uzorci: [],
      sid: "",
      klik: false,
      alertNalaz: false,
      nalazParams: {}
    };
  },
  mounted() {
    bus.$on("Save", () => {
      this.sacuvajRezultate(this.rezultati);
    });

    bus.$on("Undo", () => {
      this.ukloniOdobrenje(this.rezultati);
    });

    bus.$on("Check", () => {
      this.odobriRezultate(this.rezultati);
    });

    bus.$on("Trash", () => {
      this.$refs.staticModalTrash.open();
    });

    bus.$on("Plus", () => {
      this.$refs.staticModalPlus.open();
    });

    bus.$on("Commenting", () => {
      this.$refs.staticModalCommenting.open();
    });

    bus.$on("Barcode", () => {
      //this.$refs.staticModalBarcode.open()
      this.printajBarcode();
    });

    bus.$on("sacuvajAnalite", () => {
      this.sacuvajMulti(this.analiti);
    });

    bus.$on("OdaberiUzorak", data => {
      // Klik na SID Slot

      this.potvrdi = "!SHOW"; // Do not Change
      this.odustani = "ZATVORI";
      this.loaded = false;
      this.sid = "";
      this.rezultati = [];
      this.testovi = [];
      this.verificiran = true;
      this.odobren = false;
      this.calculated = false;
      this.$store.dispatch("setSID", data);
      this.sid = data;

      var topcije = null;
      switch (this.$store.state.site) {
        case "5b6caf696a0f4166f4da989b": // Čarovac Lab, $store.state.site: 5b6caf696a0f4166f4da989b
          topcije = c_izbornik.rez;
          break;
        case "5bc71402bf21a379083d6e07": // Med Lab, $store.state.site: 5bc71402bf21a379083d6e07
          topcije = m_izbornik.rez;
          break;
        case "5bd40c16020d6d21bbaf610c": // PZU Muminović, $store.state.site: 5bd40c16020d6d21bbaf610c
          topcije = p_izbornik.rez;
          break;
        case "5c69f68c338fe912f99f833b": // BIH MEDICINSKI LABORATORIJ (Sarajevo - Stup), $store.state.site: 5c69f68c338fe912f99f833b
          topcije = bhs_izbornik.rez;
          break;
      }

      http
        .get(
          "rezultati/showsingle/" +
            data +
            "?token=" +
            this.$store.state.token +
            "&site=" +
            this.$store.state.site,
          {}
        )
        .then(res => {
          this.pacijent = res.data.ime + " " + res.data.prezime + " ";
          this.header = "Odobravanje rezultata za pacijenta: " + this.pacijent;
          this.pid = res.data.pid;
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

              // if (element.testovi.labassay.multi) {
              //   res.data.multidata.forEach(multi => {
              //     if (multi.labassay._id === element.testovi.labassay._id) {
              //       multi.rezultat.forEach(rezu => {
              //         rezu.rezultat.forEach(ana => {
              //           if (ana.rezultat_f != "") {
              //             test.realizovan = true
              //           }
              //         })
              //       })
              //     }
              //   })
              // }

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
                    // .replace(/[0-9]/g, "_")
                    .replace(/^\d+/, "")
              );
              element.testovi.rezultat.forEach(rezultat => {
                test.sekcija = rezultat.anaassay.sekcija;
                test.rezultat = rezultat.rezultat_f;

                // if (!element.testovi.labassay.multi) {
                if (rezultat.rezultat_f != "") {
                  test.realizovan = true;
                }
                // }

                test.unit = rezultat.jedinice_f;
                if (rezultat.odobren) {
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
              if (element.odobren != "ODOBREN") {
                this.verificiran = false;
                this.potvrdi = "SAČUVAJ";
              }
              if (element.calculated) {
                this.calculated = true;
              }
            });

            if (this.verificiran === false) {
              this.odobren = false;
            } else {
              this.odobren = true;
            }

            this.main = true;
            this.loaded = true;
          }
        })
        .then(() => {
          bus.$emit("SetClientHeight", data); // clientHeight, VuesticCollapse.vue
        });
    });

    bus.$on("showPlusRefresh", () => {
      this.klik = true;
      document.getElementById(this.sid).click();
      this.refresh();
    });

    bus.$on("showTrashRefresh", () => {
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
          // console.log(res.data);
          this.uzorci = [];
          // this.header = 'Odobravanje rezultata za pacijenta: ' + res.data.results[0].patient.ime + ' ' + res.data.results[0].patient.prezime
          if (res.data.results != undefined) {
            res.data.results.forEach(element => {
              var uslov = 0;
              var zaprimljen = 0;
              var realizovan = 0;
              var status_uzorka = element.status;

              element.rezultati.forEach(test => {
                // console.log(test.rezultat[test.rezultat.length - 1].rezultat_f)
                uslov++;
                if (test.rezultat[test.rezultat.length - 1].rezultat_f === "") {
                  zaprimljen++;
                }
                if (test.rezultat[test.rezultat.length - 1].rezultat_f != "") {
                  realizovan++;
                }

                if (uslov === element.rezultati.length) {
                  if (status_uzorka === "ODOBREN") {
                    this.uzorci.push({
                      sid: element.id,
                      status: "ODOBREN",
                      _id: element._id
                    });
                  } else if (zaprimljen < 1) {
                    this.uzorci.push({
                      sid: element.id,
                      status: "REALIZOVAN",
                      _id: element._id
                    });
                  } else if (realizovan < 1) {
                    this.uzorci.push({
                      sid: element.id,
                      status: "ZAPRIMLJEN",
                      _id: element._id
                    });
                  } else {
                    this.uzorci.push({
                      sid: element.id,
                      status: "U OBRADI",
                      _id: element._id
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
          } else {
            router.push("/rezultati/verifikacija/" + "?sekcija=" + "SVE");
          }
        });
    });

    bus.$on("File", data => {
      router.push(
        "/nalazi/verifikacija/" + this.nalazParams.patient + "?uzorci=" + data
      );
      // Back to: 'rezultati/verifikacija/5c7a4be07c196f7be79caec1/18?date=2019-03-02T22%3A03%3A09.770Z'
    });
  },
  beforeDestroy() {
    bus.$off("sacuvajAnalite");
    bus.$off("OdaberiUzorak");
    bus.$off("Save");
    bus.$off("Check");
    bus.$off("Undo");
    bus.$off("File");
    bus.$off("Trash");
    bus.$off("Plus");
    bus.$off("Commenting");
    bus.$off("Barcode");
    bus.$off("showPlusRefresh");
    // this.id = this.$store.state.odobriSID
  },
  created() {
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
        // console.log(res.data)
        this.uzorci = [];
        this.header =
          "Odobravanje rezultata za pacijenta: " +
          res.data.results[0].patient.ime +
          " " +
          res.data.results[0].patient.prezime;
        this.nalazParams.patient = res.data.results[0].patient._id;
        this.nalazParams.samples = [];
        res.data.results.forEach(element => {
          var uslov = 0;
          var zaprimljen = 0;
          var realizovan = 0;
          var status_uzorka = element.status;
          this.nalazParams.samples.push(element._id);

          element.rezultati.forEach(test => {
            // console.log(test.rezultat[test.rezultat.length - 1].rezultat_f)
            uslov++;
            if (test.rezultat[test.rezultat.length - 1].rezultat_f === "") {
              zaprimljen++;
            }
            if (test.rezultat[test.rezultat.length - 1].rezultat_f != "") {
              realizovan++;
            }

            if (uslov === element.rezultati.length) {
              if (status_uzorka === "ODOBREN") {
                this.uzorci.push({
                  sid: element.id,
                  status: "ODOBREN",
                  _id: element._id
                });
              } else if (zaprimljen < 1) {
                this.uzorci.push({
                  sid: element.id,
                  status: "REALIZOVAN",
                  _id: element._id
                });
              } else if (realizovan < 1) {
                this.uzorci.push({
                  sid: element.id,
                  status: "ZAPRIMLJEN",
                  _id: element._id
                });
              } else {
                this.uzorci.push({
                  sid: element.id,
                  status: "U OBRADI",
                  _id: element._id
                });
              }
            }
          });
        });
        // console.log(this.uzorci);
        this.uzorci = this.uzorci.sort(function(a, b) {
          return a.sid.localeCompare(b.sid, undefined, {
            numeric: true,
            sensitivity: "base"
          });
        });

        this.alertNalaz = true;
        this.uzorci.forEach(element => {
          // console.log(element)
          if (element.status != "ODOBREN") {
            this.alertNalaz = false;
          }
        });
        this.main = true;
      });
  },
  methods: {
    nalazPrint(event) {
      // console.log('printaj')
      var uzor = "";
      this.nalazParams.samples.forEach(element => {
        uzor += element + ",";
      });
      uzor = uzor.slice(0, -1);
      router.push(
        "/nalazi/verifikacija/" + this.nalazParams.patient + "?uzorci=" + uzor
      );
    },
    printajBarcode() {
      var link = barcode + this.sid + ".png";

      http
        .get(
          "uzorci/barcode/" +
            this.sid +
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
            undefined,
            undefined
          );
          this.showBarcode = false;
        });
    },
    getSamples: function() {
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
          // console.log(res.data)
          this.uzorci = [];
          // this.header = 'Odobravanje rezultata za pacijenta: ' + res.data.results[0].patient.ime + ' ' + res.data.results[0].patient.prezime
          res.data.results.forEach(element => {
            var uslov = 0;
            var zaprimljen = 0;
            var realizovan = 0;
            var status_uzorka = element.status;

            element.rezultati.forEach(test => {
              // console.log(test.rezultat[test.rezultat.length - 1].rezultat_f)
              uslov++;
              if (test.rezultat[test.rezultat.length - 1].rezultat_f === "") {
                zaprimljen++;
              }
              if (test.rezultat[test.rezultat.length - 1].rezultat_f != "") {
                realizovan++;
              }

              if (uslov === element.rezultati.length) {
                if (status_uzorka === "ODOBREN") {
                  this.uzorci.push({
                    sid: element.id,
                    status: "ODOBREN",
                    _id: element._id
                  });
                } else if (zaprimljen < 1) {
                  this.uzorci.push({
                    sid: element.id,
                    status: "REALIZOVAN",
                    _id: element._id
                  });
                } else if (realizovan < 1) {
                  this.uzorci.push({
                    sid: element.id,
                    status: "ZAPRIMLJEN",
                    _id: element._id
                  });
                } else {
                  this.uzorci.push({
                    sid: element.id,
                    status: "U OBRADI",
                    _id: element._id
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

          this.alertNalaz = true;
          this.uzorci.forEach(element => {
            // console.log(element)
            if (element.status != "ODOBREN") {
              this.alertNalaz = false;
            }
          });
          bus.$emit("SetClass", this.uzorci);
        });
    },
    sacuvajMulti: function(analiti) {
      analiti.forEach(analit => {
        analit.rezultat = analit.rezultat.replace(/,/g, ".");
      });

      http
        .post("/rezultati/odobravanje/analiti/" + this.sid, {
          analiti: analiti,
          site: this.$store.state.site,
          token: this.$store.state.token
        })
        .then(res => {
          this.refresh();
        })
        .then(res => {
          this.refresh();
        })
        .then(res => {
          this.getSamples();
        })
        .then(res => {
          this.getSamples();
        });
    },
    calculate: function(event, ide, id, ime, edited) {
      // console.warn(ime);
      http
        .post("/rezultati/odobravanje/calculate/" + this.sid, {
          _id: id,
          token: this.$store.state.token,
          site: this.$store.state.site,
          ime: ime,
          pid: this.pid
        })
        .then(res => {
          if (res.data.success) {
            this.refresh();
            this.getSamples();
          }
        });
    },
    sacuvajRezultate: function(rezultati) {
      rezultati.forEach(element => {
        element.rezultat = element.rezultat.replace(/,/g, ".");
      });

      http
        .post("/rezultati/odobravanje/sacuvaj/" + this.sid, {
          email: this.$store.state.userId,
          token: this.$store.state.token,
          site: this.$store.state.site,
          rezultati: rezultati
        })
        .then(res => {
          this.getSamples();
        });
    },
    testBezAnalita: function(test, rezultat, jedinica, dRef, gRef, site) {
      if (rezultat === null) {
        rezultat = "";
      }
      return ispisAnalitNe(test, rezultat, jedinica, dRef, gRef, site);
    },
    testSaAnalitima: function(
      izbor,
      test,
      rezultat,
      jedinica,
      dRef,
      gRef,
      site
    ) {
      if (rezultat === null) {
        rezultat = "";
      }
      return ispisAnalitDa(izbor, test, rezultat, jedinica, dRef, gRef, site);
    },
    retestDa: function(event) {
      http
        .post("rezultati/odobravanje/retest/da/", {
          id_u: this.sid,
          id_t: event.target.id,
          site: this.$store.state.site,
          token: this.$store.state.token
        })
        .then(() => {
          this.rezultati.forEach(element => {
            if (element.test === event.target.id) {
              element.retest = true;
            }
          });
        });
    },
    retestNe: function(event) {
      http
        .post("rezultati/odobravanje/retest/ne/", {
          id_u: this.sid,
          id_t: event.target.id,
          site: this.$store.state.site,
          token: this.$store.state.token
        })
        .then(() => {
          this.rezultati.forEach(element => {
            if (element.test === event.target.id) {
              element.retest = false;
            }
          });
        });
    },
    vratiPregled: function() {
      router.push("/rezultati/verifikacija/" + "?sekcija=" + "SVE");
    },
    prikazAnalita: function(event, naziv, ana, rezultat, ide, odobren) {
      this.naslov = "Rezultati testa: " + naziv + " (" + ana + ")";
      this.analiti = [];
      var single = {};
      var i = 0;
      var kontrola = false;

      this.analitiprikaz.forEach(element => {
        i++;
        single = {};

        var opcije = null;

        switch (this.$store.state.site) {
          case "5b6caf696a0f4166f4da989b": // Čarovac Lab, $store.state.site: 5b6caf696a0f4166f4da989b
            opcije = c_izbornik.data;
            break;
          case "5bc71402bf21a379083d6e07": // Med Lab, $store.state.site: 5bc71402bf21a379083d6e07
            opcije = m_izbornik.data;
            break;
          case "5bd40c16020d6d21bbaf610c": // PZU Muminović, $store.state.site: 5bd40c16020d6d21bbaf610c
            opcije = p_izbornik.data;
            break;
          case "5c69f68c338fe912f99f833b": // BIH MEDICINSKI LABORATORIJ (Sarajevo - Stup), $store.state.site: 5c69f68c338fe912f99f833b
            opcije = bhs_izbornik.data;
            break;
        }

        if (event.target.id === element.labassay._id) {
          element.rezultat.forEach(analit => {
            // console.log(analit);
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
              // console.log('analit.rezultat[0].rezultat_f.trim() != ""');
              // console.log(analit.rezultat[0].rezultat_f.trim());
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

            if (this.verificiran) {
              single.edit = false;
            } else {
              single.edit = true;
            }

            if (
              ana === "Opšti pregled urina" &&
              (this.$store.state.site === "5bd40c16020d6d21bbaf610c" ||
                this.$store.state.site === "5c69f68c338fe912f99f833b")
            ) {
              if (
                analit.rezultat[0].rezultat_f === "" &&
                single.select_options != undefined
              ) {
                single.rezultat = single.select_options[1];
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
        this.$refs.largeModalPrikazAnalita.open();
      }
    },
    odobriRezultate: function(rezultati) {
      this.sacuvajRezultate(rezultati);

      http
        .post("/rezultati/odobravanje/odobri/" + this.sid, {
          testovi: rezultati,
          site: this.$store.state.site,
          token: this.$store.state.token
        })
        .then(res => {
          this.verificiran = true;
          this.odobren = true;
          this.potvrdi = "!SHOW";
        })
        .then(() => {
          this.rezultati.forEach(element => {
            element.edit = false;
          });
          this.getSamples();
        });
    },
    ukloniOdobrenje: function(rezultati) {
      http
        .post("/rezultati/odobravanje/ukloni/" + this.sid, {
          testovi: rezultati,
          site: this.$store.state.site,
          token: this.$store.state.token
        })
        .then(res => {
          this.verificiran = false;
          this.odobren = false;
          this.potvrdi = "SAČUVAJ";
        })
        .then(() => {
          // this.refresh()
          this.rezultati.forEach(element => {
            element.edit = true;
          });
          this.getSamples();
        });
    },
    refresh: function() {
      // document.getElementById(this.sid).click()

      var topcije = null;

      switch (this.$store.state.site) {
        case "5b6caf696a0f4166f4da989b": // Čarovac Lab, $store.state.site: 5b6caf696a0f4166f4da989b
          topcije = c_izbornik.rez;
          break;
        case "5bc71402bf21a379083d6e07": // Med Lab, $store.state.site: 5bc71402bf21a379083d6e07
          topcije = m_izbornik.rez;
          break;
        case "5bd40c16020d6d21bbaf610c": // PZU Muminović, $store.state.site: 5bd40c16020d6d21bbaf610c
          topcije = p_izbornik.rez;
          break;
        case "5c69f68c338fe912f99f833b": // BIH MEDICINSKI LABORATORIJ (Sarajevo - Stup), $store.state.site: 5c69f68c338fe912f99f833b
          topcije = bhs_izbornik.rez;
          break;
      }

      http
        .get(
          "rezultati/showsingle/" +
            this.sid +
            "?token=" +
            this.$store.state.token +
            "&site=" +
            this.$store.state.site,
          {}
        )
        .then(res => {
          this.loaded = false;
          this.verificiran = true;
          this.odobren = false;
          this.testovi = [];
          this.rezultati = [];
          this.analitiprikaz = [];
          this.pacijent = res.data.ime + " " + res.data.prezime + " ";
          this.header = "Odobravanje rezultata za pacijenta: " + this.pacijent;
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

              // if (element.testovi.labassay.multi) {
              //   res.data.multidata.forEach(multi => {
              //     if (multi.labassay._id === element.testovi.labassay._id) {
              //       multi.rezultat.forEach(rezu => {
              //         rezu.rezultat.forEach(ana => {
              //           if (ana.rezultat_f != "") {
              //             test.realizovan = true
              //           }
              //         })
              //       })
              //     }
              //   })
              // }

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
                    // .replace(/[0-9]/g, "_")
                    .replace(/^\d+/, "")
              );
              element.testovi.rezultat.forEach(rezultat => {
                test.sekcija = rezultat.anaassay.sekcija;
                test.rezultat = rezultat.rezultat_f;
                test.unit = rezultat.jedinice_f;

                // if (!element.testovi.labassay.multi) {
                if (rezultat.rezultat_f != "") {
                  test.realizovan = true;
                }
                // }

                if (rezultat.odobren) {
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
          }
        })
        .then(res => {
          this.rezultati.forEach(element => {
            if (element.odobren != "ODOBREN") {
              this.verificiran = false;
              this.potvrdi = "SAČUVAJ";
            }

            if (element.calculated) {
              this.calculated = true;
            }
          });

          if (this.verificiran === false) {
            this.odobren = false;
          } else {
            this.odobren = true;
          }
          // console.log(this.sid);
          //bus.$emit('SetClientHeight', this.sid) // clientHeight, VuesticCollapse.vue
          this.loaded = true;
        })
        .then(res => {
          if (this.klik) {
            document.getElementById(this.sid).click();
          }

          this.klik = false;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../sass/_variables.scss";
@import "../../../sass/_toasts.scss";
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
  background-color: $white;
  color: $white;
  box-shadow: $widget-box-shadow;
}

.brand-pale {
  background-color: $white;
  color: $white;
  box-shadow: $widget-box-shadow;
}

.info-widget {
  border-top: $info-widget-border;
  &.brand-info {
    border-top-color: $brand-info;
  }
  &.brand-danger {
    border-top-color: $brand-danger;
  }
  &.brand-warning {
    border-top-color: $brand-warning;
  }
  &.brand-pale {
    border-top-color: $gray;
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

.btn.btn-micro.sq {
  border-radius: 0%;
}

.collapse-page {
  &__content {
    padding: 2rem;
    &__title {
      font-size: 1.375rem;
      font-weight: bold;
    }
  }
}

.btn.btn-sm.sq {
  border-radius: 0%;
}

#AlertDiv {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}
</style>