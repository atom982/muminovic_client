<template>
  <div class="widget" :class="{'no-header': !headerText}">
    <div style="position: relative;" class="widget-header" v-if="headerText">
      {{headerText}}
      <span
        v-if="datum != ''"
        :id="datum"
        :class="{'green': datum.trim() === today.trim(), 'red': datum.trim() != today.trim()}"
      >
        &nbsp{{' | '}}{{datum}}
        <i v-if="false" class="fa fa-check"></i>
      </span>
      <div
        style="position: absolute;right: 20px;"
        v-if="pagination && main"
        class="col-md-2 pull-right"
      >
        <div class="container">
          <div class="left">
            <i
              v-if="data_length > 1 && data_pid > data_min"
              @click.prevent="Prethodni()"
              class="fa fa-backward pull-left"
            >
              <span style="font-size:15px; color:#acb5be;">{{''}}</span>
            </i>

            <i
              v-if="data_length > 1 && data_pid === data_min"
              class="fa fa-step-backward pull-left stop"
              style="color:#e34a4a;"
            >
              <span style="font-size:15px; color:#acb5be;">{{''}}</span>
            </i>
          </div>
          <div
            @click.prevent="Find()"
            v-if="data_length > 1"
            :class="{'center green': datum.trim() === today.trim(), 'center red': datum.trim() != today.trim()}"
            style="font-size:17px;"
          >{{data_pid}}/{{data_length}}</div>
          <div class="right">
            <i
              v-if="data_length > 1 && data_length > data_pid"
              @click.prevent="Sljedeci()"
              class="fa fa-forward pull-right"
            >
              <span style="font-size:15px; color:#acb5be;">{{''}}</span>
            </i>

            <i
              v-if="data_length > 1 && data_length == data_pid && data_pid > 0"
              class="fa fa-step-forward pull-right stop"
              style="color:#e34a4a;"
            >
              <span style="font-size:15px; color:#acb5be;">{{''}}</span>
            </i>
          </div>
        </div>
      </div>
    </div>

    <div class="widget-body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { bus } from "../../../main";
export default {
  name: "vuestic-widget",

  props: {
    headerText: {
      type: String,
      default: ""
    },
    pagination: {
      type: Boolean,
      default: false
    },
    main: {
      type: Boolean,
      default: false
    },
    forward_disabled: {
      type: Boolean,
      default: false
    },
    backward_disabled: {
      type: Boolean,
      default: false
    },
    data_length: {
      type: Number,
      default: 0
    },
    data_min: {
      type: Number,
      default: 1
    },
    data_pid: {
      type: Number,
      default: 0
    },
    datum: {
      type: String,
      default: ""
    },
    today: {
      type: String,
      default: ""
    }
  },
  methods: {
    Sljedeci() {
      bus.$emit("Sljedeci");
    },
    Prethodni() {
      bus.$emit("Prethodni");
    },
    Find() {
      bus.$emit("Search");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../sass/_variables.scss";

.widget {
  background: $widget-bg;
  box-shadow: $widget-box-shadow;
  margin-bottom: $widget-mb;
  padding: 0;

  &.no-header {
    .widget-body {
      height: $widget-body-no-header-height;
    }
  }

  &.larger-padding {
    .widget-body {
      padding: $widget-larger-padding;
    }
  }

  &.no-h-padding {
    .widget-body {
      padding-left: 0;
      padding-right: 0;
    }
  }

  &.no-v-padding {
    .widget-body {
      padding-top: 0;
      padding-bottom: 0;
    }
  }

  &.brand-info {
    background-color: $brand-info;
    color: $white;
    box-shadow: $widget-info-shadow;
  }

  &.brand-danger {
    background-color: $brand-danger;
    color: $white;
    box-shadow: $widget-danger-shadow;
  }

  &.info-widget {
    border-top: $info-widget-border;

    &.brand-info {
      border-top-color: $brand-info;
    }

    &.brand-danger {
      border-top-color: $brand-danger;
    }
  }

  .widget-body {
    height: $widget-body-with-header-height;
    padding: $widget-padding;
  }

  .widget-header {
    height: $widget-header-height;
    padding: 0 $widget-padding;
    border-bottom: $widget-header-border;
    font-size: $font-size-larger;
    font-weight: 600;
    display: flex;
    align-items: center;
  }

  .icon-bar a {
    color: #fff;
    text-decoration: none;
  }

  .icon-bar a:hover {
    color: #4ae387;
  }

  i:hover {
    color: #4ae387 !important;
  }

  .stop:hover {
    color: #e34a4a !important;
  }

  .container {
    display: flex;
  }

  .left {
    width: 30%;
  }

  .center {
    flex-grow: 1;
    text-align: center;
  }

  .right {
    width: 30%;
  }

  .red {
    font-size: 15px;
    color: #e34a4a;
  }

  .green {
    font-size: 15px;
    color: #4ae387;
  }
}
</style>
