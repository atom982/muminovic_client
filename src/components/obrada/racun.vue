<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <div v-if="ifPdf" class="btn-container">
          <button class="btn btn-secondary btn-sm" @click.prevent="Nazad()">
            <span class="fa fa-step-backward"></span>
            {{ ' NAZAD'}}
          </button>
          <span class="blockquote">{{text}}</span>
          <button class="btn btn-secondary btn-sm pull-right" @click.prevent="Popust(popust)">
            <span class="fa fa-calculator"></span>
            {{ ' calc'}}
          </button>
          <div class="form-group with-icon-left pull-right" style="padding-right: 2%;">
            <div class="input-group">
              <!-- type="number" min="0" step="any"  -->
              <input
                id="input-icon-left"
                name="input-icon-left"
                v-model="popust"
                required
                title=" "
              >
              <i class="fa fa-percent icon-left input-icon"></i>
              <label class="control-label" for="input-icon-left">{{'Unesite popust'}}</label>
              <i class="bar"></i>
            </div>
          </div>
        </div>
        <hr>
        <!-- <div class="d-flex flex-column align-items-center justify-content-between down-container"> -->

          <div id="pdf-container"></div>

          <!-- <embed
            src
            id="pdf"
            style="width: 100%;height: 800px; visibility:hidden"
            type="application/pdf"
          > -->
        <!-- </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import BadgeColumn from "./BadgeColumn.vue";
import axios from "axios";
import router from "../../router";
import PDFObject from "pdfobject";
import { http } from "../../../config/config.js";
import { server } from "../../../config/config.js";

Vue.component("badge-column", BadgeColumn);

export default {
  name: "Predracun",
  props: ["id"],

  data() {
    return {
      ifPdf: "",
      popust: "",
      discount: 0,
      total: "",
      link: "",
      text: "Za platiti: ",

      toastText: "",
      toastIcon: "",
      toastPosition: "",
      toastDuration: 2500,
      isToastFullWidth: false,
      className: "",
      originalTotal: ""
    };
  },

  mounted() {
    http
      .post("racuni/generate", {
        patient: this.$route.params.id,
        uzorci: this.$route.query.uzorci,
        discount: 0,
        token: this.$store.state.token,
        site: this.$store.state.site
      })
      .then(res => {
        this.ifPdf = true;

        var options = {
          width: "100%",
          height: "800px"
        };

        var url = server + "racuni/" + res.data.link;

        PDFObject.embed(url, "#pdf-container", options);

        // document.getElementById("pdf").style.visibility = "visible";
        // document.getElementById("pdf").src = server + "racuni/" + res.data.link;
        this.link = res.data.link;
        this.discount = res.data.discount;
        this.total = res.data.total.toFixed(2);
        this.originalTotal = res.data.total.toFixed(2);
        this.text = "Za platiti: " + this.total + " BAM";
      });
  },
  watch: {
    popust() {
      if (isNaN(this.popust)) {
        this.popust = "";
        this.total = this.originalTotal;
      } else if (Number(this.popust) > 60) {
        this.popust = "";
        this.total = this.originalTotal;
      } else {
        this.total = (this.originalTotal * ((100 - this.popust) / 100)).toFixed(
          2
        );
        this.text = "Za platiti: " + this.total + " BAM";
      }
    }
  },
  methods: {
    Nazad: function() {
      router.push("/obrada/pregled/" + "?sekcija=" + "SVE");
    },
    Popust(popust) {
      if (Number(this.popust) >= 0 && Number(this.popust) <= 60) {
        this.discount = Number(this.popust);
        if (Number(this.popust) === 0) {
          this.popust = "";
        }
        // console.log(this.discount);
        // console.log(this.total);

        http
          .post("racuni/generate", {
            patient: this.$route.params.id,
            uzorci: this.$route.query.uzorci,
            discount: this.discount,
            token: this.$store.state.token,
            site: this.$store.state.site
          })
          .then(res => {
            this.ifPdf = true;

            var options = {
              width: "100%",
              height: "800px"
            };

            var url = server + "racuni/" + res.data.link;

            PDFObject.embed(url, "#pdf-container", options);

            // document.getElementById("pdf").style.visibility = "visible";
            // document.getElementById("pdf").src =
            //   server + "racuni/" + res.data.link;
            this.link = res.data.link;
            this.discount = res.data.discount;
            this.total = res.data.total.toFixed(2);
            if (this.discount > 0) {
              this.text =
                "Za platiti: " +
                this.total +
                " BAM | Popust: " +
                this.discount +
                " %";
            } else {
              this.text = "Za platiti: " + this.total + " BAM";
            }
          });
      } else {
        this.toastText = "Vrijednost popusta nije validna.";
        this.toastIcon = "fa-warning";
        this.toastPosition = "top-right";
        this.className = "vuestic-toast-warning";

        this.showToast(this.toastText, {
          icon: this.toastIcon,
          position: this.toastPosition,
          duration: this.toastDuration,
          fullWidth: this.isToastFullWidth,
          className: this.className
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../sass/_variables.scss";
@import "../../sass/_toasts";

// .btn.btn-sm {
//   border-radius: 0%;
// }

.stats-number,
.stats-title {
  line-height: 1;
}

.info-widget-inner {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  &.has-chart {
    justify-content: space-between;
  }
  .stats {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
}

.stats-number {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: 1.7rem;
  margin-bottom: 0.5rem;
  .stats-icon {
    font-size: 1.5625rem;
    position: absolute;
    top: 0.625rem;
    left: -1.25rem;
    &.icon-wide {
      left: -1.875rem;
    }
  }
}

.color-icon-label-table {
  td:first-child {
    width: 1rem;
  }
}

.brand-danger {
  background-color: #db76df;
  color: $white;
  box-shadow: $widget-danger-shadow;
}

.info-widget {
  border-top: $info-widget-border;
  &.brand-info {
    border-top-color: $brand-info;
  }
  &.brand-danger {
    border-top-color: #db76df;
  }
}
</style>

