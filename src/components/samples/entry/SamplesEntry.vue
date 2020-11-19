<template>
  <div>
    <div class="col-md-12">
      <vuestic-widget class="minWidgetHeight" headerText="Prijem">
        <div class="row">
          <div class="col-md-4">
            <vuestic-accordion-patient-info>
              <vuestic-collapse-patient-info :godiste="starost" :cijena="ukupnaCijena">
                <span slot="header">{{ patient.ime + ' ' + patient.prezime }}</span>
                <div slot="body">
                  <!-- <div class="row">
                    <div class="col-md-12">
                      <div class="collapse-page__content" style="padding: 10px;">
                        <div>{{ patient }}</div>
                      </div>
                    </div>
                  </div>-->
                </div>
              </vuestic-collapse-patient-info>
              <div style="min-height: 8px;"></div>
            </vuestic-accordion-patient-info>&nbsp;
            <a
              style="color: #f7cc36;"
              @click.prevent="viseUnos()"
              href="#"
            >{{'Unesite više detalja'}}</a>
            <div style="min-height: 8px;"></div>

            <vuestic-modal-drugo-stanje
              :show.sync="show"
              ref="largeModal"
              :okText="potvrdi"
              :cancelText="odustani"
            >
              <div slot="title">{{"VIŠE DETALJA"}}</div>
              <div>
                <div class="form-group">
                  <div class="col-md-12 info-widget-inner">
                    <div class="col-md-12">
                      <div class="col-md-12">
                        <vuestic-simple-select
                          v-if="this.spol === 'ŽENSKI'"
                          class="form-group with-icon-right"
                          label="Drugo Stanje"
                          v-model="drstanje"
                          v-validate="'required'"
                          name="drstanje"
                          required
                          title=" "
                          ref="drstanjeSelect"
                          v-bind:options="drstanja"
                        ></vuestic-simple-select>
                        <vuestic-simple-select
                          class="form-group with-icon-right"
                          label="Antikoagulantna terapija"
                          v-model="anticoag"
                          v-validate="'required'"
                          name="anticoag"
                          required
                          title=" "
                          ref="anticoagSelect"
                          v-bind:options="anticoagi"
                        ></vuestic-simple-select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </vuestic-modal-drugo-stanje>

            <div class="col-md-12">
              <vuestic-simple-select
                v-show="lokacije.length > 1"
                v-model="lokacija"
                name="lokacija"
                required
                title=" "
                ref="lokacijaSelect"
                v-bind:options="lokacije"
                label="Izaberite lokaciju"
              ></vuestic-simple-select>
            </div>

            <vuestic-accordion-samples-entry
              v-for="uzorak in uzorciList"
              :key="uzorak.tip"
              v-show="uzorak.testoviTag.length"
            >
              <vuestic-collapse-samples-entry
                :uzorak="uzorak.tip"
                :komentar="uzorak.komentar"
                :vrijeme="uzorak.time"
                :tags="uzorak.testoviTag"
              >
                <span :id="uzorak.tip" slot="header">{{ uzorak.ime }}</span>
                <div slot="body">
                  <div class="vrow">
                    <div class="col-md-12" style="padding-top: 0px;">
                      <div class="collapse-page__content" style="padding: 5px;">
                        <div>
                          <vuestic-tag-group
                            :uzorak="uzorak.tip"
                            v-model="uzorak.testoviTag"
                            removable
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </vuestic-collapse-samples-entry>
              <div style="min-height: 8px;"></div>
            </vuestic-accordion-samples-entry>
          </div>

          <div class="col-md-8">
            <div class="vuestic-page-not-found-search">
              <div class="vuestic-page-not-found-search__content">
                <div class="vuestic-page-not-found-search__wallpaper col-md-12">
                  <div class="row vuestic-page-not-found-search__message">&nbsp;</div>
                </div>

                <div class="row">
                  <div class="col-md-3"></div>
                  <div class="col-md-6">
                    <div class="vuestic-page-not-found-search__wallpaper">
                      <div class="form-group">
                        <div class="input-group vuestic-page-not-found-search__input">
                          <input placeholder="Pretraga" style="color: white" v-model="inputValue">
                          <i class="bar" :style="'width: ' + 310 + 'px'"/>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-if="kategorijeL.length > 7 && inputValue.length < 1" class="col-md-3">
                    <br>
                    <i
                      v-if="page === 1"
                      title="Naprijed"
                      @click.prevent="addPage"
                      style="color: white"
                      class="fa fa-forward fa-lg icon-left wizard-back pull-left"
                      id="forward"
                    ></i>
                    <i
                      v-if="page === 2"
                      title="Nazad"
                      @click.prevent="subPage"
                      style="color: white"
                      class="fa fa-backward fa-lg icon-left wizard-back pull-left"
                      id="forward"
                    ></i>
                  </div>
                </div>

                <div
                  class="vuestic-page-not-found-search__wallpaper vuestic-page-not-found-search__not-found-wallpaper-list"
                >
                  <div
                    class="vuestic-page-not-found-search__wrapper"
                    :style="{'grid-template-columns': rows}"
                    v-if="page === 1 && inputValue.length < 1"
                  >
                    <ul
                      class="vuestic-page-not-found-search__list"
                      v-for="(category, index) in filterItems"
                      v-show="category.categoryName != 'z-HIDDEN' && index < 7"
                      :key="index"
                      style="color: #f7cc36;"
                    >
                      {{ category.categoryName }}
                      <li
                        class="vuestic-page-not-found-search__list-element"
                        v-for="(item, index) in category.items"
                        :key="index"
                      >
                        <!-- v-if="index < 15" -->
                        <vuestic-tooltip :options="{content: item.opis, placement: 'right'}">
                          <a
                            @click.prevent="testEvent($event, category, item, item.cijena)"
                            :class="{'unchosen-link': !item.izabran, 'plain-link': item.izabran}"
                            href="#"
                          >{{item.itemName}}</a>
                        </vuestic-tooltip>
                      </li>
                    </ul>
                  </div>

                  <div
                    class="vuestic-page-not-found-search__wrapper"
                    :style="{'grid-template-columns': rows}"
                    v-if="page === 2 && inputValue.length < 1"
                  >
                    <ul
                      class="vuestic-page-not-found-search__list"
                      v-for="(category, index) in filterItems"
                      v-show="category.categoryName != 'z-HIDDEN' && index > 6"
                      :key="index"
                      style="color: #f7cc36;"
                    >
                      {{ category.categoryName }}
                      <li
                        class="vuestic-page-not-found-search__list-element"
                        v-for="(item, index) in category.items"
                        :key="index"
                      >
                        <!-- v-if="index < 15" -->
                        <vuestic-tooltip :options="{content: item.opis, placement: 'right'}">
                          <a
                            @click.prevent="testEvent($event, category, item, item.cijena)"
                            :class="{'unchosen-link': !item.izabran, 'plain-link': item.izabran}"
                            href="#"
                          >{{item.itemName}}</a>
                        </vuestic-tooltip>
                      </li>
                    </ul>
                  </div>

                  <div
                    class="vuestic-page-not-found-search__wrapper"
                    :style="{'grid-template-columns': rows}"
                    v-if="inputValue.length > 0"
                  >
                    <ul
                      class="vuestic-page-not-found-search__list"
                      v-for="(categoryTmp, index) in filterItemsTmp"
                      v-show="categoryTmp.categoryName != 'z-HIDDEN'"
                      :key="index"
                      style="color: #f7cc36;"
                    >
                      {{ categoryTmp.categoryName }}
                      <li
                        class="vuestic-page-not-found-search__list-element"
                        v-for="(item, index) in categoryTmp.items"
                        :key="index"
                        v-show="index < 20"
                      >
                        <!-- v-if="index < 15" -->
                        <vuestic-tooltip :options="{content: item.opis, placement: 'right'}">
                          <a
                            @click.prevent="testEvent($event, categoryTmp, item, item.cijena)"
                            :class="{'unchosen-link': !item.izabran, 'plain-link': item.izabran}"
                            href="#"
                          >{{item.itemName}}</a>
                        </vuestic-tooltip>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div style="position: sticky; margin-bottom: 10px;" class="row" v-if="loaded">
              <div class="col-md-5"></div>
              <div class="col-md-3 pull-left" style="margin-top:25px;">
                <button
                  @click.prevent="Discard()"
                  class="btn btn-warning btn-micro"
                >{{ 'ODUSTANI' }}</button>
              </div>
              <div class="col-md-4 pull-right" style="margin-top:25px;">
                <button
                  v-if="lokacija != ''"
                  @click.once="Save()"
                  class="btn btn-secondary btn-micro"
                  :disabled="save"
                >{{ 'SAČUVAJ' }}</button>
              </div>
            </div>
          </div>
        </div>
      </vuestic-widget>

      <vuestic-modal-samples-entry-calendar
        :show.sync="showCalendar"
        :sample="sample"
        :vrijeme="vrijeme"
        ref="staticModalSamplesEntryCalendar"
      >
        <div slot="title">{{'Vrijeme uzorkovanja'}}</div>
      </vuestic-modal-samples-entry-calendar>

      <vuestic-modal-samples-entry-commenting
        :show.sync="showCommenting"
        :uzorci="uzorciList"
        :sample="sample"
        :komentar="komentar"
        ref="staticModalSamplesEntryCommenting"
      >
        <div slot="title">{{'Unos komentara'}}</div>
      </vuestic-modal-samples-entry-commenting>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";
