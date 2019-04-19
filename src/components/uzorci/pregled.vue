/* eslint-disable */
<template>
  <div class="row">
    <div class="col-md-12">
  
      <vuestic-tabs v-if="sekcije.length" :names="sekcije" ref="tabs" :sekcija="section">
        <div v-for="sekcija in sekcije" :slot="sekcija">
  
          <vuestic-data-table v-if="!sve" :apiUrl="apiUrl+sekcija" style='padding-right: 20px;padding-left: 20px;' class="no-v-padding minHeight2" :tableFields="tableFields" :itemsPerPage="itemsPerPage" :sortFunctions="sortFunctions" :apiMode="apiMode" :sekcija="sekcija" :site="site"
            :token="token" :paginationPath="paginationPath">
          </vuestic-data-table>

          <vuestic-data-table v-if="sve" :apiUrl="apiUrlsve" style='padding-right: 20px;padding-left: 20px;' class="no-v-padding minHeight2" :tableFields="tableFieldssve" :itemsPerPage="itemsPerPagesve" :sortFunctions="sortFunctionssve" :apiMode="apiMode" :sekcija="sekcija" :site="site"
            :token="token" :paginationPath="paginationPath">
          </vuestic-data-table>
        </div>
      </vuestic-tabs>
  
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import BadgeColumn from './BadgeColumn.vue'
  import FieldsDef from './fields-definition'
  import ItemsPerPageDef from './items-per-page-definition'
  import FieldsDefsve from './fields-definition-sve'
  import ItemsPerPageDefsve from './items-per-page-definition-sve'
  import {
    http
  } from '../../../config/config.js'
  import {
    apiUrl
  } from '../../../config/config.js'
    import {
    apiUrlsve
  } from '../../../config/config.js'
  Vue.component('badge-column', BadgeColumn)
  
  export default {
    name: 'Table',
  
    data() {
      return {
        apiUrl: apiUrl,
        apiUrlsve:apiUrlsve,
        apiMode: true,
        tableFields: FieldsDef.tableFields,
        tableFieldssve: FieldsDefsve.tableFields,
        itemsPerPage: ItemsPerPageDef.itemsPerPage,
        itemsPerPagesve: ItemsPerPageDefsve.itemsPerPage,
        sortFunctions: FieldsDef.sortFunctions,
        sortFunctionssve: FieldsDefsve.sortFunctions,
        paginationPath: '',
        sekcije: [],
        section: '',
        token: this.$store.state.token,
        site: this.$store.state.site,
        sve:true,
      }
    },
    mounted() {      
      if (this.$route.query.sekcija) {
        this.section = this.$route.query.sekcija

      }
      http.get('/uzorci/sekcije/list?token=' + this.$store.state.token + '&site=' + this.$store.state.site, {})
        .then(res => { 
          this.sekcije = res.data.sekcije
          this.sekcije.unshift('SVE')
          if (!this.section.length) {
            this.section = this.sekcije[0]
          }else{
            if(this.section ==="SVE"){
              this.sve = true
            }else{
              this.sve = false
            }
          }  
        })
    }
  }
</script>

<style lang="scss">
  .color-icon-label-table {
    td:first-child {
      width: 1rem;
    }
  }
  
  .circle {
    width: .400rem;
    height: .400rem;
    border-radius: 50%;
    display: inline-block;
  }
  
  .minHeight2 {
    min-height: 350px;
  }
</style>
