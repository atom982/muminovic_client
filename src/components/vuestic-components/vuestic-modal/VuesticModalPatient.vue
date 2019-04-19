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

                  <i
                    class="ion ion-md-close close-modal"
                    v-if="closeIconShown"
                    @click.prevent="cancel"
                  />
                </slot>
              </div>
              <!--Container-->
              <div class="modal-body">
                <slot></slot>
                <form>
                  <div class="row">
                    <div class="col-md-3"></div>
                    <div class="col-md-6">
                      <fieldset>
                        <div class="form-group with-icon-left">
                          <div class="input-group">
                            <input
                              id="input-icon-left"
                              title=" "
                              v-model="jmbg"
                              name="input-icon-left"
                              required
                            >
                            <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                            <label
                              class="control-label"
                              for="input-icon-left"
                            >{{'pacijenti.unos.UnosPacijenta.trnslr002' | translate}}</label>
                            <i class="bar"></i>
                          </div>
                        </div>
                        <div v-if="postoji">
                          <h5>Uneseni JMBG je već registriran!</h5>

                          <h5>
                            Pacijent:
                            <span style="color: #e34a4a;">{{imePrezime}}</span>
                          </h5>

                          <br>
                        </div>
                        <div v-if="!postoji" class="form-group with-icon-left">
                          <div class="input-group">
                            <input
                              id="input-icon-left"
                              title=" "
                              v-model="ime"
                              name="input-icon-left"
                              required
                            >
                            <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                            <label
                              class="control-label"
                              for="input-icon-left"
                            >{{'pacijenti.unos.UnosPacijenta.trnslr003' | translate}}</label>
                            <i class="bar"></i>
                          </div>
                        </div>
                        <div v-if="!postoji" class="form-group with-icon-left">
                          <div class="input-group">
                            <input
                              id="input-icon-left"
                              title=" "
                              v-model="prezime"
                              name="input-icon-left"
                              required
                            >
                            <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                            <label
                              class="control-label"
                              for="input-icon-left"
                            >{{'pacijenti.unos.UnosPacijenta.trnslr004' | translate}}</label>
                            <i class="bar"></i>
                          </div>
                        </div>
                        <vuestic-simple-select
                          v-if="!postoji"
                          :label="'pacijenti.unos.UnosPacijenta.trnslr005' | translate"
                          v-model="spol"
                          name="spol"
                          :required="true"
                          title=" "
                          ref="spolSelect"
                          v-bind:options="spolovi"
                        ></vuestic-simple-select>
                        <vuestic-simple-select
                          v-if="!postoji"
                          label="Mjesto stanovanja"
                          v-model="chosenAdress"
                          name="adresa"
                          :required="true"
                          title=" "
                          ref="adresaSelect"
                          v-bind:options="citiesList"
                        ></vuestic-simple-select>
                        <div v-if="!postoji" class="form-group with-icon-left">
                          <div class="input-group">
                            <input
                              id="input-icon-left"
                              title=" "
                              v-model="telefon"
                              name="input-icon-left"
                              required
                            >
                            <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                            <label
                              class="control-label"
                              for="input-icon-left"
                            >{{'pacijenti.unos.UnosPacijenta.trnslr008' | translate}}</label>
                            <i class="bar"></i>
                          </div>
                        </div>
                        <div v-if="!postoji" class="form-group with-icon-left">
                          <div class="input-group">
                            <input
                              id="input-icon-left"
                              title=" "
                              v-model="email"
                              name="input-icon-left"
                              required
                            >
                            <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                            <label
                              class="control-label"
                              for="input-icon-left"
                            >{{'pacijenti.unos.UnosPacijenta.trnslr009' | translate}}</label>
                            <i class="bar"></i>
                          </div>
                        </div>
                      </fieldset>
                    </div>
                  </div>
                </form>
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
                  <button
                    type="button"
                    v-if="!noButtons && !postoji"
                    :class="okClass"
                    @click="ok"
                    :disabled="okDisabled"
                  >{{ okText }}</button>
                  <button
                    type="button"
                    v-if="!noButtons && postoji"
                    class="btn btn-secondary-info btn-sm"
                    @click="prijem"
                  >
                    <span class="fa fa-flask"></span> PRIJEM
                  </button>
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
import { bus } from "../../../main";
import router from "../../../router";
import { http } from "../../../../config/config.js";