import { http } from "../../../../config/config.js";
import router from "../../../router";
import { bus } from "../../../main";

export default {
  name: "SamplesEntry",

  data() {
    return {
      rows: "repeat(7, 1fr)",
      ukupnaCijena: 0,
      page: 1,
      kategorijeL: [],
      uniqueArray: [],
      timestamp: "",

      patient: {},
      prikazivise: true,
      spol: "ŽENSKI",
      drstanje: "",
      drstanjeTmp: "",
      drstanja: [
        "",
        "Prvo tromjesečje",
        "Drugo tromjesečje",
        "Treće tromjesečje"
      ],
      anticoag: "", // Antikoagulantna terapija
      anticoagTmp: "",
      anticoagi: ["", "Standardna terapija", "Intenzivna terapija"],
      potvrdi: "SAČUVAJ",
      odustani: "ODUSTANI",
      show: true,
      starost: "30",
      lokacije: [],
      lokacijeInit: [],
      lokacija: "",
      categories: [],
      categoriesTmp: [],
      inputValue: "",
      showCommenting: true,
      showCalendar: true,
      sample: "",
      komentar: "",
      vrijeme: "",
      siteCode: "",
      uzorciList: [
        {
          ime: "Serum",
          code: [],
          tip: "Serum 1",
          patient: {},
          testovi: [],
          testoviTag: [],
          hitno: false,
          time: new Date(
            new Date().getTime() - new Date().getTimezoneOffset() * 60000
          )
            .toISOString()
            .slice(0, -8)
            .replace("T", " "),
          komentar: ""
        },
        {
          ime: "Serum",
          code: [],
          tip: "Serum 2",
          patient: {},
          testovi: [],
          testoviTag: [],
          hitno: false,
          time: new Date(
            new Date().getTime() - new Date().getTimezoneOffset() * 60000
          )
            .toISOString()
            .slice(0, -8)
            .replace("T", " "),
          komentar: ""
        },
        {
          ime: "Serum",
          code: [],
          tip: "Serum 3",
          patient: {},
          testovi: [],
          testoviTag: [],
          hitno: false,
          time: new Date(
            new Date().getTime() - new Date().getTimezoneOffset() * 60000
          )
            .toISOString()
            .slice(0, -8)
            .replace("T", " "),
          komentar: ""
        },
        {
          ime: "Serum",
          code: ["Imunohemija"],
          tip: "Serum 4",
          patient: {},
          testovi: [],
          testoviTag: [],
          hitno: false,
          time: new Date(
            new Date().getTime() - new Date().getTimezoneOffset() * 60000
          )
            .toISOString()
            .slice(0, -8)
            .replace("T", " "),
          komentar: ""
        },
        {
          ime: "Krv",
          code: [],
          tip: "Krv 1",
          patient: {},
          testovi: [],
          testoviTag: [],
          hitno: false,
          time: new Date(
            new Date().getTime() - new Date().getTimezoneOffset() * 60000
          )
            .toISOString()
            .slice(0, -8)
            .replace("T", " "),
          komentar: ""
        },
        {
          ime: "Krv",
          code: [],
          tip: "Krv 2",
          patient: {},
          testovi: [],
          testoviTag: [],
          hitno: false,
          time: new Date(
            new Date().getTime() - new Date().getTimezoneOffset() * 60000
          )
            .toISOString()
            .slice(0, -8)
            .replace("T", " "),
          komentar: ""
        },
        {
          ime: "Krv",
          code: ["Hemoglobin A1c"],
          tip: "Krv EDTA",
          patient: {},
          testovi: [],
          testoviTag: [],
          hitno: false,
          time: new Date(
            new Date().getTime() - new Date().getTimezoneOffset() * 60000
          )
            .toISOString()
            .slice(0, -8)
            .replace("T", " "),
          komentar: ""
        },
        {
          ime: "Plazma",
          code: [],
          tip: "Plazma 1",
          patient: {},
          testovi: [],
          testoviTag: [],
          hitno: false,
          time: new Date(
            new Date().getTime() - new Date().getTimezoneOffset() * 60000
          )
            .toISOString()
            .slice(0, -8)
            .replace("T", " "),
          komentar: ""
        },
        {
          ime: "Plazma",
          code: ["EDTA plazma"],
          tip: "Plazma EDTA",
          patient: {},
          testovi: [],
          testoviTag: [],
          hitno: false,
          time: new Date(
            new Date().getTime() - new Date().getTimezoneOffset() * 60000
          )
            .toISOString()
            .slice(0, -8)
            .replace("T", " "),
          komentar: ""
        },
        {
          ime: "Plazma",
          code: ["Citratna plazma"],
          tip: "Plazma Citrat",
          patient: {},
          testovi: [],
          testoviTag: [],
          hitno: false,
          time: new Date(
            new Date().getTime() - new Date().getTimezoneOffset() * 60000
          )
            .toISOString()
            .slice(0, -8)
            .replace("T", " "),
          komentar: ""
        },
        {
          ime: "Plazma",
          code: ["Heparinska plazma"],
          tip: "Plazma Heparin",
          patient: {},
          testovi: [],
          testoviTag: [],
          hitno: false,
          time: new Date(
            new Date().getTime() - new Date().getTimezoneOffset() * 60000
          )
            .toISOString()
            .slice(0, -8)
            .replace("T", " "),
          komentar: ""
        },
        {
          ime: "Plazma",
          code: ["NaF plazma"],
          tip: "Plazma NaF",
          patient: {},
          testovi: [],
          testoviTag: [],
          hitno: false,
          time: new Date(
            new Date().getTime() - new Date().getTimezoneOffset() * 60000
          )
            .toISOString()
            .slice(0, -8)
            .replace("T", " "),
          komentar: ""
        },
        {
          ime: "Urin",
          code: [],
          tip: "Urin 1",
          patient: {},
          testovi: [],
          testoviTag: [],
          hitno: false,
          time: new Date(
            new Date().getTime() - new Date().getTimezoneOffset() * 60000
          )
            .toISOString()
            .slice(0, -8)
            .replace("T", " "),
          komentar: ""
        },
        {
          ime: "Urin",
          code: ["24h urin"],
          tip: "Urin 24h",
          patient: {},
          testovi: [],
          testoviTag: [],
          hitno: false,
          time: new Date(
            new Date().getTime() - new Date().getTimezoneOffset() * 60000
          )
            .toISOString()
            .slice(0, -8)
            .replace("T", " "),
          komentar: ""
        },
        {
          ime: "Feces",
          code: [],
          tip: "Feces 1",
          patient: {},
          testovi: [],
          testoviTag: [],
          hitno: false,
          time: new Date(
            new Date().getTime() - new Date().getTimezoneOffset() * 60000
          )
            .toISOString()
            .slice(0, -8)
            .replace("T", " "),
          komentar: ""
        },
        {
          ime: "Bris",
          code: [],
          tip: "Bris 1",
          patient: {},
          testovi: [],
          testoviTag: [],
          hitno: false,
          time: new Date(
            new Date().getTime() - new Date().getTimezoneOffset() * 60000
          )
            .toISOString()
            .slice(0, -8)
            .replace("T", " "),
          komentar: ""
        },
        {
          ime: "Bris",
          code: ["Korona virus"],
          tip: "Bris Korona",
          patient: {},
          testovi: [],
          testoviTag: [],
          hitno: false,
          time: new Date(
            new Date().getTime() - new Date().getTimezoneOffset() * 60000
          )
            .toISOString()
            .slice(0, -8)
            .replace("T", " "),
          komentar: ""
        },
        {
          ime: "Bris",
          code: ["Bris nazofarinksa"],
          tip: "Bris nazofarinksa",
          patient: {},
          testovi: [],
          testoviTag: [],
          hitno: false,
          time: new Date(
            new Date().getTime() - new Date().getTimezoneOffset() * 60000
          )
            .toISOString()
            .slice(0, -8)
            .replace("T", " "),
          komentar: ""
        }
      ],
      oldUzorciList: [],
      save: true,
      loaded: false
    };
  },

  computed: {
    ...mapGetters(["sidebarOpened", "toggleWithoutAnimation"]),
    filterItems() {
      if (this.inputValue.length >= 1) {
        return this.categories
          .map(category => {
            return {
              categoryName: category.categoryName,
              bundle: category.bundle,
              items: category.items.filter(
                item =>
                  item.itemName
                    .toUpperCase()
                    .search(this.inputValue.toUpperCase()) !== -1
              )
            };
          })
          .filter(category => category.items.length >= 1);
      } else {
        return this.categories;
      }
    },
    filterItemsTmp() {
      if (this.inputValue.length >= 1) {
        return this.categoriesTmp
          .map(category => {
            return {
              categoryName: category.categoryName,
              bundle: category.bundle,
              items: category.items.filter(
                item =>
                  item.itemName
                    .toUpperCase()
                    .search(this.inputValue.toUpperCase()) !== -1
              )
            };
          })
          .filter(category => category.items.length >= 1);
      } else {
        return this.categoriesTmp;
      }
    }
  },

  watch: {
    ukupnaCijena: function() {
      // console.log('Trenutna cijena: ' + this.ukupnaCijena)
    },
    uzorciList: {
      handler: function(after, before) {
        var vm = this;

        let changed = after.filter(function(p, idx) {
          return Object.keys(p).some(function(prop) {
            return p[prop] !== vm.$data.oldUzorciList[idx][prop];
          });
        });

        vm.setValue();

        var condition = false;
        this.uzorciList.forEach(element => {
          if (element.testovi.length) {
            condition = true;
          }
        });

        if (condition) {
          this.save = false;
        } else {
          this.save = true;
        }
      },
      deep: true
    }
  },

  beforeRouteLeave(to, from, next) {
    this.toggleSidebar(true);
    next();
  },

  created() {
    if (this.$store.state.displayItems > 15) {
      this.rows = "repeat(7, 1fr)";
    } else {
      this.rows = "repeat(7, 1fr)";
    }

    this.toggleSidebar(false);

    bus.$on("DrugoStanjeOn", () => {
      // console.warn(this.drstanje);
      // console.warn(this.anticoag);
    });

    bus.$on("DrugoStanjeOff", () => {
      this.drstanje = this.drstanjeTmp;
      this.anticoag = this.anticoagTmp;
      // console.warn(this.drstanje);
      // console.warn(this.anticoag);
    });

    bus.$on("removeTest", (data, uzorak) => {
      // console.log("removeTest")
      if (!data.bundle) {
        this.uzorciList.forEach(element => {
          if (element.tip === uzorak) {
            for (var i = 0; i < element.testovi.length; i++) {
              if (element.testovi[i].itemName === data.name) {
                element.testovi.splice(i, 1);

                if (data.name.includes("KKS")) {
                  for (var i = element.code.length - 1; i >= 0; i--) {
                    if (element.code[i] == "Krvna slika") {
                      element.code.splice(i, 1);
                      break;
                    }
                  }
                } else if (data.name.includes("SE")) {
                  for (var i = element.code.length - 1; i >= 0; i--) {
                    if (element.code[i] == "Sedimentacija") {
                      element.code.splice(i, 1);
                      break;
                    }
                  }
                } else if (
                  data.name.includes("%HbA1c") ||
                  data.name === "HBA1" ||
                  data.name === "HBAI"
                ) {
                  for (var i = element.code.length - 1; i >= 0; i--) {
                    if (element.code[i] == "%HbA1c") {
                      element.code.splice(i, 1);
                      break;
                    }
                  }
                } else if (data.name.includes("OGTT-0")) {
                  for (var i = element.code.length - 1; i >= 0; i--) {
                    if (element.code[i] == "OGTT - natašte") {
                      element.code.splice(i, 1);
                      break;
                    }
                  }
                } else if (data.name.includes("OGTT-60")) {
                  for (var i = element.code.length - 1; i >= 0; i--) {
                    if (element.code[i] == "OGTT - 60 min") {
                      element.code.splice(i, 1);
                      break;
                    }
                  }
                } else if (data.name.includes("OGTT-120")) {
                  for (var i = element.code.length - 1; i >= 0; i--) {
                    if (element.code[i] == "OGTT - 120 min") {
                      element.code.splice(i, 1);
                      break;
                    }
                  }
                }

                break;
              }
            }
          }
        });

        this.categories.forEach(element => {
          element.items.forEach(item => {
            if (item.itemName === data.name) {
              this.ukupnaCijena = this.ukupnaCijena - Number(item.cijena);
              item.izabran = false;
            }
          });
        });

        this.categoriesTmp.forEach(element => {
          element.items.forEach(item => {
            if (item.itemName === data.name) {
              item.izabran = false;
            }
          });
        });
      } else {
        this.uzorciList.forEach(element => {
          if (element.tip === uzorak) {
            for (var i = 0; i < element.testovi.length; i++) {
              if (element.testovi[i].itemName === data.name) {
                element.testovi.splice(i, 1);

                if (data.name.includes("KKS")) {
                  for (var i = element.code.length - 1; i >= 0; i--) {
                    if (element.code[i] == "Krvna slika") {
                      element.code.splice(i, 1);
                      break;
                    }
                  }
                } else if (data.name.includes("SE")) {
                  for (var i = element.code.length - 1; i >= 0; i--) {
                    if (element.code[i] == "Sedimentacija") {
                      element.code.splice(i, 1);
                      break;
                    }
                  }
                } else if (data.name.includes("%HbA1c")) {
                  for (var i = element.code.length - 1; i >= 0; i--) {
                    if (element.code[i] == "%HbA1c") {
                      element.code.splice(i, 1);
                      break;
                    }
                  }
                } else if (data.name.includes("OGTT-0")) {
                  for (var i = element.code.length - 1; i >= 0; i--) {
                    if (element.code[i] == "OGTT - natašte") {
                      element.code.splice(i, 1);
                      break;
                    }
                  }
                } else if (data.name.includes("OGTT-60")) {
                  for (var i = element.code.length - 1; i >= 0; i--) {
                    if (element.code[i] == "OGTT - 60 min") {
                      element.code.splice(i, 1);
                      break;
                    }
                  }
                } else if (data.name.includes("OGTT-120")) {
                  for (var i = element.code.length - 1; i >= 0; i--) {
                    if (element.code[i] == "OGTT - 120 min") {
                      element.code.splice(i, 1);
                      break;
                    }
                  }
                }

                break;
              }
            }
          }
        });

        var uslov = true;

        this.categories.forEach(element => {
          element.items.forEach(item => {
            if (element.bundle) {
              item.testovi.forEach(test => {
                if (test.itemName === data.name) {
                  if (uslov) {
                    this.ukupnaCijena = this.ukupnaCijena - Number(test.cijena);
                    uslov = false;
                  }

                  item.izabran = false;
                  test.izabran = false;
                }
              });
            }
          });
        });

        this.categoriesTmp.forEach(element => {
          element.items.forEach(item => {
            if (element.bundle) {
              item.testovi.forEach(test => {
                if (test.itemName === data.name) {
                  if (uslov) {
                    uslov = false;
                  }

                  item.izabran = false;
                  test.izabran = false;
                }
              });
            }
          });
        });

        this.categories.forEach(cat => {
          cat.items.forEach(it => {
            if (it.itemName === data.name) {
              it.izabran = false;
            }
          });
        });

        this.categoriesTmp.forEach(cat => {
          cat.items.forEach(it => {
            if (it.itemName === data.name) {
              it.izabran = false;
            }
          });
        });
      }
    });

    bus.$on("SamplesEntryRemove", data => {
      // console.log("SamplesEntryRemove")
      this.uzorciList.forEach(element => {
        if (element.tip === data) {
          element.testovi.forEach(tst => {
            this.categories.forEach(ctgelement => {
              ctgelement.items.forEach(item => {
                // console.log(tst.itemName)
                if (item.itemName === tst.itemName) {
                  this.ukupnaCijena = this.ukupnaCijena - Number(tst.cijena);
                }
              });
            });

            this.categoriesTmp.forEach(ctgelement => {
              ctgelement.items.forEach(item => {
                if (item.itemName === tst.itemName) {
                }
              });
            });
          });

          // console.log(element.code)

          element.testovi = [];
          element.code = [];
          element.testoviTag = [];
          element.hitno = false;

          // console.log(element.code)
        }
      });

      this.categories.forEach(element => {
        element.items.forEach(item => {
          if (item.uzorak === data) {
            item.izabran = false;
          }

          if (item.testovi != undefined) {
            item.testovi.forEach(test => {
              if (test.uzorak === data) {
                item.izabran = false;
                test.izabran = false;
              }
            });
          }
        });
      });

      this.categoriesTmp.forEach(element => {
        element.items.forEach(item => {
          if (item.uzorak === data) {
            item.izabran = false;
          }

          if (item.testovi != undefined) {
            item.testovi.forEach(test => {
              if (test.uzorak === data) {
                item.izabran = false;
                test.izabran = false;
              }
            });
          }
        });
      });
    });

    bus.$on("SamplesEntryCommenting", (data, komentar) => {
      this.sample = data;
      this.komentar = komentar;

      // this.uzorciList.forEach(element => {
      //   if(element.tip === data ){
      //     element.komentar = komentar

      //   }
      // })

      this.$refs.staticModalSamplesEntryCommenting.open();
    });

    bus.$on("setComment", (data, comment) => {
      this.uzorciList.forEach(element => {
        if (element.tip === data) {
          element.komentar = comment;
        }
      });
    });

    bus.$on("SamplesEntryCalendar", (data, vrijeme) => {
      this.sample = data;
      this.vrijeme = vrijeme;

      this.$refs.staticModalSamplesEntryCalendar.open();
    });

    bus.$on("setCalendar", (data, time) => {
      this.uzorciList.forEach(element => {
        if (element.tip === data) {
          element.time = time;
        }
      });
    });

    bus.$on("SamplesEntryUrgent", data => {
      this.uzorciList.forEach(element => {
        if (element.tip === data) {
          element.hitno = true;
        }
      });
    });

    bus.$on("SamplesEntryRemoveUrgent", data => {
      this.uzorciList.forEach(element => {
        if (element.tip === data) {
          element.hitno = false;
        }
      });
    });

    bus.$on("headerKlik", data => {
      document.getElementById(data).click();
      setTimeout(() => {
        document.getElementById(data).click();
      }, 10);
    });

    this.setValue();

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
        var str = "";
        var tmp = "";

        this.uzorciList.forEach(element => {
          element.patient = res.data.pacijent;
          this.patient = res.data.pacijent;

          var jmbgGodina = res.data.pacijent.jmbg.slice(4, 7);
          if (jmbgGodina[0] === "9") {
            str = "1";
            tmp = jmbgGodina;
            jmbgGodina = str.concat(tmp);
          } else if (jmbgGodina[0] === "0") {
            str = "2";
            tmp = jmbgGodina;
            jmbgGodina = str.concat(tmp);
          } else {
          }
          this.starost = jmbgGodina;
        });
      })
      .then(res => {
        this.spol = this.patient.spol;
        // console.warn(this.spol);
      });
    http
      .post("/postavke/sajtovi/" + this.$store.state.site, {
        token: this.$store.state.token
      })
      .then(res => {
        this.siteCode = res.data.sajt.sifra;
      });
  },

  mounted() {
    http
      .get(
        "/uzorci/lokacije/list?token=" +
          this.$store.state.token +
          "&site=" +
          this.$store.state.site,
        {}
      ) // Korak 1 - Izaberite lokaciju
      .then(res => {
        if (res.data.lokacije.length != 0) {
          this.locations = res.data.lokacije;
          this.lokacije = [];
          res.data.lokacije.forEach(element => {
            this.lokacije.push(element.lokacija);
            this.lokacijeInit.push(element);
          });
        }

        if (this.lokacije.length < 2) {
          this.lokacija = this.lokacije[0];
        }
      });

    http
      .post("/labassays", {
        site: this.$store.state.site,
        token: this.$store.state.token
      })
      .then(res => {
        var i = 0;
        var kategorije = [];

        var kategorijeTmp = [];

        if (this.$store.state.site === "5bc71402bf21a379083d6e07") {
          // Med Lab, $store.state.site: 5bc71402bf21a379083d6e07

          res.data.testovi = res.data.testovi.sort(function(a, b) {
            return (
              a.entryorder.localeCompare(b.entryorder, undefined, {
                numeric: true,
                sensitivity: "base"
              }) ||
              a.naziv.localeCompare(b.naziv, undefined, {
                numeric: true,
                sensitivity: "base"
              })
            );
          });
        } else {
          res.data.testovi = res.data.testovi.sort(function(a, b) {
            return a.naziv.localeCompare(b.naziv, undefined, {
              numeric: true,
              sensitivity: "base"
            });
          });
        }

        res.data.testovi.forEach(element => {
          if (
            !kategorije.filter(
              kategorija =>
                kategorija === element.kategorija.split("|")[0].trim()
            ).length > 0
          ) {
            kategorije.push(element.kategorija.split("|")[0].trim());
          }
        });

        res.data.testovi.forEach(element => {
          if (
            !kategorijeTmp.filter(
              kategorija =>
                kategorija === element.kategorija.split("|")[0].trim()
            ).length > 0
          ) {
            kategorijeTmp.push(element.kategorija.split("|")[0].trim());
          }
        });

        var temporaryCategory = {};
        var temporaryCategoryTmp = {};

        kategorije.forEach(kategorija => {
          temporaryCategory = {};
          temporaryCategory.categoryName = kategorija;
          temporaryCategory.bundle = false;
          temporaryCategory.items = [];

          res.data.testovi.forEach(element => {
            if (element.kategorija.split("|")[0].trim() === kategorija) {
              if (kategorija === "Specifične") {
                temporaryCategory.bundle = true;

                if (
                  element.calculated &&
                  element.naziv != "OGTT-0" &&
                  element.naziv != "OGTT-60" &&
                  element.naziv != "OGTT-120" &&
                  element.naziv != "Inzulin-0" &&
                  element.naziv != "Inzulin-120" &&
                  element.naziv != "Prolaktin P1" &&
                  element.naziv != "Prolaktin P2" &&
                  element.naziv != "Prolaktin P3" &&
                  element.naziv != "Gluk-0"
                ) {
                  temporaryCategory.items.push({
                    _idlabassay: element._id,
                    itemName: element.naziv.trim(),
                    entryorder: element.entryorder,
                    opis: element.kategorija.split("|")[2].trim(),
                    cijena: element.price,
                    izabran: false,
                    testovi: element.bundledTests
                  });
                } else {
                  if (
                    element.naziv === "OGTT-0" ||
                    element.naziv === "Inzulin-0" ||
                    element.naziv === "Prolaktin P1" ||
                    element.naziv === "Gluk-0"
                  ) {
                    temporaryCategory.items.push({
                      _idlabassay: element._id,
                      itemName: element.kategorija.split("|")[1].trim(),
                      entryorder: element.entryorder,
                      opis: element.kategorija.split("|")[2].trim(),
                      cijena: element.price,
                      izabran: false,
                      testovi: element.bundledTests
                    });
                  }
                }
              } else if (kategorija === "Paneli") {
                temporaryCategory.bundle = true;

                temporaryCategory.items.push({
                  _idlabassay: element._id,
                  itemName: element.kategorija.split("|")[1].trim(),
                  entryorder: element.entryorder,
                  opis: element.analit,
                  cijena: element.price,
                  izabran: false,
                  testovi: element.bundledTests
                });
              } else {
                if (
                  temporaryCategory.items.length ==
                  this.$store.state.displayItems
                ) {
                  this.categories.push(temporaryCategory);
                  temporaryCategory = {};
                  temporaryCategory.categoryName = kategorija;
                  temporaryCategory.bundle = false;
                  temporaryCategory.items = [];
                  temporaryCategory.items.push({
                    _idlabassay: element._id,
                    itemName: element.naziv.trim(),
                    entryorder: element.entryorder,
                    opis: element.analit,
                    cijena: element.price,
                    uzorak: element.tip,
                    izabran: false,
                    klasa: "primary"
                  });
                } else {
                  temporaryCategory.items.push({
                    _idlabassay: element._id,
                    itemName: element.naziv.trim(),
                    entryorder: element.entryorder,
                    opis: element.analit,
                    cijena: element.price,
                    uzorak: element.tip,
                    izabran: false,
                    klasa: "primary"
                  });
                }
              }
            }
          });
          this.categories.push(temporaryCategory);
        });

        kategorijeTmp.forEach(kategorija => {
          temporaryCategoryTmp = {};
          temporaryCategoryTmp.categoryName = kategorija;
          temporaryCategoryTmp.bundle = false;
          temporaryCategoryTmp.items = [];

          res.data.testovi.forEach(element => {
            if (element.kategorija.split("|")[0].trim() === kategorija) {
              if (kategorija === "Specifične") {
                temporaryCategoryTmp.bundle = true;

                if (
                  element.calculated &&
                  element.naziv != "OGTT-0" &&
                  element.naziv != "OGTT-60" &&
                  element.naziv != "OGTT-120" &&
                  element.naziv != "Inzulin-0" &&
                  element.naziv != "Inzulin-120" &&
                  element.naziv != "Prolaktin P1" &&
                  element.naziv != "Prolaktin P2" &&
                  element.naziv != "Prolaktin P3" &&
                  element.naziv != "Gluk-0"
                ) {
                  temporaryCategoryTmp.items.push({
                    _idlabassay: element._id,
                    itemName: element.naziv.trim(),
                    entryorder: element.entryorder,
                    opis: element.kategorija.split("|")[2].trim(),
                    cijena: element.price,
                    izabran: false,
                    testovi: element.bundledTests
                  });
                } else {
                  if (
                    element.naziv === "OGTT-0" ||
                    element.naziv === "Inzulin-0" ||
                    element.naziv === "Prolaktin P1" ||
                    element.naziv === "Gluk-0"
                  ) {
                    temporaryCategoryTmp.items.push({
                      _idlabassay: element._id,
                      itemName: element.kategorija.split("|")[1].trim(),
                      entryorder: element.entryorder,
                      opis: element.kategorija.split("|")[2].trim(),
                      cijena: element.price,
                      izabran: false,
                      testovi: element.bundledTests
                    });
                  }
                }
              } else if (kategorija === "Paneli") {
                temporaryCategoryTmp.bundle = true;

                temporaryCategoryTmp.items.push({
                  _idlabassay: element._id,
                  itemName: element.kategorija.split("|")[1].trim(),
                  entryorder: element.entryorder,
                  opis: element.analit,
                  cijena: element.price,
                  izabran: false,
                  testovi: element.bundledTests
                });
              } else {
                if (temporaryCategoryTmp.items.length === 70) {
                  this.categoriesTmp.push(temporaryCategoryTmp);
                  temporaryCategoryTmp = {};
                  temporaryCategoryTmp.categoryName = kategorija;
                  temporaryCategoryTmp.bundle = false;
                  temporaryCategoryTmp.items = [];
                  temporaryCategoryTmp.items.push({
                    _idlabassay: element._id,
                    itemName: element.naziv.trim(),
                    entryorder: element.entryorder,
                    opis: element.analit,
                    cijena: element.price,
                    uzorak: element.tip,
                    izabran: false,
                    klasa: "primary"
                  });
                } else {
                  temporaryCategoryTmp.items.push({
                    _idlabassay: element._id,
                    itemName: element.naziv.trim(),
                    entryorder: element.entryorder,
                    opis: element.analit,
                    cijena: element.price,
                    uzorak: element.tip,
                    izabran: false,
                    klasa: "primary"
                  });
                }
              }
            }
          });
          this.categoriesTmp.push(temporaryCategoryTmp);
        });
      })
      .then(res => {
        this.loaded = true;

        this.categories.forEach(element => {
          this.kategorijeL.push(element.categoryName);
        });

        for (var i = this.kategorijeL.length - 1; i >= 0; i--) {
          if (this.kategorijeL[i] === "z-HIDDEN") {
            this.kategorijeL.splice(i, 1);
          }
        }

        this.uniqueArray = [...new Set(this.kategorijeL)];

        this.categories = this.categories.sort(function(a, b) {
          return a.categoryName.localeCompare(b.categoryName, undefined, {
            numeric: true,
            sensitivity: "base"
          });
        });

        this.categoriesTmp = this.categoriesTmp.sort(function(a, b) {
          return a.categoryName.localeCompare(b.categoryName, undefined, {
            numeric: true,
            sensitivity: "base"
          });
        });

        if (this.$store.state.site === "5bc71402bf21a379083d6e07") {
          // Med Lab, $store.state.site: 5bc71402bf21a379083d6e07

          this.categories.forEach(element => {
            element.items = element.items.sort(function(a, b) {
              return (
                a.entryorder.localeCompare(b.entryorder, undefined, {
                  numeric: true,
                  sensitivity: "base"
                }) ||
                a.itemName.localeCompare(b.itemName, undefined, {
                  numeric: true,
                  sensitivity: "base"
                })
              );
            });
          });

          this.categoriesTmp.forEach(element => {
            element.items = element.items.sort(function(a, b) {
              return (
                a.entryorder.localeCompare(b.entryorder, undefined, {
                  numeric: true,
                  sensitivity: "base"
                }) ||
                a.itemName.localeCompare(b.itemName, undefined, {
                  numeric: true,
                  sensitivity: "base"
                })
              );
            });
          });
        } else {
          this.categories.forEach(element => {
            element.items = element.items.sort(function(a, b) {
              return a.itemName.localeCompare(b.itemName, undefined, {
                numeric: true,
                sensitivity: "base"
              });
            });
          });

          this.categoriesTmp.forEach(element => {
            element.items = element.items.sort(function(a, b) {
              return a.itemName.localeCompare(b.itemName, undefined, {
                numeric: true,
                sensitivity: "base"
              });
            });
          });
        }
      });
  },

  beforeDestroy() {
    bus.$off("removeTest");
    bus.$off("SamplesEntryRemove");
    bus.$off("SamplesEntryCommenting");
    bus.$off("setComment");
    bus.$off("SamplesEntryCalendar");
    bus.$off("setCalendar");
    bus.$off("SamplesEntryUrgent");
    bus.$off("SamplesEntryRemoveUrgent");
    bus.$off("headerKlik");
    bus.$off("DrugoStanjeOn");
    bus.$off("DrugoStanjeOff");
  },

  methods: {
    ...mapActions(["closeMenu", "toggleSidebar", "isToggleWithoutAnimation"]),
    testEvent(event, category, item, cijena) {
      switch (category.bundle) {
        case true:
          var test = {};
          var tag = {};

          this.uzorciList.forEach(element => {
            item.testovi.forEach(analiza => {
              test = {};
              tag = {};
              if (element.tip === analiza.uzorak) {
                test.itemName = analiza.itemName;
                test.opis = analiza.opis;
                test.cijena = analiza.cijena;
                test.uzorak = analiza.uzorak;
                item.izabran = true;

                analiza.izabran = true;
                test.klasa = analiza.klasa;
                test._id = analiza.labassay;

                tag.name = analiza.itemName;
                tag.type = analiza.klasa;
                tag.bundle = category.bundle;

                if (
                  !element.testovi.filter(el => el.itemName === test.itemName)
                    .length > 0
                ) {
                  element.testovi.push(test);

                  if (test.itemName.includes("KKS")) {
                    element.code.push("Krvna slika");
                  } else if (test.itemName.includes("SE")) {
                    element.code.push("Sedimentacija");
                  } else if (test.itemName.includes("%HbA1c")) {
                    element.code.push("%HbA1c");
                  } else if (test.itemName.includes("OGTT-0")) {
                    element.code.push("OGTT - natašte");
                  } else if (test.itemName.includes("OGTT-60")) {
                    element.code.push("OGTT - 60 min");
                  } else if (test.itemName.includes("OGTT-120")) {
                    element.code.push("OGTT - 120 min");
                  }

                  element.testoviTag.push(tag);

                  this.ukupnaCijena = this.ukupnaCijena + Number(test.cijena);

                  this.categories.forEach(cat => {
                    cat.items.forEach(it => {
                      if (it.itemName === analiza.itemName) {
                        it.izabran = true;
                      }
                    });
                  });

                  this.categoriesTmp.forEach(catTmp => {
                    catTmp.items.forEach(itTmp => {
                      if (itTmp.itemName === analiza.itemName) {
                        itTmp.izabran = true;
                      }
                    });
                  });
                }
              }
            });
          });
          this.inputValue = "";
          break;

        default:
          var test = {};
          var tag = {};
          this.uzorciList.forEach(element => {
            test = {};
            tag = {};
            if (element.tip === item.uzorak) {
              test.itemName = item.itemName;
              test.opis = item.opis;
              test.uzorak = item.uzorak;
              test.cijena = item.cijena;
              item.izabran = true;
              test.klasa = item.klasa;
              test._id = item._idlabassay;
              tag.name = item.itemName;
              tag.type = item.klasa;
              tag.bundle = category.bundle;

              if (
                !element.testovi.filter(el => el.itemName === test.itemName)
                  .length > 0
              ) {
                element.testovi.push(test);
                element.testoviTag.push(tag);

                if (test.itemName.includes("KKS")) {
                  element.code.push("Krvna slika");
                } else if (test.itemName.includes("SE")) {
                  element.code.push("Sedimentacija");
                } else if (test.itemName.includes("%HbA1c")) {
                  element.code.push("%HbA1c");
                } else if (test.itemName.includes("OGTT-0")) {
                  element.code.push("OGTT - natašte");
                } else if (test.itemName.includes("OGTT-60")) {
                  element.code.push("OGTT - 60 min");
                } else if (test.itemName.includes("OGTT-120")) {
                  element.code.push("OGTT - 120 min");
                }

                this.ukupnaCijena = this.ukupnaCijena + Number(cijena);
              }

              if (element.testovi.length > 3) {
                // document.getElementById(item.uzorak).click();
                // document.getElementById(item.uzorak).click();
              }
            }
          });

          this.categories.forEach(cat => {
            cat.items.forEach(it => {
              if (it.itemName === item.itemName) {
                it.izabran = true;
              }
            });
          });

          this.categoriesTmp.forEach(catTmp => {
            catTmp.items.forEach(itTmp => {
              if (itTmp.itemName === item.itemName) {
                itTmp.izabran = true;
              }
            });
          });

          this.inputValue = "";
          break;
      }
    },
    addPage() {
      this.page = 2;
    },
    subPage() {
      this.page = 1;
    },

    viseUnos() {
      this.drstanjeTmp = this.drstanje;
      this.anticoagTmp = this.anticoag;
      this.$refs.largeModal.open();
    },
    Save() {
      // console.warn("Save()");
      var lokacijaID = "";
      this.timestamp = new Date().getTime().toString();

      this.uzorciList = this.uzorciList.filter(function(uzorak) {
        return uzorak.testovi.length;
      });

      this.lokacijeInit.forEach(element => {
        if (element.lokacija === this.lokacija) {
          lokacijaID = element._id;
        }
      });

      if (this.drstanje === "") {
        this.drstanje = "NE";
      }

      if (this.anticoag === "") {
        this.anticoag = "NE";
      }

      http
        .post("/sacuvaj/uzorke", {
          site: this.$store.state.site,
          token: this.$store.state.token,
          timestamp: this.timestamp,
          siteCode: this.siteCode,
          uzorci: this.uzorciList,
          lokacija: lokacijaID,
          drstanje: this.drstanje,
          anticoag: this.anticoag
        })
        .then(res => {
          var datum = "";
          var temp = [];
          var response = {};
          var samplesList = [];

          response = res.data.data[0];

          res.data.data.forEach(element => {
            samplesList.push(element.sid);
          });

          res.data.data.forEach(element => {

            temp = element.datum.split("-");
            datum =
              temp[2].substring(0, 2) +
              "." +
              temp[1] +
              "." +
              temp[0].substring(2, 4) +
              " " +
              temp[2].substring(3, 8);

            // var datRodjenja = element.jmbg.substring(0, 2) + "." + element.jmbg.substring(2, 4) + "." + element.godiste + '.'

            if(element.code === "Korona virus"){

                [1,2,3].forEach(function(i) {

                  printEPL(
                    element.patient,
                    element.sid,
                    element.pid,
                    element.godiste,
                    datum,
                    element.link,
                    element.code,
                    "5bd40c16020d6d21bbaf610c", // PZU Muminović, $store.state.site: 5bd40c16020d6d21bbaf610c
                    element.jmbg,
                  ) 

                });

                

            }else{

              printEPL(
                element.patient,
                element.sid,
                element.pid,
                element.godiste,
                datum,
                element.link,
                element.code,
                "5bd40c16020d6d21bbaf610c", // PZU Muminović, $store.state.site: 5bd40c16020d6d21bbaf610c
                element.jmbg,
              ) 

            }
          });
          router.push("/pacijenti/pregled/");
        });
    },
    Discard() {
      router.push("/pacijenti/pregled/");
    },
    setValue() {
      this.$data.oldUzorciList = _.cloneDeep(this.$data.uzorciList);
    }
  }
};
</script>

