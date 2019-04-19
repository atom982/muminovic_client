<template>
  <div class="form-elements">
    <div class="row">
      <div class="col-md-12">
        <vuestic-widget v-if="ifTrenutnePostavke" headerText="Testovi">
          <div>
            <div class="form-group">
              <div>
                <input placeholder="Pretraga" v-model="inputValue">
                <i class="bar" :style="'width: ' + 200 + 'px'"/>
              </div>
            </div>
          </div>

          <div class="table-responsive">
            
            <table v-if="tabelaUslov1" class="table table-striped first-td-padding"
            >
              <thead >
                <tr>
                  <td width="3%"></td>
                  <td width="10%">{{"sifra"}}</td>
                  <td width="7%">{{"naziv"}}</td>
                  <td width="20%">{{"analit"}}</td>

                  <td width="10%">{{"jedinica"}}</td>
                  <td width="5%">{{"cijena"}}</td>
                  <td width="10%">{{"multi"}}</td>
                  <td width="5%">{{"order"}}</td>

                  <td width="10%">{{"sekcija"}}</td>
                  <td width="20%">{{"grupa"}}</td>
                  <td>Uredi</td>
                  <td v-if="$store.state.userId === 'admin@atom.ba'">{{"akcija"}}</td>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(element, index) in testoviFiltered"
                  :key="index"
                  v-show="element.naziv.toLowerCase().includes(inputValue.toLowerCase()) 
                  || element.analit.toLowerCase().includes(inputValue.toLowerCase())
                  || element.sekcija.toLowerCase().includes(inputValue.toLowerCase())
                  || element.grupa.toLowerCase().includes(inputValue.toLowerCase())
                  || element.sifra.includes(inputValue)"
                >
                  <td v-if="!element.manual && !element.calculated">
                    <span class="circle badge-primary"></span>
                  </td>
                  <td v-if="element.manual">
                    <span class="circle badge-pale"></span>
                  </td>                  
                  <td v-if="!element.manual && element.calculated">
                    <span class="circle badge-warning"></span>
                  </td>
                  <td style="width:200px; height:70%">{{element.sifra}}</td>
                  <td style="width:150px; height:70%">{{element.naziv}}</td>
                  <td style="width:280px; height:70%">{{element.analit}}</td>
                  <td
                    style="width:160px; height:70%"
                    v-if="tmpID != element._id"
                  >{{element.jedinica}}</td>
                  <td
                    style="width:100px; height:70%"
                    v-if="tmpID === element._id && !element.multi"
                  >
                    <div v-show="edit === false">
                      <label>{{element.jedinica}}</label>
                    </div>
                    <select
                      style="width:100px; height:70%"
                      v-show="edit === true"
                      v-model="element.jedinica"
                    >
                      <option v-for="option in jedinice">{{ option }}</option>
                    </select>
                  </td>
                  <td
                    style="width:160px; height:70%"
                    v-if="tmpID === element._id && element.multi"
                  >{{element.jedinica}}</td>

                  <td style="width:100px; height:70%" v-if="tmpID != element._id">{{element.price}}</td>
                  <td v-if="tmpID === element._id">
                    <div v-show="edit === false">{{element.price}}</div>
                    <input
                      type="number"
                      min="0"
                      step="any"
                      style="width:70px; height:70%"
                      v-show="edit === true"
                      v-model="element.price"
                    >
                  </td>

                  <td style="width:180px; height:70%">
                    <button
                      :disabled="edit"
                      title="Dodavanje analita"
                      v-if="element.multi"
                      :id="element.naziv"
                      :name="element._id"
                      class="btn btn-primary btn-micro"
                      @click="dodajAnalit($event, element)"
                    >
                      <span :id="element.naziv" :name="element._id" class="fa fa-plus"></span>
                     
                    </button>
                    
                    <button
                      :disabled="true"
                      title="Nije dostupno"
                      v-if="!element.multi"
                      :id="element.naziv"
                      :name="element._id"
                      class="btn btn-pale btn-micro"
                      @click="dodajAnalit($event)"
                    >
                      <span :id="element.naziv" :name="element._id" class="fa fa-minus"></span>
                      
                    </button>
                  </td>

                  <td v-if="tmpID != element._id">{{element.grouporder}}</td>
                  <td v-if="tmpID === element._id">
                    <div v-show="edit === false">{{element.grouporder}}</div>
                    <input
                      style="width:50px; height:70%"
                      v-show="edit === true"
                      v-model="element.grouporder"
                    >
                  </td>

                  <td>{{element.sekcija}}</td>

                  <td v-if="element.grupa.includes('.')">{{element.grupa.split(".")[1].trim()}}</td>
                  <td v-if="!element.grupa.includes('.')">{{element.grupa}}</td>

                  <td>
                    <button
                      :disabled="edit"
                      v-if="tmpID != element._id"
                      @click.prevent="editUnit($event, element.jedinica, element.grouporder, element.price)"
                      title="Uredite podatke"
                      v-bind:id="element._id"
                      class="btn btn-micro btn-info"
                    >
                      <span v-bind:id="element._id" class="glyphicon glyphicon-edit"></span>
                      {{''}}
                    </button>
                    <button
                      :disabled="edit"
                      v-if="uredi && tmpID === element._id"
                      @click.prevent="editUnit($event, element.jedinica, element.grouporder, element.price)"
                      title="Uredite podatke"
                      v-bind:id="element._id"
                      class="btn btn-micro btn-info"
                    >
                      <span v-bind:id="element._id" class="glyphicon glyphicon-edit"></span>
                      {{''}}
                    </button>
                    <button
                      v-if="!uredi && tmpID === element._id"
                      @click.prevent="saveUnit($event, element.jedinica, element.grouporder, element.price)"
                      title="Sačuvajte izmjene"
                      v-bind:id="element._id"
                      class="btn btn-micro btn-secondary"
                    >
                      <span v-bind:id="element._id" class="fa fa-save"></span>
                      {{''}}
                    </button>
                  </td>

                  <td v-if="$store.state.userId === 'admin@atom.ba'">
                    <button
                      :disabled="edit"
                      title="Brisanje zapisa"
                      v-bind:id="element._id"
                      class="btn btn-danger btn-micro"
                      @click="catchDialog($event)"
                    >
                      <span v-bind:id="element._id" class="fa fa-trash-o"></span>
                      
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <vuestic-alert v-if="dataUslov1" type="warning" :withCloseBtn="false">
              <span>{{dataAvailable1}}</span>
            </vuestic-alert>
            <vuestic-alert v-if="dataUslovDanger" type="danger" :withCloseBtn="false">
              <span>{{dataAvailable}}</span>
            </vuestic-alert>
          </div>
          <hr v-if="$store.state.userId === 'admin@atom.ba'">
          <div class="row">
            <div class="col-md-3"></div>
            <div class="col-md-6">
              <button
                v-if="$store.state.userId === 'admin@atom.ba'"
                :disabled="edit"
                class="btn btn-secondary"
                @click.prevent="gotovo"
              >
                <span class="fa fa-backward"></span>
                {{ ' POVRATAK'}}
              </button>
            </div>
          </div>
        </vuestic-widget>
        <vuestic-widget
          v-if="ifDodajAnalit"
          headerText="Testovi - Dodaj analit"
        >
          <div class="row">
            <div class="col-md-5">
              <div class="row">
                <div class="col-md-3"></div>
                <div class="col-md-6">
                  <div style="text-align:center;" class="testoviDiv">
                    <h5>
                      Naziv testa:
                      <span style="color: #e34a4a;">{{analit}}</span>
                    </h5>
                    <h5>{{prikazNazivaAnalita}}</h5>
                    <hr>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-12">
                  <fieldset>
                    <div class="col-md-6 form-group with-icon-left">
                      <div class="input-group">
                        <input
                          id="input-icon-left"
                          title=" "
                          v-model="analitKod"
                          name="input-icon-left"
                          required
                        >
                        <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                        <label class="control-label" for="input-icon-left">{{'Unesite kod analita'}}</label>
                        <i class="bar"></i>
                      </div>
                    </div>
                    <div class="col-md-6 form-group with-icon-left">
                      <div class="input-group">
                        <input
                          id="input-icon-left"
                          title=" "
                          v-model="analitNaziv"
                          name="input-icon-left"
                          required
                        >
                        <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                        <label
                          class="control-label"
                          for="input-icon-left"
                        >{{'Unesite naziv analita'}}</label>
                        <i class="bar"></i>
                      </div>
                    </div>
                    <div class="col-md-12 form-group with-icon-left">
                      <div class="input-group">
                        <input
                          id="input-icon-left"
                          title=" "
                          v-model="analitOpis"
                          name="input-icon-left"
                          required
                        >
                        <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                        <label
                          class="control-label"
                          for="input-icon-left"
                        >{{'Unesite opis analita'}}</label>
                        <i class="bar"></i>
                      </div>
                    </div>
                    <div class="col-md-6 form-group with-icon-left">
                      <vuestic-simple-select
                        label="Izaberite jedinicu testa"
                        v-model="jedinica"
                        name="grupa"
                        :required="true"
                        title=" "
                        ref="grupaSelect"
                        v-bind:options="jedinice"
                      ></vuestic-simple-select>
                    </div>

                    <div class="col-md-12">
                      <button
                        :disabled="edit"
                        v-if="1 == 1"
                        class="btn btn-sm btn-secondary"
                        @click.prevent="gotovoDodajAnalit"
                      >
                        <span class="fa fa-step-backward"></span>
                        {{ ' nazad'}}
                      </button>
                      
                      <button
                        :disabled="edit"
                        class="btn btn-sm btn-primary"
                        @click.prevent="sacuvajAnalit"
                      >
                        <span class="glyphicon glyphicon-plus"></span>
                        {{ ' DODAJ'}}
                      </button>
                      <!-- <hr> -->
                      <button
                        v-if="$store.state.userId === 'admin@atom.ba'"
                        :disabled="edit"
                        class="btn btn-sm btn-secondary"
                        @click.prevent="gotovo"
                      >
                        <span class="fa fa-backward"></span>
                        {{ ' POVRATAK'}}
                      </button>
                    </div>
                  </fieldset>

                  <div class="col-md-12">
                    <hr>
                    <a
                      v-if="!edit"
                      @click="ifDodajAnalit2 = !ifDodajAnalit2"
                      href="#"
                    >{{'Trenutni analiti'}}</a>
                    <a v-if="edit" style="color: #e34a4a;" href="#">{{'Trenutni analiti'}}</a>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="!ifDodajAnalit2" class="col-md-7">
              <div class="table-responsive">
                <table v-if="tabelaUslov2" class="table table-striped first-td-padding">
                  <thead>
                    <tr>
                      <td>{{"kod"}}</td>
                      <td>{{"naziv"}}</td>
                      <td>{{"analit (opis)"}}</td>

                      <td>{{"jedinica"}}</td>
                      <td>Uredi</td>
                      <td>{{"akcija"}}</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="element in analiti">
                      <td>{{element.kod}}</td>
                      <td>{{element.naziv}}</td>
                      <td>{{element.opis}}</td>

                      <td
                        style="width:130px; height:70%"
                        v-if="tmpID != element.naziv"
                      >{{element.jedinica}}</td>
                      <td style="width:130px; height:70%" v-if="tmpID === element.naziv">
                        <div v-show="edit === false">
                          <label>{{element.jedinica}}</label>
                        </div>
                        <select
                          style="width:80px; height:70%"
                          v-show="edit === true"
                          v-model="element.jedinica"
                        >
                          <option v-for="option in jedinice">{{ option }}</option>
                        </select>
                      </td>
                      <td>
                        <button
                          :disabled="edit"
                          v-if="tmpID != element.naziv"
                          @click.prevent="editAnaUnit($event, element.jedinica)"
                          title="Uredite podatke"
                          v-bind:id="element.naziv"
                          class="btn btn-micro btn-info"
                        >
                          <span v-bind:id="element.naziv" class="glyphicon glyphicon-edit"></span>
                          {{''}}
                        </button>
                        <button
                          :disabled="edit"
                          v-if="uredi && tmpID === element.naziv"
                          @click.prevent="editAnaUnit($event, element.jedinica)"
                          title="Uredite podatke"
                          v-bind:id="element.naziv"
                          class="btn btn-micro btn-info"
                        >
                          <span v-bind:id="element.naziv" class="glyphicon glyphicon-edit"></span>
                          {{''}}
                        </button>
                        <button
                          v-if="!uredi && tmpID === element.naziv"
                          @click.prevent="saveAnaUnit($event, element.jedinica)"
                          title="Sačuvajte izmjene"
                          v-bind:id="element.naziv"
                          class="btn btn-micro btn-secondary"
                        >
                          <span v-bind:id="element.naziv" class="fa fa-save"></span>
                          {{''}}
                        </button>
                      </td>
                      <td>
                        <button
                          :disabled="edit"
                          title="Brisanje zapisa"
                          v-bind:id="element.naziv"
                          class="btn btn-danger btn-micro"
                          @click="catchDialog2($event)"
                        >
                          <span v-bind:id="element.naziv" class="fa fa-trash-o"></span>
                          
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <vuestic-alert v-if="dataUslov2" type="warning" :withCloseBtn="false">
                  <span>{{dataAvailable2}}</span>
                </vuestic-alert>
                <vuestic-alert v-if="dataUslovDanger" type="danger" :withCloseBtn="false">
                  <span>{{dataAvailable}}</span>
                </vuestic-alert>
              </div>
            </div>
          </div>
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
      prikazNazivaAnalita: "",
      inputValue: "",
      sifra: "",
      naziv: "",
      multi: "",
      multiOpts: ["Da", "Ne"],
      analit: "",
      analit_id: "",
      grupa: "",
      grupe: [],
      price: "",
      sekcija: "",
      sekcije: [],
      ids: [],
      testovi: [],
      testoviFiltered: [],
      analitKod: "",
      analitNaziv: "",
      analitOpis: "",
      analiti: [],
      jedinica: "",
      jedinice: [],
      ifButton: true,
      ifTrenutnePostavke: false,
      ifDodajAnalit: false,
      ifDodajAnalit2: false,
      ifdodajTest: true,
      tmpJedinica: "",
      tmpGrouporder: "",
      tmpPrice: "",
      ifJedinica: false,
      prikaziTekst: "Trenutne postavke",
      interpretacija: null,
      interpretacije: [
        "Referentni interval",
        "Granična vrijednost | ≤ od",
        "Granična vrijednost | ≥ od",
        "Opisni rezultat"
      ],
      dataAvailable: "",
      dataAvailable1: "",
      dataUslov1: false,
      tabelaUslov1: false,
      dataAvailable2: "",
      dataUslov2: false,
      tabelaUslov2: false,
      infoDanger: false,
      infoSuccess: false,
      infoWarning: false,
      infoInfo: false,
      dataUslovDanger: false,
      text: "",
      desc: "",
      grouporder: "",
      uredi: true,
      edit: false,
      tmpID: "",
      toastText: "",
      toastIcon: "",
      toastPosition: "",
      toastDuration: 2500,
      isToastFullWidth: false,
      className: ""
    };
  },
  name: "doktor",

  created: function() {
    this.catchTestovi();
    if (this.$store.state.userId === "admin@atom.ba") {
    } else {
      this.prikaziPostavke();
    }
  },
  mounted() {
    http
      .get(
        "postavke/aparat/mount/list?token=" +
          this.$store.state.token +
          "&site=" +
          this.$store.state.site,
        {}
      )
      .then(res => {
        if (res.data.success === false) {
        } else {
          this.sekcije = res.data.obj.sekcija;
          if (this.sekcije.length == 0) {
            this.sekcije.push("NEMA PODATAKA"); // kad se tek loada nema sekcija i onda je ovo...
            this.grupe.push("NEMA PODATAKA");
          }
        }
      });

    http
      .get(
        "postavke/labtest/list?token=" +
          this.$store.state.token +
          "&site=" +
          this.$store.state.site,
        {}
      )
      .then(res => {
        if (res.data.success === false) {
          this.jedinice.push("GREŠKA - DB Connection");
          this.grupe.push("GREŠKA - DB Connection");
          this.sekcije.push("GREŠKA - DB Connection");
        }
      });

    http
      .get(
        "postavke/jedinice/mount/list?token=" +
          this.$store.state.token +
          "&site=" +
          this.$store.state.site,
        {}
      )
      .then(res => {
        this.jedinice = res.data.jedinica;
        if (this.jedinice.length == 0) {
          this.jedinice.push("NEMA PODATAKA");
        }
      });
  },
  computed: {},

  watch: {

    sekcija: function() {
      this.grupa = "";
      http
        .post("postavke/aparat/mount/list", {
          email: this.$store.state.userId,
          sekcija: this.sekcija,
          token: this.$store.state.token,
          site: this.$store.state.site
        })
        .then(res => {
          this.grupe = res.data.grupa;
          if (res.data.grupa != undefined) {
            if (this.grupe.length === 0) {
              this.grupe = [];
              this.grupe.push("NEMA PODATAKA");
            }
            if (this.sekcija === "NEMA PODATAKA") {
              this.grupe = [];
              this.grupe.push("NEMA PODATAKA");
            }
          } else {
            this.grupe = [];
            this.grupe.push("NEMA PODATAKA");
          }
        });
    },
    grupa: function() {
      this.jedinica = "";
      http
        .get(
          "postavke/jedinice/mount/list?token=" +
            this.$store.state.token +
            "&site=" +
            this.$store.state.site,
          {}
        )
        .then(res => {
          this.jedinice = res.data.jedinica;
          if (this.jedinice.length == 0) {
            this.jedinice.push("NEMA PODATAKA");
          }
        });
    },
    multi: function() {
      if (this.multi === "Da") {
        this.ifJedinica = false;
      } else {
        this.ifJedinica = true;
        this.jedinica = "";
      }
    }
  },
  methods: {
    editUnit(event, unit, order, cijena) {
      this.edit = true;
      this.uredi = false;
      this.tmpID = event.target.id;
      this.tmpJedinica = unit;
      this.tmpGrouporder = order;
      this.tmpPrice = cijena;
    },
    editAnaUnit(event, unit) {
      this.edit = true;
      this.uredi = false;
      this.tmpID = event.target.id;
      this.tmpJedinica = unit;
    },
    saveUnit(event, unit, order, cijena) {
      if (
        this.tmpJedinica === unit &&
        this.tmpGrouporder === order &&
        this.tmpPrice === cijena
      ) {
        this.edit = false;
        this.uredi = true;
      } else {
        if (isNaN(cijena) || cijena < 0) {
          this.toastText = "Cijena nije validna!";
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
        } else if (!this.validateGroup(order) || order.includes("_")) {
          this.toastText = "Redni broj nije validan!";
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
          this.tmpID = event.target.id;
          if (
            this.tmpJedinica != unit ||
            this.tmpGrouporder != order ||
            this.tmpPrice != cijena
          ) {
            http
              .post("postavke/labtest/edit", {
                email: this.$store.state.userId,
                token: this.$store.state.token,
                _id: event.target.id,
                unit: unit,
                order: order.trim(),
                price: cijena.trim(),
                site: this.$store.state.site
              })
              .then(res => {
                this.edit = false;
                this.uredi = true;
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
                  this.toastText = "Izmjena uspješno obavljena!";
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
                }
              });
          }
        }
      }
    },
    saveAnaUnit(event, unit) {
      this.edit = false;
      this.uredi = true;
      this.tmpID = event.target.id;

      if (this.tmpJedinica != unit) {
        http
          .post("postavke/labtest/analit/edit", {
            email: this.$store.state.userId,
            token: this.$store.state.token,
            analit: event.target.id,
            test: this.analit,
            analit_id: this.analit_id,
            unit: unit,
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
              this.toastText = "Izmjena uspješno obavljena!";
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
            }
          });
      }
    },
    gotovoDodajAnalit() {
      this.ifTrenutnePostavke = !this.ifTrenutnePostavke;
      this.ifDodajAnalit = !this.ifDodajAnalit;
      this.ifDodajAnalit2 = false;
      this.analitKod = "";
      this.analitNaziv = "";
      this.analitOpis = "";
      this.jedinica = "";
    },
    dodajPostavku: function() {
      var check = true;

      if (this.multi === "Da") {
        this.jedinica = "n/a";
      }
      var item = true;

      if (
        this.sifra.trim() === "" ||
        this.naziv.trim() === "" ||
        this.multi.trim() === "" ||
        this.analit.trim() === "" ||
        this.sekcija.trim() === "" ||
        this.grupa.trim() === "" ||
        this.jedinica.trim() === ""
      ) {
        item = false;

        this.toastText = "Sva polja (osim rednog broja testa) su obavezna!";
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
        !this.validateGroup(this.grouporder) ||
        this.grouporder.includes("_")
      ) {
        item = false;

        this.toastText = "Redni broj nije validan!";
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
      } else if (this.jedinica.trim() === "GREŠKA - DB Connection") {
        item = false;

        this.toastText = "Molimo Vas da osvježite aplikaciju!";
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
      } else if (this.grupa.trim() === "GREŠKA - DB Connection") {
        item = false;

        this.toastText = "Molimo Vas da osvježite aplikaciju!";
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
      } else if (this.sekcija.trim() === "GREŠKA - DB Connection") {
        item = false;

        this.toastText = "Molimo Vas da osvježite aplikaciju!";
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
      } else if (isNaN(this.price) || this.price < 0) {
        item = false;
        this.toastText = "Cijena nije validna!";
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
      } else if (this.jedinica.trim() === "NEMA PODATAKA") {
        item = false;

        this.toastText = "Mjerne jedinice nisu definisane!";
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
      } else if (this.sekcija.trim() === "NEMA PODATAKA") {
        item = false;

        this.toastText = "Sekcije nisu definisane!";
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
        this.sekcija.trim() === "NEMA PODATAKA" &&
        this.grupa.trim() === "NEMA PODATAKA"
      ) {
        item = false;

        this.toastText = "Sekcije nisu definisane!";
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
        this.grupa.trim() === "NEMA PODATAKA" &&
        (this.sekcija.trim() != "NEMA PODATAKA" && this.sekcija.trim() != "")
      ) {
        item = false;

        this.toastText = "Grupe testova nisu definisane!";
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
        var i;

        for (i = 0; i < this.testovi.length; i++) {
          if (this.sifra.trim() == this.testovi[i].sifra) {
            item = false;
            var check = false;

            this.toastText = "Test sa unesenom šifrom već postoji!";
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
        if (check != false) {
          var j;
          for (j = 0; j < this.testovi.length; j++) {
            if (this.analit.trim() == this.testovi[j].analit) {
              item = false;

              this.toastText = "Uneseni analit već postoji!";
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
      }

      if (item) {
        http
          .post("postavke/labtest/save", {
            email: this.$store.state.userId,
            sifra: this.sifra,
            naziv: this.naziv,
            multi: this.multi,
            analit: this.analit,
            sekcija: this.sekcija,
            grupa: this.grupa,
            jedinica: this.jedinica,
            grouporder: this.grouporder,
            price: this.price,
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
              this.sifra = "";
              this.naziv = "";
              this.multi = "";
              this.analit = "";
              this.sekcija = "";
              this.grupa = "";
              this.jedinica = "";
              this.grouporder = "";
              this.price = "";
              this.ifJedinica = false;
              this.prikaziPostavke();
              this.prikaziPostavke();
            }
          });
      }
    },
    prikaziPostavke: function() {
      this.sifra = "";
      this.naziv = "";
      this.multi = "";
      this.analit = "";
      this.sekcija = "";
      this.grupa = "";
      this.jedinica = "";

      this.ifTrenutnePostavke = !this.ifTrenutnePostavke;
      this.ifdodajTest = !this.ifdodajTest;

      http
        .get(
          "postavke/labtest/list?token=" +
            this.$store.state.token +
            "&site=" +
            this.$store.state.site,
          {}
        )
        .then(res => {
          if (res.data.success === false) {
            this.dataAvailable = "Greška prilikom čitanja iz baze.";
            this.dataUslovDanger = true;
            this.dataUslov1 = false;
            this.tabelaUslov1 = false;
            this.dataUslov2 = false;
            this.tabelaUslov2 = false;
          } else {
            this.testovi = [];
            this.testoviFiltered = [];
            this.testovi = res.data.testovi;
            res.data.testovi.forEach(element => {
              if (
                // element.manual === false &&
                // element.calculated === false &&
                !element.disabled
              ) {
                this.testoviFiltered.push(element);
              }
            });

            this.testoviFiltered = this.testoviFiltered.sort(function(a, b) {
              return a.naziv.localeCompare(b.naziv, undefined, {
                numeric: true,
                sensitivity: "base"
              });
            });

            if (this.testovi.length > 0) {
              this.dataAvailable1 = "";
              this.dataUslov1 = false;
              this.tabelaUslov1 = true;
              this.dataUslovDanger = false;
            }

            if (this.testovi.length <= 0) {
              this.dataAvailable1 = "Nema dostupnih podataka.";
              this.dataUslov1 = true;
              this.tabelaUslov1 = false;
              this.dataUslovDanger = false;
            }
          }
        });
    },
    izbrisiTest: function(event) {
      http
        .post("postavke/labtest/delete", {
          _id: event.target.id,
          token: this.$store.state.token,
          site: this.$store.state.site
        })
        .then(res => {
          this.prikaziPostavke();
          this.prikaziPostavke();
        });
    },
    catchDialog: function(event) {
      this.$dialog
        .confirm("Jeste li sigurni da želite obrisati zapis?", {
          type: "hard",
          html: true,
          verification: "Da"
        })
        .then(() => {
          http
            .post("postavke/labtest/delete", {
              _id: event.target.id,
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
    dodajAnalit: function(event, element) {
      // console.log(element.analit)
      this.prikazNazivaAnalita = element.analit;
      this.ifTrenutnePostavke = false;
      this.ifDodajAnalit = true;
      this.analit = event.target.id;
      this.analit_id = event.target.getAttribute("name");

      http
        .post("postavke/labtest/analit/list", {
          analit: event.target.id,
          analit_id: this.analit_id,
          token: this.$store.state.token,
          site: this.$store.state.site
        })
        .then(res => {
          var o = true;
          if (res.data.success === false) {
            this.dataAvailable = "Greška prilikom čitanja iz baze.";
            o = false;
            this.dataUslovDanger = true;
            this.dataUslov1 = false;
            this.tabelaUslov1 = false;
            this.dataUslov2 = false;
            this.tabelaUslov2 = false;
          } else {
            this.analiti = res.data.analiti;
            if (this.analiti.length > 0) {
              this.dataAvailable2 = "";
              this.dataUslov2 = false;
              this.tabelaUslov2 = true;
              this.dataUslovDanger = false;
            }

            if (this.analiti.length <= 0) {
              this.dataAvailable2 = "Nema dostupnih podataka.";
              this.dataUslov2 = true;
              this.tabelaUslov2 = false;
              this.dataUslovDanger = false;
            }
          }

          http
            .get(
              "postavke/jedinice/mount/list?token=" +
                this.$store.state.token +
                "&site=" +
                this.$store.state.site,
              {}
            )
            .then(res => {
              this.jedinice = res.data.jedinica;
              if (this.jedinice.length == 0) {
                this.jedinice.push("NEMA PODATAKA");
              }
            });

          if (o === false) {
            this.jedinice = [];
            this.jedinice.push("GREŠKA - DB Connection");
          }
        });
    },
    sacuvajAnalit: function(event) {
      var item = true;

      if (
        this.analitNaziv.trim() === "" ||
        this.analitOpis.trim() === "" ||
        this.analitKod.trim() === "" ||
        this.jedinica.trim() === ""
      ) {
        item = false;
        this.toastText = "Sva polja su obavezna!";
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
      } else if (this.jedinica.trim() === "NEMA PODATAKA") {
        item = false;
        this.toastText = "Mjerne jedinice nisu definisane!";
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
      } else if (this.jedinica.trim() === "GREŠKA - DB Connection") {
        item = false;

        this.toastText = "Molimo Vas da osvježite aplikaciju!";
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
        var i;

        for (i = 0; i < this.analiti.length; i++) {
          if (this.analitNaziv.trim() == this.analiti[i].naziv) {
            item = false;

            this.toastText = "Analit već postoji!";
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
      if (item) {
        http
          .post("postavke/labtest/analit/save", {
            email: this.$store.state.userId,
            analitKod: this.analitKod,
            analitNaziv: this.analitNaziv,
            analitOpis: this.analitOpis,
            analitJedinica: this.jedinica,
            interpretacija: this.interpretacija,
            analit: this.analit,
            analit_id: this.analit_id,
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
              this.analitKod = "";
              this.analitNaziv = "";
              this.analitOpis = "";
              this.jedinica = "";
            }
            if (res.data.success === false) {
              this.dataAvailable = "Greška prilikom čitanja iz baze.";
              this.dataUslovDanger = true;
              this.dataUslov1 = false;
              this.tabelaUslov1 = false;
              this.dataUslov2 = false;
              this.tabelaUslov2 = false;
            } else {
              this.analiti = res.data.analiti;

              if (this.analiti.length > 0) {
                this.dataAvailable2 = "";
                this.dataUslov2 = false;
                this.tabelaUslov2 = true;
                this.dataUslovDanger = false;
              }

              if (this.analiti.length <= 0) {
                this.dataAvailable2 = "Nema dostupnih podataka.";
                this.dataUslov2 = true;
                this.tabelaUslov2 = false;
                this.dataUslovDanger = false;
              }
            }
          });
      }
    },
    gotovo: function() {
      this.ifDodajAnalit = false;
      this.ifDodajAnalit2 = false;
      this.ifTrenutnePostavke = false;
      this.ifdodajTest = true;
      this.analit = "";
      this.ifJedinica = false;
      this.analitKod = "";
      this.analitNaziv = "";
      this.analitOpis = "";
      this.jedinica = "";
    },

    catchDialog2: function(event) {
      this.$dialog
        .confirm("Jeste li sigurni da želite obrisati zapis?", {
          type: "hard",
          html: true,
          verification: "Da"
        })
        .then(() => {
          this.izbrisiAnalit(event);
        })
        .catch(function() {});
    },
    izbrisiAnalit: function(event) {
      http
        .post("postavke/labtest/analit/delete", {
          email: this.$store.state.userId,
          analit: event.target.id,
          test: this.analit,
          analit_id: this.analit_id,
          token: this.$store.state.token,
          site: this.$store.state.site
        })
        .then(res => {
          this.analitKod = "";
          this.analitNaziv = "";
          this.analitOpis = "";
          this.analiti = res.data.analiti;

          if (this.analiti.length > 0) {
            this.dataAvailable2 = "";
            this.dataUslov2 = false;
            this.tabelaUslov2 = true;
          }

          if (this.analiti.length <= 0) {
            this.dataAvailable2 = "Nema dostupnih podataka.";
            this.dataUslov2 = true;
            this.tabelaUslov2 = false;
          }
        });
    },
    catchTestovi: function() {
      http
        .get(
          "postavke/labtest/list?token=" +
            this.$store.state.token +
            "&site=" +
            this.$store.state.site,
          {}
        )
        .then(res => {
          this.testovi = [];
          this.testoviFiltered = [];
          this.testovi = res.data.testovi;
          res.data.testovi.forEach(element => {
            if (
              // element.manual === false &&
              // element.calculated === false &&
              !element.disabled
            ) {
              this.testoviFiltered.push(element);
            }
          });

          this.testoviFiltered = this.testoviFiltered.sort(function(a, b) {
            return a.naziv.localeCompare(b.naziv, undefined, {
              numeric: true,
              sensitivity: "base"
            });
          });
        });
    },
    validateGroup: function(group) {
      return true;
      //  if (!isNaN(group)){
      //   return true;
      // } else {
      //   return false;
      // }
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

.circle {
  width: 0.4rem;
  height: 0.4rem;
  border-radius: 50%;
  display: inline-block;
}

.testoviDiv {
  margin: 0 auto;
}
</style>
