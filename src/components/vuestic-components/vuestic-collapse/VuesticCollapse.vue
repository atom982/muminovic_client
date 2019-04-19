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
        :class="{'vuestic-collapse__header__button btn btn-primary' : odobren, 
      'vuestic-collapse__header__button btn btn-warning': u_obradi,
      'vuestic-collapse__header__button btn btn-danger': zaprimljen,
      'vuestic-collapse__header__button btn btn-info': realizovan}"
      >
        <!-- <button v-else class="vuestic-collapse__header__button btn btn-primary"> -->
        <slot name="header"/>
        <span :id="id" style="font-size:12px">{{' | '}}{{status}}</span>

        <div class="col-md-7 pull-right">
          <span v-if="show && vise && (zaprimljen || u_obradi || realizovan)">
            <i
              title="Više opcija"
              class="fa fa-forward fa-lg icon-left wizard-back pull-left"
              id="forward"
            ></i>
          </span>
          <span v-if="show && !vise && (zaprimljen || u_obradi || realizovan)">
            <i
              title="Obrišite uzorak"
              class="fa fa-trash fa-lg icon-left wizard-back pull-left"
              id="trash"
            ></i>
          </span>
          <span style="diplay: inline-block; width: 25px;" class="col-md-3 pull-left"></span>
          <span v-if="show && !vise && (zaprimljen || u_obradi || realizovan)">
            <i
              title="Uredite uzorak"
              class="fa fa-edit fa-lg icon-left wizard-back pull-left"
              id="plus"
            ></i>
          </span>
          <span style="diplay: inline-block; width: 25px;" class="col-md-3 pull-left"></span>
          <span v-if="show && !vise && (zaprimljen || u_obradi || realizovan)">
            <i
              title="Unesite komentar"
              class="fa fa-commenting fa-lg icon-left wizard-back pull-left"
              id="commenting"
            ></i>
          </span>
          <span style="diplay: inline-block; width: 25px;" class="col-md-3 pull-left"></span>
          <span v-if="show && !vise && (zaprimljen || u_obradi || realizovan)">
            <i
              title="Printajte naljepnicu"
              class="fa fa-barcode fa-lg icon-left wizard-back pull-left"
              id="barcode"
            ></i>
          </span>
          <span style="diplay: inline-block; width: 25px;" class="col-md-3 pull-left"></span>
          <span v-if="show && !vise && (zaprimljen || u_obradi || realizovan)">
            <i
              title="Zatvorite izbornik"
              class="fa fa-step-backward fa-lg icon-left wizard-back pull-left"
              id="step-backward"
            ></i>
          </span>
          <span v-if="show && !odobren">
            <i
              title="Odobrite rezultate"
              class="fa fa-check fa-lg icon-right wizard-back pull-right"
              id="check"
            ></i>
          </span>          
          <span v-if="show && odobren">
            <i
              title="Vratite u rad"
              class="fa fa-undo fa-lg icon-right wizard-back pull-right"
              id="undo"
            ></i>
          </span>
          <span style="diplay: inline-block; width: 25px;" class="col-md-3 pull-right"></span>
          <span v-if="show && odobren">
            <!-- #4ab2e3 -->
            <i style="color: #f7cc36;"
              title="Verifikacija nalaza"
              class="fa fa-file-pdf-o fa-lg icon-right wizard-back pull-right"
              id="file"
            ></i>
          </span>
          <span v-if="show && (zaprimljen || u_obradi || realizovan)">
            <i
              title="Sačuvajte izmjene"
              class="fa fa-save fa-lg icon-right wizard-back pull-right"
              id="save"
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
import { bus } from "../../../main";

export default {
  name: "vuestic-collapse",
  props: {
    value: {
      type: Boolean,
      default: false
    },
    noHeader: Boolean,
    id: {
      type: String,
      default: ""
    },
    ide: {
      type: String,
      default: ""
    }
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
      mutableId: this.id,
      clientHeight: "",
      odobren: false,
      u_obradi: false,
      zaprimljen: false,
      realizovan: false,
      enable_toggle: false,
      vise: true,
      status: ""
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
    // console.log(this.$slots.header[0].elm.id)
    switch (this.$slots.header[0].elm.id) {
      case "ZAPRIMLJEN":
        this.zaprimljen = true;
        this.status = "ZAPRIMLJEN";
        break;
      case "U OBRADI":
        this.u_obradi = true;
        this.status = "U OBRADI";
        break;
      case "REALIZOVAN":
        this.realizovan = true;
        this.status = "REALIZOVAN";
        break;
      case "ODOBREN":
        this.odobren = true;
        this.status = "ODOBREN";
        break;
    }
    bus.$on("SetClientHeight", sid => {
      // console.log(this.$slots.header[0].children[0])
      if (this.$slots.header[0].children[0].text.trim() === sid) {
        const bodyContent = this.$refs.collapseBody;
        this.clientHeight = this.$slots.body[0].elm.clientHeight + 5 + "px";
        // console.log(this.$slots.header[0].children[0].text)
        this.onHeaderClick();
      }
    });
    bus.$on("SetClass", data => {
      // console.log('SetClass')
      data.forEach(element => {
        if (this.$slots.header[0].children[0].text.trim() === element.sid) {
          // console.log(element.status)
          this.zaprimljen = false;
          this.u_obradi = false;
          this.realizovan = false;
          this.odobren = false;
          switch (element.status) {
            case "ZAPRIMLJEN":
              this.zaprimljen = true;
              this.status = "ZAPRIMLJEN";
              break;
            case "U OBRADI":
              this.u_obradi = true;
              this.status = "U OBRADI";
              break;
            case "REALIZOVAN":
              this.realizovan = true;
              this.status = "REALIZOVAN";
              break;
            case "ODOBREN":
              this.odobren = true;
              this.status = "ODOBREN";
              break;
          }
        }
      });
    });
  },
  beforeDestroy() {
    bus.$off("SetClientHeight");
    bus.$off("SetClass");
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
        case "check":
          this.enable_toggle = false;
          this.vise = true;
          bus.$emit("Check");
          break;
        case "save":
          this.enable_toggle = false;
          bus.$emit("Save");
          break;
        case "undo":
          this.enable_toggle = false;
          bus.$emit("Undo");
          break;
        case "file":
          this.enable_toggle = false;         
          bus.$emit("File", this.ide);
          break;
        case "forward":
          this.enable_toggle = false;
          this.vise = false;
          // bus.$emit('Forward')
          break;
        case "step-backward":
          this.enable_toggle = false;
          this.vise = true;
          // bus.$emit('Backward')
          break;
        case "trash":
          this.enable_toggle = false;
          bus.$emit("Trash");
          break;
        case "plus":
          this.enable_toggle = false;
          bus.$emit("Plus");
          break;
        case "commenting":
          this.enable_toggle = false;
          bus.$emit("Commenting");
          break;
        case "barcode":
          this.enable_toggle = false;
          bus.$emit("Barcode");
          break;
        case "":
          this.enable_toggle = false;
          break;
        default:
          this.enable_toggle = true;
          bus.$emit("OdaberiUzorak", this.mutableId);
          break;
      }
    },
    onHeaderClick() {
      if (this.enable_toggle) {
        this.vise = true;
        this.toggle();
        this.accordion.onChildChange(this, this.show);
      }
    },
    // Public
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
    background: #ffff; // $light-gray
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
</style>
