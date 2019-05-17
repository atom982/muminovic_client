<template>
  <div class="vuestic-modal">
    <transition name="modal" :duration="duration">
      <div v-show="show" class="modal-container">
        <div class="modal" @click.self="clickMask">
          <div class="modal-dialog" :class="modalClass">
            <div class="modal-content">
              <!--Header-->
              <div class="modal-header">
                <slot name="header">
                  <div class="modal-title">
                    <slot name="title"></slot>
                  </div>

                  <div
                    v-if="window.width > 800 && lokacije.length > 1"
                    style="position: absolute; right: 0px; top: 8px;"
                    class="col-md-4 pull-right"
                  >
                    <vuestic-simple-select
                      style="margin-right:20px;"
                      :label="'Izaberite lokaciju'"
                      v-model="lokacija"
                      name="lokacija"
                      title=" "
                      ref="lokacijaSelect"
                      v-bind:options="lokacije"
                    ></vuestic-simple-select>
                  </div>

                  <i
                    class="ion ion-md-close close-modal"
                    v-if="closeIconShown"
                    @click.prevent="cancel"
                  />
                </slot>
              </div>
              <!--Container-->
              <div id="content" style="min-height: 460px;" class="modal-body">
                <slot></slot>
                <div v-if="loadedChart ">
                  <line-chart
                    v-if="renderData"
                    :options="LineChartOptions"
                    :data="LineChartData"
                    type="line"
                  ></line-chart>
                </div>
                <div  style="display:flex; flex-direction: row; justify-content: center; align-items: center" v-if="!loadedChart ">
                  <div style="float:left;"></div>
                  <span style="vertical-align:middle; "><atom-spinner :animation-duration="1000" :size="370" :color="'#4ae387'"/></span>
                  <div style="float:right;"></div>
                </div>
                
              </div>
              <!--Footer-->
              <div class="modal-footer">
                <slot name="footer">
                  <button
                    type="button"
                    v-if="!noButtons"
                    :class="cancelClass"
                    @click="cancel"
                    :disabled="cancelDisabled"
                  >{{ cancelText }}</button>
                  <!--  <button
                    type="button"
                    v-if="!noButtons"
                    :class="okClass"
                    @click="ok"
                    :disabled="okDisabled"
                  >{{ okText }}</button>-->
                </slot>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-backdrop"></div>
      </div>
    </transition>
  </div>
</template>

<script>
import { http } from "../../../config/config.js";
import { bus } from "../../main";
import store from "vuex-store";
import LineChart from "../vuestic-components/vuestic-chart/chart-types/LineChart";
import { AtomSpinner } from "epic-spinners";

