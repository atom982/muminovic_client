<template>
  <div class="vuestic-collapse">
    <div
      class="vuestic-collapse__header"
      :class="{'vuestic-collapse__header--no-header': noHeader}"
      @click="emitHeader($event)"
      :id="id"
    >
      <template v-if="noHeader">
        <slot name="header"/>
      </template>

      <button
        v-else
        :class="{'vuestic-collapse__header__button btn btn-secondary' : final && final_pdf,
      'vuestic-collapse__header__button btn btn-secondary-danger' : final && !final_pdf }"
      >
        <slot name="header"/>
        <span style="font-size:12px; color:#f7cc36;">{{' | '}}{{pacijent}}</span>
        <div class="col-md-7 pull-right" style="margin-right: 20px;">
          <span>
            <i
              v-if="final_pdf"
              style="font-size: 20px; color:#f7cc36;"
              class="fa fa-file-pdf-o fa-lg icon-right wizard-back pull-right"
              id="nalaz"
            ></i>
            <i
              v-if="!final_pdf"
              style="font-size: 20px; color:#e34a4a;"
              class="fa fa-file-pdf-o fa-lg icon-right wizard-back pull-right"
              id="nalaz"
            ></i>
          </span>
        </div>
      </button>
    </div>

    <div class="vuestic-collapse__body" ref="collapseBody">
      <slot name="body"/>
    </div>
  </div>
</template>

<script>
import { bus } from "../../main";

export default {
  name: "vuestic-collapse-nalaz",
  props: {
    value: {
      type: Boolean,
      default: false
    },
    samples: {
      type: Array,
      default: function() {
        return [];
      }
    },
    lokacija: {
      type: Object,
      default: function() {
        return {};
      }
    },
    final: {
      type: Boolean,
      default: true
    },
    final_pdf: {
      type: Boolean,
      default: true
    },
    pdf: {
      type: String,
      default: ""
    },
    pacijent: {
      type: String,
      default: ""
    },
    id: {
      type: String,
      default: ""
    },
    noHeader: Boolean
  },
  inject: {
    accordion: {
      default: () => ({
        onChildChange: () => {}
      })
    }
  },
  data() {
    return {
      show: this.value,
      clientHeight: ""
    };
  },
  watch: {
    show(show) {
      if (show) {
        this.expand();
      } else {
        this.collapse();
      }
    },
    clientHeight() {}
  },
  methods: {
    expand() {
      const bodyContent = this.$refs.collapseBody;
      bodyContent.style.height = this.clientHeight;
      this.show = true;
    },
    collapse() {
      const bodyContent = this.$refs.collapseBody;
      bodyContent.style.height = 0;
      this.show = false;
    },
    emitHeader(event) {
      var data = {};
      data.samples = this.samples;
      data.pdf = this.pdf;
      data.final = this.final;
      data.final_pdf = this.final_pdf;
      bus.$emit("Nalaz", data);
    },
    onHeaderClick() {
      this.toggle();
      this.accordion.onChildChange(this, this.show);
    },
    toggle() {
      this.show ? this.collapse() : this.expand();
    }
  }
};
</script>

<style lang="scss">
.vuestic-collapse {
  & + & {
    margin-top: 8px;
  }
  &__body {
    height: 0;
    transition: height 0s;
    margin-top: 20px;
    background: #ffff;
    overflow: hidden;
  }
  &__header {
    &__button {
      width: 100%;
      padding-left: 1.5rem;
      border-radius: 0;
      text-align: left;
    }
    &--no-header {
      margin-bottom: 1rem;
    }
  }
  .vuestic-collapse__body {
    margin-top: 0;
  }
}

.icon-bar a {
  color: #fff;
  text-decoration: none;
}

.icon-bar a:hover {
  color: #4ae387;
}
</style>