export default {
  name: "vuestic-modal-patient",
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
      default: false
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
      duration: 500,
      jmbg: "",
      ime: "",
      prezime: "",
      spol: "",
      spolovi: ["MUŠKI", "ŽENSKI"],
      duhan: "",
      duhani: ["NE", "DA"],
      dijabetes: "",
      dijabetesi: ["NE", "DA"],
      telefon: "",
      email: "",
      citiesList: [],
      chosenAdress: "",
      chosenAdressTmp: "",
      uspjesno: false,
      toastText: "",
      toastIcon: "",
      toastPosition: "",
      toastDuration: 2500,
      isToastFullWidth: false,
      className: "",
      maticni: "",
      postoji: false,
      pacijentID: "",
      imePrezime: ""
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
    if (this.show) {
      document.body.className += " modal-open";
    }
  },
  mounted() {
    this.dohvatiMjesta();
  },
  beforeDestroy() {
    document.body.className = document.body.className.replace(
      /\s?modal-open/,
      ""
    );
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
    jmbg: function() {
      // if (this.jmbg.length > 9) {
      //   if (this.jmbg[9] === '0' || this.jmbg[9] === '1' || this.jmbg[9] === '2' || this.jmbg[9] === '3' || this.jmbg[9] === '4') {
      //     this.spol = 'MUŠKI'
      //   } else
      //   if (this.jmbg[9] === '5' || this.jmbg[9] === '6' || this.jmbg[9] === '7' || this.jmbg[9] === '8' || this.jmbg[9] === '9') {
      //     this.spol = 'ŽENSKI'
      //   } else {
      //     this.spol = ''
      //   }
      // } else if (this.jmbg.length < 10) {
      //   this.spol = ''
      // }

      if (this.jmbg.length < 13) {
        this.postoji = false;
        this.pacijentID = "";
        this.imePrezime = "";
      }

      if (this.jmbg.length === 13) {
        http
          .post("/uzorci/patient", {
            jmbg: this.jmbg,
            token: this.$store.state.token,
            site: this.$store.state.site
          })
          .then(res => {
            if (res.data.success) {
              // console.log(res.data)
              this.postoji = true;
              this.pacijentID = res.data.pacijent._id;
              this.imePrezime =
                res.data.pacijent.ime + " " + res.data.pacijent.prezime;
            } else {
              this.postoji = false;
              this.pacijentID = "";
              this.imePrezime = "";
            }
          });
      }
      if (this.jmbg.length > 13) {
        this.jmbg = this.jmbg.slice(0, 13);
      }
    }
  },
  methods: {
    listenKeyUp(event) {
      if (event.key === "Escape") {
        this.cancel();
      }
    },
    ok() {
      this.$emit("ok");
      this.dodajPacijenta();
      if (this.uspjesno) {
        this.show = false;
        window.removeEventListener("keyup", this.listenKeyUp);
      }
    },
    prijem() {
      router.push("/samples/entry/" + this.pacijentID);
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
      this.show = true;
      window.addEventListener("keyup", this.listenKeyUp);
    },
    close() {
      this.show = false;
      window.removeEventListener("keyup", this.listenKeyUp);
    },
    dohvatiMjesta: function() {
      http
        .post("/postavke/sajtovi/" + this.$store.state.site, {
          token: this.$store.state.token
        })
        .then(res => {
          if (res.data.sajt.mjesta != undefined) {
            res.data.sajt.mjesta.forEach(element => {
              if (element != "NEPOZNATO") {
                this.citiesList.push(element);
              }
            });
          }
        })
        .then(res => {
          this.citiesList.sort(function(a, b) {
            return a.toLowerCase() == b.toLowerCase()
              ? 0
              : +(a.toLowerCase() > b.toLowerCase()) || -1;
          });
          // console.log(this.citiesList);
        });
    },
    validateEmail: function(mail) {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        return true;
      } else {
        return false;
      }
    },
    validatePhone: function(telefon) {
      // if (/^\d{9}$/.test(String(telefon)) || /^\d{10}$/.test(String(telefon)) || /^[0]{2}[3]{1}[8]{1}[7]{1}\d{8}$/.test(String(telefon)) || /^[0]{2}[3]{1}[8]{1}[7]{1}\d{9}$/.test(String(telefon)) || /^[+]{1}[3]{1}[8]{1}[7]{1}\d{8}$/.test(String(telefon)) || /^[+]{1}[3]{1}[8]{1}[7]{1}\d{9}$/.test(String(telefon))) {
      //   return (true)
      // } else {
      //   return (false)
      // }
      // console.log('Validacija telefonskog broja.')
      return true;
    },
    getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    },
    dodajPacijenta() {
      if (this.jmbg.length === 7 && this.jmbgValidateP(this.jmbg)) {
        // console.log("Privremeni matični broj.");
        var jmbgPost = this.jmbg + this.getRandomInt(10000, 99999) + "P";
      } else {
        var jmbgPost = this.jmbg;
      }
      var item = true;

      if (
        this.jmbg.trim() === "" ||
        this.ime.trim() === "" ||
        this.prezime.trim() === "" ||
        this.spol.trim() === ""
      ) {
        item = false;
        this.toastText = this.$t("pacijenti.unos.UnosPacijenta.trnslr011"); // Polja JMBG, Ime, Prezime i Spol su obavezna!
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
      } else if (!this.jmbgValidate(jmbgPost)) {
        item = false;
        this.toastText = this.$t("pacijenti.unos.UnosPacijenta.trnslr012"); // JMBG mora biti validan 13 cifreni broj!
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
      } else if (this.email.trim() != "" && !this.validateEmail(this.email)) {
        item = false;
        this.toastText = this.$t("pacijenti.unos.UnosPacijenta.trnslr013"); // Email adresa nije validna!
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
      } else if (
        this.telefon.trim() != "" &&
        !this.validatePhone(this.telefon)
      ) {
        item = false;
        this.toastText = this.$t("pacijenti.unos.UnosPacijenta.trnslr014"); // Telefonski broj nije validan!
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
      } else {
        http
          .post("pacijenti/unos/find", {
            jmbg: this.jmbg,
            token: this.$store.state.token,
            site: this.$store.state.site
          })
          .then(res => {
            if (res.data.message === "Pacijent postoji") {
              item = false;
              this.toastText = this.$t(
                "pacijenti.unos.UnosPacijenta.trnslr015"
              ); // Pacijent već postoji!
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
            } else {
            }
          })
          .then(res => {
            if (item) {
              if (this.duhan === "") {
                this.duhan = "NEPOZNATO";
              }
              if (this.dijabetes === "") {
                this.dijabetes = "NEPOZNATO";
              }
              if (this.telefon === "") {
                this.telefon = "NEPOZNATO";
              }
              if (this.email === "") {
                this.email = "NEPOZNATO";
              }
              if (this.chosenAdress === "") {
                this.chosenAdressTmp = "NEPOZNATO";
              } else {
                this.chosenAdressTmp = this.chosenAdress;
              }

              http
                .post("pacijenti/unos/save", {
                  jmbg: jmbgPost,
                  ime: this.ime.toUpperCase().trim(),
                  prezime: this.prezime.toUpperCase().trim(),
                  spol: this.spol,
                  duhan: this.duhan,
                  dijabetes: this.dijabetes,
                  telefon: this.telefon,
                  adresa: this.chosenAdressTmp,
                  email: this.email,
                  token: this.$store.state.token,
                  site: this.$store.state.site
                })
                .then(res => {
                  if (res.data.success === false) {
                    this.toastText = this.$t(
                      "pacijenti.unos.UnosPacijenta.trnslr016"
                    ); // Greška prilikom upisa!
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
                    // this.toastText = this.$t('pacijenti.unos.UnosPacijenta.trnslr017') // Unos uspješno obavljen!
                    // this.toastIcon = 'fa-check'
                    // this.toastPosition = 'top-right'
                    // this.className = 'vuestic-toast-primary'

                    // this.showToast(this.toastText, {
                    //   icon: this.toastIcon,
                    //   position: this.toastPosition,
                    //   duration: this.toastDuration,
                    //   fullWidth: this.isToastFullWidth,
                    //   className: this.className,
                    // })

                    this.maticni = this.jmbg;

                    this.jmbg = "";
                    this.ime = "";
                    this.prezime = "";
                    this.spol = "";
                    this.duhan = "";
                    this.dijabetes = "";
                    this.telefon = "";
                    this.email = "";
                    this.chosenAdress = "";

                    // this.$router.push('/prijem?token=' + this.$store.state.token)
                    // console.log(res.data);
                    router.push("/samples/entry/" + res.data.pacijent._id);
                  }
                });
            }
          });
      }
    },
    jmbgValidate(jmbg) {
      return (
        /^\d{4}[9,0]{1}\d{8}$/.test(String(jmbg)) ||
        /^\d{4}[9,0]{1}\d{7}[P]{1}$/.test(String(jmbg))
      );
    },
    jmbgValidateP(jmbg) {
      return /^\d{4}[9,0]{1}\d{2}$/.test(String(jmbg));
    }
  }
};
</script>

