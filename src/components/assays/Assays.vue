<template>
  <div class="form-elements">
    <div class="row">
      <div class="col-md-12">
        <vuestic-widget headerText="Assays">
          <div>
            <div class="form-group">
              <div>
                <input placeholder="Šifra testa" v-model="inputValue">
                <i class="bar" :style="'width: ' + 200 + 'px'"/>
              </div>
            </div>
          </div>

          <div v-if="objLabAssay.length && objAnaAssay.length" class="row">
            <div class="col-md-6">
              <div class="form-group">
                <div class="input-group">
                  <textarea
                    style="height:500px;"
                    type="text"
                    id="labassay"
                    v-model="objLabAssay"
                    required
                  ></textarea>
                  <label class="control-label" for="labassay">
                    {{'LabAssay'
                    }}
                  </label>
                  <i class="bar"></i>
                </div>
              </div>
            </div>

            <div class="col-md-6">
              <div class="form-group">
                <div class="input-group">
                  <textarea
                    style="height:500px;"
                    type="text"
                    id="anaassay"
                    v-model="objAnaAssay"
                    required
                  ></textarea>
                  <label class="control-label" for="anaassay">
                    {{'AnaAssay'
                    }}
                  </label>
                  <i class="bar"></i>
                </div>
              </div>
            </div>
          </div>

          <div v-if="objLabAssay.length && objAnaAssay.length" class="row">
            <div class="col-md-3"></div>
            <div class="col-md-6">
              <button class="btn btn-primary btn-sm pull-right" @click.prevent="Save()">
                <span class="fa fa-save"></span>
                {{ ' SAČUVAJ'}}
              </button>
            </div>
          </div>
        </vuestic-widget>
      </div>
    </div>
  </div>
</template>

<script>
import { http } from "../../../config/config.js";

export default {
  data() {
    return {
      labassays: [],
      anaassays: [],
      labassay: {},
      anaassay: {},
      objLabAssay: "",
      objAnaAssay: "",
      inputValue: "",
      sifra: ""
    };
  },
  name: "doktor",

  created: function() {
    this.findLabAssays();
    this.findAnaAssays();
  },
  mounted() {},

  watch: {
    inputValue: function() {
      if (this.inputValue.length > 15) {
        this.inputValue = this.inputValue.slice(0, 15);
      }

      if (this.inputValue.length === 15) {
        this.labassays.forEach(element => {
          if (this.inputValue == element.sifra) {
            this.labassay = element;
            this.objLabAssay = JSON.stringify(this.labassay, undefined, 2);
          }
        });

        this.anaassays.forEach(element => {
          if (this.labassay._id == element.test) {
            this.anaassay = element;
            this.objAnaAssay = JSON.stringify(this.anaassay, undefined, 2);
          }
        });
      }

      if (this.inputValue.length < 15) {
        this.labassay = {};
        this.anaassay = {};
        this.objLabAssay = {};
        this.objAnaAssay = {};
      }
    }
  },
  methods: {
    findLabAssays() {
      http
        .get(
          "labassays/list?token=" +
            this.$store.state.token +
            "&site=" +
            this.$store.state.site,
          {}
        )
        .then(res => {
          this.labassays = [];
          this.labassays = res.data.labassays;
        });
    },

    findAnaAssays() {
      http
        .get(
          "anaassays/list?token=" +
            this.$store.state.token +
            "&site=" +
            this.$store.state.site,
          {}
        )
        .then(res => {
          this.anaassays = [];
          this.anaassays = res.data.anaassays;
        });
    },

    Refresh() {
      this.labassay = {};
      this.anaassay = {};

      this.findLabAssays();
      this.findAnaAssays();

      this.inputValue = "";
      this.inputValue = this.sifra;
    },

    Save() {
      this.sifra = this.inputValue;
      this.labassay = JSON.parse(this.objLabAssay);
      this.anaassay = JSON.parse(this.objAnaAssay);

      http
        .post("labassay/edit", {
          labassay: this.labassay,
          token: this.$store.state.token,
          site: this.$store.state.site
        })
        .then(res => {
          // console.log(res.data)
          if (res.data.success) {
            http
              .post("anaassay/edit", {
                anaassay: this.anaassay,
                token: this.$store.state.token,
                site: this.$store.state.site
              })
              .then(res => {
                // console.log(res.data)
                this.Refresh();
              });
          } else {
          }
        });
    }
  }
};
</script>

<style lang="scss">
@import "../../sass/variables";
@import "../../sass/toasts";
.abc-checkbox,
.abc-radio {
  display: flex !important;
  justify-content: flex-start;
}

input[type="checkbox"]:disabled + label,
input[type="radio"]:disabled + label,
input[type="checkbox"]:disabled,
input[type="radio"]:disabled {
  cursor: not-allowed;
}
</style>
