<template>
  <div class="form-elements">
    <div class="row">
      <div class="col-md-12">
        <vuestic-widget headerText="Opšte postavke - Mjesta">
          <!-- <form> -->
          <div class="row">
            <!-- <div class="col-md-12"> -->
            <div class="col-md-5">
              <fieldset>
                <div class="form-group with-icon-left">
                  <div class="input-group">
                    <input
                      id="input-icon-left"
                      title=" "
                      v-model="mjesto"
                      name="input-icon-left"
                      required
                    >
                    <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                    <label class="control-label" for="input-icon-left">{{'Unesite mjesto'}}</label>
                    <i class="bar"></i>
                  </div>
                </div>
                <button class="btn btn-sm btn-primary" @click.prevent="dodajPostavku">
                  <span class="fa fa-save"></span>
                  {{ ' SAČUVAJ'}}
                </button>
              </fieldset>
              <hr>
              <a @click="prikaziPostavke" href="#">{{prikaziTekst}}</a>
            </div>
            <div class="col-md-7" v-if="!ifTrenutnePostavke">
              <div class="table-responsive">
                <table class="table table-striped first-td-padding">
                  <thead>
                    <tr>
                      <td>{{"Mjesto"}}</td>
                      <td>{{"Akcija"}}</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="element in mjesta">
                      <td>{{element}}</td>
                      <td v-if="element != 'NEPOZNATO'">
                        <button
                          title="Brisanje zapisa"
                          v-bind:id="element"
                          class="btn btn-danger btn-micro"
                          @click="brisanjeMjesta($event)"
                        >
                          <span v-bind:id="element" class="fa fa-trash-o"></span>
                          {{ 'IZBRIŠI' }}
                        </button>
                      </td>
                      <td v-if="element === 'NEPOZNATO'">
                        <button
                          disabled
                          title="Brisanje zapisa nije dozvoljeno"
                          v-bind:id="element"
                          class="btn btn-danger btn-micro"
                        >
                          <span v-bind:id="element" class="fa fa-trash-o"></span>
                          {{ 'IZBRIŠI' }}
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <vuestic-alert v-if="dataUslov" type="warning" :withCloseBtn="false">
                  <span>{{dataAvailable}}</span>
                </vuestic-alert>
                <vuestic-alert v-if="dataUslovDanger" type="danger" :withCloseBtn="false">
                  <span>{{dataAvailable}}</span>
                </vuestic-alert>
              </div>
            </div>
            <!-- </div> -->
          </div>
          <!-- </form> -->
        </vuestic-widget>
        <!--  <vuestic-widget headerText="Trenutne postavke - Mjesta">
          <hr>
          <div class="row">
            <div class="col-md-3"></div>
            <div class="col-md-6">
              <button class="btn btn-secondary" @click.prevent="povratak">
                <span class="fa fa-backward"></span>
                {{ ' POVRATAK'}}
              </button>
            </div>
          </div>
        </vuestic-widget>-->
      </div>
    </div>
  </div>
</template>

<script>
import { http } from "../../../../config/config.js";

