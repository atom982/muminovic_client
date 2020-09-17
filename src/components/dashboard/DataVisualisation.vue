<template>
  <div class="data-visualisation-tab dashboard-tab">
    <div class="col-md-12">
      <div class="row">
        <div class="col-md-4">
          <div v-if="loadedSample" class="chart-widget visina">
            <vuestic-chart v-bind:data="podatakSample" :options="DonutChartOptions" type="donut"></vuestic-chart>
          </div>
          <div v-if="!loadedSample" class="chart-widget visina">
            <h6 style="text-align: center; line-height: 380px;">
              <Spinner name="ball-beat" color="#e34a4a"/>
            </h6>
          </div>
        </div>

        <div class="col-md-8 visina">
          <div v-if="loadedChart " class="chart-widget visina">
            <vuestic-chart
              v-bind:data="podatakChart"
              :options="VerticalBarChartOptions"
              type="vertical-bar"
            ></vuestic-chart>
          </div>
          <div v-if="!loadedChart" class="chart-widget visina">
            <h6 style="text-align: center; line-height: 380px;">
              <Spinner name="ball-beat" color="#e34a4a"/>
            </h6>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { http } from "../../../config/config.js";
import store from "vuex-store";
import DonutChart from "../vuestic-components/vuestic-chart/chart-types/DonutChart";
import VerticalBarChart from "../vuestic-components/vuestic-chart/chart-types/VerticalBarChart";

export default {
  name: "data-visualisation",

  components: {
    DonutChart,
    VerticalBarChart
  },

  data() {
    return {
      podatakSample: {},
      loadedSample: false,
      podatakChart: {},
      loadedChart: false,
      DonutChartOptions: {},
      VerticalBarChartOptions: {}
    };
  },
  created() {
    this.pripremiPodatkeDonutChart(res => {
      this.podatakSample = res;
    });
    this.pripremiPodatkeVerticalBarChart(res => {
      this.podatakChart = res;
    });
  },
  methods: {
    pripremiPodatkeDonutChart: function(callback) {
      http
        .get(
          "/dashboard/donut" +
            "?token=" +
            this.$store.state.token +
            "&site=" +
            this.$store.state.site,
          {}
        )
        .then(res => {
          if (res.data) {
            if (res.data.json.empty) {
              let palette = store.getters.palette;
              var podatakSample = {
                labels: ["Nema zaprimljenih uzoraka"],
                datasets: [
                  {
                    label: "Broj uzoraka",
                    backgroundColor: [palette.pale],
                    data: [1]
                  }
                ]
              };
              this.loadedSample = true;
              this.DonutChartOptions = {
                responsive: true,
                title: {
                  display: true,
                  text: "Danas"
                }
              };
            } else {
              let palette = store.getters.palette;
              var podatakSample = {
                labels: ["Zaprimljen", "Verificiran"],
                datasets: [
                  {
                    label: "Broj uzoraka",
                    backgroundColor: [
                      palette.danger,
                     
                      palette.primary
                    ],
                    data: [
                      res.data.json.zaprimljenUzorak,
                      
                      res.data.json.obradjenUzorak
                    ]
                  }
                ]
              };
              this.loadedSample = true;
              this.DonutChartOptions = {
                responsive: true,
                title: {
                  display: true,
                  text: "Danas"
                }
              };
            }
            callback(podatakSample);
          }
        });
    },
    pripremiPodatkeVerticalBarChart: function(callback) {
      http
        .get(
          "/dashboard/bar" +
            "?token=" +
            this.$store.state.token +
            "&site=" +
            this.$store.state.site,
          {}
        )
        .then(res => {
          if (res.data) {
            if (res.data.barData.data.length < 1) {
              let palette = store.getters.palette;
              var podatakChart = {
                labels: res.data.barData.labela,
                datasets: [
                  {
                    label: "Pacijenata",
                    backgroundColor: palette.pale,
                    borderColor: palette.transparent,
                    data: res.data.barData.patients
                  },
                  {
                    label: "Zaprimljeno",
                    backgroundColor: palette.pale,
                    borderColor: palette.transparent,
                    data: res.data.barData.data
                  },
                  {
                    label: "Verificirano",
                    backgroundColor: palette.pale,
                    borderColor: palette.transparent,
                    data: res.data.barData.obr
                  }
                ]
              };
              this.loadedChart = true;
              this.VerticalBarChartOptions = {
                responsive: true,
                title: {
                  display: true,
                  text: "Danas"
                },
                scales: {
                  xAxes: [
                    {
                      display: true,
                      gridLines: {
                        display: true,
                        color: "#eee"
                      }
                    }
                  ],
                  yAxes: [
                    {
                      display: true,
                      gridLines: {
                        display: true,
                        color: "#eee"
                      }
                    }
                  ]
                }
              };
            } else {
              let palette = store.getters.palette;
              var podatakChart = {
                labels: res.data.barData.labela,
                datasets: [
                  {
                    label: "Pacijenata",
                    backgroundColor: palette.info,
                    borderColor: palette.transparent,
                    data: res.data.barData.patients
                  },
                  {
                    label: "Zaprimljeno",
                    backgroundColor: palette.danger,
                    borderColor: palette.transparent,
                    data: res.data.barData.data
                  },
                  {
                    label: "Verificirano",
                    backgroundColor: palette.primary,
                    borderColor: palette.transparent,
                    data: res.data.barData.obr
                  }
                ]
              };
              this.loadedChart = true;
              this.VerticalBarChartOptions = {
                responsive: true,
                title: {
                  display: true,
                  text: "Danas"
                },
                scales: {
                  xAxes: [
                    {
                      display: true,
                      gridLines: {
                        display: true,
                        color: "#eee"
                      }
                    }
                  ],
                  yAxes: [
                    {
                      display: true,
                      gridLines: {
                        display: true,
                        color: "#eee"
                      }
                    }
                  ]
                }
              };
            }
            callback(podatakChart);
          }
        });
    }
  }
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
