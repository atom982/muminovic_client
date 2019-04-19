<template>
  <div class="form-elements">
    <div class="row">
      <div class="col-md-12">
        <vuestic-widget
          v-if="ifdodajTest && $store.state.userId === 'admin@atom.ba'"
          headerText="Definicija testova - Kalkulisani testovi"
        >
          <div v-show="korak1" class="row">
            <div class="col-md-3"></div>
            <div class="col-md-6">
              <fieldset>
                <div class="form-group with-icon-left">
                  <div class="input-group">
                    <input
                      id="input-icon-left"
                      title=" "
                      v-model="sifraCalculated"
                      name="input-icon-left"
                      required
                    >
                    <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                    <label class="control-label" for="input-icon-left">{{'Unesite šifru testa'}}</label>
                    <i class="bar"></i>
                  </div>
                </div>
                <div class="form-group with-icon-left">
                  <div class="input-group">
                    <input
                      id="input-icon-left"
                      title=" "
                      v-model="imeCalculated"
                      name="input-icon-left"
                      required
                    >
                    <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                    <label
                      class="control-label"
                      for="input-icon-left"
                    >{{'Unesite kratki naziv testa'}}</label>
                    <i class="bar"></i>
                  </div>
                </div>
                <div class="form-group with-icon-left">
                  <div class="input-group">
                    <input
                      id="input-icon-left"
                      title=" "
                      v-model="pretragaCalculated"
                      name="input-icon-left"
                      required
                    >
                    <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                    <label class="control-label" for="input-icon-left">{{'Unesite pretragu/analit'}}</label>
                    <i class="bar"></i>
                  </div>
                </div>
                <div class="form-group with-icon-left">
                  <div class="input-group">
                    <input
                      id="input-icon-left"
                      title=" "
                      v-model="grouporder"
                      name="input-icon-left"
                      required
                    >
                    <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                    <label
                      class="control-label"
                      for="input-icon-left"
                    >{{'Unesite redni broj testa'}}</label>
                    <i class="bar"></i>
                  </div>
                </div>
                <vuestic-simple-select
                  label="Izaberite sekciju testa"
                  v-model="sekcija"
                  name="sekcija"
                  :required="true"
                  title=" "
                  ref="sekcijaSelect"
                  v-bind:options="sekcije"
                ></vuestic-simple-select>
                <vuestic-simple-select
                  label="Izaberite grupu testa"
                  v-model="grupa"
                  name="grupa"
                  :required="true"
                  title=" "
                  ref="grupaSelect"
                  v-bind:options="grupe"
                ></vuestic-simple-select>
                <vuestic-simple-select
                  label="Izaberite jedinicu testa"
                  v-model="jedinica"
                  name="grupa"
                  :required="true"
                  title=" "
                  ref="grupaSelect"
                  v-bind:options="jedinice"
                ></vuestic-simple-select>
                <button class="btn btn-secondary" @click.prevent="goNaprijed">
                  <span class="fa fa-step-forward"></span>
                  {{ ' Naprijed'}}
                </button>
              </fieldset>
              <hr>
              <a @click="prikaziPostavke" href="#">{{prikaziTekst}}</a>
            </div>
          </div>
          <div v-show="korakNext" class="row">
            <div class="col-md-12">
              <div v-if="testovi.length < 1" style="text-align:center;" class="testoviDiv">
                <h4 v-bind:style="{ color: activeColorStyle}">{{placeholder}}</h4>
                <div class="col-md-12">
                  <hr style="border-color:#4ab2e3">
                </div>
              </div>
              <div v-if="testovi.length > 0" style="text-align:center;" class="testoviDiv">
                <span
                  v-for="test in testovi"
                  :class="{'btn btn-info btn-micro': test.labassay.toLowerCase() != test.ime_testa.toLowerCase()}"
                  @click="izbaciTest($event)"
                  :name="test.labassay"
                >{{test.ime_testa }}</span>
                <div class="col-md-12">
                  <hr style="border-color:#4ae387">
                </div>
              </div>
              <div>
                <div
                  style="text-align:center;"
                  v-for="index in Math.ceil(brojevi.length/10)"
                  class="table"
                >
                  <div
                    @click="dodajTest($event)"
                    :title="test.analit"
                    v-for="test in (brojevi.slice((index-1)*10,index*10))"
                    class="btn btn-primary btn-micro"
                    align="middle"
                    :id="test.labassay"
                  >{{ test.ime_testa }}</div>
                </div>
                <div class="col-md-12">
                  <hr>
                </div>
                <div
                  style="text-align:center;"
                  v-for="index in Math.ceil(operacije.length/10)"
                  class="table"
                >
                  <div
                    @click="dodajTest($event)"
                    :title="test.analit"
                    v-for="test in (operacije.slice((index-1)*10,index*10))"
                    class="btn btn-secondary btn-micro"
                    align="middle"
                    :id="test.labassay"
                  >{{ test.ime_testa }}</div>
                </div>
                <div class="col-md-12">
                  <hr>
                </div>
                <div
                  style="text-align:center;"
                  v-for="index in Math.ceil(advanced.length/10)"
                  class="table"
                >
                  <div
                    @click="dodajTest($event)"
                    :title="test.analit"
                    v-for="test in (advanced.slice((index-1)*10,index*10))"
                    class="btn btn-secondary-warning btn-micro"
                    align="middle"
                    :id="test.labassay"
                  >{{ test.ime_testa }}</div>
                </div>
                <div class="col-md-12">
                  <hr>
                </div>
                <div v-if="sekcija === ''" style="text-align:center;" class="table">
                  <br>
                  <h4 v-bind:style="{ color: activeColorStyle}">{{sekcijaholder}}</h4>
                </div>
                <div
                  style="text-align:center;"
                  v-for="index in Math.ceil(sviTestovi.length/100)"
                  class="table"
                >
                  <br>
                  <div
                    @click="dodajTest($event)"
                    :title="test.analit"
                    v-for="test in (sviTestovi.slice((index-1)*100,index*100))"
                    class="btn btn-info btn-micro"
                    align="middle"
                    :id="test.labassay"
                  >{{ test.ime_testa }}</div>
                </div>
              </div>
              <div class="col-md-12">
                <hr>
              </div>

              <div class="row">
                <div class="col-md-3"></div>
                <div class="col-md-6">
                  <button class="btn btn-secondary" @click.prevent="goNazad">
                    <span class="fa fa-step-backward"></span>
                    {{ ' nazad'}}
                  </button>
                  <button class="btn btn-primary" @click.prevent="sacuvajTest">
                    <span class="fa fa-save"></span>
                    {{ ' SAČUVAJ'}}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </vuestic-widget>
        <vuestic-widget
          v-if="ifTrenutnePostavke"
          headerText="Trenutne postavke - Kalkulisani testovi"
        >

         <div >
                  <div class="form-group">
                    <div >
                      <input placeholder="Pretraga"  v-model="inputValue">
                      <i class="bar" :style="'width: ' + 200 + 'px'"/>
                    </div>
                  </div>
                </div>
          <div class="table-responsive">
            <table v-if="tabelaUslov1" class="table table-striped first-td-padding">
              <thead>
                <tr>
                 
                  <td>{{"SIFRA"}}</td>
                   <td>{{"NAZIV"}}</td>
                   <td>{{"ANALIT"}}</td>
                  <td>{{"JEDINICA"}}</td>
                  <td>{{"cijena"}}</td>
                  <td>{{"multi"}}</td>
                  <td>{{"order"}}</td>
                  

                 
                  <td>{{"SEKCIJA"}}</td>
                   <td>{{"GRUPA"}}</td>
                  <td>Uredi</td>
                  <td v-if="$store.state.userId === 'admin@atom.ba'">{{"AKCIJA"}}</td>
                </tr>
              </thead>
              <tbody>
                 <tr v-for="(element, index) in testoviFiltered"               
                    :key="index"
                    v-show="element.naziv.toLowerCase().includes(inputValue.toLowerCase()) || element.analit.toLowerCase().includes(inputValue.toLowerCase())">
                  <td style="width:200px; height:70%">{{element.sifra}}</td>
                  <td style="width:150px; height:70%">{{element.naziv}}</td>
                   <td style="width:280px; height:70%">{{element.analit}}</td>
                  <td style="width:160px; height:70%" v-if="tmpID != element._id">{{element.jedinica}}</td>
                 <td style="width:100px; height:70%" v-if="tmpID === element._id && !element.multi">
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
                  <td style="width:160px; height:70%" v-if="tmpID === element._id && element.multi">{{element.jedinica}}</td>

                 <td style="width:100px; height:70%" v-if="tmpID != element._id">{{element.price}}</td>
                  <td v-if="tmpID === element._id">
                    <div v-show="edit === false">{{element.price}}</div>
                    <input type="number" min="0" step="any"
                      style="width:70px; height:70%"
                      v-show="edit === true"
                      v-model="element.price"
                    >
                  </td>


                   <td style="width:180px; height:70%">
                     <button
                      :disabled="true"
                      title="Nije dostupno"
                      v-if="!element.multi"
                      :id="element.naziv"
                      :name="element._id"
                      class="btn btn-pale btn-micro"
                      @click="dodajAnalit($event)"
                    >
                      <span :id="element.naziv" :name="element._id" class="fa fa-edit"></span>
                      {{ ' ANALITI'}}
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
                      {{ ' IZBRIŠI' }}
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <vuestic-alert v-if="dataUslov1" type="warning" :withCloseBtn="false">
              <span>{{dataAvailable1}}</span>
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
                @click.prevent="povratakNazad"
              >
                <span class="fa fa-backward"></span>
                {{ ' POVRATAK'}}
              </button>
            </div>
          </div>
        </vuestic-widget>
      </div>
    </div>
  </div>
