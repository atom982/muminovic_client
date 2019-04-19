<template>
  <div class="form-elements">
    <div class="row">
      <div class="col-md-12">
        <vuestic-widget :headerText="'postavke.user.chpwd.trnslr001' | translate">
          <!-- Promjena šifre -->
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
                        v-model="staraSifra"
                        name="input-icon-left"
                        required
                      >
                      <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                      <!-- Unesite trenutnu šifru -->
                      <label
                        class="control-label"
                        for="input-icon-left"
                      >{{'postavke.user.chpwd.trnslr002' | translate}}</label>
                      <i class="bar"></i>
                    </div>
                  </div>
                  <div class="form-group with-icon-left">
                    <div class="input-group">
                      <input
                        id="input-icon-left"
                        title=" "
                        v-model="novaSifra"
                        name="input-icon-left"
                        required
                      >
                      <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                      <!-- Unesite novu šifru -->
                      <label
                        class="control-label"
                        for="input-icon-left"
                      >{{'postavke.user.chpwd.trnslr003' | translate}}</label>
                      <i class="bar"></i>
                    </div>
                  </div>
                  <div class="form-group with-icon-left">
                    <div class="input-group">
                      <input
                        id="input-icon-left"
                        title=" "
                        v-model="potvrdaSifra"
                        name="input-icon-left"
                        required
                      >
                      <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                      <!-- Potvrdite novu šifru -->
                      <label
                        class="control-label"
                        for="input-icon-left"
                      >{{'postavke.user.chpwd.trnslr004' | translate}}</label>
                      <i class="bar"></i>
                    </div>
                  </div>
                  <button class="btn btn-sm btn-primary" @click.prevent="izmjeniSifru">
                    <span class="fa fa-save"></span>
                    &nbsp{{'postavke.user.chpwd.trnslr005' | translate}}
                    <!-- Sačuvaj -->
                  </button>
                </fieldset>
              </div>
              <div class="col-md-3"></div>
            </div>
          </form>
        </vuestic-widget>
      </div>
    </div>
  </div>
</template>

<script>
import { http } from "../../../../config/config.js";

export default {
  data() {
    return {
      staraSifra: "",
      novaSifra: "",
      potvrdaSifra: "",

      poruka: "",
      infoDanger: false,
      infoSuccess: false,
      infoWarning: false,
      infoInfo: false,

      toastText: "",
      toastIcon: "",
      toastPosition: "",
      toastDuration: 2500,
      isToastFullWidth: false,
      className: ""
    };
  },
  name: "chpwd",

  methods: {
    izmjeniSifru: function() {
      var item = true;
      if (
        this.novaSifra.trim() === "" ||
        this.potvrdaSifra.trim() === "" ||
        this.staraSifra === ""
      ) {
        item = false;
        this.toastText = this.$t("postavke.user.chpwd.trnslr006"); // Sva polja su obavezna!
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
      } else if (this.novaSifra.length < 6) {
        item = false;
        this.toastText = this.$t("postavke.user.chpwd.trnslr007"); // Šifra nije validna!
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
      } else if (this.novaSifra != this.potvrdaSifra) {
        item = false;
        this.toastText = this.$t("postavke.user.chpwd.trnslr008"); // Nova šifra nije validirana!
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

      if (item) {
        http
          .post("users/sifra", {
            email: this.$store.state.userId,
            password: this.staraSifra,
            novaSifra: this.novaSifra,
            potvrdaSifra: this.potvrdaSifra,
            token: this.$store.state.token,
            site: this.$store.state.site
          })
          .then(res => {
            if (res.data.message === "Greška na mongodb.") {
              this.toastText = this.$t("postavke.user.chpwd.trnslr009"); // Greška prilikom upisa!
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
            }
            if (res.data.message === "Info") {
              this.toastText = this.$t("postavke.user.chpwd.trnslr010"); // Trenutna šifra nije ispravna!
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

            if (res.data.message === "Ok") {
              this.novaSifra = "";
              this.potvrdaSifra = "";
              this.staraSifra = "";
              this.text = "Šifra je uspješno izmjenjena.";
              this.toastText = this.$t("postavke.user.chpwd.trnslr011"); // Izmjena uspješno obavljena!
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
              setTimeout(() => {
                this.$router.push(
                  "/dashboard?token=" + this.$store.state.token
                );
              }, 3000);
            }
          });
      }
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
