/* eslint-disable */
    <template>
        <div class="row">
      <div class="col-md-12">
     
        <vuestic-widget headerText="Verifikacija Nalaza">
         
          <vuestic-data-table :apiUrl="apiUrl"
                      style='padding-right: 20px;padding-left: 20px;'
                      class="no-v-padding minHeight"
                      :tableFields="tableFields"
                      :itemsPerPage="itemsPerPage"
                      :sortFunctions="sortFunctions"
                      :apiMode="apiMode"
                      :token="token"
                      :site="site"
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
  import ItemsPerPageDef from './items-per-page-definition'
  import {apiUrlNal} from '../../../../config/config.js'
   import {http} from '../../../../config/config.js'
  Vue.component('badge-column', BadgeColumn)

  export default {
    name: 'rTable',

    data () {
      return {
        apiUrl: apiUrlNal,
        apiMode: true,
        tableFields: FieldsDef.tableFields,
        itemsPerPage: ItemsPerPageDef.itemsPerPage,
        sortFunctions: FieldsDef.sortFunctions,
        paginationPath: '',
        sekcije:[],
        section:'',
        token : this.$store.state.token,
        site : this.$store.state.site
      }
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
