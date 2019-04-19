<template>
  <div class="form-elements">
    <div class="row">
      <div class="col-md-12">
        <vuestic-widget v-if="ifTrenutnePostavke" headerText="Reference">
          <!-- <div class="row">
            <div class="col-md-3"></div>
            <div class="col-md-6">
              <vuestic-simple-select
                v-if="!edit"
                label="Izaberite aparat"
                v-model="tpAparat"
                name="aparat"
                :required="true"
                title=" "
                ref="aparatSelect"
                v-bind:options="aparati"
              ></vuestic-simple-select>

              <div v-if="edit" class="form-group">
                <div class="input-group">
                  <input disabled id="input-icon-left" title=" " required>
                  <label class="control-label" for="sajt">{{tpAparat}}</label>
                  <i class="bar"></i>
                </div>
              </div>
            </div>
          </div> -->

             <div>
            <div class="form-group">
              <div>
                <input placeholder="Pretraga" v-model="inputValue">
                <i class="bar" :style="'width: ' + 200 + 'px'"/>
              </div>
            </div>
          </div>

          <div class="table-responsive">
            <table v-if="tabelaUslov1" class="table table-striped first-td-padding">
              <thead>

                 

                <tr>
                  <td width="10%">{{"kod"}}</td>
                  <td width="10%">{{"naziv"}}</td>
                  <td width="20%">{{"analit"}}</td>
                  <td width="10%">{{"tip uzorka"}}</td>
                  <td width="10%">{{"metoda"}}</td>

                  <td width="10%">{{"sekcija"}}</td>
                  <td width="20%">{{"grupa"}}</td>

                  <td width="10%">{{"reference"}}</td>
                </tr>
              </thead>

              <tbody>
                <tr v-for="(element, index) in testovi" 
                :key="index"
                v-show="element.test.naziv.toLowerCase().includes(inputValue.toLowerCase()) 
                  || element.test.analit.toLowerCase().includes(inputValue.toLowerCase())
                  || element.sekcija.toLowerCase().includes(inputValue.toLowerCase())

                  || element.tipoviUzorka[0].toLowerCase().includes(inputValue.toLowerCase())
                  || element.metoda.toLowerCase().includes(inputValue.toLowerCase())

                  || element.grupa.toLowerCase().includes(inputValue.toLowerCase())
                  || element.kod.includes(inputValue)">
                  <td>{{element.kod}}</td>
                  <td>{{element.test.naziv}}</td>
                  <td>{{element.test.analit}}</td>

                  <td>{{element.tipoviUzorka[0]}}</td>
                  <td>{{element.metoda}}</td>

                  <td>{{element.sekcija}}</td>
                  <td v-if="element.grupa.includes('.')">{{element.grupa.split(".")[1].trim()}}</td>
                  <td v-if="!element.grupa.includes('.')">{{element.grupa}}</td>

                  <td>
                    <button
                      :disabled="edit"
                      title="Referentne vrijednosti"
                      :id="element._id"
                      :name="element.test.naziv"
                      class="btn btn-primary btn-micro"
                      @click="dodajReferentne($event, element.interpretacija, element.test.multi)"
                    >
                      <span :id="element._id" :name="element.test.naziv" class="glyphicon glyphicon-stats"></span>
                      
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
        </vuestic-widget>

        <vuestic-widget v-if="ifDodajAnalit" headerText="Reference">
          <div class="row">
            <div class="col-md-5">
              <div class="row">
                <div class="col-md-3"></div>
                <div class="col-md-6">
                  <div style="text-align:center;" class="testoviDiv">
                    <h6>Aparat: {{tpAparat}}</h6>
                  </div>
                  <div style="text-align:center;" class="testoviDiv">
                    <h5>
                      Naziv testa:
                      <span style="color: #e34a4a;">{{test}}</span>
                    </h5>
                    <h5>{{obj.test.analit}}</h5>
                  </div>
                  <div v-if="ifJedinica" style="text-align:center;" class="testoviDiv">
                    <h6>Jedinica: {{obj.test.jedinica}}</h6>
                  </div>
                  <hr>
                </div>
              </div>

              <div class="row">
                <div class="col-md-12">
                  <fieldset>
                    <div class="row">
                      <div class="col-md-6">
                        <vuestic-simple-select
                          label="Izaberite referentnu grupu"
                          v-model="refGrupa"
                          name="refGrupa"
                          :required="true"
                          title=" "
                          ref="refGrupaSelect"
                          v-bind:options="refGrupe"
                        ></vuestic-simple-select>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group with-icon-left">
                          <div class="input-group">
                            <input
                              type="number"
                              id="input-icon-left"
                              title=" "
                              v-model="dRef"
                              name="input-icon-left"
                              required
                            >
                            <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                            <label
                              class="control-label"
                              for="input-icon-left"
                            >{{'Donja referentna vrijednost'}}</label>
                            <i class="bar"></i>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group with-icon-left">
                          <div class="input-group">
                            <input
                              type="number"
                              id="input-icon-left"
                              title=" "
                              v-model="gRef"
                              name="input-icon-left"
                              required
                            >
                            <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                            <label
                              class="control-label"
                              for="input-icon-left"
                            >{{'Gornja referentna vrijednost'}}</label>
                            <i class="bar"></i>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div v-if="dobuslov" class="row">
                      <div v-if="!dobnaGrD" class="col-md-6">
                        <div class="form-group with-icon-left">
                          <div class="input-group">
                            <input
                              type="number"
                              min="0"
                              step="any"
                              id="input-icon-left"
                              title=" "
                              v-model="dDob"
                              name="input-icon-left"
                              required
                            >
                            <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                            <label
                              class="control-label"
                              for="input-icon-left"
                            >{{'Unesite donju dobnu granicu'}}</label>
                            <i class="bar"></i>
                          </div>
                        </div>
                      </div>

                      <div v-if="!dobnaGrG" class="col-md-6">
                        <div class="form-group with-icon-left">
                          <div class="input-group">
                            <input
                              type="number"
                              min="0"
                              step="any"
                              id="input-icon-left"
                              title=" "
                              v-model="gDob"
                              name="input-icon-left"
                              required
                            >
                            <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                            <label
                              class="control-label"
                              for="input-icon-left"
                            >{{'Unesite gornju dobnu granicu'}}</label>
                            <i class="bar"></i>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-md-6">
                        <vuestic-simple-select
                          class="form-group with-icon-right"
                          label="Izaberite spol  grupe"
                          v-model="spol"
                          v-validate="'required'"
                          name="spol"
                          required
                          title=" "
                          ref="spolSelect"
                          v-bind:options="spolovi"
                        ></vuestic-simple-select>
                      </div>
                    </div>

                    <!-- <hr> -->
                    <button
                      :disabled="edit"
                      v-if="uslov"
                      class="btn btn-sm btn-secondary"
                      @click.prevent="gotovoTrenutne"
                    >
                      <span class="fa fa-step-backward"></span>
                      {{ ' nazad'}}
                    </button>
                    <!-- <button :disabled="edit" v-if="uslov" class="btn btn-secondary" @click.prevent="gotovo"><span class="fa fa-backward"></span>{{ ' POVRATAK'}}</button> -->
                    <button
                      :disabled="edit"
                      class="btn btn-sm btn-primary"
                      @click.prevent="sacuvajReferentne"
                    >
                      <span class="glyphicon glyphicon-plus"></span>
                      {{ ' DODAJ'}}
                    </button>
                  </fieldset>

                  <hr>
                  <a
                    v-if="!edit"
                    @click="ifDodajAnalit2 = !ifDodajAnalit2"
                    href="#"
                  >{{'Trenutne referentne vrijednosti'}}</a>
                  <a
                    v-if="edit"
                    style="color: #e34a4a;"
                    href="#"
                  >{{'Trenutne referentne vrijednosti'}}</a>
                  <!-- <span v-if="refGrupa === 'DJECA'">
                  {{" | "}}<a @click="switchDobGrD" href="#">{{'Donja dobna granica'}}</a>{{" | "}}<a @click="switchDobGrG" href="#">{{'Gornja dobna granica'}}</a></span>-->
                </div>
              </div>
            </div>

            <div v-if="!ifDodajAnalit2" class="col-md-7">
              <div class="table-responsive">
                <table v-if="tabelaUslov2" class="table table-striped first-td-padding">
                  <thead>
                    <tr>
                      <td>{{"Grupa"}}</td>
                      <td>{{"DRef"}}</td>
                      <td>{{"GRef"}}</td>

                      <td>{{"Dob"}}</td>
                      <td>{{"Spol"}}</td>
                      <td>Uredi</td>
                      <td>{{"akcija"}}</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="element in referentne">
                      <td>{{element.grupa}}</td>
                      <td v-if="tmpID != element._id ">
                        <strong>{{element.refd}}</strong>
                      </td>
                      <td v-if="tmpID === element._id ">
                        <div v-show="edit === false">
                          <label>
                            <strong>{{element.refd}}</strong>
                          </label>
                        </div>
                        <input
                          type="number"
                          class="table-info"
                          style="width:60px; height:70%"
                          v-show="edit === true"
                          v-model="element.refd"
                        >
                      </td>

                      <td v-if="tmpID != element._id ">
                        <strong>{{element.refg}}</strong>
                      </td>

                      <td v-if="tmpID === element._id ">
                        <div v-show="edit === false">
                          <label>
                            <strong>{{element.refg}}</strong>
                          </label>
                        </div>
                        <input
                          type="number"
                          class="table-info"
                          style="width:60px; height:70%"
                          v-show="edit === true"
                          v-model="element.refg"
                        >
                      </td>

                      <td>{{element.dDob}} - {{element.gDob}}</td>

                      <td>{{element.spol}}</td>

                      <td>
                        <button
                          :disabled="edit"
                          v-if="tmpID != element._id"
                          @click.prevent="editRef($event)"
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
                          @click.prevent="editRef($event)"
                          title="Uredite podatke"
                          v-bind:id="element._id"
                          class="btn btn-micro btn-info"
                        >
                          <span v-bind:id="element._id" class="glyphicon glyphicon-edit"></span>
                          {{''}}
                        </button>
                        <button
                          v-if="!uredi && tmpID === element._id"
                          @click.prevent="saveRef($event, element.refd, element.refg, element.spol, element.dDob, element.gDob, element.grupa)"
                          title="Sačuvajte izmjene"
                          v-bind:id="element._id"
                          class="btn btn-micro btn-secondary"
                        >
                          <span v-bind:id="element._id" class="fa fa-save"></span>
                          {{''}}
                        </button>
                      </td>

                      <td>
                        <button
                          :disabled="edit"
                          title="Brisanje zapisa"
                          v-bind:id="element._id"
                          class="btn btn-danger btn-micro"
                          @click="catchDialog2($event)"
                        >
                          <span v-bind:id="element._id" class="fa fa-trash-o"></span>
                         
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

        <vuestic-widget v-if="ifMulti" headerText="Reference">
          <!-- spisak analita -->
          <div class="row">
            <div class="col-md-4">
              <!-- <div style="text-align:center;" class="testoviDiv">
                <h6>Aparat: {{tpAparat}}</h6>
              </div>
              <div style="text-align:center;" class="testoviDiv">
                <h5>
                  Naziv testa:
                  <span style="color: #e34a4a;">{{test}}</span>
                </h5>
              </div>
              <hr>-->
              <div class="table-responsive">
                <table v-if="nUslov2" class="table table-striped first-td-padding">
                  <thead>
                    <tr>
                      <td>{{"kod"}}</td>
                      <td>{{"naziv"}}</td>
                      <td>{{"opis"}}</td>
                      <td>{{"jedinica"}}</td>

                      <td>{{"reference"}}</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="element in refAnaliti">
                      <td>{{element.kod}}</td>
                      <td>{{element.naziv}}</td>
                      <td>{{element.opis}}</td>
                      <td>{{element.jedinica}}</td>

                      <td>
                        <button
                          :disabled="edit"
                          title="Dodavanje referentnih vrijednosti"
                          :id="element._id"
                          :name="element.naziv"
                          class="btn btn-primary btn-micro"
                          @click="analitReferentne($event, element.interpretacija)"
                        >
                          <span :id="element._id" :name="element.naziv" class="glyphicon glyphicon-stats"></span>
                          
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <vuestic-alert v-if="nUslov" type="warning" :withCloseBtn="false">
                  <span>{{nData}}</span>
                </vuestic-alert>
                <vuestic-alert v-if="nUslovDanger" type="danger" :withCloseBtn="false">
                  <span>{{nDataDanger}}</span>
                </vuestic-alert>
              </div>
            </div>

            <!-- <div class="row">
              <div class="col-md-6">
                <hr v-if="uslov">
              </div>
            </div>

            <div class="row">
              <div class="col-md-6">
                <button class="btn btn-sm btn-secondary" @click.prevent="gotovoAkoNema">
                  <span class="fa fa-step-backward"></span>
                  {{ ' nazad'}}
                </button>
                
              </div>
            </div>-->
            <div class="col-md-4">
              <div>
                <div class="row">
                  <div class="col-md-3"></div>
                  <div class="col-md-6">
                    <div style="text-align:center;" class="testoviDiv">
                      <h6>Aparat: {{tpAparat}}</h6>
                    </div>
                    <div style="text-align:center;" class="testoviDiv">
                      <h5>
                        Naziv testa:
                        <span style="color: #e34a4a;">{{test}}</span>
                      </h5>
                    </div>
                    <div v-if="ifRefAnalit" style="text-align:center;" class="testoviDiv">
                      <h6>
                        Analit:
                        <span style="color: #e34a4a;">{{tpTest}}</span>
                      </h6>
                    </div>
                    <div v-if="ifRefAnalit" style="text-align:center;" class="testoviDiv">
                      <h6>Jedinica: {{analitUnit}}</h6>
                    </div>
                    <hr>
                  </div>
                </div>

                <div v-if="ifRefAnalit" class="row">
                  <div class="col-md-12">
                    <fieldset>
                      <div class="row">
                        <div class="col-md-6">
                          <vuestic-simple-select
                            label="Izaberite referentnu grupu"
                            v-model="refGrupa"
                            name="refGrupa"
                            :required="true"
                            title=" "
                            ref="refGrupaSelect"
                            v-bind:options="refGrupe"
                          ></vuestic-simple-select>
                        </div>
                      </div>

                      <!-- ana reference -->
                      <div class="row">
                        <div class="col-md-6">
                          <div class="form-group with-icon-left">
                            <div class="input-group">
                              <input
                                type="number"
                                id="input-icon-left"
                                title=" "
                                v-model="dRef"
                                name="input-icon-left"
                                required
                              >
                              <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                              <label
                                class="control-label"
                                for="input-icon-left"
                              >{{'Donja referentna vrijednost'}}</label>
                              <i class="bar"></i>
                            </div>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group with-icon-left">
                            <div class="input-group">
                              <input
                                type="number"
                                id="input-icon-left"
                                title=" "
                                v-model="gRef"
                                name="input-icon-left"
                                required
                              >
                              <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                              <label
                                class="control-label"
                                for="input-icon-left"
                              >{{'Gornja referentna vrijednost'}}</label>
                              <i class="bar"></i>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div v-if="dobuslov" class="row">
                        <div v-if="!dobnaGrD" class="col-md-6">
                          <div class="form-group with-icon-left">
                            <div class="input-group">
                              <input
                                type="number"
                                min="0"
                                step="any"
                                id="input-icon-left"
                                title=" "
                                v-model="dDob"
                                name="input-icon-left"
                                required
                              >
                              <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                              <label
                                class="control-label"
                                for="input-icon-left"
                              >{{'Unesite donju dobnu granicu'}}</label>
                              <i class="bar"></i>
                            </div>
                          </div>
                        </div>

                        <div v-if="!dobnaGrG" class="col-md-6">
                          <div class="form-group with-icon-left">
                            <div class="input-group">
                              <input
                                type="number"
                                min="0"
                                step="any"
                                id="input-icon-left"
                                title=" "
                                v-model="gDob"
                                name="input-icon-left"
                                required
                              >
                              <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                              <label
                                class="control-label"
                                for="input-icon-left"
                              >{{'Unesite gornju dobnu granicu'}}</label>
                              <i class="bar"></i>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="row">
                        <div class="col-md-6">
                          <vuestic-simple-select
                            class="form-group with-icon-right"
                            label="Izaberite spol  grupe"
                            v-model="spol"
                            v-validate="'required'"
                            name="spol"
                            required
                            title=" "
                            ref="spolSelect"
                            v-bind:options="spolovi"
                          ></vuestic-simple-select>
                        </div>
                      </div>

                      <button
                        :disabled="edit"
                        class="btn btn-sm btn-secondary"
                        @click.prevent="gotovoAkoNema"
                      >
                        <span class="fa fa-step-backward"></span>
                        {{ ' nazad'}}
                      </button>
                      
                      <button
                        :disabled="edit"
                        class="btn btn-sm btn-primary"
                        @click.prevent="sacuvajRefAnalit"
                      >
                        <span class="glyphicon glyphicon-plus"></span>
                        {{ ' DODAJ'}}
                      </button>
                    </fieldset>

                    <hr>
                    <a
                      v-if="!edit"
                      @click="trenutneRef = !trenutneRef"
                      href="#"
                    >{{'Trenutne referentne vrijednosti'}}</a>
                    <a
                      v-if="edit"
                      style="color: #e34a4a;"
                      href="#"
                    >{{'Trenutne referentne vrijednosti'}}</a>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="!trenutneRef" class="col-md-4">
              <div class="table-responsive">
                <table v-if="tabelaUslov3" class="table table-striped first-td-padding">
                  <thead>
                    <tr>
                      <td>{{"Grupa"}}</td>
                      <td>{{"DRef"}}</td>
                      <td>{{"GRef"}}</td>
                      <td>{{"Dob"}}</td>
                      <td>{{"Spol"}}</td>
                      <td>Uredi</td>
                      <td>{{"akcija"}}</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="element in anaReferentne">
                      <td>{{element.grupa}}</td>
                      <td v-if="tmpID != element._id ">
                        <strong>{{element.refd}}</strong>
                      </td>
                      <td v-if="tmpID === element._id ">
                        <div v-show="edit === false">
                          <label>
                            <strong>{{element.refd}}</strong>
                          </label>
                        </div>

                        <input
                          type="number"
                          class="table-info"
                          style="width:60px; height:70%"
                          v-show="edit === true"
                          v-model="element.refd"
                        >
                      </td>

                      <td v-if="tmpID != element._id ">
                        <strong>{{element.refg}}</strong>
                      </td>

                      <td v-if="tmpID === element._id ">
                        <div v-show="edit === false">
                          <label>
                            <strong>{{element.refg}}</strong>
                          </label>
                        </div>
                        <input
                          type="number"
                          class="table-info"
                          style="width:60px; height:70%"
                          v-show="edit === true"
                          v-model="element.refg"
                        >
                      </td>

                      <td>{{element.dDob}} - {{element.gDob}}</td>
                      <td>{{element.spol}}</td>

                      <td>
                        <button
                          :disabled="edit"
                          v-if="tmpID != element._id"
                          @click.prevent="editRefAna($event)"
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
                          @click.prevent="editRefAna($event)"
                          title="Uredite podatke"
                          v-bind:id="element._id"
                          class="btn btn-micro btn-info"
                        >
                          <span v-bind:id="element._id" class="glyphicon glyphicon-edit"></span>
                          {{''}}
                        </button>
                        <button
                          v-if="!uredi && tmpID === element._id"
                          @click.prevent="saveRefAna($event, element.refd, element.refg, element.spol, element.dDob, element.gDob, element.grupa)"
                          title="Sačuvajte izmjene"
                          v-bind:id="element._id"
                          class="btn btn-micro btn-secondary"
                        >
                          <span v-bind:id="element._id" class="fa fa-save"></span>
                          {{''}}
                        </button>
                      </td>

                      <td>
                        <button
                          :disabled="edit"
                          title="Brisanje zapisa"
                          v-bind:id="element._id"
                          class="btn btn-danger btn-micro"
                          @click="catchDialogAnaReference($event)"
                        >
                          <span v-bind:id="element._id" class="fa fa-trash-o"></span>
                          
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <vuestic-alert v-if="dataUslov3" type="warning" :withCloseBtn="false">
                  <span>{{dataAvailable3}}</span>
                </vuestic-alert>
                <vuestic-alert v-if="dataUslovDanger" type="danger" :withCloseBtn="false">
                  <span>{{dataAvailable}}</span>
                </vuestic-alert>
              </div>
            </div>
          </div>
        </vuestic-widget>

        <vuestic-widget v-if="false" headerText="Reference">
          <!-- ref za analite -->
        </vuestic-widget>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";
