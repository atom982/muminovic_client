<template>
  <div class="row dashboard-info-widgets">
    <!-- <div class="col-md-6 col-xl-3">
      <vuestic-widget class="info-widget brand-info">
        <div class="info-widget-inner">
          <div class="stats">
            <div v-if="!loadedData" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              {{'...'}}
            </div>
            <div v-if="loadedData" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              {{uzoraka_danas}}
            </div>
            <div class="stats-title">{{'Ukupnpo uzoraka'}}</div>
          </div>
        </div>
      </vuestic-widget>
    </div> -->

    <div class="col-md-6 col-xl-3">
      <vuestic-widget class="danger-widget">
        <div class="info-widget-inner">
          <div class="stats">
            <div v-if="!loadedData" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              {{'...'}}
            </div>
            <div v-if="loadedData" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              {{uzoraka_danas}}
            </div>
            <div class="stats-title">{{'Ukupnpo uzoraka'}}</div>
          </div>
        </div>
      </vuestic-widget>
    </div>

    <div class="col-md-6 col-xl-3">
      <vuestic-widget class="info-widget">
        <div class="info-widget-inner">
          <div class="stats">
            <div v-if="!loadedData" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              {{'...'}}
            </div>
            <div v-if="loadedData" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              {{kompletirano_uzoraka}}
            </div>
            <div class="stats-title">{{'Verificirano uzoraka'}}</div>
          </div>
        </div>
      </vuestic-widget>
    </div>


    <div class="col-md-6 col-xl-3">
      <vuestic-widget class="warning-widget">
        <div class="info-widget-inner">
          <div class="stats">
            <div v-if="!loadedData" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              {{'...'}}
            </div>
            <div v-if="loadedData" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              {{uzoraka_danas - kompletirano_uzoraka}}
            </div>
            <div class="stats-title">{{'Neverificirano uzoraka'}}</div>
          </div>
        </div>
      </vuestic-widget>
    </div>

    <div class="col-md-6 col-xl-3">
      <vuestic-widget class="blue-widget">
        <div class="info-widget-inner">
          <div class="stats">
            <div v-if="!loadedPatients" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              {{'...'}}
            </div>
            <div v-if="loadedPatients" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              {{pacijenata}}
            </div>
            <div class="stats-title">{{'Prijema'}}</div>
          </div>
        </div>
      </vuestic-widget>
    </div>

  


    <!-- <div class="col-md-6 col-xl-3">
      <vuestic-widget class="info-widget brand-warning">
        <div class="info-widget-inner">
          <div class="stats">
              <div v-if="!loadedData" class="stats-number">{{'...'}}</div>
              <div v-if="loadedData" class="stats-number">{{uzoraka_danas - kompletirano_uzoraka}}</div>
              <div class="stats-title">{{'Neverificirano uzoraka'}}</div>
            </div>
        </div>
      </vuestic-widget>

     
    </div> -->

    <!-- <div class="col-md-6 col-xl-3">
      <vuestic-widget class="info-widget brand-info">
        <div class="info-widget-inner">
          <div class="stats">
            <div v-if="!loadedPatients" class="stats-number">
              <i class="ion ion-md-people stats-icon icon-wide"></i>
              {{'...'}}
            </div>
            <div v-if="loadedPatients" class="stats-number">
              <i class="ion ion-md-people stats-icon icon-wide" @click.prevent="PatientsData"></i>
              {{pacijenata}}
            </div>
            <div class="stats-title">{{'Prijema'}}</div>
          </div>
        </div>
      </vuestic-widget>

      <vuestic-modal-patients-data
        :show.sync="show"
        ref="staticModalPatientsData"
        cancelText="ZATVORI"
      >
        <div slot="title">
          <span>{{'Pregled broja pacijenata'}}</span>
        </div>
      </vuestic-modal-patients-data>
    </div> -->
  </div>
</template>

<script>
import { http } from "../../../config/config.js";

export default {
  name: "dashboard-info-widgets",

  data() {
    return {
      show: true,
      uzoraka_danas: 0,
      kompletirano_uzoraka: 0,
      kompletirano_testova: 0,
      pacijenata: 0,
      uslovLoadedData: false,
      uslovLoadedPatients: false,
      loadedData: false,
      loadedPatients: false
    };
  },

  mounted() {

    

    http
      .get(
        "/dashboard/info" +
          "?token=" +
          this.$store.state.token +
          "&site=" +
          this.$store.state.site,
        {}
      )
      .then(res => {
        if (res.data.json.empty != undefined) {
          this.uzoraka_danas = res.data.json.ukupnoUzoraka;
          this.kompletirano_uzoraka = res.data.json.obradjenUzorak;
          // this.kompletirano_testova = res.data.json.realizovanoTestova;
          this.kompletirano_testova = "-";
          var perCompleted = "-";
          // var perCompleted =
          //   res.data.json.realizovanoTestova / res.data.json.ukupnoTestova;
          // this.$refs.circleProgress.$data.value = Math.round(
          //   perCompleted * 100
          // );
          this.uslovLoadedData = true;
        }
      })
      .then(res => {
        if (this.uslovLoadedData) {
          this.loadedData = true;
        }
      });

    http
      .get(
        "dashboard/patients/" +
          "?token=" +
          this.$store.state.token +
          "&site=" +
          this.$store.state.site,
        {}
      )
      .then(res => {

        // console.log(res.data)
        if (res.data.jmbg != undefined) {
          // this.pacijenata = res.data.jmbg;
          this.pacijenata = res.data.jmbg[0];
          this.uslovLoadedPatients = true;
        }
      })
      .then(res => {
        if (this.uslovLoadedPatients) {
          this.loadedPatients = true;
        }
      });
  },
  methods: {
    PatientsData() {
      // this.$refs.staticModalPatientsData.open();
      console.log("Patients Dialog Disabled.")
    }
    
  }
};
</script>

<style lang="scss" scoped>
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
  font-size: 2.625rem;
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
</style>
