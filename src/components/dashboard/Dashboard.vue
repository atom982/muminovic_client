<template>
  <div class="dashboard">
  
    <dashboard-info-widgets></dashboard-info-widgets>
  
    <div v-if="loaded" style="background-color: #ffffff; padding: 10px;">
      <data-visualisation-tab></data-visualisation-tab>
    </div>
  
  </div>
</template>

<script>
  import Vue from 'vue'
  import DashboardInfoWidgets from './DashboardInfoWidgets'
  import DataVisualisationTab from './DataVisualisation.vue'
  
  export default {
    name: 'dashboard',
    components: {
      DashboardInfoWidgets,
      DataVisualisationTab
    },
    data() {
      return {
        loaded: false
      }
    },
    mounted() {
      this.loaded = true
    }
  }
</script>

<style lang="scss" scoped>
  
</style>