import { http } from "../../../../config/config.js";
export default {
  data() {
    return {
      refreshEvent: null,
      refresh2: null,
      refresh3: null,
      kod: "",
      sekcija: "",
      sekcije: [],
      grupa: "",
      grupe: [],
      test: "",
      testovi: [],
      aparat: "",
      aparatCI: "",
      aparati: [],
      metoda: "",
      price: "",
      tpAparat: "",
      refGrupa: "",
      refGrupe: [],
      dRef: "",
      gRef: "",
      referentne: [],
      obj: {},
      tpTable: false,
      ifButton: true,
      ifTrenutnePostavke: true,
      ifDodajAnalit: false,
      ifDodajAnalit2: false,
      ifJedinica: false,
      ifdodajTest: true,
      tablerefresh: true,
      prikaziTekst: "Trenutne postavke",
      ifMulti: false,
      refAnaliti: [],
      ifRefAnalit: false,
      analit: "",
      tpTest: "",
      anaReferentne: [],
      uslov: false,
      trenutneRef: false,
      infoDanger: false,
      infoSuccess: false,
      infoWarning: false,
      infoWarning2: false,
      infoInfo: false,
      trenutniKodovi: [],
      dataAvailable1: "",
      dataUslov1: false,
      tabelaUslov1: false,
      dataAvailable2: "",
      dataUslov2: false,
      tabelaUslov2: false,
      dataAvailable3: "",
      dataUslov3: false,
      tabelaUslov3: false,
      analitUnit: "",
      dataUslovDanger: false,
      dataAvailable: "",
      nUslov: false,
      nData: "",
      nUslovDanger: false,
      nDataDanger: "",
      nUslov2: true,
      tipoviUzorka: [],
      tipovi: [],
      tipoviFull: [],
      inputValue: "",
      text: "",
      desc: "",
      gDob: "",
      dDob: "",
      spol: "",
      spolovi: ["MUŠKI", "ŽENSKI"],
      dobuslov: true,
      testzaAnalit: "",
      analitzaRef: "",
      analitTesta: "",
      tmpEvent: "",
      uredi: true,
      edit: false,
      tmpID: "",

      dobnaGr: false,
      dobnaGrD: false,
      dobnaGrG: false,
      interpretacija: null,
      interpretacije: [
        "Referentni interval",
        "Granična vrijednost | ≤ od",
        "Granična vrijednost | ≥ od",
        "Opisni rezultat"
      ],
      tmpInterp: null,

      toastText: "",
      toastIcon: "",
      toastPosition: "",
      toastDuration: 2500,
      isToastFullWidth: false,
      className: ""
    };
  },

  name: "analize",

  computed: {
    ...mapGetters(["sidebarOpened", "toggleWithoutAnimation"])
  },

  created() {
    http
          .post("postavke/aptest/listall", {
            email: this.$store.state.userId,
            aparat: this.tpAparat,
            token: this.$store.state.token,
            site: this.$store.state.site
          })
          .then(res => {
            if (res.data.success === false) {
              this.dataAvailable = "Greška prilikom čitanja iz baze.";
              this.dataUslovDanger = true;
              this.dataUslov1 = false;
              this.tabelaUslov1 = false;
              this.dataUslov2 = false;
              this.tabelaUslov2 = false;
              this.uslov = true;
            } else {
              this.testovi = res.data.aptests;

              this.testovi = this.testovi.sort(function(a, b) {
                return a.test.naziv.localeCompare(b.test.naziv, undefined, {
                  numeric: true,
                  sensitivity: "base"
                });
              });

              if (this.testovi.length > 0) {
                this.dataAvailable1 = "";
                this.dataUslov1 = false;
                this.tabelaUslov1 = true;
                this.dataUslovDanger = false;
                this.uslov = true;
              }
              if (this.testovi.length <= 0) {
                this.dataAvailable1 =
                  "Za odabrani aparat, nema definisanih testova.";
                this.dataUslov1 = true;
                this.tabelaUslov1 = false;
                this.dataUslovDanger = false;
                this.uslov = true;
              }
            }
          });
  },

  mounted() {
    this.dataUslovDanger = false;
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
          this.aparati.push("GREŠKA - DB Connection");
          this.grupe.push("GREŠKA - DB Connection");
          this.sekcije.push("GREŠKA - DB Connection");
          this.testovi.push("GREŠKA - DB Connection");
        } else {
          this.sekcije = res.data.obj.sekcija;
          this.aparati = [];
          res.data.obj.aparat.forEach(element => {
            this.aparati.push(element.ime);
          });

          this.aparati = this.aparati.sort(function(a, b) {
            return a.localeCompare(b, undefined, {
              numeric: true,
              sensitivity: "base"
            });
          });

          if (this.aparati.length == 0) {
            this.aparati.push("NEMA PODATAKA");
          }
          if (this.sekcije.length == 0) {
            this.sekcije.push("NEMA PODATAKA");
            this.grupe.push("NEMA PODATAKA");
            this.testovi.push("NEMA PODATAKA");
          }
        }

        http
          .get(
            "postavke/list?token=" +
              this.$store.state.token +
              "&site=" +
              this.$store.state.site,
            {}
          )
          .then(res => {
            if (res.data.success === false) {
              this.tipovi = [];
              this.tipoviFull = [];
              this.tipovi.push("GREŠKA - DB Connection");
            } else {
              this.tipovi = [];
              res.data.data.tipUzorka.forEach(element => {
                var option = {};
                option.value = element._id;
                option.label = element.tip;
                this.tipovi.push(option.label);
                this.tipoviFull.push(option);
              });
              if (this.tipovi.length == 0) {
                this.tipovi.push("NEMA PODATAKA");
              }
            }
          });
      });
  },
  watch: {
    aparat: function() {
      this.dDob = "";
      this.gDob = "";
      this.dobuslov = true;
      this.dobnaGrD = false;
      this.dobnaGrG = false;

      http
        .post("postavke/aptest/listall", {
          email: this.$store.state.userId,
          aparat: this.aparat,
          token: this.$store.state.token,
          site: this.$store.state.site
        })
        .then(res => {
          this.trenutniKodovi = res.data.aptests;
          this.sekcija = "";
          this.grupa = "";
          this.test = "";
        });
    },
    refGrupa: function() {
      if (this.refGrupa.trim() === "") {
        this.dDob = "";
        this.gDob = "";
        this.dobuslov = true;

        this.dobnaGrD = false;
        this.dobnaGrG = false;
      } else if (this.refGrupa === "SVI" || this.refGrupa === "DEFAULT") {
        this.dDob = "0";
        this.gDob = "130";
        this.dobnaGrD = false;
        this.dobnaGrG = false;
        this.dobuslov = false;
      } else if (this.refGrupa != "DJECA" && this.refGrupa != "ODRASLI") {
        this.dDob = "131";
        this.gDob = "140";
        this.dobuslov = false;
        this.dobnaGrD = false;
        this.dobnaGrG = false;
      } else if (this.refGrupa === "ODRASLI") {
        this.dDob = "";
        this.gDob = "";
        this.dobuslov = true;
        this.dobnaGrD = false;
        this.dobnaGrG = false;
      } else {
        this.dDob = "";
        this.gDob = "";
        this.dobuslov = true;
      }
    },
    sekcija: function() {
      if (this.sekcija === "NEMA PODATAKA") {
      } else if (this.sekcija === "GREŠKA - DB Connection") {
        this.grupe = [];
        this.grupe.push("GREŠKA - DB Connection");
      } else {
        this.grupa = "";
        http
          .post("postavke/labtest/group/list", {
            email: this.$store.state.userId,
            sekcija: this.sekcija,
            token: this.$store.state.token,
            site: this.$store.state.site
          })
          .then(res => {
            this.grupe = [];
            res.data.grupe.forEach(element => {
              this.grupe.push(element.grupa);
            });
            if (this.grupe.length == 0) {
              this.grupe.push("NEMA PODATAKA");
            }
          });
      }
    },
    grupa: function() {
      if (this.grupa === "NEMA PODATAKA") {
        this.testovi = [];
        this.testovi.push("NEMA PODATAKA");
      } else if (this.grupa === "GREŠKA - DB Connection") {
        this.testovi = [];
        this.testovi.push("GREŠKA - DB Connection");
      } else {
        this.test = "";
        http
          .post("postavke/labtest/assay/list", {
            email: this.$store.state.userId,
            sekcija: this.sekcija,
            grupa: this.grupa,
            token: this.$store.state.token,
            site: this.$store.state.site
          })
          .then(res => {
            if (res.data.success === false) {
            } else {
              this.testovi = [];
              this.aparatCI = this.aparat.toLowerCase();

              if (this.aparatCI.includes("manual")) {
                res.data.tests.forEach(element => {
                  if (element.manual === true)
                    this.testovi.push(element.analit);
                });
              } else {
                res.data.tests.forEach(element => {
                  if (element.manual === false)
                    this.testovi.push(element.analit);
                });
              }
              if (this.testovi.length == 0) {
                this.testovi.push("NEMA PODATAKA");
              }
            }
          });
      }
    },
    tpAparat: function() {
      this.dDob = "";
      this.gDob = "";
      this.dobuslov = true;
      this.dobnaGrD = false;
      this.dobnaGrG = false;

      if (
        new String(this.tpAparat).valueOf() ===
        new String("NEMA PODATAKA").valueOf()
      ) {
        this.dataAvailable1 = "Aparati nisu definisani.";
        this.dataUslov1 = true;
        this.uslov = true;
      } else {
        http
          .post("postavke/aptest/listall", {
            email: this.$store.state.userId,
            aparat: this.tpAparat,
            token: this.$store.state.token,
            site: this.$store.state.site
          })
          .then(res => {
            if (res.data.success === false) {
              this.dataAvailable = "Greška prilikom čitanja iz baze.";
              this.dataUslovDanger = true;
              this.dataUslov1 = false;
              this.tabelaUslov1 = false;
              this.dataUslov2 = false;
              this.tabelaUslov2 = false;
              this.uslov = true;
            } else {
              this.testovi = res.data.aptests;

              this.testovi = this.testovi.sort(function(a, b) {
                return a.test.naziv.localeCompare(b.test.naziv, undefined, {
                  numeric: true,
                  sensitivity: "base"
                });
              });

              if (this.testovi.length > 0) {
                this.dataAvailable1 = "";
                this.dataUslov1 = false;
                this.tabelaUslov1 = true;
                this.dataUslovDanger = false;
                this.uslov = true;
              }
              if (this.testovi.length <= 0) {
                this.dataAvailable1 =
                  "Za odabrani aparat, nema definisanih testova.";
                this.dataUslov1 = true;
                this.tabelaUslov1 = false;
                this.dataUslovDanger = false;
                this.uslov = true;
              }
            }
          });
      }
    }
  },

  beforeRouteLeave(to, from, next) {
    this.toggleSidebar(true);
    next();
  },

  methods: {
    ...mapActions(["closeMenu", "toggleSidebar", "isToggleWithoutAnimation"]),
    editRef(event) {
      this.edit = true;
      this.uredi = false;
      this.tmpID = event.target.id;
    },
    editRefAna(event) {
      this.edit = true;
      this.uredi = false;
      this.tmpID = event.target.id;
    },
    editUzorak(event) {
      this.edit = true;
      this.uredi = false;
      this.tmpID = event.target.id;
    },
    saveRef(event, refd, refg, spol, dDob, gDob, grupa) {

      // console.log(refd)
      // console.log(refg)

      this.tmpID = event.target.id;
      var item = true;
      var i;
      if (refd.trim() === "" || refg.trim() === "") {
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
        this.edit = true;
        this.uredi = false;
      } else if (isNaN(refd.trim())) {
        item = false;
        this.toastText =
          "Referentna vrijednost mora biti iz skupa realnih brojeva!";
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
        this.edit = true;
        this.uredi = false;
      } else if (isNaN(refg.trim())) {
        item = false;
        this.toastText =
          "Referentna vrijednost mora biti iz skupa realnih brojeva!";
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
        this.edit = true;
        this.uredi = false;
      } else {
      }

      if (item) {
        http
          .post("postavke/aptest/referentne/update", {
            email: this.$store.state.userId,
            test: this.obj._id,
            id: event.target.id,
            token: this.$store.state.token,
            grupa: grupa,
            refd: refd,
            dDob: dDob,
            gDob: gDob,
            refg: refg,
            spol: spol,
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
              // this.toastText = 'Unos uspješno obavljen!'
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
            }
            this.edit = false;
            this.uredi = true;
          });
      }
    },

    saveRefAna(event, refd, refg, spol, dDob, gDob, grupa) {

      // console.log(refd)
      // console.log(refg)

      this.tmpID = event.target.id;
      var item = true;
      var i;

      if (refd.trim() === "" || refg.trim() === "") {
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
        this.edit = true;
        this.uredi = false;
      } else if (isNaN(refd.trim())) {
        item = false;
        this.toastText =
          "Referentna vrijednost mora biti iz skupa realnih brojeva!";
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
        this.edit = true;
        this.uredi = false;
      } else if (isNaN(refg.trim())) {
        item = false;
        this.toastText =
          "Referentna vrijednost mora biti iz skupa realnih brojeva!";
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
        this.edit = true;
        this.uredi = false;
      } else {
      }

      if (item) {
        http
          .post("postavke/aptest/analit/referentne/update", {
            email: this.$store.state.userId,
            aparat: this.tpAparat,
            test: this.testzaAnalit,
            analit: this.analitTesta,
            id: event.target.id,
            token: this.$store.state.token,
            grupa: grupa,
            refd: refd,
            dDob: dDob,
            gDob: gDob,
            refg: refg,
            spol: spol,
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
              // this.toastText = 'Unos uspješno obavljen!'
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
            }
            this.edit = false;
            this.uredi = true;
          });
      }
    },

    dodajReferentne: function(event, interpretacija, multi) {
      this.refreshEvent = event;
      this.refresh2 = interpretacija;
      this.refresh3 = multi;

      if (true) {
        this.analit = event.target.id;

        this.test = event.target.getAttribute("name");
        http
          .post("postavke/aptest/referentne/list", {
            email: this.$store.state.userId,
            test: event.target.id,
            aparat: this.aparat,
            token: this.$store.state.token,
            site: this.$store.state.site
          })
          .then(res => {
            if (res.data.success === false) {
              this.dataAvailable = "Greška prilikom čitanja iz baze.";
              this.dataUslovDanger = true;
              this.dataUslov1 = false;
              this.tabelaUslov1 = false;
              this.dataUslov2 = false;
              this.tabelaUslov2 = false;
              this.nUslov = false;
            } else {
              if (res.data.obj.multi === false) {
                this.interpretacija = res.data.obj.aptest.interpretacija;
                this.ifTrenutnePostavke = false;
                this.ifDodajAnalit = true;
                this.refGrupe = [];

                res.data.obj.referentnaGrupa.forEach(element => {
                  this.refGrupe.push(element.grupa);
                });

                if (this.refGrupe.length < 1) {
                  this.refGrupe = [];
                  this.refGrupe.push("NEMA PODATAKA");
                }

                this.obj = res.data.obj.aptest;

                this.referentne = res.data.obj.aptest.reference.sort(function(
                  a,
                  b
                ) {
                  return a.grupa == b.grupa ? 0 : +(a.grupa > b.grupa) || -1;
                });

                this.ifJedinica = true;

                if (this.referentne.length > 0) {
                  this.dataAvailable2 = "";
                  this.dataUslov2 = false;
                  this.tabelaUslov2 = true;
                }

                if (this.referentne.length <= 0) {
                  this.dataAvailable2 = "Nema dostupnih podataka.";
                  this.dataUslov2 = true;
                  this.tabelaUslov2 = false;
                }
              }
              if (res.data.obj.multi === true) {
                this.toggleSidebar(false);
                this.interpretacija = "Referentni interval";
                this.refAnaliti = res.data.obj.analiti;
                this.ifMulti = true;
                this.ifTrenutnePostavke = false;
                this.testzaAnalit = event.target.id;
              }

              if (this.refAnaliti.length == 0) {
                this.nData = "Za odabrani test, nema definisanih analita.";
                this.nUslov = true;
                this.nUslov2 = false;
              } else if (this.refAnaliti.length > 0) {
                this.nUslov = false;
                this.nUslov2 = true;
              }
            }
          });
      }
    },
    sacuvajReferentne: function(event) {
      var item = true;
      var i;
      var regex = /^[0-9]{1,3}$/;

      if (
        this.dRef.trim() === "" ||
        this.gRef.trim() === "" ||
        this.refGrupa.trim() === "" ||
        this.dDob.trim() === "" ||
        this.gDob.trim() === "" ||
        this.spol.trim() === ""
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
      } else if (this.refGrupa.trim() === "NEMA PODATAKA") {
        item = false;
        this.toastText = "Referentne grupe nisu definisane!";
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
      } else if (isNaN(this.dRef.trim())) {
        item = false;
        this.toastText =
          "Referentna vrijednost mora biti iz skupa realnih brojeva!";
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
      } else if (isNaN(this.gRef.trim())) {
        item = false;
        this.toastText =
          "Referentna vrijednost mora biti iz skupa realnih brojeva!";
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
      } else if (isNaN(this.dDob.trim())) {
        item = false;
        this.toastText =
          "Donja dobna granica mora biti iz skupa realnih brojeva!";
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
      } else if (isNaN(this.gDob.trim())) {
        item = false;
        this.toastText =
          "Gornja dobna granica mora biti iz skupa realnih brojeva!";
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
      } else if (parseFloat(this.dDob) < 0 || parseFloat(this.gDob) < 0) {
        item = false;
        this.toastText = "Dobne granice moraju biti pozitivni brojevi!";
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
      } else if (parseFloat(this.dDob) >= parseFloat(this.gDob)) {
        item = false;
        this.toastText =
          "Gornja dobna granica mora biti veća od donje dobne granice!";
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

      if (item) {
        http
          .post("postavke/aptest/referentne/save", {
            email: this.$store.state.userId,
            test: this.obj._id,
            refGrupa: this.refGrupa,
            dRef: this.dRef,
            gRef: this.gRef,
            dDob: this.dDob,
            gDob: this.gDob,
            spol: this.spol,
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
              this.dataAvailable = "Greška prilikom čitanja iz baze.";
              this.dataUslovDanger = true;
              this.dataUslov1 = false;
              this.tabelaUslov1 = false;
              this.dataUslov2 = false;
              this.tabelaUslov2 = false;
            } else {
              this.dataAvailable = "";
              this.dataUslovDanger = false;
              this.nUslov = false;
              this.nUslov2 = true;

              if ((res.data.success = true)) {
                // this.toastText = 'Unos uspješno obavljen!'
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

                http
                  .post("postavke/aptest/listall", {
                    email: this.$store.state.userId,
                    aparat: this.tpAparat,
                    token: this.$store.state.token,
                    site: this.$store.state.site
                  })
                  .then(res => {
                    this.testovi = res.data.aptests;

                    this.testovi = this.testovi.sort(function(a, b) {
                      return a.test.naziv.localeCompare(
                        b.test.naziv,
                        undefined,
                        {
                          numeric: true,
                          sensitivity: "base"
                        }
                      );
                    });
                  });
              } else if (res.data.success != true) {
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
              }

              if (this.$store.state.userId != "admin@atom.ba") {
                this.refGrupa = "";
                this.dRef = "";
                this.gRef = "";
                this.dDob = "";
                this.gDob = "";
                this.spol = "";

                this.dobnaGrD = false;
                this.dobnaGrG = false;
                this.dobuslov = true;
              } else {
                // this.dRef = this.dRef.replace('-', '')
                // this.gRef = this.gRef.replace('-', '')
              }

              this.referentne = res.data.referentne.sort(function(a, b) {
                return a.grupa == b.grupa ? 0 : +(a.grupa > b.grupa) || -1;
              });

              if (this.referentne.length > 0) {
                this.dataAvailable2 = "";
                this.dataUslov2 = false;
                this.tabelaUslov2 = true;
              }

              if (this.referentne.length <= 0) {
                this.dataAvailable2 = "Nema dostupnih podataka.";
                this.dataUslov2 = true;
                this.tabelaUslov2 = false;
              }
            }
          });
      }
    },

    gotovoTrenutne() {
      this.ifDodajAnalit = !this.ifDodajAnalit;
      this.ifTrenutnePostavke = !this.ifTrenutnePostavke;
      this.ifDodajAnalit2 = false;
      this.dRef = "";
      this.gRef = "";
      this.refGrupa = "";
      this.dobuslov = true;
      this.dobnaGrD = false;
      this.dobnaGrG = false;

      this.dDob = "";
      this.gDob = "";
      this.spol = "";
    },
    gotovoAkoNema() {
      this.toggleSidebar(true);
      this.ifMulti = !this.ifMulti;
      this.ifTrenutnePostavke = !this.ifTrenutnePostavke;
      this.ifRefAnalit = !this.ifRefAnalit;
      this.trenutneRef = true;
    },
    gotovoAkoNema2() {
      this.ifRefAnalit = false;
      this.ifMulti = true;
      this.trenutneRef = false;
      this.refGrupa = "";
      this.dobuslov = true;
      this.dobnaGrD = false;
      this.dobnaGrG = false;

      this.dRef = "";
      this.gRef = "";
      this.dDob = "";
      this.gDob = "";
      this.spol = "";
    },
    catchDialog2: function(event) {
      this.$dialog
        .confirm("Jeste li sigurni da želite obrisati zapis?", {
          type: "hard",
          html: true,
          verification: "Da"
        })
        .then(() => {
          http
            .post("postavke/aptest/referentne/delete", {
              email: this.$store.state.userId,
              test: this.obj._id,
              id: event.target.id,
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
                http
                  .post("postavke/aptest/listall", {
                    email: this.$store.state.userId,
                    aparat: this.tpAparat,
                    token: this.$store.state.token,
                    site: this.$store.state.site
                  })
                  .then(res => {
                    this.testovi = res.data.aptests;

                    this.testovi = this.testovi.sort(function(a, b) {
                      return a.test.naziv.localeCompare(
                        b.test.naziv,
                        undefined,
                        {
                          numeric: true,
                          sensitivity: "base"
                        }
                      );
                    });
                  });

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
                this.referentne = res.data.referentne.sort(function(a, b) {
                  return a.grupa == b.grupa ? 0 : +(a.grupa > b.grupa) || -1;
                });

                if (this.referentne.length > 0) {
                  this.dataAvailable2 = "";
                  this.dataUslov2 = false;
                  this.tabelaUslov2 = true;
                }

                if (this.referentne.length <= 0) {
                  this.dataAvailable2 = "Nema dostupnih podataka.";
                  this.dataUslov2 = true;
                  this.tabelaUslov2 = false;
                }
              }
            });
        })
        .catch(function() {});
    },

    analitReferentne: function(event, interpretacija) {
      this.tmpInterp = interpretacija;
      this.tmpEvent = event;
      this.analit = event.target.id;
      if (!this.ifRefAnalit) {
        this.ifRefAnalit = !this.ifRefAnalit;
      }

      if (this.trenutneRef) {
        this.trenutneRef = !this.trenutneRef;
      }

      // this.ifMulti = false
      this.tpTest = event.target.getAttribute("name");
      this.analitTesta = event.target.id;

      this.refAnaliti.forEach(element => {
        if (element.naziv === this.tpTest) {
          this.analitUnit = element.jedinica;
        }
      });

      http
        .post("postavke/aptest/referentne/list", {
          email: this.$store.state.userId,
          test: this.testzaAnalit,
          aparat: this.tpAparat,
          analit: this.tpTest,
          analitzaRef: this.analitTesta,
          token: this.$store.state.token,
          site: this.$store.state.site
        })
        .then(res => {
          if (res.data.success === false) {
            this.dataAvailable = "Greška prilikom čitanja iz baze.";
            this.dataUslovDanger = true;
            this.dataUslov3 = false;
            this.tabelaUslov3 = false;
            this.dataUslov2 = false;
            this.tabelaUslov2 = false;
          } else {
            this.refGrupe = [];
            res.data.obj.referentnaGrupa.forEach(element => {
              this.refGrupe.push(element.grupa);
            });

            if (this.refGrupe.length < 1) {
              this.refGrupe = [];
              this.refGrupe.push("NEMA PODATAKA");
            }

            this.anaReferentne = [];

            this.anaReferentne = res.data.obj.reference.sort(function(a, b) {
              return a.grupa == b.grupa ? 0 : +(a.grupa > b.grupa) || -1;
            });

            if (this.anaReferentne.length > 0) {
              this.dataAvailable3 = "";
              this.dataUslov3 = false;
              this.tabelaUslov3 = true;
            }

            if (this.anaReferentne.length <= 0) {
              this.dataAvailable3 = "Nema dostupnih podataka";
              this.dataUslov3 = true;
              this.tabelaUslov3 = false;
            }
          }
        });
    },
    sacuvajRefAnalit: function() {
      var item = true;
      var i;
      if (
        this.dRef.trim() === "" ||
        this.gRef.trim() === "" ||
        this.refGrupa.trim() === "" ||
        this.dDob.trim() === "" ||
        this.gDob.trim() === "" ||
        this.spol.trim() === ""
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
      } else if (this.refGrupa.trim() === "NEMA PODATAKA") {
        item = false;
        this.toastText = "Referentne grupe nisu definisane!";
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
      } else if (isNaN(this.dRef.trim())) {
        item = false;
        this.toastText =
          "Referentna vrijednost mora biti iz skupa realnih brojeva!";
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
      } else if (isNaN(this.gRef.trim())) {
        item = false;
        this.toastText =
          "Referentna vrijednost mora biti iz skupa realnih brojeva!";
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

      if (item) {
        http
          .post("postavke/aptest/analit/referentne/save", {
            email: this.$store.state.userId,
            aparat: this.tpAparat,
            analit: this.analitTesta,
            test: this.testzaAnalit,
            refGrupa: this.refGrupa,
            dRef: this.dRef,
            gRef: this.gRef,
            dDob: this.dDob,
            gDob: this.gDob,
            spol: this.spol,
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
              this.dataAvailable = "Greška prilikom čitanja iz baze.";
              this.dataUslovDanger = true;
              this.dataUslov3 = false;
              this.tabelaUslov3 = false;
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

              if (this.$store.state.userId != "admin@atom.ba") {
                this.refGrupa = "";
                this.dRef = "";
                this.gRef = "";
                this.dDob = "";
                this.gDob = "";
                this.spol = "";

                this.dobnaGrD = false;
                this.dobnaGrG = false;
                this.dobuslov = true;
              } else {
                // this.dRef = this.dRef.replace('-', '')
                // this.gRef = this.gRef.replace('-', '')
              }

              this.anaReferentne = [];

              this.anaReferentne = res.data.referentne.sort(function(a, b) {
                return a.grupa == b.grupa ? 0 : +(a.grupa > b.grupa) || -1;
              });

              if (this.anaReferentne.length > 0) {
                this.dataAvailable3 = "";
                this.dataUslov3 = false;
                this.tabelaUslov3 = true;
              }

              if (this.anaReferentne.length <= 0) {
                this.dataAvailable3 = "Nema dostupnih podataka.";
                this.dataUslov3 = true;
                this.tabelaUslov3 = false;
              }
            }
          });
      }
    },
    catchDialogAnaReference: function(event) {
      this.$dialog
        .confirm("Jeste li sigurni da želite obrisati zapis?", {
          type: "hard",
          html: true,
          verification: "Da"
        })
        .then(() => {
          http
            .post("postavke/aptest/analit/referentne/delete", {
              email: this.$store.state.userId,
              aparat: this.tpAparat,
              test: this.testzaAnalit,
              analit: this.analitTesta,
              dRef: this.dRef,
              gRef: this.gRef,
              token: this.$store.state.token,
              id: event.target.id,
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
                this.analitReferentne(this.tmpEvent, this.tmpInterp);

                if (this.anaReferentne.length > 0) {
                  this.dataAvailable3 = "";
                  this.dataUslov3 = false;
                  this.tabelaUslov3 = true;
                }

                if (this.anaReferentne.length <= 0) {
                  this.dataAvailable3 = "Nema dostupnih podataka";
                  this.dataUslov3 = true;
                  this.tabelaUslov3 = false;
                }
              }
            });
        })
        .catch(function() {});
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
