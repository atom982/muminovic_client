<template>
  <div class="dashboard">
    <dashboard-info-widgets></dashboard-info-widgets>

    <div class="statistika">
      <data-visualisation-tab></data-visualisation-tab>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import DashboardInfoWidgets from "./DashboardInfoWidgets";
import DataVisualisationTab from "./DataVisualisation.vue";

export default {
  name: "dashboard",
  components: {
    DashboardInfoWidgets,
    DataVisualisationTab
  }
};
</script>

<style lang="scss" scoped>
@import "../../sass/_variables.scss";
.statistika {
  background-color: $white;
  padding: 10px;
}
</style>