export default {
  name: "vuestic-modal-patients-data",

  components: {
    LineChart,
    AtomSpinner,
  },

  props: {
    transition: {
      type: String,
      default: "modal"
    },
    small: {
      type: Boolean,
      default: false
    },
    large: {
      type: Boolean,
      default: true
    },
    force: {
      type: Boolean,
      default: true
    },
    okText: {
      type: String,
      default: "CONFIRM"
    },
    cancelText: {
      type: String,
      default: "CANCEL"
    },
    okClass: {
      type: String,
      default: "btn btn-primary btn-sm"
    },
    cancelClass: {
      type: String,
      default: "btn btn-warning btn-sm"
    },
    closeIconShown: {
      type: Boolean,
      default: false
    },
    okDisabled: {
      type: Boolean,
      default: false
    },
    cancelDisabled: {
      type: Boolean,
      default: false
    },
    noButtons: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      show: false,
      minHeight: 0,
      renderData: false,
      duration: 500,
      loadedChart: false,
      LineChartOptions: {},
      LineChartData: {},
      initLineChartOptions: {},
      initLineChartData: {},
      lokacije: [],
      lokacija: "",
      window: {
        width: 0,
        height: 0
      }
    };
  },
  computed: {
    modalClass() {
      return {
        "modal-lg": this.large,
        "modal-sm": this.small
      };
    }
  },

  created() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();

    if (this.show) {
      document.body.className += " modal-open";
    }
    this.pripremiPodatkeLineChart(res => {
      this.LineChartData = res;
    });
  },
  beforeDestroy() {
    document.body.className = document.body.className.replace(
      /\s?modal-open/,
      ""
    );
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  watch: {
    show(value) {
      if (value) {
        document.body.className += " modal-open";
      } else {
        window.setTimeout(() => {
          document.body.className = document.body.className.replace(
            /\s?modal-open/,
            ""
          );
        }, this.duration);
      }
    },
    lokacija() {
      this.pripremiPodatkeLineChart(res => {
        this.LineChartData = res;
      });
    }
  },
  methods: {
    handleResize() {
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;
    },
    listenKeyUp(event) {
      if (event.key === "Escape") {
        this.cancel();
      }
    },
    ok() {
      this.$emit("ok");
      this.show = false;
      window.removeEventListener("keyup", this.listenKeyUp);
    },
    cancel() {
      this.$emit("cancel");
      this.show = false;
      window.removeEventListener("keyup", this.listenKeyUp);
    },
    clickMask() {
      if (!this.force) {
        this.cancel();
      }
    },
    open() {
      if (this.loadedChart) {
        this.renderData = true;
        this.show = true;
        var elmnt = document.getElementById("content");
        // console.log(elmnt.offsetHeight)
        this.minHeight = elmnt.offsetHeight;
      }

      window.addEventListener("keyup", this.listenKeyUp);
    },
    close() {
      this.show = false;
      this.renderData = false;
      window.removeEventListener("keyup", this.listenKeyUp);
    },

    pripremiPodatkeLineChart: function(callback) {
      this.loadedChart = false;
      http
        .get(
          "/dashboard/line" +
            "?token=" +
            this.$store.state.token +
            "&site=" +
            this.$store.state.site +
            "&adresa=" +
            this.lokacija,
          {}
        )
        .then(res => {
          let palette = store.getters.palette;

          if (res.data) {
            this.lokacije = res.data.mjesta;
            if (res.data.barData.data.length < 1) {
              let palette = store.getters.palette;
              var LineChartData = {
                labels: res.data.barData.labela,
                datasets: [
                  {
                    label: "Pacijenata",
                    fill: true,
                    backgroundColor: palette.pale,
                    borderColor: palette.transparent,
                    data: res.data.barData.patients
                  }
                ]
              };
              this.loadedChart = true;
              this.LineChartOptions = {
                responsive: true,
                maintainAspectRatio: false,
                title: {
                  display: true,
                  text: "Zadnja 3 mjeseca"
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
              var LineChartData = {
                labels: res.data.barData.labela,
                datasets: [
                  {
                    label: "Pacijenata",
                    fill: true,
                    backgroundColor: this.hex2rgb(palette.info, 0.5).css,
                    pointBorderColor: palette.danger,
                    borderColor: palette.transparent,
                    data: res.data.barData.patients
                  }
                ]
              };
              this.loadedChart = true;
              this.LineChartOptions = {
                responsive: true,
                maintainAspectRatio: false,
                title: {
                  display: true,
                  text: "Zadnja 3 mjeseca" // res.data.lokacija
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
            callback(LineChartData);
          }
        });
    },
    hex2rgb(hex, opacity) {
      hex = (hex + "").trim();

      let rgb = null;
      let match = hex.match(/^#?(([0-9a-zA-Z]{3}){1,3})$/);

      if (!match) {
        return null;
      }

      rgb = {};

      hex = match[1];

      if (hex.length === 6) {
        rgb.r = parseInt(hex.substring(0, 2), 16);
        rgb.g = parseInt(hex.substring(2, 4), 16);
        rgb.b = parseInt(hex.substring(4, 6), 16);
      } else if (hex.length === 3) {
        rgb.r = parseInt(hex.substring(0, 1) + hex.substring(0, 1), 16);
        rgb.g = parseInt(hex.substring(1, 2) + hex.substring(1, 2), 16);
        rgb.b = parseInt(hex.substring(2, 3) + hex.substring(2, 3), 16);
      }

      rgb.css = "rgb" + (opacity ? "a" : "") + "(";
      rgb.css += rgb.r + "," + rgb.g + "," + rgb.b;
      rgb.css += (opacity ? "," + opacity : "") + ")";

      return rgb;
    }
  }
};
</script>

<style lang="scss">
@import "../../sass/_variables.scss";

//Modals
$modal-header-padding-x: $widget-padding;
$modal-header-padding-y: 0;
$modal-header-height: $widget-header-height;
$modal-header-border: $widget-header-border;
$modal-content-border-width: 0;
$modal-content-border-radius: 0;
$modal-inner-padding: 25px;
$modal-footer-btns-padding-bottom: 20px;
$modal-footer-btns-margin-x: 10px;
$modal-md: 650px;
$modal-lg: 850px;

.vuestic-modal {
  height: 0;
  width: 0;

  // For Transitioning
  .modal {
    display: block;
  }

  .modal-dialog,
  .modal-backdrop {
    transition: all 0.5s ease;
  }

  .modal-enter .modal-dialog,
  .modal-leave-active .modal-dialog {
    opacity: 0;
    transform: translateY(-30%);
  }

  .modal-enter .modal-backdrop,
  .modal-leave-active .modal-backdrop {
    opacity: 0;
  }

  .modal-backdrop {
    opacity: 0.5;
  }

  //Modal styles

  .modal-header {
    height: $modal-header-height;
    padding: $modal-header-padding-y $modal-header-padding-x;
    border-bottom: $modal-header-border;
    font-size: $font-size-larger;
    display: flex;
    align-items: center;
  }

  .close-modal {
    margin-left: 1rem;
    font-size: $font-size-large;
    line-height: $font-size-large;
    cursor: pointer;
  }

  .modal-content {
    border-radius: $modal-content-border-radius;
  }

  .modal-footer {
    justify-content: center;
    padding: 0 $modal-inner-padding;
    padding-bottom: calc(
      #{$modal-inner-padding} - #{$modal-footer-btns-padding-bottom}
    );
    flex-wrap: wrap;
    .btn {
      margin: 0 $modal-footer-btns-margin-x $modal-footer-btns-padding-bottom
        $modal-footer-btns-margin-x;
    }
  }

  // .modal-dialog {
  //   box-shadow: $modal-content-box-shadow-sm-up;
  // }
}
</style>
