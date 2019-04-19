<template>
  <div class="vuestic-collapse">
    <div
      class="vuestic-collapse__header"
      :class="{'vuestic-collapse__header--no-header': noHeader}"
      @click="emitHeader($event)"
    >
      <template v-if="noHeader">
        <slot name="header"/>
      </template>

      <button
        v-else
        style="text-transform: none;"
        :class="{'vuestic-collapse__header__button btn btn-primary' : sample.status === 'ODOBREN' || sample.status === 'VERIFICIRAN', 
        'vuestic-collapse__header__button btn btn-warning': sample.status === 'U OBRADI',
        'vuestic-collapse__header__button btn btn-danger': sample.status === 'ZAPRIMLJEN',
        'vuestic-collapse__header__button btn btn-info': sample.status === 'REALIZOVAN'
      }"
      >
        <slot name="header"/>
        <span
          v-if="sample.status === 'VERIFICIRAN'"
          :id="id"
          style="font-size:12px; color:#f7cc36;"
        >
          {{' | '}}{{sample.status}}
          <i v-if="false" class="fa fa-check"></i>
        </span>
        <span
          v-if="sample.status != 'VERIFICIRAN'"
          :id="id"
          style="font-size:12px;"
        >{{' | '}}{{sample.status}}</span>

        <div id="block" class="col-md-7 pull-right" style="margin-right: 20px;">
          <!-- Left Side -->
          <!-- Više opcija -->
          <span
            v-show="show && !expanded && sample.status != 'ODOBREN' && sample.status != 'VERIFICIRAN'"
          >
            <i
              style="font-size: 20px;"
              class="fa fa-forward fa-lg icon-left wizard-back pull-left"
              id="forward"
              title="Više opcija"
            ></i>
          </span>
          <!-- Brisanje uzorka -->
          <span v-show="show && expanded && sample.status === 'ZAPRIMLJEN'">
            <i
              style="font-size: 20px;"
              class="fa fa-trash fa-lg icon-left wizard-back pull-left"
              id="trash"
              title="Brisanje uzorka"
            ></i>
          </span>
          <!--  -->
          <span
            v-show="show && expanded && sample.status === 'ZAPRIMLJEN'"
            style="diplay: inline-block; width: 25px;"
            class="col-md-3 pull-left"
          ></span>
          <!-- Uređivanje uzorka -->
          <span
            v-show="show && expanded && sample.status != 'ODOBREN' && sample.status != 'VERIFICIRAN'"
          >
            <i
              style="font-size: 20px;"
              class="fa fa-edit fa-lg icon-left wizard-back pull-left"
              id="edit"
              title="Uređivanje uzorka"
            ></i>
          </span>
          <!--  -->
          <span v-show="show" style="diplay: inline-block; width: 25px;" class="col-md-3 pull-left"></span>
          <!-- Unos komentara -->
          <span
            v-show="show && expanded && sample.status != 'ODOBREN' && sample.status != 'VERIFICIRAN'"
          >
            <i
              style="font-size: 20px;"
              class="fa fa-commenting fa-lg icon-left wizard-back pull-left"
              id="comment"
              title="Unos komentara"
            ></i>
          </span>
          <!--  -->
          <span v-show="show" style="diplay: inline-block; width: 25px;" class="col-md-3 pull-left"></span>
          <!-- Printanje naljepnice -->
          <span
            v-show="show && expanded && sample.status != 'ODOBREN' && sample.status != 'VERIFICIRAN'"
          >
            <i
              style="font-size: 20px;"
              class="fa fa-barcode fa-lg icon-left wizard-back pull-left"
              id="barcode"
              title="Printanje naljepnice"
            ></i>
          </span>
          <!--  -->
          <span v-show="show" style="diplay: inline-block; width: 25px;" class="col-md-3 pull-left"></span>
          <!-- Manje opcija -->
          <span
            v-show="show && expanded && sample.status != 'ODOBREN' && sample.status != 'VERIFICIRAN'"
          >
            <i
              style="font-size: 20px;"
              class="fa fa-step-backward fa-lg icon-left wizard-back pull-left"
              id="backward"
              title="Manje opcija"
            ></i>
          </span>
          <!-- Right side -->
          <!-- Odobrite rezultate -->
          <span v-if="show && sample.status != 'ODOBREN' && sample.status != 'VERIFICIRAN'">
            <i
              style="font-size: 20px;"
              class="fa fa-check fa-lg icon-right wizard-back pull-right"
              id="check"
              title="Odobrite rezultate"
            ></i>
          </span>
          <!-- Uklonite odobrenje -->
          <span v-if="show && sample.status === 'ODOBREN'">
            <i
              style="font-size: 20px;"
              class="fa fa-undo fa-lg icon-right wizard-back pull-right"
              id="undo"
              title="Uklonite odobrenje"
            ></i>
          </span>
          <!-- Prikaz nalaza -->
          <span v-if="show && sample.status === 'VERIFICIRAN' && sample.pdf_exists">
            <i
              style="font-size:20px;"
              class="fa fa-file-pdf-o fa-lg icon-right wizard-back pull-right"
              id="pdf"
              title="Prikaz nalaza"
            ></i>
          </span>
          <span v-if="!show && sample.status === 'VERIFICIRAN' && sample.pdf_exists">
            <i
              style="font-size:20px; color:#f7cc36;"
              class="fa fa-file-pdf-o fa-lg icon-right wizard-back pull-right"
              id="pdf"
              title="Prikaz nalaza"
            ></i>
          </span>
          <span v-if="show && sample.status === 'VERIFICIRAN' && !sample.pdf_exists">
            <i
              style="font-size:20px; color:#e34a4a;"
              class="fa fa-file-pdf-o fa-lg icon-right wizard-back pull-right"
              id="pdf"
              title="Nije dostupno"
            ></i>
          </span>
          <span v-if="!show && sample.status === 'VERIFICIRAN' && !sample.pdf_exists">
            <i
              style="font-size:20px; color:#e34a4a;"
              class="fa fa-file-pdf-o fa-lg icon-right wizard-back pull-right"
              id="pdf"
              title="Nije dostupno"
            ></i>
          </span>
          <!--  -->
          <span style="diplay: inline-block; width: 25px;" class="col-md-3 pull-right"></span>
          <!-- Verificirajte rezultate -->
          <span v-if="show && sample.status === 'ODOBREN'">
            <i
              style="font-size: 20px; color:#f7cc36;"
              class="fa fa-check-square-o fa-lg icon-right wizard-back pull-right"
              id="verify"
              title="Verificirajte rezultate"
            ></i>
          </span>
          <!-- Uklonite verifikaciju -->
          <span v-if="show && sample.status === 'VERIFICIRAN'">
            <i
              style="font-size:22px;"
              class="fa fa-lock fa-lg icon-right wizard-back pull-right"
              id="unlock"
              title="Uklonite verifikaciju"
            ></i>
          </span>
          <span v-if="!show && sample.status === 'VERIFICIRAN'">
            <i
              style="font-size:22px; color:#f7cc36;"
              class="fa fa-lock fa-lg icon-right wizard-back pull-right"
              id="unlock"
              title="Uklonite verifikaciju"
            ></i>
          </span>
          <!-- Sačuvajte rezultate -->
          <span v-if="show && sample.status != 'ODOBREN' && sample.status != 'VERIFICIRAN'">
            <i
              style="font-size: 20px;"
              class="fa fa-save fa-lg icon-right wizard-back pull-right"
              id="save"
              title="Sačuvajte rezultate"
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
  name: "vuestic-collapse-obrada",
  props: {
    value: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      default: ""
    },
    sample: {
      type: Object,
      default: () => ({})
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
      expanded: false,
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
  mounted() {
    bus.$on("SetClientHeight", sid => {
      if (this.$slots.header[0].elm.id === sid) {
        const bodyContent = this.$refs.collapseBody;
        this.clientHeight = this.$slots.body[0].elm.clientHeight + 5 + "px";
        this.onHeaderClick();
      }
    });
  },
  beforeDestroy() {
    bus.$off("SetClientHeight");
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
      // console.log(event.target.id)
      switch (event.target.id) {
        case "forward": // Više opcija
          this.expanded = true;
          break;
        case "trash": // Brisanje uzorka
          bus.$emit("trash", this.sample);
          break;
        case "edit": // Uređivanje uzorka
          bus.$emit("edit", this.sample);
          break;
        case "comment": // Unos komentara
          bus.$emit("comment", this.sample);
          break;
        case "barcode": // Printanje naljepnice
          bus.$emit("barcode", this.sample);
          break;
        case "backward": // Manje opcija
          this.expanded = false;
          break;
        case "save": // Sačuvajte rezultate
          bus.$emit("save", this.sample);
          break;
        case "check": // Odobrite rezultate
          bus.$emit("check", this.sample);
          break;
        case "verify": // Verificirajte rezultate
          bus.$emit("verify", this.sample);
          break;
        case "undo": // Uklonite odobrenje
          bus.$emit("undo", this.sample);
          break;
        case "unlock": // Uklonite verifikaciju
          bus.$emit("unlock", this.sample);
          if (!this.show) {
            bus.$emit("Sample", this.sample);
          } else {
          }
          break;
        case "pdf": // Prikaz nalaza
          bus.$emit("pdf", this.sample);
          break;
        case "block":
          break;
        case "":
          bus.$emit("Sample", this.sample);
          break;
        default:
          bus.$emit("Sample", this.sample);
          break;
      }
    },
    onHeaderClick() {
      // console.log(this.sample)
      this.toggle();
      this.accordion.onChildChange(this, this.show);
    },
    toggle() {
      this.show ? this.collapse() : this.expand();
    }
  }
};
</script>

<style lang="scss" scoped>
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

i:hover {
  color: #4ae387 !important;
}
</style>
