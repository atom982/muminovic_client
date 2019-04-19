<template>
  <div class="form-elements">
    <div class="row">
      <div class="col-md-12">
  
        <vuestic-widget v-if="ifdodajTest" headerText="Postavke aparata - Testovi aparata">
          <form>
            <div class="row">
              <div class="col-md-3"></div>
              <div class="col-md-6">
                <fieldset>
  
                  <vuestic-simple-select label="Izaberite aparat" v-model="aparat" name="aparat" :required="true" title=" " ref="aparatSelect" v-bind:options="aparati">
                  </vuestic-simple-select>
                  <vuestic-simple-select label="Izaberite sekciju testa" v-model="sekcija" name="sekcija" :required="true" title=" " ref="sekcijaSelect" v-bind:options="sekcije">
                  </vuestic-simple-select>
                  <vuestic-simple-select label="Izaberite grupu testa" v-model="grupa" name="grupa" :required="true" title=" " ref="grupaSelect" v-bind:options="grupe">
                  </vuestic-simple-select>
                  <vuestic-simple-select label="Izaberite test" v-model="test" name="test" :required="true" title=" " ref="testSelect" v-bind:options="testovi">
                  </vuestic-simple-select>
  
                  <div class="form-group with-icon-left">
                    <div class="input-group">
                      <input id="input-icon-left" title=" " v-model="kod" name="input-icon-left" required/>
                      <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                      <label class="control-label" for="input-icon-left">{{'Unesite kod testa'}}</label><i class="bar"></i>
                    </div>
                  </div>
                  <div class="form-group with-icon-left">
                    <div class="input-group">
                      <input id="input-icon-left" title=" " v-model="metoda" name="input-icon-left" required/>
                      <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                      <label class="control-label" for="input-icon-left">{{'Unesite metodu testa'}}</label><i class="bar"></i>
                    </div>
                  </div>
  
                  <vuestic-multi-select :label="'Izaberite podržane tipove uzorka'" v-model="tipoviUzorka" title=" " v-bind:options="tipovi">
                  </vuestic-multi-select>
  
                  <div class="form-group with-icon-left">
                    <div class="input-group">
                      <input id="input-icon-left" title=" " v-model="price" name="input-icon-left" required/>
                      <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                      <label class="control-label" for="input-icon-left">{{'Unesite cijenu testa'}}</label><i class="bar"></i>
                    </div>
                  </div>
                  <button class="btn btn-primary" @click.prevent="dodajPostavku"><span class="fa fa-save"></span>{{ ' SAČUVAJ'}}</button>
  
                </fieldset>
  
                <hr>
                <a @click="prikaziPostavke" href="#">{{prikaziTekst}}</a>
              </div>
              <div class="col-md-3"></div>
            </div>
          </form>
        </vuestic-widget>
  
        <vuestic-widget v-if="ifTrenutnePostavke" headerText="Trenutne postavke - Testovi aparata">
          <div class="row">
            <div class="col-md-3"></div>
            <div class="col-md-6">
              <vuestic-simple-select v-if="!edit" label="Izaberite aparat" v-model="tpAparat" name="aparat" :required="true" title=" " ref="aparatSelect" v-bind:options="aparati">
              </vuestic-simple-select>
              <div v-if="edit" class="form-group ">
                <div class="input-group">
                  <input disabled id="input-icon-left" title=" " required/>
                  <label class="control-label" for="sajt">{{tpAparat}}</label><i class="bar"></i>
                </div>
              </div>
            </div>
          </div>
  
          <div class="table-responsive">
            <table v-if="tabelaUslov1" class="table table-striped first-td-padding">
              <thead>
                <tr>
                  <td>{{"test"}}</td>
                  <td>{{"sekcija"}}</td>
                  <td>{{"grupa"}}</td>
                  <td>{{"metoda"}}</td>
                  <td>{{"kod"}}</td>
                  <td>{{"tip uzorka"}}</td>
                  <td>{{"interpretacija"}}</td>
                  <td v-if="$store.state.userId === 'admin@atom.ba'">uredi</td>
                  <td>{{"reference"}}</td>
                  <td>{{"akcija"}}</td>
                </tr>
              </thead>
              <tbody>
                <tr v-for="element in testovi">
                  <td>{{element.test.naziv}}</td>
                  <td>{{element.sekcija}}</td>
                  <td>{{element.grupa}}</td>
                  <td>{{element.metoda}}</td>
                  <td>{{element.kod}}</td>
                  <td v-if="tmpID != element._id"><span>|</span><span v-for="tip in element.tipoviUzorka">{{tip}}|</span></td>
                  <td v-if="tmpID === element._id">
                    <div v-show="edit === false">
                      <label>
                        <span>|</span><span v-for="tip in element.tipoviUzorka">{{tip}}|</span>      
                      </label>
                    </div>
                    <select multiple size="5" v-show="edit === true" v-model="element.tipoviUzorka">
                      <option v-for="option in tipovi">
                        {{ option }}
                      </option>
                    </select>
                  </td>
                  <td v-if="element.test.multi">{{'n/a'}}</td>
                  <td v-if="!element.test.multi && (tmpID != element._id || (tmpID === element._id && element.reference.length > 0))">{{element.interpretacija}}</td>
                  <td v-if="!element.test.multi && (tmpID === element._id && element.reference.length < 1)">
                    <div v-show="edit === false">
                      <label>
                        {{element.interpretacija}}      
                      </label>
                    </div>
                    <select size="5" v-show="edit === true" v-model="element.interpretacija">
                      <option v-for="option in interpretacije">
                        {{ option }}
                      </option>
                    </select>
                  </td>
  
                  <td v-if="$store.state.userId === 'admin@atom.ba'">
                    <button :disabled="edit" v-if="tmpID != element._id" @click.prevent="editUzorak($event)" title="Uredite podatke" v-bind:id="element._id" class="btn btn-micro btn-info"><span v-bind:id="element._id" class="glyphicon glyphicon-edit"></span>{{''}}</button>
                    <button :disabled="edit" v-if="uredi && tmpID === element._id" @click.prevent="editUzorak($event)" title="Uredite podatke" v-bind:id="element._id" class="btn btn-micro btn-info"><span v-bind:id="element._id" class="glyphicon glyphicon-edit"></span>{{''}}</button>
                    <button v-if="!uredi && tmpID === element._id" @click.prevent="saveUzorak($event, element.tipoviUzorka, element.interpretacija)" title="Sačuvajte izmjene" v-bind:id="element._id" class="btn btn-micro btn-secondary"><span v-bind:id="element._id" class="fa fa-save"></span>{{''}}</button>
                  </td>
                  <td><button :disabled="edit" title='Dodavanje referentnih vrijednosti' :id="element._id" :name="element.test.naziv" class="btn btn-primary btn-micro" @click="dodajReferentne($event, element.interpretacija, element.test.multi)"><span :id="element._id"  :name="element.test.naziv" class="fa fa-edit"></span>{{ ' Referentne'}}</button></td>
                  <td><button :disabled="edit" title='Brisanje zapisa' v-bind:id="element._id" class="btn btn-danger btn-micro" @click="catchDialog($event)"><span v-bind:id="element._id" class="fa fa-trash-o"></span>{{ ' IZBRIŠI' }}</button></td>
                </tr>
              </tbody>
            </table>
  
            <vuestic-alert v-if="dataUslov1" type="warning" :withCloseBtn="false"><span>{{dataAvailable1}}</span></vuestic-alert>
            <vuestic-alert v-if="dataUslovDanger" type="danger" :withCloseBtn="false"><span>{{dataAvailable}}</span></vuestic-alert>
          </div>
  
          <hr v-if="uslov">
          <div class="row">
            <div class="col-md-3"></div>
            <div class="col-md-6">
              <button :disabled="edit" v-if="uslov" class="btn btn-secondary" @click.prevent="gotovo"><span class="fa fa-backward"></span>{{ ' POVRATAK'}}</button>
            </div>
          </div>
        </vuestic-widget>
  
        <vuestic-widget v-if="ifDodajAnalit" headerText="Dodaj - Referentne vrijednosti">
          <div class="row">
  
            <div class="col-md-5">
              <div class="row">
                <div class="col-md-3"></div>
                <div class="col-md-6">
                  <div style="text-align:center;" class="testoviDiv">
                    <h6>Aparat : {{tpAparat}}</h6>
                  </div>
                  <div style="text-align:center;" class="testoviDiv">
                    <h5>Naziv testa : {{test}}</h5>
                  </div>
                  <div v-if="ifJedinica" style="text-align:center;" class="testoviDiv">
                    <h6>Jedinica : {{obj.test.jedinica}}</h6>
                  </div>
                  <hr>
                </div>
              </div>
  
              <div class="row">
                <div class="col-md-12">
                  <fieldset>
  
                    <vuestic-simple-select label="Izaberite referentnu grupu" v-model="refGrupa" name="refGrupa" :required="true" title=" " ref="refGrupaSelect" v-bind:options="refGrupe">
                    </vuestic-simple-select>
  
                    <vuestic-simple-select v-show="false" label="Interpretacija rezultata" v-model="interpretacija" name="refGrupa" :required="true" title=" " ref="refGrupaSelect" v-bind:options="interpretacije">
                    </vuestic-simple-select>
  
                    <div class="row">
                      <div v-if='interpretacija === "Referentni interval"' class="col-md-6">
                        <div class="form-group with-icon-left">
                          <div class="input-group">
                            <input id="input-icon-left" title=" " v-model="dRef" name="input-icon-left" required/>
                            <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                            <label class="control-label" for="input-icon-left">{{'Donja referentna vrijednost'}}</label><i class="bar"></i>
                          </div>
                        </div>
                      </div>
                      <div v-if='interpretacija === "Referentni interval"' class="col-md-6">
                        <div class="form-group with-icon-left">
                          <div class="input-group">
                            <input id="input-icon-left" title=" " v-model="gRef" name="input-icon-left" required/>
                            <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                            <label class="control-label" for="input-icon-left">{{'Gornja referentna vrijednost'}}</label><i class="bar"></i>
                          </div>
                        </div>
                      </div>
                      <div v-if='interpretacija === "Granična vrijednost | ≤ od"' class="col-md-12">
                        <div class="form-group with-icon-left">
                          <div class="input-group">
                            <input id="input-icon-left" title=" " v-model="gRef" name="input-icon-left" required/>
                            <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                            <label class="control-label" for="input-icon-left">{{'Granična vrijednost | ≤ od'}}</label><i class="bar"></i>
                          </div>
                        </div>
                      </div>
                      <div v-if='interpretacija === "Granična vrijednost | ≥ od"' class="col-md-12">
                        <div class="form-group with-icon-left">
                          <div class="input-group">
                            <input id="input-icon-left" title=" " v-model="gRef" name="input-icon-left" required/>
                            <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                            <label class="control-label" for="input-icon-left">{{'Granična vrijednost | ≥ od'}}</label><i class="bar"></i>
                          </div>
                        </div>
                      </div>
                    </div>
  
                    <div v-if="dobuslov" class="row">
                      <div v-if="!dobnaGrD" class="col-md-6">
                        <div class="form-group with-icon-left">
                          <div class="input-group">
                            <input id="input-icon-left" title=" " v-model="dDob" name="input-icon-left" required/>
                            <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                            <label class="control-label" for="input-icon-left">{{'Unesite donju dobnu granicu'}}</label><i class="bar"></i>
                          </div>
                        </div>
                      </div>
                      <div v-if="dobnaGrD" class="col-md-6">
                        <vuestic-simple-select label="Izaberite donju dobnu granicu" v-model="doGodinuDanaSelectedD" name="doGodinuDanaRefD" :required="true" title=" " ref="doGodinuDanaRefD" v-bind:options="doGodinuDanaRefD">
                        </vuestic-simple-select>
                      </div>
                      <div v-if="!dobnaGrG" class="col-md-6">
                        <div class="form-group with-icon-left">
                          <div class="input-group">
                            <input id="input-icon-left" title=" " v-model="gDob" name="input-icon-left" required/>
                            <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                            <label class="control-label" for="input-icon-left">{{'Unesite gornju dobnu granicu'}}</label><i class="bar"></i>
                          </div>
                        </div>
                      </div>
                      <div v-if="dobnaGrG" class="col-md-6">
                        <vuestic-simple-select label="Izaberite gornju dobnu granicu" v-model="doGodinuDanaSelectedG" name="doGodinuDanaRefG" :required="true" title=" " ref="doGodinuDanaRefG" v-bind:options="doGodinuDanaRefG">
                        </vuestic-simple-select>
                      </div>
                    </div>
  
                    <vuestic-simple-select class="form-group with-icon-right" label="Izaberite spol  grupe" v-model="spol" v-validate="'required'" name="spol" required title=" " ref="spolSelect" v-bind:options='spolovi'>
                    </vuestic-simple-select>
  
                    <button :disabled="edit" class="btn btn-primary" @click.prevent="sacuvajReferentne"><span class="glyphicon glyphicon-plus"></span>{{ ' DODAJ'}}</button>
  
                    <hr>
  
                    <button :disabled="edit" v-if="uslov" class="btn btn-sm btn-secondary" @click.prevent="gotovoTrenutne"><span class="fa fa-step-backward"></span>{{ ' nazad'}}</button>
                    <button :disabled="edit" v-if="uslov" class="btn btn-sm btn-secondary" @click.prevent="gotovo"><span class="fa fa-backward"></span>{{ ' POVRATAK'}}</button>
  
                  </fieldset>
  
                  <hr>
                  <a v-if="!edit" @click="ifDodajAnalit2 = !ifDodajAnalit2" href="#">{{'Trenutne referentne vrijednosti'}}</a>
                  <a v-if="edit" style="color: #e34a4a;" href="#">{{'Trenutne referentne vrijednosti'}}</a>
                  <span v-if="refGrupa === 'DJECA'">
                    {{" | "}}<a @click="switchDobGrD" href="#">{{'Donja dobna granica'}}</a>{{" | "}}<a @click="switchDobGrG" href="#">{{'Gornja dobna granica'}}</a></span>  
                </div>
              </div>
            </div>
  
            <div v-if="!ifDodajAnalit2" class="col-md-7">
  
              <div class="table-responsive">
                <table v-if="tabelaUslov2" class="table table-striped first-td-padding">
                  <thead>
                    <tr>
                      <td>{{"Grupa"}}</td>
                      <td v-if='interpretacija === "Referentni interval"'>{{"DRef"}}</td>
                      <td v-if='interpretacija === "Referentni interval"'>{{"GRef"}}</td>
                      <td v-if='interpretacija.includes("Granična vrijednost")'>{{"GrVr"}}</td>
                      <td v-if='interpretacija === "Opisni rezultat"'>{{"Vrijednost"}}</td>
                      <td>{{"Dob"}}</td>
                      <td>{{"Spol"}}</td>
                      <td>Uredi</td>
                      <td>{{"akcija"}}</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="element in referentne">
                      <td>{{element.grupa}}</td>
                      <td v-if="tmpID != element._id && interpretacija === 'Referentni interval'"><strong>{{element.refd}}</strong></td>
                      <td v-if="tmpID === element._id && interpretacija === 'Referentni interval'">
                        <div v-show="edit === false">
                          <label><strong>{{element.refd}}</strong></label>
                        </div>
                        <input class="table-info" style="width:100%" v-show="edit === true" v-model="element.refd">
                      </td>
  
                      <td v-if="tmpID != element._id && interpretacija === 'Referentni interval'"><strong>{{element.refg}}</strong></td>
                      <td v-if="tmpID != element._id && interpretacija === 'Granična vrijednost | ≤ od'"><strong>{{'≤ ' + element.refg.replace('-', '')}}</strong></td>
                      <td v-if="tmpID != element._id && interpretacija === 'Granična vrijednost | ≥ od'"><strong>{{'≥ ' + element.refg.replace('-', '')}}</strong></td>
                      <td v-if="interpretacija === 'Opisni rezultat'"><strong>{{'Opis'}}</strong></td>
  
                      <td v-if="tmpID === element._id && interpretacija === 'Referentni interval'">
                        <div v-show="edit === false">
                          <label><strong>{{element.refg}}</strong></label>
                        </div>
                        <input class="table-info" style="width:100%" v-show="edit === true" v-model="element.refg">
                      </td>
  
                      <td v-if="tmpID === element._id && interpretacija === 'Granična vrijednost | ≤ od'">
                        <div v-show="edit === false">
                          <strong>{{'≤ '}}<label>{{element.refg.replace('-', '')}}</label></strong>
                        </div>
                        <input class="table-info" style="width:100%" v-show="edit === true" v-model="element.refg">
                      </td>
  
                      <td v-if="tmpID === element._id && interpretacija === 'Granična vrijednost | ≥ od'">
                        <div v-show="edit === false">
                          <strong>{{'≥ '}}<label>{{element.refg.replace('-', '')}}</label></strong>
                        </div>
                        <input class="table-info" style="width:100%" v-show="edit === true" v-model="element.refg">
                      </td>
  
                      <td v-if="$store.state.userId != 'admin@atom.ba'">{{ispisDob(element.dDob, element.gDob)}}</td>
                      <td v-if="$store.state.userId === 'admin@atom.ba'">{{element.dDob}} - {{element.gDob}}</td>
  
                      <td>{{element.spol}}</td>
  
                      <td v-if="interpretacija != 'Opisni rezultat'">
                        <button :disabled="edit" v-if="tmpID != element._id" @click.prevent="editRef($event)" title="Uredite podatke" v-bind:id="element._id" class="btn btn-micro btn-info"><span v-bind:id="element._id" class="glyphicon glyphicon-edit"></span>{{''}}</button>
                        <button :disabled="edit" v-if="uredi && tmpID === element._id" @click.prevent="editRef($event)" title="Uredite podatke" v-bind:id="element._id" class="btn btn-micro btn-info"><span v-bind:id="element._id" class="glyphicon glyphicon-edit"></span>{{''}}</button>
                        <button v-if="!uredi && tmpID === element._id" @click.prevent="saveRef($event, element.refd, element.refg, element.spol, element.dDob, element.gDob, element.grupa)" title="Sačuvajte izmjene" v-bind:id="element._id" class="btn btn-micro btn-secondary"><span v-bind:id="element._id" class="fa fa-save"></span>{{''}}</button>
                      </td>
  
                      <td v-if="interpretacija === 'Opisni rezultat'">
                        <button :disabled="true" title="Uređivanje nije omogućeno" v-bind:id="element._id" class="btn btn-micro btn-info"><span v-bind:id="element._id" class="glyphicon glyphicon-edit"></span>{{''}}</button>
                      </td>
  
                      <td><button :disabled="edit" title='Brisanje zapisa' v-bind:id="element._id" class="btn btn-danger btn-micro" @click="catchDialog2($event)"><span v-bind:id="element._id" class="fa fa-trash-o"></span>{{ ' IZBRIŠI' }}</button></td>
                    </tr>
                  </tbody>
                </table>
  
                <vuestic-alert v-if="dataUslov2" type="warning" :withCloseBtn="false"><span>{{dataAvailable2}}</span></vuestic-alert>
                <vuestic-alert v-if="dataUslovDanger" type="danger" :withCloseBtn="false"><span>{{dataAvailable}}</span></vuestic-alert>
              </div>
            </div>
          </div>
        </vuestic-widget>
  
        <vuestic-widget v-if="ifMulti" headerText="Trenutne postavke - Testovi aparata - Referentne vrijednosti">
          <div class="row">
            <div class="col-md-3"></div>
            <div class="col-md-6">
              <div style="text-align:center;" class="testoviDiv">
                <h6>Aparat : {{tpAparat}}</h6>
              </div>
              <div style="text-align:center;" class="testoviDiv">
                <h5>Naziv testa : {{test}}</h5>
              </div>
              <hr>
            </div>
          </div>
          <div class="table-responsive">
            <table v-if="nUslov2" class="table table-striped first-td-padding">
              <thead>
                <tr>
                  <td>{{"kod"}}</td>
                  <td>{{"naziv"}}</td>
                  <td>{{"opis"}}</td>
                  <td>{{"jedinica"}}</td>
                  <td>{{"interpretacija"}}</td>
                  <td>{{"reference"}}</td>
                </tr>
              </thead>
              <tbody>
                <tr v-for="element in refAnaliti">
                  <td>{{element.kod}}</td>
                  <td>{{element.naziv}}</td>
                  <td>{{element.opis}}</td>
                  <td>{{element.jedinica}}</td>
                  <td>{{element.interpretacija}}</td>
                  <td><button title='Dodavanje referentnih vrijednosti' :id="element._id" :name="element.naziv" class="btn btn-primary btn-micro" @click="analitReferentne($event, element.interpretacija)"><span :id="element._id"  :name="element.naziv" class="fa fa-edit"></span>{{ ' Referentne'}}</button></td>
                </tr>
              </tbody>
            </table>
            <vuestic-alert v-if="nUslov" type="warning" :withCloseBtn="false"><span>{{nData}}</span></vuestic-alert>
            <vuestic-alert v-if="nUslovDanger" type="danger" :withCloseBtn="false"><span>{{nDataDanger}}</span></vuestic-alert>
          </div>
          <hr v-if="uslov">
          <div class="row">
            <div class="col-md-3"></div>
            <div class="col-md-6">
              <button class="btn btn-sm btn-secondary" @click.prevent="gotovoAkoNema"><span class="fa fa-step-backward"></span>{{ ' nazad'}}</button>
              <button v-if="uslov" class="btn btn-sm btn-secondary" @click.prevent="gotovo"><span class="fa fa-backward"></span>{{ ' POVRATAK'}}</button>
            </div>
          </div>
        </vuestic-widget>
  
        <vuestic-widget v-if="ifRefAnalit" headerText="Trenutne postavke - Testovi aparata - Dodavanje referentnih vrijednosti">
          <div class="row">
  
            <div class="col-md-5">
  
              <div class="row">
                <div class="col-md-3"></div>
                <div class="col-md-6">
                  <div style="text-align:center;" class="testoviDiv">
                    <h6>Aparat : {{tpAparat}}</h6>
                  </div>
                  <div style="text-align:center;" class="testoviDiv">
                    <h5>Naziv testa : {{test}}</h5>
                  </div>
                  <div style="text-align:center;" class="testoviDiv">
                    <h6>Analit : {{tpTest}}</h6>
                  </div>
                  <div style="text-align:center;" class="testoviDiv">
                    <h6>Jedinica : {{analitUnit}}</h6>
                  </div>
                  <hr>
                </div>
              </div>
  
              <div class="row">
                <div class="col-md-12">
                  <fieldset>
  
                    <vuestic-simple-select label="Izaberite referentnu grupu" v-model="refGrupa" name="refGrupa" :required="true" title=" " ref="refGrupaSelect" v-bind:options="refGrupe">
                    </vuestic-simple-select>
  
                    <vuestic-simple-select v-show="false" label="Interpretacija rezultata" v-model="interpretacija" name="refGrupa" :required="true" title=" " ref="refGrupaSelect" v-bind:options="interpretacije">
                    </vuestic-simple-select>
  
                    <div class="row">
                      <div v-if='tmpInterp === "Referentni interval" || tmpInterp === null' class="col-md-6">
                        <div class="form-group with-icon-left">
                          <div class="input-group">
                            <input id="input-icon-left" title=" " v-model="dRef" name="input-icon-left" required/>
                            <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                            <label class="control-label" for="input-icon-left">{{'Donja referentna vrijednost'}}</label><i class="bar"></i>
                          </div>
                        </div>
                      </div>
                      <div v-if='tmpInterp === "Referentni interval" || tmpInterp === null' class="col-md-6">
                        <div class="form-group with-icon-left">
                          <div class="input-group">
                            <input id="input-icon-left" title=" " v-model="gRef" name="input-icon-left" required/>
                            <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                            <label class="control-label" for="input-icon-left">{{'Gornja referentna vrijednost'}}</label><i class="bar"></i>
                          </div>
                        </div>
                      </div>
                      <div v-if='tmpInterp === "Granična vrijednost | ≤ od"' class="col-md-12">
                        <div class="form-group with-icon-left">
                          <div class="input-group">
                            <input id="input-icon-left" title=" " v-model="gRef" name="input-icon-left" required/>
                            <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                            <label class="control-label" for="input-icon-left">{{'Granična vrijednost | ≤ od'}}</label><i class="bar"></i>
                          </div>
                        </div>
                      </div>
                      <div v-if='tmpInterp === "Granična vrijednost | ≥ od"' class="col-md-12">
                        <div class="form-group with-icon-left">
                          <div class="input-group">
                            <input id="input-icon-left" title=" " v-model="gRef" name="input-icon-left" required/>
                            <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                            <label class="control-label" for="input-icon-left">{{'Granična vrijednost | ≥ od'}}</label><i class="bar"></i>
                          </div>
                        </div>
                      </div>
                    </div>
  
  
                    <div v-if="dobuslov" class="row">
                      <div v-if="!dobnaGrD" class="col-md-6">
                        <div class="form-group with-icon-left">
                          <div class="input-group">
                            <input id="input-icon-left" title=" " v-model="dDob" name="input-icon-left" required/>
                            <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                            <label class="control-label" for="input-icon-left">{{'Unesite donju dobnu granicu'}}</label><i class="bar"></i>
                          </div>
                        </div>
                      </div>
                      <div v-if="dobnaGrD" class="col-md-6">
                        <vuestic-simple-select label="Izaberite donju dobnu granicu" v-model="doGodinuDanaSelectedD" name="doGodinuDanaRefD" :required="true" title=" " ref="doGodinuDanaRefD" v-bind:options="doGodinuDanaRefD">
                        </vuestic-simple-select>
                      </div>
                      <div v-if="!dobnaGrG" class="col-md-6">
                        <div class="form-group with-icon-left">
                          <div class="input-group">
                            <input id="input-icon-left" title=" " v-model="gDob" name="input-icon-left" required/>
                            <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                            <label class="control-label" for="input-icon-left">{{'Unesite gornju dobnu granicu'}}</label><i class="bar"></i>
                          </div>
                        </div>
                      </div>
                      <div v-if="dobnaGrG" class="col-md-6">
                        <vuestic-simple-select label="Izaberite gornju dobnu granicu" v-model="doGodinuDanaSelectedG" name="doGodinuDanaRefG" :required="true" title=" " ref="doGodinuDanaRefG" v-bind:options="doGodinuDanaRefG">
                        </vuestic-simple-select>
                      </div>
                    </div>
  
                    <vuestic-simple-select class="form-group with-icon-right" label="Izaberite spol  grupe" v-model="spol" v-validate="'required'" name="spol" required title=" " ref="spolSelect" v-bind:options='spolovi'>
                    </vuestic-simple-select>
  
                    <button :disabled="edit" class="btn btn-primary" @click.prevent="sacuvajRefAnalit"><span class="glyphicon glyphicon-plus"></span>{{ ' DODAJ'}}</button>
  
                    <hr>
  
                    <button :disabled="edit" class="btn btn-sm btn-secondary" @click.prevent="gotovoAkoNema2"><span class="fa fa-step-backward"></span>{{ ' nazad'}}</button>
                    <button :disabled="edit" v-if="uslov" class="btn btn-sm btn-secondary" @click.prevent="gotovo"><span class="fa fa-backward"></span>{{ ' POVRATAK'}}</button>
  
                  </fieldset>
  
                  <hr>
                  <a v-if="!edit" @click="trenutneRef = !trenutneRef" href="#">{{'Trenutne referentne vrijednosti'}}</a>
                  <a v-if="edit" style="color: #e34a4a;" href="#">{{'Trenutne referentne vrijednosti'}}</a>
                  <span v-if="refGrupa === 'DJECA'">
                      {{" | "}}<a @click="switchDobGrD" href="#">{{'Donja dobna granica'}}</a>{{" | "}}<a @click="switchDobGrG" href="#">{{'Gornja dobna granica'}}</a></span>
                </div>
              </div>
            </div>
  
            <div v-if="!trenutneRef" class="col-md-7">
  
              <div class="table-responsive">
                <table v-if="tabelaUslov3" class="table table-striped first-td-padding">
                  <thead>
                    <tr>
                      <td>{{"Grupa"}}</td>
  
                      <td v-if='tmpInterp === null'>{{"DRef"}}</td>
                      <td v-if='tmpInterp === "Referentni interval"'>{{"DRef"}}</td>
                      <td v-if='tmpInterp === null'>{{"GRef"}}</td>
                      <td v-if='tmpInterp === "Referentni interval"'>{{"GRef"}}</td>
  
                      <td v-if='tmpInterp != null && tmpInterp.includes("Granična vrijednost")'>{{"GrVr"}}</td>
                      <td v-if='tmpInterp === "Opisni rezultat"'>{{"Vrijednost"}}</td>
  
                      <td>{{"Dob"}}</td>
                      <td>{{"Spol"}}</td>
                      <td>Uredi</td>
                      <td>{{"akcija"}}</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="element in anaReferentne">
                      <td>{{element.grupa}}</td>
                      <td v-if="tmpID != element._id && (tmpInterp === 'Referentni interval' || tmpInterp === null)"><strong>{{element.refd}}</strong></td>
                      <td v-if="tmpID === element._id && (tmpInterp === 'Referentni interval' || tmpInterp === null)">
                        <div v-show="edit === false">
                          <label><strong>{{element.refd}}</strong></label>
                        </div>
                        <input class="table-info" style="width:100%" v-show="edit === true" v-model="element.refd">
                      </td>
  
                      <td v-if="tmpID != element._id && (tmpInterp === 'Referentni interval' || tmpInterp === null)"><strong>{{element.refg}}</strong></td>
                      <td v-if="tmpID != element._id && tmpInterp === 'Granična vrijednost | ≤ od'"><strong>{{'≤ ' + element.refg.replace('-', '')}}</strong></td>
                      <td v-if="tmpID != element._id && tmpInterp === 'Granična vrijednost | ≥ od'"><strong>{{'≥ ' + element.refg.replace('-', '')}}</strong></td>
                      <td v-if="tmpInterp === 'Opisni rezultat'"><strong>{{'Opis'}}</strong></td>
  
  
                      <td v-if="tmpID === element._id && (tmpInterp === 'Referentni interval' || tmpInterp === null)">
                        <div v-show="edit === false">
                          <label><strong>{{element.refg.replace('-', '')}}</strong></label>
                        </div>
                        <input class="table-info" style="width:100%" v-show="edit === true" v-model="element.refg">
                      </td>
  
                      <td v-if="tmpID === element._id && tmpInterp === 'Granična vrijednost | ≤ od'">
                        <div v-show="edit === false">
                          <strong>{{'≤ '}}<label>{{element.refg.replace('-', '')}}</label></strong>
                        </div>
                        <input class="table-info" style="width:100%" v-show="edit === true" v-model="element.refg">
                      </td>
  
                      <td v-if="tmpID === element._id && tmpInterp === 'Granična vrijednost | ≥ od'">
                        <div v-show="edit === false">
                          <strong>{{'≥ '}}<label>{{element.refg.replace('-', '')}}</label></strong>
                        </div>
                        <input class="table-info" style="width:100%" v-show="edit === true" v-model="element.refg">
                      </td>
  
                      <td v-if="$store.state.userId != 'admin@atom.ba'">{{ispisDob(element.dDob, element.gDob)}}</td>
                      <td v-if="$store.state.userId === 'admin@atom.ba'">{{element.dDob}} - {{element.gDob}}</td>
                      <td>{{element.spol}}</td>
  
                      <td v-if="tmpInterp != 'Opisni rezultat'">
                        <button :disabled="edit" v-if="tmpID != element._id" @click.prevent="editRefAna($event)" title="Uredite podatke" v-bind:id="element._id" class="btn btn-micro btn-info"><span v-bind:id="element._id" class="glyphicon glyphicon-edit"></span>{{''}}</button>
                        <button :disabled="edit" v-if="uredi && tmpID === element._id" @click.prevent="editRefAna($event)" title="Uredite podatke" v-bind:id="element._id" class="btn btn-micro btn-info"><span v-bind:id="element._id" class="glyphicon glyphicon-edit"></span>{{''}}</button>
                        <button v-if="!uredi && tmpID === element._id" @click.prevent="saveRefAna($event, element.refd, element.refg, element.spol, element.dDob, element.gDob, element.grupa)" title="Sačuvajte izmjene" v-bind:id="element._id" class="btn btn-micro btn-secondary"><span v-bind:id="element._id" class="fa fa-save"></span>{{''}}</button>
                      </td>
  
                      <td v-if="tmpInterp === 'Opisni rezultat'">
                        <button :disabled="true" title="Uređivanje nije omogućeno" v-bind:id="element._id" class="btn btn-micro btn-info"><span v-bind:id="element._id" class="glyphicon glyphicon-edit"></span>{{''}}</button>
                      </td>
  
  
                      <td><button :disabled="edit" title='Brisanje zapisa' v-bind:id="element._id" class="btn btn-danger btn-micro" @click="catchDialog3($event)"><span  v-bind:id="element._id" class="fa fa-trash-o"></span>{{ ' IZBRIŠI' }}</button></td>
                    </tr>
                  </tbody>
                </table>
  
                <vuestic-alert v-if="dataUslov3" type="warning" :withCloseBtn="false"><span>{{dataAvailable3}}</span></vuestic-alert>
                <vuestic-alert v-if="dataUslovDanger" type="danger" :withCloseBtn="false"><span>{{dataAvailable}}</span></vuestic-alert>
              </div>
            </div>
          </div>
        </vuestic-widget>
  
      </div>
    </div>
  </div>