</template>

<script>
import { http } from "../../../../config/config.js";
import index from "axios";

export default {
  data() {
    return {
      inputValue: "",
      sifraCalculated: "",
      imeCalculated: "",
      pretragaCalculated: "",
      sekcija: "",
      sekcije: [],
      grupa: "",
      grupe: [],
      jedinica: "",
      jedinice: [],
      sviTestovi: [],
      operacije: [],
      brojevi: [],
      advanced: [],
      testovi: [],
      placeholder: "Unesite formulu",
      sekcijaholder: "Izaberite sekciju",
      ifdodajTest: true,
      ifTrenutnePostavke: false,
      testoviFiltered: [],
      sviMoguciTestovi: [],
      prikaziTekst: "Trenutne postavke",
      activeColorStyle: "#4ab2e3",
      dataAvailable1: "",
      dataUslov1: false,
      tabelaUslov1: false,
      newFormula: [],
      grouporder: "",
      uredi: true,
      edit: false,
      tmpID: "",
      tmpJedinica: "",
      tmpGrouporder: "",
      korak1: true,
      korakNext: false,
      toastText: "",
      toastIcon: "",
      toastPosition: "",
      toastDuration: 2500,
      isToastFullWidth: false,
      className: "",
      price: "",
      tmpPrice: ""
    };
  },
  name: "calculated",

  created: function() {
    if (this.$store.state.userId === "admin@atom.ba") {
    } else {
      this.prikaziPostavke();
    }
  },

  mounted() {
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

    http
      .get(
        "postavke/sekcija/list?token=" +
          this.$store.state.token +
          "&site=" +
          this.$store.state.site,
        {}
      )
      .then(res => {
        res.data.sekcija.forEach(element => {
          this.sekcije.push(element.sekcija);
        });
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
        this.sviTestovi = [];
        this.operacije = [];
        this.brojevi = [];
        this.advanced = [];

        this.operacije.push({
          labassay: "(",
          ime_testa: "(",
          analit: "("
        });
        this.operacije.push({
          labassay: "[",
          ime_testa: "[",
          analit: "["
        });
        this.operacije.push({
          labassay: "+",
          ime_testa: "+",
          analit: "+"
        });
        this.operacije.push({
          labassay: "-",
          ime_testa: "-",
          analit: "-"
        });
        this.operacije.push({
          labassay: "/",
          ime_testa: "/",
          analit: "/"
        });
        this.operacije.push({
          labassay: "*",
          ime_testa: "*",
          analit: "*"
        });
        this.operacije.push({
          labassay: ")",
          ime_testa: ")",
          analit: ")"
        });
        this.operacije.push({
          labassay: "]",
          ime_testa: "]",
          analit: "]"
        });
        this.operacije.push({
          labassay: ".",
          ime_testa: ".",
          analit: "."
        });
        this.operacije.push({
          labassay: ",",
          ime_testa: ",",
          analit: ","
        });
        this.operacije.push({
          labassay: "^",
          ime_testa: "^",
          analit: "^"
        });
        this.brojevi.push({
          labassay: "0",
          ime_testa: "0",
          analit: "0"
        });
        this.brojevi.push({
          labassay: "1",
          ime_testa: "1",
          analit: "1"
        });
        this.brojevi.push({
          labassay: "2",
          ime_testa: "2",
          analit: "2"
        });
        this.brojevi.push({
          labassay: "3",
          ime_testa: "3",
          analit: "3"
        });
        this.brojevi.push({
          labassay: "4",
          ime_testa: "4",
          analit: "4"
        });
        this.brojevi.push({
          labassay: "5",
          ime_testa: "5",
          analit: "5"
        });
        this.brojevi.push({
          labassay: "6",
          ime_testa: "6",
          analit: "6"
        });
        this.brojevi.push({
          labassay: "7",
          ime_testa: "7",
          analit: "7"
        });
        this.brojevi.push({
          labassay: "8",
          ime_testa: "8",
          analit: "8"
        });
        this.brojevi.push({
          labassay: "9",
          ime_testa: "9",
          analit: "9"
        });

        this.advanced.push({
          labassay: "Math.abs",
          ime_testa: "Math.abs",
          analit: "Returns the absolute value of x"
        });
        this.advanced.push({
          labassay: "Math.acos",
          ime_testa: "Math.acos",
          analit: "Returns the arccosine of x, in radians"
        });
        this.advanced.push({
          labassay: "Math.asin",
          ime_testa: "Math.asin",
          analit: "Returns the arcsine of x, in radians"
        });
        this.advanced.push({
          labassay: "Math.atan",
          ime_testa: "Math.atan",
          analit:
            "Returns the arctangent of x as a numeric value between -PI/2 and PI/2 radians"
        });
        this.advanced.push({
          labassay: "Math.atan2",
          ime_testa: "Math.atan2",
          analit: "Returns the arctangent of the quotient of its arguments"
        });
        this.advanced.push({
          labassay: "Math.ceil",
          ime_testa: "Math.ceil",
          analit: "Returns the value of x rounded up to its nearest integer"
        });
        this.advanced.push({
          labassay: "Math.cos",
          ime_testa: "Math.cos",
          analit: "Returns the cosine of x (x is in radians)"
        });
        this.advanced.push({
          labassay: "Math.exp",
          ime_testa: "Math.exp",
          analit: "Returns the value of Ex"
        });
        this.advanced.push({
          labassay: "Math.floor",
          ime_testa: "Math.floor",
          analit: "Returns the value of x rounded down to its nearest integer"
        });
        this.advanced.push({
          labassay: "Math.log",
          ime_testa: "Math.log",
          analit: "Returns the natural logarithm (base E) of x"
        });
        this.advanced.push({
          labassay: "Math.max",
          ime_testa: "Math.max",
          analit: "Returns the number with the highest value"
        });
        this.advanced.push({
          labassay: "Math.min",
          ime_testa: "Math.min",
          analit: "Returns the number with the lowest value"
        });
        this.advanced.push({
          labassay: "Math.pow",
          ime_testa: "Math.pow",
          analit: "Returns the value of x to the power of y"
        });
        this.advanced.push({
          labassay: "Math.random",
          ime_testa: "Math.random",
          analit: "Returns a random number between 0 and 1"
        });
        this.advanced.push({
          labassay: "Math.round",
          ime_testa: "Math.round",
          analit: "Returns the value of x rounded to its nearest integer"
        });
        this.advanced.push({
          labassay: "Math.sin",
          ime_testa: "Math.sin",
          analit: "Returns the sine of x (x is in radians)"
        });
        this.advanced.push({
          labassay: "Math.sqrt",
          ime_testa: "Math.sqrt",
          analit: "Returns the square root of x"
        });
        this.advanced.push({
          labassay: "Math.tan",
          ime_testa: "Math.tan",
          analit: "Returns the tangent of an angle"
        });
      });
  },
  watch: {
    sekcija: function() {
      this.grupa = "";
      this.jedinica = "";
      this.testovi = [];
      (this.placeholder = "Unesite formulu"),
        http
          .post("postavke/aparat/mount/list?token=" + this.$store.state.token, {
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

      http
        .get(
          "postavke/labtest/list?token=" +
            this.$store.state.token +
            "&site=" +
            this.$store.state.site,
          {}
        )
        .then(res => {
          this.sviTestovi = [];
          var aparat = [];
          var manual = [];

          res.data.testovi.forEach(element => {
            if (!element.calculated && this.sekcija === element.sekcija) {
              if (!element.manual) {
                aparat.push({
                  labassay: element._id,
                  ime_testa: element.naziv,
                  analit: element.analit,
                  manual: element.manual
                });
              }
              if (element.manual) {
                manual.push({
                  labassay: element._id,
                  ime_testa: element.naziv,
                  analit: element.analit,
                  manual: element.manual
                });
              }
            }
          });
          aparat.sort(function(a, b) {
            return a.ime_testa.toLowerCase() == b.ime_testa.toLowerCase()
              ? 0
              : +(a.ime_testa.toLowerCase() > b.ime_testa.toLowerCase()) || -1;
          });
          manual.sort(function(a, b) {
            return a.ime_testa.toLowerCase() == b.ime_testa.toLowerCase()
              ? 0
              : +(a.ime_testa.toLowerCase() > b.ime_testa.toLowerCase()) || -1;
          });

          this.sviTestovi = aparat.concat(manual);
          this.catchTestovi();
          if (res.data.success === false) {
          }
        });
      if (this.sekcija === "") {
      }
    }
  },
  methods: {
    editUnit(event, jedinica, order, cijena) {
      this.edit = true;
      this.uredi = false;
      this.tmpID = event.target.id;
      this.tmpJedinica = jedinica;
      this.tmpGrouporder = order;
      this.tmpPrice = cijena;
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
          this.edit = false;
          this.uredi = true;
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
                site: this.$store.state.site,
                price: cijena.trim(),
                _id: event.target.id,
                unit: unit,
                order: order.trim()
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
        }
      }
    },
    dodajTest(event) {
      if (this.testovi.length < 1) {
        this.placeholder = "";
      }
      var manual = false;

      this.sviTestovi.forEach(element => {
        if (element.manual && event.target.id === element.labassay) {
          manual = element.manual;
        }
      });
      this.testovi.push({
        labassay: event.target.id,
        ime_testa: event.target.innerText,
        analit: event.target.innerText,
        manual: manual
      });
    },
    izbaciTest(event) {
      if (this.testovi.length < 2) {
        this.placeholder = "Unesite formulu";
      }
      this.test = event.target.innerText;

      for (var i = 0; i < this.testovi.length; i++) {
        if (this.testovi[i].labassay === event.target.getAttribute("name")) {
          this.testovi.splice(i, 1);
          break;
        }
      }

      if (event.target.className === "btn btn-primary btn-micro") {
        document.getElementById(event.target.getAttribute("name")).className =
          "btn btn-primary btn-micro";
      }
      if (event.target.className === "btn btn-secondary btn-micro") {
        document.getElementById(event.target.getAttribute("name")).className =
          "btn btn-secondary btn-micro";
      }
    },
    sacuvajTest() {
      var required = [];

      this.testovi.forEach(element => {
        if (element.labassay.length > 10) {
          required.push(element);
        }
      });
      var formula = [];
      this.testovi.forEach(element => {
        formula.push(element.labassay);
      });

      var item = true;
      var validF = true;

      if (
        this.sifraCalculated.trim() === "" ||
        this.imeCalculated.trim() === "" ||
        this.pretragaCalculated.trim() === "" ||
        this.sekcija.trim() === "" ||
        this.grupa.trim() === "" ||
        this.jedinica.trim() === ""
      ) {
        item = false;
        validF = false;
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
      } else if (required === undefined || required.length < 1) {
        item = false;
        validF = false;

        this.toastText = "Formula nije definisana!";
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
      } else if (formula === undefined || formula.length < 1) {
        item = false;
        validF = false;
        this.toastText = "Formula nije definisana!";
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
        this.korak1 = true;
        this.korakNext = false;
        this.grouporder = "";
      } else {
        var i;

        for (i = 0; i < this.sviMoguciTestovi.length; i++) {
          if (this.sifraCalculated.trim() == this.sviMoguciTestovi[i].sifra) {
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
            this.korak1 = true;
            this.korakNext = false;
            this.sifraCalculated = "";
          }
        }
      }
      if (check != false && item == true) {
        var j;

        for (j = 0; j < this.sviMoguciTestovi.length; j++) {
          if (
            this.pretragaCalculated.trim() == this.sviMoguciTestovi[j].analit
          ) {
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

            this.korak1 = true;
            this.korakNext = false;
            this.pretragaCalculated = "";
          }
        }
      }
      if (item && this.checkAndParseFormula(formula)) {
        http
          .post("/postavke/aptest/calculated", {
            email: this.$store.state.userId,
            sifra: this.sifraCalculated,
            naziv: this.imeCalculated,
            analit: this.pretragaCalculated,
            sekcija: this.sekcija,
            grupa: this.grupa,
            jedinica: this.jedinica,
            grouporder: this.grouporder,
            price: this.price,
            calculated: true,
            calculatedTests: required,
            calculatedFormula: this.newFormula,
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
              this.testovi = [];
              this.sifraCalculated = "";
              this.imeCalculated = "";
              this.pretragaCalculated = "";
              this.sekcija = "";
              this.grupa = "";
              this.jedinica = "";
              this.grouporder = "";
              this.price = "";
              this.placeholder = "Unesite formulu";
              this.refreshAll();
            }
            this.korak1 = true;
            this.korakNext = false;
          });
      }
    },
    povratakNazad() {
      this.refreshAll();
      this.ifTrenutnePostavke = !this.ifTrenutnePostavke;
      this.ifdodajTest = !this.ifdodajTest;
    },
    prikaziPostavke() {
      this.sifraCalculated = "";
      this.imeCalculated = "";
      this.pretragaCalculated = "";
      this.sekcija = "";
      this.grupa = "";
      this.jedinica = "";
      this.grouporder = "";
      this.refreshAll();
      this.catchTestovi();
      this.ifTrenutnePostavke = !this.ifTrenutnePostavke;
      this.ifdodajTest = !this.ifdodajTest;
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
                this.catchTestovi();
                this.catchTestovi();
              }
            });
        })
        .catch(function() {});
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
          this.sviMoguciTestovi = [];
          this.testoviFiltered = [];
          this.sviMoguciTestovi = res.data.testovi;
          res.data.testovi.forEach(element => {
            if (element.calculated === true && !element.disabled) {
              this.testoviFiltered.push(element);
            }
          });

          this.testoviFiltered = this.testoviFiltered.sort(function (a, b) {
                        return a.naziv.localeCompare(b.naziv, undefined, {
                          numeric: true,
                          sensitivity: 'base'
                        })
                      })

          if (this.testoviFiltered.length > 0) {
            this.dataAvailable1 = "";
            this.dataUslov1 = false;
            this.tabelaUslov1 = true;
            this.dataUslovDanger = false;
          }
          if (this.testoviFiltered.length <= 0) {
            this.dataAvailable1 = "Nema dostupnih podataka.";
            this.dataUslov1 = true;
            this.tabelaUslov1 = false;
            this.dataUslovDanger = false;
          }
        });
    },
    refreshAll: function() {
      http
        .get(
          "postavke/labtest/list?token=" +
            this.$store.state.token +
            "&site=" +
            this.$store.state.site,
          {}
        )
        .then(res => {
          this.sviTestovi = [];
          this.operacije = [];
          this.brojevi = [];
          this.advanced = [];

          this.operacije.push({
            labassay: "(",
            ime_testa: "(",
            analit: "("
          });
          this.operacije.push({
            labassay: "[",
            ime_testa: "[",
            analit: "["
          });
          this.operacije.push({
            labassay: "+",
            ime_testa: "+",
            analit: "+"
          });
          this.operacije.push({
            labassay: "-",
            ime_testa: "-",
            analit: "-"
          });
          this.operacije.push({
            labassay: "/",
            ime_testa: "/",
            analit: "/"
          });
          this.operacije.push({
            labassay: "*",
            ime_testa: "*",
            analit: "*"
          });
          this.operacije.push({
            labassay: ")",
            ime_testa: ")",
            analit: ")"
          });
          this.operacije.push({
            labassay: "]",
            ime_testa: "]",
            analit: "]"
          });
          this.operacije.push({
            labassay: ".",
            ime_testa: ".",
            analit: "."
          });
          this.operacije.push({
            labassay: ",",
            ime_testa: ",",
            analit: ","
          });
          this.operacije.push({
            labassay: "^",
            ime_testa: "^",
            analit: "^"
          });
          this.brojevi.push({
            labassay: "0",
            ime_testa: "0",
            analit: "0"
          });
          this.brojevi.push({
            labassay: "1",
            ime_testa: "1",
            analit: "1"
          });
          this.brojevi.push({
            labassay: "2",
            ime_testa: "2",
            analit: "2"
          });
          this.brojevi.push({
            labassay: "3",
            ime_testa: "3",
            analit: "3"
          });
          this.brojevi.push({
            labassay: "4",
            ime_testa: "4",
            analit: "4"
          });
          this.brojevi.push({
            labassay: "5",
            ime_testa: "5",
            analit: "5"
          });
          this.brojevi.push({
            labassay: "6",
            ime_testa: "6",
            analit: "6"
          });
          this.brojevi.push({
            labassay: "7",
            ime_testa: "7",
            analit: "7"
          });
          this.brojevi.push({
            labassay: "8",
            ime_testa: "8",
            analit: "8"
          });
          this.brojevi.push({
            labassay: "9",
            ime_testa: "9",
            analit: "9"
          });

          this.advanced.push({
            labassay: "Math.abs",
            ime_testa: "Math.abs",
            analit: "Returns the absolute value of x"
          });
          this.advanced.push({
            labassay: "Math.acos",
            ime_testa: "Math.acos",
            analit: "Returns the arccosine of x, in radians"
          });
          this.advanced.push({
            labassay: "Math.asin",
            ime_testa: "Math.asin",
            analit: "Returns the arcsine of x, in radians"
          });
          this.advanced.push({
            labassay: "Math.atan",
            ime_testa: "Math.atan",
            analit:
              "Returns the arctangent of x as a numeric value between -PI/2 and PI/2 radians"
          });
          this.advanced.push({
            labassay: "Math.atan2",
            ime_testa: "Math.atan2",
            analit: "Returns the arctangent of the quotient of its arguments"
          });
          this.advanced.push({
            labassay: "Math.ceil",
            ime_testa: "Math.ceil",
            analit: "Returns the value of x rounded up to its nearest integer"
          });
          this.advanced.push({
            labassay: "Math.cos",
            ime_testa: "Math.cos",
            analit: "Returns the cosine of x (x is in radians)"
          });
          this.advanced.push({
            labassay: "Math.exp",
            ime_testa: "Math.exp",
            analit: "Returns the value of Ex"
          });
          this.advanced.push({
            labassay: "Math.floor",
            ime_testa: "Math.floor",
            analit: "Returns the value of x rounded down to its nearest integer"
          });
          this.advanced.push({
            labassay: "Math.log",
            ime_testa: "Math.log",
            analit: "Returns the natural logarithm (base E) of x"
          });
          this.advanced.push({
            labassay: "Math.max",
            ime_testa: "Math.max",
            analit: "Returns the number with the highest value"
          });
          this.advanced.push({
            labassay: "Math.min",
            ime_testa: "Math.min",
            analit: "Returns the number with the lowest value"
          });
          this.advanced.push({
            labassay: "Math.pow",
            ime_testa: "Math.pow",
            analit: "Returns the value of x to the power of y"
          });
          this.advanced.push({
            labassay: "Math.random",
            ime_testa: "Math.random",
            analit: "Returns a random number between 0 and 1"
          });
          this.advanced.push({
            labassay: "Math.round",
            ime_testa: "Math.round",
            analit: "Returns the value of x rounded to its nearest integer"
          });
          this.advanced.push({
            labassay: "Math.sin",
            ime_testa: "Math.sin",
            analit: "Returns the sine of x (x is in radians)"
          });
          this.advanced.push({
            labassay: "Math.sqrt",
            ime_testa: "Math.sqrt",
            analit: "Returns the square root of x"
          });
          this.advanced.push({
            labassay: "Math.tan",
            ime_testa: "Math.tan",
            analit: "Returns the tangent of an angle"
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
    },
    checkAndParseFormula(formula) {
      this.newFormula = [];
      var zagrada1 = 0;
      var zagrada2 = 0;
      var nan = false;
      if (
        formula[0] == ")" ||
        formula[formula.length - 1] == "(" ||
        formula[0] == "*" ||
        formula[0] == "/" ||
        formula[0] == "^" ||
        formula[0] == "." ||
        formula[formula.length - 1] == "*" ||
        formula[formula.length - 1] == "/" ||
        formula[formula.length - 1] == "^" ||
        formula[formula.length - 1] == "." ||
        formula[formula.length - 1] == "-" ||
        formula[formula.length - 1] == "+"
      ) {
        this.toastText = "Formula nije validna!";
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
        return false;
      } else {
        var j = -1;

        formula.forEach(element => {
          j++;
          if (element == "(") {
            zagrada1++;
          }
          if (element == ")") {
            zagrada2++;
          }
          if (element == ".") {
            if (isNaN(formula[j - 1]) || isNaN(formula[j + 1])) {
              nan = true;
            }
          }
        });
        if (zagrada1 != zagrada2) {
          this.toastText = "Formula nije validna!";
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
          return false;
        } else if (nan) {
          this.toastText = "Formula nije validna!";
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
          return false;
        } else {
          var novaFormula = [];
          var tempNiz = [];
          var i = 0;
          var kontrola = true;

          formula.forEach(element => {
            i++;
            if (!isNaN(element)) {
              // Ako je broj
              tempNiz.push(element); // Gurni ga u privremeni niz
              kontrola = true; // Element je prosao kontrolu
            }
            if (element === ".") {
              // Ako je . dodaj i nju u privremeni niz
              tempNiz.push(element);
              kontrola = true; // Element je prosao kontrolu
            }
            if ((isNaN(element) && element != ".") || formula.length == i) {
              // Ako nije broj ili tacka, zavrsi privremeni niz
              if (kontrola && tempNiz.length > 0) {
                //&& !isNaN(tempNiz)
                novaFormula.push(tempNiz.join(""));
              }
              if (formula.length != i || isNaN(formula[formula.length - 1])) {
                novaFormula.push(element);
                tempNiz = [];
                kontrola = false;
              }
            }
          });

          this.newFormula = novaFormula;
          var tacke = true;

          this.newFormula.forEach(element => {
            var count = 0;
            for (var i = 0; element.length > i; i++) {
              if (element.charAt(i) == ".") {
                ++count;
              }
            }
            if (count > 1) {
              tacke = false;
            }
          });
          if (tacke) {
            return true;
          } else {
            this.toastText = "Formula nije validna!";
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
            return false;
          }
        }
      }
    },
    goNazad() {
      this.korak1 = true;
      this.korakNext = false;
    },
    goNaprijed() {
      var item = true;

      if (
        this.grouporder.trim() === "" ||
        this.sifraCalculated.trim() === "" ||
        this.imeCalculated.trim() === "" ||
        this.pretragaCalculated.trim() === "" ||
        this.sekcija.trim() === "" ||
        this.grupa.trim() === "" ||
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
        this.korak1 = true;
        this.korakNext = false;
        this.grouporder = "";
      } else {
        var i;

        for (i = 0; i < this.sviMoguciTestovi.length; i++) {
          if (this.sifraCalculated.trim() == this.sviMoguciTestovi[i].sifra) {
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
            this.korak1 = true;
            this.korakNext = false;
            this.sifraCalculated = "";
          }
        }
      }
      if (check != false && item == true) {
        var j;

        for (j = 0; j < this.sviMoguciTestovi.length; j++) {
          if (
            this.pretragaCalculated.trim() == this.sviMoguciTestovi[j].analit
          ) {
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

            this.korak1 = true;
            this.korakNext = false;
            this.pretragaCalculated = "";
          }
        }
      }
      if (item) {
        this.korak1 = false;
        this.korakNext = true;
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

.testoviDiv {
  margin: 0 auto;
}
</style>