<style lang="scss">
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
$on-focus-background-color: rgba(187, 180, 178, 0.71);

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
// Checkbox and RadioButton
$checkbox-between-items-margin: 1rem;
$checkbox-between-label-margin: 2.35rem;
$checkbox-label-margin-top: 0.2rem;
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
.color-icon-label-table {
  td:first-child {
    width: 1rem;
  }
}

.minWidgetHeight {
  min-height: 830px;
}
.vuestic-page-not-found-search {
  min-height: 655px;
  padding-bottom: 35px;
  background-color: $top-nav-bg;
  &__text {
    padding-top: 50px;
    color: white;
  }
  &__text-small {
    font-size: $font-size-root;
    line-height: 1.5;
    text-align: center;
    color: white;
    font-weight: normal;
  }
  &__i-vuestic {
    margin-top: 100px;
  }
  &__list {
    color: white;
  }
  &__input {
    width: 310px;
  }
  &__wallpaper {
    max-height: 40%;
    display: flex;
    justify-content: center;
    a {
      margin-top: 2rem;
    }
  }
  &__i-vuestic {
    z-index: 2;
    height: $auth-wallpaper-ivuestic-h;
    width: 100%;
  }
  &__message {
    justify-content: center;
  }
  // @include media-breakpoint-down(xs) {
  // .vuestic-page-not-found-search {
  // height: $auth-mobile-main-h;
  // &__message {
  // justify-content: center;
  // }
  // &__list-element {
  // font-size: 13px;
  // }
  // &__not-found-wallpaper-list {
  // padding: 0;
  // }
  // &__i-vuestic {
  // margin-top: 5%;
  // }
  // &__text-small {
  // font-size: 15px;
  // }
  // &__wrapper {
  // grid-template-columns: repeat(3, 1fr);
  // }
  // }
  // }
  &__wrapper {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
  }
}
.unchosen-link {
  color: $white;
  text-decoration: none;
}
</style>