</template>

<script>
  import {
    http
  } from '../../../../config/config.js'
  export default {
    data() {
      return {
        kod: '',
        sekcija: '',
        sekcije: [],
        grupa: '',
        grupe: [],
        test: '',
        testovi: [],
        aparat: '',
        aparatCI: '',
        aparati: [],
        metoda: '',
        price: '',
        tpAparat: '',
        refGrupa: '',
        refGrupe: [],
        dRef: '',
        gRef: '',
        referentne: [],
        obj: {},
        tpTable: false,
        ifButton: true,
        ifTrenutnePostavke: false,
        ifDodajAnalit: false,
        ifDodajAnalit2: false,
        ifJedinica: false,
        ifdodajTest: true,
        tablerefresh: true,
        prikaziTekst: 'Trenutne postavke',
        ifMulti: false,
        refAnaliti: [],
        ifRefAnalit: false,
        analit: '',
        tpTest: '',
        anaReferentne: [],
        uslov: false,
        trenutneRef: false,
        infoDanger: false,
        infoSuccess: false,
        infoWarning: false,
        infoWarning2: false,
        infoInfo: false,
        trenutniKodovi: [],
        dataAvailable1: '',
        dataUslov1: false,
        tabelaUslov1: false,
        dataAvailable2: '',
        dataUslov2: false,
        tabelaUslov2: false,
        dataAvailable3: '',
        dataUslov3: false,
        tabelaUslov3: false,
        analitUnit: '',
        dataUslovDanger: false,
        dataAvailable: '',
        nUslov: false,
        nData: '',
        nUslovDanger: false,
        nDataDanger: '',
        nUslov2: true,
        tipoviUzorka: [],
        tipovi: [],
        tipoviFull: [],
        text: '',
        desc: '',
        gDob: '',
        dDob: '',
        spol: '',
        spolovi: ['MUŠKI', 'ŽENSKI'],
        dobuslov: true,
        testzaAnalit: '',
        analitzaRef: '',
        analitTesta: '',
        tmpEvent: '',
        uredi: true,
        edit: false,
        tmpID: '',
        doGodinuDanaRefD: [],
        doGodinuDanaRefG: [],
        doGodinuDanaSelected: '',
        doGodinuDanaSelectedD: '',
        doGodinuDanaSelectedG: '',
        dobnaGr: false,
        dobnaGrD: false,
        dobnaGrG: false,
        interpretacija: null,
        interpretacije: ['Referentni interval', 'Granična vrijednost | ≤ od', 'Granična vrijednost | ≥ od', 'Opisni rezultat', 'Specifični'],
        tmpInterp: null,
  
        toastText: '',
        toastIcon: '',
        toastPosition: '',
        toastDuration: 2500,
        isToastFullWidth: false,
        className: '',
      }
    },
  
    name: 'aptest',
  
    created() {
      this.doGodinuDanaRefD = ["0 dana starosti", "14 dana starosti", "1 mjesec starosti", "2 mjeseca starosti",
        "3 mjeseca starosti", "4 mjeseca starosti", "5 mjeseci starosti", "6 mjeseci starosti",
        "7 mjeseci starosti", "8 mjeseci starosti", "9 mjeseci starosti", "10 mjeseci starosti",
        "11 mjeseci starosti"
      ]
      this.doGodinuDanaRefG = ["14 dana starosti", "1 mjesec starosti", "2 mjeseca starosti",
        "3 mjeseca starosti", "4 mjeseca starosti", "5 mjeseci starosti", "6 mjeseci starosti",
        "7 mjeseci starosti", "8 mjeseci starosti", "9 mjeseci starosti", "10 mjeseci starosti",
        "11 mjeseci starosti", "12 mjeseci starosti"
      ]
    },
  
    mounted() {
      this.dataUslovDanger = false
      http.get('postavke/aparat/mount/list?token=' + this.$store.state.token + '&site=' + this.$store.state.site, {})
        .then(res => {
          if (res.data.success === false) {
            this.aparati.push('GREŠKA - DB Connection')
            this.grupe.push('GREŠKA - DB Connection')
            this.sekcije.push('GREŠKA - DB Connection')
            this.testovi.push('GREŠKA - DB Connection')
          } else {
            this.sekcije = res.data.obj.sekcija
            this.aparati = []
            res.data.obj.aparat.forEach(element => {
              this.aparati.push(element.ime)
            })
            if (this.aparati.length == 0) {
              this.aparati.push('NEMA PODATAKA')
            }
            if (this.sekcije.length == 0) {
              this.sekcije.push('NEMA PODATAKA')
              this.grupe.push('NEMA PODATAKA')
              this.testovi.push('NEMA PODATAKA')
            }
          }
  
          http.get('postavke/list?token=' + this.$store.state.token + '&site=' + this.$store.state.site, {})
            .then(res => {
              if (res.data.success === false) {
                this.tipovi = []
                this.tipoviFull = []
                this.tipovi.push('GREŠKA - DB Connection')
              } else {
                this.tipovi = []
                res.data.data.tipUzorka.forEach(element => {
                  var option = {}
                  option.value = element._id
                  option.label = element.tip
                  this.tipovi.push(option.label)
                  this.tipoviFull.push(option)
                })
                if (this.tipovi.length == 0) {
                  this.tipovi.push('NEMA PODATAKA')
                }
              }
            })
        })
    },
    watch: {
      doGodinuDanaSelectedD: function() {
        switch (this.doGodinuDanaSelectedD.toString()) {
          case '0 dana starosti':
            this.dDob = '0.00'
            break;
          case '14 dana starosti':
            this.dDob = '0.05'
            break;
          case '1 mjesec starosti':
            this.dDob = '0.09'
            break;
          case '2 mjeseca starosti':
            this.dDob = '0.20'
            break;
          case '3 mjeseca starosti':
            this.dDob = '0.26'
            break;
          case '4 mjeseca starosti':
            this.dDob = '0.34'
            break;
          case '5 mjeseci starosti':
            this.dDob = '0.42'
            break;
          case '6 mjeseci starosti':
            this.dDob = '0.51'
            break;
          case '7 mjeseci starosti':
            this.dDob = '0.59'
            break;
          case '8 mjeseci starosti':
            this.dDob = '0.66'
            break;
          case '9 mjeseci starosti':
            this.dDob = '0.76'
            break;
          case '10 mjeseci starosti':
            this.dDob = '0.84'
            break;
          case '11 mjeseci starosti':
            this.dDob = '0.92'
            break;
          default:
            this.dDob = ''
            break;
        }
      },
      doGodinuDanaSelectedG: function() {
        switch (this.doGodinuDanaSelectedG.toString()) {
          case '14 dana starosti':
            this.gDob = '0.04'
            break;
          case '1 mjesec starosti':
            this.gDob = '0.08'
            break;
          case '2 mjeseca starosti':
            this.gDob = '0.19'
            break;
          case '3 mjeseca starosti':
            this.gDob = '0.25'
            break;
          case '4 mjeseca starosti':
            this.gDob = '0.33'
            break;
          case '5 mjeseci starosti':
            this.gDob = '0.41'
            break;
          case '6 mjeseci starosti':
            this.gDob = '0.50'
            break;
          case '7 mjeseci starosti':
            this.gDob = '0.58'
            break;
          case '8 mjeseci starosti':
            this.gDob = '0.65'
            break;
          case '9 mjeseci starosti':
            this.gDob = '0.75'
            break;
          case '10 mjeseci starosti':
            this.gDob = '0.83'
            break;
          case '11 mjeseci starosti':
            this.gDob = '0.91'
            break;
          case '12 mjeseci starosti':
            this.gDob = '0.99'
            break;
          default:
            this.gDob = ''
            break;
        }
      },
  
      aparat: function() {
        this.dDob = ''
        this.gDob = ''
        this.dobuslov = true
        this.dobnaGrD = false
        this.dobnaGrG = false
        this.doGodinuDanaSelectedD = ''
        this.doGodinuDanaSelectedG = ''
  
        http.post('postavke/aptest/list', {
            email: this.$store.state.userId,
            aparat: this.aparat,
            token: this.$store.state.token,
            site: this.$store.state.site
          })
          .then(res => {
            this.trenutniKodovi = res.data.aptests
            this.sekcija = ''
            this.grupa = ''
            this.test = ''
          })
      },
      refGrupa: function() {
        if (this.refGrupa.trim() === '') {
          this.dDob = ''
          this.gDob = ''
          this.dobuslov = true
          this.doGodinuDanaSelectedD = ''
          this.doGodinuDanaSelectedG = ''
          this.dobnaGrD = false
          this.dobnaGrG = false
        } else if (this.refGrupa === 'SVI' || this.refGrupa === 'DEFAULT') {
          this.dDob = '0'
          this.gDob = '130'
          this.dobnaGrD = false
          this.dobnaGrG = false
          this.dobuslov = false
        } else if (this.refGrupa != 'DJECA' && this.refGrupa != 'ODRASLI') {
          this.dDob = '131'
          this.gDob = '140'
          this.dobuslov = false
          this.dobnaGrD = false
          this.dobnaGrG = false
        } else if (this.refGrupa === 'ODRASLI') {
          this.dDob = ''
          this.gDob = ''
          this.dobuslov = true
          this.dobnaGrD = false
          this.dobnaGrG = false
          this.doGodinuDanaSelectedD = ''
          this.doGodinuDanaSelectedG = ''
        } else {
          this.dDob = ''
          this.gDob = ''
          this.dobuslov = true
          this.doGodinuDanaSelectedD = ''
          this.doGodinuDanaSelectedG = ''
          // this.dobnaGrD = false
          // this.dobnaGrG = false
        }
      },
      sekcija: function() {
        if (this.sekcija === 'NEMA PODATAKA') {} else if (this.sekcija === 'GREŠKA - DB Connection') {
          this.grupe = []
          this.grupe.push('GREŠKA - DB Connection')
        } else {
          this.grupa = ''
          http.post('postavke/labtest/group/list', {
              email: this.$store.state.userId,
              sekcija: this.sekcija,
              token: this.$store.state.token,
              site: this.$store.state.site
            })
            .then(res => {
              this.grupe = []
              res.data.grupe.forEach(element => {
                this.grupe.push(element.grupa)
              })
              if (this.grupe.length == 0) {
                this.grupe.push('NEMA PODATAKA')
              }
            })
        }
      },
      grupa: function() {
        if (this.grupa === 'NEMA PODATAKA') {
          this.testovi = []
          this.testovi.push('NEMA PODATAKA')
        } else if (this.grupa === 'GREŠKA - DB Connection') {
          this.testovi = []
          this.testovi.push('GREŠKA - DB Connection')
        } else {
          this.test = ''
          http.post('postavke/labtest/assay/list', {
              email: this.$store.state.userId,
              sekcija: this.sekcija,
              grupa: this.grupa,
              token: this.$store.state.token,
              site: this.$store.state.site
            })
            .then(res => {
              if (res.data.success === false) {
  
              } else {
                this.testovi = []
                this.aparatCI = this.aparat.toLowerCase()
  
                if (this.aparatCI.includes('manual')) {
                  res.data.tests.forEach(element => {
                    if (element.manual === true)
                      this.testovi.push(element.analit)
                  });
                } else {
                  res.data.tests.forEach(element => {
                    if (element.manual === false)
                      this.testovi.push(element.analit)
                  });
                }
                if (this.testovi.length == 0) {
                  this.testovi.push('NEMA PODATAKA')
                }
              }
            })
        }
      },
      tpAparat: function() {
        this.dDob = ''
        this.gDob = ''
        this.dobuslov = true
        this.dobnaGrD = false
        this.dobnaGrG = false
        this.doGodinuDanaSelectedD = ''
        this.doGodinuDanaSelectedG = ''
  
        if (new String(this.tpAparat).valueOf() === new String("NEMA PODATAKA").valueOf()) {
          this.dataAvailable1 = 'Aparati nisu definisani.'
          this.dataUslov1 = true
          this.uslov = true
        } else {
          http.post('postavke/aptest/list', {
              email: this.$store.state.userId,
              aparat: this.tpAparat,
              token: this.$store.state.token,
              site: this.$store.state.site
            })
            .then(res => {
              if (res.data.success === false) {
                this.dataAvailable = 'Greška prilikom čitanja iz baze.'
                this.dataUslovDanger = true
                this.dataUslov1 = false
                this.tabelaUslov1 = false
                this.dataUslov2 = false
                this.tabelaUslov2 = false
                this.uslov = true
              } else {
                this.testovi = res.data.aptests
                if (this.testovi.length > 0) {
                  this.dataAvailable1 = ''
                  this.dataUslov1 = false
                  this.tabelaUslov1 = true
                  this.dataUslovDanger = false
                  this.uslov = true
                }
                if (this.testovi.length <= 0) {
                  this.dataAvailable1 = 'Za odabrani aparat, nema definisanih testova.'
                  this.dataUslov1 = true
                  this.tabelaUslov1 = false
                  this.dataUslovDanger = false
                  this.uslov = true
                }
              }
            })
        }
      }
    },
    methods: {
      switchDobGrD() {
        this.dDob = ''
        this.doGodinuDanaSelectedD = ''
        this.dobnaGrD = !this.dobnaGrD
      },
      switchDobGrG() {
        this.gDob = ''
        this.doGodinuDanaSelectedG = ''
        this.dobnaGrG = !this.dobnaGrG
      },
      notice(type, text, desc) {
        this.$notice[type]({
          title: text,
          description: desc,
          closable: false,
          styles: {
            width: "500px",
            marginLeft: "-195px"
          },
          duration: 2.0,
        })
      },
      editRef(event) {
        this.edit = true
        this.uredi = false
        this.tmpID = event.target.id
      },
      editRefAna(event) {
        this.edit = true
        this.uredi = false
        this.tmpID = event.target.id
      },
      editUzorak(event) {
        this.edit = true
        this.uredi = false
        this.tmpID = event.target.id
      },
      saveRef(event, refd, refg, spol, dDob, gDob, grupa) {
        this.tmpID = event.target.id
        var item = true
        var i
        if ((refd.trim() === '') || (refg.trim() === '')) {
          item = false
          this.toastText = 'Sva polja su obavezna!'
          this.toastIcon = 'fa-warning'
          this.toastPosition = 'top-right'
          this.className = 'vuestic-toast-warning'
  
          this.showToast(this.toastText, {
            icon: this.toastIcon,
            position: this.toastPosition,
            duration: this.toastDuration,
            fullWidth: this.isToastFullWidth,
            className: this.className,
          })
          this.edit = true
          this.uredi = false
        } else if (isNaN(refd.trim())) {
          item = false
          this.toastText = 'Referentna vrijednost mora biti iz skupa realnih brojeva!'
          this.toastIcon = 'fa-warning'
          this.toastPosition = 'top-right'
          this.className = 'vuestic-toast-warning'
  
          this.showToast(this.toastText, {
            icon: this.toastIcon,
            position: this.toastPosition,
            duration: this.toastDuration,
            fullWidth: this.isToastFullWidth,
            className: this.className,
          })
          this.edit = true
          this.uredi = false
        } else if (isNaN(refg.trim())) {
          item = false
          this.toastText = 'Referentna vrijednost mora biti iz skupa realnih brojeva!'
          this.toastIcon = 'fa-warning'
          this.toastPosition = 'top-right'
          this.className = 'vuestic-toast-warning'
  
          this.showToast(this.toastText, {
            icon: this.toastIcon,
            position: this.toastPosition,
            duration: this.toastDuration,
            fullWidth: this.isToastFullWidth,
            className: this.className,
          })
          this.edit = true
          this.uredi = false
        } else {
  
        }
  
        if (item) {
          http.post('postavke/aptest/referentne/update', {
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
                this.toastText = 'Greška prilikom upisa!'
                this.toastIcon = 'fa-remove'
                this.toastPosition = 'top-right'
                this.className = 'vuestic-toast-danger'
  
                this.showToast(this.toastText, {
                  icon: this.toastIcon,
                  position: this.toastPosition,
                  duration: this.toastDuration,
                  fullWidth: this.isToastFullWidth,
                  className: this.className,
                })
              } else {
                this.toastText = 'Unos uspješno obavljen!'
                this.toastIcon = 'fa-check'
                this.toastPosition = 'top-right'
                this.className = 'vuestic-toast-primary'
  
                this.showToast(this.toastText, {
                  icon: this.toastIcon,
                  position: this.toastPosition,
                  duration: this.toastDuration,
                  fullWidth: this.isToastFullWidth,
                  className: this.className,
                })
              }
              this.edit = false
              this.uredi = true
            })
        }
      },
      saveUzorak(event, tipovi, interpretacija) {
        this.tmpID = event.target.id
        var item = true
        var i
  
        if (false) {
          this.edit = true
          this.uredi = false
        }
  
        http.post('postavke/aptest/reftip/update', {
            email: this.$store.state.userId,
            token: this.$store.state.token,
            interpretacija: interpretacija,
            id: event.target.id,
            tipovi: tipovi,
            site: this.$store.state.site
          })
          .then(res => {
            if (res.data.success === false) {
              this.toastText = 'Greška prilikom upisa!'
              this.toastIcon = 'fa-remove'
              this.toastPosition = 'top-right'
              this.className = 'vuestic-toast-danger'
  
              this.showToast(this.toastText, {
                icon: this.toastIcon,
                position: this.toastPosition,
                duration: this.toastDuration,
                fullWidth: this.isToastFullWidth,
                className: this.className,
              })
            } else {
              this.toastText = 'Izmjena uspješno obavljena!'
              this.toastIcon = 'fa-check'
              this.toastPosition = 'top-right'
              this.className = 'vuestic-toast-primary'
  
              this.showToast(this.toastText, {
                icon: this.toastIcon,
                position: this.toastPosition,
                duration: this.toastDuration,
                fullWidth: this.isToastFullWidth,
                className: this.className,
              })
            }
            this.edit = false
            this.uredi = true
          })
      },
      saveRefAna(event, refd, refg, spol, dDob, gDob, grupa) {
        this.tmpID = event.target.id
        var item = true
        var i
  
        if ((refd.trim() === '') || (refg.trim() === '')) {
          item = false
          this.toastText = 'Sva polja su obavezna!'
          this.toastIcon = 'fa-warning'
          this.toastPosition = 'top-right'
          this.className = 'vuestic-toast-warning'
  
          this.showToast(this.toastText, {
            icon: this.toastIcon,
            position: this.toastPosition,
            duration: this.toastDuration,
            fullWidth: this.isToastFullWidth,
            className: this.className,
          })
          this.edit = true
          this.uredi = false
        } else if (isNaN(refd.trim())) {
          item = false
          this.toastText = 'Referentna vrijednost mora biti iz skupa realnih brojeva!'
          this.toastIcon = 'fa-warning'
          this.toastPosition = 'top-right'
          this.className = 'vuestic-toast-warning'
  
          this.showToast(this.toastText, {
            icon: this.toastIcon,
            position: this.toastPosition,
            duration: this.toastDuration,
            fullWidth: this.isToastFullWidth,
            className: this.className,
          })
          this.edit = true
          this.uredi = false
        } else if (isNaN(refg.trim())) {
          item = false
          this.toastText = 'Referentna vrijednost mora biti iz skupa realnih brojeva!'
          this.toastIcon = 'fa-warning'
          this.toastPosition = 'top-right'
          this.className = 'vuestic-toast-warning'
  
          this.showToast(this.toastText, {
            icon: this.toastIcon,
            position: this.toastPosition,
            duration: this.toastDuration,
            fullWidth: this.isToastFullWidth,
            className: this.className,
          })
          this.edit = true
          this.uredi = false
        } else {
  
        }
  
        if (item) {
          http.post('postavke/aptest/analit/referentne/update', {
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
                this.toastText = 'Greška prilikom upisa!'
                this.toastIcon = 'fa-remove'
                this.toastPosition = 'top-right'
                this.className = 'vuestic-toast-danger'
  
                this.showToast(this.toastText, {
                  icon: this.toastIcon,
                  position: this.toastPosition,
                  duration: this.toastDuration,
                  fullWidth: this.isToastFullWidth,
                  className: this.className,
                })
              } else {
                this.toastText = 'Unos uspješno obavljen!'
                this.toastIcon = 'fa-check'
                this.toastPosition = 'top-right'
                this.className = 'vuestic-toast-primary'
  
                this.showToast(this.toastText, {
                  icon: this.toastIcon,
                  position: this.toastPosition,
                  duration: this.toastDuration,
                  fullWidth: this.isToastFullWidth,
                  className: this.className,
                })
              }
              this.edit = false
              this.uredi = true
            })
        }
      },
      dodajPostavku: function() {
        var item = true
        var check = true
        if ((this.aparat.trim() === 'GREŠKA - DB Connection') || (this.sekcija.trim() === 'GREŠKA - DB Connection') || (this.grupa.trim() === 'GREŠKA - DB Connection') || (this.test.trim() === 'GREŠKA - DB Connection') || (this.tipoviUzorka[0] === 'GREŠKA - DB Connection')) {
          item = false
          this.toastText = 'Molimo Vas da osvježite aplikaciju!'
          this.toastIcon = 'fa-warning'
          this.toastPosition = 'top-right'
          this.className = 'vuestic-toast-warning'
          this.showToast(this.toastText, {
            icon: this.toastIcon,
            position: this.toastPosition,
            duration: this.toastDuration,
            fullWidth: this.isToastFullWidth,
            className: this.className,
          })
        } else if ((this.price.trim() === '') || (this.aparat.trim() === '') || (this.sekcija.trim() === '') || (this.grupa.trim() === '') || (this.test.trim() === '') || (this.kod.trim() === '') || (this.metoda.trim() === '') || (this.tipoviUzorka.length == 0)) {
          item = false
          this.toastText = 'Sva polja su obavezna!'
          this.toastIcon = 'fa-warning'
          this.toastPosition = 'top-right'
          this.className = 'vuestic-toast-warning'
  
          this.showToast(this.toastText, {
            icon: this.toastIcon,
            position: this.toastPosition,
            duration: this.toastDuration,
            fullWidth: this.isToastFullWidth,
            className: this.className,
          })
        } else if (this.aparat.trim() === 'NEMA PODATAKA') {
          item = false
          this.toastText = 'Aparati nisu definisani!'
          this.toastIcon = 'fa-warning'
          this.toastPosition = 'top-right'
          this.className = 'vuestic-toast-warning'
  
          this.showToast(this.toastText, {
            icon: this.toastIcon,
            position: this.toastPosition,
            duration: this.toastDuration,
            fullWidth: this.isToastFullWidth,
            className: this.className,
          })
        } else if (((this.sekcija.trim() != 'NEMA PODATAKA') && (this.sekcija.trim() != '')) && ((this.grupa.trim() != 'NEMA PODATAKA') && (this.grupa.trim() != '')) && (this.test.trim() === 'NEMA PODATAKA')) {
          item = false
          this.toastText = 'Testovi nisu definisani!'
          this.toastIcon = 'fa-warning'
          this.toastPosition = 'top-right'
          this.className = 'vuestic-toast-warning'
  
          this.showToast(this.toastText, {
            icon: this.toastIcon,
            position: this.toastPosition,
            duration: this.toastDuration,
            fullWidth: this.isToastFullWidth,
            className: this.className,
          })
        } else if ((this.sekcija.trim() === 'NEMA PODATAKA') && (this.grupa.trim() === 'NEMA PODATAKA') && (this.test.trim() === 'NEMA PODATAKA')) {
          item = false
          this.toastText = 'Sekcije nisu definisane!'
          this.toastIcon = 'fa-warning'
          this.toastPosition = 'top-right'
          this.className = 'vuestic-toast-warning'
  
          this.showToast(this.toastText, {
            icon: this.toastIcon,
            position: this.toastPosition,
            duration: this.toastDuration,
            fullWidth: this.isToastFullWidth,
            className: this.className,
          })
        } else if (((this.sekcija.trim() != 'NEMA PODATAKA') && (this.sekcija.trim() != '')) && (this.grupa.trim() === 'NEMA PODATAKA')) {
          item = false
          this.toastText = 'Grupe testova nisu definisane!'
          this.toastIcon = 'fa-warning'
          this.toastPosition = 'top-right'
          this.className = 'vuestic-toast-warning'
  
          this.showToast(this.toastText, {
            icon: this.toastIcon,
            position: this.toastPosition,
            duration: this.toastDuration,
            fullWidth: this.isToastFullWidth,
            className: this.className,
          })
        } else if (this.tipoviUzorka[0] === 'NEMA PODATAKA') {
          item = false
          this.toastText = 'Tipovi uzorka nisu definisani!'
          this.toastIcon = 'fa-warning'
          this.toastPosition = 'top-right'
          this.className = 'vuestic-toast-warning'
  
          this.showToast(this.toastText, {
            icon: this.toastIcon,
            position: this.toastPosition,
            duration: this.toastDuration,
            fullWidth: this.isToastFullWidth,
            className: this.className,
          })
        } else if (((isNaN(this.price) || this.price < 0))) {
          item = false
          this.toastText = 'Cijena nije validna!'
          this.toastIcon = 'fa-warning'
          this.toastPosition = 'top-right'
          this.className = 'vuestic-toast-warning'
          this.showToast(this.toastText, {
            icon: this.toastIcon,
            position: this.toastPosition,
            duration: this.toastDuration,
            fullWidth: this.isToastFullWidth,
            className: this.className,
          })
        } else {
          this.trenutniKodovi.forEach(element => {
            if (element.kod === this.kod.trim()) {
              item = false
              this.toastText = 'Kod već postoji!'
              this.toastIcon = 'fa-warning'
              this.toastPosition = 'top-right'
              this.className = 'vuestic-toast-warning'
  
              this.showToast(this.toastText, {
                icon: this.toastIcon,
                position: this.toastPosition,
                duration: this.toastDuration,
                fullWidth: this.isToastFullWidth,
                className: this.className,
              })
              return
            }
          });
  
          if (check != false) {
            this.trenutniKodovi.forEach(element => {
              if (element.test.analit === this.test.trim()) {
                item = false
                this.toastText = 'Izabrani test je već registrovan!'
                this.toastIcon = 'fa-warning'
                this.toastPosition = 'top-right'
                this.className = 'vuestic-toast-warning'
  
                this.showToast(this.toastText, {
                  icon: this.toastIcon,
                  position: this.toastPosition,
                  duration: this.toastDuration,
                  fullWidth: this.isToastFullWidth,
                  className: this.className,
                })
                return
              }
            });
          }
        }
  
        if (item) {
          http.post('postavke/aptest/save', {
              email: this.$store.state.userId,
              aparat: this.aparat,
              sekcija: this.sekcija,
              grupa: this.grupa,
              test: this.test,
              kod: this.kod,
              metoda: this.metoda,
              tipoviUzorka: this.tipoviUzorka,
              price: this.price,
              token: this.$store.state.token,
              site: this.$store.state.site
            })
            .then(res => {
              if (res.data.success === false) {
                this.toastText = 'Greška prilikom upisa!'
                this.toastIcon = 'fa-remove'
                this.toastPosition = 'top-right'
                this.className = 'vuestic-toast-danger'
  
                this.showToast(this.toastText, {
                  icon: this.toastIcon,
                  position: this.toastPosition,
                  duration: this.toastDuration,
                  fullWidth: this.isToastFullWidth,
                  className: this.className,
                })
              } else {
                this.toastText = 'Unos uspješno obavljen!'
                this.toastIcon = 'fa-check'
                this.toastPosition = 'top-right'
                this.className = 'vuestic-toast-primary'
  
                this.showToast(this.toastText, {
                  icon: this.toastIcon,
                  position: this.toastPosition,
                  duration: this.toastDuration,
                  fullWidth: this.isToastFullWidth,
                  className: this.className,
                })
  
                this.aparat = ''
                this.test = ''
                this.kod = ''
                this.metoda = ''
                this.sekcija = ''
                this.grupa = ''
                this.price = ''
                this.tipoviUzorka = []
                this.prikaziPostavke()
                this.prikaziPostavke()
              }
            })
        }
      },
      prikaziPostavke: function() {
        this.dataUslovDanger = false
        this.aparat = ''
        this.test = ''
        this.price = ''
        this.kod = ''
        this.metoda = ''
        this.sekcija = ''
        this.grupa = ''
        this.dataAvailable1 = ''
        this.dataUslov1 = false
        this.tabelaUslov1 = false
        this.uslov = false
        this.ifdodajTest = !this.ifdodajTest
        this.ifTrenutnePostavke = !this.ifTrenutnePostavke
      },
      izbrisiTest: function(event) {
        http.post('postavke/aptest/delete', {
            email: this.$store.state.userId,
            _id: event.target.id,
            token: this.$store.state.token,
            site: this.$store.state.site
          })
          .then(res => {
            http.post('postavke/aptest/list', {
                email: this.$store.state.userId,
                aparat: this.tpAparat,
                token: this.$store.state.token,
                site: this.$store.state.site
              })
              .then(res => {
                this.testovi = res.data.aptests
                this.tpTable = true
  
                if (this.testovi.length > 0) {
                  this.dataAvailable1 = ''
                  this.dataUslov1 = false
                  this.tabelaUslov1 = true
                  this.uslov = true
                }
  
                if (this.testovi.length <= 0) {
                  this.dataAvailable1 = 'Za odabrani aparat, nema definisanih testova.'
                  this.dataUslov1 = true
                  this.tabelaUslov1 = false
                  this.uslov = true
                }
              })
          })
      },
      catchDialog: function(event) {
        this.$dialog.confirm('Jeste li sigurni da želite obrisati zapis?', {
            type: 'hard',
            html: true,
            verification: 'Da'
          })
          .then(() => {
  
            http.post('postavke/aptest/delete', {
                email: this.$store.state.userId,
                _id: event.target.id,
                token: this.$store.state.token,
                site: this.$store.state.site
              })
              .then(res => {
                http.post('postavke/aptest/list', {
                    email: this.$store.state.userId,
                    aparat: this.tpAparat,
                    token: this.$store.state.token,
                    site: this.$store.state.site
                  })
  
                  .then(res => {
  
                    if (res.data.success === false) {
                      this.toastText = 'Greška prilikom brisanja!'
                      this.toastIcon = 'fa-remove'
                      this.toastPosition = 'top-right'
                      this.className = 'vuestic-toast-danger'
  
                      this.showToast(this.toastText, {
                        icon: this.toastIcon,
                        position: this.toastPosition,
                        duration: this.toastDuration,
                        fullWidth: this.isToastFullWidth,
                        className: this.className,
                      })
                    } else {
                      this.toastText = 'Zapis uspješno obrisan!'
                      this.toastIcon = 'fa-check'
                      this.toastPosition = 'top-right'
                      this.className = 'vuestic-toast-primary'
  
                      this.showToast(this.toastText, {
                        icon: this.toastIcon,
                        position: this.toastPosition,
                        duration: this.toastDuration,
                        fullWidth: this.isToastFullWidth,
                        className: this.className,
                      })
                      this.testovi = res.data.aptests
                      this.tpTable = true
                      if (this.testovi.length > 0) {
                        this.dataAvailable1 = ''
                        this.dataUslov1 = false
                        this.tabelaUslov1 = true
                        this.uslov = true
                      }
  
                      if (this.testovi.length <= 0) {
                        this.dataAvailable1 = 'Za odabrani aparat, nema definisanih testova.'
                        this.dataUslov1 = true
                        this.tabelaUslov1 = false
                        this.uslov = true
                      }
                    }
                  })
              })
          })
          .catch(function() {
  
          })
      },
      dodajReferentne: function(event, interpretacija, multi) {
  
        if (multi || (interpretacija != null && !multi)) {
          this.analit = event.target.id
  
          this.test = event.target.getAttribute("name")
          http.post('postavke/aptest/referentne/list', {
              email: this.$store.state.userId,
              test: event.target.id,
              aparat: this.aparat,
              token: this.$store.state.token,
              site: this.$store.state.site
            })
            .then(res => {
  
              if (res.data.success === false) {
                this.dataAvailable = 'Greška prilikom čitanja iz baze.'
                this.dataUslovDanger = true
                this.dataUslov1 = false
                this.tabelaUslov1 = false
                this.dataUslov2 = false
                this.tabelaUslov2 = false
                this.nUslov = false
              } else {
  
                if (res.data.obj.multi === false) {
                  this.interpretacija = res.data.obj.aptest.interpretacija
                  this.ifTrenutnePostavke = false
                  this.ifDodajAnalit = true
                  this.refGrupe = []
  
                  res.data.obj.referentnaGrupa.forEach(element => {
                    this.refGrupe.push(element.grupa)
                  })
  
                  if (this.refGrupe.length < 1) {
                    this.refGrupe = []
                    this.refGrupe.push('NEMA PODATAKA')
                  }
  
                  this.obj = res.data.obj.aptest
  
                  this.referentne = res.data.obj.aptest.reference.sort(function(a, b) {
                    return a.grupa == b.grupa ? 0 : +(a.grupa > b.grupa) || -1
                  })
  
                  this.ifJedinica = true
  
                  if (this.referentne.length > 0) {
                    this.dataAvailable2 = ''
                    this.dataUslov2 = false
                    this.tabelaUslov2 = true
                  }
  
                  if (this.referentne.length <= 0) {
                    this.dataAvailable2 = 'Nema dostupnih podataka.'
                    this.dataUslov2 = true
                    this.tabelaUslov2 = false
                  }
                }
                if (res.data.obj.multi === true) {
                  this.interpretacija = 'Referentni interval'
                  this.refAnaliti = res.data.obj.analiti
                  this.ifMulti = true
                  this.ifTrenutnePostavke = false
                  this.testzaAnalit = event.target.id
  
                }
  
                if (this.refAnaliti.length == 0) {
                  this.nData = 'Za odabrani test, nema definisanih analita.'
                  this.nUslov = true
                  this.nUslov2 = false
                } else if (this.refAnaliti.length > 0) {
                  this.nUslov = false
                  this.nUslov2 = true
                }
              }
            })
  
        } else {
  
          this.toastText = 'Interpretacija nije definisana!'
          this.toastIcon = 'fa-warning'
          this.toastPosition = 'top-right'
          this.className = 'vuestic-toast-warning'
  
          this.showToast(this.toastText, {
            icon: this.toastIcon,
            position: this.toastPosition,
            duration: this.toastDuration,
            fullWidth: this.isToastFullWidth,
            className: this.className,
          })
  
        }
  
  
      },
      sacuvajReferentne: function(event) {
  
        if (this.interpretacija === 'Referentni interval') {
  
        } else if (this.interpretacija === 'Granična vrijednost | ≤ od') {
          this.dRef = '-' + this.gRef
          this.gRef = '-' + this.gRef
  
        } else if (this.interpretacija === 'Granična vrijednost | ≥ od') {
          this.dRef = '-' + this.gRef
          this.gRef = '-' + this.gRef
  
        } else if (this.interpretacija === 'Opisni rezultat') {
          this.dRef = '0'
          this.gRef = '0'
  
        }
  
        var item = true
        var i
        var regex = /^[0-9]{1,3}$/
  
        if ((this.dRef.trim() === '') || (this.gRef.trim() === '') || (this.refGrupa.trim() === '') || (this.dDob.trim() === '') || (this.gDob.trim() === '') || (this.spol.trim() === '')) {
          item = false
          this.toastText = 'Sva polja su obavezna!'
          this.toastIcon = 'fa-warning'
          this.toastPosition = 'top-right'
          this.className = 'vuestic-toast-warning'
  
          this.showToast(this.toastText, {
            icon: this.toastIcon,
            position: this.toastPosition,
            duration: this.toastDuration,
            fullWidth: this.isToastFullWidth,
            className: this.className,
          })
        } else if (this.refGrupa.trim() === 'NEMA PODATAKA') {
          item = false
          this.toastText = 'Referentne grupe nisu definisane!'
          this.toastIcon = 'fa-warning'
          this.toastPosition = 'top-right'
          this.className = 'vuestic-toast-warning'
  
          this.showToast(this.toastText, {
            icon: this.toastIcon,
            position: this.toastPosition,
            duration: this.toastDuration,
            fullWidth: this.isToastFullWidth,
            className: this.className,
          })
        } else if (isNaN(this.dRef.trim())) {
          item = false
          this.toastText = 'Referentna vrijednost mora biti iz skupa realnih brojeva!'
          this.toastIcon = 'fa-warning'
          this.toastPosition = 'top-right'
          this.className = 'vuestic-toast-warning'
  
          this.showToast(this.toastText, {
            icon: this.toastIcon,
            position: this.toastPosition,
            duration: this.toastDuration,
            fullWidth: this.isToastFullWidth,
            className: this.className,
          })
        } else if (isNaN(this.gRef.trim())) {
          item = false
          this.toastText = 'Referentna vrijednost mora biti iz skupa realnih brojeva!'
          this.toastIcon = 'fa-warning'
          this.toastPosition = 'top-right'
          this.className = 'vuestic-toast-warning'
  
          this.showToast(this.toastText, {
            icon: this.toastIcon,
            position: this.toastPosition,
            duration: this.toastDuration,
            fullWidth: this.isToastFullWidth,
            className: this.className,
          })
        } else if (isNaN(this.dDob.trim())) {
          item = false
          this.toastText = 'Donja dobna granica mora biti iz skupa realnih brojeva!'
          this.toastIcon = 'fa-warning'
          this.toastPosition = 'top-right'
          this.className = 'vuestic-toast-warning'
  
          this.showToast(this.toastText, {
            icon: this.toastIcon,
            position: this.toastPosition,
            duration: this.toastDuration,
            fullWidth: this.isToastFullWidth,
            className: this.className,
          })
        } else if (isNaN(this.gDob.trim())) {
          item = false
          this.toastText = 'Gornja dobna granica mora biti iz skupa realnih brojeva!'
          this.toastIcon = 'fa-warning'
          this.toastPosition = 'top-right'
          this.className = 'vuestic-toast-warning'
  
          this.showToast(this.toastText, {
            icon: this.toastIcon,
            position: this.toastPosition,
            duration: this.toastDuration,
            fullWidth: this.isToastFullWidth,
            className: this.className,
          })
        } else if (parseFloat(this.dDob) < 0 || parseFloat(this.gDob) < 0) {
          item = false
          this.toastText = 'Dobne granice moraju biti pozitivni brojevi!'
          this.toastIcon = 'fa-warning'
          this.toastPosition = 'top-right'
          this.className = 'vuestic-toast-warning'
  
          this.showToast(this.toastText, {
            icon: this.toastIcon,
            position: this.toastPosition,
            duration: this.toastDuration,
            fullWidth: this.isToastFullWidth,
            className: this.className,
          })
        } else if (parseFloat(this.dDob) >= parseFloat(this.gDob)) {
          item = false
          this.toastText = 'Gornja dobna granica mora biti veća od donje dobne granice!'
          this.toastIcon = 'fa-warning'
          this.toastPosition = 'top-right'
          this.className = 'vuestic-toast-warning'
  
          this.showToast(this.toastText, {
            icon: this.toastIcon,
            position: this.toastPosition,
            duration: this.toastDuration,
            fullWidth: this.isToastFullWidth,
            className: this.className,
          })
        }
  
        if (item) {
          http.post('postavke/aptest/referentne/save', {
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
                this.toastText = 'Greška prilikom upisa!'
                this.toastIcon = 'fa-remove'
                this.toastPosition = 'top-right'
                this.className = 'vuestic-toast-danger'
  
                this.showToast(this.toastText, {
                  icon: this.toastIcon,
                  position: this.toastPosition,
                  duration: this.toastDuration,
                  fullWidth: this.isToastFullWidth,
                  className: this.className,
                })
                this.dataAvailable = 'Greška prilikom čitanja iz baze.'
                this.dataUslovDanger = true
                this.dataUslov1 = false
                this.tabelaUslov1 = false
                this.dataUslov2 = false
                this.tabelaUslov2 = false
              } else {
                this.dataAvailable = ''
                this.dataUslovDanger = false
                this.nUslov = false
                this.nUslov2 = true
  
                if ((res.data.success = true)) {
                  this.toastText = 'Unos uspješno obavljen!'
                  this.toastIcon = 'fa-check'
                  this.toastPosition = 'top-right'
                  this.className = 'vuestic-toast-primary'
  
                  this.showToast(this.toastText, {
                    icon: this.toastIcon,
                    position: this.toastPosition,
                    duration: this.toastDuration,
                    fullWidth: this.isToastFullWidth,
                    className: this.className,
                  })
  
                  http.post('postavke/aptest/list', {
                      email: this.$store.state.userId,
                      aparat: this.tpAparat,
                      token: this.$store.state.token,
                      site: this.$store.state.site
                    })
                    .then(res => {
                      this.testovi = res.data.aptests
  
                    })
  
  
  
  
  
  
  
                } else if (res.data.success != true) {
                  this.toastText = 'Greška prilikom upisa!'
                  this.toastIcon = 'fa-remove'
                  this.toastPosition = 'top-right'
                  this.className = 'vuestic-toast-danger'
  
                  this.showToast(this.toastText, {
                    icon: this.toastIcon,
                    position: this.toastPosition,
                    duration: this.toastDuration,
                    fullWidth: this.isToastFullWidth,
                    className: this.className,
                  })
                }
  
                if (this.$store.state.userId != 'admin@atom.ba') {
                  this.refGrupa = ''
                  this.dRef = ''
                  this.gRef = ''
                  this.dDob = ''
                  this.gDob = ''
                  this.spol = ''
                  this.doGodinuDanaSelectedD = ''
                  this.doGodinuDanaSelectedG = ''
                  this.dobnaGrD = false
                  this.dobnaGrG = false
                  this.dobuslov = true
                } else {
                  this.dRef = this.dRef.replace('-', '')
                  this.gRef = this.gRef.replace('-', '')
                }
  
                this.referentne = res.data.referentne.sort(function(a, b) {
                  return a.grupa == b.grupa ? 0 : +(a.grupa > b.grupa) || -1
                })
  
                if (this.referentne.length > 0) {
                  this.dataAvailable2 = ''
                  this.dataUslov2 = false
                  this.tabelaUslov2 = true
                }
  
                if (this.referentne.length <= 0) {
                  this.dataAvailable2 = 'Nema dostupnih podataka.'
                  this.dataUslov2 = true
                  this.tabelaUslov2 = false
                }
              }
            })
        }
      },
      gotovo: function() {
        this.infoDanger = false
        this.refGrupa = ''
        this.dobuslov = true
        this.dobnaGrD = false
        this.dobnaGrG = false
        this.doGodinuDanaSelectedD = ''
        this.doGodinuDanaSelectedG = ''
        this.dRef = ''
        this.gRef = ''
        this.dDob = ''
        this.gDob = ''
        this.spol = ''
        this.tpAparat = ''
        this.uslov = false
        this.tpTable = false
        this.ifDodajAnalit = false
        this.ifDodajAnalit2 = false
        this.ifTrenutnePostavke = false
        this.ifdodajTest = true
        this.ifMulti = false
        this.ifRefAnalit = false
        this.analit = ''
        this.test = ''
        this.price = ''
        this.trenutneRef = false
        this.dataUslovDanger = false
        this.nUslov = false
        this.nUslov2 = true
      },
  
      gotovoTrenutne() {
        this.ifDodajAnalit = !this.ifDodajAnalit
        this.ifTrenutnePostavke = !this.ifTrenutnePostavke
        this.ifDodajAnalit2 = false
        this.dRef = ''
        this.gRef = ''
        this.refGrupa = ''
        this.dobuslov = true
        this.dobnaGrD = false
        this.dobnaGrG = false
        this.doGodinuDanaSelectedD = ''
        this.doGodinuDanaSelectedG = ''
        this.dDob = ''
        this.gDob = ''
        this.spol = ''
      },
      gotovoAkoNema() {
        this.ifMulti = !this.ifMulti
        this.ifTrenutnePostavke = !this.ifTrenutnePostavke
      },
      gotovoAkoNema2() {
        this.ifRefAnalit = false
        this.ifMulti = true
        this.trenutneRef = false
        this.refGrupa = ''
        this.dobuslov = true
        this.dobnaGrD = false
        this.dobnaGrG = false
        this.doGodinuDanaSelectedD = ''
        this.doGodinuDanaSelectedG = ''
        this.dRef = ''
        this.gRef = ''
        this.dDob = ''
        this.gDob = ''
        this.spol = ''
      },
      catchDialog2: function(event) {
  
        this.$dialog.confirm('Jeste li sigurni da želite obrisati zapis?', {
            type: 'hard',
            html: true,
            verification: 'Da'
          })
          .then(() => {
  
            http.post('postavke/aptest/referentne/delete', {
                email: this.$store.state.userId,
                test: this.obj._id,
                id: event.target.id,
                token: this.$store.state.token,
                site: this.$store.state.site
              })
              .then(res => {
                if (res.data.success === false) {
                  this.toastText = 'Greška prilikom brisanja!'
                  this.toastIcon = 'fa-remove'
                  this.toastPosition = 'top-right'
                  this.className = 'vuestic-toast-danger'
  
                  this.showToast(this.toastText, {
                    icon: this.toastIcon,
                    position: this.toastPosition,
                    duration: this.toastDuration,
                    fullWidth: this.isToastFullWidth,
                    className: this.className,
                  })
                } else {
  
                  http.post('postavke/aptest/list', {
                      email: this.$store.state.userId,
                      aparat: this.tpAparat,
                      token: this.$store.state.token,
                      site: this.$store.state.site
                    })
                    .then(res => {
                      this.testovi = res.data.aptests
  
                    })
  
                  this.toastText = 'Zapis uspješno obrisan!'
                  this.toastIcon = 'fa-check'
                  this.toastPosition = 'top-right'
                  this.className = 'vuestic-toast-primary'
  
                  this.showToast(this.toastText, {
                    icon: this.toastIcon,
                    position: this.toastPosition,
                    duration: this.toastDuration,
                    fullWidth: this.isToastFullWidth,
                    className: this.className,
                  })
                  this.referentne = res.data.referentne.sort(function(a, b) {
                    return a.grupa == b.grupa ? 0 : +(a.grupa > b.grupa) || -1
                  })
  
                  if (this.referentne.length > 0) {
                    this.dataAvailable2 = ''
                    this.dataUslov2 = false
                    this.tabelaUslov2 = true
                  }
  
                  if (this.referentne.length <= 0) {
                    this.dataAvailable2 = 'Nema dostupnih podataka.'
                    this.dataUslov2 = true
                    this.tabelaUslov2 = false
                  }
                }
  
              })
  
          })
          .catch(function() {
  
          })
      },
      izbrisiReferentnu: function(event) {
  
        http.post('postavke/aptest/referentne/delete', {
            email: this.$store.state.userId,
            test: this.obj._id,
            grupa: event.target.id,
            token: this.$store.state.token,
            site: this.$store.state.site
          })
          .then(res => {
  
            this.referentne = res.data.referentne.sort(function(a, b) {
              return a.grupa == b.grupa ? 0 : +(a.grupa > b.grupa) || -1
            })
  
            if (this.referentne.length > 0) {
              this.dataAvailable2 = ''
              this.dataUslov2 = false
              this.tabelaUslov2 = true
            }
  
            if (this.referentne.length <= 0) {
              this.dataAvailable2 = 'Nema dostupnih podataka.'
              this.dataUslov2 = true
              this.tabelaUslov2 = false
            }
          })
      },
      analitReferentne: function(event, interpretacija) {
  
        this.tmpInterp = interpretacija
        this.tmpEvent = event
        this.analit = event.target.id
        this.ifRefAnalit = true
        this.ifMulti = false
        this.tpTest = event.target.getAttribute("name")
        this.analitTesta = event.target.id
  
        this.refAnaliti.forEach(element => {
          if (element.naziv === this.tpTest) {
            this.analitUnit = element.jedinica
          }
        });
  
        http.post('postavke/aptest/referentne/list', {
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
              this.dataAvailable = 'Greška prilikom čitanja iz baze.'
              this.dataUslovDanger = true
              this.dataUslov3 = false
              this.tabelaUslov3 = false
              this.dataUslov2 = false
              this.tabelaUslov2 = false
            } else {
              this.refGrupe = []
              res.data.obj.referentnaGrupa.forEach(element => {
                this.refGrupe.push(element.grupa)
              });
  
              if (this.refGrupe.length < 1) {
                this.refGrupe = []
                this.refGrupe.push('NEMA PODATAKA')
              }
  
              this.anaReferentne = []
  
              this.anaReferentne = res.data.obj.reference.sort(function(a, b) {
                return a.grupa == b.grupa ? 0 : +(a.grupa > b.grupa) || -1
              })
  
              if (this.anaReferentne.length > 0) {
                this.dataAvailable3 = ''
                this.dataUslov3 = false
                this.tabelaUslov3 = true
              }
  
              if (this.anaReferentne.length <= 0) {
                this.dataAvailable3 = 'Nema dostupnih podataka'
                this.dataUslov3 = true
                this.tabelaUslov3 = false
              }
  
            }
  
          })
      },
      sacuvajRefAnalit: function() {
  
        if (this.tmpInterp === 'Referentni interval') {
  
        } else if (this.tmpInterp === 'Granična vrijednost | ≤ od') {
          this.dRef = '-' + this.gRef
          this.gRef = '-' + this.gRef
  
        } else if (this.tmpInterp === 'Granična vrijednost | ≥ od') {
          this.dRef = '-' + this.gRef
          this.gRef = '-' + this.gRef
  
        } else if (this.tmpInterp === 'Opisni rezultat') {
          this.dRef = '0'
          this.gRef = '0'
  
        }
  
        var item = true
        var i
        if ((this.dRef.trim() === '') || (this.gRef.trim() === '') || (this.refGrupa.trim() === '') || (this.dDob.trim() === '') || (this.gDob.trim() === '') || (this.spol.trim() === '')) {
          item = false
          this.toastText = 'Sva polja su obavezna!'
          this.toastIcon = 'fa-warning'
          this.toastPosition = 'top-right'
          this.className = 'vuestic-toast-warning'
  
          this.showToast(this.toastText, {
            icon: this.toastIcon,
            position: this.toastPosition,
            duration: this.toastDuration,
            fullWidth: this.isToastFullWidth,
            className: this.className,
          })
        } else if (this.refGrupa.trim() === 'NEMA PODATAKA') {
          item = false
          this.toastText = 'Referentne grupe nisu definisane!'
          this.toastIcon = 'fa-warning'
          this.toastPosition = 'top-right'
          this.className = 'vuestic-toast-warning'
  
          this.showToast(this.toastText, {
            icon: this.toastIcon,
            position: this.toastPosition,
            duration: this.toastDuration,
            fullWidth: this.isToastFullWidth,
            className: this.className,
          })
        } else if (isNaN(this.dRef.trim())) {
          item = false
          this.toastText = 'Referentna vrijednost mora biti iz skupa realnih brojeva!'
          this.toastIcon = 'fa-warning'
          this.toastPosition = 'top-right'
          this.className = 'vuestic-toast-warning'
  
          this.showToast(this.toastText, {
            icon: this.toastIcon,
            position: this.toastPosition,
            duration: this.toastDuration,
            fullWidth: this.isToastFullWidth,
            className: this.className,
          })
        } else if (isNaN(this.gRef.trim())) {
          item = false
          this.toastText = 'Referentna vrijednost mora biti iz skupa realnih brojeva!'
          this.toastIcon = 'fa-warning'
          this.toastPosition = 'top-right'
          this.className = 'vuestic-toast-warning'
  
          this.showToast(this.toastText, {
            icon: this.toastIcon,
            position: this.toastPosition,
            duration: this.toastDuration,
            fullWidth: this.isToastFullWidth,
            className: this.className,
          })
        } else {
  
        }
  
        if (item) {
          http.post('postavke/aptest/analit/referentne/save', {
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
                this.toastText = 'Greška prilikom upisa!'
                this.toastIcon = 'fa-remove'
                this.toastPosition = 'top-right'
                this.className = 'vuestic-toast-danger'
  
                this.showToast(this.toastText, {
                  icon: this.toastIcon,
                  position: this.toastPosition,
                  duration: this.toastDuration,
                  fullWidth: this.isToastFullWidth,
                  className: this.className,
                })
                this.dataAvailable = 'Greška prilikom čitanja iz baze.'
                this.dataUslovDanger = true
                this.dataUslov3 = false
                this.tabelaUslov3 = false
  
              } else {
                this.toastText = 'Unos uspješno obavljen!'
                this.toastIcon = 'fa-check'
                this.toastPosition = 'top-right'
                this.className = 'vuestic-toast-primary'
  
                this.showToast(this.toastText, {
                  icon: this.toastIcon,
                  position: this.toastPosition,
                  duration: this.toastDuration,
                  fullWidth: this.isToastFullWidth,
                  className: this.className,
                })
  
                if (this.$store.state.userId != 'admin@atom.ba') {
                  this.refGrupa = ''
                  this.dRef = ''
                  this.gRef = ''
                  this.dDob = ''
                  this.gDob = ''
                  this.spol = ''
                  this.doGodinuDanaSelectedD = ''
                  this.doGodinuDanaSelectedG = ''
                  this.dobnaGrD = false
                  this.dobnaGrG = false
                  this.dobuslov = true
                } else {
                  this.dRef = this.dRef.replace('-', '')
                  this.gRef = this.gRef.replace('-', '')
                }
  
                this.anaReferentne = []
  
                this.anaReferentne = res.data.referentne.sort(function(a, b) {
                  return a.grupa == b.grupa ? 0 : +(a.grupa > b.grupa) || -1
                })
  
                if (this.anaReferentne.length > 0) {
                  this.dataAvailable3 = ''
                  this.dataUslov3 = false
                  this.tabelaUslov3 = true
                }
  
                if (this.anaReferentne.length <= 0) {
                  this.dataAvailable3 = 'Nema dostupnih podataka.'
                  this.dataUslov3 = true
                  this.tabelaUslov3 = false
                }
              }
            })
        }
      },
      catchDialog3: function(event) {
        this.$dialog.confirm('Jeste li sigurni da želite obrisati zapis?', {
            type: 'hard',
            html: true,
            verification: 'Da'
          })
          .then(() => {
            http.post('postavke/aptest/analit/referentne/delete', {
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
                  this.toastText = 'Greška prilikom brisanja!'
                  this.toastIcon = 'fa-remove'
                  this.toastPosition = 'top-right'
                  this.className = 'vuestic-toast-danger'
  
                  this.showToast(this.toastText, {
                    icon: this.toastIcon,
                    position: this.toastPosition,
                    duration: this.toastDuration,
                    fullWidth: this.isToastFullWidth,
                    className: this.className,
                  })
                } else {
                  this.toastText = 'Zapis uspješno obrisan!'
                  this.toastIcon = 'fa-check'
                  this.toastPosition = 'top-right'
                  this.className = 'vuestic-toast-primary'
  
                  this.showToast(this.toastText, {
                    icon: this.toastIcon,
                    position: this.toastPosition,
                    duration: this.toastDuration,
                    fullWidth: this.isToastFullWidth,
                    className: this.className,
                  })                  
                  this.analitReferentne(this.tmpEvent, this.tmpInterp)

                  if (this.anaReferentne.length > 0) {
                    this.dataAvailable3 = ''
                    this.dataUslov3 = false
                    this.tabelaUslov3 = true
                  }
      
                  if (this.anaReferentne.length <= 0) {
                    this.dataAvailable3 = 'Nema dostupnih podataka'
                    this.dataUslov3 = true
                    this.tabelaUslov3 = false
                  }
                }
              })
          })
          .catch(function() {
  
          })
      },
      izbrisiRefAnalit: function(event) {
        http.post('postavke/aptest/analit/referentne/delete', {
            email: this.$store.state.userId,
            aparat: this.tpAparat,
            test: this.testzaAnalitt,
            analit: this.analitTesta,
            refGrupa: event.target.id,
            dRef: this.dRef,
            gRef: this.gRef,
            token: this.$store.state.token,
            site: this.$store.state.site
          })
          .then(res => {
  
            this.refGrupa = ''
            this.dobuslov = true
            this.dobnaGrD = false
            this.dobnaGrG = false
            this.doGodinuDanaSelectedD = ''
            this.doGodinuDanaSelectedG = ''
            this.dRef = ''
            this.gRef = ''
            this.dDob = ''
            this.gDob = ''
            this.spol = ''
  
            this.anaReferentne = []
  
            this.anaReferentne = res.data.referentne.sort(function(a, b) {
              return a.grupa == b.grupa ? 0 : +(a.grupa > b.grupa) || -1
            })
  
            if (this.anaReferentne.length > 0) {
              this.dataAvailable3 = ''
              this.dataUslov3 = false
              this.tabelaUslov3 = true
            }
  
            if (this.anaReferentne.length <= 0) {
              this.dataAvailable3 = 'Nema dostupnih podataka.'
              this.dataUslov3 = true
              this.tabelaUslov3 = false
            }
          })
      },
      ispisDob: function(dref, gref) {
  
        var dole = ''
        var gore = ''
  
        switch (dref.toString()) {
          case '0':
            dole = '0 dana - '
            break;
          case '0.00':
            dole = '0 dana - '
            break;
          case '0.05':
            dole = '15 dana - '
            break;
          case '0.09':
            dole = '1 mjesec - '
            break;
          case '0.20':
            dole = '2 mjeseca - '
            break;
          case '0.26':
            dole = '3 mjeseca - '
            break;
          case '0.34':
            dole = '4 mjeseca - '
            break;
          case '0.42':
            dole = '5 mjeseci - '
            break;
          case '0.51':
            dole = '6 mjeseci - '
            break;
          case '0.59':
            dole = '7 mjeseci - '
            break;
          case '0.66':
            dole = '8 mjeseci - '
            break;
          case '0.76':
            dole = '9 mjeseci - '
            break;
          case '0.84':
            dole = '10 mjeseci - '
            break;
          case '0.92':
            dole = '11 mjeseci - '
            break;
          case '131':
            dole = 'SVI'
            break;
          default:
            dole = dref.toString() + ' - '
            break;
        }
  
        switch (gref.toString()) {
          case '0.04':
            gore = '14 dana'
            break;
          case '0.08':
            gore = '30 dana'
            break;
          case '0.19':
            gore = '1 mjesec'
            break;
          case '0.25':
            gore = '2 mjeseca'
            break;
          case '0.33':
            gore = '3 mjeseca'
            break;
          case '0.41':
            gore = '4 mjeseca'
            break;
          case '0.50':
            gore = '5 mjeseci'
            break;
          case '0.58':
            gore = '6 mjeseci'
            break;
          case '0.65':
            gore = '7 mjeseci'
            break;
          case '0.75':
            gore = '8 mjeseci'
            break;
          case '0.83':
            gore = '9 mjeseci'
            break;
          case '0.91':
            gore = '10 mjeseci'
            break;
          case '0.99':
            gore = '11 mjeseci'
            break;
          case '140':
            gore = ''
            break;
          default:
            if (gref.toString().slice(-1) === '2' || gref.toString().slice(-1) === '3' || gref.toString().slice(-1) === '4') {
              gore = gref.toString() + ' godine'
            } else {
              gore = gref.toString() + ' godina'
            }
  
            break;
        }
        return dole + gore
      }
    }
  }
</script>

<style lang="scss">
  @import '../../../sass/variables';
  @import '../../../sass/toasts';
  .abc-checkbox,
  .abc-radio {
    display: flex !important;
    justify-content: flex-start;
  }
  
  input[type=checkbox]:disabled+label,
  input[type=radio]:disabled+label,
  input[type=checkbox]:disabled,
  input[type=radio]:disabled {
    cursor: not-allowed;
  }
</style>
