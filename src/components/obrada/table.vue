/* eslint-disable */
<template>
  <div class="row">
    <div class="col-md-12">
      <vuestic-tabs v-if="sekcije.length" :names="sekcije" ref="tabs" :sekcija="section">
        <div v-for="sekcija in sekcije" :key="sekcija" :slot="sekcija">
          <vuestic-data-table
            v-if="sve"
            :apiUrl="apiUrl"
            style="padding-right: 20px;padding-left: 20px;"
            class="no-v-padding minHeight"
            :tableFields="tableFields"
            :itemsPerPage="itemsPerPage"
            :sortFunctions="sortFunctions"
            :apiMode="apiMode"
            :sekcija="sekcija"
            :site="site"
            :token="token"
            :paginationPath="paginationPath"
          ></vuestic-data-table>
        </div>
      </vuestic-tabs>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { http } from "../../../config/config.js";
import BadgeColumn from "./BadgeColumn.vue";
import FieldsDef from "./fields-definition";
import ItemsPerPageDef from "./items-per-page-definition";
import { apiUrlObrada } from "../../../config/config.js";

export default {
  name: "rTable",

  data() {
    return {
      apiUrl: apiUrlObrada,
      apiMode: true,
      tableFields: FieldsDef.tableFields,
      tableFields: FieldsDef.tableFields,
      itemsPerPage: ItemsPerPageDef.itemsPerPage,
      sortFunctions: FieldsDef.sortFunctions,
      paginationPath: "",
      sekcije: [],
      section: "",
      token: this.$store.state.token,
      site: this.$store.state.site,
      sve: true
    };
  },
  created() {
    if (this.$route.query.sekcija) {
      this.section = this.$route.query.sekcija;
    }

    http
      .get(
        "/uzorci/sekcije/list?token=" +
          this.$store.state.token +
          "&site=" +
          this.$store.state.site,
        {}
      )
      .then(res => {
        this.sekcije.push("SVE");
        if (!this.section.length) {
          this.section = this.sekcije[0];
        } else {
          if (this.section === "SVE") {
            this.sve = true;
          } else {
            this.sve = false;
          }
        }
      });
  }
};
</script>

<style lang="scss">
.color-icon-label-table {
  td:first-child {
    width: 1rem;
  }
}

.minHeight {
  min-height: 350px;
}
</style>
