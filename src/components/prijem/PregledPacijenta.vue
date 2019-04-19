<template>
  <div class="row">
    <div class="col-md-12">
      <vuestic-widget headerText="Prijem pacijenta">
        <vuestic-data-table-pacijent
          :apiUrl="apiUrl"
          style="padding-right: 20px;padding-left: 20px;"
          class="no-v-padding minHeight3"
          :tableFields="tableFields"
          :itemsPerPage="itemsPerPage"
          :sortFunctions="sortFunctions"
          :apiMode="apiMode"
          :token="token"
          :site="site"
          :paginationPath="paginationPath"
        ></vuestic-data-table-pacijent>
      </vuestic-widget>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import BadgeColumn from "./BadgeColumn.vue";
import FieldsDef from "./fields-definition";
import ItemsPerPageDef from "./items-per-page-definition";
import { http } from "../../../config/config.js";
import { bus } from "../../../src/main.js";
import { apiUrlPatient } from "../../../config/config.js";

Vue.component("badge-column", BadgeColumn);

export default {
  name: "pacijenti",

  data() {
    return {
      apiUrl: apiUrlPatient,
      apiMode: true,
      tableFields: FieldsDef.tableFields,
      itemsPerPage: ItemsPerPageDef.itemsPerPage,
      sortFunctions: FieldsDef.sortFunctions,
      paginationPath: "",
      pacijent: {},
      id: "",
      jmbg: "",
      ime: "",
      prezime: "",
      spol: "",
      telefon: "",
      email: "",
      tabelaUslov: false,
      primarytelefon: false,
      warningtelefon: false,
      primaryemail: false,
      warningemail: false,
      editjmbg: false,
      token: this.$store.state.token,
      site: this.$store.state.site
    };
  },
  created() {
    this.tableFields[1].title = this.$t(
      "pacijenti.pregled.fields-definition.trnslr001"
    ); // ime
    this.tableFields[2].title = this.$t(
      "pacijenti.pregled.fields-definition.trnslr002"
    ); // prezime
    this.tableFields[3].title = this.$t(
      "pacijenti.pregled.fields-definition.trnslr007"
    ); // uzorak

    this.tableFields[4].title = this.$t(
      "pacijenti.pregled.fields-definition.trnslr004"
    ); // jmbg
    this.tableFields[5].title = this.$t(
      "pacijenti.pregled.fields-definition.trnslr005"
    ); // spol
    this.tableFields[6].title = this.$t(
      "pacijenti.pregled.fields-definition.trnslr006"
    ); // akcija

    bus.$on("emitime", data => {
      this.pacijent = data;
      this.jmbg = this.pacijent.jmbg;
      if (this.pacijent.jmbg.length > 12) {
        this.tabelaUslov = true;
        this.id = this.pacijent._id;
        this.ime = this.pacijent.ime;
        this.prezime = this.pacijent.prezime;
        this.spol = this.pacijent.spol;
        this.telefon = this.pacijent.telefon;

        if (this.telefon.trim() === "" || this.telefon.trim() === "n/a") {
          this.telefon = "";
          this.primarytelefon = false;
          this.warningtelefon = true;
        } else {
          this.primarytelefon = true;
          this.warningtelefon = false;
        }
        this.email = this.pacijent.email;

        if (this.email.trim() === "" || this.email.trim() === "n/a") {
          this.email = "";
          this.primaryemail = false;
          this.warningemail = true;
        } else {
          this.primaryemail = true;
          this.warningemail = false;
        }
      } else {
        this.tabelaUslov = false;
      }
    });
  },

  mounted() {
    this.$on("update", function(
      edited,
      method,
      id,
      jmbg,
      ime,
      prezime,
      spol,
      telefon,
      email
    ) {
      if (method === "blur" || method === "enter") {
      }
    });
  },

  methods: {
    sacuvaj() {
      this.$emit(
        "update",
        this.id,
        "blur",
        this.id,
        this.jmbg,
        this.ime,
        this.prezime,
        this.spol,
        this.telefon,
        this.email
      );
    }
  }
};
</script>

<style lang="scss">
.color-icon-label-table {
  td:first-child {
    width: 1rem;
  }
}

.circle {
  width: 0.4rem;
  height: 0.4rem;
  border-radius: 50%;
  display: inline-block;
}

.minHeight3 {
  min-height: 350px;
}
</style>
