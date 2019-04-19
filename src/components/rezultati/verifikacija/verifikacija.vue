/* eslint-disable */
<template>
  <div class="row">
    <div class="col-md-12">
      <!-- <vuestic-widget headerText="Pregled Rezultata"> -->
        <vuestic-tabs v-if="sekcije.length" :names="sekcije" ref="tabs" :sekcija="section">
        <div v-for="sekcija in sekcije" :slot="sekcija">
        <vuestic-data-table
          v-if="!sve"
          :apiUrl="apiUrl+sekcija"
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
        <vuestic-data-table
          v-if="sve"
          :apiUrl="apiUrlsve"
          style="padding-right: 20px;padding-left: 20px;"
          class="no-v-padding minHeight"
          :tableFields="tableFieldssve"
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
      <!-- </vuestic-widget> -->
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import BadgeColumn from "./BadgeColumn.vue";
import FieldsDef from "./fields-definition";
import FieldsDefsve from "./fields-definition-sve";
import ItemsPerPageDef from "./items-per-page-definition";
import { apiUrloRez } from "../../../../config/config.js";
import { apiUrloRezsve } from "../../../../config/config.js";
import { http } from "../../../../config/config.js";
Vue.component("badge-column", BadgeColumn);

export default {
  name: "rTable",

  data() {
    return {
      apiUrl: apiUrloRez,
      apiUrlsve: apiUrloRezsve,
      apiMode: true,
      tableFields: FieldsDef.tableFields,
      tableFieldssve: FieldsDefsve.tableFields,
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
    // console.log(this.$route)
    if (this.$route.query.sekcija) {
      this.section = this.$route.query.sekcija;
    } else {
      // console.log(this.$route.query)
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
        // console.log(res.data)

        // this.sekcije = res.data.sekcije
        // this.sekcije.unshift('SVE')
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
