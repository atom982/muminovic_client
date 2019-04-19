/* eslint-disable */
    <template>
        <div class="row">
      <div class="col-md-12">
        <vuestic-widget headerText="Pregled kontrola">
          <vuestic-data-table :apiUrl="apiUrl"
                      style='padding-right: 20px;padding-left: 20px;'
                      class="no-v-padding minHeight3"
                      :tableFields="tableFields"
                      :itemsPerPage="itemsPerPage"
                      :sortFunctions="sortFunctions"
                      :apiMode="apiMode"
                      :token="token"
                      :paginationPath="paginationPath"></vuestic-data-table>
        </vuestic-widget>
      </div>
    </div>
    </template>
    <script>
  import Vue from 'vue'
  import BadgeColumn from './BadgeColumn.vue'
  import FieldsDef from './fields-definition'
  import ItemsPerPageDef from './items-per-page-definition'
  import {http} from '../../../../config/config.js'
  import {apiUrlKont} from '../../../../config/config.js'

  Vue.component('badge-column', BadgeColumn)

  export default {
    name: 'Table',

    data () {
      return {
        apiUrl:apiUrlKont,
        apiMode: true,
        tableFields: FieldsDef.tableFields,
        itemsPerPage: ItemsPerPageDef.itemsPerPage,
        sortFunctions: FieldsDef.sortFunctions,
        paginationPath: '',
        token : this.$store.state.token
      }
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

  .minHeight3 {
    min-height: 350px;
  }
</style>
