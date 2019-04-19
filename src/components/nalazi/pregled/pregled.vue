/* eslint-disable */
<template>
  <div class="row">
    <div class="col-md-12">
  
      <vuestic-widget v-show="isRole === 'Administrator'" headerText="Pregled Nalaza">
  
        <vuestic-data-table :apiUrl="apiUrl" style='padding-right: 20px;padding-left: 20px;' class="no-v-padding minHeight" :tableFields="tableFields" :itemsPerPage="itemsPerPage" :sortFunctions="sortFunctions" :apiMode="apiMode" :token="token" :site="site" :paginationPath="paginationPath">
        </vuestic-data-table>
  
      </vuestic-widget>
  
      <vuestic-widget v-show="isRole != 'Administrator'" headerText="Pregled Nalaza">
  
        <vuestic-data-table :apiUrl="apiUrl" style='padding-right: 20px;padding-left: 20px;' class="no-v-padding minHeight" :tableFields="tableFieldsNoDelete" :itemsPerPage="itemsPerPage" :sortFunctions="sortFunctions" :apiMode="apiMode" :token="token" :site="site"
          :paginationPath="paginationPath">
        </vuestic-data-table>
  
      </vuestic-widget>
  
  
  
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import BadgeColumn from './BadgeColumn.vue'
  import FieldsDef from './fields-definition'
  import FieldsDefNoDelete from './fields-definition-nd'
  import ItemsPerPageDef from './items-per-page-definition'
  import {
    apiUrlNalPre
  } from '../../../../config/config.js'
  import {
    http
  } from '../../../../config/config.js'
  Vue.component('badge-column', BadgeColumn)
  
  export default {
    name: 'rpTable',
  
    data() {
      return {
        apiUrl: apiUrlNalPre,
        apiMode: true,
        tableFields: FieldsDef.tableFields,
        tableFieldsNoDelete: FieldsDefNoDelete.tableFieldsNoDelete,
        itemsPerPage: ItemsPerPageDef.itemsPerPage,
        sortFunctions: FieldsDef.sortFunctions,
        paginationPath: '',
        sekcije: [],
        section: '',
        token: this.$store.state.token,
        site: this.$store.state.site,
        isRole: '',
      }
    },
    mounted() { 
      http.post('users/' + this.$store.state.userId, {
          email: this.$store.state.userId,
          token: this.$store.state.token,
          site: this.$store.state.site
        })
        .then(res => {
  
          this.userImage = res.data.data.link
          this.isRole = res.data.data.role
        })
    },
  }
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
