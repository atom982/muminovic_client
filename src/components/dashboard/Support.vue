<template>
  <div class="data-visualisation-tab dashboard-tab">
    <div class="col-md-12">
      <div class="row">
        <span style="color: #e34a4a">{{ "" }}</span>

        <strong
          ><span style="font-size: 17px; color: #e34a4a">{{
            "Podrška korisnicima:"
          }}</span></strong
        >
      </div>

      <div class="row">
        <span style="color: #e34a4a">{{ "" }}</span>
        <span style="font-size: 17px; color: #282828">{{
          "Telefon: +387 61/339-991"
        }}</span>
      </div>

      <div class="row">
        <span style="color: #e34a4a">{{ "" }}</span>
        <span style="font-size: 17px; color: #282828">{{
          "E-mail: atom.podrska@gmail.com"
        }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { http } from "../../../config/config.js";
import store from "vuex-store";

export default {
  name: "support",

  components: {},

  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.chart-container {
  padding: 0 2rem;
  height: 24rem;
}

.visina {
  height: 480px;
  line-height: 480px;
}
</style>