export default {
  data() {
    return {
      mjesto: "",
      mjesta: [],

      ifButton: true,
      ifTrenutnePostavke: false,
      ifPostavkeMjesta: true,
      prikaziTekst: "Trenutne postavke",
      dataAvailable: "",
      dataUslov: false,
      dataUslovDanger: false,
      tabelaUslov: false,
      toastText: "",
      toastIcon: "",
      toastPosition: "",
      toastDuration: 2500,
      isToastFullWidth: false,
      className: ""
    };
  },
  name: "mjesto",

  created: function() {
    this.dohvatiMjesta();
  },

  methods: {
    dohvatiMjesta: function() {
      http
        .post("/postavke/sajtovi/" + this.$store.state.site, {
          token: this.$store.state.token
        })
        .then(res => {
          if (res.data.sajt.mjesta != undefined) {
            this.mjesta = res.data.sajt.mjesta.sort(function(a, b) {
              return a.toLowerCase() == b.toLowerCase()
                ? 0
                : +(a.toLowerCase() > b.toLowerCase()) || -1;
            });
          }
        })
        .then(res => {});
    },
    prikaziPostavke: function() {
      this.mjesto = "";
      this.ifPostavkeMjesta = !this.ifPostavkeMjesta;
      this.ifTrenutnePostavke = !this.ifTrenutnePostavke;

      http
        .post("/postavke/sajtovi/" + this.$store.state.site, {
          token: this.$store.state.token
        })
        .then(res => {
          if (res.data.success === false) {
            this.dataAvailable = "Greška prilikom čitanja iz baze.";
            this.dataUslovDanger = true;
            this.dataUslov = false;
            this.tabelaUslov = false;
          } else {
            this.mjesta = res.data.sajt.mjesta.sort(function(a, b) {
              return a.toLowerCase() == b.toLowerCase()
                ? 0
                : +(a.toLowerCase() > b.toLowerCase()) || -1;
            });

            if (this.mjesta.length > 0) {
              this.dataAvailable = "";
              this.dataUslov = false;
              this.dataUslovDanger = false;
              this.tabelaUslov = true;
            }

            if (this.mjesta.length <= 0) {
              this.dataAvailable = "Nema dostupnih podataka.";
              this.dataUslovDanger = false;
              this.dataUslov = true;
              this.tabelaUslov = false;
            }
          }
        });
    },

    brisanjeMjesta: function(event) {
      this.$dialog
        .confirm("Jeste li sigurni da želite obrisati zapis?", {
          type: "hard",
          html: true,
          verification: "Da"
        })
        .then(() => {
          http
            .post("postavke/mjesta/delete", {
              mjesto: event.target.id,
              token: this.$store.state.token,
              site: this.$store.state.site
            })
            .then(res => {
              if (res.data.success === false) {
                this.toastText = "Greška prilikom brisanja!";
                this.toastIcon = "fa-remove";
                this.toastPosition = "top-right";
                this.className = "vuestic-toast-danger";

                this.showToast(this.toastText, {
                  icon: this.toastIcon,
                  position: this.toastPosition,
                  duration: this.toastDuration,
                  fullWidth: this.isToastFullWidth,
                  className: this.className
                });
              } else {
                this.toastText = "Zapis uspješno obrisan!";
                this.toastIcon = "fa-check";
                this.toastPosition = "top-right";
                this.className = "vuestic-toast-primary";

                this.showToast(this.toastText, {
                  icon: this.toastIcon,
                  position: this.toastPosition,
                  duration: this.toastDuration,
                  fullWidth: this.isToastFullWidth,
                  className: this.className
                });
                this.prikaziPostavke();
                this.prikaziPostavke();
              }
            });
        })
        .catch(function() {});
    },

    dodajPostavku: function() {
      var item = true;
      if (this.mjesto.toUpperCase().trim() === "") {
        item = false;
        this.toastText = "Unesite mjesto!";
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

      if (this.mjesta != undefined) {
        this.mjesta.forEach(element => {
          if (element == this.mjesto.toUpperCase().trim()) {
            item = false;
            this.toastText = "Mjesto već postoji!";
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
            return;
          }
        });
      }

      if (item) {
        http
          .post("postavke/mjesto/save", {
            email: this.$store.state.userId,
            mjesto: this.mjesto.toUpperCase().trim(),
            token: this.$store.state.token,
            site: this.$store.state.site
          })
          .then(res => {
            if (res.data.success === false) {
              this.toastText = "Greška prilikom upisa!";
              this.toastIcon = "fa-remove";
              this.toastPosition = "top-right";
              this.className = "vuestic-toast-danger";

              this.showToast(this.toastText, {
                icon: this.toastIcon,
                position: this.toastPosition,
                duration: this.toastDuration,
                fullWidth: this.isToastFullWidth,
                className: this.className
              });
            } else {
              this.toastText = "Unos uspješno obavljen!";
              this.toastIcon = "fa-check";
              this.toastPosition = "top-right";
              this.className = "vuestic-toast-primary";

              this.showToast(this.toastText, {
                icon: this.toastIcon,
                position: this.toastPosition,
                duration: this.toastDuration,
                fullWidth: this.isToastFullWidth,
                className: this.className
              });
              this.prikaziPostavke();
              this.prikaziPostavke();
            }
          });
      }
    },

    povratak: function() {
      this.ifTrenutnePostavke = !this.ifTrenutnePostavke;
      this.ifPostavkeMjesta = !this.ifPostavkeMjesta;
    }
  }
};
</script>

<style lang="scss">
@import "../../../sass/variables";
@import "../../../sass/toasts";
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