<style lang="scss">
// Colors //
$gray-light: #acb5be !default;
$light-gray: #eeeeee;
$lighter-gray: #dddddd;
$charcoal: #555555;
$darkest-gray: #333333;
$almost-black: #161616;
$hover-black: #222222;
$vue-green: #4ae387;
$vue-light-green: #dbf9e8;
$light-green: #c8f9c5;
$lighter-green: #e9fde8;
$light-blue: #dcf1ff;
$light-yellow: #fff1c8;
$light-pink: #ffcece;
$vue-darkest-blue: #34495e;
$vue-turquoise: #dbf9e7;
$white: #ffffff;
$theme-red: #e34a4a;
$theme-orange: #f7cc36;
$theme-blue: #4ab2e3;
$theme-violet: #db76df;
$theme-pale: #d9d9d9;
$brand-primary: $vue-green !default;
$brand-danger: $theme-red;
$brand-warning: $theme-orange;
$brand-info: $theme-blue;
$brand-success: $vue-green;
$light-gray2: #eff4f5;
$dark-gray: #282828;
$gray: #adb3b9;
$violet: #db76df;
$dark-blue: #0045b6;
$text-gray: #b4b4b4;
$colors-map: (
  brand-danger: $brand-danger,
  brand-primary: $brand-primary,
  brand-info: $brand-info,
  brand-success: $brand-success,
  brand-warning: $brand-warning,
  black: black,
  white: white,
  lighter-gray: $lighter-gray
);
$theme-colors: (
  "primary": $brand-primary,
  "secondary": $white,
  "success": $light-green,
  "info": $brand-info,
  "warning": $brand-warning,
  "danger": $brand-danger,
  "light": $light-gray2,
  "dark": $almost-black,
  "pale": $theme-pale
);
// Layout //
$body-bg: $light-gray;
$top-nav-bg: $darkest-gray;
$body-color: $vue-darkest-blue !default;
$layout-padding: 24px;
$layout-padding-right: 44px;
$top-nav-height: 72px;
$nav-padding-left: $layout-padding;
$nav-padding-right: $layout-padding-right;
$navbar-brand-container-left: 75px;
$sidebar-bg: $darkest-gray;
$sidebar-width: 225px;
$sidebar-top: calc(#{$top-nav-height} + #{$layout-padding});
$sidebar-left: $layout-padding;
$content-wrap-ml: calc(#{$sidebar-left} + #{$sidebar-width} + 35px);
$content-wrap-pr: $layout-padding-right;
$content-wrap-pt: $layout-padding;
$content-wrap-pb: $layout-padding;
$made-by-footer-pb: 27px;
$greeny-box-shadow: 0 4px 9.6px 0.4px rgba($vue-green, 0.5);
$min-z-index: -1000;
// Auth
$auth-wallpaper-ivuestic-h: 2.625rem;
$auth-wallpaper-oblique-line: $dark-gray;
// Mobile Layout
$top-mobile-nav-height: 6.5rem;
$layout-mobile-padding: 0.1875rem;
$layout-mobile-padding-right: 0.375rem;
$sidebar-mobile-width: calc(100% - #{$layout-mobile-padding-right});
$sidebar-mobile-top: $top-mobile-nav-height + $layout-mobile-padding;
$sidebar-mobile-left: $layout-mobile-padding;
$content-mobile-wrap-margin: 1.125rem;
$sidebar-mobile-z-index: 1000;
$content-mobile-wrap-pl: 1rem;
$content-mobile-wrap-pr: 1rem;
$content-mobile-wrap-pt: 2rem;
$content-mobile-wrap-pt-fixed-layout: 7rem;
$content-mobile-wrap-pb: $layout-padding;
$content-mobile-wrap: $content-mobile-wrap-pt $content-mobile-wrap-pr
  $content-mobile-wrap-pb $content-mobile-wrap-pl;
$content-mobile-wrap-fixed-layout: $content-mobile-wrap-pt-fixed-layout
  $content-mobile-wrap-pr $content-mobile-wrap-pb $content-mobile-wrap-pl;
$content-mobile-wrap-sb-top: calc(#{$top-nav-height} + #{$layout-padding+20}) -
  20 px;
$nav-mobile-padding-h: 0.875rem;
$nav-mobile-pt: 1.75rem;
$nav-mobile-pb: 0.5rem;
$nav-mobile-brand-width: 4rem;
$nav-mobile-brand-top: 0.875rem;
$nav-mobile-brand-left: calc(50% - #{$nav-mobile-brand-width});
$droppdown-mobile-mp: 1.9375rem;
$dropdown-mobile-show-b: 2rem;
// Auth mobile
$auth-mobile-nav-ivuestic-h: 1.5rem;
$auth-mobile-main-h: calc(100% - #{$top-mobile-nav-height});
$auth-content-padding-t: 2.875rem;
// Typography
// -------------------------
// $text-color:            $gray !default;
$font-family-sans-serif: "Source Sans Pro", sans-serif !default;
$font-size-root: 16px;
$font-size-base: 1rem !default;
$font-size-larger: 1.2rem;
$font-size-large: 1.5rem;
$font-size-mini: 0.8rem;
$font-weight-bold: 700 !default;
$font-weight-semi-bold: 600 !default;
$font-weight-normal: 400 !default;
$font-weight-thin: 300 !default;
$font-weight-base: $font-weight-thin !default;
$font-size-smaller: 85% !default;
$font-size-h1: 2.625rem !default;
$font-size-h2: 2.25rem !default;
$font-size-h3: 1.75rem !default;
$font-size-h4: 1.375rem !default;
$headings-line-height: 1 !default;
$blockquote-border-color: $vue-green;
$blockquote-small-color: $gray-light;
$blockquote-border-width: 0.375rem;
$blockquote-font-size: 1.5rem;
// Navbar
$navbar-dd-item-height: 48px;
// Breadcrumbs
$breadcrumbs-height: 54px;
$breadcrumbs-arrow-font: 0.7rem;
$breadcrumbs-arrow-content: "\f054";
// Sidebar
$sidebar-link-height: 64px;
$sidebar-submenu-link-height: 48px;
$sidebar-link-pl: 25px;
$sidebar-submenu-link-pl: 74px;
$sidebar-link-active-bg: $almost-black;
$sidebar-arrow-right: 16px;
$sidebar-menu-item-icon-size: 19px;
$sidebar-viewport-height: calc(
  100vh - #{$top-nav-height} - #{$content-wrap-pt} - #{$content-wrap-pb}
);
$sidebar-hidden-top: -150px;
$sidebar-hidden-top-mobile: $sidebar-mobile-top;
$sidebar-hidden-height-mobile: 0;
$sidebar-box-shadow: 0px 8px 14.72px 1.28px rgba(#65a977, 0.3);
// Widgets
$widget-bg: $white;
$widget-padding: 1.5625rem;
$widget-larger-padding: 45px;
$widget-box-shadow: 0px 4px 70px -18px rgba(112, 112, 112, 1);
$widget-danger-shadow: 0px 4px 70px -16px $brand-danger;
$widget-info-shadow: 0px 4px 70px -16px $brand-info;
$widget-viewport-height: $sidebar-viewport-height;
$widget-header-border: 2px solid $light-gray;
$widget-header-height: 55px;
$widget-body-no-header-height: 100%;
$widget-body-with-header-height: calc(100% - #{$widget-header-height});
$widget-mb: 1.875rem;
$info-widget-border: 0.5rem solid $brand-primary;
// Links
$link-color: $brand-primary;
$link-hover-color: lighten($link-color, 10%);
$link-hover-decoration: none;
// Buttons
$input-btn-border-width: 0px;
$btn-line-height: 1.25;
$btn-line-height-sm: $btn-line-height;
$btn-padding-x: 3.9rem;
$btn-padding-y: 1.1rem;
$btn-padding-y-sm: 0.7rem;
$btn-padding-x-sm: 2.5rem;
$btn-padding-y-micro: 0.625rem;
$btn-padding-x-micro: 1.8rem;
$btn-with-icon-text-margin: 1.875rem;
$btn-with-icon-padding-x: 2.8125rem;
$btn-with-icon-rounded-size: 3.5rem;
$btn-with-icon-rounded-size-micro: 2.25rem;
$btn-with-icon-rounded-font-micro: 1.5rem;
$btn-with-icon-rounded-position-top: 0.4rem;
$btn-with-icon-rounded-position-left: 0.46rem;
$btn-with-icon-icon-top: 0.75rem;
$btn-with-icon-rounded-icon-left: 1.23rem;
$btn-with-icon-icon-size: 2rem;
$btn-group-button-padding-x: 1.53rem;
$btn-box-shadow: $greeny-box-shadow;
$btn-box-danger-shadow: 0px 4px 70px -16px $brand-danger;
$btn-box-warning-shadow: 0px 4px 70px -16px $brand-warning;
$btn-box-success-shadow: $greeny-box-shadow;
$btn-box-info-shadow: 0px 4px 70px -16px $brand-info;
$btn-box-pale-shadow: 0px 4px 70px -16px $theme-pale;
$btn-box-dark-shadow: 0px 4px 70px -16px $almost-black;
$btn-border-radius: 1.875rem;
$btn-dark-color: $white;
$btn-dark-bg: $darkest-gray;
$btn-dark-border: $darkest-gray;
$btn-pale-bg: $theme-pale;
$btn-pale-color: $white;
$btn-dd-arrow-size: 1rem;
$btn-border: none;
$btn-secondary-theme-border: 2px solid $brand-primary;
// Dropdowns
$dropdown-link-color: $white;
$dropdown-box-shadow: $greeny-box-shadow;
$dropdown-background: $darkest-gray;
$dropdown-link-color: $white;
$dropdown-link-hover-color: $white;
$dropdown-link-hover-bg: $almost-black;
$dropdown-link-active-color: $white;
$dropdown-link-active-bg: $almost-black;
$dropdown-item-padding-x: 25px;
$dropdown-item-padding-y: 0;
$dropdown-item-height: 40px;
$dropdown-menu-padding-y: 10px;
$dropdown-menu-padding-x: 0;
$dropdown-min-width: 15rem;
$dropdown-simple-visible-items: 4;
$dropdown-multi-visible-items: 4;
$dropdown-show-b: 1.125rem;
// Modals
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
// Forms
$input-border-color: $lighter-gray;
$input-bg-disabled: $white;
$vuestic-switch-bg: $brand-primary;
$vuestic-switch-padding: 0.313rem 2.375rem;
$vuestic-switch-border-size: 0.125rem;
// Progress Bars
$progress-bar-value-font-size: 0.6875rem;
$progress-bar-circle-diameter: 3.125rem;
$progress-bar-circle-bw: 0.0678rem;
$progress-bar-circle-overlay-diameter: calc(
  #{$progress-bar-circle-diameter} - 2 * #{$progress-bar-circle-bw}
);
$progress-bar-vertical-height: 5.75rem;
$progress-bar-width-thin: 0.125rem;
$progress-bar-width-basic: 0.5rem;
$progress-bar-width-thick: 1.5rem;
$vertical-progress-bar-width-thick: 2rem;
// Tables
$table-bg-accent: $white;
$table-border-width: 0;
$table-border-color: #eceeef;
$striped-row-odd: $white;
$striped-row: $light-gray2;
$state-success-bg: #c8fac6;
$state-danger-bg: #ffcece;
$state-warning-bg: #fff1c8;
$state-info-bg: #dcf1ff;
$table-hover-bg: rgba($vue-green, 0.5);
$table-active-bg: $table-hover-bg;
// Badges
$badge-padding-y: 0.28rem;
$badge-min-width: 5rem;
$badge-font-size: 0.7rem;
$badge-success-bg: $brand-success;
$badge-warning-bg: $theme-orange;
$badge-danger-bg: $theme-red;
$badge-info-bg: $theme-blue;
// Alerts
$alert-padding-x: 1.25rem !default;
$alert-padding-y: 0.75rem !default;
$alert-margin-bottom: $widget-mb;
$with-close-pr: 3.125rem;
$alert-border-radius: 0;
$alert-border-width: 0;
$alert-success-bg: $light-green;
$alert-success-text: $body-color;
$alert-success-border: transparent;
$alert-success-shadow: 0px 4px 9.6px 0.4px rgba(79, 206, 145, 0.5);
$alert-info-bg: $light-blue;
$alert-info-text: $body-color;
$alert-info-border: transparent;
$alert-info-shadow: 0px 4px 9.6px 0.4px rgba(79, 142, 206, 0.5);
$alert-warning-bg: $light-yellow;
$alert-warning-text: $body-color;
$alert-warning-border: transparent;
$alert-warning-shadow: 0px 4px 9.6px 0.4px rgba(206, 178, 79, 0.5);
$alert-danger-bg: $light-pink;
$alert-danger-text: $body-color;
$alert-danger-border: transparent;
$alert-danger-shadow: 0px 4px 9.6px 0.4px rgba(206, 79, 79, 0.5);
// Icons
$bootstrap-sass-asset-helper: false;
$icon-font-name: "glyphicons-halflings-regular";
$icon-font-svg-id: "glyphicons_halflingsregular";
$icon-font-path: "./fonts/";
// Tabs
$tab-content-pt: 3.125rem;
$tab-content-pb: 1.5rem;
// PreLoader
$vuestic-preloader-left: calc(50% - 140px / 2);
$vuestic-preloader-top: calc(50% - 104px / 2);
// Medium Editor
$medium-editor-button-size: $btn-padding-y * 2 + $font-size-base *
  $btn-line-height;
// tooltips
$tooltip-font-size: $font-size-base;
$tooltip-box-shadow: $greeny-box-shadow;
$tooltip-max-width: 200px;
$tooltip-color: $white;
$tooltip-bg: $darkest-gray;
$tooltip-border-radius: $font-size-base * 0.5;
$tooltip-opacity: 0.9;
$tooltip-padding-y: 0.5rem;
$tooltip-padding-x: 0.75rem;
$tooltip-margin: 0;
$tooltip-line-height: 1.13;
$tooltip-font-weight: 300;
$tooltip-arrow-width: 0.8rem;
$tooltip-arrow-height: 0.4rem;
$tooltip-arrow-color: $tooltip-bg;
// Popovers
$popover-font-size: $font-size-base;
$popover-line-height: $tooltip-line-height;
$popover-box-shadow: $tooltip-box-shadow;
$popover-bg: $tooltip-bg;
$popover-max-width: 400px;
$popover-border-width: 0;
$popover-border-color: transparent;
$popover-border-radius: $tooltip-border-radius;
$popover-box-shadow: $greeny-box-shadow;
$popover-opacity: $tooltip-opacity;
$popover-header-bg: $tooltip-bg;
$popover-header-color: $white;
$popover-header-padding-y: 0;
$popover-header-padding-x: 0.75rem;
$popover-header-no-icon-padding-x: 0;
$popover-header-font-weight: bold;
$popover-body-color: $white;
$popover-body-padding-y: $popover-header-padding-y;
$popover-body-padding-x: $popover-header-padding-x;
$popover-body-no-icon-padding-x: $popover-header-no-icon-padding-x;
$popover-icon-size: 1.35rem;
$popover-icon-color: $brand-primary;
$popover-arrow-width: 1rem;
$popover-arrow-height: 1rem;
$popover-arrow-color: transparent;
$popover-arrow-outer-color: fade-in($popover-border-color, 0.05);
// Toasts
$toast-font-size: $popover-font-size;
$toast-line-height: $popover-line-height;
$toast-font-weight: normal;
$toast-min-height: 3.25rem;
$toast-box-shadow: $popover-box-shadow;
$toast-bg: $popover-bg;
$toast-border-radius: $popover-border-radius;
$toast-color: $popover-body-color;
$toast-opacity: $popover-opacity;
$toast-padding-x: 1.15rem;
$toast-padding-y: 0.5rem;
$toast-icon-size: $popover-icon-size;
$toast-icon-color: $popover-icon-color;
$toast-icon-ml: 0;
$toast-icon-mr: 0.625rem;
.vuestic-modal {
  height: 0;
  width: 0; // For Transitioning
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
  // Modal styles
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
  // box-shadow: $modal-content-box-shadow-sm-up;
}
</style>
